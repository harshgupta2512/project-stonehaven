import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Lifestyle.module.css';
import galleryStyles from './Gallery.module.css';

const LIFESTYLE_IMAGES = [
  { url: 'images/lifestyle/A071V_HedgleyDene_019.jpg', alt: 'Hedgeley Dene', type: 'large' },
  { url: 'images/lifestyle/198_Wattletree_Lifestyles038.jpg', alt: 'Wattletree Lifestyles', type: 'normal' },
  { url: 'images/lifestyle/MalvernValley_156.jpg', alt: 'Malvern Valley', type: 'normal' },
  { url: 'images/lifestyle/MalvernVillageLifestyles_027.jpg', alt: 'Malvern Village', type: 'normal' },
  { url: 'images/lifestyle/198_Wattletree_Lifestyles067.jpg', alt: 'Cafe culture', type: 'normal' },
];

export default function Lifestyle() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? LIFESTYLE_IMAGES.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === LIFESTYLE_IMAGES.length - 1 ? 0 : prev + 1));
  };

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
              onClick={() => openLightbox(i)}
              style={{ cursor: 'pointer' }}
            >
              <img src={img.url} alt={img.alt} className={styles.lifestyle__image} loading="lazy" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div 
            className={galleryStyles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className={galleryStyles.lightboxClose} 
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
              className={galleryStyles.lightboxArrowLeft} 
              onClick={prevImage}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>

            {/* Lightbox Content Container */}
            <div className={galleryStyles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={galleryStyles.lightboxImageWrap}
              >
                <img 
                  src={LIFESTYLE_IMAGES[activeIndex].url} 
                  alt={LIFESTYLE_IMAGES[activeIndex].alt} 
                  className={galleryStyles.lightboxImage}
                />
                
                {/* Luxury metadata details overlay */}
                <div className={galleryStyles.lightboxMeta}>
                  <div className={galleryStyles.lightboxMetaText}>
                    <span className={galleryStyles.lightboxCategory}>Lifestyle</span>
                    <h3 className={galleryStyles.lightboxTitle}>{LIFESTYLE_IMAGES[activeIndex].alt}</h3>
                  </div>
                  <div className={galleryStyles.lightboxCounter}>
                    {String(activeIndex + 1).padStart(2, '0')} / {String(LIFESTYLE_IMAGES.length).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Navigation Arrow */}
            <button 
              className={galleryStyles.lightboxArrowRight} 
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
