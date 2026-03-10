import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  email?: string;
  full_name?: string;
}

export default function AdminAccess() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [grantEmail, setGrantEmail] = useState("");
  const [granting, setGranting] = useState(false);

  const loadData = async () => {
    try {
      // Load admin roles with profile info
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("*")
        .eq("role", "admin");

      if (roleData && roleData.length > 0) {
        const userIds = roleData.map((r) => r.user_id);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("user_id, email, full_name")
          .in("user_id", userIds);

        const profileMap: Record<string, { email?: string; full_name?: string }> = {};
        profileData?.forEach((p) => {
          profileMap[p.user_id] = { email: p.email || undefined, full_name: p.full_name || undefined };
        });

        setAdmins(
          roleData.map((r) => ({
            ...r,
            email: profileMap[r.user_id]?.email,
            full_name: profileMap[r.user_id]?.full_name,
          }))
        );
      } else {
        setAdmins([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load admin data");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGrantAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    setGranting(true);
    try {
      // Find user by email in profiles
      const { data: profileData } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", grantEmail)
        .maybeSingle();

      if (!profileData) {
        toast.error("User not found. They must create an account first.");
        setGranting(false);
        return;
      }

      // Insert admin role
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: profileData.user_id, role: "admin" as const });

      if (error) {
        if (error.message.includes("duplicate") || error.message.includes("unique")) {
          toast.error("User already has admin access");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success(`Admin access granted to ${grantEmail}`);
        setGrantEmail("");
        setDialogOpen(false);
        loadData();
      }
    } catch (error) {
      toast.error("Failed to grant admin access");
    }
    setGranting(false);
  };

  const handleRevokeAdmin = async (roleId: string, email?: string) => {
    if (!confirm(`Revoke admin access${email ? ` from ${email}` : ""}?`)) return;

    try {
      const { error } = await supabase.from("user_roles").delete().eq("id", roleId);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Admin access revoked");
        loadData();
      }
    } catch (error) {
      toast.error("Failed to revoke admin access");
    }
  };

  const filteredAdmins = admins.filter((a) =>
    `${a.email || ""} ${a.full_name || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Manage admin permissions</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Shield className="h-4 w-4 mr-2" /> Grant Admin Access
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search admins..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-4">No admins found</TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.email || "—"}</TableCell>
                  <TableCell>{admin.full_name || "—"}</TableCell>
                  <TableCell className="capitalize">{admin.role}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleRevokeAdmin(admin.id, admin.email)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grant Admin Access</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleGrantAdmin} className="space-y-4">
            <div>
              <Label htmlFor="email">User Email</Label>
              <Input id="email" type="email" placeholder="user@example.com" value={grantEmail} onChange={(e) => setGrantEmail(e.target.value)} required />
              <p className="text-xs text-muted-foreground mt-1">The user must have registered an account first</p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={granting}>{granting ? "Granting..." : "Grant Access"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
