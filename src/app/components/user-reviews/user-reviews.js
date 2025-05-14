import styles from "./user-reviews.module.css";
import { useMemo } from "react";
import ReviewsData from "../../data/user-reviews.json"; // ✅ Import from JSON file

export default function UserReviews() {
  const scrollingReviews = useMemo(() => [...ReviewsData, ...ReviewsData], []);

  return (
    <section className={styles.UserReviewsSection} aria-label="Customer testimonials">
      <h2 className={styles.SectionTitle}>Voices of Our Community</h2>
      <div className={styles.CarouselWrapper}>
        <div className={styles.CarouselTrack}>
          {scrollingReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <article className={styles.ReviewCard}>
      <img
        src={review.userImage}
        alt={`${review.userName}'s profile`}
        className={styles.UserImage}
        width="70"
        height="70"
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/70';
          e.target.alt = 'Default profile image';
        }}
      />
      <h3 className={styles.UserName}>{review.userName}</h3>
      <p className={styles.ReviewSummary}>{review.reviewSummary}</p>
    </article>
  );
}


