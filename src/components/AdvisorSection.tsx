import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Phone, MessageSquare } from 'lucide-react';
import { Advisor } from '../types/estate.types';

interface AdvisorSectionProps {
  advisors: Advisor[];
  onSelectAdvisor: (advisor: Advisor) => void;
}

export const AdvisorSection: React.FC<AdvisorSectionProps> = ({ advisors, onSelectAdvisor }) => {
  const handleCall = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (e: React.MouseEvent, whatsapp: string, name: string) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello ${name}! I saw your profile on Estate & Co. and would like to consult with you regarding luxury properties in Kolkata.`
    );
    window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-24 text-[#0B1210]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A58254] block mb-2">
              OUR EXPERTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1210] tracking-tight">
              Meet Our Property Advisors
            </h2>
          </div>

          <Link
            to="/demos/real-estate/agents"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B1210] hover:text-[#A58254] transition-colors group"
          >
            <span>View All Agents</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Advisor Cards matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {advisors.slice(0, 3).map((adv) => (
            <div
              key={adv.id}
              onClick={() => onSelectAdvisor(adv)}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E2D8] shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group hover:-translate-y-0.5"
            >
              {/* Left Side: Avatar Image */}
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={adv.image}
                  alt={adv.name}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border border-[#E8E2D8] flex-shrink-0 group-hover:scale-103 transition-transform"
                />

                {/* Info */}
                <div className="min-w-0">
                  <h3 className="font-sans font-bold text-base text-[#0B1210] group-hover:text-[#A58254] transition-colors truncate">
                    {adv.name}
                  </h3>
                  <p className="text-xs text-[#7A6F72] truncate mb-1">
                    {adv.role}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#0B1210]">
                    <Star className="w-3.5 h-3.5 fill-[#DFBE82] text-[#DFBE82]" />
                    <span>{adv.rating}</span>
                    <span className="text-[#8E9A96] font-normal text-[11px]">
                      ({adv.clientCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Quick Action Buttons matching reference */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => handleCall(e, adv.phone)}
                  aria-label={`Call ${adv.name}`}
                  className="w-9 h-9 rounded-full border border-[#E8E2D8] hover:border-[#0B1210] bg-[#FAF7F2] text-[#0B1210] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => handleWhatsApp(e, adv.whatsapp, adv.name)}
                  aria-label={`WhatsApp ${adv.name}`}
                  className="w-9 h-9 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
