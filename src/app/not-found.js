"use client";

import { useRouter } from "next/navigation";
import styles from "./styles/not-found.module.css";
import Logo from "../../public/logo/logo";
import Button from "./components/global/buttons/button";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.NotFound}>
      <div className={styles.Content}>
        <Logo />
        <h1 className={styles.PageTitle}>Page not found</h1>
        <Button
          text="Go to home"
          backgroundColor="var(--charcoal"
          hoverEffect={false}
          onClick={handleGoHome}
        />
      </div>
    </div>
  );
}
