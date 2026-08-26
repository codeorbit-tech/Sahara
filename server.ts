import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Helper to initialize Gemini safely
  function getGeminiClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API endpoint for conversational Sahara chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userMessage, currentSeverity } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Safe contextual prototype fallback
        const lower = (userMessage || "").toLowerCase();
        let reply = "I hear you. You don't have to carry this alone. What feels like the heaviest part of your day right now?";
        let inferredSeverity = currentSeverity || "MODERATE";

        if (lower.includes("exam") || lower.includes("study") || lower.includes("assignment") || lower.includes("test")) {
          reply = "Exam pressure can create a vicious cycle where the more you worry, the harder it is to start. Take a slow breath — you don't need to master everything in one hour. Would you like to unpack the biggest blocker, or try a quick 3-minute mental reset?";
          inferredSeverity = "MILD";
        } else if (lower.includes("die") || lower.includes("kill") || lower.includes("suicide") || lower.includes("end it") || lower.includes("harm") || lower.includes("not safe")) {
          reply = "I care about your safety deeply, and you do not have to go through this immense pain alone. Please let us connect you with immediate, 24/7 human crisis support right now. Your life has immense value.";
          inferredSeverity = "SEVERE";
        } else if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("tired")) {
          reply = "When sleep slips away, everything else feels magnified. Is your mind racing with next day's to-dos or is it more of a general restlessness keeping you awake?";
          inferredSeverity = "MILD";
        } else if (lower.includes("overwhelm") || lower.includes("lonely") || lower.includes("friend") || lower.includes("family") || lower.includes("isolate")) {
          reply = "Feeling isolated in a crowded college campus is remarkably common, even when it feels like everyone else is thriving. You don't have to perform or put on a brave face here. What's been lingering in your thoughts the most?";
          inferredSeverity = "MODERATE";
        }

        return res.json({
          reply,
          suggestedSeverity: inferredSeverity,
          source: 'fallback'
        });
      }

      // If Gemini API is available, generate an empathetic, supportive response
      const systemInstruction = `You are "Sahara (सहारा)", an empathetic, confidential, and warm conversational first-step companion designed specifically for Indian college students.
Core principles:
1. "A student should never have to admit they need help before they can receive support."
2. Never speak like a clinical diagnostic bot or questionnaire. Do not give medical diagnoses (e.g. do not say "You have clinical depression" or "This is generalized anxiety").
3. Speak with warmth, gentle validation, and cultural awareness of Indian student pressures (academic load, competitive exams, parental expectations, hostel transitions, placement anxieties).
4. Keep replies concise, conversational (2-4 sentences), and non-judgmental.
5. If the student indicates imminent danger or self-harm, respond with urgent care, validation, and encourage connecting immediately to crisis resources.
6. Classify the subtle distress level as one of: MILD, MODERATE, or SEVERE.`;

      const prompt = `Student history: ${JSON.stringify(messages || [])}\nLatest student message: "${userMessage}"\n\nPlease reply with a warm, conversational message and classify the severity level as MILD, MODERATE, or SEVERE. Return in format: { "reply": "...", "severity": "MILD" | "MODERATE" | "SEVERE" }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
        },
      });

      try {
        const parsed = JSON.parse(response.text || "{}");
        return res.json({
          reply: parsed.reply || "I'm listening. Take all the time you need.",
          suggestedSeverity: parsed.severity || "MODERATE",
          source: 'gemini'
        });
      } catch {
        return res.json({
          reply: response.text || "I'm right here with you. What feels most urgent right now?",
          suggestedSeverity: "MODERATE",
          source: 'gemini-raw'
        });
      }
    } catch (err: any) {
      console.error("Error in /api/chat:", err);
      return res.json({
        reply: "I hear you. You don't have to solve everything today. Let's take it one gentle step at a time.",
        suggestedSeverity: "MODERATE",
        source: 'error-fallback'
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Sahara", version: "1.0.0" });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sahara server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
