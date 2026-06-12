import { Ruler, Printer, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface TailoredSolutionsProps {
  onStartConsultation: () => void;
  onInquirePricing: (service: string) => void;
}

export default function TailoredSolutions({ onStartConsultation, onInquirePricing }: TailoredSolutionsProps) {
  
  return (
    <section id="services-section" className="py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-12 text-center transition-colors duration-300">
      <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 block mb-3 tracking-[0.3em]">
        WHAT WE DO
      </span>
      <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 font-bold mb-16">
        Tailored Solutions
      </h2>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-zinc-900/40 p-10 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-orange-600/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
        >
          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-lg mb-6 group-hover:scale-110 transition-transform">
            <Ruler className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Bespoke Design
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed mb-8 flex-grow">
            One-on-one design sessions to create garments that perfectly align with your vision and physique. Let us map your outline exactly.
          </p>
          <button
            onClick={onStartConsultation}
            className="text-orange-600 dark:text-orange-400 font-sans text-xs font-bold tracking-widest uppercase hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Start Consultation</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="bg-white dark:bg-zinc-900/40 p-10 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-orange-600/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
        >
          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-lg mb-6 group-hover:scale-110 transition-transform">
            <Printer className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Custom Printing
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed mb-8 flex-grow">
            High-fidelity screen and digital fabric print selections for limited editions, graphic designers, custom collections and art initiatives.
          </p>
          <button
            onClick={() => onInquirePricing('Custom Printing')}
            className="text-orange-600 dark:text-orange-400 font-sans text-xs font-bold tracking-widest uppercase hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Inquire Pricing</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white dark:bg-zinc-900/40 p-10 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-orange-600/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
        >
          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-lg mb-6 group-hover:scale-110 transition-transform">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Corporate Orders
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed mb-8 flex-grow">
            Elevated corporate uniforms, customizable branded apparel, and bespoke tailored pieces for organizations that highly respect premium design.
          </p>
          <button
            onClick={() => onInquirePricing('Corporate Orders')}
            className="text-orange-600 dark:text-orange-400 font-sans text-xs font-bold tracking-widest uppercase hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
