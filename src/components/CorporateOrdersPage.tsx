import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Sparkles, Shield, Compass, BadgeCheck, PhoneCall, HelpCircle } from 'lucide-react';
import { addInquiry } from '../lib/store';

export default function CorporateOrdersPage() {
  const [volume, setVolume] = useState<number>(100);
  const [fabric, setFabric] = useState<string>('Himalayan Cotton Blend');
  const [formData, setFormData] = useState({
    repName: '',
    company: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Calculations for preview
  const estimatedDays = Math.max(14, Math.floor(volume * 0.1) + 10);
  const estimatedPricePerUnit = fabric === 'Natural Yak Wool (Bespoke)' ? 85 : 45;
  const discountRate = volume > 250 ? 0.2 : (volume > 100 ? 0.15 : (volume > 50 ? 0.1 : 0));
  const finalPricePerUnit = Math.round(estimatedPricePerUnit * (1 - discountRate));
  const totalCost = finalPricePerUnit * volume;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.repName || !formData.company || !formData.email) {
      setErrorMsg('Representative Name, Company, and Email are required.');
      return;
    }
    setErrorMsg('');
    const summary = `Corporate Order Request. Company: ${formData.company}. Representative: ${formData.repName}. Phone: ${formData.phone}. Volume target: ${volume} units of ${fabric}. Estimated per unit: $${finalPricePerUnit} USD. Total cost pre-tax: $${totalCost.toLocaleString()} USD. Special notes: ${formData.specialRequests}`;
    addInquiry({
      name: formData.repName,
      email: formData.email,
      serviceInterest: 'Corporate Sourcing Consultation',
      message: summary
    });
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      
      {/* High impact header banner */}
      <div className="border-b border-zinc-200/50 dark:border-zinc-800/50 py-12 md:py-20 mb-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center md:text-left">
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-sky-600 tracking-[0.3em] block mb-3">
            B2B TAILORING SERVICES
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-zinc-900 dark:text-white font-bold tracking-tight max-w-3xl leading-tight">
            High Density Unified Wear for Organizations
          </h1>
          <p className="mt-6 text-zinc-500 dark:text-zinc-400 text-sm md:text-lg max-w-xl font-sans leading-relaxed">
            Supplying elite tech hubs, boutique hotels, and cultural teams with climate-adaptive traditional wool and organic cotton structures.
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Interactive Estimator Tool (col-span-7) */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 tracking-[0.3em] block mb-2">
              ESTIMATOR ENGINE
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-zinc-900 dark:text-white font-bold mb-4">
              Volume Sourcing Planner
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
              Drag the estimator toggles to adjust quantity specifications and select luxury raw materials. Our system returns real-time pricing tiers and fabrication windows.
            </p>
          </div>

          {/* Interactive Calculator Dashboard */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/80 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
            
            {/* Fabric select */}
            <div>
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                Unified Sourcing Fabric Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Himalayan Cotton Blend', value: 'Himalayan Cotton Blend', desc: 'Breathable, rugged, great for everyday team branding.' },
                  { name: 'Refined Organic Linen', value: 'Refined Organic Linen', desc: 'Summer comfort, exceptional soft organic drape fabric.' },
                  { name: 'Natural Yak Wool (Bespoke)', value: 'Natural Yak Wool (Bespoke)', desc: 'Premium outerwear insulation for technical studios.' }
                ].map((fItem) => (
                  <button
                    key={fItem.value}
                    onClick={() => setFabric(fItem.value)}
                    type="button"
                    className={`p-4 text-left border rounded-lg transition-all flex flex-col cursor-pointer justify-between ${
                      fabric === fItem.value
                        ? 'border-orange-600 bg-orange-600/[0.02]'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-450'
                    }`}
                  >
                    <span className="text-xs font-bold text-zinc-900 dark:text-white font-serif">{fItem.name}</span>
                    <span className="text-[10px] text-zinc-400 mt-2 leading-relaxed">{fItem.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Volume slider */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  Garment Production Volume
                </label>
                <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/20 px-2 py-0.5 rounded border border-orange-200/30">
                  {volume} Pieces
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-zinc-400 font-mono mt-1">
                <span>Minimum Tier (20 pcs)</span>
                <span>Wholesale Cap (1000+ pcs)</span>
              </div>
            </div>

            {/* Results display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
              <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                <span className="text-[9px] font-mono text-zinc-400 block mb-1">UNIT ESTIMATE</span>
                <span className="font-serif text-xl font-bold text-zinc-900 dark:text-white">${finalPricePerUnit}</span>
                {discountRate > 0 && (
                  <span className="text-[9px] font-mono text-sky-600 dark:text-sky-400 ml-1.5 font-bold">
                    ({Math.round(discountRate * 100)}% bulk off)
                  </span>
                )}
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                <span className="text-[9px] font-mono text-zinc-400 block mb-1">CRAFT TIMELINE</span>
                <span className="font-serif text-xl font-bold text-zinc-900 dark:text-white">~{estimatedDays} Days</span>
                <span className="text-[9px] font-mono block text-zinc-400 italic">Prewash & Quality checked</span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                <span className="text-[9px] font-mono text-zinc-400 block mb-1">PROJECTED VALUATION</span>
                <span className="font-serif text-xl font-bold text-orange-600 dark:text-orange-400">
                  ${totalCost.toLocaleString()}
                </span>
                <span className="text-[9px] font-mono block text-zinc-400">USD, Ex-Factory</span>
              </div>
            </div>
          </div>

          {/* Sourcing credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 select-none">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-serif font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">Rugged Durability</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Reinforced double lock stitching, anti-pilling and color anchoring washes.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Compass className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-serif font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">Bespoke Fitting</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Complimentary fit customization templates for every crew member.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <BadgeCheck className="w-5 h-5 text-orange-600 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-serif font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">Himalayan Sourced</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">Direct support flow to organic dye yards and tribal weaving families.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom B2B Form (col-span-5) */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 p-8 rounded-xl shadow-md sticky top-28">
            <div className="flex items-center gap-2 mb-2 text-sky-600">
              <Building2 className="w-5 h-5 text-orange-600" />
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-mono">REPRESENTATIVE PANEL</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Request B2B Quote
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-6 font-sans">
              Provide company details to receive material physical booklets, customized mock samples, and bulk contract pricing sheets from our director of accounts.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="corp-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                        placeholder="e.g. Robin Sharma"
                        value={formData.repName}
                        onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                        placeholder="e.g. Kathmandu Labs"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                      placeholder="e.g. accounts@teamlabs.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Direct phone Line
                    </label>
                    <input
                      type="text"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                      placeholder="e.g. +977 71-XXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Special requests & Fit outlines
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                      placeholder="Provide any custom chest measurements, specific branding placements, or custom tags/embroidery details desired..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-[10px] font-semibold text-red-500 font-mono animate-pulse">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-black text-white dark:bg-white dark:text-zinc-900 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white py-3 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors rounded shadow"
                  >
                    Send Sourcing Request
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="corp-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center text-zinc-950 dark:text-zinc-100 flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-full mb-4"
                  >
                    <BadgeCheck className="w-12 h-12" />
                  </motion.div>
                  <h4 className="font-serif text-lg font-bold mb-2">Inquiry Confirmed</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-xs mx-auto leading-relaxed">
                    Our accounts manager is assembling physical material swatch kits and pricing reports for <strong>{formData.company}</strong>. Watch your email inbox for tracking and layout updates.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
