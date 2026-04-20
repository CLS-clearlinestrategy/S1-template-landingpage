import { siteConfig } from "@/config/siteConfig";

interface NavbarProps {
  isHeroVisible: boolean;
}

const Navbar = ({ isHeroVisible }: NavbarProps) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHeroVisible
          ? "bg-transparent"
          : "glass-strong"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#hero" className="text-xl font-bold text-primary font-heading">
          {siteConfig.name}
        </a>
        <div className="hidden md:flex gap-8">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
