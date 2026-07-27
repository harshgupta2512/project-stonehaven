import { motion } from 'motion/react';
import styles from './Team.module.css';

export default function Team() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="team" className={styles.team}>
      <div className="container">
        <motion.div 
          className={styles.team__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label section-label--centered">The Team</span>
          <h2 className="section-heading section-heading--dark" style={{ textAlign: "center" }}>Assembled with Intent</h2>
          <p className="section-body" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            Specialist firms, each leaders in their discipline, united by a shared commitment to craft and quality.
          </p>
        </motion.div>

        <motion.div 
          className={styles.team__grid}
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* 1. Birch & Stone */}
          <motion.div className={styles.team__card} variants={itemVars} whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
            <div className={styles.team__logoWrap}>
              <img src="images/birch_stone_logo.svg" alt="Birch and Stone Developments" className={styles.team__logo} />
            </div>
            <span className={styles.team__role}>Developer</span>
            <h3 className={styles.team__firm}>Birch and Stone</h3>
            <p className={styles.team__desc}>
              Boutique developer behind Stonehaven — bringing together the best collaborators to deliver residences of enduring quality.
            </p>
          </motion.div>

          {/* 2. R.T. Edgar */}
          <motion.div className={styles.team__card} variants={itemVars} whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
            <div className={styles.team__logoWrap}>
              <img src="images/rtedgar_logo_cropped.png" alt="RT Edgar" className={styles.team__logo} />
            </div>
            <span className={styles.team__role}>Real Estate</span>
            <h3 className={styles.team__firm}>R.T. Edgar</h3>
            <p className={styles.team__desc}>
              Appointed sales agency representing Stonehaven, renowned for marketing Melbourne's most premium residential properties.
            </p>
          </motion.div>

          {/* 3. Wardle Design */}
          <motion.div className={styles.team__card} variants={itemVars} whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
            <div className={styles.team__logoWrap}>
              <img src="images/wardle_logo.png" alt="Wardle Design" className={styles.team__logo} />
            </div>
            <span className={styles.team__role}>Architect</span>
            <h3 className={styles.team__firm}>Wardle Design</h3>
            <p className={styles.team__desc}>
              Lead architects responsible for the planning and design of the Stonehaven Residences project.
            </p>
          </motion.div>

          {/* 4. Carlton Homes */}
          <motion.div className={styles.team__card} variants={itemVars} whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
            <div className={styles.team__logoWrap}>
              <img src="images/carlton_logo.png" alt="Carlton Homes" className={styles.team__logo} />
            </div>
            <span className={styles.team__role}>Builder</span>
            <h3 className={styles.team__firm}>Carlton Homes</h3>
            <p className={styles.team__desc}>
              A premium luxury home builder appointed to execute the architectural vision of Stonehaven to the absolute highest standard.
            </p>
          </motion.div>

          {/* 5. Two Style */}
          <motion.div className={styles.team__card} variants={itemVars} whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
            <div className={styles.team__logoWrap}>
              <img src="images/twostyle_logo.png" alt="Two Style" className={styles.team__logo} />
            </div>
            <span className={styles.team__role}>Interiors</span>
            <h3 className={styles.team__firm}>Two Style</h3>
            <p className={styles.team__desc}>
              Interior design studio delivering bespoke spaces that balance sophistication with liveability and warmth.
            </p>
          </motion.div>

          {/* 6. ALD Landscape */}
          <motion.div className={styles.team__card} variants={itemVars} whileHover={{ y: -8, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
            <div className={styles.team__logoWrap}>
              <img src="images/ald_logo.png" alt="ALD Landscape" className={styles.team__logo} />
            </div>
            <span className={styles.team__role}>Landscape</span>
            <h3 className={styles.team__firm}>ALD Landscape</h3>
            <p className={styles.team__desc}>
              Landscape architects creating outdoor spaces that effortlessly complement the architecture and honour the site's natural character.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
