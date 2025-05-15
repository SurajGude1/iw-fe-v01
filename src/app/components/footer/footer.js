import styles from './footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faTwitter,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";
import Logo from '../../../../public/logo/logo';

export default function Footer() {
  return (
    <footer className={styles.Container}>
      <div className={styles.LinksContainer}>
        {/* About Section (wider) */}
        <div className={styles.AboutSection}>
          <Logo />
          <p className={styles.AboutText}>
            {`"IndianWriters, established in 2025, is committed to fostering
            awareness and driving meaningful conversations across society. Our
            organization serves as a platform for insightful discourse on
            social, political, health, and technology-related topics, empowering
            individuals with knowledge and perspectives that inspire positive
            change."`}
          </p>
          <div className={styles.SocialLinks}>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className={styles.Icon} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className={styles.Icon} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className={styles.Icon} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className={styles.Icon} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.Icon} />
            </a>
          </div>
          <div className={styles.ContactInfo}>
            <FontAwesomeIcon icon={faPhoneAlt} className={styles.Icon} />
            <span>+91-9172165412</span>
          </div>
        </div>

        {/* Legal Links Column */}
        <div className={styles.LinksColumn}>
          <h3 className={styles.SectionTitle}>Legal and Policy</h3>
          <a href="#" className={styles.LinkItem}>Privacy Policy</a>
          <a href="#" className={styles.LinkItem}>Terms of Use</a>
          <a href="#" className={styles.LinkItem}>Cookie Policy</a>
          <a href="#" className={styles.LinkItem}>Community Guidelines</a>
          <a href="#" className={styles.LinkItem}>Data Protection</a>
        </div>

        {/* Explore Links Column */}
        <div className={styles.LinksColumn}>
          <h3 className={styles.SectionTitle}>Explore and Connect</h3>
          <a href="#" className={styles.LinkItem}>About Us</a>
          <a href="#" className={styles.LinkItem}>Contact Us</a>
          <a href="#" className={styles.LinkItem}>Advertise with Us</a>
          <a href="#" className={styles.LinkItem}>Help Center</a>
          <a href="#" className={styles.LinkItem}>Feedback</a>
          <a href="#" className={styles.LinkItem}>Write For Us</a>
        </div>

        {/* Subscribe Section */}
        <div className={styles.SubscribeSection}>
          <h3 className={styles.SectionTitle}>Subscribe</h3>
          <p className={styles.SubscribeText}>
            Stay updated with the latest articles and insights.
          </p>
          <div className={styles.SubscribeForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.EmailInput}
            />
            <button className={styles.SubscribeButton}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.Copyright}>
        <p>
          © 2025 IndianWriters. All rights reserved. Unauthorized reproduction
          or distribution is strictly prohibited.
        </p>
      </div>
    </footer>
  );
}