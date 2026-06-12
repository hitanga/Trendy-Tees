import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Sparkles, CheckCircle, ArrowRight, X, Play, Pause } from 'lucide-react';
import { useSharedStore, addAppointment } from '../lib/store';

interface SlideData {
  id: number;
  bgImage: string;
  tagline: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  ctaText: string;
  accentColor: string;
}

const CAROUSEL_SLIDES: SlideData[] = [
  {
    id: 1,
    bgImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1600&auto=format&fit=crop',
    tagline: 'PREMIUM URBAN GRAPHICS',
    titlePrefix: 'Sartorial ',
    titleHighlight: 'Graphic Tees',
    titleSuffix: ' Redefined',
    description: 'Heavyweight 240GSM organic cotton fabrics and vintage screen-printed graphics inspired by raw city streets, crafted with editorial perfection.',
    ctaText: 'Custom Design Studio',
    accentColor: 'from-amber-400 to-yellow-500'
  },
  {
    id: 2,
    bgImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1600&auto=format&fit=crop',
    tagline: 'BIO-WASHED CLASSICS',
    titlePrefix: 'Premium ',
    titleHighlight: 'Heavy Cotton',
    titleSuffix: ' Crewnecks',
    description: 'Staggeringly cozy bio-washed organic tees featuring seamless collar styles, drop shoulders, and double-needle tailored hems.',
    ctaText: 'Explore Core Series',
    accentColor: 'from-orange-400 to-orange-600'
  },
  {
    id: 3,
    bgImage: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1600&auto=format&fit=crop',
    tagline: 'ORGANIC BOTANICAL DYE',
    titlePrefix: 'Artisanal ',
    titleHighlight: 'Garment Dyed',
    titleSuffix: ' Pastel Tees',
    description: 'Saturated in mountain-grown plant indigo and organic roots, our vintage washed-out colors offer a soft, lived-in aesthetic.',
    ctaText: 'View Dyed Catalog',
    accentColor: 'from-yellow-400 to-amber-500'
  },
  {
    id: 4,
    bgImage: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1600&auto=format&fit=crop',
    tagline: 'THE PERFECT BOX SILHOUETTE',
    titlePrefix: 'Relaxed ',
    titleHighlight: 'Oversized Fit',
    titleSuffix: ' Tees',
    description: 'Meticulously designed with structured boxy cuts and slightly extended sleeve lengths to flow elegantly for editorial daily wear.',
    ctaText: 'Customize Oversized Tee',
    accentColor: 'from-zinc-100 to-zinc-300'
  },
  {
    id: 5,
    bgImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1600&auto=format&fit=crop',
    tagline: 'HIGH-DENSITY EMBROIDERY',
    titlePrefix: 'Custom ',
    titleHighlight: 'Stitch & Print',
    titleSuffix: ' Atelier',
    description: 'Durable high-tensile chest embroidery patterns and professional silk screening built for premium streetwear brand identities.',
    ctaText: 'Start Custom Order',
    accentColor: 'from-yellow-300 to-orange-400'
  },
  {
    id: 6,
    bgImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1600&auto=format&fit=crop',
    tagline: 'COLLECTOR EDITION SERIES',
    titlePrefix: 'Designed ',
    titleHighlight: 'For Conscious',
    titleSuffix: ' Collectors',
    description: 'Limited edition high-contrast releases blending structured layouts, minimalist geometry, and ultra-durable long life fibers.',
    ctaText: 'Inquire VIP Access',
    accentColor: 'from-orange-500 to-yellow-400'
  }
];

