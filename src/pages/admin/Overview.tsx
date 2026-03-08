import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Tv, UserPlus } from "lucide-react";

export default function Overview() {
  const [stats, setStats] = useState({ members: 0, volunteers: 0, stories: 0, episodes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [m, v, s, e] = await Promise.all([
        supabase.from("memberships").select("id", { count: "exact", head: true }),
        supabase.from("volunteers").select("id", { count: "exact", head: true }),
        supabase.from("stories").select("id", { count: "exact", head: true }),
        supabase.from("tv_episodes").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        members: m.count ?? 0,
        volunteers: v.count ?? 0,
        stories: s.count ?? 0,
        episodes: e.count ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: "Members", value: stats.members, icon: Users },
    { label: "Volunteers", value: stats.volunteers, icon: UserPlus },
    { label: "Stories", value: stats.stories, icon: FileText },
    { label: "TV Episodes", value: stats.episodes, icon: Tv },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
