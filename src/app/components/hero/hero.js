import { useState, useEffect } from 'react';
import cardData from "../../data/card-data.json";
import styles from "./hero.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import Button from "../global/buttons/button";
import Image from "next/image";

export default function Hero() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => 
          prevIndex === cardData.length - 1 ? 0 : prevIndex + 1
        );
      }, 400);
      
      setTimeout(() => {
        setIsFlipping(false);
      }, 800);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentCard = cardData[currentCardIndex];

  return (
    <div className={styles.Hero}>
      {/* Main Card (Left) */}
      <article className={styles.Card}>
        <div className={`${styles.CardInner} ${isFlipping ? styles.CardFlipping : ''}`}>
          <div className={styles.AuthorSection}>
            <span className={styles.AuthorName}>{currentCard.author}</span>
            <time className={styles.DatePosted} dateTime={currentCard.datePosted}>
              {currentCard.datePosted}
            </time>
          </div>

          <div className={styles.ImageWrapper}>
            <Image
              src={currentCard.imageUrl}
              alt={currentCard.title}
              width={320}
              height={200}
              className={styles.Image}
              priority={false}
            />
          </div>

          <h3 className={styles.Title}>{currentCard.title}</h3>

          <div className={styles.Divider} />

          <div className={styles.Actions}>
            <button aria-label="Like">
              <FontAwesomeIcon icon={faHeart} />
              <span>{currentCard.likes}</span>
            </button>
            <button aria-label="Share">
              <FontAwesomeIcon icon={faShare} />
              <span>{currentCard.shares}</span>
            </button>
          </div>
        </div>
      </article>

      {/* Summary Card (Center - Widest) */}
      <summary className={styles.Summary}>
        <div className={`${styles.SummaryInner} ${isFlipping ? styles.SummaryFlipping : ''}`}>
          <h2 className={styles.SummaryTitle}>{currentCard.summaryTitle}</h2>
          <div className={styles.SummaryContent}>
            <p>{currentCard.cardSummary}</p>
            <p>
              Join thousands of satisfied users who have transformed their daily
              operations with our technology.
            </p>
          </div>
          <div className={styles.SummaryFooter}>
            <Button
              text="Read More"
              backgroundColor="var(--electric-blue)"
              textColor="var(--rich-black)"
              hoverEffect={false}
              onClick={() => console.log("Read more clicked")}
            />
          </div>
        </div>
      </summary>

      {/* Video Ads (Right) */}
      <div className={styles.VideoAds}>
        <h3 className={styles.SummaryTitle}>Featured</h3>
        <div className={styles.VideoContainer}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Featured video 1"
          >
            <source
              src="https://videos.pexels.com/video-files/5057524/5057524-uhd_1440_2560_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Featured video 2"
          >
            <source
              src="https://videos.pexels.com/video-files/5926065/5926065-uhd_1440_2560_24fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
}
