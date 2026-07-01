import { motion } from 'motion/react';
import styles from './Residences.module.css';

export default function Residences() {
  const fadeUpVars = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="residences" className={styles.residences}>
      
      {/* Scene 1: Full-bleed — Kitchen 1 */}
      <div className={styles['scene--full']}>
        <div className={styles['scene--full__bg']} style={{ backgroundImage: "url('images/1A kitchen_V3_1.webp')" }}></div>
        <div className={styles['scene--full__overlay']}></div>
        <motion.div 
          className={styles['scene--full__content']}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVars}
        >
          <span className="section-label section-label--light">Residence 1</span>
          <h2 className={styles['scene--full__heading']}>Designed for<br/>Gathering</h2>
          <p className={styles['scene--full__body']}>
            Designer kitchen with island bench, stone benchtops throughout, quality appliances and integrated cabinetry — every surface invites touch, every detail rewards attention.
          </p>
        </motion.div>
      </div>

      {/* Scene 2: Inset — Living & Dining 1 */}
      <div className={`${styles['scene--inset']} ${styles['scene--inset-light']}`}>
        <div className="container">
          <div className={styles['scene--inset__grid']}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVars}
            >
              <img src="images/1A_Living & dining_V3_1.webp" alt="Residence 1 Living and Dining" className={styles['scene--inset__image']} loading="lazy" />
            </motion.div>
            
            <motion.div 
              className={styles['scene--inset__text']}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <span className="section-label">Living & Dining</span>
              <h2 className="section-heading section-heading--dark">Light-Filled<br/>Living</h2>
              <p className="section-body">
                Light-filled open-plan living and dining with seamless indoor-outdoor flow. Floor-to-ceiling glazing draws the garden inward, while natural tones and brushed brass highlights create warmth and rhythm.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scene 3: Full-bleed — Kitchen 1A */}
      <div className={styles['scene--full']}>
        <div className={styles['scene--full__bg']} style={{ backgroundImage: "url('images/1B kitchen_V2_1.webp')" }}></div>
        <div className={styles['scene--full__overlay']}></div>
        <motion.div 
          className={styles['scene--full__content']}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVars}
        >
          <span className="section-label section-label--light">Residence 1A</span>
          <h2 className={styles['scene--full__heading']}>Bold<br/>Expression</h2>
          <p className="section-body--inverse">
            Rich oak, darker tone accents and brushed gunmetal detailing — a more dramatic expression that creates spaces of quiet confidence and refined edge.
          </p>
        </motion.div>
      </div>

      {/* Scene 4: Inset — Living & Dining 1A (reversed) */}
      <div className={`${styles['scene--inset']} ${styles['scene--inset-light']} ${styles['scene--inset-reverse']}`}>
        <div className="container">
          <div className={styles['scene--inset__grid']}>
            <motion.div 
              className={styles['scene--inset__text']}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVars}
            >
              <span className="section-label">Architecture</span>
              <h2 className="section-heading section-heading--dark">Two Residences,<br/>Two Identities</h2>
              <p className="section-body">
                Residence 1 speaks in warm timber and brushed brass. Residence 1A answers in rich oak and gunmetal. Each is distinct, yet together they form a composed streetscape.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <img src="images/1B_Living & dining_V2_1.webp" alt="Residence 1A Living and Dining" className={styles['scene--inset__image']} loading="lazy" />
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
