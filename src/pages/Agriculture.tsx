import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { MembershipTierCard } from "@/components/shared/MembershipTierCard";
import { AGRICULTURE_SUBCATEGORIES, MEMBERSHIP_TIERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

export default function Agriculture() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container text-center">
          <span className="text-6xl mb-4 block">🌱</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Agriculture Network</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connecting farmers, experts, and advocates to build sustainable food systems and preserve agricultural heritage.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeading title="Agricultural Fields" subtitle="Find your area of expertise or interest." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {AGRICULTURE_SUBCATEGORIES.map((cat, i) => (
              <CategoryCard key={cat} title={cat} delay={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container">
          <SectionHeading title="Join the Agriculture Network" subtitle="Choose your membership tier." />
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

      {/* Resources */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <SectionHeading title="Resources" subtitle="Free guides and tools for farmers." />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Organic Farming Guide", desc: "A comprehensive guide to transitioning to organic methods." },
              { title: "Seed Saving Handbook", desc: "How to save, store, and share indigenous seeds." },
              { title: "Kitchen Garden Starter", desc: "Start growing food at home with minimal space." },
              { title: "Climate Smart Agriculture", desc: "Adapting farming practices to changing weather patterns." },
            ].map((resource) => (
              <div key={resource.title} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover-lift">
                <Download className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-medium">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
