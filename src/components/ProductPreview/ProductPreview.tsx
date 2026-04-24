import React from 'react';
import { motion } from 'framer-motion';
import CreatorProfileCard from './CreatorProfileCard';
import CampaignResultCard from './CampaignResultCard';

const ProductPreview: React.FC = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Not followers. Not likes.
          <br />
          <span className="text-accent">This.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted max-w-2xl mx-auto"
        >
          Every creator on Vero is verified by real campaign performance data — not vanity metrics.
        </motion.p>
      </div>

      {/* Comparison Section */}
      <div className="mb-40">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative">
          <CreatorProfileCard
            name="Aisha K."
            niche="Fashion & Lifestyle"
            followers="42,000"
            score={87}
            conversion="4.2%"
            revenue="₹8,40,000"
            roi="340%"
            deals="23 verified deals"
          />
          
          <div className="flex flex-col items-center">
            <div className="text-2xl font-black text-muted opacity-30 my-8 lg:my-0 uppercase tracking-[1em]">vs</div>
          </div>

          <CreatorProfileCard
            name="Generic Creator"
            niche="General Content"
            followers="500,000"
            score={31}
            conversion="0.1%"
            revenue="₹12,000"
            roi="8%"
            deals="2 deals"
            isRed
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl font-bold leading-relaxed">
            On every other platform, brands pick the second creator.
            <br />
            <span className="text-accent">On Vero, the data speaks for itself.</span>
          </p>
        </motion.div>
      </div>

      {/* Campaign Result Section */}
      <div className="text-center mb-16">
        <h3 className="text-3xl font-bold mb-4">What a completed campaign looks like on Vero</h3>
      </div>
      
      <CampaignResultCard />

      <div className="mt-16 space-y-8">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-lg italic text-accent text-center"
        >
          "Your follower count doesn't define your worth here. Your results do."
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-lg text-white text-center font-medium"
        >
          This is the data you've always wanted before hiring a creator. Now you have it.
        </motion.p>
      </div>
    </section>
  );
};

export default ProductPreview;
