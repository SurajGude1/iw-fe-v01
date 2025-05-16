'use client';
import dynamic from 'next/dynamic';
import styles from "./styles/not-found.module.css";

// Dynamically load the Logo component without SSR
const Logo = dynamic(() => import('../../public/logo/logo'), {
  ssr: false,
  loading: () => <div className={styles.LogoPlaceholder} />
});

export default function NotFound() {
  return (
    <main className={styles.NotFound}>
      <Logo />
      <h1 className={styles.PageTitle}>Page not found...</h1>
      <div className={styles.Actions}>
        <a href="/" className={styles.HomeLink}>Return Home</a>
      </div>
    </main>
  );
}
