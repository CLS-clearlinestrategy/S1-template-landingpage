import { useRef, useEffect, useState } from "react";
import ParallaxLayer from "./ParallaxLayer";

interface ParallaxRevealImageProps {
  src: string;
  alt?: string;
  speed?: number;
  className?: string;
}

const ParallaxRevealImage = ({
  src,
  alt = "",
  speed = 0.2,
  className = "",
}: ParallaxRevealImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const update = () => {
      if (!containerRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const rawProgress =
        1 - (rect.top + rect.height) / (windowHeight + rect.height);
      setRevealProgress(Math.max(0, Math.min(1, rawProgress)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* Clip opens from center outward as the element scrolls into view */
  const clip = revealProgress * 50;
  const clipPathString = `inset(${50 - clip}% ${50 - clip}% ${50 - clip}% ${50 - clip}%)`;
  const scale = 1.15 - revealProgress * 0.15;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden rounded-2xl ${className}`}
      style={{
        clipPath: clipPathString,
        transition: "clip-path 0.1s ease-out",
        transform: "translateZ(0)",
      }}
    >
      <ParallaxLayer speed={speed}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.1s ease-out",
          }}
          loading="lazy"
        />
      </ParallaxLayer>
    </div>
  );
};

export default ParallaxRevealImage;
