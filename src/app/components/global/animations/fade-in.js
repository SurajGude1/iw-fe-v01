"use client";
import { useRef, useEffect, useState } from "react";
import styles from "./fade-in.module.css"; // or inline CSS if preferred

export default function FadeInSection({ children }) {
    const domRef = useRef();
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => setVisible(entry.isIntersecting));
            },
            { threshold: 0.1 }
        );

        const node = domRef.current;
        if (node) observer.observe(node);
        return () => node && observer.unobserve(node);
    }, []);

    return (
        <div
            ref={domRef}
            className={`${styles["fade-in-section"]} ${isVisible ? styles["is-visible"] : ""}`}
        >
            {children}
        </div>
    );
}
