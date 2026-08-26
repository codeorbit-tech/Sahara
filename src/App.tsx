import React, { useState, useEffect } from 'react';
import { Screen, TriageSeverity, SaathiProfile, ChatMessage } from './types';
import { SAATHI_PROFILES, DEMO_SCENARIOS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { DemoBar } from './components/DemoBar';
import { LandingScreen } from './components/LandingScreen';
import { CheckInScreen } from './components/CheckInScreen';
import { SaharaChatScreen } from './components/SaharaChatScreen';
import { TriageResultScreen } from './components/TriageResultScreen';
import { SaathiMatchingScreen } from './components/SaathiMatchingScreen';
import { SaathiChatScreen } from './components/SaathiChatScreen';
import { ProfessionalSupportScreen } from './components/ProfessionalSupportScreen';
import { PrivacyCenterScreen } from './components/PrivacyCenterScreen';
import { StudentDashboardScreen } from './components/StudentDashboardScreen';
import { ImpactDashboardScreen } from './components/ImpactDashboardScreen';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'init-1',
    sender: 'sahara',
    text: "Hey 👋 I'm Sahara.\n\nYou don't have to explain everything perfectly or know what's wrong.\n\nWhat's been going on lately?",
    timestamp: 'Just now',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [selectedSeverity, setSelectedSeverity] = useState<TriageSeverity | null>('MODERATE');
  const [selectedSaathi, setSelectedSaathi] = useState<SaathiProfile>(SAATHI_PROFILES[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sahara_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_MESSAGES;
      }
    }
    return INITIAL_MESSAGES;
  });
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Sync messages to localStorage
  useEffect(() => {
    localStorage.setItem('sahara_chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Navigate handler with window scroll to top
  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scenario quick-trigger handler for pitch demo
  const handleSelectScenario = (severity: TriageSeverity) => {
    setSelectedSeverity(severity);
    const scenario = DEMO_SCENARIOS.find((s) => s.id === severity);
    if (scenario) {
      const scenarioMessages: ChatMessage[] = [
        {
          id: `sc-std-1-${Date.now()}`,
          sender: 'student',
          text: scenario.conversationFlow.studentIntro,
          timestamp: 'Just now',
        },
        {
          id: `sc-sah-1-${Date.now()}`,
          sender: 'sahara',
          text: scenario.conversationFlow.saharaReply1,
          timestamp: 'Just now',
        },
        {
          id: `sc-std-2-${Date.now()}`,
          sender: 'student',
          text: scenario.conversationFlow.studentReply2,
          timestamp: 'Just now',
        },
        {
          id: `sc-sah-2-${Date.now()}`,
          sender: 'sahara',
          text: scenario.conversationFlow.saharaReply2,
          timestamp: 'Just now',
        },
      ];
      setMessages(scenarioMessages);
      setCurrentScreen('chat');
    }
  };

  // Reset conversation session
  const handleResetSession = () => {
    setMessages(INITIAL_MESSAGES);
    setSelectedSeverity('MODERATE');
    localStorage.removeItem('sahara_chat_messages');
    setCurrentScreen('landing');
  };

  // Send message to Sahara chatbot
  const handleSendMessage = async (text: string) => {
    const newMsg: ChatMessage = {
      id: `std-${Date.now()}`,
      sender: 'student',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      // Call Express backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.sender === 'student' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
          userMessage: text,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const saharaReply: ChatMessage = {
          id: `sahara-${Date.now()}`,
          sender: 'sahara',
          text: data.reply || "I hear you. That sounds like a lot to carry all by yourself. We can take this one step at a time.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, saharaReply]);
        if (data.severity) {
          setSelectedSeverity(data.severity);
        }
      } else {
        throw new Error('API response not ok');
      }
    } catch (err) {
      // Robust client-side fallback
      setTimeout(() => {
        let fallbackText = "I'm listening. College pressure and everything that comes with it can feel really heavy. You don't have to carry it alone.";
        const lower = text.toLowerCase();

        if (lower.includes('suicide') || lower.includes('end it') || lower.includes('die') || lower.includes('hurt myself')) {
          fallbackText = "I hear how intensely exhausting and overwhelming everything is right now. Please know you are not alone and you deserve immediate support. Let's get you connected with a confidential counsellor who can stay with you.";
          setSelectedSeverity('SEVERE');
        } else if (lower.includes('fail') || lower.includes('exam') || lower.includes('grade') || lower.includes('stress') || lower.includes('sleep')) {
          fallbackText = "Exam pressure and relentless deadlines build up so silently until you feel completely drained. Would you like to check out some quick grounding exercises, or chat with a student Saathi who gets it?";
          setSelectedSeverity('MODERATE');
        }

        const saharaReply: ChatMessage = {
          id: `sahara-${Date.now()}`,
          sender: 'sahara',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, saharaReply]);
      }, 900);
    } finally {
      setIsTyping(false);
    }
  };

  const handleProceedToTriage = (severity?: TriageSeverity) => {
    if (severity) {
      setSelectedSeverity(severity);
    }
    handleNavigate('triage');
  };

  const handleSelectSaathi = (saathi: SaathiProfile) => {
    setSelectedSaathi(saathi);
    handleNavigate('saathi_chat');
  };

  return (
    <div className="min-h-screen bg-[#F7F3E8] text-[#173F2A] font-sans antialiased flex flex-col selection:bg-[#DCE5D4] selection:text-[#173F2A]">
      
      {/* Persistent Presenter Demo Bar */}
      {isDemoMode && (
        <DemoBar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onSelectScenario={handleSelectScenario}
          onReset={handleResetSession}
          selectedSeverity={selectedSeverity}
        />
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isDemoMode={isDemoMode}
        onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
      />

      {/* Screen Routing */}
      <div className="flex-1">
        {currentScreen === 'landing' && (
          <LandingScreen
            onStart={() => handleNavigate('checkin')}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'checkin' && (
          <CheckInScreen
            onContinue={() => handleNavigate('chat')}
            onBack={() => handleNavigate('landing')}
          />
        )}

        {currentScreen === 'chat' && (
          <SaharaChatScreen
            messages={messages}
            onSendMessage={handleSendMessage}
            onProceedToTriage={handleProceedToTriage}
            isTyping={isTyping}
            currentSeverity={selectedSeverity}
          />
        )}

        {currentScreen === 'triage' && (
          <TriageResultScreen
            severity={selectedSeverity || 'MODERATE'}
            onNavigate={handleNavigate}
            onSetSeverity={setSelectedSeverity}
          />
        )}

        {currentScreen === 'saathi_match' && (
          <SaathiMatchingScreen
            onSelectSaathi={handleSelectSaathi}
            selectedSaathi={selectedSaathi}
          />
        )}

        {currentScreen === 'saathi_chat' && (
          <SaathiChatScreen
            saathi={selectedSaathi}
            onNavigate={handleNavigate}
            onSwitchSaathi={(newSaathi) => setSelectedSaathi(newSaathi)}
          />
        )}

        {currentScreen === 'professional' && (
          <ProfessionalSupportScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'privacy' && <PrivacyCenterScreen />}

        {currentScreen === 'dashboard' && (
          <StudentDashboardScreen
            onNavigate={handleNavigate}
            selectedSaathi={selectedSaathi}
            onSelectSaathi={setSelectedSaathi}
          />
        )}

        {currentScreen === 'impact' && <ImpactDashboardScreen />}
      </div>

      {/* Global Sleek Footer */}
      <footer className="bg-[#173F2A] border-t border-[#234D32] py-3 px-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 shrink-0 gap-2">
        <p className="tracking-wide">Sahara Prototype &bull; Built for Student Mental Health</p>
        <p className="italic text-white/70 serif">&ldquo;You don't have to say you need help.&rdquo;</p>
      </footer>

    </div>
  );
}
