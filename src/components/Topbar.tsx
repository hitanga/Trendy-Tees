import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  dark: boolean;
  toggleDark: () => void;
}

export default function Topbar({ currentTab, setTab, dark, toggleDark }: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: 'collections', label: 'Catalog' },
    { id: 'printing', label: 'Printing' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (tabId: string) => {
    setTab(tabId);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 py-3.5">
        
        {/* Left Side: Logo */}
        <button
          onClick={() => handleNavClick('landing')}
          className="font-serif text-lg md:text-xl lg:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
        >
          Trendy <span className="text-yellow-500 dark:text-yellow-400">Tees</span>
        </button>

        {/* Center: Desktop/Tablet Links (Optimized spacing & sizing) */}
        <div className="hidden md:flex gap-4 lg:gap-8 items-center font-sans text-[10px] lg:text-xs uppercase tracking-widest font-semibold flex-grow justify-center px-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                currentTab === link.id
                  ? 'text-orange-600 border-orange-600'
                  : 'text-zinc-600 dark:text-zinc-300 border-transparent hover:text-orange-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            className="p-2 text-zinc-600 dark:text-zinc-100 hover:text-orange-600 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full transition-all cursor-pointer"
            title="Toggle theme"
          >
            {dark ? <Sun className="w-4.5 h-4.5 animate-pulse text-yellow-500" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Inquiry CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white px-3 sm:px-5 py-2 text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all shadow hover:scale-[1.02] active:scale-[0.98] cursor-pointer rounded-sm"
          >
            Inquiry
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-orange-600 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full transition-all cursor-pointer md:hidden"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="w-5 h-5 text-orange-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 px-6 py-5 space-y-4 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-widest font-bold">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg transition-all cursor-pointer ${
                    currentTab === link.id
                      ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/20'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
