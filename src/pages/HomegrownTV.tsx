import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = ["Agriculture Stories", "Cultural Heritage", "Artist Profiles", "Community Innovations"];

const SAMPLE_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Growing Together: Meru Farmers Unite", category: "Agriculture Stories" },
  { id: "dQw4w9WgXcQ", title: "The Art of Beadwork", category: "Artist Profiles" },
  { id: "dQw4w9WgXcQ", title: "Preserving the Meru Language", category: "Cultural Heritage" },
  { id: "dQw4w9WgXcQ", title: "Youth-Led Community Gardens", category: "Community Innovations" },
  { id: "dQw4w9WgXcQ", title: "Traditional Music Revival", category: "Cultural Heritage" },
  { id: "dQw4w9WgXcQ", title: "Organic Farming Success Story", category: "Agriculture Stories" },
];

export default function HomegrownTV() {
  const [filter, setFilter] = useState<string>("all");
  const [formData, setFormData] = useState({ name: "", email: "", category: "", title: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const filtered = filter === "all" ? SAMPLE_VIDEOS : SAMPLE_VIDEOS.filter((v) => v.category === filter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("story_submissions").insert([formData]);
      if (error) throw error;
      toast.success("Story submitted! We'll review it soon.");
      setFormData({ name: "", email: "", category: "", title: "", description: "" });
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">📺 Homegrown TV</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Documenting the stories of farmers, artists, and cultural bearers transforming communities.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Featured Documentary" />
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>All</Button>
            {CATEGORIES.map((cat) => (
              <Button key={cat} variant={filter === cat ? "default" : "outline"} size="sm" onClick={() => setFilter(cat)}>{cat}</Button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((video, i) => (
              <div key={i} className="rounded-xl border bg-card overflow-hidden hover-lift">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <span className="text-4xl opacity-30">▶️</span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-primary font-medium">{video.category}</span>
                  <h3 className="font-medium mt-1">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-12 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-2xl font-heading font-bold mb-4">Subscribe to Our Channel</h2>
          <a href="https://youtube.com/@homegrownnetwork" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">Subscribe on YouTube</Button>
          </a>
        </div>
      </section>

      {/* Submit Story */}
      <section className="py-20">
        <div className="container max-w-xl">
          <SectionHeading title="Submit Your Story" subtitle="Have a story to share? Let us know!" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Story Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            <Textarea placeholder="Tell us about your story..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            <Input placeholder="Video URL (optional)" value={formData.video_url || ""} onChange={(e) => setFormData({ ...formData, video_url: e.target.value } as any)} />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Story"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
