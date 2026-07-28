import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Inclusions.module.css';

// --- Dark Theme (1A / Cafe Oak) ---
const darkKitchenItems = [
  { id: 'fridge', icon: '◆', title: 'Integrated refrigerator', desc: 'by Miele', dot: { top: '49.8%', left: '28.4%' } },
  { id: 'freezer', icon: '▫', title: 'Integrated freezer', desc: 'by Miele', dot: { top: '50.0%', left: '22.6%' } },
  { id: 'wine', icon: '✦', title: 'Premium Wine Cabinet', desc: 'by Vintec', dot: { top: '54.8%', left: '17.1%' } },
  { id: 'sink', icon: '✧', title: 'Single Bowl Kitchen Sink', desc: 'by Franke', dot: { top: '61%', left: '40.5%' } },
  { id: 'mixer', icon: '○', title: 'Pull-Out Kitchen Mixer', desc: 'by ABI Interiors', dot: { top: '54.4%', left: '42.6%' } },
  { id: 'cooktop', icon: '▰', title: 'Induction cooktop', desc: 'by Miele', dot: { top: '57.5%', left: '47.5%' } },
  { id: 'rangehood', icon: '△', title: 'Built-in Rangehood', desc: 'by Miele', dot: { top: '45.4%', left: '54.7%' } },
  { id: 'oven', icon: '◆', title: '60cm Wide Oven', desc: 'by Miele', dot: { top: '51.3%', left: '74.1%' } },
  { id: 'board', icon: '▫', title: 'Cafe Oak in Matt Finish', desc: 'by Polytec', dot: { top: '26.2%', left: '75.1%' } },
  { id: 'splashback', icon: '✦', title: 'Santorini Gold', desc: 'by AC Stone', dot: { top: '38.3%', left: '37.3%' } },
  { id: 'flooring', icon: '✧', title: 'Wood Flooring', desc: 'Botany Herringbone by Havwoods', dot: { top: '82.4%', left: '80.2%' } },
];

const darkBathroomItems = [
  { id: 'walltile', icon: '◆', title: 'Ivory Porcelain Tile', desc: 'by Massa Imports', dot: { top: '21%', left: '44%' } },
  { id: 'shower', icon: '▫', title: 'Finley Shower Rail Set', desc: 'Brushed Gunmetal by ABI interior', dot: { top: '27%', left: '33%' } },
  { id: 'mosaic', icon: '✦', title: 'Zukuri Pearl Mosaic Tile', desc: 'by Tiento', dot: { top: '55%', left: '15%' } },
  { id: 'filler', icon: '✧', title: 'Floor Mounted Bath Filler', desc: 'Brushed Gunmetal by ABI Interiors', dot: { top: '58.8%', left: '49.9%' } },
  { id: 'tub', icon: '○', title: 'Freestanding Bath Tub', desc: 'Matte White Round', dot: { top: '82%', left: '55%' } },
  { id: 'stone', icon: '▰', title: 'Santorini Gold', desc: 'by AC Stone', dot: { top: '58.7%', left: '70.8%' } },
  { id: 'basin', icon: '△', title: 'Undercounter Basin', desc: 'Pill Basin', dot: { top: '60.8%', left: '77.3%' } },
  { id: 'drawer', icon: '◆', title: 'Cafe Oak in Matt Finish', desc: 'by Polytec', dot: { top: '70.9%', left: '83.9%' } },
  { id: 'tapware', icon: '▫', title: 'Bench Mounted Spout', desc: 'by ABI Interiors', dot: { top: '53.0%', left: '72.9%' } },
  { id: 'light', icon: '✦', title: 'Loop Fusion Wall Light', desc: 'by Nook Collections', dot: { top: '38.6%', left: '78.1%' } },
];

const darkLivingItems = [
  { id: 'cabinet', icon: '◆', title: 'Cafe Oak in Matt Finish', desc: 'by Polytec', dot: { top: '63.8%', left: '23.3%' } },
  { id: 'stone', icon: '▫', title: 'Santorini Gold', desc: 'by AC Stone', dot: { top: '59.4%', left: '43.9%' } },
  { id: 'fireplace', icon: '✧', title: 'Electric Fireplace', desc: 'by VisionLINE', dot: { top: '57.4%', left: '60.5%' } },
  { id: 'flooring', icon: '○', title: 'Wood Flooring', desc: 'Botany Herringbone by Havwoods', dot: { top: '78.2%', left: '76.8%' } },
];


