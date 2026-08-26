import React, { useState } from 'react';
import { Counsellor, Screen } from '../types';
import { COUNSELLORS } from '../data/mockData';
import { ShieldCheck, Video, Phone, MessageSquare, Calendar, CheckCircle2, Lock, ArrowRight, X, Clock, Sparkles } from 'lucide-react';

interface ProfessionalSupportScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const ProfessionalSupportScreen: React.FC<ProfessionalSupportScreenProps> = ({
  onNavigate,
}) => {
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null);
  const [selectedModality, setSelectedModality] = useState<'Video' | 'Voice' | 'Text'>('Video');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Today, 4:30 PM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleOpenBooking = (c: Counsellor) => {
    setSelectedCounsellor(c);
    setSelectedTimeSlot(c.nextSlot);
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DCE5D4] text-xs font-semibold text-[#173F2A]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#234D32]" />
          <span>Independent Licensed Care</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F2A]">
          When you want professional support
        </h2>

        <p className="text-base text-[#173F2A]/80 font-normal">
          Subsidized, confidential counseling with licensed psychologists specialized in university & young adult wellness.
        </p>
      </div>

      {/* Counsellor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COUNSELLORS.map((counsellor) => (
          <div
            key={counsellor.id}
            className="bg-white/95 rounded-3xl border border-[#DCE5D4] hover:border-[#9BAE91] p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold text-[#173F2A]">{counsellor.name}</h3>
                    <CheckCircle2 className="w-4 h-4 text-[#3D7A5A]" />
                  </div>
                  <p className="text-xs font-semibold text-[#234D32]">{counsellor.title}</p>
                  <p className="text-[11px] text-stone-500">{counsellor.credentials}</p>
                </div>
              </div>

              {/* Subsidized Fee Badge */}
              <div className="p-3 rounded-xl bg-[#EBF2EA] border border-[#9BAE91]/40 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#173F2A]">Subsidized Student Rate:</span>
                  <span className="font-bold text-sm text-[#173F2A] bg-white px-2 py-0.5 rounded-md shadow-2xs">
                    {counsellor.fee.split('(')[0]}
                  </span>
                </div>
                <p className="text-[10px] text-[#234D32] mt-0.5">Independent student wellness grant</p>
              </div>

              {/* Specializations */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-stone-600">Specializations:</span>
                <div className="flex flex-wrap gap-1.5">
                  {counsellor.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-[#F7F3E8] text-[#173F2A] px-2.5 py-0.5 rounded-lg border border-[#EDE8DA]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modalities & Languages */}
              <div className="text-xs text-[#234D32] space-y-1 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">Available via:</span>
                  <span className="font-medium flex items-center gap-1.5">
                    {counsellor.modalities.includes('Video') && <Video className="w-3.5 h-3.5 text-[#234D32]" />}
                    {counsellor.modalities.includes('Voice') && <Phone className="w-3.5 h-3.5 text-[#234D32]" />}
                    {counsellor.modalities.includes('Text') && <MessageSquare className="w-3.5 h-3.5 text-[#234D32]" />}
                    {counsellor.modalities.join(' • ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500">Languages:</span>
                  <span className="font-medium">{counsellor.languages.join(', ')}</span>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-5 mt-4 border-t border-[#EDE8DA]">
              <button
                onClick={() => handleOpenBooking(counsellor)}
                className="w-full bg-[#173F2A] hover:bg-[#234D32] text-[#F7F3E8] py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                id={`book-session-${counsellor.id}`}
              >
                <Calendar className="w-4 h-4 text-[#9BAE91]" />
                <span>Book a private session</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Visual Privacy Architecture Explainer */}
      <div className="bg-white/95 rounded-3xl border border-[#DCE5D4] p-6 sm:p-10 shadow-lg space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#234D32] bg-[#DCE5D4] px-3 py-1 rounded-full">
            Institutional Privacy Separation
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#173F2A]">
            Your college cannot see your individual counselling sessions.
          </h3>
          <p className="text-sm text-[#173F2A]/80">
            Sahara routes all clinical records through an independent HIPAA-aligned platform. Your campus only sees aggregate statistics.
          </p>
        </div>

        {/* Visual Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Path 1: Student Private Flow */}
          <div className="p-5 rounded-2xl bg-[#EBF2EA] border-2 border-[#9BAE91] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#173F2A] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3D7A5A]" />
                What ACTUALLY happens:
              </span>
              <span className="text-[10px] bg-[#DCE5D4] text-[#173F2A] px-2 py-0.5 rounded font-bold">
                Protected Flow
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-[#173F2A] py-2">
              <div className="bg-white p-2.5 rounded-xl border border-[#9BAE91] text-center w-24">
                Student
              </div>
              <ArrowRight className="w-4 h-4 text-[#234D32]" />
              <div className="bg-white p-2.5 rounded-xl border border-[#9BAE91] text-center w-24">
                Sahara
              </div>
              <ArrowRight className="w-4 h-4 text-[#234D32]" />
              <div className="bg-[#173F2A] text-white p-2.5 rounded-xl text-center w-28">
                Independent Platform
              </div>
            </div>

            <p className="text-xs text-[#234D32] leading-relaxed">
              ✓ Sessions are 100% confidential between you and the therapist.<br />
              ✓ No grade records, disciplinary logs, or dean notifications.
            </p>
          </div>

          {/* Path 2: College View Flow */}
          <div className="p-5 rounded-2xl bg-[#F7F3E8] border border-[#EDE8DA] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#173F2A] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#173F2A]" />
                What College Administrators Receive:
              </span>
              <span className="text-[10px] bg-[#EDE8DA] text-stone-700 px-2 py-0.5 rounded font-bold">
                Anonymized Only
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#EDE8DA] text-xs text-[#234D32] space-y-1">
              <p className="font-semibold text-[#173F2A]">Campus Aggregate Insights Sample:</p>
              <div className="flex justify-between text-[11px] text-stone-600">
                <span>&ldquo;32% of sessions this month related to academic pressure&rdquo;</span>
                <span className="font-bold text-[#173F2A]">32%</span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-600">
                <span>&ldquo;24% related to sleep and burnout&rdquo;</span>
                <span className="font-bold text-[#173F2A]">24%</span>
              </div>
            </div>

            <p className="text-xs text-[#234D32]/80 leading-relaxed">
              College leadership uses trends to adjust campus policies without ever knowing WHO booked a session.
            </p>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      {selectedCounsellor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DCE5D4] shadow-2xl space-y-6 animate-in fade-in zoom-in duration-150">
            
            <div className="flex items-start justify-between border-b border-[#EDE8DA] pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-[#173F2A]">Book Private Session</h3>
                <p className="text-xs text-[#234D32]">{selectedCounsellor.name} • {selectedCounsellor.title}</p>
              </div>
              <button
                onClick={() => setSelectedCounsellor(null)}
                className="p-1 rounded-lg hover:bg-[#EDE8DA] text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!bookingConfirmed ? (
              <div className="space-y-4">
                {/* Modality Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#173F2A]">Preferred Session Modality:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Video', 'Voice', 'Text'] as const).map((mod) => (
                      <button
                        key={mod}
                        onClick={() => setSelectedModality(mod)}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          selectedModality === mod
                            ? 'bg-[#173F2A] text-white border-[#173F2A]'
                            : 'bg-[#F7F3E8] text-[#173F2A] border-[#EDE8DA] hover:bg-[#EDE8DA]'
                        }`}
                      >
                        {mod === 'Video' && <Video className="w-4 h-4" />}
                        {mod === 'Voice' && <Phone className="w-4 h-4" />}
                        {mod === 'Text' && <MessageSquare className="w-4 h-4" />}
                        <span>{mod}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Available Slot */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#173F2A]">Select Private Time Slot:</label>
                  <div className="p-3 rounded-xl bg-[#EBF2EA] border border-[#9BAE91] flex items-center justify-between text-xs text-[#173F2A]">
                    <div className="flex items-center gap-2 font-semibold">
                      <Clock className="w-4 h-4 text-[#234D32]" />
                      <span>{selectedTimeSlot}</span>
                    </div>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded font-bold text-[#3D7A5A]">
                      Verified Slot
                    </span>
                  </div>
                </div>

                {/* Privacy Badge */}
                <div className="p-3 rounded-xl bg-[#EDE8DA]/60 border border-[#DCE5D4] text-[11px] text-[#234D32]">
                  🔒 <strong>Zero Identity:</strong> You will join with an encrypted one-time link. No college login or phone number is disclosed to the university.
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-[#173F2A] hover:bg-[#234D32] text-white py-3.5 rounded-2xl text-sm font-bold shadow-md transition-all cursor-pointer"
                  id="confirm-booking-btn"
                >
                  Confirm Anonymous Booking ({selectedCounsellor.fee.split('(')[0]})
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#DCE5D4] text-[#173F2A] flex items-center justify-center text-2xl mx-auto">
                  ✓
                </div>
                <h4 className="font-display text-xl font-bold text-[#173F2A]">
                  Session Reserved Anonymously!
                </h4>
                <p className="text-xs text-[#234D32] max-w-xs mx-auto leading-relaxed">
                  Your encrypted one-time room link is ready for <strong>{selectedTimeSlot}</strong> via <strong>{selectedModality}</strong> with {selectedCounsellor.name}.
                </p>
                <div className="p-3 bg-[#F7F3E8] rounded-xl border border-[#EDE8DA] text-xs font-mono text-[#173F2A] break-all">
                  sahara.health/room/anon-9472x-secure
                </div>
                <button
                  onClick={() => setSelectedCounsellor(null)}
                  className="bg-[#173F2A] text-white px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
