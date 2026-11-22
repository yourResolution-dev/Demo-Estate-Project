import React, { useState } from 'react';
import { Star, Phone, MessageSquare, Mail, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { ADVISORS_DATA } from '../data/estateData';
import { Advisor } from '../types/estate.types';
import { AdvisorModal } from '../components/AdvisorModal';

export const AgentsPage: React.FC = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  const handleCall = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (e: React.MouseEvent, whatsapp: string, name: string) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello ${name}! I would like to consult with you regarding luxury property acquisitions in Kolkata.`
    );
    window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FAF7F2] text-[#0B1210] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A58254] block mb-2">
            PRIVATE CLIENT ADVISORY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1210]">
            Our Property Advisors
          </h1>
          <p className="text-sm sm:text-base text-[#7A6F72] mt-3 leading-relaxed">
            Meet the senior advisors, investment consultants, and private brokers representing the most prestigious real estate in Eastern India.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVISORS_DATA.map((adv) => (
            <div
              key={adv.id}
              onClick={() => setSelectedAdvisor(adv)}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#E8E2D8]">
                  <img
                    src={adv.image}
                    alt={adv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-[#0B1210] flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-[#DFBE82] text-[#DFBE82]" />
                    <span>{adv.rating}</span>
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A58254] block">
                  {adv.role}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0B1210] mt-0.5 group-hover:text-[#A58254] transition-colors">
                  {adv.name}
                </h3>
                <p className="text-xs text-[#7A6F72] mt-0.5 mb-3">{adv.experience}</p>

                <div className="text-xs text-[#554C4F] space-y-1 mb-4">
                  <div>
                    <span className="text-[#8E9A96]">Client Base: </span>
                    <span className="font-semibold">{adv.clientCount}</span>
                  </div>
                  <div>
                    <span className="text-[#8E9A96]">Portfolio: </span>
                    <span className="font-semibold">{adv.activeListingsCount} Active Listings</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F0ECE4] flex items-center gap-2">
                <button
                  onClick={(e) => handleCall(e, adv.phone)}
                  className="flex-1 py-2 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#0B1210] hover:bg-[#FAF7F2] flex items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </button>
                <button
                  onClick={(e) => handleWhatsApp(e, adv.whatsapp, adv.name)}
                  className="flex-1 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:brightness-105 flex items-center justify-center gap-1 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <AdvisorModal
        advisor={selectedAdvisor}
        onClose={() => setSelectedAdvisor(null)}
      />
    </div>
  );
};
