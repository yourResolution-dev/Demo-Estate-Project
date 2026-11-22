import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Property, PropertyPurpose } from '../types/estate.types';
import { PropertyCard } from './PropertyCard';

interface FeaturedPropertiesSectionProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
  onOpenFilterDrawer?: () => void;
  activeFilterPurpose?: string;
  onFilterChange?: (purpose: PropertyPurpose | 'all') => void;
}

export const FeaturedPropertiesSection: React.FC<FeaturedPropertiesSectionProps> = ({
  properties,
  onSelectProperty,
  onOpenFilterDrawer,
  activeFilterPurpose = 'all',
  onFilterChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Listings' },
    { id: 'buy', label: 'Buy' },
    { id: 'rent', label: 'Rent' },
    { id: 'invest', label: 'Invest' },
    { id: 'villa', label: 'Villas' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'penthouse', label: 'Penthouses' },
  ];

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    if (onFilterChange && (catId === 'all' || catId === 'buy' || catId === 'rent' || catId === 'invest')) {
      onFilterChange(catId as PropertyPurpose | 'all');
    }
  };

  // Filter listings
  const displayedProperties = properties.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'buy' || activeCategory === 'rent' || activeCategory === 'invest') {
      return p.purpose === activeCategory;
    }
    return p.type === activeCategory;
  });

  return (
    <section id="featured-properties" className="bg-[#FAF7F2] py-16 sm:py-20 text-[#0B1210]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching visual reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A58254] block mb-2">
              FEATURED PROPERTIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1210] tracking-tight">
              Handpicked Properties for You
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {onOpenFilterDrawer && (
              <button
                onClick={onOpenFilterDrawer}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D8D1C7] text-xs font-semibold text-[#0B1210] hover:bg-white transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A58254]" />
                <span>Filters</span>
              </button>
            )}

            <Link
              to="/demos/real-estate/properties"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B1210] hover:text-[#A58254] transition-colors group"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0B1210] text-[#DFC5A0] shadow-sm'
                  : 'bg-white text-[#5A5255] border border-[#E8E2D8] hover:border-[#C5A880] hover:text-[#0B1210]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Property Cards Grid */}
        {displayedProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E2D8] p-8">
            <h3 className="font-serif text-xl font-bold text-[#0B1210] mb-2">
              No Properties Found
            </h3>
            <p className="text-sm text-[#7A6F72] max-w-md mx-auto mb-6">
              We couldn't find listings matching your current selection. Try resetting your filter to view all luxury homes.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1210] text-[#DFC5A0] font-semibold text-xs hover:bg-[#15221F] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
