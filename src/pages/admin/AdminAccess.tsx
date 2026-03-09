import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, UserPlus, Shield, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
}

interface PendingAdmin {
  id: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  requested_at: string;
}

export default function AdminAccess() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingAdmin[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [grantEmail, setGrantEmail] = useState("");
  const [granting, setGranting] = useState(false);

  const loadData = async () => {
    try {
      // Load current admins
      const { data: adminData } = await supabase.from("admin_users").select("*").order("created_at", { ascending: false });
      
      // Load admin access requests
      const { data: requestData } = await supabase.from("admin_requests").select("*").order("requested_at", { ascending: false });

      if (adminData) setAdmins(adminData);
      if (requestData) setPendingRequests(requestData);
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
      // Find user by email
      const { data: userData } = await supabase.auth.admin.listUsers();
      const user = userData?.users.find((u) => u.email === grantEmail);

      if (!user) {
        toast.error("User not found. They must create an account first.");
        setGranting(false);
        return;
      }

      // Grant admin role
      const { error } = await supabase.rpc("grant_admin_role", { _user_id: user.id });
      if (error) {
        toast.error(error.message);
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

  const handleRevokeAdmin = async (userId: string, email: string) => {
    if (!confirm(`Revoke admin access from ${email}?`)) return;

    try {
      const { error } = await supabase.rpc("revoke_admin_role", { _user_id: userId });
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

  const handleApprovePending = async (requestId: string, email: string) => {
    try {
      // First find the user and grant admin
      const { data: userData } = await supabase.auth.admin.listUsers();
      const user = userData?.users.find((u) => u.email === email);

      if (!user) {
        toast.error("User not found");
        return;
      }

      // Grant admin role
      const { error: grantError } = await supabase.rpc("grant_admin_role", { _user_id: user.id });
      if (grantError) {
        toast.error(grantError.message);
        return;
      }

      // Update request status
      const { error: updateError } = await supabase.from("admin_requests").update({ status: "approved" }).eq("id", requestId);
      if (updateError) {
        toast.error(updateError.message);
      } else {
        toast.success(`Admin access granted to ${email}`);
        loadData();
      }
    } catch (error) {
      toast.error("Failed to approve request");
    }
  };

  const handleRejectPending = async (requestId: string) => {
    try {
      const { error } = await supabase.from("admin_requests").update({ status: "rejected" }).eq("id", requestId);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Request rejected");
        loadData();
      }
    } catch (error) {
      toast.error("Failed to reject request");
    }
  };

  const filteredAdmins = admins.filter((a) => `${a.email} ${a.full_name || ""}`.toLowerCase().includes(search.toLowerCase()));
  const activePending = pendingRequests.filter((p) => p.status === "pending");

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Manage admin permissions and requests</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Shield className="h-4 w-4 mr-2" /> Grant Admin Access
        </Button>
      </div>

      {/* Pending Requests */}
      {activePending.length > 0 && (
        <div className="mb-8 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Mail className="h-4 w-4" /> Pending Admin Requests ({activePending.length})
          </h2>
          <div className="space-y-2">
            {activePending.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded border">
                <div>
                  <p className="font-medium">{req.email}</p>
                  <p className="text-xs text-muted-foreground">Requested: {new Date(req.requested_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleApprovePending(req.id, req.email)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRejectPending(req.id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Admins */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Current Admins ({filteredAdmins.length})</h2>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Granted</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                    No admins found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.email}</TableCell>
                    <TableCell>{admin.full_name || "—"}</TableCell>
                    <TableCell>{new Date(admin.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRevokeAdmin(admin.id, admin.email)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Grant Admin Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grant Admin Access</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleGrantAdmin} className="space-y-4">
            <div>
              <Label htmlFor="email">User Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={grantEmail}
                onChange={(e) => setGrantEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                The user must have registered an account first
              </p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={granting}>
                {granting ? "Granting..." : "Grant Access"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
