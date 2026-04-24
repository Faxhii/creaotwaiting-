import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import SocialProof from './components/SocialProof';
import BenefitsSection from './components/BenefitsSection';
import HowItWorks from './components/HowItWorks';
import UrgencySection from './components/UrgencySection';
import FAQSection from './components/FAQSection';
import LiveToast from './components/LiveToast';
import PostSignupModal from './components/PostSignupModal';
import { useWaitlist } from './hooks/useWaitlist';
import { Globe, Share2, MessageCircle } from 'lucide-react';

function App() {
  const { loading, totalCount, joinWaitlist } = useWaitlist();
  const [signupData, setSignupData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'brand' | 'creator' | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSignup = async (data: { email: string; name: string; role: string }) => {
    const result = await joinWaitlist(data);
    setSignupData(result);
    setIsModalOpen(true);
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-primary">
      <ParticleBackground />
      <LiveToast />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-panel border-x-0 border-t-0">
        <div className="flex items-center gap-2" onClick={scrollToHero} style={{ cursor: 'pointer' }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
            V
          </div>
          <span className="text-2xl font-black tracking-tighter hidden sm:block">Vero</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-green-500">{totalCount.toLocaleString()} ON WAITLIST</span>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection 
          onSignup={handleSignup} 
          loading={loading} 
          selectedRole={selectedRole}
          onRoleSelect={setSelectedRole}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SocialProof />
          <BenefitsSection role={selectedRole} />
          <HowItWorks />
          <UrgencySection onCTAClick={scrollToHero} />
          <FAQSection />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black">V</div>
              <span className="text-2xl font-black">Vero</span>
            </div>
            <p className="text-muted max-w-sm mb-8 text-lg">
              Real creators. Real results. The future of influencer marketing is ROI-driven.
            </p>
            <div className="flex gap-6">
              <InstagramIcon className="text-muted hover:text-white cursor-pointer transition-colors" />
              <TwitterIcon className="text-muted hover:text-white cursor-pointer transition-colors" />
              <LinkedinIcon className="text-muted hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-4 text-sm text-muted">
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <p>© 2025 Vero. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <PostSignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={signupData} 
      />
    </div>
  );
}


const InstagramIcon = (props: any) => <Globe {...props} />;
const TwitterIcon = (props: any) => <Share2 {...props} />;
const LinkedinIcon = (props: any) => <MessageCircle {...props} />;

export default App;
