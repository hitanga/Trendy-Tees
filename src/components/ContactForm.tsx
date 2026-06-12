import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Send, CheckCircle, Sparkles, Mail, ChevronDown } from 'lucide-react';

interface ContactFormProps {
  forcedService?: string | null;
  clearForcedService?: () => void;
}

const PHILOSOPHY_FAQS = [
  {
    question: 'How do organic botanical dyes handle machine wash cycles?',
    answer: 'Our biological dyes, derived from forest-grown indigo plants and mountain roots, are stabilized using volcanic mineral steam steam baths. We recommend washing garments under soft, cold water cycles with organic liquid soap to preserve the unique depth.'
  },
  {
    question: 'Are human custom dimensions supported for all collections?',
    answer: 'Absolutely. Every piece in our premium catalog is compatible with custom adjustments. Inside our interactive customizers, you can adjust specific dimensions (chest, sleeve length, collar styles) built onto your request.'
  },
  {
    question: 'What length is standard for your Trendy Tees?',
    answer: 'Our standard tees are styled with structured, modern oversized silhouettes, averaging about 28 to 31 inches in back length. Perfect for editorial tucks or loose brutalist aesthetics.'
  },
  {
    question: 'Can corporate clients require custom embroidery?',
    answer: 'Yes! Our custom printing and corporate orders portal allows specialized vector integration. We support high-count heavy embroidery on organic yak blends for teams of 10 to 500 members.'
  }
];

export default function ContactForm({ forcedService, clearForcedService }: ContactFormProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [newsName, setNewsName] = useState('');
  const [newsEmail, setNewsEmail] = useState('');
  const [joined, setJoined] = useState(false);

  // Auto clear if page receives forced service triggers
  React.useEffect(() => {
    if (forcedService && clearForcedService) {
      clearForcedService();
    }
  }, [forcedService]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail) {
      setJoined(true);
      setNewsName('');
      setNewsEmail('');
    }
  };

  return (
    <section className="py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-12 transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
        
        {/* Left column: FAQ Accordion (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="mb-8">
            <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 block mb-3 tracking-[0.3em]">
              FAQ KNOWLEDGE BASE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 font-bold mb-4">
              Artisanal Wisdom & Details
            </h2>
            <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed">
              Explore frequently asked questions concerning traditional washing procedures, custom-fitting dimensions, and local mountain-woven fibers.
            </p>
          </div>

          <div className="space-y-4">
            {PHILOSOPHY_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-orange-600 cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-350 ${isOpen ? 'rotate-180 text-orange-600' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800/50 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: High-fidelity VIP Newsletter Lounge (col-span-5) */}
        <div className="lg:col-span-5 flex">
          <div className="w-full bg-linear-to-b from-zinc-900 via-zinc-950 to-black dark:from-zinc-900/60 dark:to-zinc-950/60 text-white p-8 md:p-12 rounded-2xl border border-white/10 dark:border-zinc-800/80 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient visual overlay */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {!joined ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="space-y-6 flex flex-col justify-center h-full"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full border border-white/10">
                      <Sparkles className="w-3 text-yellow-400 animate-pulse" />
                      <span className="text-[9px] font-mono tracking-widest uppercase text-yellow-400 font-bold">
                        TRENDY TEES ATELIER
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
                      Join the VIP Lounge
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                      Be first to receive news of exclusive limited-run Himalayan drops, private tailoring invitations, and member discount programs.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newsName}
                        onChange={(e) => setNewsName(e.target.value)}
                        placeholder="e.g. Liam Thapa"
                        className="w-full bg-white/5 border border-white/10 focus:border-yellow-500 py-2.5 px-3 rounded text-sm text-white focus:outline-none placeholder-zinc-500 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={newsEmail}
                        onChange={(e) => setNewsEmail(e.target.value)}
                        placeholder="liam@domain.com"
                        className="w-full bg-white/5 border border-white/10 focus:border-yellow-500 py-2.5 px-3 rounded text-sm text-white focus:outline-none placeholder-zinc-500 font-sans"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-zinc-950 py-3.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 rounded hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Get Exclusive Invites</span>
                  </button>

                  <p className="text-[9px] text-zinc-500 font-mono text-center">
                    NO SPAM • UNSUBSCRIBE ANYTIME • RESPECTED DATA
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center h-full space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold">VIP Access Activated!</h3>
                  <p className="text-zinc-300 text-xs leading-relaxed max-w-sm mx-auto font-sans">
                    Welcome to the Inner Circle. We have queued your early invitation vector notifications. We will send you our seasonal catalog drops directly to your inbox.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setJoined(false)}
                      className="text-xs text-yellow-400 hover:underline cursor-pointer"
                    >
                      Subscribe another address
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
