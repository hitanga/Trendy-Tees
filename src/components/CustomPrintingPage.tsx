import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, Sparkles, Sliders, CheckCircle, Upload, Trash2, ArrowRight, Paintbrush, Move, Layers, Mail, Copy, Check, ExternalLink, FileText, RefreshCw } from 'lucide-react';
import { addInquiry } from '../lib/store';

const TSHIRT_PRESETS = [
  { name: 'Carbon Black', hex: '#18181b', description: 'Deep, luxurious heavy charcoal' },
  { name: 'Alabaster White', hex: '#fbfbfb', description: 'Crisp, timeless unbleached heavy cotton' },
  { name: 'Sage Garden', hex: '#636b53', description: 'Artisanal organic soil pigment dye' },
  { name: 'Rust Ochre', hex: '#a45745', description: 'Volcanic mineral and root warm earth' },
  { name: 'Royal Indigo', hex: '#243454', description: 'Traditional mountain-fermented blue Indigo' },
  { name: 'Sand Dune', hex: '#c5b59f', description: 'Soft, unbleached organic prairie look' },
  { name: 'Vintage Lavender', hex: '#8c8194', description: 'Botanical floral extract extraction' }
];

const PRINT_TECHNIQUES = [
  {
    name: 'Organic Discharge Printing',
    desc: 'Bleaches base dyes chemically using natural fruit enzymes instead of chlorine, leaving a soft and safe raw cotton feel with crisp light artwork.',
    durability: 'Exceptional (fuses into fabric thread)',
    bestFor: 'Heavy cotton Hoodies & T-Shirts',
    leadTime: '7-12 business days',
    tag: 'ECO FRIENDLY'
  },
  {
    name: 'Himalayan Wooden Block Prints',
    desc: 'Artisanal hand-pressed block carvings. We carve cedarwood patterns manually, dip them in organic indigo or root dyes, and frame stamps manually.',
    durability: 'High (characterful aging with washes)',
    bestFor: 'Linen outerwear, traditional garments & tees',
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
  const [customColor, setCustomColor] = useState('#18181b');
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState(45);
  const [logoY, setLogoY] = useState(78);
  const [isDragging, setIsDragging] = useState(false);

  // Specifications state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fabricType: 'Heavyweight 240GSM Cotton',
    quantity: 'Limited Release (11-49 pcs)',
    printingTechnique: 'Organic Discharge Printing',
    additionalNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSendingSimulated, setIsSendingSimulated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to compile elegant plain text copy format
  const getEmailBodyText = () => {
    return `
BHAIRAHAWA APPAREL PRINT SPECIFICATIONS

Customer Representative Details:
- Name: ${formData.name}
- Contact Email: ${formData.email}

Apparel Customizations:
- Fabric Base: ${formData.fabricType}
- Volume Tier: ${formData.quantity}
- Base Color Hex: ${customColor}
- Selected Printing Technique: ${formData.printingTechnique}

Design Layout Placement Specifications:
- Mockup Graphic Attached/Loaded: ${logoSrc ? 'Yes (Transparent PNG Composite)' : 'No'}
- Graphic Render Scale: ${logoScale}%
- Graphic Chest Height Alignment Y: ${logoY}px

Client Placement & Layout Notes:
"${formData.additionalNotes || 'No additional layout specifications declared.'}"

-----------------------------------------------
Captured via Bhairahawa Apparel Workspace - Interactive T-Shirt Print Creator.
    `.trim();
  };

  // File loading function
  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setLogoSrc(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveLogo = () => {
    setLogoSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyToClipboard = () => {
    const specNotes = getEmailBodyText();
    navigator.clipboard.writeText(specNotes).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleOpenEmailClient = () => {
    const specNotes = getEmailBodyText();
    const subject = `Bespoke T-Shirt Print Specifications - ${formData.name}`;
    const mailToUrl = `mailto:hitanga@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(specNotes)}`;
    window.location.href = mailToUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg('Please complete your name and contact email.');
      return;
    }
    setErrorMsg('');

    const specNotes = getEmailBodyText();

    addInquiry({
      name: formData.name,
      email: formData.email,
      serviceInterest: 'Interactive Custom Print',
      message: specNotes
    });

    setIsSendingSimulated(true);
    setTimeout(() => {
      setIsSendingSimulated(false);
      setSubmitted(true);
      // Attempt redirecting instantly
      const subject = `Bespoke T-Shirt Print Specifications - ${formData.name}`;
      const mailToUrl = `mailto:hitanga@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(specNotes)}`;
      window.location.href = mailToUrl;
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 min-h-screen">
      
      {/* Header Banner */}
      <div className="border-b border-zinc-200/50 dark:border-zinc-800/50 py-12 md:py-16 mb-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center md:text-left">
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 tracking-[0.3em] block mb-3 animate-pulse">
            LIVE DESIGN WORKSPACE
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-zinc-900 dark:text-white font-bold tracking-tight max-w-3xl leading-tight">
            T-Shirt Print Creator
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-xs sm:text-base max-w-xl font-sans leading-relaxed">
            Choose your custom fabric color, drag & drop your vector logos or illustrations, and see your creation render in high-fidelity before you place your order.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Core Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          
          {/* LEFT COLUMN: The Interactive 3D-shaded T-Shirt Mockup Canvas (col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 p-6 md:p-10 shadow-lg relative overflow-hidden flex flex-col items-center justify-center">
              
              {/* Grid Background Overlay representing blueprint / alignment paper */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
              
              {/* Corner Grid Crosshairs for blueprint aesthetic */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-zinc-300 dark:border-zinc-700 font-mono text-[8px] pl-1 pt-0.5 text-zinc-400">01</div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-zinc-300 dark:border-zinc-700 font-mono text-[8px] pr-1 pt-0.5 text-zinc-400 text-right">02</div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-zinc-300 dark:border-zinc-700" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-zinc-300 dark:border-zinc-700 flex items-end justify-end font-mono text-[8px] text-zinc-400 pr-0.5 pb-0.5">MOCKUP</div>

              {/* Status Pill Indicator */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-zinc-900/5 dark:bg-white/5 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-650 dark:text-zinc-300 uppercase">
                  {logoSrc ? 'Digital Print Composite Loaded' : 'Awaiting Design Placement'}
                </span>
              </div>

              {/* T-Shirt Canvas & Drag Target */}
              <div 
                className={`w-full max-w-[420px] md:max-w-[480px] lg:max-w-[500px] aspect-square flex items-center justify-center relative my-6 transition-transform duration-300 ${isDragging ? 'scale-[1.03]' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {/* SVG Vector T-Shirt Rendering with 3D shadows, realistic curves, and stitching */}
                <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl" style={{ filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.22))' }}>
                  <defs>
                    {/* Left shadow for roundness and 3D depth */}
                    <linearGradient id="left-shading" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
                      <stop offset="25%" stopColor="#000000" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </linearGradient>

                    {/* Right highlight/reflection for studio lighting realism */}
                    <linearGradient id="right-shading" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                      <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>

                    {/* Top Shoulder gradient shading */}
                    <linearGradient id="top-shading" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </linearGradient>

                    {/* T-Shirt Mask containing the exact realistic body contour */}
                    <mask id="tshirt-mask">
                      <path
                        d="M 190,82 
                           L 75,120 
                           L 40,215 
                           C 52,226 80,228 92,220 
                           C 102,210 112,195 116,182 
                           C 118,250 113,360 118,450 
                           Q 250,462 382,450 
                           C 387,360 382,250 384,182 
                           C 388,195 398,210 408,220 
                           C 420,228 448,226 460,215 
                           L 425,120 
                           L 310,82 
                           C 280,105 220,105 190,82 Z"
                        fill="#ffffff"
                      />
                    </mask>
                  </defs>

                  {/* Base T-Shirt Body Solid Color */}
                  <path
                    id="tshirt-base"
                    d="M 190,82 
                       L 75,120 
                       L 40,215 
                       C 52,226 80,228 92,220 
                       C 102,210 112,195 116,182 
                       C 118,250 113,360 118,450 
                       Q 250,462 382,450 
                       C 387,360 382,250 384,182 
                       C 388,195 398,210 408,220 
                       C 420,228 448,226 460,215 
                       L 425,120 
                       L 310,82 
                       C 280,105 220,105 190,82 Z"
                    fill={customColor}
                    className="transition-colors duration-500 ease-out"
                  />

                  {/* Shaded 3D layers constrained by the T-Shirt mask */}
                  <g mask="url(#tshirt-mask)">
                    {/* Shadow & Reflection Gradients */}
                    <rect x="0" y="0" width="500" height="500" fill="url(#left-shading)" pointerEvents="none" />
                    <rect x="0" y="0" width="500" height="500" fill="url(#right-shading)" pointerEvents="none" />
                    <rect x="0" y="0" width="500" height="200" fill="url(#top-shading)" pointerEvents="none" />

                    {/* Realistic dynamic folds & organic cloth creases */}
                    {/* Left Torso fold shadow & highlight */}
                    <path d="M 120,260 Q 185,295 240,250" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="8" strokeLinecap="round" pointerEvents="none" />
                    <path d="M 120,260 Q 185,295 240,250" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2.5" strokeLinecap="round" pointerEvents="none" />

                    {/* Right Torso fold shadow & highlight */}
                    <path d="M 380,310 Q 310,335 265,290" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="9" strokeLinecap="round" pointerEvents="none" />
                    <path d="M 380,310 Q 310,335 265,290" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" strokeLinecap="round" pointerEvents="none" />

                    {/* Underarm drape creases */}
                    <path d="M 116,190 Q 155,212 180,188" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="6" strokeLinecap="round" pointerEvents="none" />
                    <path d="M 384,190 Q 345,212 320,188" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="6" strokeLinecap="round" pointerEvents="none" />

                    {/* Lower front relaxed drop shading */}
                    <path d="M 150,410 Q 250,430 350,410" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="12" strokeLinecap="round" pointerEvents="none" />

                    {/* Double-stitch details on Sleeve Cuffs */}
                    <path d="M 46,211 C 56,221 78,223 88,216" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" pointerEvents="none" />
                    <path d="M 48,214 C 58,224 80,226 90,219" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeDasharray="3 3" pointerEvents="none" />

                    <path d="M 412,216 C 422,223 444,221 454,211" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" pointerEvents="none" />
                    <path d="M 410,219 C 420,226 442,224 452,214" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeDasharray="3 3" pointerEvents="none" />

                    {/* Double-stitch details on Bottom Hem */}
                    <path d="M 118,442 Q 250,454 382,442" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" strokeDasharray="4 4" pointerEvents="none" />
                    <path d="M 118,445 Q 250,457 382,445" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" strokeDasharray="4 4" pointerEvents="none" />
                  </g>

                  {/* Inside Neck Shadow and Sizing Label Details */}
                  <path
                    d="M 190,82 C 210,65 290,65 310,82 C 275,103 225,103 190,82 Z"
                    fill="rgba(0,0,0,0.22)"
                  />
                  <text x="250" y="78" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="rgba(255,255,255,0.3)" letterSpacing="0.2em">HEAVY COTTON</text>
                  <text x="250" y="85" textAnchor="middle" fontSize="5.5" fontFamily="monospace" fill="rgba(255,255,255,0.2)" letterSpacing="0.1em">MADE IN INDIA • L</text>

                  {/* Active Crew Neck Ribbed Collar Overlay */}
                  <path
                    d="M 190,82 
                       C 215,108 285,108 310,82
                       C 314,86 285,114 250,114
                       C 215,114 186,86 190,82 Z"
                    fill="rgba(0,0,0,0.08)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 186,85 C 215,117 285,117 314,85"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />

                  {/* Front Logo / Alignment Box Placement */}
                  {logoSrc ? (
                    <image
                      href={logoSrc}
                      x={250 - (logoScale * 2.4) / 2}
                      y={logoY * 2.5}
                      width={logoScale * 2.4}
                      height={logoScale * 2.4}
                      preserveAspectRatio="xMidYMid meet"
                      className="transition-all duration-300 pointer-events-none"
                    />
                  ) : (
                    /* High Fidelity Dotted Alignment Target Guide */
                    <g opacity="0.35" className="pointer-events-none transition-opacity duration-300">
                      <rect
                        x="150"
                        y="150"
                        width="200"
                        height="200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        rx="8"
                        className="text-zinc-650 dark:text-zinc-200"
                      />
                      <polygon points="250,165 260,175 240,175" fill="currentColor" className="text-zinc-500" />
                      <line x1="180" y1="240" x2="320" y2="240" stroke="currentColor" strokeWidth="1.5" className="text-zinc-600" />
                      <text
                        x="250"
                        y="255"
                        textAnchor="middle"
                        fontSize="13"
                        fontFamily="monospace"
                        className="fill-zinc-600 dark:fill-zinc-300 font-bold"
                        letterSpacing="0.1em"
                      >
                        ALIGNMENT CENTER
                      </text>
                      <text
                        x="250"
                        y="275"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontFamily="sans-serif"
                        className="fill-zinc-400 dark:fill-zinc-400"
                        letterSpacing="0.05em"
                      >
                        DROP ARTWORK HERE
                      </text>
                    </g>
                  )}
                </svg>

                {/* Drag over Highlight Overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-orange-600/10 backdrop-blur-xs rounded-xl flex items-center justify-center border-2 border-dashed border-orange-600 pointer-events-none">
                    <span className="bg-orange-600 text-white font-sans text-xs font-bold uppercase tracking-widest px-4 py-2 shadow-lg rounded">
                      DRAGGING DECORATION HERE
                    </span>
                  </div>
                )}
              </div>

              {/* Dimensional Blueprint Labels */}
              <div className="w-full border-t border-zinc-100 dark:border-zinc-800/80 pt-4 mt-2 flex justify-between items-center text-[10px] font-mono text-zinc-450 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-orange-650/40 rounded-full" />
                  Front Area: Center Align (240x240mm Max)
                </span>
                <span>Active Canvas: vector/raster compatible</span>
              </div>
            </div>

            {/* Quick Slider Adjustment Panel (Only active or highlighted if design is loaded) */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-850 dark:text-zinc-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-orange-605" />
                  Artwork Alignment Controls
                </span>
                {logoSrc && (
                  <button 
                    onClick={handleRemoveLogo}
                    className="text-[10px] font-semibold text-rose-650 dark:text-rose-450 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Remove Artwork
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Scale Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>Graphic Scale:</span>
                    <span className="font-bold text-zinc-850 dark:text-zinc-200">{logoScale}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    disabled={!logoSrc}
                    value={logoScale}
                    onChange={(e) => setLogoScale(Number(e.target.value))}
                    className="w-full accent-orange-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Vertical Alignment Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>Chest Height Y-Offset:</span>
                    <span className="font-bold text-zinc-850 dark:text-zinc-200">{logoY}px</span>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="125"
                    disabled={!logoSrc}
                    value={logoY}
                    onChange={(e) => setLogoY(Number(e.target.value))}
                    className="w-full accent-orange-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>
              </div>
              
              {!logoSrc && (
                <p className="text-[10px] text-center text-zinc-400 dark:text-zinc-500 italic mt-1 leading-relaxed">
                  Upload an artwork logo on the right dashboard to unlock scaling and height positioning parameters!
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: The Controls & Blueprint Specifications Form (col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Design Studio Dashboard Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-lg">
              
              <TabsHeading title="1. Select Apparel Color" num="01" />
              
              {/* Premium Swatches */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 mb-6">
                {TSHIRT_PRESETS.map((preset) => {
                  const isSelected = customColor.toLowerCase() === preset.hex.toLowerCase();
                  return (
                    <button
                      key={preset.name}
                      onClick={() => setCustomColor(preset.hex)}
                      className="group flex flex-col items-center gap-1.5 cursor-pointer"
                      title={preset.description}
                    >
                      <span 
                        className={`w-10 h-10 rounded-full border shadow-sm transition-all duration-300 relative ${
                          isSelected ? 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-zinc-900 scale-105' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: preset.hex, borderColor: 'rgba(0,0,0,0.12)' }}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className={`w-2 h-2 rounded-full ${preset.hex === '#fbfbfb' ? 'bg-zinc-950' : 'bg-white'}`} />
                          </span>
                        )}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-orange-600 text-center truncate max-w-full leading-tight">
                        {preset.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Advanced Color Picker */}
              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/60 mb-8">
                <Paintbrush className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <div className="text-left flex-grow">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block font-mono">
                    Bespoke RGB/Hex Picker
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 font-bold">
                      {customColor.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-sans text-zinc-400 italic">Select custom coordinates</span>
                  </div>
                </div>
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-xs cursor-pointer flex items-center justify-center">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="w-full h-full pointer-events-none" style={{ backgroundColor: customColor }} />
                </div>
              </div>

              <TabsHeading title="2. Upload Decoration Graphic" num="02" />
              
              {/* Artwork Uploader Widget */}
              <div className="space-y-4 mb-8">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {logoSrc ? (
                  <div className="border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/2.5 p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700 relative flex items-center justify-center p-1">
                        <img src={logoSrc} alt="User design thumbnail" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block bg-emerald-500/10 dark:bg-emerald-400/10 px-2 py-0.5 rounded w-fit">
                          ARTWORK RECRUITED
                        </span>
                        <p className="text-xs text-zinc-750 dark:text-zinc-200 font-sans mt-1">
                          Vector raster composite loaded successfully.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={handleRemoveLogo}
                      className="p-2 bg-rose-500/10 dark:bg-rose-500/5 hover:bg-rose-550 hover:text-white rounded-lg text-rose-600 dark:text-rose-450 transition-all cursor-pointer"
                      title="Clear artwork"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={triggerFileSelect}
                    className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 bg-zinc-50 hover:bg-zinc-100/50 dark:bg-zinc-950 dark:hover:bg-zinc-900/30 py-8 px-6 rounded-2xl text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center group"
                  >
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm mb-3 group-hover:scale-105 transition-transform duration-300">
                      <Upload className="w-5 h-5 text-zinc-500 dark:text-zinc-350 group-hover:text-orange-600" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-850 dark:text-zinc-200 font-sans tracking-tight">
                      Drop logo file or click to choose
                    </h4>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs font-sans leading-relaxed">
                      Supports high-res PNG, JPG, SVG, and WebP artwork composites with transparent gradients.
                    </p>
                  </div>
                )}
              </div>

              <TabsHeading title="3. Specifications & Inquiry Details" num="03" />

              {/* Inquiry Form */}
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
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
                          required
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                          placeholder="e.g. robin@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
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
                          <option>Heavyweight 240GSM Cotton</option>
                          <option>Ultra-cozy 320GSM Terry Fleece</option>
                          <option>Artisanal Himalayan Linen Blend</option>
                          <option>Organically Fermented Sateen Cotton</option>
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

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                          Preferred Print Technique
                        </label>
                        <select
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-2 text-xs text-zinc-950 dark:text-white focus:outline-none focus:border-orange-600"
                          value={formData.printingTechnique}
                          onChange={(e) => setFormData({ ...formData, printingTechnique: e.target.value })}
                        >
                          {PRINT_TECHNIQUES.map((tech) => (
                            <option key={tech.name}>{tech.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">
                        Placement & Layout Notes
                      </label>
                      <textarea
                        rows={3}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                        placeholder="e.g. Center chest placement, and high contrast ink colors..."
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      />
                    </div>

                    {errorMsg && (
                      <div className="text-[10px] font-semibold text-rose-500 font-mono animate-pulse">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSendingSimulated}
                      className="w-full bg-black text-white dark:bg-white dark:text-zinc-900 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 rounded-lg shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingSimulated ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Preparing Specs Packet...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Specifications</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center text-zinc-950 dark:text-zinc-100"
                  >
                    <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20 mb-4 mx-auto">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-lg font-bold mb-2 text-emerald-600 dark:text-emerald-400">Specifications Stored</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-md mx-auto leading-relaxed mb-6 font-sans">
                      Your custom design values are recorded in our system. We have prepared an email draft to send directly to <span className="font-bold underline text-zinc-800 dark:text-zinc-100">hitanga@gmail.com</span> with your configured fabric base, spacing scales, and colors.
                    </p>

                    {/* Email Preview Section */}
                    <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 p-4 mb-6 text-left relative group">
                      <div className="flex justify-between items-center pb-2 mb-2 border-b border-zinc-200/40 dark:border-zinc-800/60 text-[10px] uppercase tracking-wider font-mono text-zinc-400">
                        <span>Email Draft Preview</span>
                        <span>To: hitanga@gmail.com</span>
                      </div>
                      <pre className="text-[10px] font-mono leading-relaxed text-zinc-600 dark:text-zinc-350 max-h-[160px] overflow-y-auto whitespace-pre-wrap select-all">
                        {getEmailBodyText()}
                      </pre>
                    </div>

                    {/* Triggers Group */}
                    <div className="space-y-2.5">
                      <button
                        onClick={handleOpenEmailClient}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-lg shadow flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Open Mail Application</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={handleCopyToClipboard}
                          className="bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-250 border border-zinc-200 dark:border-zinc-800 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copied ? 'Copied' : 'Copy Specs'}</span>
                        </button>

                        <button
                          onClick={() => setSubmitted(false)}
                          className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Redesign</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>

        </div>

        {/* BOTTOM SECTION: Educational Technique Cards with Beautiful Layout */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-800/80 pt-16 mt-16 text-left">
          <div className="max-w-3xl mb-12">
            <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-rose-600 tracking-[0.3em] block mb-2">
              OUR INK FORMULAS
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-zinc-900 dark:text-white font-bold leading-tight">
              Premium Print Methodologies
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
              We approach apparel printing with fine-art precision. Our formulas hold organic starch compositions rather than toxic plastic resins, ensuring ecological safety with phenomenal durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINT_TECHNIQUES.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/80 rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white">
                      {tech.name}
                    </h3>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-orange-600 bg-orange-50 dark:bg-orange-950/20 px-2 py-0.5 rounded border border-orange-200/30 whitespace-nowrap">
                      {tech.tag}
                    </span>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-6 font-sans">
                    {tech.desc}
                  </p>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2 text-[10px] font-mono text-zinc-400 dark:text-zinc-505">
                  <div className="flex justify-between">
                    <span className="font-semibold text-zinc-500 dark:text-zinc-450 uppercase">DURABILITY:</span>
                    <span className="text-zinc-800 dark:text-zinc-200">{tech.durability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-zinc-500 dark:text-zinc-450 uppercase">BEST FOR:</span>
                    <span className="text-zinc-800 dark:text-zinc-200">{tech.bestFor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-zinc-500 dark:text-zinc-450 uppercase">LEAD TIME:</span>
                    <span className="text-zinc-800 dark:text-zinc-200">{tech.leadTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Subcomponent for clean visual spacing of the form segment headings
interface TabsHeadingProps {
  title: string;
  num: string;
}

function TabsHeading({ title, num }: TabsHeadingProps) {
  return (
    <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
      <span className="font-mono text-xs font-bold text-orange-600 bg-orange-100/40 dark:bg-orange-950/10 w-5 h-5 rounded-full flex items-center justify-center">
        {num}
      </span>
      <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
        {title}
      </h3>
    </div>
  );
}
