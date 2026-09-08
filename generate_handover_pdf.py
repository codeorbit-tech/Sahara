import os
from playwright.sync_api import sync_playwright

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sahara v2 — Backend Architecture & Frontend Handover</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
  
  @page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
    @bottom-right {
      content: counter(page);
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      color: #718096;
    }
  }

  body {
    font-family: 'Inter', sans-serif;
    color: #1a202c;
    background-color: #ffffff;
    line-height: 1.5;
    font-size: 9.5pt;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4 {
    color: #173F2A;
    font-weight: 700;
    margin-top: 1.2em;
    margin-bottom: 0.5em;
    page-break-after: avoid;
  }

  h1 {
    font-size: 20pt;
    border-bottom: 2px solid #234D32;
    padding-bottom: 6px;
    margin-top: 0;
  }

  h2 {
    font-size: 13pt;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 4px;
    margin-top: 1.4em;
  }

  h3 {
    font-size: 10.5pt;
    color: #234D32;
    margin-top: 1em;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.8em;
  }

  .badge {
    display: inline-block;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .badge-severe { background-color: #FED7D7; color: #9B2C2C; }
  .badge-moderate { background-color: #FEEBC8; color: #C05621; }
  .badge-mild { background-color: #C6F6D5; color: #22543D; }
  .badge-primary { background-color: #EBF8FF; color: #2B6CB0; }
  .badge-secondary { background-color: #FAF5FF; color: #6B46C1; }
  .badge-tag { background-color: #EBF2EA; color: #173F2A; border: 1px solid #9BAE91; }

  .header-card {
    background: linear-gradient(135deg, #173F2A 0%, #234D32 100%);
    color: #ffffff;
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .header-card h1 {
    color: #ffffff;
    border-bottom: none;
    margin: 0 0 6px 0;
    font-size: 18pt;
  }

  .header-card .subtitle {
    color: #DCE5D4;
    font-size: 9.5pt;
    margin: 0;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.2);
    font-size: 8pt;
    color: #EBF2EA;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 16px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }

  th, td {
    padding: 6px 9px;
    text-align: left;
    border: 1px solid #E2E8F0;
  }

  th {
    background-color: #F7FAFC;
    color: #2D3748;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #FAFAFA;
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    background-color: #EDF2F7;
    padding: 1px 4px;
    border-radius: 3px;
    color: #805AD5;
  }

  pre {
    background-color: #1A202C;
    color: #E2E8F0;
    padding: 10px 12px;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5pt;
    line-height: 1.4;
    overflow-x: auto;
    margin: 6px 0 12px 0;
    page-break-inside: avoid;
  }

  .card {
    border: 1px solid #E2E8F0;
    border-left: 4px solid #234D32;
    background-color: #FBFDFB;
    padding: 10px 14px;
    border-radius: 4px;
    margin-bottom: 12px;
    page-break-inside: avoid;
  }

  .endpoint-card {
    border: 1px solid #E2E8F0;
    border-radius: 6px;
    margin-bottom: 14px;
    overflow: hidden;
    page-break-inside: avoid;
  }

  .endpoint-header {
    background-color: #EDF2F7;
    padding: 6px 12px;
    font-weight: 600;
    font-size: 9pt;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .endpoint-body {
    padding: 10px 12px;
    background-color: #FFFFFF;
  }

  .method {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 7.5pt;
  }

  .method-post { background-color: #48BB78; color: white; }
  .method-get { background-color: #4299E1; color: white; }

  .page-break {
    page-break-before: always;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
</style>
</head>
<body>

<div class="header-card">
  <h1>Sahara v2 — Backend Architecture</h1>
  <p class="subtitle">Complete Technical & API Handover Guide for Frontend Development</p>
  <div class="meta-grid">
    <div><strong>Backend:</strong> FastAPI + SQLite</div>
    <div><strong>AI Engine:</strong> Gemini 2.0 / 3.6 Flash</div>
    <div><strong>Default URL:</strong> http://127.0.0.1:8000</div>
  </div>
</div>

<h2>1. Core Privacy Architecture & Contract</h2>
<div class="card">
  <p><strong>Strict Privacy Principles Implemented in v2:</strong></p>
  <ul>
    <li><strong>No Shared Anon Identity:</strong> Every client must maintain a unique UUID (<code>sess-&lt;uuid&gt;</code>). The <code>"anon-session"</code> fallback is completely removed to eliminate session collisions.</li>
    <li><strong>Silent Tag Inference:</strong> Triage companion AI infers distress tags strictly from a 7-term controlled vocabulary. Stored internally on session, never shown raw to peer Saathis.</li>
    <li><strong>Saathi Alias Shielding:</strong> Students only interact with auto-generated peer aliases (e.g. <code>NightOwl_Eng_23</code>). Real names are restricted to authenticated admins.</li>
    <li><strong>Dual-Saathi Model:</strong> Server matches 2 peer supporters simultaneously (<code>PRIMARY</code> and <code>SECONDARY</code>). Student can switch focus with zero justification.</li>
    <li><strong>Decoupled Clinical PII:</strong> Professional counselling appointments (<code>student_name</code>, <code>student_email</code>) are stored in an isolated table with no foreign keys to chat logs.</li>
  </ul>
</div>

<h2>2. Distress Triage & Tag Vocabulary</h2>

<div class="grid-2">
  <div>
    <h3>Severity Classifications</h3>
    <table>
      <thead>
        <tr><th>Severity</th><th>Trigger / Meaning</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge badge-severe">SEVERE</span></td>
          <td>Self-harm, crisis keywords. Surface 24/7 helplines immediately.</td>
        </tr>
        <tr>
          <td><span class="badge badge-moderate">MODERATE</span></td>
          <td>Emotional fatigue, isolation. Offer Saathi peer connection.</td>
        </tr>
        <tr>
          <td><span class="badge badge-mild">MILD</span></td>
          <td>Normal exam/study stress. Suggest breathing exercises.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <h3>Controlled Inferred Tags</h3>
    <p style="margin-bottom: 6px; font-size: 8pt; color: #4A5568;">Extracted purely from dialog context, zero free text:</p>
    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
      <span class="badge badge-tag">academic_stress</span>
      <span class="badge badge-tag">exam_period</span>
      <span class="badge badge-tag">sleep_issues</span>
      <span class="badge badge-tag">night_owl</span>
      <span class="badge badge-tag">family_stress</span>
      <span class="badge badge-tag">relationship_stress</span>
      <span class="badge badge-tag">isolation</span>
    </div>
  </div>
</div>

<div class="page-break"></div>

<h2>3. Complete API Endpoint Reference</h2>

<!-- 1. POST /api/chat -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method method-post">POST</span>
    <span>/api/chat</span>
    <span style="margin-left: auto; font-size: 8pt; color: #718096;">AI Companion Triage & Chat</span>
  </div>
  <div class="endpoint-body">
    <p>Sends student message to empathetic Sahara companion. Returns AI reply, severity level, and inferred tags.</p>
    <div class="grid-2">
      <div>
        <strong>Request Body:</strong>
        <pre>{
  "session_id": "sess-9b1deb4d",
  "userMessage": "Exams are next week and I cannot sleep.",
  "currentSeverity": "MODERATE"
}</pre>
      </div>
      <div>
        <strong>Response (200 OK):</strong>
        <pre>{
  "session_id": "sess-9b1deb4d",
  "reply": "Exam pressure can create a vicious cycle...",
  "suggestedSeverity": "MILD",
  "inferredTags": ["academic_stress", "sleep_issues"],
  "source": "langchain-gemini"
}</pre>
      </div>
    </div>
  </div>
</div>

<!-- 2. POST /api/saathi/match -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method method-post">POST</span>
    <span>/api/saathi/match</span>
    <span style="margin-left: auto; font-size: 8pt; color: #718096;">Intelligent Dual-Saathi Matching</span>
  </div>
  <div class="endpoint-body">
    <p>Matches 2 Saathis based on session tags with capacity cap enforcement and random jitter. Returns aliases and intros.</p>
    <div class="grid-2">
      <div>
        <strong>Request Body:</strong>
        <pre>{
  "session_id": "sess-9b1deb4d"
}</pre>
      </div>
      <div>
        <strong>Response (200 OK):</strong>
        <pre>{
  "session_id": "sess-9b1deb4d",
  "primary": {
    "chat_id": "schat-89496809",
    "saathi_id": "saathi-arjun",
    "alias": "Pacer_Comm_22",
    "role": "PRIMARY",
    "status": "ACTIVE",
    "intro_message": "Hey! I'm Pacer_Comm_22...",
    "vibeTags": [{"icon": "🏏", "label": "Sports"}]
  },
  "secondary": {
    "chat_id": "schat-782cea20",
    "saathi_id": "saathi-rohan",
    "alias": "SeniorCode_IT_21",
    "role": "SECONDARY",
    "status": "ACTIVE",
    "intro_message": "Hi there, I'm SeniorCode_IT_21..."
  }
}</pre>
      </div>
    </div>
  </div>
</div>

<!-- 3. POST /api/saathi/switch -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method method-post">POST</span>
    <span>/api/saathi/switch</span>
    <span style="margin-left: auto; font-size: 8pt; color: #718096;">Student-Side No-Guilt Focus Switch</span>
  </div>
  <div class="endpoint-body">
    <p>Swaps UI active focus between Primary and Secondary peer supporters without justification or notifications.</p>
    <div class="grid-2">
      <div>
        <strong>Request Body:</strong>
        <pre>{
  "session_id": "sess-9b1deb4d",
  "target_role": "SECONDARY"
}</pre>
      </div>
      <div>
        <strong>Response (200 OK):</strong>
        <pre>{
  "session_id": "sess-9b1deb4d",
  "active_chat_id": "schat-782cea20",
  "active_role": "PRIMARY",
  "active_saathi_alias": "SeniorCode_IT_21",
  "message": "Active peer focus switched successfully with zero guilt."
}</pre>
      </div>
    </div>
  </div>
</div>

<!-- 4. POST /api/saathi/transition -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method method-post">POST</span>
    <span>/api/saathi/transition</span>
    <span style="margin-left: auto; font-size: 8pt; color: #718096;">Saathi Departure & Transition</span>
  </div>
  <div class="endpoint-body">
    <p>Enforces 2-week notice period. Copies chat history to replacement Saathi only if <code>consented_history_transfer = true</code>.</p>
    <div class="grid-2">
      <div>
        <strong>Request Body:</strong>
        <pre>{
  "saathi_chat_id": "schat-89496809",
  "notice_weeks": 2,
  "consented_history_transfer": true
}</pre>
      </div>
      <div>
        <strong>Response (200 OK):</strong>
        <pre>{
  "saathi_chat_id": "schat-89496809",
  "status": "TRANSITIONING",
  "transition_notice_date": "2026-09-22",
  "consented_history_transfer": true,
  "new_chat_id": "schat-ce2443f4",
  "new_saathi_alias": "QuietAnchor_Des_22"
}</pre>
      </div>
    </div>
  </div>
</div>

<div class="page-break"></div>

<!-- 5. POST /api/saathi/reassign-request -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method method-post">POST</span>
    <span>/api/saathi/reassign-request</span>
    <span style="margin-left: auto; font-size: 8pt; color: #718096;">Saathi Silent Escape Hatch</span>
  </div>
  <div class="endpoint-body">
    <p>Lets Saathi flag targeting/recognition risk. Silently assigns a replacement without notifying student.</p>
    <pre style="margin-bottom: 0;">Request: { "saathi_chat_id": "schat-782cea20" }
Response: { "reassigned": true, "new_chat_id": "schat-953e0361", "new_saathi_alias": "NightOwl_Eng_23" }</pre>
  </div>
</div>

<!-- 6. POST /api/appointments -->
<div class="endpoint-card">
  <div class="endpoint-header">
    <span class="method method-post">POST</span>
    <span>/api/appointments</span>
    <span style="margin-left: auto; font-size: 8pt; color: #718096;">Decoupled Clinical Psychologist Booking</span>
  </div>
  <div class="endpoint-body">
    <p>Consented student name and email stored strictly isolated from chat history and session UUIDs.</p>
    <div class="grid-2">
      <div>
        <strong>Request Body:</strong>
        <pre>{
  "counsellor_id": "counsellor-1",
  "counsellor_name": "Dr. Ananya Sen",
  "student_name": "Kavya S.",
  "student_email": "kavya@campus.edu",
  "modality": "Video",
  "selected_slot": "Tomorrow, 3:00 PM"
}</pre>
      </div>
      <div>
        <strong>Response (200 OK):</strong>
        <pre>{
  "id": "apt-6bbb2c75",
  "counsellor_id": "counsellor-1",
  "student_name": "Kavya S.",
  "modality": "Video",
  "status": "CONFIRMED",
  "created_at": "Sep 08, 2026 11:22 AM"
}</pre>
      </div>
    </div>
  </div>
</div>

<h2>4. Complete Database Schema (SQLite)</h2>
<table>
  <thead>
    <tr><th>Table Name</th><th>Key Columns</th><th>Privacy / Security Role</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sessions</code></td>
      <td><code>session_id</code> (PK), <code>created_at</code>, <code>last_active</code>, <code>inferred_tags</code></td>
      <td>Anonymous state & inferred tags only. Zero PII.</td>
    </tr>
    <tr>
      <td><code>chat_messages</code></td>
      <td><code>id</code> (PK), <code>session_id</code>, <code>sender</code>, <code>text</code>, <code>severity</code></td>
      <td>Sahara AI companion message threads.</td>
    </tr>
    <tr>
      <td><code>checkins</code></td>
      <td><code>id</code> (PK), <code>session_id</code>, <code>mood</code>, <code>energy</code>, <code>stressor</code>, <code>note</code></td>
      <td>Daily self-reported mood check-ins.</td>
    </tr>
    <tr>
      <td><code>saathis</code></td>
      <td><code>id</code> (PK), <code>name</code> (Admin only), <code>alias</code>, <code>max_capacity</code>, <code>current_load</code></td>
      <td>Peer supporter roster. Real names restricted to <code>X-Admin-Key</code>.</td>
    </tr>
    <tr>
      <td><code>saathi_chats</code></td>
      <td><code>id</code> (PK), <code>session_id</code>, <code>saathi_id</code>, <code>role</code>, <code>status</code>, <code>consented_history_transfer</code></td>
      <td>Dual-Saathi connections (<code>PRIMARY</code>/<code>SECONDARY</code>). Independent threads.</td>
    </tr>
    <tr>
      <td><code>saathi_messages</code></td>
      <td><code>id</code> (PK), <code>saathi_chat_id</code>, <code>sender</code>, <code>text</code>, <code>timestamp</code></td>
      <td>Peer supporter direct messaging log.</td>
    </tr>
    <tr>
      <td><code>appointments</code></td>
      <td><code>id</code> (PK), <code>counsellor_id</code>, <code>student_name</code>, <code>student_email</code>, <code>slot</code></td>
      <td><strong>Isolated PII.</strong> No foreign keys or joins to sessions or chats.</td>
    </tr>
  </tbody>
</table>

<h2>5. Frontend State Management Snippet</h2>
<pre><code>// App.jsx - Session & Dual Saathi Management
const getSessionId = () => {
  let id = localStorage.getItem("sahara_session_id");
  if (!id) {
    id = "sess-" + crypto.randomUUID();
    localStorage.setItem("sahara_session_id", id);
  }
  return id;
};

// Match Saathis
const matchSaathis = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/saathi/match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: getSessionId() })
  });
  const data = await res.json();
  // Returns data.primary and data.secondary
  return data;
};</code></pre>

</body>
</html>
"""

def generate_pdf():
    output_pdf_path = os.path.abspath("Sahara_v2_Backend_Architecture_Handover.pdf")
    print("Generating PDF at:", output_pdf_path)
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(HTML_CONTENT)
        page.pdf(
            path=output_pdf_path,
            format="A4",
            print_background=True,
            margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"}
        )
        browser.close()
    
    print("PDF Successfully generated! File size:", os.path.getsize(output_pdf_path), "bytes")

if __name__ == "__main__":
    generate_pdf()
