import React from 'react';
import { Screen } from '../types';
import { Sparkles, MessageCircle, HeartHandshake, Lock, BarChart3, Home } from 'lucide-react';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  isDemoMode,
  onToggleDemoMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F7F3E8] border-b border-[#9BAE91]/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            id="brand-logo-btn"
          >
            <div className="w-8 h-8 bg-[#173F2A] rounded-full flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3 2 7h-2c0-2-1-3-3-3"/>
                <path d="M7 20c-3 0-5-2-5-5 0-3.5 2.5-6.5 6-7.5"/>
                <path d="M13 14.23a4.5 4.5 0 0 0-4.23 4.23"/>
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold serif tracking-tight text-[#173F2A]">
                Sahara <span className="text-[#173F2A]/60 font-normal italic font-devanagari">सहारा</span>
              </span>
            </div>
          </button>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onNavigate('landing')}
              className={`transition-colors cursor-pointer py-1 ${
                currentScreen === 'landing'
                  ? 'text-[#173F2A] font-semibold border-b-2 border-[#173F2A]'
                  : 'text-[#173F2A]/70 hover:text-[#9BAE91]'
              }`}
              id="nav-how-it-works"
            >
              How it works
            </button>
            <button
              onClick={() => onNavigate('saathi_match')}
              className={`transition-colors cursor-pointer py-1 ${
                currentScreen === 'saathi_match' || currentScreen === 'saathi_chat'
                  ? 'text-[#173F2A] font-semibold border-b-2 border-[#173F2A]'
                  : 'text-[#173F2A]/70 hover:text-[#9BAE91]'
              }`}
              id="nav-saathi"
            >
              Saathi Peers
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className={`transition-colors cursor-pointer py-1 ${
                currentScreen === 'privacy'
                  ? 'text-[#173F2A] font-semibold border-b-2 border-[#173F2A]'
                  : 'text-[#173F2A]/70 hover:text-[#9BAE91]'
              }`}
              id="nav-privacy"
            >
              Privacy Center
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`transition-colors cursor-pointer py-1 ${
                currentScreen === 'dashboard'
                  ? 'text-[#173F2A] font-semibold border-b-2 border-[#173F2A]'
                  : 'text-[#173F2A]/70 hover:text-[#9BAE91]'
              }`}
              id="nav-space"
            >
              Student Space
            </button>
            <button
              onClick={() => onNavigate('impact')}
              className={`transition-colors cursor-pointer py-1 ${
                currentScreen === 'impact'
                  ? 'text-[#173F2A] font-semibold border-b-2 border-[#173F2A]'
                  : 'text-[#173F2A]/70 hover:text-[#9BAE91]'
              }`}
              id="nav-impact"
            >
              Campus Impact
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Demo Mode Toggle */}
            <button
              onClick={onToggleDemoMode}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                isDemoMode
                  ? 'bg-[#173F2A] text-white border-[#173F2A] shadow-xs'
                  : 'bg-white text-[#173F2A] border-[#9BAE91]/40 hover:bg-[#EDE8DA]'
              }`}
              title="Toggle presenter controls with 1-click test scenarios"
              id="demo-mode-toggle-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9BAE91]" />
              <span className="hidden sm:inline">Pitch Sandbox</span>
              <span className="sm:hidden">Demo</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isDemoMode ? 'bg-[#9BAE91]' : 'bg-stone-300'}`} />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('checkin')}
              className="bg-[#173F2A] hover:bg-[#234D32] text-white px-5 py-2 rounded-full text-xs tracking-wide uppercase font-semibold transition-all duration-200 shadow-xs hover:shadow flex items-center gap-2 cursor-pointer"
              id="header-start-btn"
            >
              <span>Start Anonymously</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
