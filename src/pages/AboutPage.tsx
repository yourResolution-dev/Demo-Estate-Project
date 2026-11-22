import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Sparkles, Building2, Users2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] text-[#0B1210] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A58254] block mb-2">
            HERITAGE & EXCELLENCE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1210] leading-tight">
            Curating Kolkata's Most Coveted Addresses for 15+ Years.
          </h1>
          <p className="text-base sm:text-lg text-[#6B6164] mt-5 leading-relaxed font-light">
            Founded with an uncompromising vision of architectural distinction, Estate & Co. connects distinguished families, corporate leaders, and global investors with extraordinary living spaces.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1210]">
              Beyond Brokerage: A Legacy of Fiduciary Trust
            </h2>
            <p className="text-sm sm:text-base text-[#554C4F] leading-relaxed">
              In a marketplace often crowded with generic listings and ambiguity, Estate & Co. was built as a private advisory bastion. Every single residence showcased in our portfolio undergoes thorough title verification, structural audit scrutiny, and aesthetic validation.
            </p>
            <p className="text-sm sm:text-base text-[#554C4F] leading-relaxed">
              Whether acquiring a private waterfront villa in New Town, a duplex sky penthouse in Alipore, or an income-generating commercial floor in Salt Lake Sector V, our clients enjoy bespoke discretion, bespoke legal conveyance, and white-glove closing services.
            </p>
            <div className="pt-2">
              <Link
                to="/demos/real-estate/properties"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1210] text-[#DFC5A0] font-bold text-xs sm:text-sm hover:bg-[#15221F] transition-all cursor-pointer shadow-md"
              >
                <span>View Our Property Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E2D8]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Estate Living Salon"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stat callout badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-xl max-w-xs hidden sm:block">
              <span className="font-serif text-3xl font-bold text-[#0B1210] block">
                ₹850+ Cr
              </span>
              <span className="text-xs text-[#7A6F72] mt-1 block">
                Cumulative transaction volume advised across prime luxury developments.
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Estate & Co. */}
        <div className="pt-12 border-t border-[#E8E2D8] mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A58254] block mb-2">
              OUR PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1210]">
              The Four Cornerstones of Our Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#A58254] mb-4" />
              <h3 className="font-bold text-base text-[#0B1210] mb-2">100% Legal Scrutiny</h3>
              <p className="text-xs text-[#7A6F72] leading-relaxed">
                Clear titles, zero encumbrances, and verified municipal RERA approvals prior to any property listing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-sm">
              <Award className="w-8 h-8 text-[#A58254] mb-4" />
              <h3 className="font-bold text-base text-[#0B1210] mb-2">Architectural Excellence</h3>
              <p className="text-xs text-[#7A6F72] leading-relaxed">
                We selectively curate residences characterized by superior spatial planning, abundant natural light, and premium materials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-sm">
              <HeartHandshake className="w-8 h-8 text-[#A58254] mb-4" />
              <h3 className="font-bold text-base text-[#0B1210] mb-2">Discretion & Privacy</h3>
              <p className="text-xs text-[#7A6F72] leading-relaxed">
                Strict confidential representation for high-net-worth individuals, business leaders, and public figures.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-sm">
              <Building2 className="w-8 h-8 text-[#A58254] mb-4" />
              <h3 className="font-bold text-base text-[#0B1210] mb-2">End-to-End Escrow</h3>
              <p className="text-xs text-[#7A6F72] leading-relaxed">
                Seamless support through banking liaison, interior architecture handoff, and possession registry.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
