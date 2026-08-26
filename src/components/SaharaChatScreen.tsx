import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, TriageSeverity } from '../types';
import { Shield, Send, Lock, Sparkles, ArrowRight, Mic } from 'lucide-react';

interface SaharaChatScreenProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onProceedToTriage: (inferredSeverity?: TriageSeverity) => void;
  isTyping: boolean;
  currentSeverity: TriageSeverity | null;
}

const QUICK_RESPONSES = [
  "Academics mostly",
  "Everything piling up",
  "Relationships / Social",
  "Can't sleep lately",
  "Hostel & homesickness",
  "Placement pressure",
];

export const SaharaChatScreen: React.FC<SaharaChatScreenProps> = ({
  messages,
  onSendMessage,
  onProceedToTriage,
  isTyping,
  currentSeverity,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickClick = (phrase: string) => {
    if (isTyping) return;
    onSendMessage(phrase);
  };

  const studentMessageCount = messages.filter((m) => m.sender === 'student').length;

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-5xl mx-auto p-3 sm:p-6 flex flex-col justify-between">
      
      {/* Messaging Container */}
      <div className="bg-[#F7F3E8] rounded-3xl border border-[#9BAE91]/30 shadow-xl flex flex-col h-[76vh] sm:h-[80vh] overflow-hidden">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-[#9BAE91]/20 flex items-center px-6 justify-between shrink-0 bg-white/40 backdrop-blur-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#173F2A]/70">
              Anonymous Session &bull; Private
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-[#DCE5D4] text-[10px] font-bold text-[#173F2A] rounded-full uppercase tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#173F2A]" />
              <span>
                {currentSeverity === 'SEVERE'
                  ? 'High Distress Detected'
                  : currentSeverity === 'MODERATE'
                  ? 'Moderate Distress Detected'
                  : 'Mild Stress Triage'}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#173F2A]/60 ml-2">
              <Lock className="w-3 h-3 text-[#9BAE91]" />
              <span>Zero-Identity</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F7F3E8]">
          
          {/* Subtle Security Pill */}
          <div className="flex justify-center my-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE8DA]/70 border border-[#9BAE91]/20 text-[11px] text-[#173F2A]/70">
              <Shield className="w-3 h-3 text-[#173F2A]" />
              <span>This conversation is completely anonymous and never linked to your college record.</span>
            </div>
          </div>

          {/* Render Messages */}
          {messages.map((msg) => {
            const isSahara = msg.sender === 'sahara';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] sm:max-w-[78%] ${
                  isSahara ? 'self-start' : 'self-end flex-row-reverse ml-auto'
                }`}
              >
                {isSahara && (
                  <div className="w-8 h-8 rounded-full bg-[#9BAE91] shrink-0 flex items-center justify-center text-white text-xs shadow-2xs mt-0.5">
                    🌿
                  </div>
                )}

                <div
                  className={`p-4 text-sm leading-relaxed ${
                    isSahara
                      ? 'chat-bubble-bot text-[#173F2A] border border-[#9BAE91]/20'
                      : 'chat-bubble-user text-white'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div
                    className={`text-[10px] mt-1.5 ${
                      isSahara ? 'text-[#173F2A]/50' : 'text-white/60'
                    } text-right`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%] self-start">
              <div className="w-8 h-8 rounded-full bg-[#9BAE91] shrink-0 flex items-center justify-center text-white text-xs">
                🌿
              </div>
              <div className="chat-bubble-bot p-4 text-sm text-[#173F2A] flex items-center gap-1.5 border border-[#9BAE91]/20">
                <span className="text-xs font-medium text-[#173F2A]/70 mr-1">Sahara is listening</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#9BAE91] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#9BAE91] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#9BAE91] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {studentMessageCount < 6 && (
          <div className="px-5 py-2.5 bg-white/30 border-t border-[#9BAE91]/20 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[11px] font-semibold text-[#173F2A]/60 shrink-0">Quick taps:</span>
            {QUICK_RESPONSES.map((resp, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickClick(resp)}
                disabled={isTyping}
                className="px-3.5 py-1.5 border border-[#9BAE91] rounded-full text-xs font-medium text-[#173F2A] hover:bg-[#9BAE91] hover:text-white transition-all whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {resp}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar & Proceed Action */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#9BAE91]/20 shrink-0 space-y-2">
          
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className="w-full bg-[#F7F3E8] rounded-2xl border border-[#9BAE91]/30 flex items-center px-4 gap-3 shadow-2xs focus-within:ring-2 focus-within:ring-[#9BAE91] focus-within:border-transparent transition-all">
              <Mic className="w-4 h-4 text-[#173F2A]/40 shrink-0" />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type anything. Be as open as you want..."
                disabled={isTyping}
                className="flex-1 bg-transparent py-3 text-sm text-[#173F2A] placeholder-[#173F2A]/40 focus:outline-none"
                id="chat-input-field"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-9 h-9 bg-[#173F2A] hover:bg-[#234D32] disabled:opacity-40 rounded-xl flex items-center justify-center text-white transition-all shrink-0 cursor-pointer"
                id="chat-send-btn"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-[#9BAE91]" />
              </button>
            </div>
          </form>

          {/* AI Silent Triage Recommendation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 px-1">
            <div className="flex items-center gap-1.5 text-xs text-[#173F2A]/70">
              <Sparkles className="w-3.5 h-3.5 text-[#9BAE91]" />
              <span>
                Silent triage active: <strong className="text-[#173F2A]">No clinical labels</strong>
              </span>
            </div>

            <button
              onClick={() => onProceedToTriage(currentSeverity || 'MODERATE')}
              className="w-full sm:w-auto bg-[#DCE5D4] hover:bg-[#9BAE91]/40 text-[#173F2A] text-xs font-bold px-4 py-1.5 rounded-full border border-[#9BAE91] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              id="see-what-helps-btn"
            >
              <span>See recommended support pathway</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
