import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Phone, HelpCircle, CheckCircle, Clock, Send, MessageSquare } from 'lucide-react';
import { addInquiry } from '../lib/store';

const FAQS = [
  {
    q: 'Can I request custom chest or shoulder fits?',
    a: "Absolutely. Inside our Design Studio Customizer, choose any style and proceed. Once submitted, we will coordinate precise tailoring dimensions such as chest, shoulder or hem alterations directly via email or our hotline."
  },
  {
    q: 'What is the standard production timeline for custom garments?',
    a: "Individual handcrafted garments are assembled, tailored, and prewashed within 5-9 business days. Sizable custom printing and corporate orders depend on quantity specifications, typically taking 10-18 business days."
  },
  {
    q: 'Do you ship custom pieces worldwide?',
    a: "Yes. From our Trendy Tees studio hub, we ship worldwide using insured traceable air express courier lines. Real-time courier trackers are pinned directly onto your custom order status page."
  },
  {
    q: 'How does the organic dye wash handle machine cycles?',
    a: "Our natural fermented Indigo and vegetable pigments are deeply set using volcanic steam washes. We recommend gentle, cold machine cycles with mild botanical detergents to preserve the rich, characteristic Himalayan hues."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    concern: 'General Inquiry',
    text: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.text) {
      setErrMsg('Please fill out your name, email, and description.');
      return;
    }
    setErrMsg('');
    addInquiry({
      name: formData.name,
      email: formData.email,
      serviceInterest: formData.concern,
      message: formData.text
    });
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="border-b border-zinc-200/50 dark:border-zinc-800/50 py-12 md:py-20 mb-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center md:text-left">
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 tracking-[0.3em] block mb-3">
            GET IN CONTACT
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-zinc-900 dark:text-white font-bold tracking-tight max-w-3xl leading-tight">
            Consultations & Support Channels
          </h1>
          <p className="mt-6 text-zinc-500 dark:text-zinc-400 text-sm md:text-lg max-w-xl font-sans leading-relaxed">
            Reach out for bespoke tailoring guides, wholesale logistics, custom design specifications, or basic tracking help.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: General contact form (col-span-7) */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 tracking-[0.3em] block mb-2">
              DISPATCH DESK
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-zinc-900 dark:text-white font-bold mb-4">
              Send a General Inquiry Message
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
              Fill out this ticket with your requirements. We assign a dedicated maker support agent to coordinate your design patterns.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="ticket-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                        placeholder="e.g. Robin Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                        placeholder="e.g. robin@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Reason for Contact
                    </label>
                    <select
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-2.5 text-xs text-zinc-950 dark:text-white focus:outline-none focus:border-orange-600"
                      value={formData.concern}
                      onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    >
                      <option>General Inquiry</option>
                      <option>Custom Fitting Support</option>
                      <option>Wholesale Sourcing Info</option>
                      <option>Delivery Tracking Help</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Message Details
                    </label>
                    <textarea
                      rows={5}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                      placeholder="Write your custom requests, details of standard garments desired, or booking dates..."
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    />
                  </div>

                  {errMsg && (
                    <div className="text-[10px] text-red-500 font-mono font-bold">
                      {errMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-black text-white dark:bg-white dark:text-zinc-900 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white py-3 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors rounded shadow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message Ticket</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="ticket-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-500 mb-4 animate-bounce" />
                  <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-2">Message Dispatched</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-sm leading-relaxed">
                    Thank you! We registered your support ticket in our main coordination roster. Our representative will respond directly to your email within 12 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick FAQ Matrix */}
          <div className="pt-4">
            <h3 className="font-serif text-xl font-bold mb-6 text-zinc-900 dark:text-white">
              Sourcing & Fitting FAQs
            </h3>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="border-b border-zinc-200 dark:border-zinc-800/80 pb-4"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    className="w-full text-left font-serif text-sm font-semibold text-zinc-900 dark:text-white flex justify-between items-center hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <HelpCircle className="w-4 h-4 text-zinc-400" />
                  </button>
                  <AnimatePresence>
                    {faqOpen === idx && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Contact info & Studio details (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 p-8 rounded-xl shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              <span>Studio Headquarters</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <span className="block font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide text-xs">VISIT US</span>
                  <span>Trendy Tees Hub, Road 7, Lumbini Zone, Nepal</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <span className="block font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide text-xs">DIRECT INBOX</span>
                  <span>craft@trendytees.com</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <span className="block font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide text-xs">SUPPORT PHONE</span>
                  <span>+977-71-507901</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <span className="block font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide text-xs">STUDIO HOURS</span>
                  <span>Monday - Saturday: 09:00 AM – 06:00 PM UTC+5:45</span>
                  <span className="block text-[11px] text-zinc-400">Dimmed light inspection by appointment only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive aesthetic note about the Himalayan Location */}
          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200/50 dark:border-orange-900/30">
            <span className="text-[9px] font-mono font-bold text-orange-600 dark:text-orange-400 tracking-widest block mb-1">
              THE NEPAL HUB
            </span>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-normal font-serif italic">
              "We choose Bhairahawa purposefully. Sitting as the vibrant trading bridge midway between Himalayan fiber valleys and global arterial logistics systems, it anchors our dual soul of traditional yarns and rugged brutalism."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
