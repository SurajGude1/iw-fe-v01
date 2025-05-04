import { useState } from "react";
import styles from "./drawer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faCoins,
  faCog,
  faSignOutAlt,
  faUserPlus,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons";
import EarnForm from "../global/forms/earn";
import ContactForm from "../global/forms/contact";
import SignIn from "../global/forms/sign-in";

const Drawer = ({ isOpen, onClose }) => {
  const [showEarnForm, setShowEarnForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSignIn, setshowSignIn] = useState(false);

  const handleEarnClick = () => {
    setShowEarnForm(true);
    onClose();
  };

  const handleContactClick = () => {
    setShowContactForm(true);
    onClose();
  };

  const handleSignInClick = () => {
    setshowSignIn(true);
    onClose();
  };

  return (
    <>
      <div
        className={`${styles.DrawerOverlay} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
      />
      <div className={`${styles.Drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.DrawerHeader}>
          <p className={styles.UserName}>your name</p>
          <button className={styles.DrawerCloseButton} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <div className={styles.DrawerContent}>
          <nav className={styles.DrawerNav}>
            <a
              href="#sign-in"
              className={styles.DrawerItem}
              onClick={(e) => {
                e.preventDefault();
                handleSignInClick();
              }}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <span className={styles.Span}>Sign-in</span>
            </a>
            <a
              href="#earn"
              className={styles.DrawerItem}
              onClick={(e) => {
                e.preventDefault();
                handleEarnClick();
              }}
            >
              <FontAwesomeIcon icon={faCoins} />
              <span className={styles.Span}>Earn</span>
            </a>
            <a href="#profile" className={styles.DrawerItem}>
              <FontAwesomeIcon icon={faUser} />
              <span className={styles.Span}>Profile</span>
            </a>
            <a href="#settings" className={styles.DrawerItem}>
              <FontAwesomeIcon icon={faCog} />
              <span className={styles.Span}>Settings</span>
            </a>
            <a
              href="#contact"
              className={styles.DrawerItem}
              onClick={(e) => {
                e.preventDefault();
                handleContactClick();
              }}
            >
              <FontAwesomeIcon icon={faIdCardClip} />
              <span className={styles.Span}>Contact-us</span>
            </a>
            <a href="#signout" className={styles.DrawerItem}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className={styles.Span}>Sign Out</span>
            </a>
          </nav>
        </div>
      </div>
      {/* Earn Modal */}
      {showEarnForm && <EarnForm onClose={() => setShowEarnForm(false)} />}
      {/* Contact Modal */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
      {/* Sign-in Modal */}
      {showSignIn && <SignIn onClose={() => setshowSignIn(false)} />}
    </>
  );
};

export default Drawer;
