import { motion } from 'motion/react';
import styles from './Footer.module.css';

export default function Footer({ onPageChange }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__grid}>
          
          <div className={styles.footer__brand}>
            <h2 className={styles['footer__brand-name']}>1Stonehaven</h2>
            <p className={styles['footer__brand-sub']}>By Birch and Stone</p>
            <div className={styles.footer__socials}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.footer__social} data-cursor="social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.footer__social} data-cursor="social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          
          <div className={styles.footer__nav}>
            <a href="#vision" className={styles['footer__nav-link']}>The Vision</a>
            <a href="#residences" className={styles['footer__nav-link']}>Residences</a>
            <a href="#gallery" className={styles['footer__nav-link']}>Gallery</a>
            <a href="#location" className={styles['footer__nav-link']}>Location</a>
            <a href="#team" className={styles['footer__nav-link']}>Team</a>
            <a href="#register" className={styles['footer__nav-link']}>Register Interest</a>
          </div>

          <div className={styles.footer__agents}>
            <h3 className={styles.footer__agentsTitle}>Selling Agents</h3>
            <div className={styles.footer__agency}>RT Edgar</div>
            <div className={styles.footer__agent}>
              <p className={styles.footer__agentName}>Mark Wridgway</p>
              <div className={styles.footer__agentContacts}>
                <a href="tel:+61419510777" className={styles.footer__agentContact}>0419 510 777</a>
                <span className={styles.footer__agentDivider}>|</span>
                <a href="mailto:markw@rtedgar.com" className={styles.footer__agentContact}>markw@rtedgar.com</a>
              </div>
            </div>
            <div className={styles.footer__agent}>
              <p className={styles.footer__agentName}>Alex Jones</p>
              <div className={styles.footer__agentContacts}>
                <a href="tel:+61429880617" className={styles.footer__agentContact}>0429 880 617</a>
                <span className={styles.footer__agentDivider}>|</span>
                <a href="mailto:ajones@rtedgar.com.au" className={styles.footer__agentContact}>ajones@rtedgar.com.au</a>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottomLeft}>
            <p className={styles.footer__disclaimer}>
              &copy; {new Date().getFullYear()} Birch and Stone. All rights reserved. Images are architectural renders and are indicative only. Subject to planning approval.
            </p>
            <div className={styles.footer__bottomLinks}>
              <button onClick={() => onPageChange?.('privacy')} className={styles.footer__bottomLink}>Privacy Policy</button>
              <span className={styles.footer__bottomDivider}>|</span>
              <button onClick={() => onPageChange?.('disclaimer')} className={styles.footer__bottomLink}>Disclaimer</button>
            </div>
          </div>
          <motion.a 
            href="#hero" 
            className={styles['footer__back-to-top']} 
            aria-label="Back to top"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
