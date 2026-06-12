import { useRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, PenTool, Search, Grid, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateCollectionItems, CollectionItem } from '../lib/productsData';

interface CollectionsProps {
  setTab: (tab: string) => void;
  setSelectedStyleInBuilder: (style: 'Blazer' | 'T-Shirt' | 'Knitwear') => void;
  limitCount?: number;
}

export default function Collections({ setTab, setSelectedStyleInBuilder, limitCount }: CollectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Load our 105 custom styles
  const allCollectionItems = useMemo(() => generateCollectionItems(), []);

  // Filter States
  const [activeCategory, setActiveCategory] = useState<'All' | 'T-Shirt' | 'Knitwear' | 'Blazer'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true); // Default to gorgeous grid-explorer view to fully display 100+ items
  const [visibleCount, setVisibleCount] = useState(16); // Paginated display for maximum performance and buttery renders

  // Scroll handler for Curated Carousel
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cards = container.querySelectorAll('.collection-card');
      if (cards.length > 0) {
        const currentScroll = container.scrollLeft;
        let closestIndex = 0;
        let minDiff = Infinity;
        
        cards.forEach((card: any, index: number) => {
          const diff = Math.abs(card.offsetLeft - currentScroll);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
          }
        });

        let targetIndex = direction === 'left' ? closestIndex - 1 : closestIndex + 1;
        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex >= cards.length) targetIndex = cards.length - 1;

        const targetCard = cards[targetIndex] as HTMLElement;
        if (targetCard) {
          container.scrollTo({
            left: targetCard.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const handleCustomize = (style: 'Blazer' | 'T-Shirt' | 'Knitwear') => {
    setSelectedStyleInBuilder(style);
    setTab('builder');
  };

  // Filter products in real time
  const filteredItems = useMemo(() => {
    const rawFiltered = allCollectionItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.style === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.details.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    if (limitCount) {
      return rawFiltered.slice(0, limitCount);
    }
    return rawFiltered;
  }, [allCollectionItems, activeCategory, searchQuery, limitCount]);

  // Paginated items
  const itemsToDisplay = useMemo(() => {
    if (!isGridView) return filteredItems; // Horizontal slider displays filtered list inline
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, isGridView, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 16, filteredItems.length));
  };

  return (
    <section id="collections-section" className="py-20 md:py-28 max-w-[1280px] mx-auto px-6 md:px-12 transition-colors duration-300">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 border-b border-zinc-100 dark:border-zinc-900 pb-8">
        <div>
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 block mb-3 tracking-[0.3em]">
            EXQUISITE DESIGN LABORATORY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-900 dark:text-zinc-100 font-bold tracking-tight">
            Premium Catalog
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl font-sans font-medium">
            {limitCount ? (
              <>
                Explore a curated lineup of <span className="text-zinc-900 dark:text-zinc-100 font-bold">{limitCount} seasonal highlights</span>. Toggle layouts, search specific cuts, or view our full library of {allCollectionItems.length} styles.
              </>
            ) : (
              <>
                Browse our colossal directory of <span className="text-zinc-900 dark:text-zinc-100 font-bold">{allCollectionItems.length} styles</span>. Toggle layouts, search specific materials and cuts, or instantly click customize to tune any piece to your bespoke body dimensions.
              </>
            )}
          </p>
        </div>

        {/* Layout Mode Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase text-zinc-400 tracking-wider font-sans hidden sm:inline">
            LAYOUT MODE:
          </span>
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200/40 dark:border-zinc-800/40">
            <button
              onClick={() => setIsGridView(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                isGridView
                  ? 'bg-white dark:bg-zinc-800 text-orange-600 shadow'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid Browser ({filteredItems.length})</span>
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                !isGridView
                  ? 'bg-white dark:bg-zinc-800 text-orange-600 shadow'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Slide Show</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Panel: Search & Categories */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {(['All', 'T-Shirt', 'Knitwear', 'Blazer'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(16); // Reset pagination on filter change
              }}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border rounded-full transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-transparent shadow'
                  : 'bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-orange-500 hover:text-orange-600'
              }`}
            >
              {cat === 'All' ? 'All Garments' : cat === 'T-Shirt' ? 'T-Shirts (Expanded)' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(16);
            }}
            placeholder="Search heavy cotton, oversized, indigo wash, linen..."
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-all shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-zinc-400 hover:text-orange-600"
            >
              clear
            </button>
          )}
        </div>
      </div>

      {/* Render 1: Horizontal Slide Show */}
      {!isGridView && (
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xs font-mono text-zinc-400">
              Showing {filteredItems.length} matching designs • Swipe or use controls
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-orange-600 hover:text-orange-600 hover:scale-105 active:scale-95 transition-all cursor-pointer dark:text-zinc-200 bg-white/50 dark:bg-zinc-900/50 backdrop-blur"
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-orange-600 hover:text-orange-600 hover:scale-105 active:scale-95 transition-all cursor-pointer dark:text-zinc-200 bg-white/50 dark:bg-zinc-900/50 backdrop-blur"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-zinc-400 font-mono text-sm">No items found matching the filters.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="text-orange-600 text-xs font-bold uppercase tracking-wider mt-4 hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div
              ref={containerRef}
              className="flex overflow-x-auto gap-6 no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none' }}
            >
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.25), duration: 0.5 }}
                  className="flex-none w-[300px] sm:w-[350px] snap-start snap-always collection-card group"
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden mb-5 relative bg-zinc-50 dark:bg-zinc-900 shadow-md border border-zinc-200/20 dark:border-zinc-800/20">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={item.title}
                      src={item.img}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 dark:bg-white/95 px-2.5 py-1 rounded text-[9px] font-bold text-white dark:text-zinc-950 uppercase tracking-widest backdrop-blur-sm">
                      {item.style}
                    </div>
                    <div className="absolute top-3 right-3 bg-orange-600 text-white px-2.5 py-1 rounded text-[10px] font-mono font-bold">
                      ${item.price}
                    </div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => handleCustomize(item.style)}
                        className="bg-white text-zinc-900 px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg hover:bg-orange-600 hover:text-white transition-all transform translate-y-3 group-hover:translate-y-0 cursor-pointer rounded"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        Customize Piece
                      </button>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100 font-bold mb-1 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-sans text-xs leading-relaxed mb-1">
                    {item.subtitle}
                  </p>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 italic block mt-1">
                    {item.details}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Render 2: Full responsive Grid Browser for fast access to 100+ items */}
      {isGridView && (
        <div>
          {filteredItems.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-zinc-400 font-mono text-sm">No items found matching the search criteria.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="text-orange-600 text-xs font-bold uppercase tracking-wider mt-4 hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {itemsToDisplay.map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx < 16 ? idx * 0.02 : 0 }}
                    className="group"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative bg-zinc-50 dark:bg-zinc-910 shadow-md border border-zinc-200/20 dark:border-zinc-800/20">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={item.title}
                        src={item.img}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-black/75 dark:bg-white/95 px-2.5 py-1 rounded text-[9px] font-bold text-white dark:text-zinc-950 uppercase tracking-widest backdrop-blur-sm">
                        {item.style}
                      </div>
                      <div className="absolute top-3 right-3 bg-orange-600 text-white px-2.5 py-1 rounded text-[10px] font-mono font-bold">
                        ${item.price}
                      </div>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => handleCustomize(item.style)}
                          className="bg-white text-zinc-900 px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg hover:bg-orange-600 hover:text-white transition-all transform translate-y-3 group-hover:translate-y-0 cursor-pointer rounded"
                        >
                          <PenTool className="w-3.5 h-3.5" />
                          Customize Piece
                        </button>
                      </div>
                    </div>

                    <h3 className="font-serif text-base text-zinc-900 dark:text-zinc-100 font-bold mb-1 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 font-sans text-xs leading-relaxed mb-1.5 line-clamp-2">
                      {item.subtitle}
                    </p>
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 italic block">
                      {item.details}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Load More Button for paginated grid loading */}
          {filteredItems.length > itemsToDisplay.length && (
            <div className="text-center mt-16">
              <button
                onClick={handleLoadMore}
                className="bg-black dark:bg-white text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-md transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Load More Designs ({filteredItems.length - itemsToDisplay.length} Remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Homepage Specific: CTA to view entire catalog */}
      {limitCount && (
        <div className="text-center mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900/60">
          <button
            onClick={() => setTab('collections')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-widest px-10 py-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg cursor-pointer rounded-full"
          >
            Explore Full Catalog (100+ Styles)
          </button>
        </div>
      )}

    </section>
  );
}
