import React, { useState } from 'react';
import { X, Sparkles, MessageSquare, CheckCircle2, Send, Building, PhoneCall } from 'lucide-react';
import { ESTATE_INFO } from '../data/estateData';

interface AgencyInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgencyInquiryModal: React.FC<AgencyInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ReSolution Digital Agency! I explored the Estate & Co. Luxury Real Estate demo and I am interested in building a high-converting website for my real estate venture.\n` +
      `Company / Brand: ${companyName || 'My Real Estate Brand'}\n` +
      `Contact Person: ${contactPerson || 'Business Owner'}\n` +
      `Phone: ${phone || 'N/A'}\n` +
      `Requirements: ${notes || 'Luxury branding, property search filters, agent showcases, WhatsApp leads, and high-performance design.'}`
    );
    window.open(`https://wa.me/${ESTATE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const agencyHighlights = [
    'Editorial Luxury Aesthetics with Bespoke Dark Forest & Gold Palette',
    'Interactive Filter Engine (Buy/Rent/Invest, Budget, Bedrooms, Location)',
    'Individual Property Showcase with High-Res Lightbox & Floor Plans',
    'Advisor Portfolio Profiles with Direct WhatsApp Lead Routing',
    'Local Storage Wishlist & Saved Property System',
    'Mobile-Optimized Touch First Experience with Zero Overflow',
    'SEO Engineered Architecture for Local Real Estate Domination',
    'Zero Ongoing Commissions - 100% Owned Real Estate Platform',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#0E1715] text-[#EFECE6] rounded-3xl shadow-2xl overflow-hidden border border-[#29423C] max-h-[92vh] flex flex-col animate-modal-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Agency Inquiry"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#15221F] hover:bg-[#1F332E] text-[#DFC5A0] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15221F] text-[#DFC5A0] text-xs font-semibold mb-2 border border-[#29423C]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>RESOLUTION DIGITAL AGENCY</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Transform Your Real Estate Brand Online
            </h3>
            <p className="text-sm text-[#8E9A96] mt-2">
              We design and build bespoke digital platforms for premier real estate developers, luxury brokerages, and property consultants.
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center bg-[#15221F]/60 rounded-2xl border border-[#29423C] p-6 mb-4">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1B332B] flex items-center justify-center text-[#DFC5A0]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white mb-2">Thank You for Inquiring!</h4>
              <p className="text-sm text-[#C2CBC8] max-w-md mx-auto mb-6">
                Our lead digital architect will contact you within 2 business hours. For immediate turnaround, reach us directly via WhatsApp.
              </p>
              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-sm hover:brightness-110 shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continue on WhatsApp Now</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-[#C2CBC8] mb-1">Company / Brokerage / Project Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#8E9A96] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Realty Developers"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-sm text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#C2CBC8] mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-sm text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#C2CBC8] mb-1">Phone / WhatsApp</label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-[#8E9A96] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-sm text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C2CBC8] mb-1">Project Scope & Requirements</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your brand, properties count, timeline, and features you need..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-sm text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Custom Proposal</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="py-3 px-4 rounded-xl bg-[#15221F] border border-[#29423C] text-[#DFC5A0] hover:bg-[#1E302B] hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </form>
          )}

          {/* Agency Deliverables List */}
          <div className="border-t border-[#1F332E] pt-5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0] mb-3">
              Included in Every ReSolution Real Estate Build
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#8E9A96]">
              {agencyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
