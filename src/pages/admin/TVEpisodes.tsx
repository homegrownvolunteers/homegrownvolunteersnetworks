import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const TV_CATEGORIES = ["Agriculture Stories", "Cultural Heritage", "Artist Profiles", "Community Innovations", "General"];

function extractYouTubeId(url: string): string | null {
  const iframeMatch = url.match(/src=["'][^"']*(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);
  if (iframeMatch) return iframeMatch[1];
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function getYouTubeThumbnail(url: string): string | null {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

const emptyEp = { title: "", description: "", video_url: "", category: "General", published: true };

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
    const thumbnail_url = getYouTubeThumbnail(form.video_url) || null;
    const payload = { ...form, thumbnail_url };

    if (editing) {
      const { error } = await supabase.from("tv_episodes").update(payload).eq("id", editing);
      if (error) { toast.error(error.message); return; }
      toast.success("Episode updated");
    } else {
      const { error } = await supabase.from("tv_episodes").insert([payload]);
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
    setForm({ title: ep.title, description: ep.description || "", video_url: ep.video_url, category: ep.category, published: ep.published });
    setEditing(ep.id);
    setDialogOpen(true);
  };

  const previewThumb = getYouTubeThumbnail(form.video_url);

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
                <TableHead className="w-16">Thumb</TableHead>
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
                  <TableCell>
                    {ep.thumbnail_url ? (
                      <img src={ep.thumbnail_url} alt="" className="w-14 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-14 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">N/A</div>
                    )}
                  </TableCell>
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
              {episodes.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">No episodes yet</TableCell></TableRow>}
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
            <div>
              <Label>YouTube URL</Label>
              <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
              {previewThumb && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Auto-generated thumbnail:</p>
                  <img src={previewThumb} alt="Thumbnail preview" className="w-40 h-auto rounded border" />
                </div>
              )}
            </div>
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TV_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
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
