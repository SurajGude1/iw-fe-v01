'use client';

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

    if (!post) {
        return <div className={styles.BlogWrapper}><p>Post not found</p></div>;
    }

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
                    <span className={styles.Span}>12 min</span> {/* Placeholder, replace with real duration if available */}
                </div>
                <div
                    className={styles.Content}
                    dangerouslySetInnerHTML={{ __html: post.postSummary }}
                />
            </div>
            <div className={styles.Recommended}></div>
        </div>
    );
}
