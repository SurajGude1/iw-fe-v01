"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./loader.module.css";

const ballColors = [
  "--off-white",
  "--verdigris",
  "--electric-blue",
  "--light-sky-blue",
  "--charcoal"
];
const directions = [-1, 1, -1, 1, -1]; // Alternate movement directions

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef();

  const ballCount = 5;
  const amplitude = 30; // Reduced amplitude for smaller screens
  const speed = 0.0025;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    const draw = (time) => {
      const t = time - startTime;

      // Soft fade for trailing effect with partial transparency
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate responsive values
      const ballSize = Math.max(4, Math.min(8, window.innerWidth * 0.01)); // Ball size between 4-8px
      const ballGap = Math.max(30, Math.min(50, window.innerWidth * 0.05)); // Gap between 30-50px

      for (let i = 0; i < ballCount; i++) {
        const x = canvas.width / 2 - (ballGap * 2) + i * ballGap;
        const direction = directions[i];
        const y = canvas.height / 2 + Math.sin(t * speed + i) * amplitude * direction;

        const color = getComputedStyle(document.documentElement)
          .getPropertyValue(ballColors[i])
          .trim() || "#fff";

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, ballSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    // Hide loader 3.8 seconds after page fully loaded
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 3800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.LoaderWrapper}>
      <canvas className={styles.CanvasOverlay} ref={canvasRef} />
    </div>
  );
}