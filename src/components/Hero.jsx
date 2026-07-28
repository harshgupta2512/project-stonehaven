import { motion, useTransform } from 'motion/react';
import styles from './Hero.module.css';

export default function Hero({ scrollYProgress, onRegisterClick }) {
  // Parallax transform for the background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Stagger variants
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVars = {
    hidden: { clipPath: "inset(100% 0 0 0)", y: 20 },
    visible: { 
      clipPath: "inset(0 0 0 0)", 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="hero" className={styles.hero} style={{ position: "relative", overflow: "hidden" }}>
      <motion.div 
        className={styles.hero__bg}
        style={{ y: bgY }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="images/Stonehaven_Cam_1_Exterior.jpg"
          className={styles.hero__video}
        >
          <source src="Videos/hf_20260726_165140_a8ca2f7b-3b12-46e5-be1f-ae23711266a3.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      <div className={styles.hero__overlay}></div>
      
      <motion.div 
        className={styles.hero__content}
        variants={containerVars}
        initial="hidden"
        animate="visible"
      >
        <div className={styles['hero__title-wrap']} style={{ overflow: "hidden" }}>
          <motion.h1 className={styles.hero__title} variants={itemVars}>
            Stonehaven
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.p className={styles.hero__subtitle} variants={itemVars}>
            Two individual freestanding luxurious modern homes
          </motion.p>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.p className={styles.hero__byline} variants={itemVars}>
            By Birch and Stone
          </motion.p>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.button
            className={styles.hero__cta}
            variants={itemVars}
            onClick={onRegisterClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Interest
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.hero__scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className={styles['hero__scroll-text']}>Scroll</span>
        <span className={styles['hero__scroll-line']}></span>
      </motion.div>
    </section>
  );
}
