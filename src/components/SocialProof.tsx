import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOAST_NAMES } from '../constants/data';

const SocialProof: React.FC = () => {
  const [recentJoins, setRecentJoins] = useState(TOAST_NAMES.slice(0, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentJoins((prev) => {
        const next = [...prev];
        next.pop();
        const randomName = TOAST_NAMES[Math.floor(Math.random() * TOAST_NAMES.length)];
        next.unshift({ ...randomName, id: Math.random() } as any);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Creators Waiting", value: "2,800+" },
    { label: "Brands Waiting", value: "340+" },
    { label: "Commission Only", value: "15%" },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Live Join Feed */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Live activity feed</span>
        </div>
        
        <div className="h-40 overflow-hidden relative max-w-md mx-auto">
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent z-10" />
          
          <div className="space-y-4 pt-4">
            <AnimatePresence initial={false}>
              {recentJoins.map((join: any) => (
                <motion.div
                  key={join.id || join.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between p-3 glass-panel rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium">
                      {join.name} from {join.location}
                    </span>
                  </div>
                  <span className={join.role === 'Brand' ? 'text-primary text-xs font-bold' : 'text-accent text-xs font-bold'}>
                    joined as {join.role} ✓
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <p className="text-center text-[10px] text-muted mt-4 italic opacity-50">
          * Simulated activity for demonstration
        </p>
      </div>

      {/* Stat Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-8 glass-panel rounded-3xl"
          >
            <div className="text-4xl font-bold mb-2 text-white">{stat.value}</div>
            <div className="text-sm text-muted uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
