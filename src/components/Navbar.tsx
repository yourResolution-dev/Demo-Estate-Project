import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Search, Menu, X, ArrowRight, Phone } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ESTATE_INFO } from '../data/estateData';

interface NavbarProps {
  onOpenEnquiryModal: () => void;
  onOpenQuickSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiryModal, onOpenQuickSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { wishlistCount, openWishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/demos/real-estate' },
    { label: 'Properties', href: '/demos/real-estate/properties' },
    { label: 'Projects', href: '/demos/real-estate/projects' },
    { label: 'Agents', href: '/demos/real-estate/agents' },
    { label: 'About', href: '/demos/real-estate/about' },
    { label: 'Contact', href: '/demos/real-estate/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/demos/real-estate' && (location.pathname === '/' || location.pathname === '/demos/real-estate')) {
      return true;
    }
    return location.pathname === href;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1210]/95 backdrop-blur-md shadow-xl border-b border-[#1F332E]/70 py-3'
          : 'bg-[#0D1513]/90 backdrop-blur-sm border-b border-[#1F332E]/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/demos/real-estate"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Estate & Co. Homepage"
          >
            {/* Architectural Gold Icon */}
            <div className="w-10 h-10 rounded-lg border border-[#C5A880]/40 bg-[#15221F] flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 shadow-inner">
              <svg viewBox="0 0 32 32" className="w-full h-full text-[#DFBE82]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="9" width="10" height="19" rx="1.5" />
                <rect x="18" y="4" width="10" height="24" rx="1.5" />
                <line x1="7" y1="13" x2="11" y2="13" />
                <line x1="7" y1="17" x2="11" y2="17" />
                <line x1="7" y1="21" x2="11" y2="21" />
                <line x1="21" y1="8" x2="25" y2="8" />
                <line x1="21" y1="12" x2="25" y2="12" />
                <line x1="21" y1="16" x2="25" y2="16" />
                <line x1="21" y1="20" x2="25" y2="20" />
                <line x1="21" y1="24" x2="25" y2="24" />
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <span className="font-serif tracking-wider font-bold text-lg sm:text-xl text-white group-hover:text-[#DFBE82] transition-colors leading-tight">
                ESTATE & CO.
              </span>
              <span className="text-[9px] tracking-[0.24em] uppercase text-[#C5A880] font-medium leading-none mt-0.5">
                PREMIUM REAL ESTATE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 hover:text-[#DFC5A0] ${
                    active ? 'text-[#DFC5A0] font-semibold' : 'text-[#C2CBC8]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#DFBE82] to-[#B3925F] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              aria-label="View Saved Wishlist"
              className="relative p-2 rounded-full text-[#C2CBC8] hover:text-[#DFC5A0] hover:bg-[#15221F] transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#DFBE82] text-[#0B1210] text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Quick Search Button */}
            <button
              onClick={onOpenQuickSearch}
              aria-label="Open Property Search"
              className="p-2 rounded-full text-[#C2CBC8] hover:text-[#DFC5A0] hover:bg-[#15221F] transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Enquire Now CTA (Exact design match) */}
            <button
              onClick={onOpenEnquiryModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#DFBE82] via-[#C5A880] to-[#B3925F] text-[#0B1210] font-semibold text-xs sm:text-sm hover:brightness-110 shadow-[0_4px_16px_rgba(197,168,128,0.25)] transition-all cursor-pointer group"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="md:hidden p-2 rounded-lg text-[#C2CBC8] hover:text-white hover:bg-[#15221F] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1513] border-b border-[#1F332E] px-4 pt-4 pb-6 mt-3 animate-fade-in shadow-2xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                    active ? 'bg-[#15221F] text-[#DFC5A0]' : 'text-[#C2CBC8] hover:bg-[#15221F]/50 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#DFBE82]"></span>}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#1F332E] space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWishlist();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#15221F] text-[#DFC5A0] text-sm"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#DFBE82]" />
                  <span>Saved Wishlist</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#0B1210] text-xs font-bold text-[#DFC5A0]">
                  {wishlistCount}
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiryModal();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
