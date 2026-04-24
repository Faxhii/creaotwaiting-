import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { BRAND_BENEFITS, CREATOR_BENEFITS } from '../constants/data';

interface BenefitsSectionProps {
  role: 'brand' | 'creator' | null;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ role }) => {
  const showBrand = !role || role === 'brand';
  const showCreator = !role || role === 'creator';

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <AnimatePresence mode="popLayout">
          {showBrand && (
            <motion.div
              key="brand-benefits"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-panel p-10 md:p-12 rounded-[3rem]"
            >
              <h2 className="text-3xl font-black mb-2 text-white">What founding brands unlock</h2>
              <p className="text-muted text-sm mb-10 font-medium">These benefits close when 500 founding slots fill.</p>
              
              <ul className="space-y-8">
                {BRAND_BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-5"
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <CheckCircle2 size={16} strokeWidth={3} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white leading-tight mb-1">{benefit.text}</div>
                      <div className="text-xs text-muted font-medium leading-relaxed">{benefit.sub}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {showCreator && (
            <motion.div
              key="creator-benefits"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, x: 50 }}
              className="glass-panel p-10 md:p-12 rounded-[3rem]"
            >
              <h2 className="text-3xl font-black mb-2 text-white">What founding creators unlock</h2>
              <p className="text-muted text-sm mb-10 font-medium">Shape Vero before anyone else.</p>
              
              <ul className="space-y-8">
                {CREATOR_BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-5"
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <CheckCircle2 size={16} strokeWidth={3} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white leading-tight mb-1">{benefit.text}</div>
                      <div className="text-xs text-muted font-medium leading-relaxed">{benefit.sub}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BenefitsSection;
