import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface EmailFormProps {
  role: 'brand' | 'creator' | null;
  onSubmit: (data: { email: string; name: string }) => Promise<void>;
  loading: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ role, onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    await onSubmit({ email, name });
    setSuccess(true);
  };

  const placeholder = role === 'brand' ? 'your@company.com' : role === 'creator' ? 'your@email.com' : 'your@email.com';
  
  const buttonText = success ? "Welcome Aboard!" : 
    role === 'brand' ? 'Claim My Founding Brand Spot →' : 
    role === 'creator' ? 'Claim My Founding Creator Spot →' : 'Join the Waitlist →';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-2xl p-4 outline-none transition-all text-white placeholder:text-muted h-14"
          />
        </div>
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
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={!loading && !success ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "w-full h-14 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold transition-all duration-300",
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
