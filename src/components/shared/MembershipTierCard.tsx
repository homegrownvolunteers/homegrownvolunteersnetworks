import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface MembershipTierCardProps {
  name: string;
  price: number;
  currency?: string;
  benefits: string[];
  popular?: boolean;
  onSelect?: () => void;
  selected?: boolean;
}

export function MembershipTierCard({ name, price, currency = "KES", benefits, popular, onSelect, selected }: MembershipTierCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border-2 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
        "bg-card cursor-pointer",
        popular && "border-primary shadow-lg scale-105",
        selected && "border-primary ring-2 ring-primary/30",
        !popular && !selected && "border-border hover:border-primary/40"
      )}
      style={{ perspective: "1000px" }}
      onClick={onSelect}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="font-heading font-bold text-xl mb-2">{name}</h3>
      <div className="mb-4">
        {price === 0 ? (
          <span className="text-3xl font-bold text-primary">Free</span>
        ) : (
          <>
            <span className="text-3xl font-bold text-primary">{currency} {price.toLocaleString()}</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </>
        )}
      </div>
      <ul className="space-y-2 mb-6">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Button
        className="w-full"
        variant={popular || selected ? "default" : "outline"}
        onClick={onSelect}
      >
        {selected ? "Selected" : "Choose Plan"}
      </Button>
    </div>
  );
}
