import styles from "./hero.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  const cardData = {
    author: "Nature Photographer",
    datePosted: "June 10, 2023",
    imageUrl:
      "https://images.pexels.com/photos/1043558/pexels-photo-1043558.jpeg",
    title: "Beautiful Mountain Landscape at Sunset",
    likes: 12834,
    shares: 123,
  };

  return (
    <div className={styles.Hero}>
      <article className={styles.Card}>
        <div className={styles.ImageWrapper}>
          <img
            src={cardData.imageUrl}
            alt={cardData.title}
            loading="lazy"
            width={280}
            height={180}
          />
        </div>
        <div className={styles.Content}>
          <header className={styles.Meta}>
            <span>{cardData.author}</span>
            <time dateTime="2023-06-10">{cardData.datePosted}</time>
          </header>
          <h3>{cardData.title}</h3>
          <footer className={styles.Actions}>
            <button aria-label="Like">
              <FontAwesomeIcon icon={faHeart} />
              <span>{cardData.likes}</span>
            </button>
            <button aria-label="Share">
              <FontAwesomeIcon icon={faShare} />
              <span>{cardData.shares}</span>
            </button>
          </footer>
        </div>
      </article>
      <summary className={styles.Summary}></summary>
      <videoAds className={styles.VideoAds}></videoAds>
    </div>
  );
}
