import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowLeft, Key, User, BookCheck, QrCode, Clipboard, CheckCircle, Smartphone } from 'lucide-react';
import { useSharedStore } from '../lib/store';

interface ProfileSettingsProps {
  setTab: (tab: string) => void;
}

const DUMMY_RECOVERY = [
  'BHA-483-921-X99',
  'BHA-102-482-W12',
  'BHA-923-382-K83',
  'BHA-119-923-C34'
];

export default function ProfileSettings({ setTab }: ProfileSettingsProps) {
  const { user, updateUser } = useSharedStore();
  const [name, setName] = useState(user?.name || 'Gopal Thapa');
  const [preferredStyle, setPreferredStyle] = useState(user?.preferredStyle || 'Bespoke Design');
  
  // MFA configuration States
  const [mfaActive, setMfaActive] = useState(user?.mfaEnabled || false);
  const [showSetup, setShowSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [mfaSuccess, setMfaSuccess] = useState(false);

  // Profile saving
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      preferredStyle
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleStartMfaSetup = () => {
    setShowSetup(true);
    setVerificationCode('');
    setVerificationError('');
  };

  const handleVerifyMfa = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.trim().length !== 6) {
      setVerificationError('Authenticating code must be exactly 6 digits.');
      return;
    }
    // Simple mock TOTP code testing. Accepts any 6-digit code for standard simulation.
    if (!/^\d+$/.test(verificationCode)) {
      setVerificationError('Authenticating code must contain numbers only.');
      return;
    }

    setMfaSuccess(true);
    setTimeout(() => {
      updateUser({ mfaEnabled: true });
      setMfaActive(true);
      setShowSetup(false);
      setMfaSuccess(false);
    }, 1500);
  };

  const handleDisableMfa = () => {
    updateUser({ mfaEnabled: false });
    setMfaActive(false);
  };

  const copyCodesToClipboard = () => {
    navigator.clipboard.writeText(DUMMY_RECOVERY.join('\n'));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => setTab('dashboard')}
          className="text-xs text-zinc-500 hover:text-orange-600 dark:hover:text-orange-400 font-sans font-semibold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Client Workspace</span>
        </button>

        {/* Profile and Multi Factor Setup Section */}
        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Left panel: Profile fields (5 Cols) */}
          <div className="md:col-span-5 bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-md">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-zinc-400" />
              <span>Workspace Profile</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest block mb-1">
                  Profile Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-750 py-2.5 px-3 rounded text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest block mb-1">
                  Secure Email Match
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || 'gopalzone2025@gmail.com'}
                  className="w-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-250 dark:border-zinc-850 py-2.5 px-3 rounded text-xs text-zinc-500 cursor-not-allowed text-zinc-400"
                />
                <span className="text-[10px] text-zinc-400 block mt-1">
                  Email authentication identifier cannot be changed.
                </span>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest block mb-1">
                  Favorite Tailoring Style
                </label>
                <select
                  value={preferredStyle}
                  onChange={(e) => setPreferredStyle(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-750 py-2.5 px-3 rounded text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600"
                >
                  <option>Bespoke Design</option>
                  <option>Custom Printing</option>
                  <option>Corporate Orders</option>
                </select>
              </div>

              {savedSuccess ? (
                <div className="text-xs text-emerald-600 font-semibold p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded flex items-center justify-center gap-1.5 border border-emerald-200/50">
                  <CheckCircle className="w-4 h-4" />
                  <span>Profile synched!</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-zinc-900 font-sans text-xs font-bold uppercase tracking-widest py-2.5 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white rounded cursor-pointer transition-colors shadow"
                >
                  Save Profile Info
                </button>
              )}
            </form>
          </div>

          {/* Right panel: Multi Factor Security (7 Cols) */}
          <div className="md:col-span-7 bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 shadow-md space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-600 animate-pulse" />
                  <span>Multi-Factor Authentication</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Secure your design studio transactions and custom bills with TOTP verification keys.
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded text-[9px] font-mono tracking-widest uppercase font-bold border ${
                mfaActive
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500'
              }`}>
                {mfaActive ? 'ACTIVE' : 'DISABLED'}
              </span>
            </div>

            {/* If setup is started */}
            <AnimatePresence mode="wait">
              {showSetup ? (
                <motion.form
                  key="mfa-step"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleVerifyMfa}
                  className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-6"
                >
                  <div className="grid sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Simulated elegant QR code vector matrix */}
                    <div className="sm:col-span-5 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl flex flex-col items-center border dark:border-zinc-700/60 justify-center">
                      <QrCode className="w-28 h-28 text-zinc-800 dark:text-white" />
                      <span className="text-[8px] font-mono text-zinc-400 mt-2">SECRET TO SCAN</span>
                    </div>

                    <div className="sm:col-span-7 space-y-3">
                      <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                        <Smartphone className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider">Step 1: Scan custom QR</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Scan with Google Authenticator, Authy, or Duo Link. If camera doesn't work, enter key below:
                      </p>
                      <div className="bg-zinc-50 dark:bg-zinc-850 p-2 rounded text-center border dark:border-zinc-700">
                        <code className="text-[10px] font-mono tracking-widest text-orange-600 select-all font-bold">
                          BHA-ORGC-TAIL-STU99
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Recovery backup codes */}
                  <div className="border border-zinc-200/50 dark:border-zinc-800 p-4 rounded-lg bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                      <span>Emergency Recovery backup keys</span>
                      <button
                        type="button"
                        onClick={copyCodesToClipboard}
                        className="text-orange-600 hover:text-orange-700 underline flex items-center gap-1 cursor-pointer select-none"
                      >
                        <Clipboard className="w-3 h-3" />
                        <span>{copiedCodes ? 'Copied' : 'Copy Codes'}</span>
                      </button>
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono select-none text-zinc-650 dark:text-zinc-300">
                      {DUMMY_RECOVERY.map(c => (
                        <span key={c} className="bg-white dark:bg-zinc-900 px-2 py-1 rounded text-center border dark:border-zinc-800 shadow-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-[9px] text-zinc-400 tracking-normal mt-1 leading-normal">
                      Copy, save and store these backup keys securely. They bypass TOTP rules if devices get misplaced.
                    </p>
                  </div>

                  <div className="space-y-2 border-t dark:border-zinc-800 pt-4">
                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block">
                      Step 2: Authenticator verification code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                          setVerificationError('');
                        }}
                        placeholder="e.g. 518392"
                        className="bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-250 dark:border-zinc-700 py-2.5 px-4 rounded text-center text-sm tracking-[0.4em] font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-orange-600 w-full"
                      />
                      <button
                        type="submit"
                        className="bg-black dark:bg-white text-white dark:text-zinc-900 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white px-6 py-2 rounded text-xs font-bold uppercase tracking-widest cursor-pointer flex-shrink-0 flex items-center gap-1 transition-all"
                      >
                        <BookCheck className="w-4 h-4" />
                        <span>Verify code</span>
                      </button>
                    </div>
                    {verificationError && (
                      <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                        ⚠️ {verificationError}
                      </span>
                    )}

                    {mfaSuccess && (
                      <span className="text-[10px] text-emerald-600 font-semibold mt-2 block animate-pulse">
                        👑 Security Key Validated! Activating MFA...
                      </span>
                    )}
                  </div>
                </motion.form>
              ) : (
                <div key="mfa-status-view" className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  {mfaActive ? (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-4 rounded text-xs text-zinc-800 dark:text-emerald-200">
                        <p className="font-semibold flex items-center gap-1.5 mb-1 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>Multi-Factor Security is Active</span>
                        </p>
                        <span>Every custom order check out now verifies your device keys to lock transactions securely.</span>
                      </div>
                      <button
                        onClick={handleDisableMfa}
                        className="px-4 py-2 text-xs font-bold border border-red-200 dark:border-red-900 text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 rounded cursor-pointer transition-colors"
                      >
                        Deactivate Multi-Factor Authentication
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-amber-50 dark:bg-amber-950/10 border border-amber-150 p-4 rounded text-xs text-zinc-650 dark:text-amber-250">
                        <p className="font-semibold flex items-center gap-1.5 mb-1 text-amber-800 dark:text-amber-400">
                          <span>Security Warning: MFA Disabled</span>
                        </p>
                        <span>We heavily recommend securing your custom tailored fitting rosters and billing history.</span>
                      </div>
                      <button
                        onClick={handleStartMfaSetup}
                        className="bg-zinc-900 hover:bg-orange-600 dark:bg-white dark:text-zinc-900 text-white dark:hover:bg-orange-600 dark:hover:text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-widest rounded cursor-pointer transition-colors"
                      >
                        Set Up Multi-Factor Authentication
                      </button>
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
