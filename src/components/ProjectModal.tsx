import React, { useState } from 'react';
import { X, MapPin, Calendar, Building, Sparkles, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { Project } from '../types/estate.types';
import { ESTATE_INFO } from '../data/estateData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!project) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Estate & Co.! I am inquiring about the signature project "${project.name}" in ${project.location}. Please share the digital brochure, floor plans and current pricing.`
    );
    window.open(`https://wa.me/${ESTATE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0E1715] text-[#EFECE6] rounded-3xl shadow-2xl overflow-hidden border border-[#29423C] max-h-[92vh] flex flex-col animate-modal-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Project Modal"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#15221F] hover:bg-[#1F332E] text-[#DFC5A0] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Cover Image Banner */}
          <div className="relative aspect-[16/9] w-full">
            <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1715] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#DFBE82] text-[#0B1210] mb-2 inline-block">
                {project.status}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {project.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#C2CBC8] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-2xl bg-[#15221F] border border-[#29423C] text-center">
              <div>
                <span className="block text-[10px] text-[#8E9A96] uppercase">Starting Price</span>
                <span className="font-bold text-[#DFC5A0] text-sm">{project.startingPrice}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8E9A96] uppercase">Possession</span>
                <span className="font-bold text-white text-sm">{project.completionYear}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8E9A96] uppercase">Units</span>
                <span className="font-bold text-white text-sm">{project.totalUnits}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8E9A96] uppercase">Open Space</span>
                <span className="font-bold text-white text-sm">{project.openSpace}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0] mb-2">Project Overview</h4>
              <p className="text-sm text-[#C2CBC8] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0] mb-3">Key Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#C2CBC8]">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brochure / VIP Site Visit Form */}
            <div className="pt-4 border-t border-[#1F332E]">
              {submitted ? (
                <div className="bg-[#15221F] p-4 rounded-xl border border-[#29423C] text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#DFC5A0] mx-auto mb-2" />
                  <h5 className="font-bold text-white text-sm">Brochure Request Received!</h5>
                  <p className="text-xs text-[#8E9A96] mt-1">
                    Our project director will send the brochure and floor plans to your phone.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFC5A0]">
                    Download Digital Brochure & Schedule Site Visit
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone Number"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-xs hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Request Brochure & Site Visit</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="px-4 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
