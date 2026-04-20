import { ProcessBlockConfig } from "@/config/siteConfig";
import RevealBlock from "@/components/core/RevealBlock";
import SplitText from "@/components/core/SplitText";
import ParallaxLayer from "@/components/core/ParallaxLayer";
import {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock, MessageSquare, PenTool,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock, MessageSquare, PenTool,
};

interface ProcessContentBlockProps {
  data: ProcessBlockConfig;
}

const ProcessContentBlock = ({ data }: ProcessContentBlockProps) => {
  return (
    <section id={data.id} className="relative py-20 md:py-28 overflow-hidden">
      {/* Decorative parallax elements */}
      <ParallaxLayer speed={0.15} className="absolute top-[10%] left-[5%] pointer-events-none select-none">
        <div className="w-72 h-72 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.3} className="absolute bottom-[15%] right-[8%] pointer-events-none select-none">
        <div className="w-56 h-56 rounded-full glass-glow" aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.1} className="absolute top-[55%] left-[70%] pointer-events-none select-none">
        <div className="w-40 h-40 rounded-full bg-secondary/5 blur-2xl" aria-hidden="true" />
      </ParallaxLayer>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <RevealBlock className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            <SplitText
              text={data.title}
              tag="span"
              splitType="words"
              delay={40}
              duration={1}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              className="inline"
              textAlign="center"
            />{" "}
            {data.highlight && (
              <SplitText
                text={data.highlight}
                tag="span"
                splitType="chars"
                delay={35}
                duration={0.9}
                ease="power3.out"
                from={{ opacity: 0, y: 25 }}
                to={{ opacity: 1, y: 0 }}
                className="text-primary inline"
                textAlign="center"
              />
            )}
          </h2>
          {data.description && (
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data.description}
            </p>
          )}
        </RevealBlock>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {data.steps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const isEven = i % 2 === 0;

              return (
                <RevealBlock key={i} delay={i * 150}>
                  <div
                    className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                      <div className="glass-subtle rounded-2xl p-6 hover:glass-strong transition-all duration-500">
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_20px_hsla(var(--primary),0.15)]">
                      {Icon ? (
                        <Icon className="w-5 h-5 text-primary" />
                      ) : (
                        <span className="text-sm font-bold text-primary">
                          {i + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessContentBlock;