export default function Hero() {
  const { user } = useSharedStore();
  
  // Carousel States
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('2026-06-15');
  const [time, setTime] = useState('11:00');
  const [service, setService] = useState<'Bespoke Design' | 'Custom Printing' | 'Corporate Consultation'>('Bespoke Design');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle active slide timing loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setProgress(0);
    const intervalMs = 6000; // 6 seconds per slide
    const stepMs = 50;
    const increment = (stepMs / intervalMs) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIdx((current) => (current + 1) % CAROUSEL_SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(progressTimer);
  }, [currentIdx, isPlaying]);

  const handlePrev = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handleSelectSlide = (idx: number) => {
    setProgress(0);
    setCurrentIdx(idx);
  };

  const currentSlide = CAROUSEL_SLIDES[currentIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      serviceType: service,
      date,
      time,
      notes: notes || `Direct booking from website hero carousel. Preferred contact: ${user?.email || 'Guest'}.`,
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowModal(false);
      setNotes('');
    }, 2500);
  };

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-black select-none">
      
      {/* Background slide animation portal */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.75, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              className="w-full h-full object-cover"
              alt={currentSlide.titlePrefix + currentSlide.titleHighlight}
              src={currentSlide.bgImage}
              referrerPolicy="no-referrer"
            />
            {/* Dark vignette layers for ultimate contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Animated Text Stage */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-16">
        
        {/* Carousel Content */}
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                exit: { opacity: 0, transition: { duration: 0.3 } }
              }}
              className="space-y-6"
            >
              {/* Tagline category pill */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -15 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
                }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 dark:bg-zinc-900/40 backdrop-blur border border-white/20 rounded-full"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-yellow-400 tracking-[0.25em]">
                  {currentSlide.tagline}
                </span>
              </motion.div>

              {/* Title with yellow/accent highlighted dynamic wordings */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
                }}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none"
              >
                {currentSlide.titlePrefix}
                <span className="text-yellow-500 dark:text-yellow-400 font-extrabold relative inline-block">
                  {currentSlide.titleHighlight}
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-yellow-400/20 rounded"></span>
                </span>
                {currentSlide.titleSuffix}
              </motion.h1>

              {/* Beautiful, responsive description body card */}
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8 } }
                }}
                className="font-sans text-sm md:text-lg text-zinc-300 leading-relaxed max-w-xl font-medium drop-shadow-md"
              >
                {currentSlide.description}
              </motion.p>

              {/* Action Trigger Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
                }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95 duration-200 cursor-pointer rounded flex items-center gap-2"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                
                <button
                  onClick={() => {
                    const el = document.getElementById('collections-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border border-white/30 hover:border-white bg-black/40 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all rounded cursor-pointer"
                >
                  View Collections
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Embedded High-Fidelity UI Controls (Arrows & Play/Pause & Autoplay Progress Bar) */}
      <div className="absolute bottom-12 left-0 right-0 z-10 max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Progress bar and current numerical indicator */}
        <div className="flex items-center gap-4 py-1.5 px-3 bg-black/60 backdrop-blur rounded-lg border border-white/10 w-full md:w-auto">
          <span className="font-mono text-zinc-400 text-xs tracking-wider min-w-[35px]">
            0{currentIdx + 1} / 0{CAROUSEL_SLIDES.length}
          </span>
          
          <div className="h-1.5 bg-zinc-800 rounded-full w-32 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-yellow-500 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Autoplay play pause controller */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Right Side: Micro-pills and tactile arrow selectors */}
        <div className="flex items-center gap-6">
          
          {/* Index Selectors */}
          <div className="flex gap-2">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSlide(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  currentIdx === idx ? 'w-8 bg-yellow-500' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Tactile Next/Prev chevrons */}
          <div className="flex gap-2.5">
            <button
              onClick={handlePrev}
              className="p-3 border border-white/20 rounded-full hover:border-yellow-500 hover:text-yellow-500 text-white transition-all bg-black/40 backdrop-blur cursor-pointer hover:scale-105 active:scale-95"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 border border-white/20 rounded-full hover:border-yellow-500 hover:text-yellow-500 text-white transition-all bg-black/40 backdrop-blur cursor-pointer hover:scale-105 active:scale-95"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Booking Form Modal (Preserved exactly with functional design states) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 max-w-md w-full p-6 md:p-8 rounded-xl shadow-2xl relative border border-zinc-200 dark:border-zinc-800"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-orange-600 p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="text-center mb-6">
                    <span className="p-2.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 rounded-full inline-block mb-3">
                      <Calendar className="w-6 h-6" />
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">Schedule Consultation</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                      Choose your service & preferred session time with our tailors.
                    </p>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-orange-600 block mb-1">
                      Design Focus
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value as any)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 py-2.5 px-3 rounded text-sm focus:outline-none focus:border-orange-600 transition-colors text-zinc-900 dark:text-zinc-100 dark:bg-zinc-850"
                    >
                      <option>Bespoke Design</option>
                      <option>Custom Printing</option>
                      <option>Corporate Consultation</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-sans">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-semibold text-orange-600 block mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 py-2 px-3 rounded text-sm focus:outline-none focus:border-orange-600 transition-colors text-zinc-800 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-semibold text-orange-600 block mb-1">
                        Time Slot
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 py-2 px-3 rounded text-sm focus:outline-none focus:border-orange-600 transition-colors text-zinc-800 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-orange-600 block mb-1">
                      Special requests or measurements
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Traditional collar designs, specific chest measurements..."
                      className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 py-2 px-3 rounded text-sm focus:outline-none focus:border-orange-600 transition-colors h-20 resize-none text-zinc-800 dark:text-white font-sans"
                    />
                  </div>

                  {user ? (
                    <div className="bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      <span>
                        Booking as <strong>{user.name}</strong> ({user.email}). Synched instantly.
                      </span>
                    </div>
                  ) : (
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded text-[11px] text-amber-800 dark:text-amber-200">
                      <span>You are booking as a Guest. Log in to save and manage in your interactive dashboard!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-black dark:bg-white dark:text-black hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white text-white py-3 font-semibold uppercase text-xs tracking-widest transition-colors rounded cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="font-serif text-2xl font-bold">Booking Confirmed!</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 px-4">
                    Your {service} session is scheduled for {date} at {time}. We will match you with a master craftsman.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
