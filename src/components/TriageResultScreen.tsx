import React from 'react';
import { TriageSeverity, Screen } from '../types';
import { CRISIS_HELPLINES } from '../data/mockData';
import { Sparkles, HeartHandshake, PhoneCall, ShieldAlert, BookOpen, UserCheck, ArrowRight, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

interface TriageResultScreenProps {
  severity: TriageSeverity;
  onNavigate: (screen: Screen) => void;
  onSetSeverity: (severity: TriageSeverity) => void;
}

export const TriageResultScreen: React.FC<TriageResultScreenProps> = ({
  severity,
  onNavigate,
  onSetSeverity,
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
      
      {/* Container Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#DCE5D4] shadow-xl p-6 sm:p-10 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE8DA] border border-[#DCE5D4] text-xs font-semibold text-[#234D32]">
            <Sparkles className="w-3.5 h-3.5 text-[#9BAE91]" />
            <span>Sahara Adaptive Routing</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173F2A]">
            You don’t have to handle this alone.
          </h2>

          <p className="text-sm sm:text-base text-[#173F2A]/70 max-w-xl mx-auto">
            Based on what you’ve shared, Sahara recommends support designed for your comfort level. No medical labels or diagnosis.
          </p>
        </div>

        {/* Dynamic Route Box */}
        {severity === 'MILD' && (
          <div className="bg-[#EBF2EA] border-2 border-[#9BAE91] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#DCE5D4] flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🌿
              </div>
              <div className="space-y-1">
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#234D32] bg-[#DCE5D4] px-2.5 py-0.5 rounded-full mb-1">
                  Gentle Stepping Stone
                </div>
                <h3 className="font-display text-2xl font-bold text-[#173F2A]">
                  Start small
                </h3>
                <p className="text-sm text-[#234D32] leading-relaxed">
                  Try a few guided coping tools that may help you feel more grounded right now, or connect with a peer companion who understands exam & workload pressure.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-[#173F2A] hover:bg-[#234D32] text-[#F7F3E8] p-4 rounded-2xl font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-between group cursor-pointer"
                id="triage-mild-tools-btn"
              >
                <div className="text-left">
                  <p className="font-bold">Explore coping tools</p>
                  <p className="text-xs text-[#9BAE91]">Breathing, grounding & exam unload</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9BAE91] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('saathi_match')}
                className="bg-white hover:bg-[#F7F3E8] text-[#173F2A] border border-[#9BAE91] p-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-between group cursor-pointer"
                id="triage-mild-saathi-btn"
              >
                <div className="text-left">
                  <p className="font-bold">Talk to a Saathi peer</p>
                  <p className="text-xs text-[#234D32]/70">Casual companion chat</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#234D32] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {severity === 'MODERATE' && (
          <div className="bg-[#FEF7EB] border-2 border-[#E5AD35] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE7BA] flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🤝
              </div>
              <div className="space-y-1">
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#8A5A12] bg-[#FFE7BA] px-2.5 py-0.5 rounded-full mb-1">
                  Peer Connection Recommended
                </div>
                <h3 className="font-display text-2xl font-bold text-[#173F2A]">
                  Talk to a Saathi
                </h3>
                <p className="text-sm text-[#4E3919] leading-relaxed">
                  A trained student supporter who understands college life, parental expectations, and burnout. Anonymous, friendly, and pressure-free.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => onNavigate('saathi_match')}
                className="bg-[#173F2A] hover:bg-[#234D32] text-[#F7F3E8] p-4 rounded-2xl font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-between group cursor-pointer"
                id="triage-mod-saathi-btn"
              >
                <div className="text-left">
                  <p className="font-bold">Find my Saathi</p>
                  <p className="text-xs text-[#9BAE91]">Match by vibe, night owl, tech field</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9BAE91] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('professional')}
                className="bg-white hover:bg-[#FFF9F0] text-[#173F2A] border border-[#E5AD35] p-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-between group cursor-pointer"
                id="triage-mod-pro-btn"
              >
                <div className="text-left">
                  <p className="font-bold">Explore professional support</p>
                  <p className="text-xs text-[#4E3919]/70">Subsidized licensed therapists</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#173F2A] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {severity === 'SEVERE' && (
          <div className="bg-[#FDF2F2] border-2 border-[#E55353] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFD6D6] flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🆘
              </div>
              <div className="space-y-1">
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#962D2D] bg-[#FFD6D6] px-2.5 py-0.5 rounded-full mb-1">
                  Immediate 24/7 Crisis Pathway
                </div>
                <h3 className="font-display text-2xl font-bold text-[#173F2A]">
                  Let’s get you immediate support
                </h3>
                <p className="text-sm text-[#5C2323] leading-relaxed">
                  You deserve compassionate support right now. Sahara can connect you directly to confidential 24/7 national crisis helplines and licensed counselors without making you repeat everything.
                </p>
              </div>
            </div>

            {/* Helpline Directory Cards */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase text-[#962D2D] tracking-wide">
                Verified 24/7 Indian Crisis Helplines (Confidential & Free):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CRISIS_HELPLINES.map((hl, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#FFD6D6] shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#173F2A]">{hl.name}</span>
                      <span className="text-[10px] bg-[#FFD6D6] text-[#962D2D] px-2 py-0.5 rounded font-bold">
                        24/7 FREE
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-[#962D2D] tracking-wide font-mono">
                      {hl.number}
                    </p>
                    <p className="text-[11px] text-stone-600">{hl.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => onNavigate('professional')}
                className="bg-[#962D2D] hover:bg-[#7e2525] text-white p-4 rounded-2xl font-semibold text-sm shadow-md hover:shadow transition-all flex items-center justify-between group cursor-pointer"
                id="triage-severe-pro-btn"
              >
                <div className="text-left">
                  <p className="font-bold">Connect to Licensed Counsellor</p>
                  <p className="text-xs text-rose-200">Subsidized instant video/voice</p>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('saathi_match')}
                className="bg-white hover:bg-[#FDF2F2] text-[#962D2D] border border-[#E55353] p-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-between group cursor-pointer"
                id="triage-severe-saathi-btn"
              >
                <div className="text-left">
                  <p className="font-bold">Have a Saathi stay with you</p>
                  <p className="text-xs text-stone-600">Quiet peer presence while you rest</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#962D2D] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Anti-Diagnosis Trust Statement */}
        <div className="p-4 rounded-2xl bg-[#EDE8DA]/70 border border-[#DCE5D4] flex items-center justify-between flex-wrap gap-3 text-xs text-[#234D32]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#173F2A]" />
            <span>
              <strong>Zero Diagnosis Philosophy:</strong> Sahara does not attach medical tags, diagnostic codes, or institutional records to your session.
            </span>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="text-xs font-bold text-[#173F2A] hover:underline"
          >
            ← Back to Chat
          </button>
        </div>

      </div>
    </div>
  );
};
