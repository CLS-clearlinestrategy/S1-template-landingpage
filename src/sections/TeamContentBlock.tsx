import { TeamBlockConfig } from "@/config/siteConfig";
import RevealBlock from "@/components/core/RevealBlock";
import SplitText from "@/components/core/SplitText";
import ParallaxLayer from "@/components/core/ParallaxLayer";

interface TeamContentBlockProps {
  data: TeamBlockConfig;
}

interface TeamCardProps {
  member: TeamBlockConfig["members"][number];
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  return (
    <RevealBlock delay={index * 100}>
      <div className="group glass-subtle rounded-2xl p-5 text-center hover:-translate-y-1 transition-all duration-300">
        <ParallaxLayer speed={0.05} className="relative w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </ParallaxLayer>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {member.role}
        </p>
      </div>
    </RevealBlock>
  );
};

const TeamContentBlock = ({ data }: TeamContentBlockProps) => {
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

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {data.members.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamContentBlock;
