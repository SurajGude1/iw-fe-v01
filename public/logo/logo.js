'use client';

import { memo, useLayoutEffect, useState, useRef } from 'react';
import styles from './logo.module.css';

const Logo = memo(() => {
  const logoRef = useRef(null);
  const [isLightBackground, setIsLightBackground] = useState(false);

  useLayoutEffect(() => {
    const node = logoRef.current;
    if (!node) return;

    const bgColor = getComputedStyle(node).backgroundColor;
    const rgb = bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    if (rgb) {
      const [r, g, b] = rgb.slice(1).map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      setIsLightBackground(luminance > 0.7);
    }
  }, []);

  return (
    <header
      ref={logoRef}
      className={`${styles.Logo} ${isLightBackground ? styles.lightBackground : ''}`}
      role="img"
      aria-label="IndianWriters - Timeless Voices"
    >
      <h1 className={styles.Header}>
        Indian
        <span className={isLightBackground ? styles.lightBackgroundSpan : ''}>Writers</span>
      </h1>
      <span className={styles.SubHeader} aria-hidden="true">
        TIMELESS VOICES
      </span>
    </header>
  );
});

Logo.displayName = 'Logo';
export default Logo;
