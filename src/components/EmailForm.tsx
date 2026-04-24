import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface EmailFormProps {
  role: 'brand' | 'creator' | null;
  onSubmit: (data: { email: string; name: string }) => Promise<void>;
  loading: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ role, onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showName, setShowName] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val.includes('@') && val.includes('.') && val.length > 5) {
      setShowName(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    onSubmit({ email, name });
  };

  const placeholder = role === 'brand' ? 'your@company.com' : 'your@email.com';
  const buttonText = role === 'brand' ? 'Claim My Brand Spot →' : 'Claim My Creator Spot →';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={placeholder}
            required
            className="w-full bg-card border border-border focus:border-primary/50 rounded-2xl p-4 outline-none transition-all text-white placeholder:text-muted"
          />
        </div>

        <AnimatePresence>
          {showName && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                required
                className="w-full bg-card border border-border focus:border-primary/50 rounded-2xl p-4 outline-none transition-all text-white placeholder:text-muted"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={loading || !role}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={!loading ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        className={cn(
          "w-full btn-primary flex items-center justify-center gap-2",
          (loading || !role) && "opacity-50 cursor-not-allowed"
        )}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            {buttonText}
          </>
        )}
      </motion.button>

      <p className="text-center text-xs text-muted flex items-center justify-center gap-1">
        <Lock size={12} /> No spam. Unsubscribe anytime.
      </p>
    </form>
  );
};

export default EmailForm;
