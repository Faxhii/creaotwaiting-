import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useWaitlist, type WaitlistEntry } from '../hooks/useWaitlist';

const MOCK_SIGNUPS: WaitlistEntry[] = [
  { name: "Priya", country: "India", role: "Creator", created_at: new Date(Date.now() - 10000).toISOString() },
  { name: "Ahmed", country: "UAE", role: "Brand", created_at: new Date(Date.now() - 20000).toISOString() },
  { name: "Sarah", country: "United Kingdom", role: "Creator", created_at: new Date(Date.now() - 30000).toISOString() },
  { name: "Rahul", country: "India", role: "Creator", created_at: new Date(Date.now() - 40000).toISOString() },
  { name: "Ming", country: "Singapore", role: "Brand", created_at: new Date(Date.now() - 50000).toISOString() },
  { name: "Emma", country: "Canada", role: "Creator", created_at: new Date(Date.now() - 60000).toISOString() },
  { name: "Hassan", country: "UAE", role: "Brand", created_at: new Date(Date.now() - 70000).toISOString() },
  { name: "Ananya", country: "India", role: "Creator", created_at: new Date(Date.now() - 80000).toISOString() },
  { name: "Sofia", country: "Spain", role: "Creator", created_at: new Date(Date.now() - 90000).toISOString() },
  { name: "Liam", country: "USA", role: "Brand", created_at: new Date(Date.now() - 100000).toISOString() },
];

const SocialProof: React.FC = () => {
  const { realSignups, totalCount } = useWaitlist();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Combine Real and Mock data so the list is always full
  const displaySignups = useMemo(() => {
    // Take real signups first, then fill the rest with mock data
    const combined = [...realSignups, ...MOCK_SIGNUPS];
    // Return unique items based on name (simple deduplication for demo)
    const unique = Array.from(new Map(combined.map(item => [item.name, item])).values());
    return unique.slice(0, 10);
  }, [realSignups]);

  useEffect(() => {
    if (realSignups.length > 0) {
      const newest = realSignups[0];
      const newestId = newest.email ? `${newest.email}-${newest.created_at}` : `${newest.name}-${newest.created_at}`;
      
      // Highlight if it's brand new (less than 10s old)
      const createdDate = new Date(newest.created_at || '');
      const now = new Date();
      if (now.getTime() - createdDate.getTime() < 10000) {
        setHighlightedId(newestId);
        const timer = setTimeout(() => setHighlightedId(null), 5000);
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

      {/* Live Join Feed - Vertical Marquee Style */}
      <div className="max-w-md mx-auto relative h-40 overflow-hidden pt-4">
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent z-10" />
        
        <div className="flex flex-col items-center">
          <AnimatePresence mode="popLayout">
            {displaySignups.map((join, idx) => {
              const id = join.email ? `${join.email}-${join.created_at}` : `${join.name}-${join.created_at}`;
              const isHighlighted = id === highlightedId;
              const firstName = join.name.split(' ')[0];

              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    borderColor: isHighlighted ? 'rgba(124, 111, 255, 0.5)' : 'transparent',
                    borderLeftWidth: isHighlighted ? '4px' : '0px',
                    scale: isHighlighted ? 1.05 : 1
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: idx * 0.1,
                    ease: "easeOut"
                  }}
                  className={cn(
                    "flex items-center gap-3 text-sm text-muted p-2 rounded-lg transition-all border-l-0 mb-2 w-full justify-center",
                    isHighlighted && "bg-primary/5 shadow-[0_0_15px_rgba(124,111,255,0.1)] text-white"
                  )}
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isHighlighted ? "bg-primary animate-pulse shadow-[0_0_8px_#7C6FFF]" : "bg-green-500"
                  )} />
                  <span className="whitespace-nowrap">
                    <span className={cn("font-bold", isHighlighted ? "text-primary" : "text-white")}>{firstName}</span> from {join.country} joined as <span className="capitalize">{join.role}</span> ✓
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
