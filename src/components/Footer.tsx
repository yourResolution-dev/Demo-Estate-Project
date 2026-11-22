import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react';
import { ESTATE_INFO } from '../data/estateData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#080D0C] text-[#C2CBC8] pt-16 pb-8 border-t border-[#1F332E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1A2824]">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/demos/real-estate" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg border border-[#C5A880]/40 bg-[#15221F] flex items-center justify-center p-1.5 shadow-inner">
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
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-wider font-bold text-lg text-white">
                  ESTATE & CO.
                </span>
                <span className="text-[8px] tracking-[0.24em] uppercase text-[#C5A880] font-medium">
                  PREMIUM REAL ESTATE
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#8E9A96] leading-relaxed max-w-sm">
              Trusted real estate partner for homes, investments and commercial spaces in Kolkata and beyond.
            </p>

            {/* Social Icons matching reference */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#29423C] bg-[#101B18] flex items-center justify-center text-[#C2CBC8] hover:text-[#DFC5A0] hover:border-[#C5A880] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#29423C] bg-[#101B18] flex items-center justify-center text-[#C2CBC8] hover:text-[#DFC5A0] hover:border-[#C5A880] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-[#29423C] bg-[#101B18] flex items-center justify-center text-[#C2CBC8] hover:text-[#DFC5A0] hover:border-[#C5A880] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-[#29423C] bg-[#101B18] flex items-center justify-center text-[#C2CBC8] hover:text-[#DFC5A0] hover:border-[#C5A880] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/demos/real-estate" className="hover:text-[#DFC5A0] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/about" className="hover:text-[#DFC5A0] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/properties" className="hover:text-[#DFC5A0] transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/projects" className="hover:text-[#DFC5A0] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/agents" className="hover:text-[#DFC5A0] transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/contact" className="hover:text-[#DFC5A0] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Type (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Property Type
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/demos/real-estate/properties?type=apartment" className="hover:text-[#DFC5A0] transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/properties?type=villa" className="hover:text-[#DFC5A0] transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/properties?type=villa" className="hover:text-[#DFC5A0] transition-colors">
                  Independent Houses
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/properties?type=commercial" className="hover:text-[#DFC5A0] transition-colors">
                  Commercial Spaces
                </Link>
              </li>
              <li>
                <Link to="/demos/real-estate/properties?type=plot" className="hover:text-[#DFC5A0] transition-colors">
                  Plots & Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E9A96]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span>Kolkata, West Bengal, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                <a href={`tel:${ESTATE_INFO.phone}`} className="hover:text-[#DFC5A0] transition-colors">
                  {ESTATE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                <a href={`mailto:${ESTATE_INFO.email}`} className="hover:text-[#DFC5A0] transition-colors truncate">
                  {ESTATE_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Newsletter
            </h4>
            <p className="text-xs text-[#8E9A96]">
              Get the latest property updates and exclusive deals.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#DFC5A0] bg-[#15221F] p-2.5 rounded-xl border border-[#29423C]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#15221F] text-xs text-white placeholder-[#5A6864] px-3 py-2.5 rounded-xl border border-[#29423C] focus:outline-none focus:border-[#C5A880] pr-10"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 p-1.5 rounded-lg bg-[#C5A880] text-[#0B1210] hover:bg-[#DFC5A0] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Disclaimer & Attribution Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A8A85]">
          <p className="text-center sm:text-left">
            © 2026 Estate & Co. All Rights Reserved. A Demo Website by{' '}
            <span className="font-semibold text-[#DFC5A0]">Resolution</span>.
          </p>

          <p className="text-[11px] text-[#55635F] text-center sm:text-right">
            Fictional showcase website. No real financial or property offers implied.
          </p>
        </div>

      </div>
    </footer>
  );
};
