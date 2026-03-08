import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Award, BookOpen, Calendar, ShoppingBag } from "lucide-react";

export default function Dashboard() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-4xl">
          <SectionHeading title="My Dashboard" subtitle="Manage your membership and activity." />

          {/* Profile placeholder */}
          <div className="rounded-xl border bg-card p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold">Member Name</h2>
                <p className="text-muted-foreground">member@email.com</p>
                <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mt-1">
                  Free Member
                </span>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">Edit Profile</Button>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Award, title: "Membership", desc: "View your tier, benefits, and renewal status.", link: "/membership" },
              { icon: BookOpen, title: "Resources", desc: "Access guides, training materials, and downloads.", link: "#" },
              { icon: Calendar, title: "Events", desc: "See upcoming events and your registrations.", link: "#" },
              { icon: ShoppingBag, title: "Orders", desc: "Track your shop orders and purchases.", link: "/shop" },
            ].map((card) => (
              <Link key={card.title} to={card.link}>
                <div className="rounded-xl border bg-card p-6 hover-lift">
                  <card.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-lg">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Sign in to access your full dashboard. <Link to="/membership" className="text-primary hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
