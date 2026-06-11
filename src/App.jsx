import { useEffect, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Residences from './components/Residences';
import Gallery from './components/Gallery';
import Features from './components/Features';
import Inclusions from './components/Inclusions';
import Location from './components/Location';
import Team from './components/Team';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import RegisterPopup from './components/RegisterPopup';
import InfoPage from './components/InfoPage';

function App() {
  const { scrollYProgress } = useScroll();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavClick = () => {
    setCurrentPage('home');
  };

  return (
    <>
      <CustomCursor />
      
      <motion.div 
        className="scroll-progress" 
        style={{ scaleX: scrollYProgress, transformOrigin: "0%", width: "100%" }}
        aria-hidden="true" 
      />

      <Navigation onRegisterClick={() => setIsPopupOpen(true)} onHomeClick={handleNavClick} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero scrollYProgress={scrollYProgress} onRegisterClick={() => setIsPopupOpen(true)} />
            <Vision />
            <Residences />
            <Inclusions />
            <Features />
            <Gallery />
            <Location />
            <Team />
          </>
        ) : (
          <InfoPage type={currentPage} onClose={() => setCurrentPage('home')} />
        )}
      </main>

      <Footer onPageChange={setCurrentPage} />
      
      <FloatingCTA onClick={() => setIsPopupOpen(true)} />
      
      <RegisterPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

function FloatingCTA({ onClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.button 
      onClick={onClick}
      className={`floating-cta ${visible ? 'visible' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        borderRadius: '40px',
        backgroundColor: 'var(--color-bg-dark)',
        color: '#ffffff',
        fontFamily: 'var(--font-body)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        fontSize: '12px',
        fontWeight: '700',
        border: '1px solid var(--color-accent)',
        cursor: 'pointer',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s ease'
      }}
    >
      Register Interest
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </motion.button>
  );
}

export default App;
