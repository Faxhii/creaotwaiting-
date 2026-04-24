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
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatePresence mode="popLayout">
          {showBrand && (
            <motion.div
              key="brand-benefits"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-panel p-10 rounded-[2.5rem]"
            >
              <h2 className="text-3xl font-bold mb-8">What founding brands get</h2>
              <ul className="space-y-6">
                {BRAND_BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg text-muted">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {showCreator && (
            <motion.div
              key="creator-benefits"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="glass-panel p-10 rounded-[2.5rem]"
            >
              <h2 className="text-3xl font-bold mb-8">What founding creators get</h2>
              <ul className="space-y-6">
                {CREATOR_BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg text-muted">{benefit}</span>
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
