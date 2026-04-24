import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Copy, Check, MessageCircle, Share2, X } from 'lucide-react';
import { cn } from '../lib/utils';

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
  const [displayPosition, setDisplayPosition] = useState(3000);

  useEffect(() => {
    if (isOpen && data) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7C6FFF', '#E94560', '#10B981', '#F8FAFC']
      });

      // Position countdown animation
      const startPos = 3000;
      const endPos = data.position;
      const duration = 2000;
      const stepTime = 16;
      const steps = duration / stepTime;
      const decrement = (startPos - endPos) / steps;
      
      let currentPos = startPos;
      const timer = setInterval(() => {
        currentPos -= decrement;
        if (currentPos <= endPos) {
          setDisplayPosition(endPos);
          clearInterval(timer);
        } else {
          setDisplayPosition(Math.floor(currentPos));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isOpen, data]);

  if (!data) return null;

  const referralLink = `https://vero.app/join?ref=${data.referralCode}`;
  
  const shareText = `I just got early access to Vero — the platform where brands pay creators for REAL results, not followers. Claim your founding member spot: ${referralLink}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 overflow-y-auto bg-background/90 backdrop-blur-xl">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-card border-t md:border border-border rounded-t-[3rem] md:rounded-[3rem] min-h-screen md:min-h-0 p-8 md:p-12 shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-muted hover:text-white transition-colors">
              <X size={24} />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="gold-pill mb-6 inline-block"
              >
                {data.role === 'brand' ? 'Founding Brand Member 💼' : 'Founding Creator Member ⭐'}
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight">Welcome to Vero, <br /> {data.name.split(' ')[0]}!</h2>

              <div className="mb-12">
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-muted mb-4">Your Waitlist Position</p>
                <div className="text-7xl md:text-9xl font-black text-gradient-purple-coral mb-6">
                  #{displayPosition.toLocaleString()}
                </div>
                
                <div className="max-w-xs mx-auto">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-muted uppercase tracking-widest">Progress</span>
                    <span className="text-primary uppercase tracking-widest">Ahead of 84%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '84%' }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[2.5rem] border-primary/20 mb-12">
                <h3 className="text-xl font-bold mb-4">Move up <span className="text-primary">50 spots</span> by sharing</h3>
                <p className="text-muted text-sm mb-8 leading-relaxed">
                  Refer your network. Every person who joins with your link moves you up the list.
                </p>

                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      readOnly
                      value={referralLink}
                      className="w-full bg-background border border-border rounded-2xl p-4 pr-12 text-sm text-muted outline-none focus:border-primary transition-all"
                    />
                    <button onClick={copyToClipboard} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors">
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                    {copied && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded-md font-bold">COPIED!</div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={shareOnWhatsApp}
                      className="h-14 bg-[#25D366] text-white rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 font-bold"
                    >
                      <MessageCircle size={20} /> Share on WhatsApp
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className="h-14 bg-white text-black rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 font-bold"
                    >
                      <Share2 size={20} /> Share on X
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-left max-w-sm mx-auto">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">What's next?</h4>
                {[
                  { text: `We'll email ${data.email} when your access is ready`, done: true },
                  { text: "Follow us on Instagram for launch updates", done: false },
                  { text: "Share your link to move up the waitlist", done: false },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", item.done ? "bg-green-500/20 text-green-500" : "bg-white/5 text-muted")}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className={cn("text-xs", item.done ? "text-white font-medium" : "text-muted")}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostSignupModal;
