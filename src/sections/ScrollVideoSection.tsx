import { siteConfig } from "@/config/siteConfig";
import ScrollVideo from "@/components/core/ScrollVideo";
import RevealBlock from "@/components/core/RevealBlock";

const ScrollVideoSection = () => {
  const { scrollVideo } = siteConfig;

  return (
    <section id="scroll-video">
      <ScrollVideo
        src={scrollVideo.src}
        scrollHeight={scrollVideo.scrollHeight}
        videoOpacity={scrollVideo.videoOpacity}
      >
        {(progress) => {
          /* First slide: visible 0–30%, fades out 30–50% */
          const firstOpacity =
            progress < 0.3 ? 1 : progress > 0.5 ? 0 : 1 - (progress - 0.3) / 0.2;
          const firstY = progress < 0.3 ? 0 : -(progress - 0.3) * 250;

          /* Second slide: fades in 50–70%, stays 70–100% */
          const secondOpacity =
            progress < 0.5 ? 0 : progress > 0.7 ? 1 : (progress - 0.5) / 0.2;
          const secondY =
            progress < 0.5 ? 60 : progress > 0.7 ? 0 : 60 * (1 - (progress - 0.5) / 0.2);

          return (
            <>
              {/* ── Slide 1 ── */}
              {scrollVideo.slides[0] && (
                <div
                  className="absolute inset-0 z-10 flex items-center pointer-events-none"
                  style={{
                    opacity: firstOpacity,
                    transform: `translateY(${firstY}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12 w-full">
                      <div className="flex flex-col gap-6">
                        <RevealBlock>
                          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-foreground">
                            {scrollVideo.slides[0].title}{" "}
                            {scrollVideo.slides[0].highlight && (
                              <span className="text-primary">
                                {scrollVideo.slides[0].highlight}
                              </span>
                            )}
                          </h2>
                        </RevealBlock>

                        {scrollVideo.slides[0].description && (
                          <RevealBlock delay={150}>
                            <p className="text-lg text-muted-foreground max-w-[45ch]">
                              {scrollVideo.slides[0].description}
                            </p>
                          </RevealBlock>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Slide 2 ── */}
              {scrollVideo.slides[1] && (
                <div
                  className="absolute inset-0 z-10 flex items-center pointer-events-none"
                  style={{
                    opacity: secondOpacity,
                    transform: `translateY(${secondY}px)`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                    <div className="flex flex-col gap-6 max-w-3xl">
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-foreground">
                        {scrollVideo.slides[1].title}
                        {scrollVideo.slides[1].highlight && (
                          <span className="text-primary">
                            {" "}{scrollVideo.slides[1].highlight}
                          </span>
                        )}
                      </h2>

                      {scrollVideo.slides[1].description && (
                        <p className="text-lg text-muted-foreground max-w-[45ch]">
                          {scrollVideo.slides[1].description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        }}
      </ScrollVideo>
    </section>
  );
};

export default ScrollVideoSection;
