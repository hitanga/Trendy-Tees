import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, Heart, Globe, Users, ArrowRight, Sparkles } from 'lucide-react';
import FabricStory from './FabricStory';

export default function AboutUsPage({ setTab }: { setTab: (tab: string) => void }) {
  return (
    <div className="pt-24 pb-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Editorial Page Header */}
      <div className="border-b border-zinc-200/50 dark:border-zinc-800/50 py-12 md:py-20 mb-8">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center md:text-left">
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 tracking-[0.3em] block mb-3 animate-pulse">
            HERITAGE & VISION
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-zinc-900 dark:text-white font-bold tracking-tight max-w-3xl leading-tight">
            Weaving Traditional Souls with Brutalist Shapes
          </h1>
          <p className="mt-6 text-zinc-500 dark:text-zinc-400 text-sm md:text-lg max-w-xl font-sans leading-relaxed">
            Sourced responsibly from the snowy heights of Far-Western Nepal to design timeless street structures.
          </p>
        </div>
      </div>

      {/* Embedded Deep Diver */}
      <div className="my-4">
        <FabricStory />
      </div>

      {/* Sustainable Values / Bento Highlight Grid */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
        <div className="text-center md:text-left mb-12">
          <span className="font-sans text-[10px] md:text-xs font-semibold uppercase text-orange-600 tracking-[0.3em] block mb-2">
            OUR COMPASS
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-zinc-900 dark:text-white font-bold">
            Core Design Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:border-orange-600/30 transition-all">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-950 dark:text-zinc-100 mb-3">
              100% Traceable Cotton & Wool
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
              We skip high-volume industrial processing mills, establishing direct economic links with family loom collectives. Your custom garment can be traced back to the community of weavers who initialized the fibers.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:border-orange-600/30 transition-all">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-950 dark:text-zinc-100 mb-3">
              Zero Industrial Runoff
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Using traditional Himalayan vegetation recipes and fermented indigo root baths. The dye residue is mineral rich and recycled back to nurture local farming soils instead of toxic chemical discharge.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:border-orange-600/30 transition-all">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-950 dark:text-zinc-100 mb-3">
              Preserving Ancient Crafts
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Hand frame knitting, manual pattern block-carving, and pure wooden loom cycles ensure local cultural crafts thrive. These elements lend each garment a highly unique soul.
            </p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-8">
        <div className="bg-zinc-900 dark:bg-zinc-900 text-white p-8 md:p-14 rounded-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 border border-zinc-800">
          <div className="z-10 text-center md:text-left max-w-xl">
            <div className="flex gap-1.5 items-center justify-center md:justify-start text-xs text-orange-500 font-mono mb-3">
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>CRAFT EXPERIENCE AVAILABLE</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
              Experience the Craftsmanship Firsthand
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Design your own bespoke piece inside our digital interactive tailoring studio or request custom fit support from our master makers.
            </p>
          </div>
          <div className="z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setTab('builder')}
              className="bg-white text-zinc-900 hover:bg-orange-600 hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-center transition-all cursor-pointer rounded"
            >
              Enter Studio
            </button>
            <button
              onClick={() => setTab('contact')}
              className="border border-zinc-700 hover:border-orange-600 text-zinc-200 hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-center transition-all cursor-pointer rounded"
            >
              Book Consult
            </button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-orange-600/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
