import { useScrollVideo, type ScrollVideoConfig } from "@/hooks/useScrollVideo";

interface ScrollVideoProps {
  /** Path or URL to the video file (will be fetched into memory as Blob) */
  src: string;
  /**
   * Content rendered inside the sticky viewport on top of the video.
   * Accepts either static ReactNode or a render-prop `(progress: number) => ReactNode`
   * so consumers can drive overlay animations from scroll progress.
   */
  children?: React.ReactNode | ((progress: number) => React.ReactNode);
  /** Total scroll height as CSS value. Default: "300vh" */
  scrollHeight?: string;
  /** Additional className for the outer scroll-height container */
  className?: string;
  /** Additional className for the sticky viewport wrapper */
  stickyClassName?: string;
  /** Video opacity (0–1). Default: 0.5 */
  videoOpacity?: number;
  /** Whether to show a gradient overlay on top of the video. Default: true */
  gradientOverlay?: boolean;
  /** Scrubbing smoothing config forwarded to useScrollVideo */
  config?: ScrollVideoConfig;
}

/**
 * Scroll-controlled video primitive.
 *
 * Creates a tall scroll container with a sticky viewport that scrubs
 * through video frames as the user scrolls. GPU-accelerated via
 * `will-change: contents` on the video element.
 *
 * Supports render-prop children to expose scroll progress:
 * ```tsx
 * <ScrollVideo src="/my-video.mp4">
 *   {(progress) => (
 *     <div style={{ opacity: progress > 0.5 ? 1 : 0 }}>
 *       <h1>Appears at 50%</h1>
 *     </div>
 *   )}
 * </ScrollVideo>
 * ```
 */
const ScrollVideo = ({
  src,
  children,
  scrollHeight = "300vh",
  className = "",
  stickyClassName = "",
  videoOpacity = 0.5,
  gradientOverlay = true,
  config,
}: ScrollVideoProps) => {
  const { containerRef, videoRef, isReady, progress } = useScrollVideo(src, config);

  const rendered =
    typeof children === "function" ? children(progress) : children;

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`relative ${className}`}
      style={{ height: scrollHeight }}
    >
      <div
        className={`sticky top-0 h-screen overflow-hidden bg-background ${stickyClassName}`}
      >
        {/* Video layer */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: isReady ? videoOpacity : 0,
            willChange: "contents",
          }}
        />

        {/* Optional gradient overlay */}
        {gradientOverlay && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Slotted content */}
        {rendered}
      </div>
    </div>
  );
};

export default ScrollVideo;
