import { useEffect, useRef, useState } from "react";

export function useHeroVisibility(threshold: number = 0.3) {
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { heroRef, isHeroVisible };
}
