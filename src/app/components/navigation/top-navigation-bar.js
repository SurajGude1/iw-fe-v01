import { memo, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./top-navigation-bar.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Button from "../global/buttons/button";
import SignIn from "../global/forms/sign-in";
import EarnForm from "../global/forms/earn";
import ContactForm from "../global/forms/contact";
import Drawer from "./drawer";

config.autoAddCss = false;

// Lazy-load the Logo
const Logo = dynamic(() => import("../../../../public/logo/logo"), {
  loading: () => <div className="LogoPlaceholder" />,
  ssr: false,
});

function TopNavigationBar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showEarnForm, setShowEarnForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className={styles.TopBar}>
        <Logo />
        <div className={styles.ButtonGroup}>
          <Button
            text="Contact"
            backgroundColor="#36454F"
            textColor="#ffffff"
            hoverEffect = {false}
            onClick={() => setShowContactForm(true)}
          />
          <Button
            text="Earn"
            backgroundColor="#ffd700"
            textColor="#001011"
            hoverEffect = {false}
            onClick={() => setShowEarnForm(true)}
          />
          <Button
            text="Sign-in"
            backgroundColor="#36454F"
            textColor="#ffffff"
            hoverEffect = {false}
            onClick={() => setShowSignIn(true)}
          />
          <FontAwesomeIcon
            icon={faBars}
            color="#f9f6ee"
            className={styles.FaBars}
            onClick={toggleDrawer}
          />
        </div>
      </div>

      {/* SignIn Modal */}
      {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
      {/* Earn Modal */}
      {showEarnForm && <EarnForm onClose={() => setShowEarnForm(false)} />}
      {/* Earn Modal */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </>
  );
}

export default memo(TopNavigationBar);
