import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image, X } from "lucide-react";

interface MediaCategory {
  id: string;
  name: string;
  description: string | null;
}

interface MediaItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category_id: string | null;
  created_at: string;
}

export default function MediaGallery() {
  const [categories, setCategories] = useState<MediaCategory[]>([]);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const [{ data: cats }, { data: media }] = await Promise.all([
        supabase.from("media_categories").select("*").order("name"),
        supabase.from("media_items").select("*").eq("published", true).order("created_at", { ascending: false }),
      ]);
      if (cats) setCategories(cats as any);
      if (media) setItems(media as any);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = activeCategory === "all"
    ? items
    : items.filter(i => i.category_id === activeCategory);

  const getCategoryName = (catId: string | null) => {
    if (!catId) return "General";
    return categories.find(c => c.id === catId)?.name || "General";
  };

  // Only show categories that have items
  const activeCategories = categories.filter(c => items.some(i => i.category_id === c.id));

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container text-center">
          <SectionHeading
            title="Media Gallery"
            subtitle="Explore photos from our community events, programs, and activities across Kenya."
          />
        </div>
      </section>

      {/* Category Tabs */}
      <section className="container py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
          >
            All ({items.length})
          </Button>
          {activeCategories.map(c => (
            <Button
              key={c.id}
              variant={activeCategory === c.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name} ({items.filter(i => i.category_id === c.id).length})
            </Button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading gallery...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Image className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No photos available yet.</p>
            <p className="text-sm">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(item => (
              <div
                key={item.id}
                className="group cursor-pointer rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
                onClick={() => setLightbox(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{getCategoryName(item.category_id)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {lightbox && (
            <div>
              <img
                src={lightbox.image_url}
                alt={lightbox.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{lightbox.title}</h3>
                {lightbox.description && <p className="text-muted-foreground mt-1">{lightbox.description}</p>}
                <p className="text-xs text-muted-foreground mt-2">
                  {getCategoryName(lightbox.category_id)} • {new Date(lightbox.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
