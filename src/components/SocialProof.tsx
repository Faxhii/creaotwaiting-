import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOAST_NAMES } from '../constants/data';
import { cn } from '../lib/utils';

const SocialProof: React.FC = () => {
  const [recentJoins, setRecentJoins] = useState(TOAST_NAMES.slice(0, 5).map((j, i) => ({ ...j, id: i })));

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentJoins((prev) => {
        const next = [...prev];
        next.pop();
        const randomUser = TOAST_NAMES[Math.floor(Math.random() * TOAST_NAMES.length)];
        next.unshift({ ...randomUser, id: Date.now() });
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const avatars = ["PK", "RS", "AM", "SL", "RK"];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-y border-white/5">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
        {/* Avatar Stack & Count */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
            {avatars.map((initials, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-12 h-12 rounded-full border-4 border-background flex items-center justify-center text-xs font-bold text-white",
                  i % 2 === 0 ? "bg-primary" : "bg-accent"
                )}
              >
                {initials}
              </div>
            ))}
          </div>
          <div className="text-xl font-bold">
            2,847+ <span className="text-muted font-medium ml-1">already waiting</span>
          </div>
        </div>

        {/* Divider (Desktop) */}
        <div className="hidden lg:block w-px h-12 bg-white/10" />

        {/* Mini Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">⭐</span>
            <span>Creators from 40+ countries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent text-xl">💼</span>
            <span>Brands from 15+ industries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-xl">✓</span>
            <span>15% commission only</span>
          </div>
        </div>
      </div>

      {/* Live Join Feed */}
      <div className="max-w-md mx-auto relative h-48 overflow-hidden pt-10">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
        
        <div className="space-y-4">
          <AnimatePresence initial={false} mode="popLayout">
            {recentJoins.map((join: any) => (
              <motion.div
                key={join.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 justify-center text-sm text-muted"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span>
                  <span className="text-white font-semibold">{join.name}</span> from {join.location} just joined as {join.role} ✓
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
