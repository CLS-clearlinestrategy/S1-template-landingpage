import { useEffect, useRef, useCallback, useState } from "react";

export interface ParallaxConfig {
  speed?: number;
  direction?: "vertical" | "horizontal";
  disabled?: boolean;
}

export function useParallax(configOrSpeed: number | ParallaxConfig = 0.3) {
  const config: ParallaxConfig =
    typeof configOrSpeed === "number"
      ? { speed: configOrSpeed }
      : configOrSpeed;

  const { speed = 0.3, direction = "vertical", disabled = false } = config;

  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    if (!ref.current || disabled) {
      ticking.current = false;
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const distanceFromCenter = elementCenter - windowHeight / 2;

    /* progress: 0 when element enters bottom, 1 when it exits top */
    const rawProgress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
    setProgress(Math.max(0, Math.min(1, rawProgress)));

    setOffset(distanceFromCenter * speed * -1);
    ticking.current = false;
  }, [speed, disabled]);

  useEffect(() => {
    if (disabled) return;

    const onScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    const onResize = () => {
      update();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId.current);
    };
  }, [update, disabled]);

  return { ref, offset, progress, direction };
}
