import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Navigation.module.css';

export default function Navigation({ onRegisterClick, onHomeClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileNav = () => {
    setMobileOpen(!mobileOpen);
    document.body.classList.toggle('nav-open', !mobileOpen);
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
    document.body.classList.remove('nav-open');
  };

  const handleMobileLinkClick = () => {
    closeMobileNav();
    if (onHomeClick) onHomeClick();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (onRegisterClick) onRegisterClick();
    closeMobileNav();
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles['nav-scrolled'] : ''}`} id="main-nav">
        <div className={`${styles.nav__inner} container`}>
          <a href="#hero" className={styles.nav__logo} onClick={onHomeClick}>1Stonehaven</a>

          <div className={styles.nav__links} id="nav-links">
            <NavAnchor href="#vision" onClick={onHomeClick}>The Vision</NavAnchor>
            <NavAnchor href="#residences" onClick={onHomeClick}>Residences</NavAnchor>
            <NavAnchor href="#gallery" onClick={onHomeClick}>Gallery</NavAnchor>
            <NavAnchor href="#location" onClick={onHomeClick}>Location</NavAnchor>
            <NavAnchor href="#team" onClick={onHomeClick}>Team</NavAnchor>
          </div>

          <motion.button 
            onClick={handleRegister}
            className={styles.nav__cta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Interest
          </motion.button>

          <button 
            className={`${styles.nav__hamburger} ${mobileOpen ? styles.active : ''}`} 
            onClick={toggleMobileNav}
            aria-label="Toggle navigation menu"
          >
            <span className={styles['nav__hamburger-line']}></span>
            <span className={styles['nav__hamburger-line']}></span>
            <span className={styles['nav__hamburger-line']}></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu using AnimatePresence for smooth open/close */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            className={`${styles['mobile-menu']} ${styles.open}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <a href="#vision" className={styles['mobile-menu__link']} onClick={handleMobileLinkClick}>The Vision</a>
            <a href="#residences" className={styles['mobile-menu__link']} onClick={handleMobileLinkClick}>Residences</a>
            <a href="#gallery" className={styles['mobile-menu__link']} onClick={handleMobileLinkClick}>Gallery</a>
            <a href="#location" className={styles['mobile-menu__link']} onClick={handleMobileLinkClick}>Location</a>
            <a href="#team" className={styles['mobile-menu__link']} onClick={handleMobileLinkClick}>Team</a>
            <button className={`${styles['mobile-menu__link']} ${styles['mobile-menu__cta']}`} onClick={handleRegister} style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer', padding: 0 }}>Register Interest</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Magnetic-feel anchor component for desktop nav
function NavAnchor({ href, children, onClick }) {
  return (
    <motion.a 
      href={href} 
      className={styles.nav__link}
      onClick={onClick}
      whileHover={{ scale: 1.1, color: "var(--color-text-inverse)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}
