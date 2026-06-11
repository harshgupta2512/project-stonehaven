import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './FloorPlans.module.css';

export default function FloorPlans({ onRegisterClick }) {
  const [activeTab, setActiveTab] = useState('ground');

  const fadeUpVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="floorplans" className={styles['floor-plans']}>
      <div className="container">
        <motion.div 
          className={styles['floor-plans__header']}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVars}
        >
          <span className="section-label section-label--centered">Floor Plans</span>
          <h2 className="section-heading section-heading--dark" style={{ textAlign: "center" }}>Considered Layout</h2>
        </motion.div>

        <motion.div 
          className={styles['floor-plans__tabs']}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.6 } }
          }}
        >
          <button 
            className={`${styles['floor-plans__tab']} ${activeTab === 'ground' ? styles.active : ''}`} 
            onClick={() => setActiveTab('ground')}
          >
            Ground Floor
          </button>
          <button 
            className={`${styles['floor-plans__tab']} ${activeTab === 'first' ? styles.active : ''}`} 
            onClick={() => setActiveTab('first')}
          >
            First Floor
          </button>
        </motion.div>

        <motion.div 
          className={styles['floor-plans__viewer']}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.6 } }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles['floor-plans__placeholder']}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  {activeTab === 'ground' ? (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12"/>
                      <line x1="12" y1="3" x2="12" y2="21"/>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="9" y1="3" x2="9" y2="21"/>
                    </>
                  )}
                </svg>
                <p className={styles['floor-plans__placeholder-text']}>
                  {activeTab === 'ground' ? 'Ground Floor plans are being finalised' : 'First Floor plans are being finalised'}
                </p>
                <p className="section-body" style={{ fontSize: "13px", textAlign: "center", marginTop: "var(--space-xs)" }}>
                  Register your interest to receive plans as they become available
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          style={{ textAlign: "center", marginTop: "var(--space-lg)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <motion.button 
            onClick={onRegisterClick}
            className={styles['floor-plans__cta']}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Floor Plans
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
