import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Share2,
  Calendar,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  Shield,
  Compass,
  ArrowLeft,
  ArrowRight,
  Eye,
  Send,
} from 'lucide-react';
import { PROPERTIES_DATA, ADVISORS_DATA, ESTATE_INFO } from '../data/estateData';
import { Property, Advisor } from '../types/estate.types';
import { useWishlist } from '../context/WishlistContext';
import { LightboxModal } from '../components/LightboxModal';
import { PropertyCard } from '../components/PropertyCard';

interface PropertyDetailPageProps {
  onOpenEnquiryModal: (title?: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ onOpenEnquiryModal }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Find property
  const property = PROPERTIES_DATA.find((p) => p.id === id || p.slug === id) || PROPERTIES_DATA[0];
  const advisor = ADVISORS_DATA.find((a) => a.id === property.agentId) || ADVISORS_DATA[0];

  const wishlisted = isWishlisted(property.id);

  // Gallery state
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Quick form state
  const [viewerName, setViewerName] = useState('');
  const [viewerPhone, setViewerPhone] = useState('');
  const [viewerDate, setViewerDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Similar properties
  const similarProperties = PROPERTIES_DATA.filter((p) => p.id !== property.id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedPhotoIndex(0);
    setFormSubmitted(false);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${property.title} | Estate & Co.`,
        text: `Explore ${property.title} in ${property.location.area}, Kolkata (${property.priceDisplay})`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  const handleDirectWhatsAppAdvisor = () => {
    const text = encodeURIComponent(
      `Hello ${advisor.name}! I am interested in ${property.title} (${property.priceDisplay}) in ${property.location.area}. Please share floor plans and arrange a private viewing.`
    );
    window.open(`https://wa.me/${advisor.whatsapp}?text=${text}`, '_blank');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#0B1210] min-h-screen pt-4 pb-20">
      
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between text-xs text-[#7A6F72] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Link to="/demos/real-estate" className="hover:text-[#0B1210] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/demos/real-estate/properties" className="hover:text-[#0B1210] transition-colors">
              Properties
            </Link>
            <span>/</span>
            <span className="text-[#0B1210] font-semibold truncate max-w-xs">{property.title}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-[#0B1210] hover:text-[#A58254] font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to listings</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B1210] text-[#DFC5A0]">
                {property.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E8E2D8] text-[#554C4F]">
                {property.type}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E8E2D8] text-[#554C4F]">
                {property.purpose.toUpperCase()}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1210] tracking-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#7A6F72] mt-2">
              <MapPin className="w-4 h-4 text-[#A58254] flex-shrink-0" />
              <span>{property.location.fullAddress}</span>
            </div>
          </div>

          {/* Price & Action Buttons */}
          <div className="flex flex-col md:items-end gap-3 flex-shrink-0">
            <div>
              <span className="text-xs uppercase font-bold text-[#7A6F72] block md:text-right">Price</span>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1210]">
                {property.priceDisplay}
              </div>
              <span className="text-xs text-[#8E9A96] block md:text-right">
                ₹{property.pricePerSqft.toLocaleString()} / sq.ft
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(property.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  wishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-[#E8E2D8] text-[#0B1210] hover:bg-[#FAF7F2]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-600' : ''}`} />
                <span>{wishlisted ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D8] bg-white text-[#0B1210] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* High-Resolution Interactive Image Gallery */}
        <div className="space-y-3 mb-10">
          {/* Main Large Stage */}
          <div
            onClick={() => {
              setLightboxIndex(selectedPhotoIndex);
              setLightboxOpen(true);
            }}
            className="relative aspect-[16/9] sm:aspect-[21/10] w-full rounded-3xl overflow-hidden shadow-xl bg-[#0B1210] cursor-pointer group"
          >
            <img
              src={property.gallery[selectedPhotoIndex]?.url || property.coverImage}
              alt={property.gallery[selectedPhotoIndex]?.caption || property.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* View Fullscreen Badge */}
            <div className="absolute bottom-5 right-5 z-10 px-4 py-2 rounded-full bg-black/70 hover:bg-[#0B1210] text-white backdrop-blur-md text-xs font-semibold flex items-center gap-2 transition-all">
              <Eye className="w-4 h-4 text-[#DFC5A0]" />
              <span>View Fullscreen Gallery ({property.gallery.length} Photos)</span>
            </div>

            {/* Caption */}
            <div className="absolute bottom-5 left-5 z-10 max-w-lg text-white">
              <p className="text-xs sm:text-sm font-medium drop-shadow-md">
                {property.gallery[selectedPhotoIndex]?.caption || property.tagline}
              </p>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {property.gallery.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`relative w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                  selectedPhotoIndex === idx
                    ? 'border-[#A58254] scale-102 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={photo.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Quick Specs Highlight Box */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D8] shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A58254] mb-4">
                Property Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE4D9]">
                  <Bed className="w-5 h-5 text-[#A58254] mx-auto mb-1" />
                  <span className="block text-xs text-[#7A6F72]">Bedrooms</span>
                  <span className="font-bold text-sm text-[#0B1210]">{property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Commercial'}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE4D9]">
                  <Bath className="w-5 h-5 text-[#A58254] mx-auto mb-1" />
                  <span className="block text-xs text-[#7A6F72]">Bathrooms</span>
                  <span className="font-bold text-sm text-[#0B1210]">{property.bathrooms} Baths</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE4D9]">
                  <Maximize2 className="w-5 h-5 text-[#A58254] mx-auto mb-1" />
                  <span className="block text-xs text-[#7A6F72]">Super Area</span>
                  <span className="font-bold text-sm text-[#0B1210]">{property.sqft.toLocaleString()} Sq.ft</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE4D9]">
                  <Compass className="w-5 h-5 text-[#A58254] mx-auto mb-1" />
                  <span className="block text-xs text-[#7A6F72]">Facing</span>
                  <span className="font-bold text-sm text-[#0B1210] truncate">{property.facing || 'East Facing'}</span>
                </div>
              </div>

              {/* Extra Specs Rows */}
              <div className="mt-5 pt-4 border-t border-[#F0ECE4] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[#8E9A96] block">Carpet Area:</span>
                  <span className="font-semibold text-[#0B1210]">{property.carpetArea ? `${property.carpetArea} Sq.ft` : 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[#8E9A96] block">Furnishing:</span>
                  <span className="font-semibold text-[#0B1210]">{property.furnishing || 'Semi-Furnished'}</span>
                </div>
                <div>
                  <span className="text-[#8E9A96] block">Floor:</span>
                  <span className="font-semibold text-[#0B1210]">{property.floor || 'Mid Floor'}</span>
                </div>
                <div>
                  <span className="text-[#8E9A96] block">Car Parking:</span>
                  <span className="font-semibold text-[#0B1210]">{property.parking || 'Covered Parking'}</span>
                </div>
                <div>
                  <span className="text-[#8E9A96] block">Possession:</span>
                  <span className="font-semibold text-[#0B1210]">{property.possessionDate || 'Immediate'}</span>
                </div>
                <div>
                  <span className="text-[#8E9A96] block">RERA Number:</span>
                  <span className="font-semibold text-[#0B1210] truncate block">{property.reraNumber || 'Applied'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B1210] mb-3">
                About this Residence
              </h3>
              <p className="text-base text-[#554C4F] leading-relaxed mb-4">
                {property.description}
              </p>
              <p className="text-sm text-[#665D60] leading-relaxed">
                {property.detailedDescription}
              </p>
            </div>

            {/* Key Architectural Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-[#E8E2D8]">
                <h3 className="font-serif text-xl font-bold text-[#0B1210] mb-4">
                  Signature Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#443E40]">
                  {property.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#A58254] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Grid */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0B1210] mb-4">
                World-Class Amenities
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Luxury */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A58254] mb-3">Luxury & Comfort</h4>
                  <ul className="space-y-2 text-xs text-[#554C4F]">
                    {property.amenities.luxury.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A58254]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Wellness */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A58254] mb-3">Wellness & Leisure</h4>
                  <ul className="space-y-2 text-xs text-[#554C4F]">
                    {property.amenities.wellness.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A58254]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A58254] mb-3">Security & Privacy</h4>
                  <ul className="space-y-2 text-xs text-[#554C4F]">
                    {property.amenities.security.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-[#A58254]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connectivity */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A58254] mb-3">Green & Utilities</h4>
                  <ul className="space-y-2 text-xs text-[#554C4F]">
                    {property.amenities.connectivity.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A58254]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Neighborhood & Location */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D8]">
              <h3 className="font-serif text-xl font-bold text-[#0B1210] mb-2">
                Location & Connectivity
              </h3>
              <p className="text-sm text-[#7A6F72] mb-4">
                {property.location.landmark || 'Located in an enviable neighborhood with exceptional access to business districts, international schools, and cultural hubs.'}
              </p>
              
              <div className="rounded-xl overflow-hidden aspect-[16/8] bg-[#E8E2D8] relative flex items-center justify-center border border-[#DCD5C9]">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                  alt="City Map Representation"
                  className="w-full h-full object-cover filter contrast-90"
                />
                <div className="absolute inset-0 bg-[#0B1210]/40 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#DFBE82] text-[#0B1210] flex items-center justify-center mb-2 shadow-xl animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="font-serif font-bold text-white text-base drop-shadow-md">
                    {property.location.area}, {property.location.city}
                  </span>
                  <span className="text-xs text-[#EAE4D9]">Private viewing addresses shared upon confirmed booking.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Contact & Schedule Tour Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Advisor Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D8] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A58254] block mb-3">
                Assigned Private Advisor
              </span>
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#F0ECE4]">
                <img src={advisor.image} alt={advisor.name} className="w-14 h-14 rounded-xl object-cover border border-[#E8E2D8]" />
                <div>
                  <h4 className="font-bold text-[#0B1210] text-base">{advisor.name}</h4>
                  <p className="text-xs text-[#7A6F72]">{advisor.role}</p>
                  <p className="text-[11px] text-[#A58254] font-semibold mt-0.5">★ {advisor.rating} ({advisor.clientCount})</p>
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <a
                  href={`tel:${advisor.phone}`}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#0B1210] hover:bg-[#FAF7F2] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <button
                  onClick={handleDirectWhatsAppAdvisor}
                  className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:brightness-105 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Schedule Tour Card */}
            <div className="bg-[#0E1715] text-[#EFECE6] rounded-2xl p-6 border border-[#29423C] shadow-xl sticky top-24">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880] block mb-1">
                PRIVATE VIEWING
              </span>
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                Schedule a Private Tour
              </h3>

              {formSubmitted ? (
                <div className="py-6 text-center bg-[#15221F] rounded-xl border border-[#29423C] p-4">
                  <CheckCircle2 className="w-10 h-10 text-[#DFC5A0] mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm">Site Visit Requested</h4>
                  <p className="text-xs text-[#8E9A96] mt-1 leading-relaxed">
                    Thank you, {viewerName}. Advisor {advisor.name} will reach out to confirm availability.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#C2CBC8] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={viewerName}
                      onChange={(e) => setViewerName(e.target.value)}
                      placeholder="e.g. Vikram Singhania"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#C2CBC8] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={viewerPhone}
                      onChange={(e) => setViewerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#C2CBC8] mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={viewerDate}
                      onChange={(e) => setViewerDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-xs hover:brightness-110 flex items-center justify-center gap-1.5 shadow-md cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm Site Visit Request</span>
                  </button>
                </form>
              )}

              <div className="mt-4 pt-3 border-t border-[#1F332E] text-[10px] text-[#60706B] text-center">
                ✨ 100% Confidential. Verified Private Viewing.
              </div>
            </div>

          </div>

        </div>

        {/* Similar Handpicked Properties */}
        <div className="mt-20 pt-12 border-t border-[#E8E2D8]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#A58254] block mb-1">
                SIMILAR LUXURY RESIDENCES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1210]">
                You May Also Appreciate
              </h2>
            </div>
            <Link
              to="/demos/real-estate/properties"
              className="text-xs sm:text-sm font-semibold text-[#0B1210] hover:text-[#A58254] flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={property.gallery}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
