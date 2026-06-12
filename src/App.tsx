import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Sparkles, Heart } from 'lucide-react';

// Live custom components
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import FabricStory from './components/FabricStory';
import TailoredSolutions from './components/TailoredSolutions';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import ApparelBuilder from './components/ApparelBuilder';
import Dashboard from './components/Dashboard';
import ProfileSettings from './components/ProfileSettings';

// Dedicated Sub-pages
import AboutUsPage from './components/AboutUsPage';
import CustomPrintingPage from './components/CustomPrintingPage';
import CorporateOrdersPage from './components/CorporateOrdersPage';
import ContactPage from './components/ContactPage';

export default function App() {
  const [currentTab, setTab] = useState<string>('landing');
  const [selectedStyle, setSelectedStyle] = useState<'Blazer' | 'T-Shirt' | 'Knitwear'>('Blazer');
  const [forcedService, setForcedService] = useState<string | null>(null);

  // Dark theme configuration
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    // Initial theme check
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDark = () => {
    const newVal = !dark;
    setDark(newVal);
    if (newVal) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleInquirePricing = (service: string) => {
    if (service === 'Custom Printing') {
      setTab('printing');
    } else if (service === 'Corporate Orders') {
      setTab('corporate');
    } else {
      setTab('contact');
    }
  };

  const handleScrollToConsultation = () => {
    setTab('contact');
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 min-h-screen flex flex-col transition-colors duration-300 antialiased">
      {/* Premium Sticky Topbar */}
      <Topbar currentTab={currentTab} setTab={setTab} dark={dark} toggleDark={toggleDark} />

      {/* Primary content area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentTab === 'landing' && (
            <motion.div
              key="landing-group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-0"
            >
              {/* Landing Page Sections (Screens inspired by layout mockups) */}
              <Hero />
              
              <Collections
                setTab={setTab}
                setSelectedStyleInBuilder={setSelectedStyle}
                limitCount={8}
              />
              
              <FabricStory />
              
              <TailoredSolutions
                onStartConsultation={handleScrollToConsultation}
                onInquirePricing={handleInquirePricing}
              />
              
              <Gallery limitCount={8} setTab={setTab} />
              
              <ContactForm
                forcedService={forcedService}
                clearForcedService={() => setForcedService(null)}
              />
            </motion.div>
          )}

          {currentTab === 'collections' && (
            <motion.div
              key="collections-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-12"
            >
              <Collections
                setTab={setTab}
                setSelectedStyleInBuilder={setSelectedStyle}
              />
            </motion.div>
          )}

          {currentTab === 'printing' && (
            <motion.div
              key="printing-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <CustomPrintingPage />
            </motion.div>
          )}

          {currentTab === 'corporate' && (
            <motion.div
              key="corporate-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <CorporateOrdersPage />
            </motion.div>
          )}

          {currentTab === 'gallery' && (
            <motion.div
              key="gallery-group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pt-12"
            >
              <Gallery />
            </motion.div>
          )}

          {currentTab === 'about' && (
            <motion.div
              key="about-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <AboutUsPage setTab={setTab} />
            </motion.div>
          )}

          {currentTab === 'contact' && (
            <motion.div
              key="contact-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ContactPage />
            </motion.div>
          )}

          {currentTab === 'builder' && (
            <motion.div
              key="builder-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <ApparelBuilder setTab={setTab} stylePreselection={selectedStyle} />
            </motion.div>
          )}

          {currentTab === 'dashboard' && (
            <motion.div
              key="dashboard-group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Dashboard setTab={setTab} setSelectedStyleInBuilder={setSelectedStyle} />
            </motion.div>
          )}

          {currentTab === 'settings' && (
            <motion.div
              key="settings-group"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.4 }}
            >
              <ProfileSettings setTab={setTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Clean Aesthetic Footer */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200/50 dark:border-zinc-800/80 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
              Trendy Tees
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-xs">
              Meticulously weaving traditional Himalayan yarn heritages with cutting edge urban brutalist shapes. Designed responsibly.
            </p>
            <div className="flex gap-1.5 items-center text-[10px] text-zinc-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
              <span>Tailoring Studio Active</span>
            </div>
          </div>

          {/* Directory links */}
          <div className="space-y-3">
            <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-zinc-700 dark:text-zinc-300">
              Corporate Desk
            </h5>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <li>
                <button
                  onClick={() => setTab('collections')}
                  className="hover:text-orange-600 cursor-pointer text-left transition-colors"
                >
                  Seasonal Lookbooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTab('corporate')}
                  className="hover:text-orange-600 cursor-pointer text-left transition-colors"
                >
                  Corporate Wholesale Lists
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTab('contact')}
                  className="hover:text-orange-600 cursor-pointer text-left transition-colors"
                >
                  Send an Inquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing links */}
          <div className="space-y-3">
            <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-zinc-700 dark:text-zinc-300">
              Sourcing Heritage
            </h5>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <li>
                <button
                  onClick={() => setTab('about')}
                  className="hover:text-orange-600 cursor-pointer text-left transition-colors"
                >
                  Himalayan Yak Weavers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTab('about')}
                  className="hover:text-orange-600 cursor-pointer text-left transition-colors"
                >
                  Organic Fermentation Yards
                </button>
              </li>
            </ul>
          </div>

          {/* Support line */}
          <div className="space-y-3">
            <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-zinc-700 dark:text-zinc-300">
              Support Desk
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>craft@trendytees.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Trendy Tees Hub, Road 7, Nepal</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal area */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 py-6 max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400 font-mono">
          <span>&copy; {new Date().getFullYear()} Trendy Tees Private Limited. All Rights Reserved.</span>
          <span className="flex items-center gap-1 leading-none text-[10px]">
            <span>Weaved with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>in Nepal</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
