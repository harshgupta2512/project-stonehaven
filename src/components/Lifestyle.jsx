import { motion } from 'motion/react';
import styles from './Lifestyle.module.css';

const LIFESTYLE_IMAGES = [
  { url: 'images/lifestyle/A071V_HedgleyDene_019.jpg', alt: 'Hedgeley Dene', type: 'large' },
  { url: 'images/lifestyle/198_Wattletree_Lifestyles038.jpg', alt: 'Wattletree Lifestyles', type: 'normal' },
  { url: 'images/lifestyle/MalvernValley_156.jpg', alt: 'Malvern Valley', type: 'normal' },
  { url: 'images/lifestyle/MalvernVillageLifestyles_027.jpg', alt: 'Malvern Village', type: 'normal' },
  { url: 'images/lifestyle/198_Wattletree_Lifestyles067.jpg', alt: 'Cafe culture', type: 'normal' },
];

export default function Lifestyle() {
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="lifestyle" className={styles.lifestyle}>
      <motion.div 
        className={styles.lifestyle__header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-label section-label--centered">The Locale</span>
        <h2 className="section-heading section-heading--light" style={{ textAlign: "center" }}>A Life Well Lived</h2>
      </motion.div>

      <motion.div 
        className={styles.lifestyle__grid}
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {LIFESTYLE_IMAGES.map((img, i) => {
          let extraClass = '';
          if (img.type === 'large') extraClass = styles['lifestyle__item--large'];
          if (img.type === 'tall') extraClass = styles['lifestyle__item--tall'];

          return (
            <motion.div 
              key={i} 
              className={`${styles.lifestyle__item} ${extraClass}`}
              variants={itemVars}
            >
              <img src={img.url} alt={img.alt} className={styles.lifestyle__image} loading="lazy" />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
