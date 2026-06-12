import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Search } from 'lucide-react';
import { generateGalleryItems, GalleryItem } from '../lib/productsData';

interface GalleryProps {
  limitCount?: number;
  setTab?: (tab: string) => void;
}

export default function Gallery({ limitCount, setTab }: GalleryProps = {}) {
  const allGalleryItems = useMemo(() => generateGalleryItems(), []);

  // Filter States
  const [activeCategory, setActiveCategory] = useState<'All' | 'T-Shirt' | 'Knitwear' | 'Blazer'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(16); // Performance friendly paginated loading

  // Filter items in real time
  const filteredItems = useMemo(() => {
    const rawFiltered = allGalleryItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.style === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    if (limitCount) {
      return rawFiltered.slice(0, limitCount);
    }
    return rawFiltered;
  }, [allGalleryItems, activeCategory, searchQuery, limitCount]);

  // Paginated items
  const itemsToDisplay = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 16, filteredItems.length));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery-section" className="py-20 md:py-28 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Gallery Intro */}
        <div className="text-center mb-12">
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 block mb-3 tracking-[0.3em]">
            EXPLORATIVE ART STUDY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-900 dark:text-zinc-100 font-bold tracking-tight">
            Trendy Tees in the Wild
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            {limitCount ? (
              <>
                A preview showcase introducing <span className="text-zinc-900 dark:text-zinc-100 font-bold">{limitCount} curated photographs</span>. Hover to reveal vibrant organic shades, or explore our massive archives.
              </>
            ) : (
              <>
                A high-fidelity conceptual showcase featuring <span className="text-zinc-900 dark:text-zinc-100 font-bold">{allGalleryItems.length} curated photographs</span>. Hover to reveal vibrant organic shades or click to expand.
              </>
            )}
          </p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-1 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900/60 inline-block px-3 py-1 rounded mt-4">
            HOVER CARDS TO REVEAL COLOR • CLICK TO ENLARGE
          </p>
        </div>

        {/* Filters control bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-zinc-100 dark:border-zinc-900">
          
          {/* Quick Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(['All', 'T-Shirt', 'Knitwear', 'Blazer'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(16);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20'
                }`}
              >
                {cat === 'All' ? 'All Concept Shoots' : cat === 'T-Shirt' ? 'T-Shirt Concepts' : `${cat}s`}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(16);
              }}
              placeholder="Search design concept, texture..."
              className="w-full pl-9 pr-4 py-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs outline-none focus:border-orange-600"
            />
          </div>
        </div>

        {/* Clean, editorial grid layout */}
        {filteredItems.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-zinc-400 font-mono text-xs">No concept photographs available matching the query.</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {itemsToDisplay.map((img, idx) => {
                // Keep layout rhythmic by making specific items take double vertical height
                const isTall = idx % 5 === 1; 
                return (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: idx < 12 ? idx * 0.03 : 0 }}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative group overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900 cursor-zoom-in shadow-md border border-zinc-200/10 ${
                      isTall ? 'md:row-span-2 aspect-[3/4]' : 'aspect-square'
                    }`}
                  >
                    {/* Grayscale container and transition wrapper */}
                    <div className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={img.title}
                        src={img.url}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Subtle visual hover details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6 select-none">
                      <span className="text-orange-500 font-sans text-[8px] font-bold tracking-[0.25em] mb-1">
                        CONCEPT SPECIMEN • {img.style}
                      </span>
                      <h4 className="text-white font-serif text-sm md:text-base font-semibold leading-tight">
                        {img.title}
                      </h4>
                      <p className="text-zinc-300 text-[9px] sm:text-xs leading-normal mt-1 hidden sm:block line-clamp-2">
                        {img.desc}
                      </p>
                      <Maximize2 className="absolute top-4 right-4 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Load More Button for Grid */}
            {filteredItems.length > itemsToDisplay.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 font-bold text-xs uppercase tracking-widest text-zinc-900 dark:text-zinc-100 dark:hover:border-white hover:text-orange-600 hover:border-orange-600 transition-all cursor-pointer rounded"
                >
                  Load More Concept Photos ({filteredItems.length - itemsToDisplay.length} Left)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Homepage Specific: CTA to view entire gallery */}
        {limitCount && setTab && (
          <div className="text-center mt-12 pt-6 border-t border-zinc-100 dark:border-zinc-900/60">
            <button
              onClick={() => setTab('gallery')}
              className="px-8 py-3.5 border border-zinc-900 dark:border-white hover:bg-orange-600 hover:text-white hover:border-orange-600 dark:hover:bg-orange-650 dark:hover:border-orange-650 font-bold text-xs uppercase tracking-widest text-zinc-900 dark:text-zinc-100 cursor-pointer rounded transition-all"
            >
              View Full Gallery (100+ Shoots)
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Interactive Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-orange-600 bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
              title="Close Gallery"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev icon */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-10 text-white hover:text-orange-600 bg-white/5 p-3 rounded-full cursor-pointer"
              title="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider Content */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[70vh] flex items-center justify-center p-2 rounded bg-zinc-900 border border-zinc-800">
                <img
                  className="max-w-full max-h-[65vh] object-contain rounded-md"
                  alt={filteredItems[lightboxIndex].title}
                  src={filteredItems[lightboxIndex].url}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-6 text-center text-white px-4">
                <span className="font-mono text-[10px] uppercase text-orange-500 tracking-widest block mb-1">
                  Specimen Concept • Photo {lightboxIndex + 1} of {filteredItems.length}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto mt-2 leading-relaxed">
                  {filteredItems[lightboxIndex].desc}
                </p>
              </div>
            </motion.div>

            {/* Next icon */}
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-10 text-white hover:text-orange-600 bg-white/5 p-3 rounded-full cursor-pointer"
              title="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
