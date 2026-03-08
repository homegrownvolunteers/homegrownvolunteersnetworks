import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Users } from "lucide-react";
import type { SubcategoryDetail } from "@/lib/subcategory-details";

interface SubcategoryDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: SubcategoryDetail | null;
}

export function SubcategoryDetailModal({ open, onOpenChange, detail }: SubcategoryDetailModalProps) {
  if (!detail) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{detail.title}</DialogTitle>
          <DialogDescription>{detail.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {detail.highlights.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Highlights
              </h4>
              <ul className="space-y-1">
                {detail.highlights.map((h) => (
                  <li key={h} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-sm mb-1">How to Get Involved</h4>
            <p className="text-sm text-muted-foreground">{detail.howToGetInvolved}</p>
          </div>

          {detail.relatedTV && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <Play className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{detail.relatedTV}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Link to="/membership" className="flex-1">
              <Button className="w-full" size="sm">
                Join Now <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
            <Link to="/tv">
              <Button variant="outline" size="sm">
                <Play className="mr-1 h-3 w-3" /> Watch TV
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
