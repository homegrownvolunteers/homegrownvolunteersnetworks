import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";

interface Membership {
  id: string;
  sector: string;
  subcategory: string;
  tier: string;
  status: string;
  created_at: string;
  user_id: string | null;
}

export default function Members() {
  const [members, setMembers] = useState<Membership[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("memberships").select("*").order("created_at", { ascending: false });
      if (!error && data) setMembers(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = members.filter((m) =>
    `${m.sector} ${m.subcategory} ${m.tier} ${m.status}`.toLowerCase().includes(search.toLowerCase())
  );

  const exportExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      const ws = XLSX.utils.json_to_sheet(filtered.map((m) => ({
        Sector: m.sector, Subcategory: m.subcategory, Tier: m.tier, Status: m.status, Date: new Date(m.created_at).toLocaleDateString(),
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
        head: [["Sector", "Subcategory", "Tier", "Status", "Date"]],
        body: filtered.map((m) => [m.sector, m.subcategory, m.tier, m.status, new Date(m.created_at).toLocaleDateString()]),
      });
      doc.save("members.pdf");
    } catch {
      toast.error("Failed to export");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Members</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportExcel}><Download className="h-4 w-4 mr-1" /> Excel</Button>
          <Button variant="outline" size="sm" onClick={exportPDF}><Download className="h-4 w-4 mr-1" /> PDF</Button>
        </div>
      </div>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
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
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="capitalize">{m.sector}</TableCell>
                  <TableCell>{m.subcategory}</TableCell>
                  <TableCell className="capitalize">{m.tier}</TableCell>
                  <TableCell className="capitalize">{m.status}</TableCell>
                  <TableCell>{new Date(m.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No members found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
