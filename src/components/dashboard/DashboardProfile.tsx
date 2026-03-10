import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User as AuthUser } from "@supabase/supabase-js";

interface ProfileData {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
}

interface Props {
  user: AuthUser;
  profile: ProfileData | null;
  onProfileUpdate: (p: ProfileData) => void;
}

export function DashboardProfile({ user, profile, onProfileUpdate }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    bio: profile?.bio || "",
  });

  const handleSave = async () => {
    const { error } = await supabase.from("profiles").update(editForm).eq("user_id", user.id);
    if (error) { toast.error("Failed to update profile"); return; }
    onProfileUpdate({ ...profile, ...editForm, email: profile?.email || null });
    setEditMode(false);
    toast.success("Profile updated!");
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg">Profile</h3>
        {!editMode && (
          <Button variant="outline" size="sm" onClick={() => {
            setEditForm({
              full_name: profile?.full_name || "",
              phone: profile?.phone || "",
              location: profile?.location || "",
              bio: profile?.bio || "",
            });
            setEditMode(true);
          }}>
            Edit
          </Button>
        )}
      </div>

      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-7 w-7 text-muted-foreground" />
        </div>
        <div className="flex-1">
          {editMode ? (
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} /></div>
              <div><Label>Phone</Label><Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} /></div>
              <div><Label>Location</Label><Input value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} /></div>
              <div><Label>Bio</Label><Textarea value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} rows={3} /></div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-heading font-bold">{profile?.full_name || "Member"}</h2>
              <p className="text-sm text-muted-foreground">{profile?.email || user.email}</p>
              {profile?.phone && <p className="text-sm text-muted-foreground">📞 {profile.phone}</p>}
              {profile?.location && <p className="text-sm text-muted-foreground">📍 {profile.location}</p>}
              {profile?.bio && <p className="text-sm mt-2">{profile.bio}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
