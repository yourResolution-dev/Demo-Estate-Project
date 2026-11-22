import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Handshake, Headphones, ArrowRight } from 'lucide-react';

interface WhyUsSectionProps {
  onLearnMore?: () => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onLearnMore }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      navigate('/demos/real-estate/about');
    }
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Verified Listings',
      description: '100% genuine and legally verified properties.',
    },
    {
      icon: TrendingUp,
      title: 'Investment Guidance',
      description: 'Expert advice for better returns and long-term value.',
    },
    {
      icon: Handshake,
      title: 'End-to-End Support',
      description: "From search to possession, we're with you at every step.",
    },
    {
      icon: Headphones,
      title: 'Dedicated Experts',
      description: 'A professional team always ready to assist you.',
    },
  ];

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-24 border-t border-[#EAE4D9] text-[#0B1210]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column matching reference */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A58254] block mb-3">
              WHY ESTATE & CO.
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1210] tracking-tight leading-[1.15] mb-5">
              More Than Properties, <br />
              <span className="italic font-normal">We Build Trust.</span>
            </h2>
            <p className="text-base text-[#5A5255] font-light leading-relaxed mb-8">
              A client-first real estate company committed to helping you find the right property, at the right value, with complete transparency.
            </p>
            <button
              onClick={handleLearnMore}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#DFBE82] text-[#0B1210] font-bold text-sm hover:bg-[#C5A880] transition-all shadow-[0_4px_16px_rgba(197,168,128,0.25)] cursor-pointer group"
            >
              <span>Know More About Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Column: 2x2 Grid of 4 Cards matching reference */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow border border-[#E8E2D8] flex flex-col justify-between"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#EAE4D9] flex items-center justify-center text-[#A58254] mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-lg text-[#0B1210] mb-2">
                        {b.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#7A6F72] leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
