import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CategoryCardProps {
  title: string;
  description?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  delay?: number;
}

export function CategoryCard({ title, description, icon, onClick, className, delay = 0 }: CategoryCardProps) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-6 cursor-pointer opacity-0",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30",
        isVisible && "animate-fade-up opacity-100",
        className
      )}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
