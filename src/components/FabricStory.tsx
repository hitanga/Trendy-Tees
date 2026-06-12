import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Eye, Droplet, Sparkles, X } from 'lucide-react';

export default function FabricStory() {
  const [activeStory, setActiveStory] = useState<'eco' | 'dye' | null>(null);

  return (
    <section id="fabric-story-section" className="bg-zinc-50 dark:bg-zinc-900/40 py-20 md:py-28 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid md:grid-cols-2 items-center gap-12 md:gap-20">
        
        {/* Visual representation */}
        <div className="relative">
          <div className="rounded-xl overflow-hidden aspect-square bg-zinc-200 shadow-xl group cursor-zoom-in relative">
            <img
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              alt="Premium organic heavyweight cotton T-Shirts folded and stacked in a minimalist boutique atelier"
              src="/src/assets/images/premium_tshirts_folded_1781265803445.jpg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-950 dark:text-white flex items-center gap-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5 text-orange-600" />
                Inspect Fabric Detail
              </span>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 w-60 h-60 bg-white/70 dark:bg-black/70 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-white/10 shadow-2xl hidden lg:block">
            <span className="font-sans text-[9px] font-bold text-orange-600 tracking-[0.2em] block mb-2">FABRIC INTELLIGENCE</span>
            <p className="font-serif text-sm text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
              "Every tee is woven with premium heavyweight cotton yarns, honoring meticulous double-stitched detailing and high-grade organic wash finishes."
            </p>
          </div>
        </div>

        {/* Story details */}
        <div>
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 block mb-3 tracking-[0.3em]">
            MATERIAL EXCELLENCE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 font-bold mb-6">
            The Fabric Story
          </h2>
          <p className="font-sans text-sm md:text-base text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
            Quality begins at the thread level. We select only the finest long-staple cotton and sustainable blends that provide superior comfort and durability, ensuring each piece feels as good as it looks. Our materials resist fading, breath beautifully, and adapt naturally to your outline.
          </p>

          <div className="space-y-6">
            <div
              onClick={() => setActiveStory('eco')}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-white dark:hover:bg-zinc-800/50 cursor-pointer transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
            >
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-full mt-1">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-widest flex items-center gap-1.5 hover:text-orange-600 transition-colors">
                  <span>Sustainable Sourcing</span>
                  <span className="text-[10px] text-zinc-400 font-normal underline">(Learn more)</span>
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1 leading-normal">
                  Partnerships with local farmers ensure ethical production cycles, bio-degradable fibers, and fair economic wages.
                </p>
              </div>
            </div>

            <div
              onClick={() => setActiveStory('dye')}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-white dark:hover:bg-zinc-800/50 cursor-pointer transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
            >
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 rounded-full mt-1">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-widest flex items-center gap-1.5 hover:text-orange-600 transition-colors">
                  <span>Organic Indigo Fermentation</span>
                  <span className="text-[10px] text-zinc-400 font-normal underline">(Learn more)</span>
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1 leading-normal">
                  Naturally extracted leaf dyes undergo active oxygenized fermentation to yield deeply persistent, eye-safe midnight tones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Modals */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 max-w-lg w-full p-6 md:p-8 rounded-xl shadow-2xl relative border border-zinc-200 dark:border-zinc-800"
            >
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-orange-600 p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {activeStory === 'eco' ? (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                    <Leaf className="w-6 h-6 animate-pulse" />
                    <h3 className="font-serif text-2xl font-bold">Traceable Sustainable Sourcing</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 space-y-3 leading-relaxed">
                    Over 80% of our mountain cotton is grown on regenerative plots in Far-Western Nepal. By skipping intermediary mills, we route funding directly back to families, preserving traditional hand-loomed legacies while employing standard water-saving trickle irrigation.
                  </p>
                  <div className="mt-6 bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded border border-zinc-200 dark:border-zinc-700/60 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      You can select our traceable Mountain Cotton yarn specifically in the Design Studio Customizer!
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                    <Droplet className="w-6 h-6 animate-pulse" />
                    <h3 className="font-serif text-2xl font-bold">Natural Nepalese Indigo Dyeworks</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 space-y-3 leading-relaxed">
                    Our indigo dye uses no synthetic chemicals. We combine fresh Strobilanthes cusia leaves with local alkaline spring ashes, fermenting the mixture in earthenware jars for over 15 days. Each blazer undergoes multiple dip-washes to anchor the charcoal pigment with zero industrial run-offs.
                  </p>
                  <div className="mt-6 bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded border border-zinc-200 dark:border-zinc-700/60 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Our custom-dyed linen items have anti-microbial properties and feel progressively softer with age.
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
