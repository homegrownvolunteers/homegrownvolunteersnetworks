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
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/constants";

const CATEGORIES = ["Agriculture Stories", "Cultural Heritage", "Artist Profiles", "Community Innovations"];

const SAMPLE_VIDEOS = [
  { id: "kvM04D1Ekqk", title: "Makena Textiles", category: "Artist Profiles" },
  { id: "QgWr7BVHJ54", title: "Samatian Island", category: "Cultural Heritage" },
  { id: "kvM04D1Ekqk", title: "Growing Together: Meru Farmers Unite", category: "Agriculture Stories" },
  { id: "QgWr7BVHJ54", title: "Youth-Led Community Gardens", category: "Community Innovations" },
  { id: "kvM04D1Ekqk", title: "Traditional Music Revival", category: "Cultural Heritage" },
  { id: "QgWr7BVHJ54", title: "Organic Farming Success Story", category: "Agriculture Stories" },
];

export default function HomegrownTV() {
  const [filter, setFilter] = useState<string>("all");
  const [formData, setFormData] = useState({ name: "", email: "", category: "", title: "", description: "", video_url: "" });
  const [submitting, setSubmitting] = useState(false);
  const heroRef = useScrollReveal();
  const videosStagger = useStaggerReveal(6, 100);

  const filtered = filter === "all" ? SAMPLE_VIDEOS : SAMPLE_VIDEOS.filter((v) => v.category === filter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("story_submissions").insert([formData]);
      if (error) throw error;
      toast.success("Story submitted! We'll review it soon.");
      setFormData({ name: "", email: "", category: "", title: "", description: "", video_url: "" });
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute top-16 right-12 text-6xl opacity-10 animate-float">📺</div>
        <div ref={heroRef.ref} className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 opacity-0 animate-hero-text">
            Homegrown <span className="text-primary">TV</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-blur-in" style={{ animationDelay: "0.3s" }}>
            Documenting the stories of farmers, artists, and cultural bearers transforming communities.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <SectionHeading title="Featured" />
          <YouTubeEmbed videoId="kvM04D1Ekqk" title="Makena Textiles" />
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
          <div ref={videosStagger.ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((video, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border bg-card overflow-hidden hover-lift opacity-0",
                  videosStagger.visibleItems[i] && "animate-stagger-in"
                )}
              >
                <YouTubeEmbed videoId={video.id} title={video.title} />
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
          <p className="text-primary-foreground/80 mb-6">All our content is on YouTube — subscribe to stay updated!</p>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
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
            <Input placeholder="Video URL (optional)" value={formData.video_url} onChange={(e) => setFormData({ ...formData, video_url: e.target.value })} />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Story"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
