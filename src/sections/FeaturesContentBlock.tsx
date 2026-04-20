import { FeaturesBlockConfig } from "@/config/siteConfig";
import RevealBlock from "@/components/core/RevealBlock";
import SplitText from "@/components/core/SplitText";
import {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Layers, Shield, Sparkles, Rocket, Palette, Code2, BarChart3, Globe, Lock,
};

interface FeaturesContentBlockProps {
  data: FeaturesBlockConfig;
}

const FeaturesContentBlock = ({ data }: FeaturesContentBlockProps) => {
  return (
    <section id={data.id} className="py-20 md:py-28">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-start gap-12 md:gap-16">
        {/* Left: Text */}
        <RevealBlock className="flex-1 space-y-6 md:sticky md:top-32">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
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
              textAlign="left"
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
                textAlign="left"
              />
            )}
          </h2>
          {data.description && (
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data.description}
            </p>
          )}
        </RevealBlock>

        {/* Right: Feature grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {data.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <RevealBlock key={i} delay={i * 100}>
                <div className="group glass-subtle rounded-2xl p-5 hover:glass-strong transition-all duration-500">
                  {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesContentBlock;
