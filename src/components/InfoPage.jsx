import { useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './InfoPage.module.css';

export default function InfoPage({ type, onClose }) {
  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const isPrivacy = type === 'privacy';

  return (
    <div className={styles.infoPage}>
      <div className="container">
        <div className={styles.infoPage__header}>
          <button onClick={onClose} className={styles.infoPage__back} data-cursor="back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Home
          </button>
        </div>

        <motion.article 
          className={styles.infoPage__content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {isPrivacy ? (
            <>
              <h1 className={styles.infoPage__title}>Privacy Policy</h1>
              <p className={styles.infoPage__date}>Last Updated: June 2026</p>

              <section className={styles.infoPage__section}>
                <h2>1. Introduction</h2>
                <p>
                  Birch and Stone (referred to as "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tells you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>2. The Data We Collect About You</h2>
                <p>
                  Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
                </p>
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which you provide when registering your interest on our website:
                </p>
                <ul>
                  <li><strong>Identity Data</strong> includes first name, last name, or similar identifier.</li>
                  <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                  <li><strong>Profile Data</strong> includes your preferences (e.g. buyer type, residence preference) and feedback.</li>
                </ul>
              </section>

              <section className={styles.infoPage__section}>
                <h2>3. How We Use Your Personal Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to:
                </p>
                <ul>
                  <li>Provide information to you regarding Stonehaven and future Birch and Stone developments.</li>
                  <li>Enable our selling agents, <strong>RT Edgar</strong>, to contact you regarding availability and specifications of the residences.</li>
                  <li>Improve our marketing and website user experience.</li>
                </ul>
              </section>

              <section className={styles.infoPage__section}>
                <h2>4. Sharing Your Personal Data</h2>
                <p>
                  We do not sell your personal data. We may share your contact details with <strong>RT Edgar</strong>, our appointed project marketing partners, and contractors who assist us in delivering our services. All third parties are required to respect the security of your personal data and to treat it in accordance with the law.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>5. Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>6. Your Legal Rights</h2>
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of your personal data. If you wish to exercise any of these rights, please contact us.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>7. Contact Details</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <p className={styles.infoPage__contact}>
                  <strong>Email:</strong> <a href="mailto:info@1stonehaven.com.au">info@1stonehaven.com.au</a>
                </p>
              </section>
            </>
          ) : (
            <>
              <h1 className={styles.infoPage__title}>Disclaimer</h1>
              <p className={styles.infoPage__date}>Last Updated: June 2026</p>

              <section className={styles.infoPage__section}>
                <h2>1. General Information</h2>
                <p>
                  The information contained on this website is for general information purposes only. The information is provided by Birch and Stone and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>2. Artistic Impressions and Renders</h2>
                <p>
                  All architectural drawings, renders, models, diagrams, maps and photographs on this website are artistic impressions only. Finishes, fixtures, furnishings, landscaping and colors are illustrative and subject to change without notice. Views and surrounds are indicative only and may vary.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>3. Contract of Sale</h2>
                <p>
                  The information on this website does not constitute an offer, inducement, representation, warranty or contract of sale. The exact specifications, inclusions, dimensions, layouts, and pricing for any residence will be detailed solely in the formal Contract of Sale. Buyers must rely on their own enquiries and the terms of the Contract of Sale.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>4. Subject to Planning Approval</h2>
                <p>
                  Development plans, designs, and permits are subject to planning approval and modification by relevant authorities. Dimensions, areas, and boundaries are approximate and subject to survey.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>5. Real Estate Agent Details</h2>
                <p>
                  The appointed sales agency for Stonehaven is <strong>RT Edgar</strong>. Any representations or negotiations made by the selling agents are subject to the terms of the Contract of Sale.
                </p>
              </section>

              <section className={styles.infoPage__section}>
                <h2>6. Legal and Financial Advice</h2>
                <p>
                  We recommend that all prospective purchasers obtain independent legal, financial, and taxation advice before entering into a Contract of Sale.
                </p>
              </section>
            </>
          )}
        </motion.article>
      </div>
    </div>
  );
}
