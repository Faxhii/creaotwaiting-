import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, lastUpdated, children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#0A0A0F] text-white py-20 px-6"
    >
      <div className="max-w-[720px] mx-auto">
        {/* Header */}
        <header className="mb-16">
          <Link to="/" className="flex items-center gap-2 mb-10 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black">V</div>
            <span className="text-xl font-black">Vero</span>
          </Link>
          
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-white transition-colors mb-8 text-sm font-bold">
            <ArrowLeft size={16} /> Back to Waitlist
          </Link>

          <h1 className="text-3xl md:text-5xl font-black mb-4">{title}</h1>
          <p className="text-sm text-muted">Last updated: {lastUpdated}</p>
        </header>

        {/* Content */}
        <article className="prose prose-invert max-w-none">
          <div className="legal-content">
            {children}
          </div>
        </article>

        {/* Footer Link */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <Link to="/" className="text-primary hover:underline font-bold">← Back to Waitlist</Link>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#111118] border border-white/10 rounded-full flex items-center justify-center shadow-2xl hover:bg-primary transition-colors z-50"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .legal-content h2 {
          font-size: 20px;
          font-weight: 600;
          color: white;
          margin-top: 40px;
          margin-bottom: 16px;
        }
        .legal-content p {
          font-size: 15px;
          color: #94A3B8;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .legal-content p {
            line-height: 2;
          }
        }
        .legal-content a {
          color: #7C6FFF;
          text-decoration: none;
        }
        .legal-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </motion.div>
  );
};

export default LegalLayout;
