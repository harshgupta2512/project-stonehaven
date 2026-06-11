import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Inclusions.module.css';

const kitchenItems = [
  { id: 'benchtop', icon: '◆', title: 'CDK Stone Benchtops', desc: 'Taj Mahal stone — 20mm to back bench and WIP, 80mm to island with waterfall end and eased edge profile', dot: { top: '64%', left: '56%' } },
  { id: 'joinery', icon: '▫', title: 'Polytec Joinery', desc: 'Boston Oak 30mm slim shaker vertical panel to all interior joinery (light scheme) or Perugian Walnut (dark scheme)', dot: { top: '26%', left: '32%' } },
  { id: 'hardware', icon: '✦', title: 'Lo & Co Aged Brass Hardware', desc: 'Tubby Pulled Aged Brass handles — 212mm vertical to doors, horizontal to drawers, 340mm to pantry and tall doors', dot: { top: '58%', left: '77.5%' } },
  { id: 'pendant', icon: '✧', title: 'Beacon Helix Bar Pendant', desc: '5-light bar pendant in textured chalk with frosted opal glass, centred over kitchen island', dot: { top: '20%', left: '50%' } },
  { id: 'sink', icon: '○', title: 'Walk-in Pantry & Double Bowl Sink', desc: 'Merro Hugo stainless steel undermount double bowl sink to WIP, Elysian brushed nickel mixer by Reece', dot: { top: '60%', left: '41.5%' } },
  { id: 'flooring', icon: '▰', title: 'Engineered Timber Flooring', desc: 'Premium oak engineered timber flooring in a custom chevron pattern throughout the living and kitchen areas', dot: { top: '88%', left: '25%' } },
];

const bathroomItems = [
  { id: 'tiles', icon: '◆', title: 'Feature Wall Tiles', desc: 'Full-height feature tiles to shower recess and behind vanity with premium stone-look finish', dot: { top: '45%', left: '9%' } },
  { id: 'vanity', icon: '▫', title: 'Floating Vanity Unit', desc: 'Custom floating vanity in matching timber-look joinery with soft-close drawers and stone benchtop', dot: { top: '80%', left: '82%' } },
  { id: 'tapware', icon: '○', title: 'Brushed Nickel Tapware', desc: 'Elysian brushed nickel basin mixer, shower set, and bath spout throughout by Reece', dot: { top: '68%', left: '95%' } },
  { id: 'mirror', icon: '✧', title: 'Frameless Mirror Cabinet', desc: 'Recessed mirror cabinet with integrated LED lighting and demister pad to master ensuite', dot: { top: '30%', left: '97%' } },
];

const livingItems = [
  { id: 'flooring', icon: '◆', title: 'Engineered Timber Flooring', desc: 'Premium wide-board engineered timber flooring throughout all living areas and bedrooms', dot: { top: '90%', left: '50%' } },
  { id: 'glazing', icon: '▫', title: 'Floor-to-Ceiling Glazing', desc: 'Oversized aluminium-framed sliding doors with low-E glass for thermal performance and natural light', dot: { top: '35%', left: '72%' } },
  { id: 'climate', icon: '✦', title: 'Ducted Climate Control', desc: 'Zoned ducted heating and refrigerated cooling system with smart thermostat control throughout', dot: { top: '8%', left: '40%' } },
  { id: 'wine', icon: '✧', title: 'Vintec Wine Cabinet', desc: 'Integrated Vintec premium wine cabinet with temperature-controlled dual-zone storage', dot: { top: '48%', left: '16%' } },
];

const TABS = {
  kitchen: { label: 'Kitchen', items: kitchenItems, image: 'images/1A kitchen_V3_1.webp' },
  bathroom: { label: 'Bathrooms', items: bathroomItems, image: 'images/bathroom-warm.webp' },
  living: { label: 'Living & Exterior', items: livingItems, image: 'images/1A_Living & dining_V3_1.webp' }
};

