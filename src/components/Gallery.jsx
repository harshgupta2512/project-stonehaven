import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Gallery.module.css';

const galleryItems = [
  { id: 1,  src: "images/facade-front.webp",                    title: "Street Facade",    label: "Exterior", category: "Exterior" },
  { id: 2,  src: "images/Single house cam_2 B&S (1A).webp",     title: "Residence 1",      label: "Exterior", category: "Residence 1" },
  { id: 3,  src: "images/Single house cam_1 B&S (1B).webp",     title: "Residence 1A",     label: "Exterior", category: "Residence 1A" },
  { id: 4,  src: "images/1A kitchen_V3_1.webp",                 title: "Kitchen 1",        label: "Interior", category: "Residence 1" },
  { id: 5,  src: "images/1B kitchen_V2_1.webp",                 title: "Kitchen 1A",       label: "Interior", category: "Residence 1A" },
  { id: 6,  src: "images/1A_Living & dining_V3_1.webp",         title: "Living & Dining",  label: "Interior", category: "Residence 1" },
  { id: 7,  src: "images/1B_Living & dining_V2_1.webp",         title: "Living & Dining",  label: "Interior", category: "Residence 1A" },
  { id: 8,  src: "images/Master Ensuit_cam_3_Day view.webp",    title: "Master Ensuite",   label: "Interior", category: "Residence 1" },
  { id: 9,  src: "images/Master Ensuit_cam_2_Night view_opt.webp", title: "Master Ensuite",   label: "Interior", category: "Residence 1A" },
  { id: 10, src: "images/facade-angle.webp",                    title: "Architectural Detail", label: "Exterior", category: "Exterior" },
  { id: 11, src: "images/Stonehaven_pool_cam_1_Day.webp",       title: "Swimming Pool (Day)", label: "Exterior", category: "Residence 1" },
  { id: 12, src: "images/Stonehaven_pool_cam_1_Day.webp",       title: "Swimming Pool (Day)", label: "Exterior", category: "Residence 1A" },
  { id: 13, src: "images/Stonehaven_pool_cam_1_Night.webp",     title: "Swimming Pool (Night)", label: "Exterior", category: "Residence 1" },
  { id: 14, src: "images/Stonehaven_pool_cam_1_Night.webp",     title: "Swimming Pool (Night)", label: "Exterior", category: "Residence 1A" },
  { id: 15, src: "images/Master bedroom_cam 3_1A.webp",         title: "Master Bedroom",   label: "Interior", category: "Residence 1" },
  { id: 16, src: "images/Master bedroom_cam 3_1A.webp",         title: "Master Bedroom",   label: "Interior", category: "Residence 1A" },
  { id: 17, src: "images/Master bedroom_cam 4_1A.webp",         title: "Master Bedroom (Angle)", label: "Interior", category: "Residence 1" },
  { id: 18, src: "images/Master bedroom_cam 4_1A.webp",         title: "Master Bedroom (Angle)", label: "Interior", category: "Residence 1A" },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [filter, setFilter] = useState('Residence 1');

  const filteredItems = galleryItems.filter(item => item.category === filter || item.category === 'Exterior');
  
  // Ensure enough items exist to scroll seamlessly on large screens
  const copiesNeeded = Math.max(1, Math.ceil(8 / (filteredItems.length || 1)));
  // We duplicate the required copies twice so the left half equals the right half exactly
  const displayItems = Array(copiesNeeded * 2).fill(filteredItems).flat();
  
  // Calculate dynamic animation duration to keep speed constant
  const animationDuration = `${filteredItems.length * copiesNeeded * 4.5}s`;

  const openLightbox = (index) => {
    const originalIndex = index % filteredItems.length;
    setActiveIndex(originalIndex);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section id="gallery" className={styles.gallery}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-label section-label--centered">Gallery</span>
        <h2 className="section-heading section-heading--light" style={{ textAlign: "center" }}>
          A Closer Look
        </h2>
      </motion.div>

      <motion.div
        className={styles.filters}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {['Residence 1', 'Residence 1A'].map(f => (
          <button 
            key={f} 
            className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
            onClick={() => { setFilter(f); setActiveIndex(null); }}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Marquee wrapper — edge masks applied via CSS mask-image */}
      <div className={styles.marqueeWrapper}>
        <motion.div 
          className={styles.marqueeTrack}
          style={{ animationDuration: animationDuration }}
          key={filter} /* Force re-mount of animation on filter change */
        >
          {displayItems.map((item, i) => (
            <div 
              key={`${item.id}-${i}`} 
              className={styles.card}
              onClick={() => openLightbox(i)}
              data-cursor="view"
            >
              <div className={styles.cardImageWrap}>
                <img
                  src={item.src}
                  alt={item.title}
                  className={styles.cardImage}
                  loading="lazy"
                  draggable="false"
                />
                {/* Hover overlay gradient */}
                <div className={styles.cardOverlay} />
                {/* Hover label pill */}
                <div className={styles.cardLabel}>
                  <span className={styles.cardLabelDot} />
                  {item.label}
                </div>
                {/* Bottom title (visible on hover) */}
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div 
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className={styles.lightboxClose} 
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Left Navigation Arrow */}
            <button 
              className={styles.lightboxArrowLeft} 
              onClick={prevImage}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>

            {/* Lightbox Content Container */}
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={styles.lightboxImageWrap}
              >
                <img 
                  src={filteredItems[activeIndex].src} 
                  alt={filteredItems[activeIndex].title} 
                  className={styles.lightboxImage}
                />
                
                {/* Luxury metadata details overlay */}
                <div className={styles.lightboxMeta}>
                  <div className={styles.lightboxMetaText}>
                    <span className={styles.lightboxCategory}>{filteredItems[activeIndex].label}</span>
                    <h3 className={styles.lightboxTitle}>{filteredItems[activeIndex].title}</h3>
                  </div>
                  <div className={styles.lightboxCounter}>
                    {String(activeIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Navigation Arrow */}
            <button 
              className={styles.lightboxArrowRight} 
              onClick={nextImage}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
