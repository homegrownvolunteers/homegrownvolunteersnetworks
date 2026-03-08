import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { MembershipTierCard } from "@/components/shared/MembershipTierCard";
import { ARTS_SUBCATEGORIES, MEMBERSHIP_TIERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SanaaArts() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-primary/10 relative overflow-hidden">
        <div className="container text-center relative z-10">
          <span className="text-6xl mb-4 block">🎨</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Sanaa Arts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A vibrant community of artists, performers, and creatives building Kenya's creative economy.
          </p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Art Disciplines" subtitle="Explore the diverse creative fields within our network." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {ARTS_SUBCATEGORIES.map((cat, i) => (
              <CategoryCard key={cat} title={cat} delay={i} />
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

      {/* Featured Artists placeholder */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Featured Artists" subtitle="Meet some of our talented community members." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="aspect-square bg-muted rounded-full mb-3 flex items-center justify-center mx-auto w-32 h-32">
                  <span className="text-3xl opacity-30">👤</span>
                </div>
                <h4 className="font-medium">Artist Name</h4>
                <p className="text-sm text-muted-foreground">Fine Arts</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
