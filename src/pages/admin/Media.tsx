import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Image, FolderPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface MediaCategory {
  id: string;
  name: string;
  description: string | null;
}

interface MediaItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category_id: string | null;
  published: boolean;
  created_at: string;
}

export default function AdminMedia() {
  const [categories, setCategories] = useState<MediaCategory[]>([]);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");

  // Upload state
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  // New category state
  const [catOpen, setCatOpen] = useState(false);
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");

  const loadData = async () => {
    const [{ data: cats }, { data: media }] = await Promise.all([
      supabase.from("media_categories").select("*").order("name"),
      supabase.from("media_items").select("*").order("created_at", { ascending: false }),
    ]);
    if (cats) setCategories(cats as any);
    if (media) setItems(media as any);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const compressImage = (file: File, maxWidth = 1200, quality = 0.8): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      const canvas = document.createElement("canvas");
      const reader = new FileReader();
      reader.onload = (e) => {
        img.onload = () => {
          let w = img.width, h = img.height;
          if (w > maxWidth) { h = (maxWidth / w) * h; w = maxWidth; }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
          canvas.toBlob((blob) => resolve(blob!), "image/jpeg", quality);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!uploadFile || !uploadTitle.trim()) { toast.error("Title and image required"); return; }
    setUploading(true);
    try {
      const compressed = await compressImage(uploadFile);
      const fileName = `media/${Date.now()}_${uploadFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const { error: storageError } = await supabase.storage.from("content-images").upload(fileName, compressed, { contentType: "image/jpeg" });
      if (storageError) throw storageError;

      const { data: urlData } = supabase.storage.from("content-images").getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("media_items").insert({
        title: uploadTitle.trim(),
        description: uploadDesc.trim() || null,
        image_url: urlData.publicUrl,
        category_id: uploadCategory || null,
        published: true,
      } as any);
      if (insertError) throw insertError;

      toast.success("Image uploaded!");
      setUploadOpen(false);
      setUploadTitle(""); setUploadDesc(""); setUploadCategory(""); setUploadFile(null); setUploadPreview(null);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!catName.trim()) { toast.error("Name required"); return; }
    const { error } = await supabase.from("media_categories").insert({ name: catName.trim(), description: catDesc.trim() || null } as any);
    if (error) { toast.error(error.message); return; }
    toast.success("Category created!");
    setCatOpen(false); setCatName(""); setCatDesc("");
    loadData();
  };

  const togglePublished = async (id: string, published: boolean) => {
    const { error } = await supabase.from("media_items").update({ published: !published } as any).eq("id", id);
    if (error) { toast.error(error.message); return; }
    loadData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this media item?")) return;
    const { error } = await supabase.from("media_items").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    loadData();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category? Items in it will become uncategorized.")) return;
    const { error } = await supabase.from("media_categories").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Category deleted");
    loadData();
  };

  const filtered = filterCategory === "all"
    ? items
    : filterCategory === "uncategorized"
      ? items.filter(i => !i.category_id)
      : items.filter(i => i.category_id === filterCategory);

  const getCategoryName = (catId: string | null) => {
    if (!catId) return "Uncategorized";
    return categories.find(c => c.id === catId)?.name || "Unknown";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Media Gallery</h1>
        <div className="flex gap-2">
          <Dialog open={catOpen} onOpenChange={setCatOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><FolderPlus className="h-4 w-4 mr-1" /> New Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Media Category</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Category Name</Label>
                  <Input value={catName} onChange={e => setCatName(e.target.value)} placeholder="e.g. Field Visits" />
                </div>
                <div>
                  <Label>Description (optional)</Label>
                  <Textarea value={catDesc} onChange={e => setCatDesc(e.target.value)} placeholder="Brief description..." />
                </div>
                <Button onClick={handleCreateCategory} className="w-full">Create Category</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Upload Image</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Upload Media</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title *</Label>
                  <Input value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} placeholder="Image title" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={uploadDesc} onChange={e => setUploadDesc(e.target.value)} placeholder="Brief description..." />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={uploadCategory} onValueChange={setUploadCategory}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Image *</Label>
                  <Input type="file" accept="image/*" onChange={handleFileChange} />
                  {uploadPreview && (
                    <img src={uploadPreview} alt="Preview" className="mt-2 rounded-lg max-h-48 object-cover w-full" />
                  )}
                </div>
                <Button onClick={handleUpload} disabled={uploading} className="w-full">
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Categories overview */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <div key={c.id} className="flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-sm">
              <span>{c.name}</span>
              <span className="text-muted-foreground">({items.filter(i => i.category_id === c.id).length})</span>
              <button onClick={() => deleteCategory(c.id)} className="ml-1 text-destructive hover:text-destructive/80">
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-4 items-center">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="uncategorized">Uncategorized</SelectItem>
            {categories.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{filtered.length} items</span>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden group relative">
              <div className="aspect-square">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{getCategoryName(item.category_id)}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="h-7 w-7" onClick={() => togglePublished(item.id, item.published)}>
                  {item.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
                <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => deleteItem(item.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              {!item.published && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded">Draft</div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No media items yet. Click "Upload Image" to add your first photo.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
