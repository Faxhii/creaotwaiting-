import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Key, Handshake } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Join the waitlist",
      description: "Pick your role and claim your founding member spot in 30 seconds.",
      icon: <ClipboardCheck className="w-8 h-8" />,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Get early access",
      description: "We onboard in order of signup. You'll get an email when your access is ready.",
      icon: <Key className="w-8 h-8" />,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      title: "Close real deals",
      description: "Brands find you by results. Creators get paid for performance. Everyone wins.",
      icon: <Handshake className="w-8 h-8" />,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">How it works</h2>
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-border -translate-y-12 z-0" />
        
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className={`w-24 h-24 ${step.bg} ${step.color} rounded-3xl flex items-center justify-center mb-6 shadow-xl`}>
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
