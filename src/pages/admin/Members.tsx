import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Membership {
  id: string;
  sector: string;
  subcategory: string;
  tier: string;
  status: string;
  approved: boolean;
  created_at: string;
  user_id: string | null;
}

export default function Members() {
  const [members, setMembers] = useState<Membership[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const load = async () => {
    const { data, error } = await supabase.from("memberships").select("*").order("created_at", { ascending: false });
    if (!error && data) setMembers(data as any);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id: string) => {
    const { error } = await supabase.from("memberships").update({ approved: true, status: "active" as const }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Member approved");
    load();
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase.from("memberships").update({ approved: false, status: "expired" as const }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Member rejected");
    load();
  };

  const filtered = members
    .filter((m) => filter === "all" || (filter === "pending" ? !m.approved : m.approved))
    .filter((m) => `${m.sector} ${m.subcategory} ${m.tier} ${m.status}`.toLowerCase().includes(search.toLowerCase()));

  const exportExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      const ws = XLSX.utils.json_to_sheet(filtered.map((m) => ({
        Sector: m.sector, Subcategory: m.subcategory, Tier: m.tier, Status: m.status, Approved: m.approved ? "Yes" : "No", Date: new Date(m.created_at).toLocaleDateString(),
      })));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Members");
      XLSX.writeFile(wb, "members.xlsx");
    } catch {
      toast.error("Failed to export");
    }
  };

  const exportPDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF();
      doc.text("Members Report", 14, 16);
      autoTable(doc, {
        startY: 22,
        head: [["Sector", "Subcategory", "Tier", "Status", "Approved", "Date"]],
        body: filtered.map((m) => [m.sector, m.subcategory, m.tier, m.status, m.approved ? "Yes" : "No", new Date(m.created_at).toLocaleDateString()]),
      });
      doc.save("members.pdf");
    } catch {
      toast.error("Failed to export");
    }
  };

  const pendingCount = members.filter((m) => !m.approved).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Members</h1>
          {pendingCount > 0 && <p className="text-sm text-yellow-600">{pendingCount} pending approval</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportExcel}><Download className="h-4 w-4 mr-1" /> Excel</Button>
          <Button variant="outline" size="sm" onClick={exportPDF}><Download className="h-4 w-4 mr-1" /> PDF</Button>
        </div>
      </div>

      <div className="flex gap-3 mb-4 items-center flex-wrap">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-1">
          {(["all", "pending", "approved"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">{f}</Button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sector</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-28">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow key={m.id} className={!m.approved ? "bg-yellow-50/50 dark:bg-yellow-950/10" : ""}>
                  <TableCell className="capitalize">{m.sector}</TableCell>
                  <TableCell>{m.subcategory}</TableCell>
                  <TableCell className="capitalize">{m.tier}</TableCell>
                  <TableCell className="capitalize">{m.status}</TableCell>
                  <TableCell>{m.approved ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-yellow-600" />}</TableCell>
                  <TableCell>{new Date(m.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {!m.approved ? (
                      <div className="flex gap-1">
                        <Button variant="default" size="sm" onClick={() => handleApprove(m.id)}>Approve</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleReject(m.id)}>Reject</Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Approved</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No members found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
