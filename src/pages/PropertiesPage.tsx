import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Grid3X3,
  List,
  MapPin,
  ArrowUpDown,
} from 'lucide-react';
import { PROPERTIES_DATA, LOCATIONS_LIST, PROPERTY_TYPES_LIST, BEDROOM_OPTIONS } from '../data/estateData';
import { Property, PropertyPurpose } from '../types/estate.types';
import { PropertyCard } from '../components/PropertyCard';

export const PropertiesPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [purpose, setPurpose] = useState<PropertyPurpose | 'all'>(
    (searchParams.get('purpose') as PropertyPurpose) || 'all'
  );
  const [location, setLocation] = useState(searchParams.get('location') || 'All Locations');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [bedrooms, setBedrooms] = useState('any');
  const [maxBudget, setMaxBudget] = useState(100000000); // 10 Cr default
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc'>('featured');

  // Filter application
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => {
      // Purpose filter
      if (purpose !== 'all' && p.purpose !== purpose) return false;

      // Location filter
      if (location !== 'All Locations' && p.location.area !== location) return false;

      // Type filter
      if (type !== 'all' && p.type !== type) return false;

      // Bedrooms filter
      if (bedrooms !== 'any') {
        if (bedrooms === '5+' && p.bedrooms < 5) return false;
        if (bedrooms !== '5+' && p.bedrooms !== Number(bedrooms)) return false;
      }

      // Budget filter
      if (p.priceValue > maxBudget) return false;

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesArea = p.location.area.toLowerCase().includes(q);
        const matchesCity = p.location.city.toLowerCase().includes(q);
        const matchesType = p.type.toLowerCase().includes(q);
        if (!matchesTitle && !matchesArea && !matchesCity && !matchesType) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceValue - b.priceValue;
      if (sortBy === 'price-desc') return b.priceValue - a.priceValue;
      if (sortBy === 'area-desc') return b.sqft - a.sqft;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [purpose, location, type, bedrooms, maxBudget, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setPurpose('all');
    setLocation('All Locations');
    setType('all');
    setBedrooms('any');
    setMaxBudget(100000000);
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FAF7F2] text-[#0B1210] min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A58254] block mb-2">
            EXCLUSIVE RESIDENCES & ASSETS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1210]">
            Luxury Property Collection
          </h1>
          <p className="text-sm text-[#7A6F72] mt-2 max-w-2xl">
            Browse our verified inventory of architect-designed villas, sky penthouses, and high-yield commercial investments across Kolkata.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D8] shadow-sm mb-8 space-y-4">
          
          {/* Top Row: Search Input & Purpose Selector */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#A58254] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood, project or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm text-[#0B1210] focus:outline-none focus:border-[#A58254]"
              />
            </div>

            {/* Purpose Tabs */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {(['all', 'buy', 'rent', 'invest'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    purpose === p
                      ? 'bg-[#0B1210] text-[#DFC5A0] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#554C4F] hover:bg-[#EAE4D9]'
                  }`}
                >
                  {p === 'all' ? 'All Purpose' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Filter Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-[#F0ECE4]">
            
            {/* Location */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-[#7A6F72] mb-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs font-semibold text-[#0B1210] focus:outline-none cursor-pointer"
              >
                {LOCATIONS_LIST.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-[#7A6F72] mb-1">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs font-semibold text-[#0B1210] focus:outline-none cursor-pointer"
              >
                {PROPERTY_TYPES_LIST.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-[#7A6F72] mb-1">Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs font-semibold text-[#0B1210] focus:outline-none cursor-pointer"
              >
                {BEDROOM_OPTIONS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-[#7A6F72] mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs font-semibold text-[#0B1210] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest First</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full py-2 px-3 rounded-xl border border-[#D8D1C7] text-xs font-semibold text-[#0B1210] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#A58254]" />
                <span>Reset Filters</span>
              </button>
            </div>

          </div>
        </div>

        {/* Results Count & Active Status */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#7A6F72]">
          <div>
            Showing <span className="font-bold text-[#0B1210]">{filteredProperties.length}</span> luxury properties
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D8] max-w-lg mx-auto">
            <h3 className="font-serif text-2xl font-bold text-[#0B1210] mb-2">No Matching Properties</h3>
            <p className="text-xs text-[#7A6F72] mb-6">
              None of our current listings match your specific combination of filters. Try broadening your budget or location selection.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-[#0B1210] text-[#DFC5A0] font-bold text-xs hover:bg-[#15221F] cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
