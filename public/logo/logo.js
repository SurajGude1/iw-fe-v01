"use client";

import { memo } from 'react';
import styles from './logo.module.css';

const Logo = memo(() => {
  return (
    <div
      className={styles.Logo}
      role="img"
      aria-label="IndianWriters - Timeless Voices"
    >
      <h1 className={styles.Header}>
        Golden<span>Words</span>
      </h1>
      <p className={styles.SubHeader} aria-hidden="true">
        TIMELESS VOICES
      </p>
    </div>
  );
});

Logo.displayName = 'Logo';
export default Logo;