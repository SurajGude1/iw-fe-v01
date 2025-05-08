import styles from "./posters.module.css";
import Image from "next/image";
import Button from "../global/buttons/button";
import postersData from "../../data/posters-data.json";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Posters() {
  // Split posters into chunks of 10 for each carousel
  const chunkSize = 10;
  const posterChunks = [];

  for (let i = 0; i < postersData.length; i += chunkSize) {
    posterChunks.push(postersData.slice(i, i + chunkSize));
  }

  return (
    <div className={styles.PostersWrapper}>
      <h1 className={styles.PostersTitle}>Posters Section</h1>

      {posterChunks.map((chunk, index) => (
        <div key={`caresol-${index}`} className={styles.Caresol}>
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
      ))}
    </div>
  );
}