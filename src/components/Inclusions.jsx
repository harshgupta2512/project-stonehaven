import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Inclusions.module.css';

const kitchenItems = [
  { id: 'fridge', icon: '◆', title: 'Integrated refrigerator', desc: 'KS 7793 D by Miele', dot: { top: '40%', left: '27.5%' } },
  { id: 'freezer', icon: '▫', title: 'Integrated freezer', desc: 'FNS 7794 E Integrated freezer by Miele', dot: { top: '56%', left: '23%' } },
  { id: 'wine', icon: '✦', title: 'Premium Wine Cabinet', desc: 'Vintec PREMIUM 198 Bottle Wine Cabinet with Fixed Shelves in Black Alloy Finish by Vintec', dot: { top: '69%', left: '17%' } },
  { id: 'sink', icon: '✧', title: 'Maris Single Bowl Kitchen Sink', desc: 'Polar White by Franke', dot: { top: '61%', left: '40.5%' } },
  { id: 'mixer', icon: '○', title: 'Elysian Commercial Pull-Out Kitchen Mixer', desc: 'by Miele', dot: { top: '54%', left: '42%' } },
  { id: 'cooktop', icon: '▰', title: 'Induction cooktop', desc: 'Black Elegant glass ceramic surface by Miele', dot: { top: '57.5%', left: '47.5%' } },
  { id: 'rangehood', icon: '△', title: 'Built-in Rangehoods', desc: 'AP03 DA 2390 Extractor unit in Stainless Steel finish by Miele', dot: { top: '48%', left: '52%' } },
  { id: 'oven', icon: '◆', title: '60cm Wide Oven', desc: 'H 2457 BP Obsidian Black Oven by Miele', dot: { top: '41%', left: '72.5%' } },
  { id: 'board', icon: '▫', title: 'Decorative board', desc: 'Cafe Oak in Matt Finish by Polytec', dot: { top: '20%', left: '72.5%' } },
  { id: 'flooring', icon: '✧', title: 'Wood Flooring', desc: 'Botany Herringbone Matt Lacquered finish in Platinum by Havwoods', dot: { top: '80%', left: '90.5%' } },
];

const bathroomItems = [
  { id: 'shower', icon: '◆', title: 'Head Round Shower', desc: 'Brushed Gunmetal by ABI Interiors', dot: { top: '28%', left: '17%' } },
  { id: 'tiles', icon: '▫', title: 'Zukuri Pearl Mosaic Tile', desc: 'Pearl Glaze by Tiento', dot: { top: '53%', left: '14.5%' } },
  { id: 'filler', icon: '✦', title: 'Floor Mounted Bath Filler', desc: 'Brushed Gunmetal by ABI Interiors', dot: { top: '80%', left: '34.5%' } },
  { id: 'tub', icon: '✧', title: 'Freestanding Bath Tub', desc: 'Cremona 1530 Matte White Round Freestanding Bath Tub in Matte White by Acqua Bathrooms', dot: { top: '80%', left: '45%' } },
  { id: 'basin', icon: '○', title: 'Undercounter Basin', desc: 'Zuri Undercounter Pill Basin in Matte White by ABI Interiors', dot: { top: '62%', left: '66.5%' } },
  { id: 'light', icon: '▰', title: 'Loop Fusion Wall Light', desc: 'by Nook Collections', dot: { top: '36%', left: '68%' } },
  { id: 'door', icon: '△', title: 'Privacy Door Handle', desc: 'Rochester in Brushed Gunmetal by Manovella', dot: { top: '62%', left: '86.5%' } },
];

const livingItems = [
  { id: 'downlight', icon: '◆', title: 'Downlight', desc: 'Surface 150mm LED Tri-Colour Surface Mounted Downlight in White by Lucci', dot: { top: '14%', left: '49%' } },
  { id: 'carpet', icon: '▫', title: 'Textured Tufted Loop Pile Carpet', desc: 'Ayrton Monaco by EC Carpets', dot: { top: '91%', left: '10.5%' } },
  { id: 'fireplace', icon: '✦', title: 'Electric Fireplace', desc: 'VisionLINE View Electric Fireplace - Single Front Sided in black by Vision Line', dot: { top: '56.5%', left: '54.5%' } },
  { id: 'flooring', icon: '✧', title: 'Wood Flooring', desc: 'Botany Herringbone Matt Lacquered finish in Platinum by Havwoods', dot: { top: '88%', left: '84%' } },
];

const TABS = {
  kitchen: { label: 'Kitchen', items: kitchenItems, image: 'images/1A kitchen_V3_1.webp' },
  bathroom: { label: 'Bathrooms', items: bathroomItems, image: 'images/Master Ensuit_cam_3_Day view.webp' },
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
            Every Stonehaven residence is delivered with a curated selection of premium brands and finishes — no upgrades required.
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
