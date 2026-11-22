import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, MessageSquare, Send, Building } from 'lucide-react';
import { ESTATE_INFO } from '../data/estateData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  propertyId,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('site_visit');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Estate & Co.! I am inquiring about ${propertyTitle ? `the property "${propertyTitle}"` : 'luxury properties in Kolkata'}.\n` +
      `Name: ${fullName || 'Interested Client'}\n` +
      `Phone: ${phone || 'N/A'}\n` +
      `Preferred Visit: ${preferredDate ? `${preferredDate} at ${preferredTime}` : 'Earliest Available'}\n` +
      `Note: ${message || 'Please arrange a private VIP preview.'}`
    );
    window.open(`https://wa.me/${ESTATE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0E1715] text-[#EFECE6] rounded-3xl shadow-2xl overflow-hidden border border-[#29423C] max-h-[92vh] flex flex-col animate-modal-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Enquiry Modal"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#15221F] hover:bg-[#1F332E] text-[#DFC5A0] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          
          {/* Header */}
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880] block mb-1">
              ESTATE & CO. VIP DESK
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {propertyTitle ? `Enquire About ${propertyTitle}` : 'Schedule a Private Consultation'}
            </h3>
            <p className="text-xs text-[#8E9A96] mt-1.5">
              Connect directly with our senior property advisors for confidential pricing, floor plans, and VIP site viewings.
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center bg-[#15221F] rounded-2xl border border-[#29423C] p-6 mb-2">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1E362D] flex items-center justify-center text-[#DFC5A0]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white mb-2">Enquiry Registered</h4>
              <p className="text-xs text-[#C2CBC8] max-w-md mx-auto mb-5 leading-relaxed">
                Thank you, {fullName}. Our senior relationship advisor will contact you shortly to confirm your preview schedule. (Demo confirmation)
              </p>
              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-xs hover:brightness-110 shadow-lg cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Advisor on WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#C2CBC8] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sen"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#C2CBC8] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Email & Intent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#C2CBC8] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#C2CBC8] mb-1">Interest Category</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="site_visit">Schedule Private Site Visit</option>
                    <option value="buying">Looking to Buy</option>
                    <option value="renting">Looking to Rent</option>
                    <option value="investment">Commercial / NRI Investment</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#C2CBC8] mb-1">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#8E9A96] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#C2CBC8] mb-1">Preferred Time Slot</label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 text-[#8E9A96] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                      <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="04:30 PM">04:30 PM - 06:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-medium text-[#C2CBC8] mb-1">Specific Requirements / Inquiries</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention any specific floor preferences, budget limits, or questions..."
                  className="w-full px-3 py-2 rounded-xl bg-[#15221F] border border-[#29423C] text-xs text-white placeholder-[#5A6864] focus:outline-none focus:border-[#C5A880]"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#DFBE82] to-[#B3925F] text-[#0B1210] font-bold text-xs hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit VIP Enquiry</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="py-3 px-5 rounded-xl bg-[#15221F] border border-[#29423C] text-[#DFC5A0] hover:bg-[#1C2C28] flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Connect on WhatsApp</span>
                </button>
              </div>

            </form>
          )}

          <div className="mt-4 pt-3 border-t border-[#1F332E] text-[10px] text-[#60706B] text-center">
            🔒 Discretion Guaranteed. Your information is held in strict confidence.
          </div>

        </div>
      </div>
    </div>
  );
};
