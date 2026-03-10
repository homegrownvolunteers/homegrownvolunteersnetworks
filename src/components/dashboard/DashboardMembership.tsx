import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, Clock } from "lucide-react";

interface MembershipData {
  id: string;
  sector: string;
  subcategory: string;
  tier: string;
  status: string;
  approved: boolean;
  created_at: string;
}

export function DashboardMembership({ membership }: { membership: MembershipData | null }) {
  if (!membership) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <Award className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-heading font-semibold text-lg mb-2">No Membership Yet</h3>
        <p className="text-sm text-muted-foreground mb-4">Join HVN to access programs, events, and community resources.</p>
        <Link to="/membership">
          <Button>Join Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg">Membership</h3>
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
          membership.approved
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
        }`}>
          {membership.approved ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
          {membership.approved ? "Active" : "Pending"}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground block text-xs">Sector</span>
          <span className="font-medium capitalize">{membership.sector}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-xs">Subcategory</span>
          <span className="font-medium">{membership.subcategory}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-xs">Tier</span>
          <span className="font-medium capitalize">{membership.tier}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-xs">Joined</span>
          <span className="font-medium">{new Date(membership.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
