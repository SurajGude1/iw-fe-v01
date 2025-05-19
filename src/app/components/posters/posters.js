import styles from "./posters.module.css";
import Image from "next/image";
import Button from "../global/buttons/button";
import postersData from "../../data/posters-data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";

export default function Posters() {
  // Split posters into chunks of 10 for each carousel
  const chunkSize = 10;
  const posterChunks = [];
  const carouselRefs = useRef([]);

  for (let i = 0; i < postersData.length; i += chunkSize) {
    posterChunks.push(postersData.slice(i, i + chunkSize));
  }

  const [scrollStates, setScrollStates] = useState(
    posterChunks.map(() => ({
      isAtStart: true,
      isAtEnd: false,
    }))
  );

  useEffect(() => {
    const handleScroll = (index) => {
      const element = carouselRefs.current[index];
      if (element) {
        const isAtStart = element.scrollLeft === 0;
        const isAtEnd =
          element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;

        setScrollStates(prev => {
          const newStates = [...prev];
          newStates[index] = { isAtStart, isAtEnd };
          return newStates;
        });
      }
    };

    // Add scroll event listeners to all carousels
    carouselRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.addEventListener('scroll', () => handleScroll(index));
        // Initial check
        handleScroll(index);
      }
    });

    return () => {
      carouselRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.removeEventListener('scroll', () => handleScroll(index));
        }
      });
    };
  }, []);

  const scrollCarousel = (index, direction) => {
    const element = carouselRefs.current[index];
    if (element) {
      const scrollAmount = direction === 'left' ? -element.clientWidth : element.clientWidth;
      element.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.PostersWrapper}>
      <p className={styles.SectionTitle}>Trending now</p>

      {posterChunks.map((chunk, index) => (
        <div key={`carousel-${index}`} className={styles.CarouselContainer}>
          {!scrollStates[index]?.isAtStart && (
            <button
              className={`${styles.NavButton} ${styles.LeftButton}`}
              onClick={() => scrollCarousel(index, 'left')}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>
          )}

          <div
            ref={el => carouselRefs.current[index] = el}
            className={styles.Carousel}
          >
            {chunk.map((poster) => (
              <div key={poster.id} className={styles.Poster}>
                <div className={styles.PosterContent}>
                  <Image
                    src={poster.imageUrl}
                    alt={poster.altText}
                    fill
                    className={styles.PosterImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={styles.PosterText}>{poster.title}</div>
                  <div className={styles.ButtonContainer}>
                    <Button
                      text={poster.buttonText}
                      backgroundColor="var(--off-white)"
                      textColor="var(--rich-black)"
                      hoverEffect={false}
                      className={styles.KnowMoreBtn}
                      onClick={() => console.log(`${poster.title} clicked`)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!scrollStates[index]?.isAtEnd && (
            <button
              className={`${styles.NavButton} ${styles.RightButton}`}
              onClick={() => scrollCarousel(index, 'right')}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}