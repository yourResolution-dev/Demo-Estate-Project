import React from 'react';
import { X, Heart, Trash2, ArrowRight, MapPin } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { PROPERTIES_DATA } from '../data/estateData';
import { useNavigate } from 'react-router-dom';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, closeWishlist, toggleWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  const wishlistedProperties = PROPERTIES_DATA.filter((p) => wishlist.includes(p.id));

  const handleViewProperty = (id: string) => {
    closeWishlist();
    navigate(`/demos/real-estate/property/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#0E1715] text-[#EFECE6] h-full shadow-2xl border-l border-[#29423C] flex flex-col animate-modal-in">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1F332E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#DFBE82] fill-[#DFBE82]" />
            <h3 className="font-serif text-lg font-bold text-white">
              Saved Properties ({wishlist.length})
            </h3>
          </div>

          <button
            onClick={closeWishlist}
            aria-label="Close wishlist"
            className="p-1.5 rounded-lg text-[#8E9A96] hover:text-white hover:bg-[#15221F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistedProperties.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Heart className="w-12 h-12 text-[#29423C] mx-auto mb-3" />
              <h4 className="font-semibold text-white text-sm mb-1">Your Wishlist is Empty</h4>
              <p className="text-xs text-[#8E9A96] max-w-xs mx-auto mb-5">
                Explore our handpicked collection and click the heart icon on any villa, penthouse or apartment to save it for later.
              </p>
              <button
                onClick={() => {
                  closeWishlist();
                  navigate('/demos/real-estate/properties');
                }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-xs hover:brightness-110"
              >
                Browse Listings
              </button>
            </div>
          ) : (
            wishlistedProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-[#15221F] border border-[#29423C] rounded-2xl p-3 flex gap-3 group relative hover:border-[#C5A880]/60 transition-colors"
              >
                <img
                  src={prop.coverImage}
                  alt={prop.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => handleViewProperty(prop.id)}
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => handleViewProperty(prop.id)}
                        className="text-xs font-bold text-white group-hover:text-[#DFC5A0] truncate cursor-pointer"
                      >
                        {prop.title}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(prop.id)}
                        aria-label="Remove from wishlist"
                        className="text-[#8E9A96] hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-[#8E9A96] mt-0.5">
                      <MapPin className="w-3 h-3 text-[#C5A880]" />
                      <span className="truncate">{prop.location.area}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-[#DFC5A0]">
                      {prop.priceDisplay}
                    </span>
                    <button
                      onClick={() => handleViewProperty(prop.id)}
                      className="text-[11px] font-semibold text-white hover:text-[#DFC5A0] flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {wishlistedProperties.length > 0 && (
          <div className="p-4 border-t border-[#1F332E] bg-[#0B1210] flex items-center justify-between gap-3">
            <button
              onClick={clearWishlist}
              className="text-xs text-[#8E9A96] hover:text-white underline cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                closeWishlist();
                navigate('/demos/real-estate/properties');
              }}
              className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-xs hover:brightness-110 shadow-md"
            >
              Explore More
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
