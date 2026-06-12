import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, Sparkles, Layers, Sliders, CheckCircle, ArrowRight, Paintbrush } from 'lucide-react';
import { addInquiry } from '../lib/store';

const PRINT_TECHNIQUES = [
  {
    name: 'Organic Discharge Printing',
    desc: 'Bleaches dyes chemically using natural fruit enzymes instead of chlorine, leaving a soft and safe raw cotton feel with crisp light artwork.',
    durability: 'Exceptional (fuses into fabric thread)',
    bestFor: 'Heavy cotton Hoodies & T-Shirts',
    leadTime: '7-12 business days',
    tag: 'ECO FRIENDLY'
  },
  {
    name: 'Himalayan Wooden Block Prints',
    desc: 'Artisanal hand-pressed block carvings. We carve cedarwood patterns manually, dip them in organic indigo or root dyes, and frame stamps manually.',
    durability: 'High (characterful aging with washes)',
    bestFor: 'Linen outerwear, traditional kimonos & scarfs',
    leadTime: '12-18 business days',
    tag: '100% HANDMADE'
  },
  {
    name: 'High-Density Fine Screen Print',
    desc: 'Using Japanese standard high mesh counts with plant-derived elastic resins. Excellent for razor-sharp geometric brutalist lines and tactile elevation.',
    durability: 'Extreme (resists standard machine washings)',
    bestFor: 'Monolithic Heavyweight Garments',
    leadTime: '5-9 business days',
    tag: 'BRUTALIST STANDARD'
  }
];

export default function CustomPrintingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fabricType: 'Heavyweight Loopback Cotton',
    quantity: '50-100 pcs',
    printingTechnique: 'Organic Discharge Printing',
    placement: 'Center Chess + Back Panel',
    designNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg('Please complete your name and contact email.');
      return;
    }
    setErrorMsg('');
    const fullNotes = `Custom Printing Request. Technique: ${formData.printingTechnique}. Fabric: ${formData.fabricType}. Quantity tier: ${formData.quantity}. Placement: ${formData.placement}. Notes: ${formData.designNotes}`;
    addInquiry({
      name: formData.name,
      email: formData.email,
      serviceInterest: 'Custom Printing Support',
      message: fullNotes
    });
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Page Header */}
      <div className="border-b border-zinc-200/50 dark:border-zinc-800/50 py-12 md:py-20 mb-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center md:text-left">
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-rose-600 tracking-[0.3em] block mb-3">
            TECHNICAL ATELIER
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-zinc-900 dark:text-white font-bold tracking-tight max-w-3xl leading-tight">
            High Density & Plant Dye Printing
          </h1>
          <p className="mt-6 text-zinc-500 dark:text-zinc-400 text-sm md:text-lg max-w-xl font-sans leading-relaxed">
            Pioneering organic starch-based discharge print chemistry and artisanal wood carving methodologies.
          </p>
        </div>
      </div>

      {/* Main Grid: Info Cards and Inquiry Form */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* Techniques Showcase - column spans 3 */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 tracking-[0.3em] block mb-2">
              OUR FORMULAS
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-zinc-900 dark:text-white font-bold mb-6">
              Exclusive Fabric Printing Techniques
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              We approach fabric illustration as fine art. Every formula holds organic starch compositions rather than toxic plastisols, ensuring clean ecological safety with phenomenal durability.
            </p>
          </div>

          <div className="space-y-6">
            {PRINT_TECHNIQUES.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/80 rounded-xl p-8 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
                    {tech.name}
                  </h3>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-orange-600 bg-orange-50 dark:bg-orange-950/20 px-2.5 py-0.5 rounded border border-orange-200/30">
                    {tech.tag}
                  </span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {tech.desc}
                </p>
                <div className="grid grid-cols-3 gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                  <div>
                    <span className="block font-semibold text-zinc-650 dark:text-zinc-350">DURABILITY</span>
                    <span>{tech.durability}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-zinc-650 dark:text-zinc-350">BEST ON</span>
                    <span>{tech.bestFor}</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-zinc-650 dark:text-zinc-350">LEAD TIME</span>
                    <span>{tech.leadTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic Inquiry Form box - column spans 2 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 p-8 rounded-xl shadow-md sticky top-28">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              <Printer className="w-5 h-5 text-orange-600" />
              <span>Request Printing Project</span>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-6 font-sans">
              Enter details for sample printing runs or custom limited-edition corporate merchandise cycles below.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                      placeholder="e.g. Robin Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                      placeholder="e.g. robin@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                        Fabric Base
                      </label>
                      <select
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-2 text-xs text-zinc-950 dark:text-white focus:outline-none focus:border-orange-600"
                        value={formData.fabricType}
                        onChange={(e) => setFormData({ ...formData, fabricType: e.target.value })}
                      >
                        <option>Heavyweight Loopback Cotton</option>
                        <option>Natural Himalayan Linen</option>
                        <option>Organically Fermented Sateen</option>
                        <option>Nepalese Yak-blend Rib Knit</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                        Volume Tier
                      </label>
                      <select
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-2 text-xs text-zinc-950 dark:text-white focus:outline-none focus:border-orange-600"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      >
                        <option>Sample Unit Trial (1-10 pcs)</option>
                        <option>Limited Release (11-49 pcs)</option>
                        <option>Medium Edition (50-249 pcs)</option>
                        <option>Heavy Run (250+ pcs)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Placement Intentions
                    </label>
                    <input
                      type="text"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                      value={formData.placement}
                      onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                      Artwork Motif Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                      placeholder="e.g. Brutalist concrete vector lines printed in white ink across chest, front sleeve placements..."
                      value={formData.designNotes}
                      onChange={(e) => setFormData({ ...formData, designNotes: e.target.value })}
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
                    Submit Specifications
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center text-zinc-950 dark:text-zinc-100 flex flex-col items-center"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-500 mb-4 animate-bounce" />
                  <h4 className="font-serif text-lg font-bold mb-2">Specifications Lodged</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-xs mx-auto leading-relaxed">
                    Our technical lead is analyzing your fabric placements. We will reach back in 24 hours with design composites. Check your email inbox to track status!
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
