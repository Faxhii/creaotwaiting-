import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Star, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface RoleSelectorProps {
  selectedRole: 'brand' | 'creator' | null;
  onSelect: (role: 'brand' | 'creator') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto mb-8">
      {/* Brand Card */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('brand')}
        className={cn(
          "relative flex flex-col items-start p-6 rounded-3xl border-2 transition-all duration-300 text-left",
          selectedRole === 'brand'
            ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(124,111,255,0.2)]"
            : "bg-card border-border hover:border-primary/30"
        )}
      >
        <div className="flex justify-between w-full mb-4">
          <div className={cn(
            "p-3 rounded-2xl",
            selectedRole === 'brand' ? "bg-primary text-white" : "bg-white/5 text-muted"
          )}>
            <Briefcase size={24} />
          </div>
          {selectedRole === 'brand' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-primary text-white rounded-full p-1"
            >
              <Check size={16} />
            </motion.div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-1">I'm a Brand</h3>
        <p className="text-sm text-muted">Find creators who drive real sales</p>
      </motion.button>

      {/* Creator Card */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect('creator')}
        className={cn(
          "relative flex flex-col items-start p-6 rounded-3xl border-2 transition-all duration-300 text-left",
          selectedRole === 'creator'
            ? "bg-accent/10 border-accent shadow-[0_0_20px_rgba(233,69,96,0.2)]"
            : "bg-card border-border hover:border-accent/30"
        )}
      >
        <div className="flex justify-between w-full mb-4">
          <div className={cn(
            "p-3 rounded-2xl",
            selectedRole === 'creator' ? "bg-accent text-white" : "bg-white/5 text-muted"
          )}>
            <Star size={24} />
          </div>
          {selectedRole === 'creator' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-accent text-white rounded-full p-1"
            >
              <Check size={16} />
            </motion.div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-1">I'm a Creator</h3>
        <p className="text-sm text-muted">Get paid by global brands</p>
      </motion.button>
    </div>
  );
};

export default RoleSelector;
