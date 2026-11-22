import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ESTATE_INFO } from '../data/estateData';

export const FloatingWhatsApp: React.FC = () => {
  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Estate & Co.! I am browsing your luxury properties and would like to speak with a property consultant regarding private viewings.'
    );
    window.open(`https://wa.me/${ESTATE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-[#0B1210]/95 text-white text-xs font-medium border border-[#29423C] shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity hidden sm:block">
        <span className="text-[#DFC5A0] font-semibold">Instant VIP Desk:</span> Chat on WhatsApp
      </div>

      {/* Button */}
      <button
        onClick={handleOpenWhatsApp}
        aria-label="Chat with Property Advisor on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:scale-108 hover:shadow-[0_10px_30px_rgba(37,211,102,0.6)] transition-all cursor-pointer relative"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
      </button>
    </div>
  );
};
