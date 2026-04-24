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
        // 45-90 seconds randomization logic simplified for UI
        return prev + 1;
      });
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const progress = (count / 3000) * 100;

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] p-12 text-center border border-primary/20 bg-gradient-to-br from-card to-[#1A1730]"
      >
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px]" />

        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
          Founding member slots close <br className="hidden md:block" /> 
          when we hit <span className="text-accent">3,000</span>.
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
            <span className="text-2xl md:text-3xl text-muted font-bold">/ 3,000</span>
          </div>
          
          <div className="w-full max-w-2xl h-4 bg-background rounded-full p-1 border border-border">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </div>

        <motion.button
          onClick={onCTAClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-xl px-12"
        >
          Claim Your Spot Before It's Gone
        </motion.button>
        
        <p className="mt-6 text-sm text-muted">
          ⚡ Joining now guarantees you a Founding Member badge forever.
        </p>
      </motion.div>
    </section>
  );
};

export default UrgencySection;
