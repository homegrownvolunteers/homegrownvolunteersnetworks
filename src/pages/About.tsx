import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Story</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Born from the spirit of Harambee — pulling together — we are building a movement that celebrates and empowers local communities.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <SectionHeading title="Our Vision" align="left" />
              <p className="text-muted-foreground">
                A Kenya where every community thrives through sustainable agriculture, vibrant arts, and preserved cultural heritage — proud of its roots and confident in its future.
              </p>
            </div>
            <div>
              <SectionHeading title="Our Mission" align="left" />
              <p className="text-muted-foreground">
                To mobilize volunteers and resources that empower local communities to achieve food security, cultural preservation, and creative economic growth through collaborative action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-card">
        <div className="container">
          <SectionHeading title="Our Core Values" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {VALUES.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-xl bg-background hover-lift">
                <div className="text-4xl mb-3">{v.icon}</div>
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
            className={`grid md:grid-cols-2 gap-12 items-center opacity-0 ${founderRef.isVisible ? "animate-fade-up opacity-100" : ""}`}
          >
            <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
              <span className="text-6xl opacity-30">👤</span>
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

      {/* Timeline */}
      <section className="py-20 bg-card">
        <div className="container max-w-3xl">
          <SectionHeading title="Our Journey" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
            {TIMELINE.map((item, i) => (
              <div key={item.year} className={`relative flex items-start mb-12 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
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
