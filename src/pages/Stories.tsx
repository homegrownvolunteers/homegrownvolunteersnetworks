import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

const SAMPLE_STORIES = [
  { id: "1", title: "How Organic Farming Changed My Life", excerpt: "A farmer's journey from conventional to organic methods.", category: "Agriculture", image: "", date: "2025-12-01", author: "Mary Wanjiku" },
  { id: "2", title: "The Revival of Meru Pottery", excerpt: "Young artists are bringing back traditional pottery techniques.", category: "Arts", image: "", date: "2025-11-15", author: "John Mwenda" },
  { id: "3", title: "Preserving Elder Wisdom", excerpt: "Documenting oral histories before they're lost.", category: "Culture", image: "", date: "2025-10-20", author: "Grace Nkirote" },
  { id: "4", title: "Community Gardens in Urban Meru", excerpt: "How vertical gardens are feeding city neighborhoods.", category: "Agriculture", image: "", date: "2025-09-10", author: "Peter Mutegi" },
  { id: "5", title: "Dance as Resistance", excerpt: "Traditional dance forms telling modern stories.", category: "Arts", image: "", date: "2025-08-05", author: "Faith Karambu" },
  { id: "6", title: "Youth Volunteers Transform Schools", excerpt: "Weekend programs bringing arts to rural schools.", category: "Community", image: "", date: "2025-07-20", author: "David Kinyua" },
];

const CATEGORIES = ["All", "Agriculture", "Arts", "Culture", "Community"];

export default function Stories() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? SAMPLE_STORIES : SAMPLE_STORIES.filter((s) => s.category === filter);

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Stories & Media</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories of impact, resilience, and community from across Kenya.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="rounded-2xl border bg-card overflow-hidden hover-lift">
            <div className="aspect-[2/1] bg-muted flex items-center justify-center">
              <span className="text-6xl opacity-20">📖</span>
            </div>
            <div className="p-8">
              <span className="text-xs text-primary font-medium">Featured Story</span>
              <h2 className="text-2xl font-heading font-bold mt-1 mb-2">{SAMPLE_STORIES[0].title}</h2>
              <p className="text-muted-foreground mb-4">{SAMPLE_STORIES[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{SAMPLE_STORIES[0].author}</span>
                <span>{SAMPLE_STORIES[0].date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {CATEGORIES.map((cat) => (
              <Button key={cat} variant={filter === cat ? "default" : "outline"} size="sm" onClick={() => setFilter(cat)}>{cat}</Button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((story) => (
              <div key={story.id} className="rounded-xl border bg-card overflow-hidden hover-lift">
                <div className="aspect-[3/2] bg-muted flex items-center justify-center">
                  <span className="text-3xl opacity-20">📝</span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{story.category}</span>
                  <h3 className="font-heading font-semibold mt-1 mb-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{story.excerpt}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{story.author}</span>
                    <span>{story.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
