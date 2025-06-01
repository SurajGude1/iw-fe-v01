'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStopwatch, faShare, faEye } from '@fortawesome/free-solid-svg-icons';

import styles from './page.module.css';
import cardsData from '../../../data/posts-data.json';

config.autoAddCss = false;

export default function Blog() {
    const { id } = useParams();
    const post = cardsData.find(item => item.id.toString() === id);
    const recommendedPosts = cardsData
        .filter(item => item.id.toString() !== id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    if (!post) {
        return <div className={styles.BlogWrapper}><p>Post not found</p></div>;
    }

    // Helper function to create URL-friendly slug from title
    const createSlug = (title) => {
        return title.toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove non-word characters
            .replace(/\s+/g, '-')      // Replace spaces with hyphens
            .replace(/--+/g, '-')      // Replace multiple hyphens with single
            .trim();                   // Trim leading/trailing hyphens
    };

    return (
        <div className={styles.BlogWrapper}>
            <div className={styles.Blog}>
                <p className={styles.Title}>
                    {post.title}
                </p>
                <div className={styles.Actions}>
                    <FontAwesomeIcon icon={faEye} className={styles.Icon} />
                    <span className={styles.Span}>{post.views}</span>
                    <FontAwesomeIcon icon={faHeart} className={styles.Icon} />
                    <span className={styles.Span}>{post.likes}</span>
                    <FontAwesomeIcon icon={faShare} className={styles.Icon} />
                    <span className={styles.Span}>{post.shares}</span>
                    <FontAwesomeIcon icon={faStopwatch} className={styles.Icon} />
                    <span className={styles.Span}>12 min</span>
                </div>
                <div
                    className={styles.Content}
                    dangerouslySetInnerHTML={{ __html: post.postSummary }}
                />
            </div>
            <div className={styles.Recommended}>
                <h3 className={styles.RecommendedHeading}>Recommended Reads</h3>
                {recommendedPosts.map(post => {
                    const postSlug = createSlug(post.title);
                    return (
                        <div key={post.id} className={styles.RecommendedCard}>
                            <Link
                                href={`/explore-articles/${post.id}/${postSlug}`}
                                className={styles.RecommendedLink}
                            >
                                <div className={styles.RecommendedCardContent}>
                                    <div className={styles.RecommendedImageContainer}>
                                        <Image
                                            src={post.thumbnail}
                                            alt={post.title}
                                            fill
                                            className={styles.RecommendedImage}
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <p className={styles.RecommendedTitle}>{post.title}</p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}