import React, { useState, useEffect } from 'react';
import { Screen, SaathiProfile } from '../types';
import { SAATHI_PROFILES, COPING_TOOLS } from '../data/mockData';
import { Sparkles, HeartHandshake, Wind, Compass, BookOpen, Moon, ArrowRight, Play, Pause, RotateCcw, Shield, CheckCircle2, Lock } from 'lucide-react';

interface StudentDashboardScreenProps {
  onNavigate: (screen: Screen) => void;
  selectedSaathi: SaathiProfile | null;
  onSelectSaathi: (saathi: SaathiProfile) => void;
}

export const StudentDashboardScreen: React.FC<StudentDashboardScreenProps> = ({
  onNavigate,
  selectedSaathi,
  onSelectSaathi,
}) => {
  const currentSaathi = selectedSaathi || SAATHI_PROFILES[0];
  const secondarySaathi = SAATHI_PROFILES.find((p) => p.id !== currentSaathi.id) || SAATHI_PROFILES[1];

  const [selectedMood, setSelectedMood] = useState<string>('Heavy & Overwhelmed');
  
  // Interactive Breathing State (4-7-8 rhythm: Inhale 4s, Hold 7s, Exhale 8s)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathePhase, setBreathePhase] = useState<'Inhale (4s)' | 'Hold (7s)' | 'Exhale (8s)'>('Inhale (4s)');
  const [breatheSeconds, setBreatheSeconds] = useState(4);

  useEffect(() => {
    let timer: any;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreatheSeconds((prev) => {
          if (prev <= 1) {
            if (breathePhase === 'Inhale (4s)') {
              setBreathePhase('Hold (7s)');
              return 7;
            } else if (breathePhase === 'Hold (7s)') {
              setBreathePhase('Exhale (8s)');
              return 8;
            } else {
              setBreathePhase('Inhale (4s)');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathePhase('Inhale (4s)');
      setBreatheSeconds(4);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathePhase]);

  const MOOD_OPTIONS = [
    { label: 'Heavy & Overwhelmed', emoji: '🌧️' },
    { label: 'Exhausted & Sleepy', emoji: '🌙' },
    { label: 'Restless & Anxious', emoji: '⚡' },
    { label: 'Taking a breath', emoji: '🌿' },
    { label: 'A bit lighter', emoji: '🌤️' },
    { label: 'Steady & Grounded', emoji: '🪴' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DCE5D4] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE5D4] text-xs font-semibold text-[#173F2A]">
            <Sparkles className="w-3.5 h-3.5 text-[#234D32]" />
            <span>Private Sanctuary</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#173F2A]">
            Your Sahara space
          </h2>
          <p className="text-sm text-[#173F2A]/80">
            A quiet space for grounding, self-regulation, and connecting with your support circle.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-[#DCE5D4] text-xs text-[#234D32] shadow-2xs">
          <Lock className="w-4 h-4 text-[#173F2A]" />
          <span>You control what you share</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7 cols): Mood Check & Interactive Tools */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Gentle Mood Check */}
          <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#DCE5D4] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-[#173F2A]">How are you feeling right now?</h3>
                <p className="text-xs text-[#234D32]/70">No diagnosis, just a gentle check-in with yourself.</p>
              </div>
              <span className="text-xl">{MOOD_OPTIONS.find((m) => m.label === selectedMood)?.emoji}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {MOOD_OPTIONS.map((mood) => {
                const isSelected = selectedMood === mood.label;
                return (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood.label)}
                    className={`p-3 rounded-2xl border text-xs font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#173F2A] text-[#F7F3E8] border-[#173F2A] shadow-xs'
                        : 'bg-[#F7F3E8] text-[#173F2A] border-[#EDE8DA] hover:bg-[#EDE8DA]'
                    }`}
                  >
                    <span>{mood.emoji}</span>
                    <span className="truncate">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive 4-7-8 Breathing Tool */}
          <div className="bg-gradient-to-br from-[#EBF2EA] to-[#F7F3E8] rounded-3xl p-6 sm:p-8 border-2 border-[#9BAE91] shadow-md space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#234D32] bg-[#DCE5D4] px-2.5 py-0.5 rounded-full mb-1">
                  <Wind className="w-3 h-3" />
                  Interactive Breathing Tool
                </div>
                <h3 className="font-display text-2xl font-bold text-[#173F2A]">
                  4-7-8 Diaphragmatic Breath
                </h3>
                <p className="text-xs text-[#234D32] max-w-md mt-1">
                  Downregulates the nervous system and eases exam racing thoughts.
                </p>
              </div>

              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`p-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isBreathingActive
                    ? 'bg-[#173F2A] text-white shadow-sm'
                    : 'bg-white text-[#173F2A] border border-[#9BAE91] hover:bg-[#EDE8DA]'
                }`}
                id="breathing-toggle-btn"
              >
                {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#9BAE91]" />}
                <span>{isBreathingActive ? 'Pause' : 'Start Rhythm'}</span>
              </button>
            </div>

            {/* Breathing Animation Canvas */}
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div
                  className={`w-44 h-44 rounded-full border-2 border-[#9BAE91]/40 flex items-center justify-center transition-transform duration-1000 ${
                    isBreathingActive && breathePhase.includes('Inhale')
                      ? 'scale-110 bg-[#DCE5D4]/60'
                      : isBreathingActive && breathePhase.includes('Hold')
                      ? 'scale-110 bg-[#9BAE91]/40 ring-4 ring-[#9BAE91]'
                      : 'scale-90 bg-[#F7F3E8]'
                  }`}
                >
                  {/* Inner Core */}
                  <div className="w-32 h-32 rounded-full bg-[#173F2A] text-white flex flex-col items-center justify-center shadow-lg transition-all">
                    <span className="font-display text-3xl font-bold">{breatheSeconds}s</span>
                    <span className="text-[11px] font-medium text-[#9BAE91] tracking-wide mt-0.5">
                      {isBreathingActive ? breathePhase.split(' ')[0] : 'Ready'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs font-semibold text-[#234D32] text-center">
                {isBreathingActive
                  ? breathePhase === 'Inhale (4s)'
                    ? '🌿 Gently breathe in through your nose...'
                    : breathePhase === 'Hold (7s)'
                    ? '✨ Hold the air calmly in your chest...'
                    : '💨 Slowly exhale through your mouth...'
                  : 'Click "Start Rhythm" to begin a 2-minute relaxation loop.'}
              </p>
            </div>
          </div>

          {/* Coping Library Cards */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-[#173F2A]">Self-Regulation Exercises</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COPING_TOOLS.slice(1).map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white p-5 rounded-2xl border border-[#DCE5D4] hover:border-[#9BAE91] shadow-2xs transition-all space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#3D7A5A] bg-[#EBF2EA] px-2.5 py-0.5 rounded-full">
                        {tool.tag}
                      </span>
                      <span className="text-stone-500">{tool.duration}</span>
                    </div>
                    <h4 className="font-display text-base font-bold text-[#173F2A] mt-2">{tool.title}</h4>
                    <p className="text-xs text-[#234D32]/80 leading-relaxed mt-1">{tool.description}</p>
                  </div>

                  <button
                    onClick={() => onNavigate('chat')}
                    className="text-xs font-bold text-[#173F2A] hover:underline flex items-center gap-1 pt-2"
                  >
                    <span>Practice with Sahara</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Your Support Circle & Escalation */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Support Circle Card */}
          <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#DCE5D4] shadow-md space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#234D32] bg-[#DCE5D4] px-2.5 py-0.5 rounded-full">
                  Your Support Circle
                </span>
                <span className="text-[11px] text-stone-500 font-medium">3 Safe Nodes</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#173F2A] mt-2">
                People in your corner
              </h3>
              <p className="text-xs text-[#234D32]/80">
                You never rely on just one contact. Switch seamlessly whenever you want.
              </p>
            </div>

            <div className="space-y-3">
              {/* Primary Saathi Node */}
              <div className="p-4 rounded-2xl bg-[#EBF2EA] border border-[#9BAE91] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${currentSaathi.colorScheme.bg} border ${currentSaathi.colorScheme.border} flex items-center justify-center font-bold text-sm text-[#173F2A]`}>
                    {currentSaathi.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-[#173F2A]">{currentSaathi.name}</h4>
                      <span className="text-[9px] bg-[#173F2A] text-white px-1.5 py-0.2 rounded font-bold">
                        PRIMARY
                      </span>
                    </div>
                    <p className="text-[11px] text-[#234D32]">{currentSaathi.field.split('&')[0]}</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('saathi_chat')}
                  className="bg-[#173F2A] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs hover:bg-[#234D32] cursor-pointer"
                >
                  Open Chat
                </button>
              </div>

              {/* Secondary Saathi Node */}
              <div className="p-4 rounded-2xl bg-[#F7F3E8] border border-[#EDE8DA] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${secondarySaathi.colorScheme.bg} border ${secondarySaathi.colorScheme.border} flex items-center justify-center font-bold text-sm text-[#173F2A]`}>
                    {secondarySaathi.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-[#173F2A]">{secondarySaathi.name}</h4>
                      <span className="text-[9px] bg-[#9BAE91] text-[#173F2A] px-1.5 py-0.2 rounded font-bold">
                        BACKUP
                      </span>
                    </div>
                    <p className="text-[11px] text-[#234D32]/70">{secondarySaathi.field.split('&')[0]}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectSaathi(secondarySaathi);
                    onNavigate('saathi_chat');
                  }}
                  className="bg-white border border-[#DCE5D4] hover:bg-[#EDE8DA] text-[#173F2A] px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Switch
                </button>
              </div>

              {/* Professional Therapy Escalate Node */}
              <div className="p-4 rounded-2xl bg-[#F7F3E8] border border-[#EDE8DA] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#173F2A] text-white flex items-center justify-center font-bold text-sm">
                    🩺
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#173F2A]">Licensed Therapist</h4>
                    <p className="text-[11px] text-[#234D32]/70">Subsidized private care (₹0-150)</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('professional')}
                  className="bg-[#173F2A] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#234D32] cursor-pointer"
                >
                  Book
                </button>
              </div>
            </div>

            <button
              onClick={() => onNavigate('saathi_match')}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#9BAE91] text-xs font-bold text-[#173F2A] hover:bg-[#F7F3E8] transition-colors"
            >
              + Browse All Available Saathis
            </button>
          </div>

          {/* Quick 24/7 Helpline Box */}
          <div className="p-5 rounded-3xl bg-[#FDF2F2] border border-[#FFD6D6] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#962D2D]">Immediate Crisis Support:</span>
              <span className="text-[10px] bg-[#FFD6D6] text-[#962D2D] px-2 py-0.5 rounded font-bold">
                24/7 FREE
              </span>
            </div>
            <p className="text-xs text-[#5C2323] leading-relaxed">
              If you feel in danger or having thoughts of self-harm, connect with Tele-MANAS at <strong>14416</strong> or KIRAN at <strong>1800-599-0019</strong>.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
