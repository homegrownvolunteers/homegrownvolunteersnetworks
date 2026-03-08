import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Arts & Culture", value: "arts-culture" },
  { label: "Community", value: "community" },
  { label: "Events", value: "events" },
  { label: "Homegrown TV", value: "homegrown-tv" },
  { label: "Membership", value: "membership" },
  { label: "Partnerships", value: "partnerships" },
  { label: "Volunteering", value: "volunteering" },
  { label: "General", value: "general" },
];

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  published_at: string | null;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, image_url, category, published_at, created_at")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false });

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      const { data } = await query;
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, [activeCategory]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryLabel = (value: string) =>
    CATEGORIES.find((c) => c.value === value)?.label || value;

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Blog & News</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stories, updates, and insights from the Homegrown Volunteer Network community.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {loading ? (
            <p className="text-center text-muted-foreground">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts found in this category.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    {post.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-3">
                        {getCategoryLabel(post.category)}
                      </Badge>
                      <h2 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
