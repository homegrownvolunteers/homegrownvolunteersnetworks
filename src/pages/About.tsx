import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useParallax } from "@/hooks/useParallax";
import { TEAM_MEMBERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const VALUES = [
  { icon: "🤝", title: "Community First", desc: "Every initiative starts and ends with the people." },
  { icon: "🏠", title: "Pride in Identity", desc: "Celebrating what makes our communities unique." },
  { icon: "🎨", title: "Creativity for Change", desc: "Using arts and innovation as tools for transformation." },
  { icon: "🌍", title: "Collaboration", desc: "Together we achieve more than alone." },
];

const TIMELINE = [
  { year: "2022", title: "The Seed is Planted", desc: "HVN founded with a vision to revive the Harambee spirit." },
  { year: "2023", title: "Growing Roots", desc: "First agriculture training programs and arts workshops launched." },
  { year: "2024", title: "Branching Out", desc: "Expanded to 20+ communities. Homegrown TV launched." },
  { year: "2025", title: "Bearing Fruit", desc: "Membership network grows to 2,500+ volunteers across Kenya." },
];

export default function About() {
  const founderRef = useScrollReveal();
  const heroParallax = useParallax(0.15);
  const valuesStagger = useStaggerReveal(VALUES.length, 120);
  const teamStagger = useStaggerReveal(TEAM_MEMBERS.length, 100);
  const timelineStagger = useStaggerReveal(TIMELINE.length, 200);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        <div
          ref={heroParallax.ref}
          className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5"
          style={{ transform: `translateY(${heroParallax.offset}px)` }}
        />
        <div className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 opacity-0 animate-hero-text">Our Story</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-blur-in" style={{ animationDelay: "0.2s" }}>
            Rooted in the belief that strong communities grow from within, Homegrown exists to rediscover, document, celebrate, and amplify local strengths — from indigenous knowledge and cultural practices to creative expression.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="opacity-0 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <SectionHeading title="Our Vision" align="left" />
              <p className="text-muted-foreground">
                Recreating proud, resilient, and thriving local communities. Pride comes from a strong sense of identity and cultural heritage. Resilience comes from communities that can adapt and sustain themselves through their own knowledge and collaboration.
              </p>
            </div>
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <SectionHeading title="Our Mission" align="left" />
              <p className="text-muted-foreground">
                To mobilize volunteers, creatives, and community leaders to promote homegrown solutions in agriculture, culture, and the arts — nurturing the knowledge, talents, and traditions that already exist within communities and elevating them into drivers of progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-card">
        <div className="container">
          <SectionHeading title="Our Core Values" />
          <div ref={valuesStagger.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={cn(
                  "text-center p-6 rounded-xl bg-background hover-lift opacity-0",
                  valuesStagger.visibleItems[i] && "animate-stagger-in"
                )}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{v.icon}</div>
                <h3 className="font-heading font-semibold mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div
            ref={founderRef.ref}
            className={cn("grid md:grid-cols-2 gap-12 items-center opacity-0", founderRef.isVisible && "animate-fade-up opacity-100")}
          >
            <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center overflow-hidden group">
              <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">👤</span>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Hon. Eric Mutwiri Mwirigi</h2>
              <p className="text-primary font-medium mb-4">Founder & Visionary</p>
              <p className="text-muted-foreground mb-4">
                Driven by a deep love for community and a belief in the power of local solutions, Hon. Mwirigi founded the Homegrown Volunteer Network to reconnect Kenyans with their agricultural heritage, artistic talent, and cultural identity.
              </p>
              <p className="text-muted-foreground">
                His vision: every community in Kenya standing proudly on its own roots, thriving through collaboration and creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <SectionHeading title="Meet Our Team" subtitle="The passionate people driving our mission forward." />
          <div ref={teamStagger.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={member.name}
                className={cn(
                  "group text-center p-6 rounded-xl bg-background border border-border opacity-0",
                  "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30",
                  teamStagger.visibleItems[i] && "animate-stagger-in"
                )}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{member.avatar}</span>
                </div>
                <h3 className="font-heading font-semibold text-sm mb-0.5 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-xs text-primary font-medium mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <SectionHeading title="Our Journey" />
          <div ref={timelineStagger.ref} className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={cn(
                  "relative flex items-start mb-12 last:mb-0 opacity-0",
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                  timelineStagger.visibleItems[i] && "animate-slide-up"
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-primary font-bold text-lg">{item.year}</span>
                  <h3 className="font-heading font-semibold text-xl">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
