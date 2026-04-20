import { FAQBlockConfig } from "@/config/siteConfig";
import { useState } from "react";
import RevealBlock from "@/components/core/RevealBlock";
import SplitText from "@/components/core/SplitText";

interface FAQContentBlockProps {
  data: FAQBlockConfig;
}

const FAQContentBlock = ({ data }: FAQContentBlockProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id={data.id} className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Header */}
        <RevealBlock className="text-center mb-14 max-w-2xl mx-auto">
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

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {data.questions.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <RevealBlock key={i} delay={i * 80}>
                <div className="glass-subtle rounded-xl overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left text-foreground font-medium hover:text-primary transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span
                      className={`ml-4 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQContentBlock;
