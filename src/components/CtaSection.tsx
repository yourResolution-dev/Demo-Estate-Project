import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onEnquireNow: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onEnquireNow }) => {
  return (
    <section className="relative overflow-hidden bg-[#0A100F] border-t border-[#1F332E] py-14 sm:py-18">
      {/* Background Architectural Skyline Silhouette matching reference */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architectural Skyline"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A100F] via-[#0A100F]/90 to-[#0A100F]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 bg-[#121E1B]/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#29423C] shadow-2xl">
          
          {/* Typography matching reference */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-sm sm:text-base text-[#C2CBC8] font-light max-w-xl">
              Get expert advice, personalized property suggestions and the best deals.
            </p>
          </div>

          {/* Action Button matching reference */}
          <button
            onClick={onEnquireNow}
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 rounded-full bg-gradient-to-r from-[#DFBE82] via-[#C5A880] to-[#B3925F] text-[#0B1210] font-bold text-sm sm:text-base hover:brightness-110 shadow-[0_4px_20px_rgba(197,168,128,0.35)] transition-all cursor-pointer group"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

        </div>
      </div>
    </section>
  );
};
