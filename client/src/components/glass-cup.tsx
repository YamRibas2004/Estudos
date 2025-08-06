import { cn } from "@/lib/utils";

interface GlassCupProps {
  fillPercentage: number;
  size?: "small" | "large";
  className?: string;
}

export function GlassCup({ fillPercentage, size = "large", className }: GlassCupProps) {
  const isAchieved = fillPercentage >= 100;
  const clampedPercentage = Math.min(fillPercentage, 100);
  
  return (
    <div className={cn(
      "glass-cup",
      size === "large" ? "glass-cup-large" : "glass-cup-small",
      className
    )}>
      <div 
        className={cn(
          "glass-liquid",
          isAchieved && "achieved"
        )}
        style={{ height: `${clampedPercentage}%` }}
      />
    </div>
  );
}
