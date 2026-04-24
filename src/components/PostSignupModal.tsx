import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Copy, Check, MessageCircle, Share2, Globe } from 'lucide-react';


interface PostSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    email: string;
    role: string;
    position: number;
    referralCode: string;
  } | null;
}

const PostSignupModal: React.FC<PostSignupModalProps> = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C6FFF', '#E94560', '#ffffff']
      });

      if (data?.position) {
        let start = 0;
        const end = data.position;
        const duration = 2000;
        const increment = Math.ceil(end / (duration / 16));
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setDisplayPosition(end);
            clearInterval(timer);
          } else {
            setDisplayPosition(start);
          }
        }, 16);
      }
    }
  }, [isOpen, data]);

  const referralLink = `https://vero.app/join?ref=${data?.referralCode || 'FOUNDER'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = `I just joined the Vero waitlist — the platform where brands pay creators for REAL results, not followers. Join here: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-card border-t sm:border border-border rounded-t-[3rem] sm:rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[100px] -z-10" />

            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-6 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-sm font-bold mb-6"
              >
                🏆 {data.role === 'brand' ? 'Founding Brand Member' : 'Founding Creator Member'}
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-black mb-2">Welcome to Vero, {data.name.split(' ')[0]}!</h2>
              <p className="text-muted text-lg mb-10">We've saved your spot in the global marketplace.</p>

              <div className="mb-12">
                <p className="text-muted uppercase tracking-widest text-xs font-bold mb-2">Your Waitlist Position</p>
                <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent mb-4">
                  #{displayPosition.toLocaleString()}
                </div>
                <div className="max-w-xs mx-auto">
                  <div className="flex justify-between text-xs text-muted mb-2 font-bold">
                    <span>PROGRESS</span>
                    <span>AHEAD OF 84%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '84%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[2rem] border-primary/20">
                <h3 className="text-xl font-bold mb-4">Move up the list!</h3>
                <p className="text-muted mb-6 text-sm">
                  Share Vero with your network. For every friend who joins, 
                  you'll move up <span className="text-white font-bold">50 spots</span>.
                </p>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <input
                      readOnly
                      value={referralLink}
                      className="w-full bg-background border border-border rounded-2xl p-4 pr-12 text-sm text-muted outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                  
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={shareOnWhatsApp}
                      className="flex-1 md:flex-none p-4 bg-[#25D366] text-white rounded-2xl hover:scale-105 transition-transform flex items-center justify-center"
                    >
                      <MessageCircle size={24} />
                    </button>
                    <button className="flex-1 md:flex-none p-4 bg-[#1DA1F2] text-white rounded-2xl hover:scale-105 transition-transform flex items-center justify-center">
                      <Share2 size={24} />
                    </button>
                    <button className="flex-1 md:flex-none p-4 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-2xl hover:scale-105 transition-transform flex items-center justify-center">
                      <Globe size={24} />
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-xs text-muted">
                We'll email you at <span className="text-white">{data.email}</span> when your access is ready.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostSignupModal;
