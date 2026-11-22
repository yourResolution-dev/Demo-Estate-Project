import React from 'react';
import { ArrowLeft, MessageSquare, Sparkles } from 'lucide-react';
import { ESTATE_INFO } from '../data/estateData';

interface ResolutionBannerProps {
  onOpenAgencyModal: () => void;
}

export const ResolutionBanner: React.FC<ResolutionBannerProps> = ({ onOpenAgencyModal }) => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hi ReSolution Team! I am exploring the Estate & Co. Luxury Real Estate demo website and I am interested in building a high-converting, premium website for my real estate agency / builder firm.'
    );
    window.open(`https://wa.me/${ESTATE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <aside
      aria-label="Demo website notice and agency options"
      className="bg-[#080D0C] text-xs sm:text-sm text-[#C2CBC8] border-b border-[#1F332E] py-2 sm:py-2.5 px-3 sm:px-6 w-full relative z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Left: Back Link & Showcase Tag */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-[#DFC5A0] hover:text-white font-medium transition-colors group cursor-pointer text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to ReSolution</span>
          </button>
          <span className="hidden sm:inline-block text-[#29423C]">|</span>
          <span className="inline-flex items-center gap-1.5 text-[#8E9A96] font-light text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFC5A0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A880]"></span>
            </span>
            <span className="font-semibold text-[#EFECE6]">ReSolution Showcase:</span>
            <span className="hidden md:inline">Estate & Co. Bespoke Luxury Real Estate Demonstration</span>
          </span>
        </div>

        {/* Right: CTA Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#101B18] border border-[#29423C] text-[#DFC5A0] hover:bg-[#1A2E29] hover:text-white transition-all cursor-pointer font-medium text-[11px] sm:text-xs"
          >
            <MessageSquare className="w-3 h-3 text-[#C5A880]" />
            <span>WhatsApp Us</span>
          </button>

          <button
            onClick={onOpenAgencyModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-semibold hover:from-[#ECCEA4] hover:to-[#C5A880] shadow-[0_2px_12px_rgba(197,168,128,0.3)] transition-all cursor-pointer text-[11px] sm:text-xs"
          >
            <Sparkles className="w-3 h-3 text-[#0B1210]" />
            <span>Want a Website Like This?</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
