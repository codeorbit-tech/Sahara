import React, { useState, useRef, useEffect } from 'react';
import { SaathiProfile, Screen } from '../types';
import { SAATHI_PROFILES } from '../data/mockData';
import { Shield, Send, Lock, HeartHandshake, UserPlus, Sparkles, ArrowRight, UserCheck, AlertCircle, PhoneCall } from 'lucide-react';

interface SaathiChatScreenProps {
  saathi: SaathiProfile;
  onNavigate: (screen: Screen) => void;
  onSwitchSaathi: (newSaathi: SaathiProfile) => void;
}

interface PeerMessage {
  id: string;
  sender: 'student' | 'saathi';
  text: string;
  timestamp: string;
}

export const SaathiChatScreen: React.FC<SaathiChatScreenProps> = ({
  saathi,
  onNavigate,
  onSwitchSaathi,
}) => {
  const secondarySaathi = SAATHI_PROFILES.find((p) => p.id !== saathi.id) || SAATHI_PROFILES[1];

  const [messages, setMessages] = useState<PeerMessage[]>([
    {
      id: 'm1',
      sender: 'saathi',
      text: `Hey! I'm ${saathi.name}. I saw you're navigating some heavy days. Take your time, there's zero pressure to explain everything. How are you holding up right this second?`,
      timestamp: 'Just now',
    },
    {
      id: 'm2',
      sender: 'student',
      text: "I don't know if my problem is even serious enough to talk about.",
      timestamp: 'Just now',
    },
    {
      id: 'm3',
      sender: 'saathi',
      text: "You don't need to prove that it's serious. If it's affecting your peace, it's 100% worth talking about. What feels most exhausting right now?",
      timestamp: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text || isTyping) return;

    const studentMsg: PeerMessage = {
      id: `std-${Date.now()}`,
      sender: 'student',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, studentMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Contextual peer reply
    setTimeout(() => {
      let replyText = "I totally get that. You're doing the best you can under a crazy amount of pressure. We can take this one step at a time.";
      const lower = text.toLowerCase();

      if (lower.includes("weak") || lower.includes("scared")) {
        replyText = "Asking for a sounding board doesn't make you weak at all — it takes real guts. We can take this completely at your pace.";
      } else if (lower.includes("exam") || lower.includes("grade") || lower.includes("cgpa")) {
        replyText = "The academic rat race here is brutal. I remember failing a major midterm in 2nd year and feeling like the world ended. Your marks don't define your entire worth.";
      } else if (lower.includes("hostel") || lower.includes("home") || lower.includes("alone")) {
        replyText = "Hostel loneliness is so real. You're surrounded by 500 people in the mess hall and yet feel completely solitary. You're definitely not alone in feeling this.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `saathi-${Date.now()}`,
          sender: 'saathi',
          text: replyText,
          timestamp: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Support Circle Banner (Safety Architecture) */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#DCE5D4] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#234D32] bg-[#DCE5D4] px-2.5 py-0.5 rounded-full">
                Support Circle Architecture
              </span>
              <span className="text-xs font-medium text-stone-500">Anti-Attachment Disruption</span>
            </div>
            <p className="text-xs text-[#173F2A]/80 max-w-2xl">
              Sahara is designed so that <strong>one person is never your only lifeline</strong>. You always have a Primary Saathi, a Secondary Saathi backup, and on-demand professional escalation.
            </p>
          </div>

          {/* Support Circle 3 nodes */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Primary */}
            <div className="flex items-center gap-2 bg-[#EBF2EA] px-3 py-1.5 rounded-xl border border-[#9BAE91] text-xs">
              <div className="w-6 h-6 rounded-full bg-[#173F2A] text-white flex items-center justify-center font-bold text-[10px]">
                1
              </div>
              <div>
                <p className="font-bold text-[#173F2A]">{saathi.name}</p>
                <p className="text-[10px] text-[#234D32]">Primary Saathi</p>
              </div>
            </div>

            {/* Secondary Backup */}
            <button
              onClick={() => onSwitchSaathi(secondarySaathi)}
              className="flex items-center gap-2 bg-[#F7F3E8] hover:bg-[#EDE8DA] px-3 py-1.5 rounded-xl border border-[#EDE8DA] text-xs transition-colors cursor-pointer text-left"
              title={`Switch to secondary supporter ${secondarySaathi.name}`}
            >
              <div className="w-6 h-6 rounded-full bg-[#9BAE91] text-[#173F2A] flex items-center justify-center font-bold text-[10px]">
                2
              </div>
              <div>
                <p className="font-bold text-[#173F2A]">{secondarySaathi.name}</p>
                <p className="text-[10px] text-[#234D32]/70">Secondary Backup</p>
              </div>
            </button>

            {/* Professional Escalation */}
            <button
              onClick={() => onNavigate('professional')}
              className="flex items-center gap-1.5 bg-[#173F2A] hover:bg-[#234D32] text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#9BAE91]" />
              <span>Escalate to Therapist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Messaging Interface */}
      <div className="bg-white/95 rounded-3xl border border-[#DCE5D4] shadow-xl flex flex-col h-[65vh] sm:h-[70vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#173F2A] text-[#F7F3E8] p-4 sm:px-6 flex items-center justify-between border-b border-[#234D32]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl ${saathi.colorScheme.bg} border ${saathi.colorScheme.border} flex items-center justify-center text-lg font-bold text-[#173F2A] shadow-xs`}>
              {saathi.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-white">{saathi.name}</h3>
                <span className="text-[10px] bg-[#9BAE91]/30 text-[#DCE5D4] px-2 py-0.5 rounded-full font-medium">
                  {saathi.year} • {saathi.field.split('&')[0]}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#9BAE91]">
                <Lock className="w-3 h-3" />
                <span>Private Peer Channel • 100% Anonymous</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('professional')}
              className="bg-[#234D32] hover:bg-[#2e6341] text-[#DCE5D4] px-3 py-1.5 rounded-xl text-xs font-medium border border-[#9BAE91]/30 transition-colors"
            >
              Need a Counsellor?
            </button>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-[#EDE8DA]/70 px-4 py-2 border-b border-[#DCE5D4] text-[11px] text-[#234D32] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#173F2A] shrink-0" />
            <span>
              Your Saathi is a trained student peer supporter, not a licensed therapist or physician.
            </span>
          </div>
          <span className="font-semibold text-[#173F2A] hidden sm:inline">Zero College Record</span>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F7F3E8]/30">
          {messages.map((msg) => {
            const isSaathi = msg.sender === 'saathi';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isSaathi ? 'justify-start' : 'justify-end'}`}
              >
                {isSaathi && (
                  <div className={`w-8 h-8 rounded-xl ${saathi.colorScheme.bg} border ${saathi.colorScheme.border} flex items-center justify-center text-xs font-bold text-[#173F2A] shrink-0 mt-1 shadow-2xs`}>
                    {saathi.name.charAt(0)}
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-2xs ${
                    isSaathi
                      ? 'bg-white text-[#173F2A] border border-[#EDE8DA] rounded-tl-xs'
                      : 'bg-[#173F2A] text-[#F7F3E8] rounded-br-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div
                    className={`text-[10px] mt-1.5 ${
                      isSaathi ? 'text-[#234D32]/60' : 'text-[#EDE8DA]/70'
                    } text-right`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-start gap-2.5 justify-start">
              <div className={`w-8 h-8 rounded-xl ${saathi.colorScheme.bg} flex items-center justify-center text-xs font-bold text-[#173F2A] shrink-0 mt-1`}>
                {saathi.name.charAt(0)}
              </div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs border border-[#EDE8DA] text-xs text-[#234D32] flex items-center gap-1.5 shadow-2xs">
                <span>{saathi.name} is typing</span>
                <span className="w-1 h-1 rounded-full bg-[#9BAE91] animate-bounce" />
                <span className="w-1 h-1 rounded-full bg-[#9BAE91] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 rounded-full bg-[#9BAE91] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Follow-up Prompts */}
        <div className="px-4 py-2 bg-[#EDE8DA]/40 border-t border-[#EDE8DA] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-[#234D32]/70 shrink-0">Quick reply:</span>
          <button
            onClick={() => handleSend("I'm scared people will think I'm weak.")}
            disabled={isTyping}
            className="px-3 py-1 rounded-full bg-white text-xs font-medium text-[#173F2A] border border-[#DCE5D4] hover:bg-[#F7F3E8] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            &ldquo;I’m scared people will think I’m weak&rdquo;
          </button>
          <button
            onClick={() => handleSend("How do you manage deadlines when you're completely burned out?")}
            disabled={isTyping}
            className="px-3 py-1 rounded-full bg-white text-xs font-medium text-[#173F2A] border border-[#DCE5D4] hover:bg-[#F7F3E8] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            &ldquo;How do you manage burnout?&rdquo;
          </button>
          <button
            onClick={() => handleSend("Thanks for listening without judging me.")}
            disabled={isTyping}
            className="px-3 py-1 rounded-full bg-white text-xs font-medium text-[#173F2A] border border-[#DCE5D4] hover:bg-[#F7F3E8] transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
          >
            &ldquo;Thanks for listening&rdquo;
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#EDE8DA]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${saathi.name} anonymously...`}
              disabled={isTyping}
              className="flex-1 bg-[#F7F3E8] text-[#173F2A] placeholder-[#234D32]/50 text-sm px-4 py-3 rounded-2xl border border-[#DCE5D4] focus:outline-none focus:ring-2 focus:ring-[#9BAE91]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="bg-[#173F2A] hover:bg-[#234D32] disabled:opacity-40 text-white p-3 sm:px-5 sm:py-3 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#9BAE91]" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
