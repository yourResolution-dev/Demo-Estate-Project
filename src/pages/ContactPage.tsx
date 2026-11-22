import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { ESTATE_INFO } from '../data/estateData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('buy');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Estate & Co.! I am reaching out through your contact page regarding: ${subject}.\nName: ${name || 'Prospective Client'}\nPhone: ${phone || 'N/A'}\nMessage: ${message || 'I would like to speak with a property advisor.'}`
    );
    window.open(`https://wa.me/${ESTATE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#0B1210] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#A58254] block mb-2">
            CONNECT WITH US
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1210]">
            Let's Discuss Your Real Estate Vision
          </h1>
          <p className="text-sm sm:text-base text-[#7A6F72] mt-3 leading-relaxed">
            Whether inquiring about an exclusive private residence or listing a landmark property, our senior team is at your service.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#0B1210]">
                Kolkata Headquarters
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#554C4F]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#A58254] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1210] block">Registered Address</span>
                    <span>{ESTATE_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#A58254] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1210] block">Private Concierge Line</span>
                    <a href={`tel:${ESTATE_INFO.phone}`} className="hover:text-[#A58254] transition-colors">
                      {ESTATE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#A58254] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1210] block">Confidential Inquiries</span>
                    <a href={`mailto:${ESTATE_INFO.email}`} className="hover:text-[#A58254] transition-colors">
                      {ESTATE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#A58254] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1210] block">Advisory Hours</span>
                    <span>Monday - Saturday: 09:30 AM – 07:30 PM (IST)</span>
                    <span className="block text-[#8E9A96]">Sunday: By prior private appointment only</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0ECE4]">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 rounded-2xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:brightness-105 flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct WhatsApp VIP Desk</span>
                </button>
              </div>
            </div>

            {/* Map Representation */}
            <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-[#E8E2D8] bg-[#E8E2D8] relative">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Map of New Town Kolkata"
                className="w-full h-full object-cover filter contrast-90"
              />
              <div className="absolute inset-0 bg-[#0B1210]/30 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-[#0B1210] shadow-xl flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#A58254]" />
                  <span>Estate Towers, New Town</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#0B1210] mb-2">
                Send an Advisory Inquiry
              </h3>
              <p className="text-xs text-[#7A6F72] mb-6">
                Fill in your details below and a senior partner will respond within 4 business hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center bg-[#FAF7F2] rounded-2xl border border-[#EAE4D9] p-6">
                  <CheckCircle2 className="w-12 h-12 text-[#A58254] mx-auto mb-3" />
                  <h4 className="font-serif text-2xl font-bold text-[#0B1210] mb-2">Message Delivered</h4>
                  <p className="text-xs text-[#7A6F72] max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you, {name}. Your inquiry has been forwarded to our client advisory desk. (Demo submission)
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-full bg-[#0B1210] text-[#DFC5A0] text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1210] mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sourav Banerjee"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm text-[#0B1210] focus:outline-none focus:border-[#A58254]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1210] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm text-[#0B1210] focus:outline-none focus:border-[#A58254]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1210] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sourav@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm text-[#0B1210] focus:outline-none focus:border-[#A58254]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1210] mb-1">Inquiry Purpose</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm text-[#0B1210] focus:outline-none focus:border-[#A58254]"
                      >
                        <option value="buy">Looking to Acquire a Luxury Residence</option>
                        <option value="sell">List My Luxury Property with Estate & Co.</option>
                        <option value="commercial">Commercial / NRI Real Estate Investment</option>
                        <option value="general">General Advisory Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1210] mb-1">Your Message or Requirements</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share any preferences regarding location (New Town, Alipore), budget, bedroom count, or timeline..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm text-[#0B1210] focus:outline-none focus:border-[#A58254]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBE82] via-[#C5A880] to-[#B3925F] text-[#0B1210] font-bold text-sm hover:brightness-105 flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Confidential Advisory Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
