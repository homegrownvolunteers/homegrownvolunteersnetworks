import { Link } from "react-router-dom";
import { Sprout, Palette, Drama, ArrowRight } from "lucide-react";

interface MembershipData {
  sector: string;
  subcategory: string;
  tier: string;
  approved: boolean;
  [key: string]: any;
}

const SECTOR_INFO: Record<string, { icon: any; title: string; link: string; color: string; programs: string[] }> = {
  agriculture: {
    icon: Sprout,
    title: "Agriculture Network",
    link: "/agriculture",
    color: "text-green-600",
    programs: ["Organic Farming Training", "Seed Saving Workshops", "Farm Tours", "Market Access Programs"],
  },
  arts: {
    icon: Palette,
    title: "Sanaa Arts Community",
    link: "/sanaa-arts",
    color: "text-purple-600",
    programs: ["Artist Workshops", "Gallery Exhibitions", "Creative Mentorship", "Art Markets"],
  },
  culture: {
    icon: Drama,
    title: "Cultural Initiatives",
    link: "/culture",
    color: "text-amber-600",
    programs: ["Heritage Documentation", "Cultural Festivals", "Language Programs", "Elder Wisdom Sessions"],
  },
};

export function DashboardPrograms({ membership }: { membership: MembershipData | null }) {
  if (!membership) return null;

  const info = SECTOR_INFO[membership.sector];
  if (!info) return null;

  const Icon = info.icon;

  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="font-heading font-semibold text-lg mb-4">Your Programs & Activities</h3>

      <div className="rounded-lg border p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Icon className={`h-6 w-6 ${info.color}`} />
          <div>
            <h4 className="font-semibold">{info.title}</h4>
            <p className="text-xs text-muted-foreground">Specialty: {membership.subcategory}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Available Programs</p>
          <ul className="space-y-1.5">
            {info.programs.map((program) => (
              <li key={program} className="text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {program}
                {!membership.approved && (
                  <span className="text-xs text-yellow-600 ml-auto">(unlock on approval)</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Link to={info.link} className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3">
          Explore {info.title} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Upcoming events placeholder */}
      <div className="rounded-lg border border-dashed p-4 text-center">
        <p className="text-sm text-muted-foreground">Upcoming events will appear here</p>
        <Link to="/get-involved" className="text-sm text-primary hover:underline mt-1 inline-block">
          Browse all events →
        </Link>
      </div>
    </div>
  );
}