// --- Light Theme (1 / Ecru Oak) ---
const lightKitchenItems = [
  { id: 'fridge', icon: '◆', title: 'Integrated refrigerator', desc: 'by Miele', dot: { top: '49.8%', left: '28.4%' } },
  { id: 'freezer', icon: '▫', title: 'Integrated freezer', desc: 'by Miele', dot: { top: '50.0%', left: '22.6%' } },
  { id: 'wine', icon: '✦', title: 'Premium Wine Cabinet', desc: 'by Vintec', dot: { top: '53.9%', left: '15.8%' } },
  { id: 'sink', icon: '✧', title: 'Single Bowl Kitchen Sink', desc: 'by Franke', dot: { top: '61%', left: '40.5%' } },
  { id: 'mixer', icon: '○', title: 'Pull-Out Kitchen Mixer', desc: 'by ABI Interiors', dot: { top: '54.4%', left: '39.1%' } },
  { id: 'cooktop', icon: '▰', title: 'Induction cooktop', desc: 'by Miele', dot: { top: '57.5%', left: '47.5%' } },
  { id: 'rangehood', icon: '△', title: 'Built-in Rangehood', desc: 'by Miele', dot: { top: '44.7%', left: '52.8%' } },
  { id: 'oven', icon: '◆', title: '60cm Wide Oven', desc: 'by Miele', dot: { top: '54.3%', left: '69.8%' } },
  { id: 'board', icon: '▫', title: 'Ecru Oak in Matt Finish', desc: 'by Polytec', dot: { top: '20%', left: '72.5%' } },
  { id: 'splashback', icon: '✦', title: 'Monaco Drift', desc: 'by AC Stone', dot: { top: '38.3%', left: '37.3%' } },
  { id: 'flooring', icon: '✧', title: 'Wood Flooring', desc: 'Botany Herringbone by Havwoods', dot: { top: '82.4%', left: '80.2%' } },
];

const lightBathroomItems = [
  { id: 'walltile', icon: '◆', title: 'Monaco Drift', desc: 'by AC Stone', dot: { top: '30.8%', left: '41.5%' } },
  { id: 'shower', icon: '▫', title: 'Finley Shower Rail Set', desc: 'Brushed Brass by ABI interior', dot: { top: '32.8%', left: '29.3%' } },
  { id: 'mosaic', icon: '✦', title: 'Zukuri Pearl Mosaic Tile', desc: 'by Tiento', dot: { top: '53%', left: '14.5%' } },
  { id: 'filler', icon: '✧', title: 'Floor Mounted Bath Filler', desc: 'Brushed Brass by ABI Interiors', dot: { top: '62.1%', left: '41.9%' } },
  { id: 'tub', icon: '○', title: 'Freestanding Bath Tub', desc: 'Matte White Round', dot: { top: '83.5%', left: '49.5%' } },
  { id: 'stone', icon: '▰', title: 'Monaco Drift', desc: 'by AC Stone', dot: { top: '62.5%', left: '76.3%' } },
  { id: 'basin', icon: '△', title: 'Undercounter Basin', desc: 'Pill Basin', dot: { top: '65.4%', left: '80.0%' } },
  { id: 'drawer', icon: '◆', title: 'Ecru Oak in Matt Finish', desc: 'by Polytec', dot: { top: '83.8%', left: '83.3%' } },
  { id: 'tapware', icon: '▫', title: 'Bench Mounted Spout', desc: 'by ABI Interiors', dot: { top: '54%', left: '79%' } },
  { id: 'light', icon: '✦', title: 'Mino 1 Wall Light', desc: 'by Lucci', dot: { top: '36.5%', left: '82.7%' } },
];

