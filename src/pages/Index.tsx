import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatsCounter } from "@/components/shared/StatsCounter";
import { Layout } from "@/components/layout/Layout";
import { PROGRAMS, SHOP_CATEGORIES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useParallax } from "@/hooks/useParallax";
import { Play, ArrowRight, Sprout, Palette, Drama, Heart, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const heroParallax = useParallax(0.2);
  const pillarsStagger = useStaggerReveal(3, 150);
  const sectorsStagger = useStaggerReveal(SECTORS.length, 150);
  const productsStagger = useStaggerReveal(FEATURED_PRODUCTS.length, 100);
  const [nlEmail, setNlEmail] = useState("");
  const [nlLoading, setNlLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert([{ email: nlEmail }]);
    if (error?.code === "23505") {
      toast.info("You're already subscribed!");
    } else if (error) {
      toast.error("Failed to subscribe. Try again.");
    } else {
      toast.success("Subscribed! Welcome to the network.");
    }
    setNlEmail("");
    setNlLoading(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.15),transparent_60%)]" />
        <div ref={heroParallax.ref} className="absolute inset-0 opacity-[0.03]" style={{ transform: `translateY(${heroParallax.offset}px)` }}>
          <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,hsl(var(--primary)/0.15)_35px,hsl(var(--primary)/0.15)_36px)]" />
        </div>
        <div className="absolute top-20 left-[10%] text-7xl opacity-[0.07] animate-float">🌱</div>
        <div className="absolute bottom-32 right-[8%] text-6xl opacity-[0.07] animate-float" style={{ animationDelay: "1s" }}>🎨</div>
        <div className="absolute top-[35%] right-[20%] text-5xl opacity-[0.07] animate-float" style={{ animationDelay: "2s" }}>🎭</div>
        <div className="absolute bottom-[20%] left-[15%] text-4xl opacity-[0.07] animate-float" style={{ animationDelay: "3s" }}>🤝</div>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="container relative z-10 text-center py-20 px-4">
          <div ref={heroRef.ref}>
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-5 py-2 rounded-full mb-8 opacity-0 animate-blur-in border border-primary/20" style={{ animationDelay: "0.1s" }}>
              From Our Roots, We Rise 🌱
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-[0.95] mb-8 max-w-5xl mx-auto opacity-0 animate-hero-text" style={{ animationDelay: "0.2s" }}>
              Recreating{" "}
              <span className="relative inline-block">
                <span className="text-primary">Proud</span>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/40 rounded-full" />
              </span>
              , Resilient,{" "}
              <span className="relative inline-block">
                <span className="text-gradient">Thriving</span>
              </span>
              {" "}Local Communities
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-blur-in font-light" style={{ animationDelay: "0.5s" }}>
              Mobilizing people, culture, and local knowledge to build community-driven solutions through agriculture, arts, and culture. From our roots, we rise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up" style={{ animationDelay: "0.7s" }}>
              <Link to="/membership">
                <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/25">
                  Join the Network <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/tv">
                <Button size="lg" variant="outline" className="text-base px-8 h-12 backdrop-blur-sm">
                  <Play className="mr-2 h-4 w-4" /> Watch Homegrown TV
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="lg" variant="secondary" className="text-base px-8 h-12">
                  <Heart className="mr-2 h-4 w-4" /> Support Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-auto fill-card">
            <path d="M0,40 C360,80 720,0 1440,40 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 bg-card">
        <div className="container">
          <SectionHeading title="Rooted in Community" subtitle="Inspired by the Harambee spirit, we unite agriculture, arts, and culture to build thriving local economies." />
          <div ref={pillarsStagger.ref} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🌱", title: "Agriculture", desc: "Sustainable farming, food security, and indigenous knowledge preservation.", href: "/agriculture" },
              { icon: "🎭", title: "Culture", desc: "Heritage documentation, language preservation, and traditional arts.", href: "/culture" },
              { icon: "🎨", title: "Arts", desc: "Creative economy, artist empowerment, and community expression.", href: "/sanaa-arts" },
            ].map((pillar, i) => (
              <Link key={pillar.title} to={pillar.href}>
                <div className={cn("text-center p-8 rounded-2xl bg-background hover-lift border border-border/50 opacity-0 cursor-pointer group", pillarsStagger.visibleItems[i] && "animate-stagger-in")}>
                  <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${i * 0.7}s` }}>{pillar.icon}</div>
                  <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm">{pillar.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Gateway */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Become Part of the Movement" subtitle="Choose your path and join a network of changemakers transforming Kenya from the roots." />
          <div ref={sectorsStagger.ref} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SECTORS.map((sector, i) => (
              <Link key={sector.href} to={sector.href}>
                <div className={cn("group relative overflow-hidden rounded-2xl border-2 border-border p-8 text-center transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-2xl bg-card opacity-0", sectorsStagger.visibleItems[i] && "animate-stagger-in")}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{sector.icon}</div>
                    <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">{sector.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{sector.description}</p>
                    <Button variant="outline" size="sm">Join Now <ArrowRight className="ml-1 h-3 w-3" /></Button>
                  </div>
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
              <p className="text-muted-foreground mb-6">Watch inspiring stories of farmers, artists, and cultural bearers transforming their communities across Kenya.</p>
              <Link to="/tv"><Button size="lg"><Play className="mr-2 h-4 w-4" /> Watch Now</Button></Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <YouTubeEmbed videoId="kvM04D1Ekqk" title="Makena Textiles" />
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
          <SectionHeading title="From Our Community" subtitle="Discover handcrafted art, artifacts, and creations by local artists." />
          <div ref={productsStagger.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
            {FEATURED_PRODUCTS.map((product, i) => (
              <div key={product.id} className={cn("group rounded-xl border bg-card overflow-hidden hover-lift opacity-0", productsStagger.visibleItems[i] && "animate-stagger-in")}>
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-4xl opacity-30 group-hover:scale-110 transition-transform duration-300">🎨</span>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                  <p className="text-primary font-bold">KES {product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/shop"><Button variant="outline" size="lg">Visit Our Shop <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-card border-t">
        <div className="container max-w-xl text-center">
          <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-heading font-bold mb-2">Stay Connected</h2>
          <p className="text-muted-foreground mb-6 text-sm">Get updates on community stories, events, and opportunities.</p>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <Input type="email" placeholder="Your email address" value={nlEmail} onChange={(e) => setNlEmail(e.target.value)} required className="flex-1" />
            <Button type="submit" disabled={nlLoading}>{nlLoading ? "..." : "Subscribe"}</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
