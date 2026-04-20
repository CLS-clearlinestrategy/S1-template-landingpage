import { siteConfig } from "@/config/siteConfig";
import { Github, Twitter } from "lucide-react";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Twitter,
};

const Footer = () => {
  const { footer } = siteConfig;

  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">{footer.copyright}</p>
          <p className="text-xs text-muted-foreground/60 mt-1">{footer.tagline}</p>
        </div>

        <div className="flex gap-4">
          {footer.socials.map((s) => {
            const Icon = socialIconMap[s.icon];
            return (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass-subtle flex items-center justify-center text-muted-foreground hover:text-foreground hover:glass-strong transition-all"
                aria-label={s.platform}
              >
                {Icon ? <Icon className="w-4 h-4" /> : s.platform}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
