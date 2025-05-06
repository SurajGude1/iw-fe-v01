import styles from "./hero.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import Button from "../global/buttons/button";

export default function Hero() {
  const cardData = {
    author: "Nature Photographer",
    datePosted: "June 10, 2023",
    imageUrl: "https://images.pexels.com/photos/1043558/pexels-photo-1043558.jpeg",
    title: "The silent stories hidden in abandoned places",
    likes: "12.8k",
    shares: "123",
  };

  return (
    <div className={styles.Hero}>
      {/* Main Card (Left) */}
      <article className={styles.Card}>
        <div className={styles.AuthorSection}>
          <span className={styles.AuthorName}>{cardData.author}</span>
          <time className={styles.DatePosted} dateTime="2023-06-10">
            {cardData.datePosted}
          </time>
        </div>
        
        <div className={styles.ImageWrapper}>
          <img
            src={cardData.imageUrl}
            alt={cardData.title}
            loading="lazy"
            width={320}
            height={200}
          />
        </div>
        
        <h3 className={styles.Title}>{cardData.title}</h3>
        
        <div className={styles.Divider} />
        
        <div className={styles.Actions}>
          <button aria-label="Like">
            <FontAwesomeIcon icon={faHeart} />
            <span>{cardData.likes}</span>
          </button>
          <button aria-label="Share">
            <FontAwesomeIcon icon={faShare} />
            <span>{cardData.shares}</span>
          </button>
        </div>
      </article>

      {/* Summary Card (Center - Widest) */}
      <summary className={styles.Summary}>
        <h2 className={styles.SummaryTitle}>Discover Amazing Features</h2>
        <div className={styles.SummaryContent}>
          <p>
            Our platform offers cutting-edge solutions designed to streamline
            your workflow and boost productivity. With intuitive interfaces and
            powerful tools, you'll achieve more in less time.
          </p>
          <p>
            Join thousands of satisfied users who have transformed their daily
            operations with our technology.
          </p>
        </div>
        <div className={styles.SummaryFooter}>
          <Button
            text="Read More"
            backgroundColor="var(--electric-blue)"
            textColor="var(--off-white)"
            hoverEffect={true}
            onClick={() => console.log("Read more clicked")}
          />
        </div>
      </summary>

      {/* Video Ads (Right) */}
      <div className={styles.VideoAds}>
        <h3 className={styles.SummaryTitle}>Featured Video</h3>
        <div className={styles.SummaryContent}>
          <p>Watch our latest tutorial to learn more about these features.</p>
        </div>
        {/* Video placeholder would go here */}
      </div>
    </div>
  );
}