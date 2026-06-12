import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, Info, LayoutTemplate, Scale, PlusCircle, BookmarkCheck } from 'lucide-react';
import { addBespokeOrder, useSharedStore } from '../lib/store';

interface ApparelBuilderProps {
  setTab: (tab: string) => void;
  stylePreselection: 'Blazer' | 'T-Shirt' | 'Knitwear';
}

const STYLES = [
  { id: 'Blazer', name: 'Monolith Blazer', basePrice: 280, icon: '🧥' },
  { id: 'T-Shirt', name: 'Essential Tee', basePrice: 60, icon: '👕' },
  { id: 'Knitwear', name: 'Bespoke Crewneck Knit', basePrice: 140, icon: '🧶' },
];

const FABRICS = [
  { id: 'cot', name: 'Mountain cotton', desc: 'Heavyweight index 280GSM hand loom cotton.', priceMod: 1.0, color: 'bg-zinc-100' },
  { id: 'yak', name: 'Himalayan Yak wool', desc: 'Thermal coarse rib blend spun inside regional valley houses.', priceMod: 1.35, color: 'bg-zinc-200' },
  { id: 'ind', name: 'Fermented indigo linen', desc: 'Lightweight breathable organic weave dipped in spring dye.', priceMod: 1.2, color: 'bg-zinc-350' },
];

const COLORS = [
  { hex: '#1a1c1c', name: 'Charcoal Black', colorClass: 'bg-zinc-850' },
  { hex: '#f9f9f9', name: 'Unbleached Cream', colorClass: 'bg-amber-50/70' },
  { hex: '#21334c', name: 'Fermented Indigo', colorClass: 'bg-indigo-900' },
  { hex: '#253d2d', name: 'Forest Cedar', colorClass: 'bg-emerald-900' },
];

