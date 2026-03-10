import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROGRAMS } from "@/lib/constants";

export default function Programs() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Programs</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five interconnected initiatives driving community transformation across Kenya.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((program, i) => {
              const Icon = program.iconComp;
              return (
                <Link key={program.title} to={program.link}>
                  <div className="group relative overflow-hidden rounded-lg border bg-card p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{program.title}</h3>
                    <p className="text-sm text-muted-foreground">{program.description}</p>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
