import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Registrations() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [v, p, s] = await Promise.all([
        supabase.from("volunteers").select("*").order("created_at", { ascending: false }),
        supabase.from("partnerships").select("*").order("created_at", { ascending: false }),
        supabase.from("story_submissions").select("*").order("created_at", { ascending: false }),
      ]);
      setVolunteers(v.data || []);
      setPartnerships(p.data || []);
      setSubmissions(s.data || []);
      setLoading(false);
    }
    load();
  }, []);

  const exportData = async (data: any[], filename: string) => {
    try {
      const XLSX = await import("xlsx");
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, `${filename}.xlsx`);
    } catch {
      toast.error("Export failed");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Registrations</h1>
      <Tabs defaultValue="volunteers">
        <TabsList>
          <TabsTrigger value="volunteers">Volunteers ({volunteers.length})</TabsTrigger>
          <TabsTrigger value="partnerships">Partnerships ({partnerships.length})</TabsTrigger>
          <TabsTrigger value="submissions">Story Submissions ({submissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="volunteers" className="mt-4">
          <div className="flex justify-end mb-2">
            <Button variant="outline" size="sm" onClick={() => exportData(volunteers, "volunteers")}><Download className="h-4 w-4 mr-1" /> Export</Button>
          </div>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Areas of Interest</TableHead>
                  <TableHead>Hours/Week</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Why Join</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="whitespace-nowrap">{v.full_name}</TableCell>
                    <TableCell>{v.email}</TableCell>
                    <TableCell>{v.phone || "—"}</TableCell>
                    <TableCell>{v.location || "—"}</TableCell>
                    <TableCell>{v.areas_of_interest?.join(", ")}</TableCell>
                    <TableCell>{v.hours_per_week || "—"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{v.skills || "—"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{v.experience || "—"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{v.why_join || "—"}</TableCell>
                    <TableCell className="whitespace-nowrap">{new Date(v.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="partnerships" className="mt-4">
          <div className="flex justify-end mb-2">
            <Button variant="outline" size="sm" onClick={() => exportData(partnerships, "partnerships")}><Download className="h-4 w-4 mr-1" /> Export</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader><TableRow><TableHead>Organization</TableHead><TableHead>Contact</TableHead><TableHead>Email</TableHead><TableHead>Type</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
              <TableBody>
                {partnerships.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.organization_name}</TableCell>
                    <TableCell>{p.contact_name}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>{p.partnership_type}</TableCell>
                    <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="mt-4">
          <div className="flex justify-end mb-2">
            <Button variant="outline" size="sm" onClick={() => exportData(submissions, "story-submissions")}><Download className="h-4 w-4 mr-1" /> Export</Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Name</TableHead><TableHead>Category</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
              <TableBody>
                {submissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.title}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.category}</TableCell>
                    <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
