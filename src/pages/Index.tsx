import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatsCounter } from "@/components/shared/StatsCounter";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { Layout } from "@/components/layout/Layout";
import { PROGRAMS, SHOP_CATEGORIES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Play, ArrowRight, Sprout, Palette, Drama } from "lucide-react";

const STATS = [
  { value: 2500, label: "Volunteers" },
  { value: 45, label: "Communities" },
  { value: 300, label: "Stories Documented" },
  { value: 12, label: "Programs" },
];

const SECTORS = [
  { title: "Agriculture Network", description: "Join farmers, experts, and advocates building food sovereignty.", icon: "🌱", href: "/agriculture", iconComp: Sprout },
  { title: "Sanaa Arts Community", description: "Connect with artists, performers, and creatives across disciplines.", icon: "🎨", href: "/sanaa-arts", iconComp: Palette },
  { title: "Cultural Initiatives", description: "Preserve heritage, traditions, and indigenous knowledge systems.", icon: "🎭", href: "/culture", iconComp: Drama },
];

const FEATURED_PRODUCTS = [
  { id: "1", name: "Woven Basket", price: 2500, category: "Crafts" },
  { id: "2", name: "Acrylic Landscape", price: 15000, category: "Paintings" },
  { id: "3", name: "Beaded Necklace", price: 3500, category: "Crafts" },
  { id: "4", name: "Clay Sculpture", price: 8000, category: "Sculptures" },
];

export default function Index() {
  const heroRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5" />
        <div className="container relative z-10 text-center py-20 px-4">
          <div ref={heroRef.ref} className={`opacity-0 ${heroRef.isVisible ? "animate-fade-up opacity-100" : ""}`}>
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              From Our Roots, We Rise 🌱
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 max-w-4xl mx-auto">
              Recreating Proud, Resilient, <span className="text-primary">Thriving</span> Local Communities
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A Kenyan community-driven movement celebrating local agriculture, arts, and culture. Together, we grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership">
                <Button size="lg" className="text-base px-8">
                  Join the Network <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/tv">
                <Button size="lg" variant="outline" className="text-base px-8">
                  <Play className="mr-2 h-4 w-4" /> Watch Homegrown TV
                </Button>
              </Link>
              <Link to="/programs">
                <Button size="lg" variant="secondary" className="text-base px-8">
                  Explore Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 bg-card">
        <div className="container">
          <SectionHeading
            title="Rooted in Community"
            subtitle="Inspired by the Harambee spirit, we unite agriculture, arts, and culture to build thriving local economies."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🌱", title: "Agriculture", desc: "Sustainable farming, food security, and indigenous knowledge preservation." },
              { icon: "🎭", title: "Culture", desc: "Heritage documentation, language preservation, and traditional arts." },
              { icon: "🎨", title: "Arts", desc: "Creative economy, artist empowerment, and community expression." },
            ].map((pillar) => (
              <div key={pillar.title} className="text-center p-6 rounded-xl bg-background hover-lift">
                <div className="text-5xl mb-4">{pillar.icon}</div>
                <h3 className="font-heading font-semibold text-xl mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Gateway */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            title="Become Part of the Movement"
            subtitle="Choose your path and join a network of changemakers transforming Kenya from the roots."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SECTORS.map((sector) => (
              <Link key={sector.href} to={sector.href}>
                <div className="group relative overflow-hidden rounded-2xl border-2 border-border p-8 text-center transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-2xl bg-card">
                  <div className="text-5xl mb-4">{sector.icon}</div>
                  <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">{sector.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{sector.description}</p>
                  <Button variant="outline" size="sm">
                    Join Now <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Homegrown TV Teaser */}
      <section className="py-20 bg-accent/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <SectionHeading title="Homegrown TV" subtitle="Documenting the stories that matter." align="left" />
              <p className="text-muted-foreground mb-6">
                Watch inspiring stories of farmers, artists, and cultural bearers transforming their communities across Kenya.
              </p>
              <Link to="/tv">
                <Button>
                  <Play className="mr-2 h-4 w-4" /> Watch Now
                </Button>
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-video flex items-center justify-center group cursor-pointer hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              <Play className="h-16 w-16 text-primary-foreground bg-primary rounded-full p-4 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Our Impact in Numbers</h2>
          <StatsCounter stats={STATS} />
        </div>
      </section>

      {/* Shop Preview */}
      <section className="py-20">
        <div className="container">
          <SectionHeading
            title="From Our Community"
            subtitle="Discover handcrafted art, artifacts, and creations by local artists."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className="group rounded-xl border bg-card overflow-hidden hover-lift">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-4xl opacity-30">🎨</span>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                  <p className="text-primary font-bold">KES {product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                Visit Our Shop <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
