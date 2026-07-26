import { motion } from 'motion/react';
import styles from './Vision.module.css';

export default function Vision() {
  const fadeUpVars = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="vision" className={styles.vision}>
      <div className="container">
        <div className={styles.vision__grid}>
          
          <motion.div 
            className={styles.vision__text}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVars}
          >
            <span className="section-label">The Vision</span>
            <h2 className="section-heading section-heading--dark">A rare debut in<br/>Melbourne's east</h2>
            <p className="section-body" style={{ marginBottom: "1.5rem" }}>
              Stonehaven, an exclusive release of two luxury residences at Stonehaven Avenue, Malvern East. Marking Birch and Stone's first project, this limited collection introduces a new vision for luxurious modern living in one of Melbourne's most established eastern suburbs.
            </p>
            <p className="section-body" style={{ marginBottom: "2rem" }}>
              From the street, Stonehaven Avenue presents a refined and memorable presence. Warm timber-look vertical detailing, stone-inspired textures, smooth rendered forms, broad glazing and softly curved elements create a facade that feels composed, elegant and enduring.
            </p>
            <blockquote className={styles.vision__philosophy}>
              "A design philosophy anchored in material-led architecture, crafted individuality, and enduring quality. Every detail is meticulously curated to redefine modern luxury."
            </blockquote>
          </motion.div>

          <motion.div 
            className={styles['vision__image-wrap']}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <video 
              src="Videos/hf_20260726_165140_a8ca2f7b-3b12-46e5-be1f-ae23711266a3.mp4" 
              className={styles.vision__video} 
              autoPlay 
              muted 
              loop 
              playsInline
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
