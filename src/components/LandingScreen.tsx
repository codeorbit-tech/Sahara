import React from 'react';
import { Screen } from '../types';
import { ShieldCheck, HeartHandshake, Lock, ArrowRight, Sparkles, CheckCircle2, UserX, School, EyeOff, MessageSquareText } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
  onNavigate: (screen: Screen) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart, onNavigate }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      {/* Subtle botanical background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#DCE5D4]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-24 w-80 h-80 rounded-full bg-[#EDE8DA]/70 blur-3xl pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EDE8DA] border border-[#DCE5D4] text-[#173F2A]">
              <span className="text-sm">🌿</span>
              <span className="text-xs font-semibold tracking-wide text-[#234D32]">
                Sahara • साथी • Peer-First Mental Health
              </span>
            </div>

            {/* Main Hero Headlines */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-4 flex-wrap">
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#173F2A] leading-none">
                  Sahara
                </h1>
                <span className="font-devanagari text-3xl sm:text-4xl text-[#234D32]/80 font-medium">
                  सहारा
                </span>
              </div>

              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#234D32] leading-tight pt-2">
                &ldquo;You don’t have to say you need help.&rdquo;
              </p>

              <p className="text-base sm:text-lg text-[#173F2A]/80 max-w-2xl font-normal leading-relaxed">
                A private first step for students who are struggling, overwhelmed, or simply having a difficult day. No forms, no college reporting, and zero diagnosis labels.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onStart}
                className="bg-[#173F2A] hover:bg-[#234D32] text-[#F7F3E8] px-7 py-4 rounded-2xl text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group cursor-pointer"
                id="hero-primary-cta"
              >
                <span>Start a private conversation</span>
                <ArrowRight className="w-5 h-5 text-[#9BAE91] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('privacy')}
                className="bg-[#EDE8DA]/70 hover:bg-[#EDE8DA] text-[#173F2A] border border-[#DCE5D4] px-6 py-4 rounded-2xl text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-secondary-cta"
              >
                <Lock className="w-4 h-4 text-[#234D32]" />
                <span>How Sahara protects privacy</span>
              </button>
            </div>

            {/* 3 Small Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#DCE5D4]/70">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 border border-[#EDE8DA]">
                <div className="w-8 h-8 rounded-lg bg-[#DCE5D4]/70 flex items-center justify-center text-[#173F2A] shrink-0">
                  <UserX className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#173F2A]">No login</h4>
                  <p className="text-[11px] text-[#234D32]/70">Zero account creation</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 border border-[#EDE8DA]">
                <div className="w-8 h-8 rounded-lg bg-[#DCE5D4]/70 flex items-center justify-center text-[#173F2A] shrink-0">
                  <School className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#173F2A]">No college ID</h4>
                  <p className="text-[11px] text-[#234D32]/70">Campus never notified</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 border border-[#EDE8DA]">
                <div className="w-8 h-8 rounded-lg bg-[#DCE5D4]/70 flex items-center justify-center text-[#173F2A] shrink-0">
                  <EyeOff className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#173F2A]">Private chats</h4>
                  <p className="text-[11px] text-[#234D32]/70">Ephemeral encryption</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Calm Student at Desk Illustration & Interactive Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#EDE8DA]/90 to-white/95 p-6 sm:p-7 rounded-3xl shadow-xl border border-[#DCE5D4]">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE8DA]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#9BAE91]" />
                  <span className="text-xs font-semibold text-[#173F2A]">Safe Student Desk Canvas</span>
                </div>
                <span className="text-[11px] font-medium text-[#234D32]/80 bg-[#DCE5D4] px-2.5 py-0.5 rounded-full">
                  100% Anonymous
                </span>
              </div>

              {/* Calm Student at Desk SVG Art */}
              <div className="my-5 flex items-center justify-center">
                <svg viewBox="0 0 360 220" className="w-full h-auto max-w-[320px] drop-shadow-xs" aria-label="Calm student resting at study desk with laptop and tea">
                  <defs>
                    <linearGradient id="warmLight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F7F3E8" />
                      <stop offset="100%" stopColor="#EDE8DA" />
                    </linearGradient>
                    <linearGradient id="plantGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#9BAE91" />
                      <stop offset="100%" stopColor="#234D32" />
                    </linearGradient>
                    <linearGradient id="windowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#DCE5D4" />
                      <stop offset="100%" stopColor="#EAF2E7" />
                    </linearGradient>
                  </defs>

                  {/* Window in background */}
                  <rect x="220" y="20" width="110" height="90" rx="10" fill="url(#windowGrad)" stroke="#9BAE91" strokeWidth="2" opacity="0.6"/>
                  <line x1="275" y1="20" x2="275" y2="110" stroke="#9BAE91" strokeWidth="1.5" opacity="0.4"/>
                  <line x1="220" y1="65" x2="330" y2="65" stroke="#9BAE91" strokeWidth="1.5" opacity="0.4"/>
                  <circle cx="280" cy="45" r="14" fill="#F7F3E8" opacity="0.8"/>

                  {/* Desk Surface */}
                  <rect x="20" y="145" width="320" height="12" rx="4" fill="#234D32" />
                  <rect x="35" y="157" width="12" height="50" rx="2" fill="#173F2A" />
                  <rect x="313" y="157" width="12" height="50" rx="2" fill="#173F2A" />

                  {/* Desk Lamp */}
                  <path d="M 40 145 L 50 85 L 75 95" fill="none" stroke="#234D32" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 68 85 L 90 95 L 78 115 Z" fill="#9BAE91" />
                  <polygon points="80,105 160,150 110,150" fill="#FFF8DE" opacity="0.35" />

                  {/* Laptop */}
                  <rect x="120" y="125" width="70" height="20" rx="2" fill="#9BAE91" />
                  <polygon points="110,145 200,145 190,140 120,140" fill="#234D32" opacity="0.8" />
                  <circle cx="155" cy="135" r="3" fill="#F7F3E8" />

                  {/* Calm Student sitting comfortably */}
                  {/* Chair */}
                  <rect x="220" y="110" width="12" height="60" rx="4" fill="#EDE8DA" stroke="#9BAE91" strokeWidth="2" />
                  {/* Body & Sweater */}
                  <path d="M 185 145 C 190 120, 205 105, 230 110 C 245 115, 255 130, 255 150 Z" fill="#234D32" />
                  {/* Head & Hair */}
                  <circle cx="218" cy="85" r="18" fill="#173F2A" />
                  <circle cx="215" cy="88" r="15" fill="#E8C5A8" />
                  <path d="M 205 80 Q 220 70 230 80 Q 220 90 205 80 Z" fill="#173F2A" />
                  {/* Arm resting calmly on desk */}
                  <path d="M 215 115 Q 185 125 165 145" fill="none" stroke="#234D32" strokeWidth="12" strokeLinecap="round" />

                  {/* Warm Cup of Tea / Chai */}
                  <rect x="85" y="130" width="18" height="15" rx="3" fill="#DCE5D4" stroke="#234D32" strokeWidth="1.5" />
                  <path d="M 103 133 Q 110 137 103 142" fill="none" stroke="#234D32" strokeWidth="1.5" />
                  <path d="M 91 125 Q 94 118 91 112" fill="none" stroke="#9BAE91" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

                  {/* Potted Botanical Plant on desk */}
                  <path d="M 290 145 L 295 125 L 315 125 L 320 145 Z" fill="#DCE5D4" stroke="#234D32" strokeWidth="1.5" />
                  <path d="M 305 125 Q 295 100 285 105 Q 298 112 305 125 Z" fill="url(#plantGrad)" />
                  <path d="M 305 125 Q 315 95 325 102 Q 315 110 305 125 Z" fill="url(#plantGrad)" />
                  <path d="M 305 125 Q 305 85 300 90 Q 308 105 305 125 Z" fill="#3D7A5A" />
                </svg>
              </div>

              {/* Sample Floating Dialogue */}
              <div className="space-y-3 bg-[#F7F3E8] p-4 rounded-2xl border border-[#DCE5D4]">
                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🌿</span>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-2xs border border-[#EDE8DA] text-xs text-[#173F2A]">
                    <p className="font-semibold text-[#234D32] mb-0.5">Sahara</p>
                    <p>&ldquo;Hey. You don’t have to explain everything perfectly. What’s on your mind?&rdquo;</p>
                  </div>
                </div>
                <div className="flex items-end justify-end gap-2">
                  <div className="bg-[#173F2A] text-[#F7F3E8] p-3 rounded-2xl rounded-br-xs shadow-2xs text-xs">
                    <p className="font-medium">&ldquo;College is getting heavy and I just need someone to talk to.&rdquo;</p>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#234D32]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#9BAE91]" />
                  Zero-identity entry
                </span>
                <button
                  onClick={onStart}
                  className="font-bold text-[#173F2A] hover:underline flex items-center gap-1"
                >
                  Try now →
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Step Innovation Flow Section */}
        <section className="mt-20 sm:mt-24 pt-12 border-t border-[#DCE5D4]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#234D32] bg-[#DCE5D4] px-3 py-1 rounded-full">
              Sahara’s Core Innovation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173F2A] mt-3">
              Solving the moment BEFORE a student asks for help
            </h2>
            <p className="text-sm sm:text-base text-[#173F2A]/70 mt-2">
              Existing college counseling centers require forms, appointments, and disclosure. Sahara removes every single barrier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-[#EDE8DA] shadow-xs relative">
              <span className="absolute -top-3 left-6 bg-[#173F2A] text-[#F7F3E8] text-xs font-bold px-2.5 py-0.5 rounded-full">
                Step 1
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#DCE5D4] flex items-center justify-center text-[#173F2A] mb-4 mt-1">
                <UserX className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#173F2A] mb-1">Zero-Identity Entry</h3>
              <p className="text-xs text-[#234D32]/80 leading-relaxed">
                No names, no emails, no college credentials. The door opens with zero paperwork or commitment.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-[#EDE8DA] shadow-xs relative">
              <span className="absolute -top-3 left-6 bg-[#173F2A] text-[#F7F3E8] text-xs font-bold px-2.5 py-0.5 rounded-full">
                Step 2
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#DCE5D4] flex items-center justify-center text-[#173F2A] mb-4 mt-1">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#173F2A] mb-1">Empathetic Chat</h3>
              <p className="text-xs text-[#234D32]/80 leading-relaxed">
                Natural conversations instead of symptom surveys. Students share at their own pace without feeling judged.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-[#EDE8DA] shadow-xs relative">
              <span className="absolute -top-3 left-6 bg-[#173F2A] text-[#F7F3E8] text-xs font-bold px-2.5 py-0.5 rounded-full">
                Step 3
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#DCE5D4] flex items-center justify-center text-[#173F2A] mb-4 mt-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#173F2A] mb-1">Silent AI Triage</h3>
              <p className="text-xs text-[#234D32]/80 leading-relaxed">
                Background assessment routes to Coping Tools (Mild), Saathi Peers (Moderate), or Crisis (Severe) without diagnostic labeling.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-[#EDE8DA] shadow-xs relative">
              <span className="absolute -top-3 left-6 bg-[#173F2A] text-[#F7F3E8] text-xs font-bold px-2.5 py-0.5 rounded-full">
                Step 4
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#DCE5D4] flex items-center justify-center text-[#173F2A] mb-4 mt-1">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#173F2A] mb-1">Saathi Peer Match</h3>
              <p className="text-xs text-[#234D32]/80 leading-relaxed">
                Match by vibe (night owl, tech pressure, first-year blues) with trained student companions with independent privacy.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Bottom Sticky Footer Highlight */}
      <footer className="bg-[#EDE8DA]/80 border-t border-[#DCE5D4] py-6 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-base sm:text-lg font-bold text-[#173F2A]">
            &ldquo;No labels. No judgment. Just support that finds you.&rdquo;
          </p>
          <button
            onClick={onStart}
            className="bg-[#173F2A] hover:bg-[#234D32] text-[#F7F3E8] px-5 py-2 rounded-xl text-xs font-semibold shadow-xs"
          >
            Start Anonymously Now
          </button>
        </div>
      </footer>
    </div>
  );
};
