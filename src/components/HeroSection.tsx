import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleSelector from './RoleSelector';
import EmailForm from './EmailForm';

interface HeroSectionProps {
  onSignup: (data: { email: string; name: string; country: string }) => Promise<void>;
  loading: boolean;
  selectedRole: 'brand' | 'creator' | null;
  onRoleSelect: (role: 'brand' | 'creator') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSignup, loading, selectedRole, onRoleSelect }) => {
  const headline = selectedRole === 'brand' 
    ? "Join 340+ brands already discovering verified creators"
    : selectedRole === 'creator'
    ? "Join 2,800+ creators already landing global brand deals"
    : "Stop paying for followers. Pay for results.";

  return (
    <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
      {/* Announcement Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#1A1730] border border-primary/30 text-primary text-sm font-bold mb-10 shimmer relative overflow-hidden"
      >
        <span className="relative z-10">🚀 Early Access — Founding Member Slots Open</span>
      </motion.div>

      {/* Headline */}
      <div className="mb-8 min-h-[160px] md:min-h-[220px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {selectedRole ? (
              <h1 className="text-4xl md:text-7xl font-black leading-tight max-w-5xl text-white">
                {headline}
              </h1>
            ) : (
              <h1 className="text-4xl md:text-7xl font-black leading-tight text-[#F8FAFC]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="block"
                >
                  Stop paying for
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="relative inline-block text-accent"
                >
                  followers.
                  <svg className="absolute -bottom-2 left-0 w-full overflow-visible" height="12" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <motion.path
                      d="M0 6 Q 25 0, 50 6 T 100 6 T 150 6 T 200 6"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="animate-wavy"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </svg>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block"
                >
                  Pay for results.
                </motion.span>
              </h1>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-base md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-16 leading-relaxed"
      >
        Vero connects global brands with verified creators — tracked by real ROI, not vanity metrics. Every deal. Every time.
      </motion.p>

      <div className="mb-4 text-[10px] uppercase font-bold tracking-widest text-muted">I am joining as...</div>
      <RoleSelector selectedRole={selectedRole} onSelect={onRoleSelect} />

      <EmailForm role={selectedRole} onSubmit={onSignup} loading={loading} />

      <div className="mt-16 max-w-md mx-auto">
        <div className="flex justify-between text-xs font-bold mb-3">
          <span className="text-muted">⚡ Founding member slots: <span className="text-accent">152 of 500</span> remaining</span>
        </div>
        <div className="h-2 w-full bg-[#1A1A2A] rounded-full overflow-hidden border border-white/5 p-[1px]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '69.6%' }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent to-[#C73652] rounded-full shadow-[0_0_10px_rgba(233,69,96,0.4)]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
