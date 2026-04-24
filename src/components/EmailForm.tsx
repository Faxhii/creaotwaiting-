import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Loader2, Check, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { COUNTRIES, ALL_COUNTRIES } from '../constants/countries';

interface EmailFormProps {
  role: 'brand' | 'creator' | null;
  onSubmit: (data: { email: string; name: string; country: string }) => Promise<void>;
  loading: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ role, onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Basic auto-detection based on locale
    const locale = navigator.language || 'en-IN';
    const region = locale.split('-')[1]?.toUpperCase();
    
    if (region) {
      const match = ALL_COUNTRIES.find(c => c.code === region);
      if (match) setCountry(match.name);
    } else {
      setCountry('India'); // Default
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !country) return;
    await onSubmit({ email, name, country });
    setSuccess(true);
  };

  const placeholder = role === 'brand' ? 'your@company.com' : 'your@email.com';
  
  const buttonText = success ? "Welcome Aboard!" : 
    role === 'brand' ? 'Claim My Founding Brand Spot →' : 
    role === 'creator' ? 'Claim My Founding Creator Spot →' : 'Join the Waitlist →';

  // Progressive disclosure logic
  const showName = email.length > 3; // Show name after a few chars of email
  const showCountry = showName && name.length > 2; // Show country after name is started

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4">
      <div className="flex flex-col gap-4">
        {/* Email Field - ALWAYS VISIBLE */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="w-full bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-2xl p-4 outline-none transition-all text-white placeholder:text-muted h-14"
          />
        </div>

        {/* Name Field - FADES IN */}
        <AnimatePresence>
          {showName && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="relative overflow-hidden"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-2xl p-4 outline-none transition-all text-white placeholder:text-muted h-14"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Country Field - FADES IN */}
        <AnimatePresence>
          {showCountry && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="relative overflow-hidden"
            >
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-2xl p-4 pr-10 outline-none transition-all text-white h-14 appearance-none cursor-pointer"
              >
                <option value="" disabled>Select your country</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
                <option disabled>──────────</option>
                {ALL_COUNTRIES.filter(c => !COUNTRIES.find(pc => pc.code === c.code)).map((c) => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                <ChevronDown size={20} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={loading || !showCountry}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={!loading && !success && showCountry ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "w-full h-14 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold transition-all duration-300 mt-2",
          !showCountry ? "opacity-50 cursor-not-allowed bg-muted/20" : 
          success ? "bg-green-500 text-white" : "bg-gradient-to-r from-accent to-[#C73652] text-white hover:shadow-[0_0_20px_rgba(233,69,96,0.4)]"
        )}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : success ? (
          <Check size={24} />
        ) : (
          buttonText
        )}
      </motion.button>

      <p className="text-center text-[11px] text-[#94A3B8] flex items-center justify-center gap-1.5 font-medium">
        <Lock size={12} className="text-muted" /> 🔒 No spam. No credit card. Unsubscribe anytime.
      </p>
    </form>
  );
};

export default EmailForm;
