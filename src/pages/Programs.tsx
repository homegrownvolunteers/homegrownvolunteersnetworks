import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryCard } from "@/components/shared/CategoryCard";
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
            {PROGRAMS.map((program, i) => (
              <Link key={program.title} to={program.link}>
                <CategoryCard
                  title={program.title}
                  description={program.description}
                  icon={program.icon}
                  delay={i}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
