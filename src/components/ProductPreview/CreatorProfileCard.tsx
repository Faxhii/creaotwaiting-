import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CreatorProfileCardProps {
  name: string;
  niche: string;
  followers: string;
  score: number;
  conversion: string;
  revenue: string;
  roi: string;
  deals: string;
  isRed?: boolean;
  className?: string;
}

const CreatorProfileCard: React.FC<CreatorProfileCardProps> = ({
  name, niche, followers, score, conversion, revenue, roi, deals, isRed, className
}) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  const ringColor = isRed ? "#EF4444" : "#10B981";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative w-full max-w-[380px] bg-card rounded-[2rem] p-8 border border-border shadow-2xl overflow-hidden",
        !isRed && "border-primary/20 shadow-primary/5",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-white">
          {initials}
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">{name}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted border border-white/10">{niche}</span>
            <span className="text-[10px] text-muted">{followers} followers</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted">Creator Score</span>
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/5" />
              <motion.circle
                cx="20" cy="20" r="18" fill="none" stroke={ringColor} strokeWidth="3"
                strokeDasharray="113"
                initial={{ strokeDashoffset: 113 }}
                whileInView={{ strokeDashoffset: 113 - (113 * score) / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-[10px] font-bold" style={{ color: ringColor }}>{score}</span>
          </div>
        </div>

        {[
          { label: "Avg Conversion Rate", value: conversion, color: isRed ? "text-red-500" : "text-green-500" },
          { label: "Revenue Generated", value: revenue, color: "text-primary" },
          { label: "Avg ROI Delivered", value: roi, color: isRed ? "text-red-500" : "text-accent", bold: true },
          { label: "Campaigns Completed", value: deals, color: "text-white" },
        ].map((stat, i) => (
          <div key={i} className="flex justify-between items-center py-1">
            <span className="text-xs text-muted">{stat.label}</span>
            <span className={cn("text-xs font-semibold", stat.color, stat.bold && "font-black")}>{stat.value}</span>
          </div>
        ))}
      </div>

      {!isRed && (
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider">
          <Check size={12} strokeWidth={3} /> Verified by Vero
        </div>
      )}
    </motion.div>
  );
};

export default CreatorProfileCard;
