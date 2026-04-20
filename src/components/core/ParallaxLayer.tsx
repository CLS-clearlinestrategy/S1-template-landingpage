import { useParallax } from "@/hooks/useParallax";

interface ParallaxLayerProps {
  speed?: number;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const ParallaxLayer = ({
  speed = 0.1,
  children,
  className = "",
  disabled = false,
}: ParallaxLayerProps) => {
  const { ref, offset } = useParallax({ speed, disabled });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
