import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Building2,
  IndianRupee,
  Bed,
  Search,
  ArrowRight,
  PhoneCall,
  Home as HomeIcon,
  Key,
  TrendingUp,
} from 'lucide-react';
import { LOCATIONS_LIST, PROPERTY_TYPES_LIST, BEDROOM_OPTIONS, BUDGET_RANGES } from '../data/estateData';
import { PropertyPurpose } from '../types/estate.types';

interface HeroSectionProps {
  onSearch: (filters: {
    purpose: PropertyPurpose;
    location: string;
    propertyType: string;
    budgetIndex: number;
    bedrooms: string;
  }) => void;
  onOpenAdvisorModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onOpenAdvisorModal }) => {
  const navigate = useNavigate();

  // Selection tab state: Buy, Rent, Invest
  const [activeTab, setActiveTab] = useState<PropertyPurpose>('buy');

  // Search filter fields
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(0);
  const [selectedBedrooms, setSelectedBedrooms] = useState('any');

  const handleSearchClick = () => {
    onSearch({
      purpose: activeTab,
      location: selectedLocation,
      propertyType: selectedType,
      budgetIndex: selectedBudgetIndex,
      bedrooms: selectedBedrooms,
    });

    // Smooth scroll down to featured properties or navigate
    const el = document.getElementById('featured-properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#080D0C]">
      {/* Background Cinematic Architectural Villa Photography with Deep Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Villa Architectural Masterpiece at Twilight"
          className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Multi-layered luxury gradient overlays for readability and bespoke mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080D0C]/95 via-[#0B1210]/85 to-[#080D0C]/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D0C] via-transparent to-[#080D0C]/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#DFBE82]/10 via-transparent to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Top Kicker matching reference */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15221F]/80 backdrop-blur-md border border-[#29423C] text-[#DFC5A0] text-xs font-semibold tracking-wider uppercase mb-5">
            <span>BUY</span>
            <span className="text-[#C5A880]">•</span>
            <span>SELL</span>
            <span className="text-[#C5A880]">•</span>
            <span>INVEST</span>
          </div>

          {/* Headline matching reference: "Find a Place Worth Calling Home." */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-5">
            Find a Place Worth <br />
            <span className="italic font-normal text-[#DFC5A0]">Calling Home.</span>
          </h1>

          {/* Supporting description matching reference */}
          <p className="text-base sm:text-lg md:text-xl text-[#C2CBC8] font-light max-w-2xl leading-relaxed mb-8">
            Discover premium homes, apartments and commercial properties in the city's most desirable locations.
          </p>

          {/* Action Buttons matching reference */}
          <div className="flex flex-wrap items-center gap-4 mb-12 sm:mb-16">
            <button
              onClick={() => {
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/demos/real-estate/properties');
              }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFBE82] via-[#C5A880] to-[#B3925F] text-[#0B1210] font-bold text-sm sm:text-base hover:brightness-110 shadow-[0_4px_24px_rgba(197,168,128,0.35)] transition-all cursor-pointer group"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenAdvisorModal}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#101B18]/80 hover:bg-[#15221F] text-white border border-[#29423C] font-medium text-sm sm:text-base backdrop-blur-md transition-all cursor-pointer group hover:border-[#C5A880]/60"
            >
              <PhoneCall className="w-4 h-4 text-[#DFC5A0] group-hover:scale-110 transition-transform" />
              <span>Talk to an Expert</span>
            </button>
          </div>
        </div>

        {/* Interactive Buy, Rent, Invest Tabs & Floating Search Panel */}
        <div className="w-full mt-4">
          {/* Selection Tabs */}
          <div className="flex items-center gap-2 mb-0">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-t-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'buy'
                  ? 'bg-white text-[#0B1210] shadow-lg'
                  : 'bg-[#101B18]/80 text-[#C2CBC8] hover:text-white border-t border-x border-[#1F332E]'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-[#C5A880]" />
              <span>Buy</span>
            </button>

            <button
              onClick={() => setActiveTab('rent')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-t-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'rent'
                  ? 'bg-white text-[#0B1210] shadow-lg'
                  : 'bg-[#101B18]/80 text-[#C2CBC8] hover:text-white border-t border-x border-[#1F332E]'
              }`}
            >
              <Key className="w-4 h-4 text-[#C5A880]" />
              <span>Rent</span>
            </button>

            <button
              onClick={() => setActiveTab('invest')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-t-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'invest'
                  ? 'bg-white text-[#0B1210] shadow-lg'
                  : 'bg-[#101B18]/80 text-[#C2CBC8] hover:text-white border-t border-x border-[#1F332E]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#C5A880]" />
              <span>Invest</span>
            </button>
          </div>

          {/* Search Panel Card */}
          <div className="bg-white rounded-b-2xl sm:rounded-tr-2xl rounded-tl-none p-3.5 sm:p-4 md:p-5 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-2 items-center">
              
              {/* Field 1: Location */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#C5A880] transition-colors">
                <MapPin className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#7A6F72]">Location</span>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent text-[#0B1210] font-semibold text-xs sm:text-sm focus:outline-none cursor-pointer truncate"
                  >
                    {LOCATIONS_LIST.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc === 'All Locations' ? 'Select City / Area' : loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 2: Property Type */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#C5A880] transition-colors">
                <Building2 className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#7A6F72]">Property Type</span>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-transparent text-[#0B1210] font-semibold text-xs sm:text-sm focus:outline-none cursor-pointer truncate"
                  >
                    {PROPERTY_TYPES_LIST.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 3: Budget */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#C5A880] transition-colors">
                <IndianRupee className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#7A6F72]">Budget</span>
                  <select
                    value={selectedBudgetIndex}
                    onChange={(e) => setSelectedBudgetIndex(Number(e.target.value))}
                    className="w-full bg-transparent text-[#0B1210] font-semibold text-xs sm:text-sm focus:outline-none cursor-pointer truncate"
                  >
                    {BUDGET_RANGES.map((range, idx) => (
                      <option key={idx} value={idx}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 4: Bedrooms */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#C5A880] transition-colors">
                <Bed className="w-5 h-5 text-[#C5A880] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#7A6F72]">Bedrooms</span>
                  <select
                    value={selectedBedrooms}
                    onChange={(e) => setSelectedBedrooms(e.target.value)}
                    className="w-full bg-transparent text-[#0B1210] font-semibold text-xs sm:text-sm focus:outline-none cursor-pointer truncate"
                  >
                    {BEDROOM_OPTIONS.map((bed) => (
                      <option key={bed.value} value={bed.value}>
                        {bed.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:pl-2">
                <button
                  onClick={handleSearchClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#DFBE82] via-[#C5A880] to-[#B3925F] text-[#0B1210] font-bold text-sm hover:brightness-108 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                >
                  <Search className="w-4 h-4 transition-transform group-hover:scale-115" />
                  <span>Search Properties</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
