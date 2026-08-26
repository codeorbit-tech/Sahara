import React, { useState } from 'react';
import { SaathiProfile } from '../types';
import { SAATHI_PROFILES } from '../data/mockData';
import { HeartHandshake, Shield, Sparkles, Filter, CheckCircle2, MessageCircle, ArrowRight, Star } from 'lucide-react';

interface SaathiMatchingScreenProps {
  onSelectSaathi: (saathi: SaathiProfile) => void;
  selectedSaathi: SaathiProfile | null;
}

const FILTER_TAGS = [
  'All',
  'Night owl',
  'Tech & Engineering',
  'Exam & performance pressure',
  'Hostelite / Homesick',
  'First-year experience',
  'Creative & Arts',
  'Placement stress',
  'Family expectations',
];

export const SaathiMatchingScreen: React.FC<SaathiMatchingScreenProps> = ({
  onSelectSaathi,
  selectedSaathi,
}) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProfiles = SAATHI_PROFILES.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Night owl') return p.vibeTags.some((t) => t.label.includes('Night owl') || t.label.includes('Late-night'));
    if (activeFilter === 'Tech & Engineering') return p.field.toLowerCase().includes('computer') || p.field.toLowerCase().includes('tech') || p.field.toLowerCase().includes('engineer');
    if (activeFilter === 'Exam & performance pressure') return p.vibeTags.some((t) => t.label.toLowerCase().includes('pressure') || t.label.toLowerCase().includes('exam'));
    if (activeFilter === 'Hostelite / Homesick') return p.vibeTags.some((t) => t.label.toLowerCase().includes('hostel')) || p.bio.toLowerCase().includes('hostel') || p.bio.toLowerCase().includes('away from home');
    if (activeFilter === 'First-year experience') return p.vibeTags.some((t) => t.label.toLowerCase().includes('first-year')) || p.bio.toLowerCase().includes('first-year');
    if (activeFilter === 'Creative & Arts') return p.vibeTags.some((t) => t.label.toLowerCase().includes('creative')) || p.field.toLowerCase().includes('design');
    if (activeFilter === 'Placement stress') return p.vibeTags.some((t) => t.label.toLowerCase().includes('placement')) || p.bio.toLowerCase().includes('placement');
    if (activeFilter === 'Family expectations') return p.vibeTags.some((t) => t.label.toLowerCase().includes('family')) || p.bio.toLowerCase().includes('family');
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DCE5D4] text-xs font-semibold text-[#173F2A]">
          <HeartHandshake className="w-3.5 h-3.5 text-[#234D32]" />
          <span>Saathi = साथी = Peer Companion</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F2A]">
          Find someone who gets it.
        </h2>

        <p className="text-base text-[#173F2A]/80 font-normal">
          Choose a Saathi by what feels comfortable — not by institutional identity or hierarchy.
        </p>

        <div className="inline-block bg-[#EDE8DA]/80 px-4 py-1.5 rounded-full border border-[#DCE5D4] text-xs font-semibold text-[#234D32]">
          ✨ Match by vibe, not by name.
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center no-scrollbar">
        <div className="flex items-center gap-1.5 text-xs text-[#234D32] font-semibold mr-1 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter by vibe:</span>
        </div>
        {FILTER_TAGS.map((tag) => {
          const isActive = activeFilter === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#173F2A] text-[#F7F3E8] shadow-xs'
                  : 'bg-white text-[#173F2A] border border-[#DCE5D4] hover:bg-[#EDE8DA]'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Saathi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((saathi) => {
          const isSelected = selectedSaathi?.id === saathi.id;

          return (
            <div
              key={saathi.id}
              className={`rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between hover:shadow-lg relative ${
                isSelected
                  ? 'bg-white border-[#173F2A] ring-2 ring-[#9BAE91] shadow-md'
                  : 'bg-white/90 border-[#DCE5D4] hover:border-[#9BAE91]'
              }`}
            >
              <div className="space-y-4">
                
                {/* Saathi Card Top Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${saathi.colorScheme.bg} border ${saathi.colorScheme.border} flex items-center justify-center font-display font-bold text-xl text-[#173F2A] shadow-xs`}>
                      {saathi.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-xl font-bold text-[#173F2A]">{saathi.name}</h3>
                        <span className="text-[10px] bg-[#DCE5D4] text-[#173F2A] px-2 py-0.5 rounded-full font-semibold">
                          {saathi.year}
                        </span>
                      </div>
                      <p className="text-xs text-[#234D32]/80">{saathi.field}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#234D32] bg-[#EDE8DA] px-2.5 py-1 rounded-full font-medium">
                    {saathi.availability.split('(')[0]}
                  </span>
                </div>

                {/* Vibe Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {saathi.vibeTags.map((v, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#F7F3E8] border border-[#EDE8DA] text-[#173F2A]"
                    >
                      <span>{v.icon}</span>
                      <span>{v.label}</span>
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className="text-xs text-[#173F2A]/90 leading-relaxed pt-1">
                  &ldquo;{saathi.bio}&rdquo;
                </p>

                {/* Languages & Certification Badges */}
                <div className="pt-2 border-t border-[#EDE8DA] space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#234D32]/80">
                    <span>Languages:</span>
                    <span className="font-medium text-[#173F2A]">{saathi.languages.join(' • ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#234D32] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#9BAE91]" />
                    <span>{saathi.badges[0]}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-[#EDE8DA]">
                <button
                  onClick={() => onSelectSaathi(saathi)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#173F2A] text-white shadow-sm'
                      : 'bg-[#EDE8DA] hover:bg-[#173F2A] text-[#173F2A] hover:text-white'
                  }`}
                  id={`connect-saathi-${saathi.id}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with {saathi.name}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Safety Bottom Explainer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#EDE8DA]/70 border border-[#DCE5D4] flex items-center justify-between flex-wrap gap-4 text-xs text-[#234D32]">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-[#173F2A] shrink-0" />
          <p>
            <strong>Saathi Safety Promise:</strong> All Saathis are trained student peers who uphold non-judgmental listening and zero institutional disclosure.
          </p>
        </div>
      </div>

    </div>
  );
};
