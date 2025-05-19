import { useState, useEffect, useRef } from 'react';
import cardData from "../../data/card-data.json";
import styles from "./hero.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import Button from "../global/buttons/button";
import Image from "next/image";

export default function Hero() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const currentCard = cardData[currentCardIndex];

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentCardIndex(prev =>
            prev === cardData.length - 1 ? 0 : prev + 1
          );
          setIsAnimating(false);
        }, 1000); // Matches animation duration
      }, 10000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, currentCardIndex]);

  const handleHover = () => {
    setIsHovered(true);
    clearInterval(intervalRef.current);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.Hero}>
      {/* Main Card (Left) */}
      <article
        className={styles.Card}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
      >
        <div className={styles.CardContent}>
          {/* Curtain overlay */}
          <div className={`${styles.Curtain} ${isAnimating ? styles.curtainClose : ''}`}></div>

          {/* Card content */}
          <div className={styles.TopSection}>
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
                priority={currentCardIndex === 0}
              />
            </div>

            <h3 className={styles.Title}>{currentCard.title}</h3>
          </div>

          <div className={styles.BottomSection}>
            <div className={styles.Divider} />
            <div className={styles.Actions}>
              <button aria-label="Like">
                <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.4rem' }} />
                <span>{currentCard.likes}</span>
              </button>
              <button aria-label="Share">
                <FontAwesomeIcon icon={faShare} style={{ fontSize: '1.4rem' }} />
                <span>{currentCard.shares}</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Summary Card (Center) */}
      <summary
        className={styles.Summary}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
      >
        <div className={styles.SummaryContentContainer}>
          {/* Curtain overlay */}
          <div className={`${styles.Curtain} ${isAnimating ? styles.curtainClose : ''}`}></div>

          <h2 className={styles.SummaryTitle}>{currentCard.title}</h2>
          <div className={styles.SummaryContent}>
            <p>{currentCard.cardSummary}</p>
          </div>
          <div className={styles.SummaryFooter}>
            <Button
              text="Read More"
              backgroundColor="var(--electric-blue)"
              textColor="var(--rich-black)"
              onClick={() => console.log("Read more clicked")}
            />
          </div>
        </div>
      </summary>

      {/* Video Ads (Right) - Narrower width */}
      <div className={styles.VideoAds}>
        <h3 className={styles.SummaryTitle}>Featured</h3>
        <div className={styles.VideoContainer}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
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