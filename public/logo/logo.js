"use client"

import { memo, useEffect, useState, useRef } from 'react';
import styles from './logo.module.css';

const Logo = memo(() => {
  const logoRef = useRef(null);
  const [isLightBackground, setIsLightBackground] = useState(false);

  useEffect(() => {
    if (logoRef.current) {
      // Get the computed background color of the logo container or its parent
      const backgroundColor = getComputedStyle(logoRef.current).backgroundColor;
      
      // Check if the background is light (white or very light)
      const isLight = isColorLight(backgroundColor);
      setIsLightBackground(isLight);
    }
  }, []);

  // Helper function to check if a color is light
  const isColorLight = (color) => {
    // Parse RGB values from the color string (handles rgb(r, g, b) format)
    const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!rgbMatch) return false;

    const [_, r, g, b] = rgbMatch.map(Number);
    
    // Calculate luminance (perceived brightness)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Consider colors with luminance > 0.7 as light
    return luminance > 0.7;
  };

  return (
    <div 
      ref={logoRef}
      className={`${styles.Logo} ${isLightBackground ? styles.lightBackground : ''}`}
      role="img" 
      aria-label="IndianWriters - Timeless Voices"
    >
      <h1 className={styles.Header}>
        Indian<span className={isLightBackground ? styles.lightBackgroundSpan : ''}>Writers</span>
      </h1>
      <p className={styles.SubHeader} aria-hidden="true">
        TIMELESS VOICES
      </p>
    </div>
  );
});

Logo.displayName = 'Logo';
export default Logo;