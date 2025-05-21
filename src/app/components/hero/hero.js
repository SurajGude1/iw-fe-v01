import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import dynamic from 'next/dynamic';
import cardData from "../../data/posts-data.json";
import styles from "./hero.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";

// Lazy load non-critical components
const Button = dynamic(() => import('../global/buttons/button'), {
  loading: () => <button>Loading...</button>,
  ssr: false
});

const OptimizedImage = dynamic(() => import('next/image'), {
  loading: () => <div style={{ width: 320, height: 200, background: '#ddd' }} />,
});

const VideoPlayer = memo(({ src }) => (
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    aria-label="Featured video"
    disablePictureInPicture
    disableRemotePlayback
  >
    <source src={src} type="video/mp4" />
  </video>
));

VideoPlayer.displayName = 'VideoPlayer';

function Hero() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [curtainPhase, setCurtainPhase] = useState('open'); // 'open' | 'closing' | 'opening'
  const [sanitizedSummary, setSanitizedSummary] = useState('');
  const intervalRef = useRef(null);

  // Memoize current card to prevent unnecessary re-renders
  const currentCard = useMemo(() => cardData[currentCardIndex], [currentCardIndex]);

  // Handle HTML sanitization in useEffect
  useEffect(() => {
    if (typeof window !== 'undefined' && currentCard?.postSummary) {
      const DOMPurify = require('dompurify');
      const sanitizeConfig = {
        FORBID_TAGS: [
          'img', 'video', 'iframe', 'picture', 'source', 'svg',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figure', 'header'
        ],
        FORBID_ATTR: ['src', 'poster', 'alt', 'width', 'height'],
        ALLOWED_TAGS: [
          'p', 'br', 'ul', 'ol', 'li',
          'strong', 'em', 'b', 'i', 'u', 'a',
          'span', 'div',
          'table', 'thead', 'tbody', 'tr', 'td', 'th',
          'blockquote', 'code', 'pre'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id', 'style'],
      };
      const sanitized = DOMPurify.sanitize(currentCard.postSummary, sanitizeConfig);
      setSanitizedSummary(sanitized);
    }
  }, [currentCard]);

  // Use useCallback for event handlers
  const handleHover = useCallback(() => {
    setIsHovered(true);
    clearInterval(intervalRef.current);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Optimized auto-rotation effect with curtain animation
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        // Start closing animation
        setCurtainPhase('closing');

        // After closing animation completes, switch card and start opening
        const closeTimer = setTimeout(() => {
          setCurrentCardIndex(prev => (prev + 1) % cardData.length);
          setCurtainPhase('opening');

          // After opening animation completes, reset to open state
          const openTimer = setTimeout(() => {
            setCurtainPhase('open');
          }, 800);
          
          return () => clearTimeout(openTimer);
        }, 800);

        return () => clearTimeout(closeTimer);
      }, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  // Preload next image for smoother transitions
  useEffect(() => {
    const nextIndex = (currentCardIndex + 1) % cardData.length;
    const nextImage = new Image();
    nextImage.src = cardData[nextIndex].thumbnail;
  }, [currentCardIndex]);

  return (
    <div className={styles.Hero} role="region" aria-label="Featured content">
      {/* Main Card (Left) */}
      <article
        className={styles.Card}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        aria-live="polite"
        itemScope
        itemType="https://schema.org/Article"
      >
        <div className={styles.CardContent}>
          {/* Curtain overlay with animation phases */}
          <div
            className={`
              ${styles.Curtain}
              ${curtainPhase === 'closing' ? styles.curtainClose : ''}
              ${curtainPhase === 'opening' ? styles.curtainOpen : ''}
            `}
            aria-hidden="true"
          />

          {/* Card content */}
          <div className={styles.TopSection}>
            <div className={styles.AuthorSection} itemProp="author">
              <span className={styles.AuthorName} itemProp="name">{currentCard.author}</span>
              <time
                className={styles.DatePosted}
                dateTime={currentCard.datePosted}
                itemProp="datePublished"
              >
                {currentCard.datePosted}
              </time>
            </div>

            <div className={styles.ImageWrapper}>
              <OptimizedImage
                src={currentCard.thumbnail}
                alt={currentCard.title}
                width={320}
                height={200}
                priority={currentCardIndex === 0}
                loading={currentCardIndex === 0 ? 'eager' : 'lazy'}
                decoding="async"
                itemProp="image"
              />
            </div>

            <h3 className={styles.Title} itemProp="headline">{currentCard.title}</h3>
          </div>

          <div className={styles.BottomSection}>
            <div className={styles.Divider} />
            <div className={styles.Actions}>
              <button aria-label={`View ${currentCard.title}`} itemProp="interactionCount">
                <FontAwesomeIcon icon={faEye} style={{ fontSize: '1.2rem' }} />
                <span>{currentCard.views || 0}</span>
              </button>
              <button aria-label={`Like ${currentCard.title}`} itemProp="interactionCount">
                <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.2rem' }} />
                <span>{currentCard.likes || 0}</span>
              </button>
              <button aria-label={`Share ${currentCard.title}`}>
                <FontAwesomeIcon icon={faShare} style={{ fontSize: '1.2rem' }} />
                <span>{currentCard.shares || 0}</span>
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
        itemScope
        itemType="https://schema.org/Article"
      >
        <div className={styles.SummaryContentContainer}>
          {/* Curtain overlay with animation phases */}
          <div
            className={`
              ${styles.Curtain}
              ${curtainPhase === 'closing' ? styles.curtainClose : ''}
              ${curtainPhase === 'opening' ? styles.curtainOpen : ''}
            `}
            aria-hidden="true"
          />

          <h2 className={styles.SummaryTitle} itemProp="headline">{currentCard.title}</h2>
          <div
            className={styles.SummaryContent}
            itemProp="description"
            dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
          />
          <div className={styles.SummaryFooter}>
            <Button
              text="Read More"
              backgroundColor="var(--electric-blue)"
              textColor="var(--rich-black)"
              onClick={() => console.log("Read more clicked")}
              aria-label={`Read more about ${currentCard.title}`}
            />
          </div>
        </div>
      </summary>

      {/* Video Ads (Right) */}
      <aside className={styles.VideoAds} aria-label="Featured videos">
        <h3 className={styles.SummaryTitle}>Featured</h3>
        <div className={styles.VideoContainer}>
          <VideoPlayer src="https://videos.pexels.com/video-files/5057524/5057524-uhd_1440_2560_25fps.mp4" />
          <VideoPlayer src="https://videos.pexels.com/video-files/5926065/5926065-uhd_1440_2560_24fps.mp4" />
        </div>
      </aside>
    </div>
  );
}

export default memo(Hero);