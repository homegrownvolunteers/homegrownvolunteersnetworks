import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Episode {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  category: string;
  published: boolean;
  created_at: string;
}

const emptyEp = { title: "", description: "", video_url: "", thumbnail_url: "", category: "general", published: true };

export default function TVEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyEp);

  const load = async () => {
    const { data } = await supabase.from("tv_episodes").select("*").order("created_at", { ascending: false });
    if (data) setEpisodes(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (editing) {
      const { error } = await supabase.from("tv_episodes").update(form).eq("id", editing);
      if (error) { toast.error(error.message); return; }
      toast.success("Episode updated");
    } else {
      const { error } = await supabase.from("tv_episodes").insert([form]);
      if (error) { toast.error(error.message); return; }
      toast.success("Episode added");
    }
    setDialogOpen(false);
    setEditing(null);
    setForm(emptyEp);
    load();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("tv_episodes").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Episode deleted");
    load();
  };

  const openEdit = (ep: Episode) => {
    setForm({ title: ep.title, description: ep.description || "", video_url: ep.video_url, thumbnail_url: ep.thumbnail_url || "", category: ep.category, published: ep.published });
    setEditing(ep.id);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">TV Episodes</h1>
        <Button onClick={() => { setForm(emptyEp); setEditing(null); setDialogOpen(true); }}><Plus className="h-4 w-4 mr-1" /> Add Episode</Button>
      </div>

      {loading ? <p className="text-muted-foreground">Loading...</p> : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {episodes.map((ep) => (
                <TableRow key={ep.id}>
                  <TableCell className="font-medium">{ep.title}</TableCell>
                  <TableCell>{ep.category}</TableCell>
                  <TableCell>{ep.published ? "✅" : "Hidden"}</TableCell>
                  <TableCell>{new Date(ep.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(ep)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(ep.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {episodes.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No episodes yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Episode" : "Add Episode"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Video URL / Embed Code</Label><Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="YouTube URL or embed code" /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Thumbnail URL</Label><Input value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} /></div>
            <div className="flex items-center gap-2">
              <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
              <Label>Published</Label>
            </div>
            <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
