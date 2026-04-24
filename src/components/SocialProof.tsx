import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useWaitlist, type WaitlistEntry } from '../hooks/useWaitlist';

const MOCK_SIGNUPS: WaitlistEntry[] = [
  { name: "Priya", country: "India", role: "Creator", created_at: new Date().toISOString() },
  { name: "Ahmed", country: "UAE", role: "Brand", created_at: new Date().toISOString() },
  { name: "Sarah", country: "United Kingdom", role: "Creator", created_at: new Date().toISOString() },
  { name: "Rahul", country: "India", role: "Creator", created_at: new Date().toISOString() },
  { name: "Ming", country: "Singapore", role: "Brand", created_at: new Date().toISOString() },
  { name: "Emma", country: "Canada", role: "Creator", created_at: new Date().toISOString() },
  { name: "Hassan", country: "UAE", role: "Brand", created_at: new Date().toISOString() },
  { name: "Ananya", country: "India", role: "Creator", created_at: new Date().toISOString() },
  { name: "Sofia", country: "Spain", role: "Creator", created_at: new Date().toISOString() },
  { name: "Liam", country: "USA", role: "Brand", created_at: new Date().toISOString() },
];

const SocialProof: React.FC = () => {
  const { realSignups, totalCount } = useWaitlist();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Use real signups if available, otherwise fallback to mock data
  const displaySignups = realSignups.length > 0 ? realSignups : MOCK_SIGNUPS;

  useEffect(() => {
    if (realSignups.length > 0) {
      const newest = realSignups[0];
      const newestId = `${newest.email}-${newest.created_at}`;
      
      // Highlight if it's brand new (less than 5s old)
      const createdDate = new Date(newest.created_at || '');
      const now = new Date();
      if (now.getTime() - createdDate.getTime() < 5000) {
        setHighlightedId(newestId);
        const timer = setTimeout(() => setHighlightedId(null), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [realSignups]);

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
                  "w-12 h-12 rounded-full border-4 border-background flex items-center justify-center text-xs font-bold text-white shadow-xl",
                  i % 2 === 0 ? "bg-primary" : "bg-accent"
                )}
              >
                {initials}
              </div>
            ))}
          </div>
          <div className="text-xl font-bold">
            <motion.span
              key={totalCount}
              initial={{ scale: 1.2, color: '#7C6FFF' }}
              animate={{ scale: 1, color: '#fff' }}
              transition={{ duration: 0.5 }}
            >
              {totalCount.toLocaleString()}
            </motion.span>
            <span className="text-muted font-medium ml-2">already waiting</span>
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
      <div className="max-w-md mx-auto relative h-64 overflow-hidden pt-10">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
        
        <div className="space-y-4 px-2">
          <AnimatePresence initial={false} mode="popLayout">
            {displaySignups.map((join) => {
              const id = join.email ? `${join.email}-${join.created_at}` : `${join.name}-${join.created_at}`;
              const isHighlighted = id === highlightedId;
              const firstName = join.name.split(' ')[0];

              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    borderColor: isHighlighted ? 'rgba(124, 111, 255, 0.5)' : 'transparent',
                    borderLeftWidth: isHighlighted ? '4px' : '0px'
                  }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className={cn(
                    "flex items-center gap-3 justify-center text-sm text-muted p-2 rounded-lg transition-all border-l-0",
                    isHighlighted && "bg-primary/5 shadow-[0_0_15px_rgba(124,111,255,0.1)]"
                  )}
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isHighlighted ? "bg-primary animate-pulse shadow-[0_0_8px_#7C6FFF]" : "bg-green-500"
                  )} />
                  <span>
                    <span className="text-white font-semibold">{firstName}</span> from {join.country} joined as <span className="capitalize">{join.role}</span> ✓
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
