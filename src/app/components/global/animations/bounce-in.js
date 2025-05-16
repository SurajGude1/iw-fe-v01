"use client";
import { useRef, useEffect, useState } from "react";
import styles from "./bounce-in.module.css";

export default function BounceInSection({ children }) {
    const domRef = useRef();
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const current = domRef.current;
        if (current) observer.observe(current);
        return () => current && observer.unobserve(current);
    }, []);

    return (
        <div
            ref={domRef}
            className={`${styles.BounceInSection} ${isVisible ? styles.IsVisible : ""
                }`}
        >
            {children}
        </div>
    );
}
