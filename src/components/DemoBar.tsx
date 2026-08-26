import React from 'react';
import { Screen, TriageSeverity } from '../types';
import { DEMO_SCENARIOS } from '../data/mockData';
import { Sparkles, ArrowRight, RotateCcw, ShieldCheck, Zap } from 'lucide-react';

interface DemoBarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onSelectScenario: (scenario: TriageSeverity) => void;
  onReset: () => void;
  selectedSeverity: TriageSeverity | null;
}

export const DemoBar: React.FC<DemoBarProps> = ({
  currentScreen,
  onNavigate,
  onSelectScenario,
  onReset,
  selectedSeverity,
}) => {
  return (
    <div className="bg-[#173F2A] text-[#F7F3E8] py-2.5 px-4 sm:px-6 shadow-md border-b border-[#234D32] transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        
        {/* Left: Indicator & Presenter Heading */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9BAE91] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9BAE91]"></span>
          </span>
          <span className="font-semibold tracking-wide uppercase text-[11px] text-[#9BAE91] flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#DCE5D4]" />
            Presenter Sandbox:
          </span>
          <span className="text-[#EDE8DA]/80 hidden lg:inline">
            Demonstrate 3 core triage pathways in &lt; 2 minutes:
          </span>
        </div>

        {/* Center: 3 Scenario Quick Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {DEMO_SCENARIOS.map((sc) => {
            const isSelected = selectedSeverity === sc.id;
            let badgeBg = 'bg-white/10 text-white/90 border border-white/20 hover:bg-white/20';
            if (sc.id === 'MILD') {
              badgeBg = isSelected 
                ? 'bg-emerald-800 text-white border border-emerald-400 ring-2 ring-emerald-400/40 font-bold' 
                : 'bg-emerald-950/60 text-emerald-200 border border-emerald-800/60 hover:bg-emerald-900/60';
            } else if (sc.id === 'MODERATE') {
              badgeBg = isSelected 
                ? 'bg-amber-700 text-white border border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.2)] font-bold' 
                : 'bg-amber-950/60 text-amber-200 border border-amber-800/60 hover:bg-amber-900/60';
            } else if (sc.id === 'SEVERE') {
              badgeBg = isSelected 
                ? 'bg-red-800 text-white border border-red-400 ring-2 ring-red-400/40 font-bold' 
                : 'bg-red-950/60 text-rose-200 border border-red-800/60 hover:bg-red-900/60';
            }

            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc.id)}
                className={`px-3 py-1.5 rounded-lg border transition-all duration-150 flex items-center gap-1.5 shadow-xs cursor-pointer text-xs ${badgeBg}`}
                title={sc.previewDescription}
                id={`demo-scenario-${sc.id.toLowerCase()}`}
              >
                <span className="w-2 h-2 rounded-full inline-block" 
                  style={{ backgroundColor: sc.id === 'MILD' ? '#9BAE91' : sc.id === 'MODERATE' ? '#F59E0B' : '#EF4444' }} 
                />
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Screen Jump & Reset */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <select
            value={currentScreen}
            onChange={(e) => onNavigate(e.target.value as Screen)}
            className="bg-[#234D32] text-[#F7F3E8] border border-[#9BAE91]/30 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#9BAE91]"
            aria-label="Direct screen switcher"
            id="demo-screen-select"
          >
            <option value="landing">1. Landing Entry</option>
            <option value="checkin">2. Anonymous Check-In</option>
            <option value="chat">3. Sahara Chat</option>
            <option value="triage">4. AI Triage Result</option>
            <option value="saathi_match">5. Saathi Matching</option>
            <option value="saathi_chat">6. Saathi Peer Chat</option>
            <option value="professional">7. Professional Support</option>
            <option value="privacy">8. Privacy Architecture</option>
            <option value="dashboard">9. Student Space</option>
            <option value="impact">10. Campus Impact</option>
          </select>

          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-[#234D32] hover:bg-[#2d613f] text-[#DCE5D4] transition-colors"
            title="Reset conversation state to fresh session"
            id="demo-reset-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
