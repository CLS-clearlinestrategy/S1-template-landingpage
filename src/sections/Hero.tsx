import { siteConfig } from "@/config/siteConfig";
import { useParallax } from "@/hooks/useParallax";
import RevealBlock from "@/components/core/RevealBlock";
import { BackgroundGif } from "@/components/core/BackgroundGif";

const Hero = () => {
  const { hero } = siteConfig;
  const { ref: contentRef, offset: contentOffset } = useParallax(0.12);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      <BackgroundGif>
        {hero.parallaxLayers.map((layer, i) => {
          const { ref, offset } = useParallax(layer.speed);
          return (
            <div
              key={i}
              ref={ref}
              className={`absolute select-none pointer-events-none ${layer.className ?? ""}`}
              style={{ transform: `translateY(${offset}px)` }}
              aria-hidden="true"
            >
              {layer.content}
            </div>
          );
        })}

        {/* Main content */}
        <div
          ref={contentRef}
          style={{ transform: `translateY(${contentOffset}px)` }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <RevealBlock>
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-medium glass-glow text-primary">
              {hero.badge}
            </span>
          </RevealBlock>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            {hero.title}{" "}
            <span className="text-primary">{hero.highlight}</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={hero.ctaPrimaryHref}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_hsla(145,65%,52%,0.3)]"
            >
              {hero.ctaPrimary}
            </a>
            <a
              href={hero.ctaSecondaryHref}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg glass-subtle text-foreground font-semibold hover:bg-muted/50 transition-colors"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </BackgroundGif>
    </section>
  );
};

export default Hero;
