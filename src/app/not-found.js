import styles from "./styles/not-found.module.css";
import Logo from "../../public/logo/logo";

export default function NotFound() {
  return (
    <div className={styles.NotFound}>
      <Logo />
      <h1 className={styles.PageTitle}>Page not found...</h1>
    </div>
  );
}
