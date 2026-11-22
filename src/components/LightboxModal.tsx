import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyGalleryItem } from '../types/estate.types';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: PropertyGalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(next);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
      if (e.key === 'ArrowRight') onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md"
    >
      {/* Top Bar: Counter & Close */}
      <div className="flex items-center justify-between text-white z-20">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#DFC5A0]">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-auto overflow-hidden py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.url}
          alt={currentItem.caption || 'Property photography'}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl animate-fade-in"
        />

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous photograph"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#C5A880] hover:text-[#0B1210] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next photograph"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#C5A880] hover:text-[#0B1210] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption Bar */}
      <div className="text-center text-xs sm:text-sm text-[#C2CBC8] max-w-2xl mx-auto py-2 z-20">
        <p className="font-light">{currentItem.caption}</p>
      </div>
    </div>
  );
};
