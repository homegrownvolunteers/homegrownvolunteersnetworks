import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { MembershipTierCard } from "@/components/shared/MembershipTierCard";
import { SubcategoryDetailModal } from "@/components/shared/SubcategoryDetailModal";
import { CULTURE_SUBCATEGORIES, MEMBERSHIP_TIERS } from "@/lib/constants";
import { CULTURE_DETAILS } from "@/lib/subcategory-details";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/useParallax";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { cn } from "@/lib/utils";

export default function Culture() {
  const heroParallax = useParallax(0.15);
  const catStagger = useStaggerReveal(CULTURE_SUBCATEGORIES.length, 60);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/10 relative overflow-hidden">
        <div ref={heroParallax.ref} className="absolute inset-0 opacity-5" style={{ transform: `translateY(${heroParallax.offset}px)` }} />
        <div className="container text-center relative z-10">
          <span className="text-6xl mb-4 block animate-float">🎭</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 opacity-0 animate-hero-text">Cultural Initiatives</h1>
          <p className="text-lg text-primary font-medium mb-2 opacity-0 animate-blur-in" style={{ animationDelay: "0.15s" }}>From Our Roots, We Rise</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-blur-in" style={{ animationDelay: "0.2s" }}>
            Preserving heritage, celebrating traditions, and safeguarding indigenous knowledge for future generations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeading title="Cultural Domains" subtitle="Click any domain to explore and get involved in preservation efforts." />
          <div ref={catStagger.ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {CULTURE_SUBCATEGORIES.map((cat, i) => (
              <div key={cat} className={cn("opacity-0", catStagger.visibleItems[i] && "animate-stagger-in")}>
                <CategoryCard title={cat} delay={0} onClick={() => setSelectedCat(cat)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container">
          <SectionHeading title="Join the Cultural Network" subtitle="Become part of the movement to preserve and celebrate our heritage." />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            {MEMBERSHIP_TIERS.map((tier) => (
              <MembershipTierCard key={tier.id} {...tier} popular={tier.id === "supporter"} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/membership"><Button size="lg">Apply for Membership</Button></Link>
          </div>
        </div>
      </section>

      <SubcategoryDetailModal
        open={!!selectedCat}
        onOpenChange={(open) => !open && setSelectedCat(null)}
        detail={selectedCat ? CULTURE_DETAILS[selectedCat] || null : null}
      />
    </Layout>
  );
}
