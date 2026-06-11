import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState(''); // '', 'link', 'drag', 'view'
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the cursor
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check closest elements to support nested items
      const hasCursorAttr = target.closest('[data-cursor]');
      if (hasCursorAttr) {
        setHoverState(hasCursorAttr.getAttribute('data-cursor'));
      } else if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('select') || target.closest('textarea')) {
        setHoverState('link');
      } else if (target.closest('[class*="gallery__item"]')) {
        setHoverState('view');
      } else if (target.closest('[class*="gallery__track"]')) {
        setHoverState('drag');
      } else {
        setHoverState('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  // Resolve active cursor classes
  const cursorClass = `${styles['custom-cursor']} ${hoverState ? styles[`hover-${hoverState}`] : ''}`;

  return (
    <motion.div
      className={cursorClass}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: "-50%",
        y: "-50%"
      }}
    >
      <motion.span 
        className={styles['custom-cursor__text']}
        initial={{ opacity: 0 }}
        animate={{ opacity: hoverState === 'drag' || hoverState === 'view' ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {hoverState === 'drag' && 'DRAG'}
        {hoverState === 'view' && 'VIEW'}
      </motion.span>
    </motion.div>
  );
}