const lightLivingItems = [
  { id: 'cabinet', icon: '◆', title: 'Ecru Oak in Matt Finish', desc: 'by Polytec', dot: { top: '63.8%', left: '23.3%' } },
  { id: 'stone', icon: '▫', title: 'Monaco Drift', desc: 'by AC Stone', dot: { top: '59.4%', left: '43.9%' } },
  { id: 'fireplace', icon: '✧', title: 'Electric Fireplace', desc: 'by VisionLINE', dot: { top: '57.4%', left: '60.5%' } },
  { id: 'flooring', icon: '○', title: 'Wood Flooring', desc: 'Botany Herringbone by Havwoods', dot: { top: '78.2%', left: '76.8%' } },
];


const INCLUSIONS_DATA = {
  'residence-1': {
    label: 'Residence 1',
    tabs: {
      kitchen: { label: 'Kitchen', items: lightKitchenItems, image: 'images/1_kitchen_1.webp' },
      bathroom: { label: 'Bathrooms', items: lightBathroomItems, image: 'images/Master Ensuit_cam_1_1.jpg' },
      living: { label: 'Living', items: lightLivingItems, image: 'images/1_Living & dining.jpg' }
    }
  },
  'residence-1a': {
    label: 'Residence 1A',
    tabs: {
      kitchen: { label: 'Kitchen', items: darkKitchenItems, image: 'images/1A kitchen.jpg' },
      bathroom: { label: 'Bathrooms', items: darkBathroomItems, image: 'images/Master Ensuit_cam_2_1A.jpg' },
      living: { label: 'Living', items: darkLivingItems, image: 'images/1A_Living & dining.jpg' }
    }
  }
};

export default function Inclusions() {
  const [data, setData] = useState(INCLUSIONS_DATA);
  const [activeHome, setActiveHome] = useState('residence-1');
  const [activeTab, setActiveTab] = useState('kitchen');
  const [activeDot, setActiveDot] = useState(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef(null);

  const currentData = data[activeHome].tabs[activeTab];

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
      <div className="container" style={{ position: 'relative' }}>
        <motion.div 
          className={styles.inclusions__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label section-label--centered">Premium Inclusions</span>
          <h2 className="section-heading section-heading--dark" style={{ textAlign: "center" }}>Luxury comes standard</h2>
          <p className="section-body" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto", marginBottom: "2rem" }}>
            Every Stonehaven residence is delivered to the highest quality incorporating the finest selection of premium brands and finishes. Buy now to customise your new home and maximise stamp duty savings.
          </p>

          <div className={styles.homeToggle}>
            <button 
              className={`${styles.homeToggleBtn} ${activeHome === 'residence-1' ? styles.active : ''}`}
              onClick={() => {
                setActiveHome('residence-1');
                setActiveDot(null);
                setActiveMobileIndex(0);
              }}
            >
              Residence 1
            </button>
            <button 
              className={`${styles.homeToggleBtn} ${activeHome === 'residence-1a' ? styles.active : ''}`}
              onClick={() => {
                setActiveHome('residence-1a');
                setActiveDot(null);
                setActiveMobileIndex(0);
              }}
            >
              Residence 1A
            </button>
          </div>
        </motion.div>

        <motion.div 
          className={styles.inclusions__tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {Object.entries(data[activeHome].tabs).map(([key, tabData]) => (
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
              {tabData.label}
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
              key={`${activeHome}-${activeTab}`}
              className={styles.inclusions__imageWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src={currentData.image} 
                alt={currentData.label} 
                className={styles.inclusions__image} 
              />
              
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
                    <motion.div 
                      key={item.id}
                      className={`${styles.inclusions__hotspotWrap} ${activeDot === item.id ? styles.active : ''} ${isMobileActive ? styles.activeMobile : ''}`}
                      style={{ top: item.dot.top, left: item.dot.left, cursor: 'pointer' }}
                      onMouseEnter={() => window.innerWidth >= 768 && setActiveDot(item.id)}
                      onMouseLeave={() => window.innerWidth >= 768 && setActiveDot(null)}
                      onClick={() => handleDotClick(item.id, index)}
                    >
                      <div className={styles.inclusions__dot}></div>
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
                    </motion.div>
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
              key={`cards-${activeHome}-${activeTab}`}
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
