import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, Heart, ArrowUpRight } from 'lucide-react';
import { Property } from '../types/estate.types';
import { useWishlist } from '../context/WishlistContext';

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(property.id);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(property);
    } else {
      navigate(`/demos/real-estate/property/${property.id}`);
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'For Sale':
        return 'bg-[#3D5A73]/90 text-white';
      case 'Ready to Move':
        return 'bg-[#E3A839] text-[#0B1210] font-bold';
      case 'Under Construction':
        return 'bg-[#D97736] text-white';
      case 'Exclusive':
        return 'bg-[#8F3E52] text-white';
      case 'Just Launched':
        return 'bg-[#2E7D59] text-white';
      default:
        return 'bg-[#15221F] text-white';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E2D8] flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Photograph Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E2D8]">
        <img
          src={property.coverImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            className={`px-3 py-1 rounded-full text-[11px] sm:text-xs tracking-wide shadow-md backdrop-blur-xs font-semibold ${getStatusBadgeStyle(
              property.status
            )}`}
          >
            {property.status}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(property.id);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
            wishlisted
              ? 'bg-rose-50 text-rose-500 scale-105'
              : 'bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Purpose Indicator */}
        <div className="absolute bottom-3 left-3.5 z-10">
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
            {property.purpose.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Top Row: Title & Price */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-sans font-bold text-base sm:text-lg text-[#0B1210] group-hover:text-[#9F7A49] transition-colors leading-snug truncate">
              {property.title}
            </h3>
            <span className="font-serif font-bold text-base sm:text-lg text-[#0B1210] whitespace-nowrap">
              {property.priceDisplay}
            </span>
          </div>

          {/* Location with Pin */}
          <div className="flex items-center gap-1.5 text-xs text-[#7A6F72] mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
            <span className="truncate">{property.location.area}, {property.location.city}</span>
          </div>
        </div>

        {/* Specs Row matching reference: Beds | Baths | Sq.ft */}
        <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between text-xs text-[#4A4547] font-medium">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#8E9A96]" />
            <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Commercial'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#8E9A96]" />
            <span>{property.bathrooms} Baths</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-[#8E9A96]" />
            <span>{property.sqft.toLocaleString()} Sq.ft</span>
          </div>
        </div>

        {/* Action Link (Shown on Hover / Desktop) */}
        <div className="mt-3 pt-2.5 border-t border-dashed border-[#F0ECE4] flex items-center justify-between text-xs font-semibold text-[#8C6D3F] group-hover:text-[#0B1210] transition-colors">
          <span>View Property Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
