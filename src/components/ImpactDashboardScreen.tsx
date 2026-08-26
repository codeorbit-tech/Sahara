import React from 'react';
import { AGGREGATE_CAMPUS_DATA } from '../data/mockData';
import { BarChart3, Users, Clock, ShieldCheck, HeartHandshake, TrendingUp, Award, Lock, Sparkles, CheckCircle2, FileCheck } from 'lucide-react';

export const ImpactDashboardScreen: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      
      {/* Pitch / Admin Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#DCE5D4] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE5D4] text-xs font-semibold text-[#173F2A]">
            <Award className="w-3.5 h-3.5 text-[#234D32]" />
            <span>Pilot Evaluation & Impact Telemetry</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F2A]">
            Sahara Impact
          </h2>
          <p className="text-sm text-[#173F2A]/80 max-w-2xl">
            Proving trust and early intervention without violating student identity or individual confidentiality.
          </p>
        </div>

        {/* Core Philosophy Badge */}
        <div className="bg-[#173F2A] text-white p-4 rounded-2xl border border-[#234D32] shadow-sm max-w-sm">
          <p className="text-xs font-bold text-[#9BAE91] uppercase tracking-wider">Sahara Metric Tenet:</p>
          <p className="font-display text-sm font-semibold mt-0.5">
            &ldquo;We measure behavior change, not awareness.&rdquo;
          </p>
        </div>
      </div>

      {/* 4 Hero North-Star Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white/95 rounded-3xl p-6 border border-[#DCE5D4] shadow-sm space-y-2 hover:border-[#9BAE91] transition-all">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider text-[#234D32]">Campus Reach</span>
            <Users className="w-4 h-4 text-[#234D32]" />
          </div>
          <p className="font-display text-4xl sm:text-5xl font-bold text-[#173F2A]">
            {AGGREGATE_CAMPUS_DATA.totalStudentsCovered}
          </p>
          <p className="text-xs text-[#234D32]/80">Students covered across 3 pilot campuses with zero login friction.</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white/95 rounded-3xl p-6 border-2 border-[#9BAE91] shadow-sm space-y-2 bg-gradient-to-br from-white to-[#EBF2EA]">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider text-[#173F2A]">Bot Return Rate</span>
            <TrendingUp className="w-4 h-4 text-[#3D7A5A]" />
          </div>
          <p className="font-display text-4xl sm:text-5xl font-bold text-[#173F2A]">
            {AGGREGATE_CAMPUS_DATA.botReturnRate}
          </p>
          <p className="text-xs font-semibold text-[#3D7A5A]">
            &ldquo;Return rate is our strongest trust proxy.&rdquo;
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white/95 rounded-3xl p-6 border border-[#DCE5D4] shadow-sm space-y-2 hover:border-[#9BAE91] transition-all">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider text-[#234D32]">First Touchpoint</span>
            <Clock className="w-4 h-4 text-[#234D32]" />
          </div>
          <p className="font-display text-4xl sm:text-5xl font-bold text-[#173F2A]">
            {AGGREGATE_CAMPUS_DATA.avgTimeToTouchpoint}
          </p>
          <p className="text-xs text-[#234D32]/80">Down from 14+ days traditional university appointment waitlist.</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white/95 rounded-3xl p-6 border border-[#DCE5D4] shadow-sm space-y-2 hover:border-[#9BAE91] transition-all">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider text-[#234D32]">Male Help-Seeking</span>
            <HeartHandshake className="w-4 h-4 text-[#234D32]" />
          </div>
          <p className="font-display text-4xl sm:text-5xl font-bold text-[#173F2A]">
            {AGGREGATE_CAMPUS_DATA.maleHelpSeekingRate}
          </p>
          <p className="text-xs text-[#234D32]/80">Exceeding target (&ge;40%) by removing stigma & diagnostic labeling.</p>
        </div>

      </div>

      {/* Secondary Operational Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#EDE8DA]/70 p-4 rounded-2xl border border-[#DCE5D4] text-center space-y-1">
          <p className="text-[11px] font-bold uppercase text-[#234D32]">Saathi Peer Sessions</p>
          <p className="font-display text-2xl font-bold text-[#173F2A]">{AGGREGATE_CAMPUS_DATA.saathiSessionsCompleted}</p>
          <p className="text-[10px] text-stone-600">Active peer support calls</p>
        </div>

        <div className="bg-[#EDE8DA]/70 p-4 rounded-2xl border border-[#DCE5D4] text-center space-y-1">
          <p className="text-[11px] font-bold uppercase text-[#234D32]">Therapist Referrals</p>
          <p className="font-display text-2xl font-bold text-[#173F2A]">{AGGREGATE_CAMPUS_DATA.professionalEscalations}</p>
          <p className="text-[10px] text-stone-600">Subsidized licensed care</p>
        </div>

        <div className="bg-[#EDE8DA]/70 p-4 rounded-2xl border border-[#DCE5D4] text-center space-y-1">
          <p className="text-[11px] font-bold uppercase text-[#234D32]">Crisis Safe Intercepts</p>
          <p className="font-display text-2xl font-bold text-[#962D2D]">{AGGREGATE_CAMPUS_DATA.crisisInterceptsHandled}</p>
          <p className="text-[10px] text-stone-600">Routed to 24/7 helplines</p>
        </div>

        <div className="bg-[#EDE8DA]/70 p-4 rounded-2xl border border-[#DCE5D4] text-center space-y-1">
          <p className="text-[11px] font-bold uppercase text-[#234D32]">Student Trust Score</p>
          <p className="font-display text-2xl font-bold text-[#3D7A5A]">{AGGREGATE_CAMPUS_DATA.studentTrustScore}</p>
          <p className="text-[10px] text-stone-600">Zero identity leak rating</p>
        </div>
      </div>

      {/* Aggregate Trends & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-white/95 rounded-3xl p-6 sm:p-8 border border-[#DCE5D4] shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#234D32] bg-[#DCE5D4] px-2.5 py-0.5 rounded-full">
              Aggregate Concern Distribution
            </span>
            <h3 className="font-display text-2xl font-bold text-[#173F2A] mt-2">
              What Indian Students Are Actually Carrying
            </h3>
            <p className="text-xs text-[#234D32]/80">
              Macro topic breakdown from 2,000+ anonymous sessions.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {AGGREGATE_CAMPUS_DATA.breakdownByCategory.map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#173F2A]">
                  <span>{cat.category}</span>
                  <span className="font-bold">{cat.percentage}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#EDE8DA] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Activity Spike Chart (6 cols) */}
        <div className="lg:col-span-6 bg-white/95 rounded-3xl p-6 sm:p-8 border border-[#DCE5D4] shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#234D32] bg-[#DCE5D4] px-2.5 py-0.5 rounded-full">
              Temporal Demand Curve
            </span>
            <h3 className="font-display text-2xl font-bold text-[#173F2A] mt-2">
              Mid-term & Exam Spikes
            </h3>
            <p className="text-xs text-[#234D32]/80">
              Correlating student help-seeking with university semester milestones.
            </p>
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="flex items-end justify-between h-48 pt-6 border-b border-[#EDE8DA] px-2">
            {AGGREGATE_CAMPUS_DATA.monthlyTrend.map((m, idx) => {
              const maxVal = 650;
              const heightPct = Math.round((m.chats / maxVal) * 100);

              return (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className="text-[10px] font-bold text-[#173F2A] opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.chats}
                  </div>
                  <div className="w-8 sm:w-10 rounded-t-xl bg-[#234D32] group-hover:bg-[#173F2A] transition-all relative flex items-end justify-center"
                    style={{ height: `${heightPct}%` }}
                  >
                    <span className="text-[9px] text-white font-bold pb-1 hidden sm:inline">
                      {m.peerConnections}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#234D32] text-center">
                    {m.month.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#234D32] pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-[#234D32] inline-block" />
              <span>Total Sahara chats</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-[#9BAE91] inline-block" />
              <span>Saathi peer matched</span>
            </div>
          </div>
        </div>

      </div>

      {/* Pitch Assurance Banner */}
      <div className="bg-[#173F2A] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[#9BAE91] text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Strict Privacy Architecture Guarantee</span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl font-bold">
            Zero identifiable mental-health records are ever retained or shared.
          </h4>
          <p className="text-xs sm:text-sm text-[#DCE5D4] leading-relaxed">
            Sahara empowers colleges to take preventative action through macro insights, while guaranteeing absolute safety and immunity to individual students.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-[#234D32] border border-[#9BAE91]/40 text-center">
            <span className="font-display text-2xl font-bold text-white">0%</span>
            <p className="text-[10px] text-[#DCE5D4]">Data Leaks</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#234D32] border border-[#9BAE91]/40 text-center">
            <span className="font-display text-2xl font-bold text-white">100%</span>
            <p className="text-[10px] text-[#DCE5D4]">Anonymous</p>
          </div>
        </div>
      </div>

    </div>
  );
};
