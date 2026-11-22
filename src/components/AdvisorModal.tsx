import React, { useState } from 'react';
import { X, Star, Phone, MessageSquare, Mail, Award, CheckCircle2, Send, Building } from 'lucide-react';
import { Advisor, Property } from '../types/estate.types';
import { PROPERTIES_DATA } from '../data/estateData';
import { useNavigate } from 'react-router-dom';

interface AdvisorModalProps {
  advisor: Advisor | null;
  onClose: () => void;
}

export const AdvisorModal: React.FC<AdvisorModalProps> = ({ advisor, onClose }) => {
  const navigate = useNavigate();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!advisor) return null;

  const activeProperties = PROPERTIES_DATA.filter((p) => p.agentId === advisor.id);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${advisor.name}! I am reviewing your advisor profile on Estate & Co. and would like to schedule a private consultation regarding premium real estate in Kolkata.`
    );
    window.open(`https://wa.me/${advisor.whatsapp}?text=${text}`, '_blank');
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0E1715] text-[#EFECE6] rounded-3xl shadow-2xl overflow-hidden border border-[#29423C] max-h-[92vh] flex flex-col animate-modal-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Advisor Modal"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#15221F] hover:bg-[#1F332E] text-[#DFC5A0] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          {/* Header Profile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-[#1F332E]">
            <img
              src={advisor.image}
              alt={advisor.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-[#C5A880]/50 shadow-xl"
            />
            <div className="text-center sm:text-left flex-1">
              <span className="text-xs uppercase font-bold tracking-wider text-[#C5A880]">
                {advisor.role}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
                {advisor.name}
              </h3>
              <p className="text-xs text-[#8E9A96] mt-1">{advisor.experience}</p>

              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                <div className="flex items-center gap-1.5 bg-[#15221F] px-3 py-1 rounded-full border border-[#29423C] text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#DFBE82] text-[#DFBE82]" />
                  <span className="font-bold text-white">{advisor.rating}</span>
                  <span className="text-[#8E9A96]">({advisor.reviewCount} reviews)</span>
                </div>
                <div className="text-xs text-[#DFC5A0] font-semibold">
                  {advisor.clientCount}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="py-5 border-b border-[#1F332E]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0] mb-2">About Advisor</h4>
            <p className="text-sm text-[#C2CBC8] leading-relaxed">
              {advisor.bio}
            </p>
          </div>

          {/* Specialties & Languages */}
          <div className="py-5 border-b border-[#1F332E] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0] mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-1.5">
                {advisor.specialties.map((spec, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-[#15221F] border border-[#29423C] text-xs text-[#C2CBC8]">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0] mb-2">Languages Spoken</h4>
              <div className="flex flex-wrap gap-1.5">
                {advisor.languages.map((lang, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-[#15221F] border border-[#29423C] text-xs text-[#DFC5A0]">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Active Listings Managed */}
          {activeProperties.length > 0 && (
            <div className="py-5 border-b border-[#1F332E]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0] mb-3">
                Featured Listings Managed by {advisor.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => {
                      onClose();
                      navigate(`/demos/real-estate/property/${prop.id}`);
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl bg-[#15221F] border border-[#29423C] hover:border-[#C5A880] cursor-pointer transition-colors"
                  >
                    <img src={prop.coverImage} alt={prop.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{prop.title}</div>
                      <div className="text-[11px] text-[#DFC5A0] font-semibold">{prop.priceDisplay}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Consultation Request */}
          <div className="pt-5">
            {submitted ? (
              <div className="bg-[#15221F] p-4 rounded-xl border border-[#29423C] text-center">
                <CheckCircle2 className="w-8 h-8 text-[#DFC5A0] mx-auto mb-2" />
                <h5 className="font-bold text-white text-sm">Consultation Requested!</h5>
                <p className="text-xs text-[#8E9A96] mt-1">
                  {advisor.name} will reach out to schedule your private consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0]">
                  Request Private Consultation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-xs hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