export default function Inclusions() {
  const [activeTab, setActiveTab] = useState('kitchen');
  const [activeDot, setActiveDot] = useState(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef(null);

  const currentData = TABS[activeTab];

  const handleScroll = (e) => {
    if (window.innerWidth >= 768) return;
    const container = e.currentTarget;
    const children = Array.from(container.children);
    if (children.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeMobileIndex) {
      setActiveMobileIndex(closestIndex);
    }
  };

  const handleDotClick = (itemId, index) => {
    if (window.innerWidth >= 768) {
      setActiveDot(activeDot === itemId ? null : itemId);
    } else {
      setActiveMobileIndex(index);
      const cardElement = carouselRef.current?.children[index];
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <section id="inclusions" className={styles.inclusions}>
      <div className="container">
        
        <motion.div 
          className={styles.inclusions__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label section-label--centered">Premium Inclusions</span>
          <h2 className="section-heading section-heading--dark" style={{ textAlign: "center" }}>Luxury comes standard.</h2>
          <p className="section-body" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            Every 1Stonehaven residence is delivered with a curated selection of premium brands and finishes — no upgrades required.
          </p>
        </motion.div>

        <motion.div 
          className={styles.inclusions__tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {Object.entries(TABS).map(([key, data]) => (
            <button 
              key={key}
              className={`${styles.inclusions__tab} ${activeTab === key ? styles.active : ''}`}
              onClick={() => {
                setActiveTab(key);
                setActiveDot(null);
                setActiveMobileIndex(0);
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({ left: 0, behavior: 'instant' });
                }
              }}
            >
              {data.label}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className={styles.inclusions__viewer}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={styles.inclusions__imageWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img src={currentData.image} alt={currentData.label} className={styles.inclusions__image} />
              
              {/* Desktop & Mobile Hotspots */}
              <div className={styles.inclusions__hotspots}>
                {currentData.items.map((item, index) => {
                  const isBottomHalf = parseInt(item.dot.top) > 50;
                  const isRightSide = parseInt(item.dot.left) > 75;
                  const isLeftSide = parseInt(item.dot.left) < 25;
                  const isMobileActive = activeMobileIndex === index;

                  const tooltipClasses = [
                    styles.inclusions__tooltip,
                    isBottomHalf ? styles['inclusions__tooltip--above'] : '',
                    isRightSide ? styles['inclusions__tooltip--right'] : '',
                    isLeftSide ? styles['inclusions__tooltip--left'] : ''
                  ].filter(Boolean).join(' ');

                  return (
                    <div 
                      key={item.id}
                      className={`${styles.inclusions__hotspotWrap} ${isMobileActive ? styles.activeMobile : ''}`}
                      style={{ top: item.dot.top, left: item.dot.left }}
                      onMouseEnter={() => window.innerWidth >= 768 && setActiveDot(item.id)}
                      onMouseLeave={() => window.innerWidth >= 768 && setActiveDot(null)}
                      onClick={() => handleDotClick(item.id, index)}
                    >
                      <div className={styles.inclusions__dot} style={{ cursor: "pointer" }}></div>
                      <AnimatePresence>
                        {activeDot === item.id && (
                          <motion.div 
                            className={tooltipClasses}
                            initial={{ opacity: 0, y: isBottomHalf ? -10 : 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: isBottomHalf ? -10 : 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={styles.tooltip__header}>
                              <span className={styles.tooltip__icon}>{item.icon}</span>
                              <span className={styles.tooltip__title}>{item.title}</span>
                            </div>
                            <p className={styles.tooltip__desc}>{item.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>


        {/* Mobile Swipeable Cards & Desktop Detail Cards */}
        <div className={styles.inclusions__cards}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={`cards-${activeTab}`}
              ref={carouselRef}
              className={styles.inclusions__cardsInner}
              onScroll={handleScroll}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentData.items.map((item, index) => {
                const isMobileActive = activeMobileIndex === index;
                return (
                  <div 
                    key={item.id} 
                    className={`${styles.inclusions__card} ${isMobileActive ? styles.activeCardMobile : ''}`}
                  >
                    <div className={styles.card__header}>
                      <span className={styles.card__icon}>{item.icon}</span>
                      <h3 className={styles.card__title}>{item.title}</h3>
                    </div>
                    <p className={styles.card__desc}>{item.desc}</p>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
