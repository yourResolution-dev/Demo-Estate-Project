import React, { useState } from 'react';
import { Search, X, MapPin, Building, ArrowRight } from 'lucide-react';
import { PROPERTIES_DATA } from '../data/estateData';
import { useNavigate } from 'react-router-dom';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PROPERTIES_DATA.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.location.area.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.priceDisplay.toLowerCase().includes(q)
        );
      })
    : PROPERTIES_DATA.slice(0, 4);

  const handleSelectProperty = (id: string) => {
    onClose();
    navigate(`/demos/real-estate/property/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0E1715] border border-[#29423C] rounded-2xl shadow-2xl overflow-hidden animate-modal-in">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#1F332E]">
          <Search className="w-5 h-5 text-[#C5A880] mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by location (e.g. New Town, Alipore), type (Villa, Penthouse), or keyword..."
            className="w-full bg-transparent text-white placeholder-[#60706B] text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-lg text-[#8E9A96] hover:text-white hover:bg-[#15221F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Result Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-xs uppercase font-semibold tracking-wider text-[#8E9A96] px-2 mb-2">
            {query.trim() ? `Search Results (${filtered.length})` : 'Popular Recommendations'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-[#8E9A96] text-sm">
              No matching properties found for "{query}". Try searching "New Town", "Villa", or "Salt Lake".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectProperty(item.id)}
                className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#15221F] cursor-pointer transition-colors group"
              >
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-[#29423C]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#DFC5A0] truncate">
                      {item.title}
                    </h4>
                    <span className="text-xs font-bold text-[#DFC5A0] ml-2 flex-shrink-0">
                      {item.priceDisplay}
                    </span>
                  </div>
                  <p className="text-xs text-[#8E9A96] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C5A880]" />
                    <span className="truncate">{item.location.area}, {item.location.city}</span>
                    <span className="mx-1 text-[#29423C]">•</span>
                    <span className="capitalize">{item.type}</span>
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8E9A96] group-hover:text-[#DFC5A0] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#0B1210] border-t border-[#1F332E] text-xs text-[#8E9A96] flex items-center justify-between">
          <span>Press ESC to close</span>
          <button
            onClick={() => {
              onClose();
              navigate(`/demos/real-estate/properties?q=${encodeURIComponent(query)}`);
            }}
            className="text-[#DFC5A0] hover:underline font-medium"
          >
            Explore all in catalog →
          </button>
        </div>
      </div>
    </div>
  );
};
