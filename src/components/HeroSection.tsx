import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleSelector from './RoleSelector';
import EmailForm from './EmailForm';

interface HeroSectionProps {
  onSignup: (data: { email: string; name: string; role: string }) => Promise<void>;
  loading: boolean;
  selectedRole: 'brand' | 'creator' | null;
  onRoleSelect: (role: 'brand' | 'creator') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSignup, loading, selectedRole, onRoleSelect }) => {

  const handleSignup = async (data: { email: string; name: string }) => {
    if (!selectedRole) return;
    await onSignup({ ...data, role: selectedRole });
  };

  const headline = selectedRole === 'brand' 
    ? "Join brands already finding verified creators"
    : selectedRole === 'creator'
    ? "Join creators already landing global deals"
    : "Stop paying for followers. Pay for results.";

  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center overflow-hidden">
      {/* Announcement Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1730] border border-primary/30 text-primary text-sm font-medium mb-8 shimmer"
      >
        <span>🚀 Early Access Opening Soon</span>
      </motion.div>

      {/* Headline */}
      <div className="mb-6 min-h-[140px] md:min-h-[180px]">
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
              <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
                {headline}
              </h1>
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
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
                  <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <motion.path
                      d="M0 5 Q 50 0, 100 5 T 200 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
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
        className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12"
      >
        Vero connects global brands with verified creators — tracked by real ROI, not vanity metrics.
      </motion.p>

      {/* Role Selector */}
      <RoleSelector selectedRole={selectedRole} onSelect={onRoleSelect} />

      {/* Email Form */}
      <EmailForm role={selectedRole} onSubmit={handleSignup} loading={loading} />

      {/* Urgency Bar */}
      <div className="mt-12 max-w-md mx-auto">
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>⚡ Only 500 founding member slots available</span>
          <span className="font-bold text-accent">152 remaining</span>
        </div>
        <div className="h-2 w-full bg-card border border-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '69.6%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-accent"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
