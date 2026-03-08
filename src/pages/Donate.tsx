import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DONATION_TIERS } from "@/lib/constants";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Sprout, Palette, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { cn } from "@/lib/utils";

const IMPACT_AREAS = [
  { icon: Sprout, title: "Agriculture", desc: "Training farmers in organic, sustainable methods." },
  { icon: Palette, title: "Arts & Culture", desc: "Supporting artists and preserving heritage." },
  { icon: Users, title: "Community", desc: "Empowering youth volunteers and local leaders." },
];

export default function Donate() {
  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [data, setData] = useState({ donor_name: "", donor_email: "", donor_phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const impactStagger = useStaggerReveal(IMPACT_AREAS.length, 150);
  const heroRef = useScrollReveal();

  const finalAmount = amount || Number(custom) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) { toast.error("Please select or enter an amount."); return; }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("donations").insert([{ ...data, amount: finalAmount, frequency }]);
      if (error) throw error;
      toast.success("Thank you for your generous donation! Payment processing coming soon.");
      setAmount(null);
      setCustom("");
      setData({ donor_name: "", donor_email: "", donor_phone: "", message: "" });
    } catch { toast.error("Failed to submit."); }
    setSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute top-10 right-10 text-6xl opacity-10 animate-float">❤️</div>
        <div className="absolute bottom-20 left-10 text-5xl opacity-10 animate-float" style={{ animationDelay: "1.5s" }}>🌱</div>
        <div ref={heroRef.ref} className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 opacity-0 animate-hero-text">
            Support Our <span className="text-primary">Mission</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-blur-in" style={{ animationDelay: "0.3s" }}>
            Every contribution nurtures a farmer, inspires an artist, and preserves a tradition. Together, we grow.
          </p>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16">
        <div className="container">
          <SectionHeading title="Where Your Donation Goes" subtitle="Your support directly impacts three pillars of community transformation." />
          <div ref={impactStagger.ref} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {IMPACT_AREAS.map((area, i) => (
              <div
                key={area.title}
                className={cn(
                  "text-center p-8 rounded-2xl bg-card border hover-lift opacity-0",
                  impactStagger.visibleItems[i] && "animate-stagger-in"
                )}
              >
                <area.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate Form */}
      <section className="py-20 bg-card">
        <div className="container max-w-lg">
          <SectionHeading title="Make a Donation" subtitle="Choose an amount or enter your own." />
          <form onSubmit={handleSubmit} className="space-y-4 bg-background rounded-2xl border p-8">
            <div className="grid grid-cols-2 gap-3">
              {DONATION_TIERS.map((tier) => (
                <Button
                  key={tier.amount}
                  type="button"
                  variant={amount === tier.amount ? "default" : "outline"}
                  onClick={() => { setAmount(tier.amount); setCustom(""); }}
                  className="h-auto py-3 flex flex-col"
                >
                  <span className="font-bold">{tier.label}</span>
                  <span className="text-xs opacity-70 font-normal">{tier.impact}</span>
                </Button>
              ))}
            </div>
            <Input type="number" placeholder="Custom amount (KES)" value={custom} onChange={(e) => { setCustom(e.target.value); setAmount(null); }} />
            {finalAmount > 0 && (
              <p className="text-sm text-primary font-medium text-center">
                Donating KES {finalAmount.toLocaleString()} — {DONATION_TIERS.find((t) => t.amount <= finalAmount)?.impact || "Every shilling makes a difference!"}
              </p>
            )}
            <div className="flex gap-2">
              <Button type="button" variant={frequency === "one_time" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setFrequency("one_time")}>One-time</Button>
              <Button type="button" variant={frequency === "monthly" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setFrequency("monthly")}>Monthly</Button>
            </div>
            <Input placeholder="Your Name" value={data.donor_name} onChange={(e) => setData({ ...data, donor_name: e.target.value })} required />
            <Input type="email" placeholder="Email" value={data.donor_email} onChange={(e) => setData({ ...data, donor_email: e.target.value })} required />
            <Input placeholder="Phone (optional)" value={data.donor_phone} onChange={(e) => setData({ ...data, donor_phone: e.target.value })} />
            <Textarea placeholder="Message (optional)" value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} />
            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              <Heart className="mr-2 h-4 w-4" /> {submitting ? "Processing..." : `Donate KES ${finalAmount.toLocaleString()}`}
            </Button>
            <p className="text-xs text-center text-muted-foreground">M-Pesa & card payment coming soon</p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
