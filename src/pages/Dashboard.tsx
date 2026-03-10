import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { User, Award, BookOpen, Calendar, ShoppingBag, Clock, CheckCircle, LogOut, Sprout, Palette, Drama, Tv } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DashboardProfile } from "@/components/dashboard/DashboardProfile";
import { DashboardMembership } from "@/components/dashboard/DashboardMembership";
import { DashboardPrograms } from "@/components/dashboard/DashboardPrograms";

interface MembershipData {
  id: string;
  sector: string;
  subcategory: string;
  tier: string;
  status: string;
  approved: boolean;
  created_at: string;
}

interface ProfileData {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
}

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }

    async function load() {
      const [mRes, pRes] = await Promise.all([
        supabase.from("memberships").select("*").eq("user_id", user!.id).maybeSingle(),
        supabase.from("profiles").select("*").eq("user_id", user!.id).maybeSingle(),
      ]);
      if (mRes.data) setMembership(mRes.data as any);
      if (pRes.data) setProfile(pRes.data);
      setLoading(false);
    }
    load();
  }, [user, authLoading]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container max-w-md text-center">
            <SectionHeading title="My Dashboard" subtitle="Sign in to access your dashboard." />
            <div className="space-y-4">
              <Link to="/login">
                <Button size="lg" className="w-full">Sign In</Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/membership" className="text-primary hover:underline">Join HVN</Link>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold">Welcome back, {profile?.full_name?.split(" ")[0] || "Member"}</h1>
              <p className="text-muted-foreground">Manage your membership and explore your community.</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-1" /> Sign Out
            </Button>
          </div>

          {/* Approval Status */}
          {membership && !membership.approved && (
            <div className="rounded-xl border-2 border-yellow-400/50 bg-yellow-50 dark:bg-yellow-950/20 p-6 mb-8 flex items-start gap-4">
              <Clock className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-heading font-bold text-lg">Pending Approval</h3>
                <p className="text-sm text-muted-foreground">
                  Your membership application is being reviewed. You'll gain full access once approved.
                </p>
              </div>
            </div>
          )}

          {membership && membership.approved && (
            <div className="rounded-xl border-2 border-green-400/50 bg-green-50 dark:bg-green-950/20 p-4 mb-8 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="text-sm font-medium text-green-800 dark:text-green-200">Your membership is active and approved!</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              <DashboardProfile user={user} profile={profile} onProfileUpdate={setProfile} />
              <DashboardMembership membership={membership} />
              <DashboardPrograms membership={membership} />
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-lg">Quick Links</h3>
              {[
                { icon: Award, title: "Membership", desc: "View benefits & tiers", link: "/membership" },
                { icon: Tv, title: "Homegrown TV", desc: "Watch latest episodes", link: "/tv" },
                { icon: BookOpen, title: "Blog", desc: "Read community stories", link: "/blog" },
                { icon: Calendar, title: "Events", desc: "Upcoming community events", link: "/get-involved" },
                { icon: ShoppingBag, title: "Shop", desc: "Browse products", link: "/shop" },
              ].map((card) => (
                <Link key={card.title} to={card.link}>
                  <div className="rounded-xl border bg-card p-4 hover:border-primary/30 hover:shadow-sm transition-all flex items-center gap-3">
                    <card.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">{card.title}</h4>
                      <p className="text-xs text-muted-foreground">{card.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