export default function ApparelBuilder({ setTab, stylePreselection }: ApparelBuilderProps) {
  const { user } = useSharedStore();
  const [activeStyle, setActiveStyle] = useState<'Blazer' | 'T-Shirt' | 'Knitwear'>(stylePreselection);
  const [activeFabric, setActiveFabric] = useState(FABRICS[0]);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [activeSize, setActiveSize] = useState<'S' | 'M' | 'L' | 'XL' | 'Custom'>('M');
  
  // Custom measurements
  const [chest, setChest] = useState(40);
  const [waist, setWaist] = useState(34);
  const [length, setLength] = useState(28);

  const [embroideryText, setEmbroideryText] = useState('');
  const [computedPrice, setComputedPrice] = useState(0);
  const [success, setSuccess] = useState(false);

  // Re-sync style pre-selection if parent modifies it
  useEffect(() => {
    setActiveStyle(stylePreselection);
  }, [stylePreselection]);

  // Recalculate price dynamically
  useEffect(() => {
    const selectedStyleObj = STYLES.find(s => s.id === activeStyle);
    if (selectedStyleObj) {
      const base = selectedStyleObj.basePrice;
      let cost = Math.round(base * activeFabric.priceMod);
      
      if (activeSize === 'Custom') {
        cost += 40; // Custom tailoring adjustment
      }
      if (embroideryText.trim()) {
        cost += 15; // Embroidery cost
      }
      setComputedPrice(cost);
    }
  }, [activeStyle, activeFabric, activeSize, embroideryText]);

  const handleCheckout = () => {
    addBespokeOrder({
      style: activeStyle,
      fabric: `${activeFabric.name} (${activeColor.name})`,
      color: activeColor.hex,
      size: activeSize,
      customMeasurements: activeSize === 'Custom' ? { chest, waist, length } : undefined,
      printedText: embroideryText || undefined,
      price: computedPrice,
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setTab('dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-10 items-start">
        
        {/* Schematic Preview Area (Left - 5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-xl sticky top-24">
          <span className="text-[10px] font-mono uppercase text-orange-600 tracking-widest block mb-1">
            Bespeak outline visualizer
          </span>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white capitalize mb-4">
            Custom {activeStyle} Mockup
          </h3>

          {/* Aesthetic vector schematic representing selections */}
          <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center relative p-6 border dark:border-zinc-700/60 overflow-hidden">
            <div
              className={`absolute inset-0 opacity-40 mix-blend-multiply transition-all`}
              style={{ backgroundColor: activeColor.hex }}
            />
            
            {/* SVG custom outline mapping selected garment */}
            <svg viewBox="0 0 100 100" className="w-56 h-56 relative z-10 transition-all duration-500 drop-shadow-xl">
              {activeStyle === 'Blazer' && (
                <path
                  d="M10 20 L25 15 L35 25 L40 22 L50 35 L60 22 L65 25 L75 15 L90 20 L82 85 L18 85 Z"
                  fill="none"
                  stroke={activeColor.hex === '#f9f9f9' ? '#333' : '#fff'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {activeStyle === 'T-Shirt' && (
                <path
                  d="M15 35 L30 25 L40 30 L50 25 L60 30 L70 25 L85 35 L75 48 L68 45 L68 90 L32 90 L32 45 L25 48 Z"
                  fill="none"
                  stroke={activeColor.hex === '#f9f9f9' ? '#333' : '#fff'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {activeStyle === 'Knitwear' && (
                <path
                  d="M20 28 L35 23 L40 27 L50 24 L60 27 L65 23 L80 28 L85 85 L70 88 L30 88 L15 85 Z"
                  fill="none"
                  stroke={activeColor.hex === '#f9f9f9' ? '#333' : '#fff'}
                  strokeDasharray={activeStyle === 'Knitwear' ? "2 1" : "none"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>

            {/* Simulated Chest Embroidery visual block */}
            {embroideryText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-[40%] right-[32%] z-20 font-mono text-[9px] uppercase tracking-widest text-orange-500 select-none border border-orange-500/20 px-1 py-0.5 rounded backdrop-blur-xs max-w-[100px] truncate"
              >
                {embroideryText}
              </motion.div>
            )}

            {/* Schematic overlays */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-zinc-400 select-none z-20">
              <span>OUTLINE • SCALE 1:8</span>
              <span className="capitalize">{activeColor.name}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 block">ESTIMATED VALUATION</span>
              <span className="text-2xl font-serif text-zinc-900 dark:text-white font-semibold">
                ${computedPrice}.00
              </span>
            </div>
            <span className="bg-orange-600 text-white font-sans text-[10px] uppercase font-bold px-2.5 py-1 tracking-widest rounded shadow">
              Himalaya origin
            </span>
          </div>
        </div>

        {/* Builder Panel Workspace (Right - 7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-xl space-y-8">
          <div>
            <span className="text-orange-600 text-xs font-semibold tracking-widest uppercase font-sans">
              interactive workspace
            </span>
            <h2 className="font-serif text-3xl font-bold mt-1 text-zinc-900 dark:text-white">
              Bespoke Design Studio
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 leading-normal">
              Map and configure your garment preferences. Every custom item includes hand frame tailoring by experts.
            </p>
          </div>

          {/* Style select */}
          <div>
            <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest block mb-3">
              1. Choose apparel style
            </span>
            <div className="grid grid-cols-3 gap-3">
              {STYLES.map(s => {
                const isSelected = activeStyle === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStyle(s.id as any)}
                    className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50/50 dark:bg-orange-950/20'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <span className="text-2xl block mb-2">{s.icon}</span>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block truncate">
                      {s.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">${s.basePrice} base</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fabric yarn select */}
          <div>
            <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest block mb-3">
              2. Settle Thread & Yarn configuration
            </span>
            <div className="space-y-2">
              {FABRICS.map(f => {
                const isSelected = activeFabric.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFabric(f)}
                    className={`w-full p-4 border rounded-lg text-left cursor-pointer transition-all flex justify-between items-center ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50/20 dark:bg-orange-950/10'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wide block">
                        {f.name}
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-1 block">{f.desc}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[11px] font-mono text-zinc-500 block">
                        Multi: x{f.priceMod}
                      </span>
                      {isSelected && <span className="text-[10px] text-orange-600 font-bold block mt-0.5">Selected</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color choice */}
          <div>
            <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest block mb-3">
              3. Color profile
            </span>
            <div className="flex gap-4 items-center">
              {COLORS.map(c => {
                const isSelected = activeColor.hex === c.hex;
                return (
                  <button
                    key={c.hex}
                    onClick={() => setActiveColor(c)}
                    className={`w-9 h-9 rounded-full ${c.colorClass} border-2 relative cursor-pointer flex items-center justify-center transition-all ${
                      isSelected ? 'border-orange-600 scale-110' : 'border-zinc-300 dark:border-zinc-700 hover:scale-105'
                    }`}
                    title={c.name}
                  >
                    {isSelected && <Check className={`w-4 h-4 ${c.hex === '#f9f9f9' ? 'text-zinc-900' : 'text-white'}`} />}
                  </button>
                );
              })}
              <span className="text-xs text-zinc-400 font-mono italic select-none">
                Organic natural dyes used exclusively
              </span>
            </div>
          </div>

          {/* Custom sizing or Standard select */}
          <div>
            <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest block mb-3">
              4. Tailor profile details
            </span>
            <div className="flex gap-2 mb-4">
              {['S', 'M', 'L', 'XL', 'Custom'].map(sz => {
                const isSelected = activeSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setActiveSize(sz as any)}
                    className={`px-4 py-2 text-xs font-bold border rounded cursor-pointer transition-all ${
                      isSelected
                        ? 'border-orange-600 bg-orange-600 text-white'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                    }`}
                  >
                    {sz === 'Custom' ? 'Custom size ' : sz}
                  </button>
                );
              })}
            </div>

            {/* Custom sizing details slider panels */}
            {activeSize === 'Custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded border dark:border-zinc-700/60 grid grid-cols-3 gap-4"
              >
                <div>
                  <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                    Chest Width ({chest}")
                  </label>
                  <input
                    type="range"
                    min="34"
                    max="52"
                    value={chest}
                    onChange={(e) => setChest(Number(e.target.value))}
                    className="w-full accent-orange-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                    Waist Width ({waist}")
                  </label>
                  <input
                    type="range"
                    min="28"
                    max="48"
                    value={waist}
                    onChange={(e) => setWaist(Number(e.target.value))}
                    className="w-full accent-orange-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                    Torso Length ({length}")
                  </label>
                  <input
                    type="range"
                    min="24"
                    max="36"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full accent-orange-600"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Chest Embroidery Text box */}
          <div>
            <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest block mb-1">
              5. Embroidery branding
            </span>
            <input
              type="text"
              maxLength={12}
              value={embroideryText}
              onChange={(e) => setEmbroideryText(e.target.value)}
              placeholder="e.g. NAMASTE (Max 12 letters, +$15)"
              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 py-2.5 px-3 rounded text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-orange-600 transition-colors"
            />
          </div>

          {/* Add item btn */}
          <div>
            {success ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 text-emerald-600 rounded text-center text-xs font-semibold flex items-center justify-center gap-2">
                <BookmarkCheck className="w-5 h-5 animate-bounce" />
                <span>Custom design saved! Redirecting to Client Dashboard...</span>
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full bg-black dark:bg-white text-white dark:text-zinc-950 font-sans text-xs font-bold uppercase tracking-widest py-4 rounded hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xl"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Request Custom Order Crafting • ${computedPrice}.00</span>
              </button>
            )}
            <p className="text-[10px] text-zinc-400 text-center mt-2 font-mono">
              Bespoke submissions are saved instantly in your persistent session state database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
