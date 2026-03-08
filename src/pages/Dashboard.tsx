import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { User, Award, BookOpen, Calendar, ShoppingBag, Clock, CheckCircle, XCircle, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: "", phone: "", location: "", bio: "" });
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
      if (pRes.data) {
        setProfile(pRes.data);
        setEditForm({
          full_name: pRes.data.full_name || "",
          phone: pRes.data.phone || "",
          location: pRes.data.location || "",
          bio: pRes.data.bio || "",
        });
      }
      setLoading(false);
    }
    load();
  }, [user, authLoading]);

  const handleSaveProfile = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update(editForm).eq("user_id", user.id);
    if (error) { toast.error("Failed to update profile"); return; }
    setProfile({ ...profile, ...editForm, email: profile?.email || null });
    setEditMode(false);
    toast.success("Profile updated!");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container max-w-md text-center">
            <SectionHeading title="My Dashboard" subtitle="Sign in to access your dashboard." />
            <div className="space-y-4">
              <Link to="/membership">
                <Button size="lg" className="w-full">Join HVN</Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/admin/login" className="text-primary hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading title="My Dashboard" subtitle="Manage your membership and activity." />
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-1" /> Sign Out
            </Button>
          </div>

          {/* Approval Status Banner */}
          {membership && !membership.approved && (
            <div className="rounded-xl border-2 border-yellow-400/50 bg-yellow-50 dark:bg-yellow-950/20 p-6 mb-8 flex items-start gap-4">
              <Clock className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-heading font-bold text-lg">Pending Approval</h3>
                <p className="text-sm text-muted-foreground">
                  Your membership application is being reviewed by an admin. You'll gain full access once approved.
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

          {/* Profile */}
          <div className="rounded-xl border bg-card p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                {editMode ? (
                  <div className="space-y-3">
                    <div><Label>Name</Label><Input value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} /></div>
                    <div><Label>Phone</Label><Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} /></div>
                    <div><Label>Location</Label><Input value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} /></div>
                    <div><Label>Bio</Label><Textarea value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} rows={3} /></div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveProfile}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-heading font-bold">{profile?.full_name || "Member"}</h2>
                    <p className="text-muted-foreground">{profile?.email || user.email}</p>
                    {profile?.location && <p className="text-sm text-muted-foreground">📍 {profile.location}</p>}
                    {membership && (
                      <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mt-1 ${
                        membership.approved ? "bg-primary/10 text-primary" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                      }`}>
                        {membership.tier.charAt(0).toUpperCase() + membership.tier.slice(1)} • {membership.approved ? "Active" : "Pending"}
                      </span>
                    )}
                  </>
                )}
              </div>
              {!editMode && <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>Edit Profile</Button>}
            </div>
          </div>

          {/* Membership Details */}
          {membership && (
            <div className="rounded-xl border bg-card p-6 mb-8">
              <h3 className="font-heading font-semibold text-lg mb-4">Membership Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="text-muted-foreground block">Sector</span><span className="font-medium capitalize">{membership.sector}</span></div>
                <div><span className="text-muted-foreground block">Subcategory</span><span className="font-medium">{membership.subcategory}</span></div>
                <div><span className="text-muted-foreground block">Tier</span><span className="font-medium capitalize">{membership.tier}</span></div>
                <div><span className="text-muted-foreground block">Joined</span><span className="font-medium">{new Date(membership.created_at).toLocaleDateString()}</span></div>
              </div>
            </div>
          )}

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Award, title: "Membership", desc: "View your tier, benefits, and renewal status.", link: "/membership" },
              { icon: BookOpen, title: "Resources", desc: "Access guides, training materials, and downloads.", link: "#" },
              { icon: Calendar, title: "Events", desc: "See upcoming events and your registrations.", link: "#" },
              { icon: ShoppingBag, title: "Orders", desc: "Track your shop orders and purchases.", link: "/shop" },
            ].map((card) => (
              <Link key={card.title} to={card.link}>
                <div className="rounded-xl border bg-card p-6 hover-lift">
                  <card.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-lg">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
