import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface UrgencySectionProps {
  onCTAClick: () => void;
}

const UrgencySection: React.FC<UrgencySectionProps> = ({ onCTAClick }) => {
  const [count, setCount] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 2999) return prev;
        return prev + 1;
      });
    }, Math.random() * 45000 + 45000); // 45-90 seconds
    return () => clearInterval(interval);
  }, []);

  const progress = (count / 3000) * 100;

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] p-12 text-center border border-primary/20 bg-gradient-to-br from-card to-[#1A1730]"
      >
        <div className="text-5xl mb-6">🔥</div>

        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
          Founding member slots <br /> 
          are almost gone.
        </h2>

        <div className="flex flex-col items-center justify-center mb-10">
          <div className="flex items-baseline gap-2 mb-4">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-white"
            >
              {count}
            </motion.span>
            <span className="text-2xl md:text-3xl text-muted font-bold">/ 3,000 founding slots</span>
          </div>
          
          <div className="w-full max-w-2xl h-4 bg-background rounded-full p-1 border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto btn-primary text-xl px-16 h-16 rounded-2xl"
          >
            Claim My Founding Spot →
          </motion.button>
          
          <div className="text-sm text-muted">
            <p className="mb-4 font-medium uppercase tracking-widest text-[10px]">When we hit 3,000, early access closes permanently.</p>
            <button 
              onClick={onCTAClick}
              className="text-primary hover:text-white transition-colors underline underline-offset-8 decoration-primary/30"
            >
              Already joined? Share your link to move up the waitlist ↓
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default UrgencySection;
