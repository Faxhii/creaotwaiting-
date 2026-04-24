import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { CAMPAIGN_MOCK } from '../../constants/data';
import { cn } from '../../lib/utils';

const CampaignResultCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-lg mx-auto bg-card rounded-[2.5rem] p-8 md:p-12 border border-primary/20 shadow-2xl relative"
    >
      <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/5">
        <div>
          <h4 className="text-xl font-bold text-white mb-1">{CAMPAIGN_MOCK.name}</h4>
          <p className="text-sm text-muted">{CAMPAIGN_MOCK.platform}</p>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-widest">
          Completed ✓
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-10">
        {CAMPAIGN_MOCK.stats.map((stat, i) => (
          <StatItem key={i} stat={stat} />
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-muted font-medium uppercase tracking-widest">
        <span>Verified by Vero tracking ✓</span>
        <div className="group relative cursor-help underline decoration-dotted">
          How?
          <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-black border border-border rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[10px] normal-case tracking-normal">
            Tracked via unique affiliate link + discount code + UTM parameters. Tamper-proof.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatItem = ({ stat }: { stat: any }) => {
  const count = useCountUp(stat.value);
  
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-muted uppercase tracking-widest mb-1">{stat.label}</span>
      <div className={cn(
        "text-2xl font-bold",
        stat.color === 'white' && "text-white",
        stat.color === 'green' && "text-green-500",
        stat.color === 'purple' && "text-primary",
        stat.color === 'accent' && "text-accent",
        stat.large && "text-4xl md:text-5xl font-black"
      )}>
        {stat.prefix}{stat.value % 1 !== 0 ? stat.value.toFixed(1) : count.toLocaleString()}{stat.suffix}
      </div>
    </div>
  );
};

export default CampaignResultCard;
