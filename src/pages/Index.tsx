import { siteConfig, ContentBlockConfig } from "@/config/siteConfig";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useHeroVisibility } from "@/hooks/useHeroVisibility";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/sections/Hero";
import ContentBlock from "@/sections/ContentBlock";
import VideoContentBlock from "@/sections/VideoContentBlock";
import FeaturesContentBlock from "@/sections/FeaturesContentBlock";
import FAQContentBlock from "@/sections/FAQContentBlock";
import TestimonialsContentBlock from "@/sections/TestimonialsContentBlock";
import LogoBarContentBlock from "@/sections/LogoBarContentBlock";
import ProcessContentBlock from "@/sections/ProcessContentBlock";
import TeamContentBlock from "@/sections/TeamContentBlock";
import StatsContentBlock from "@/sections/StatsContentBlock";
import ExperiencesGrid from "@/sections/ExperiencesGrid";
import ContactForm from "@/sections/ContactForm";
import Footer from "@/components/layout/Footer";
import ScrollVideoSection from "@/sections/ScrollVideoSection";

const renderBlock = (block: ContentBlockConfig) => {
  switch (block.type) {
    case "image":
      return <ContentBlock key={block.id} data={block} />;
    case "video":
      return <VideoContentBlock key={block.id} data={block} />;
    case "features":
      return <FeaturesContentBlock key={block.id} data={block} />;
    case "faq":
      return <FAQContentBlock key={block.id} data={block} />;
    case "testimonials":
      return <TestimonialsContentBlock key={block.id} data={block} />;
    case "logobar":
      return <LogoBarContentBlock key={block.id} data={block} />;
    case "process":
      return <ProcessContentBlock key={block.id} data={block} />;
    case "team":
      return <TeamContentBlock key={block.id} data={block} />;
    case "stats":
      return <StatsContentBlock key={block.id} data={block} />;
  }
};

const Index = () => {
  useSmoothScroll();
  const { heroRef, isHeroVisible } = useHeroVisibility();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isHeroVisible={isHeroVisible} />

      <div ref={heroRef as React.RefObject<HTMLDivElement>}>
        <Hero />
      </div>

      <ScrollVideoSection />

      {siteConfig.contentBlocks.map(renderBlock)}

      <ExperiencesGrid />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
