import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Register.module.css';

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      await fetch('https://connect.pabbly.com/webhook-listener/webhook/IjU3NjIwNTY4MDYzZTA0MzI1MjY1NTUzNyI_3D_pc/IjU3NjcwNTZlMDYzZjA0MzA1MjZiNTUzYzUxMzYi_pc', {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.error('Error submitting to webhook:', error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const fadeUpVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="register" className={styles.register}>
      <div className="container">
        <div className={styles.register__grid}>
          
          <motion.div 
            className={styles.register__text}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpVars}
          >
            <h2 className="section-heading section-heading--light">Register<br/>Interest</h2>
            <p className="section-body section-body--inverse">
              1Stonehaven is a limited offering of just two bespoke residences. Register your details below to receive project updates, floor plans, and early purchasing opportunities.
            </p>
          </motion.div>

          <motion.div 
            className={styles['register__form-wrap']}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.6 } }
            }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  className={styles.register__form} 
                  id="interest-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles['form-group']}>
                    <label htmlFor="fname" className={styles['form-label']}>First Name *</label>
                    <input type="text" id="fname" name="firstName" className={styles['form-input']} required />
                  </div>
                  <div className={styles['form-group']}>
                    <label htmlFor="lname" className={styles['form-label']}>Last Name *</label>
                    <input type="text" id="lname" name="lastName" className={styles['form-input']} required />
                  </div>
                  
                  <div className={`${styles['form-group']} ${styles['form-group--full']}`}>
                    <label htmlFor="email" className={styles['form-label']}>Email Address *</label>
                    <input type="email" id="email" name="email" className={styles['form-input']} required />
                  </div>
                  
                  <div className={`${styles['form-group']} ${styles['form-group--full']}`}>
                    <label htmlFor="phone" className={styles['form-label']}>Phone Number *</label>
                    <input type="tel" id="phone" name="phone" className={styles['form-input']} required />
                  </div>
                  
                  <div className={`${styles['form-group']} ${styles['form-group--full']}`}>
                    <label htmlFor="type" className={styles['form-label']}>Buyer Type</label>
                    <select id="type" name="buyerType" className={styles['form-select']}>
                      <option value="" disabled defaultValue>Select an option</option>
                      <option value="owner">Owner Occupier</option>
                      <option value="investor">Investor</option>
                    </select>
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    className={styles['form-submit']}
                    whileHover={{ scale: 1.02, backgroundColor: "var(--color-accent-light)" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? 'Submitting...' : 'Submit Details'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  className={styles.form__success} 
                  id="form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <svg className={styles['form__success-icon']} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h3>Thank you for your interest</h3>
                  <p>We have received your details and will be in touch shortly with more information about 1Stonehaven.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
