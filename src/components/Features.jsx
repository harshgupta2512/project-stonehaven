import { motion } from 'motion/react';
import styles from './Features.module.css';

export default function Features() {
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const features = [
    {
      num: "01",
      title: "Architectural Independence",
      sub: "No Body Corporate",
      desc: "Live with complete autonomy. Stonehaven features just two boutique residences, each possessing its own distinct identity. Torrens Title ensures no body corporate fees and no shared walls."
    },
    {
      num: "02",
      title: "Turn-Key Package",
      sub: "Full Turnkey Fixed Price",
      desc: "A fixed-price turnkey delivery. From premium landscaping, secure fencing, and concrete driveways to luxury interior finishes — move in with absolute peace of mind."
    },
    {
      num: "03",
      title: "Premium Inclusions",
      sub: "High-End Specifications",
      desc: "Designer kitchens with custom island benches, premium stone benchtops throughout, integrated European appliances, ducted air conditioning, and a Vintec premium wine cabinet."
    },
    {
      num: "04",
      title: "Singular Design",
      sub: "Never to be repeated",
      desc: "Exclusivity defined. A custom architectural design never to be built again. Meticulously crafted specifically for 1Stonehaven Avenue. The architecture responds to the streetscape with a confidence and elegance that will never be replicated elsewhere."
    },
    {
      num: "05",
      title: "Considered Layout",
      sub: "Generous Proportions",
      desc: "Thoughtfully arranged spaces including a ground-floor suite, upstairs master wing, dedicated study, mud room, ducted heating/cooling, secure double garage, and upstairs retreat."
    },
    {
      num: "06",
      title: "Prestigious Position",
      sub: "Malvern East Connected",
      desc: "Quiet prestige in a leafy pocket. Walk to Darling Station, Hedgeley Dene Gardens, and Waverley Road cafes. Easy reach to Chadstone Shopping Centre and Melbourne's top schools."
    }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className="container">
        
        <motion.div 
          className={styles.features__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label section-label--light">Details</span>
          <h2 className="section-heading section-heading--light">Every detail, considered.</h2>
        </motion.div>

        <motion.div 
          className={styles.features__grid}
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((item, i) => (
            <motion.div 
              key={i} 
              className={styles.features__cell}
              variants={itemVars}
            >
              <div className={styles['features__cell-num']}>{item.num}</div>
              <h3 className={styles['features__cell-title']}>{item.title}</h3>
              <h4 className={styles['features__cell-sub']}>{item.sub}</h4>
              <p className={styles['features__cell-desc']}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
