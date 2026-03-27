import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, CheckCircle, XCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useLocation, COUNTRIES, HARDCODED_SUB_COUNTIES, HARDCODED_WARDS, COUNTIES_WITH_WARDS } from "@/hooks/useLocation";

interface Membership {
  id: string;
  sector: string;
  subcategory: string;
  tier: string;
  status: string;
  approved: boolean;
  created_at: string;
  user_id: string | null;
  country: string | null;
  county: string | null;
  sub_county: string | null;
  ward: string | null;
}

interface Profile {
  user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
}

export default function Members() {
  const [members, setMembers] = useState<Membership[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  
  // Location filter state
  const { counties, subCounties, wards, fetchCounties, fetchSubCounties, clearSubCounties, clearWards } = useLocation();
  const [filterCounty, setFilterCounty] = useState("");
  const [filterSubCounty, setFilterSubCounty] = useState("");
  const [filterWard, setFilterWard] = useState("");
  
  // Load counties on mount
  useEffect(() => {
    fetchCounties();
  }, [fetchCounties]);

  // Handle county filter change
  const handleCountyChange = (value: string) => {
    setFilterCounty(value);
    setFilterSubCounty("");
    setFilterWard("");
    clearWards();
    if (value) {
      const selectedCounty = counties.find(c => c.name === value);
      if (selectedCounty) {
        fetchSubCounties(selectedCounty.id);
      }
    } else {
      clearSubCounties();
    }
  };

  const load = async () => {
    const { data, error } = await supabase.from("memberships").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setMembers(data as any);
      
      // Load profiles for all members with user_id
      const userIds = (data as any[]).filter((m) => m.user_id).map((m) => m.user_id);
      if (userIds.length > 0) {
        const { data: profileData } = await supabase.from("profiles").select("*").in("user_id", userIds);
        if (profileData) {
          const profileMap: Record<string, Profile> = {};
          profileData.forEach((p: any) => {
            profileMap[p.user_id] = p;
          });
          setProfiles(profileMap);
        }
      }
    }
    setLoading(false);
  };

  const filtered = members
    .filter((m) => filter === "all" || (filter === "pending" ? !m.approved : m.approved))
    .filter((m) => {
      const profile = m.user_id ? profiles[m.user_id] : null;
      const searchText = `${m.sector} ${m.subcategory} ${m.tier} ${m.status} ${m.county || ''} ${m.sub_county || ''} ${m.ward || ''} ${profile?.full_name || ""} ${profile?.email || ""}`.toLowerCase();
      return searchText.includes(search.toLowerCase());
    })
    .filter((m) => {
      // Location filters
      if (filterCounty && m.county !== filterCounty) return false;
      if (filterSubCounty && m.sub_county !== filterSubCounty) return false;
      if (filterWard && m.ward !== filterWard) return false;
      return true;
    });

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

  const exportExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      const ws = XLSX.utils.json_to_sheet(filtered.map((m) => ({
        Name: profiles[m.user_id]?.full_name || "",
        Email: profiles[m.user_id]?.email || "",
        Phone: profiles[m.user_id]?.phone || "",
        Sector: m.sector,
        Subcategory: m.subcategory,
        Tier: m.tier,
        Country: m.country || "",
        County: m.county || "",
        SubCounty: m.sub_county || "",
        Ward: m.ward || "",
        Status: m.status,
        Approved: m.approved ? "Yes" : "No",
        Date: new Date(m.created_at).toLocaleDateString(),
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
        head: [["Name", "Email", "Sector", "County", "Ward", "Status", "Approved", "Date"]],
        body: filtered.map((m) => [
          profiles[m.user_id]?.full_name || "",
          profiles[m.user_id]?.email || "",
          m.sector,
          m.county || "",
          m.ward || "",
          m.status,
          m.approved ? "Yes" : "No",
          new Date(m.created_at).toLocaleDateString()
        ]),
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
        {/* County Filter */}
        <Select value={filterCounty} onValueChange={handleCountyChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Counties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Counties</SelectItem>
            {counties.map((c) => (
              <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Sub-County Filter */}
        {filterCounty && (
          <Select value={filterSubCounty} onValueChange={(val) => { setFilterSubCounty(val); setFilterWard(""); }}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Sub-Counties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sub-Counties</SelectItem>
              {subCounties.length > 0 ? subCounties.map((sc) => (
                <SelectItem key={sc.id} value={sc.name}>{sc.name}</SelectItem>
              )) : (
                // Show fallback sub-counties based on selected county
                (() => {
                  const selectedCounty = counties.find(c => c.name === filterCounty);
                  const countyId = selectedCounty?.id;
                  if (countyId) {
                    return HARDCODED_SUB_COUNTIES.filter(sc => sc.county_id === countyId).map((sc) => (
                      <SelectItem key={sc.id} value={sc.name}>{sc.name}</SelectItem>
                    ));
                  }
                  return null;
                })()
              )}
            </SelectContent>
          </Select>
        )}
        {/* Ward Filter */}
        {filterSubCounty && (
          <Select value={filterWard} onValueChange={setFilterWard}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Wards" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Wards</SelectItem>
              {wards.length > 0 ? wards.map((w) => (
                <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>
              )) : (
                // Show fallback wards based on selected sub-county
                (() => {
                  // First try to find the sub-county in the database-loaded subCounties
                  const selectedSub = subCounties.find(s => s.name === filterSubCounty);
                  let subCountyId = selectedSub?.id;
                  
                  // If not found, try the fallback data
                  if (!subCountyId) {
                    const fallbackSub = HARDCODED_SUB_COUNTIES.find(s => s.name === filterSubCounty);
                    subCountyId = fallbackSub?.id;
                  }
                  
                  // Filter wards by the found sub-county ID
                  if (subCountyId) {
                    const filteredWards = HARDCODED_WARDS.filter(w => w.sub_county_id === subCountyId);
                    return filteredWards.map((w) => (
                      <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>
                    ));
                  }
                  return null;
                })()
              )}
            </SelectContent>
          </Select>
        )}
        {/* Clear filters */}
        {(filterCounty || filterSubCounty || filterWard) && (
          <Button variant="ghost" size="sm" onClick={() => { setFilterCounty(""); setFilterSubCounty(""); setFilterWard(""); clearSubCounties(); clearWards(); }}>
            Clear
          </Button>
        )}
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>County</TableHead>
                <TableHead>Sub-County</TableHead>
                <TableHead>Ward</TableHead>
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
              {filtered.map((m) => {
                const profile = m.user_id ? profiles[m.user_id] : null;
                return (
                  <TableRow key={m.id} className={!m.approved ? "bg-yellow-50/50 dark:bg-yellow-950/10" : ""}>
                    <TableCell className="font-medium">{profile?.full_name || "—"}</TableCell>
                    <TableCell className="text-sm">{profile?.email || "—"}</TableCell>
                    <TableCell>{m.county || "—"}</TableCell>
                    <TableCell>{m.sub_county || "—"}</TableCell>
                    <TableCell>{m.ward || "—"}</TableCell>
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
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={12} className="text-center text-muted-foreground">No members found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
