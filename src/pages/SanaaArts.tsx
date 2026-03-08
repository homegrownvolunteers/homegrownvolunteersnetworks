import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { MembershipTierCard } from "@/components/shared/MembershipTierCard";
import { ARTS_SUBCATEGORIES, MEMBERSHIP_TIERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/useParallax";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { cn } from "@/lib/utils";

export default function SanaaArts() {
  const heroParallax = useParallax(0.15);
  const catStagger = useStaggerReveal(ARTS_SUBCATEGORIES.length, 60);
  const artistStagger = useStaggerReveal(4, 150);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-primary/10 relative overflow-hidden">
        <div
          ref={heroParallax.ref}
          className="absolute inset-0 opacity-5"
          style={{ transform: `translateY(${heroParallax.offset}px)` }}
        />
        <div className="container text-center relative z-10">
          <span className="text-6xl mb-4 block animate-float">🎨</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 opacity-0 animate-hero-text">Sanaa Arts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-blur-in" style={{ animationDelay: "0.2s" }}>
            A vibrant community of artists, performers, and creatives building Kenya's creative economy.
          </p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Art Disciplines" subtitle="Explore the diverse creative fields within our network." />
          <div ref={catStagger.ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {ARTS_SUBCATEGORIES.map((cat, i) => (
              <div key={cat} className={cn("opacity-0", catStagger.visibleItems[i] && "animate-stagger-in")}>
                <CategoryCard title={cat} delay={0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-20 bg-card">
        <div className="container">
          <SectionHeading title="Join Sanaa Arts" subtitle="Choose a membership tier that fits your journey." />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            {MEMBERSHIP_TIERS.map((tier) => (
              <MembershipTierCard key={tier.id} {...tier} popular={tier.id === "supporter"} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/membership">
              <Button size="lg">Apply for Membership</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Featured Artists" subtitle="Meet some of our talented community members." />
          <div ref={artistStagger.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "text-center group opacity-0",
                  artistStagger.visibleItems[i - 1] && "animate-stagger-in"
                )}
              >
                <div className="aspect-square bg-muted rounded-full mb-3 flex items-center justify-center mx-auto w-32 h-32 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-xl">
                  <span className="text-3xl opacity-30">👤</span>
                </div>
                <h4 className="font-medium group-hover:text-primary transition-colors">Artist Name</h4>
                <p className="text-sm text-muted-foreground">Fine Arts</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
