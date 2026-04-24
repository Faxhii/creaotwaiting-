import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOAST_NAMES } from '../constants/data';

const LiveToast: React.FC = () => {
  const [currentToast, setCurrentToast] = useState<{name: string; location: string; role: string} | null>(null);

  useEffect(() => {
    const showRandomToast = () => {
      const randomUser = TOAST_NAMES[Math.floor(Math.random() * TOAST_NAMES.length)];
      setCurrentToast(randomUser);
      
      setTimeout(() => {
        setCurrentToast(null);
      }, 4000);
    };

    const interval = setInterval(() => {
      showRandomToast();
    }, Math.random() * 60000 + 30000); // 30-90 seconds

    // Initial toast after 5s
    const initialTimeout = setTimeout(showRandomToast, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {currentToast && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="glass-panel p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm pointer-events-auto"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white uppercase">
                {currentToast.name[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#111118] rounded-full animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <p className="text-sm font-medium text-white">
                <span className="font-bold">{currentToast.name}</span> from {currentToast.location}
              </p>
              <p className="text-xs text-muted">
                Just joined as a {currentToast.role}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveToast;
