import { useEffect, useRef, useState, useCallback } from "react";

export interface ScrollVideoConfig {
  /** Smoothing factor 0–1 (lower = smoother, higher = snappier). Default: 0.08 */
  smoothing?: number;
  /** Whether the hook is disabled. Default: false */
  disabled?: boolean;
}

export interface ScrollVideoReturn {
  /** Ref to attach to the outer scroll-height container (e.g. h-[300vh]) */
  containerRef: React.RefObject<HTMLElement>;
  /** Ref to attach to the <video> element */
  videoRef: React.RefObject<HTMLVideoElement>;
  /** Whether the video metadata has loaded and is ready to scrub */
  isReady: boolean;
  /** Current scroll progress 0–1 within the container */
  progress: number;
}

/**
 * Scroll-controlled video scrubbing hook.
 *
 * Fetches the video source into an in-memory Blob for jank-free seeking,
 * then smoothly maps scroll progress within a container to `video.currentTime`.
 *
 * Uses `requestAnimationFrame` + lerp for butter-smooth interpolation
 * consistent with the project's existing rAF patterns.
 */
export function useScrollVideo(
  src: string,
  config: ScrollVideoConfig = {}
): ScrollVideoReturn {
  const { smoothing = 0.08, disabled = false } = config;

  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  /* Internal animation state (not exposed, avoids re-renders) */
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef(0);

  /* ── Blob preload ── */
  useEffect(() => {
    if (disabled || !src) return;

    let revoked = false;
    const loadVideo = async () => {
      try {
        const res = await fetch(src);
        const blob = await res.blob();
        if (videoRef.current && !revoked) {
          videoRef.current.src = URL.createObjectURL(blob);
        }
      } catch (err) {
        console.error("[useScrollVideo] Failed to preload video:", err);
      }
    };

    loadVideo();

    return () => {
      revoked = true;
      /* Revoke blob URL on unmount */
      if (videoRef.current?.src?.startsWith("blob:")) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, [src, disabled]);

  /* ── Metadata ready ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || disabled) return;

    const onLoaded = () => setIsReady(true);
    video.addEventListener("loadedmetadata", onLoaded);
    /* Handle already-loaded case */
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setIsReady(true);
    }

    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, [disabled]);

  /* ── Scroll → progress calculation ── */
  const updateTarget = useCallback(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const rect = container.getBoundingClientRect();
    const scrollableHeight = rect.height - window.innerHeight;

    if (scrollableHeight <= 0) {
      targetProgress.current = 0;
      return;
    }

    /* How far the top edge has scrolled past the viewport top */
    const scrolled = -rect.top;
    const raw = scrolled / scrollableHeight;
    targetProgress.current = Math.max(0, Math.min(1, raw));
  }, [disabled]);

  /* ── rAF interpolation loop ── */
  useEffect(() => {
    if (disabled) return;

    const tick = () => {
      /* Lerp current → target */
      currentProgress.current +=
        (targetProgress.current - currentProgress.current) * smoothing;

      /* Snap when close enough to avoid perpetual animation */
      if (Math.abs(targetProgress.current - currentProgress.current) < 0.0005) {
        currentProgress.current = targetProgress.current;
      }

      /* Apply to video */
      const video = videoRef.current;
      if (video && Number.isFinite(video.duration) && isReady) {
        video.currentTime = currentProgress.current * video.duration;
      }

      setProgress(currentProgress.current);
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId.current);
  }, [smoothing, disabled, isReady]);

  /* ── Scroll + Resize listeners ── */
  useEffect(() => {
    if (disabled) return;

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    updateTarget();

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, [updateTarget, disabled]);

  return { containerRef, videoRef, isReady, progress };
}
