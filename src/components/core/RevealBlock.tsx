import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealBlock = ({
  children,
  className = "",
  delay = 0,
}: RevealBlockProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default RevealBlock;
