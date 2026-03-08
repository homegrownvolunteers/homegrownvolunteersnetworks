import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Users, Handshake, ArrowRight, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const VOLUNTEER_BENEFITS = [
  "Make a real impact in local communities",
  "Gain hands-on experience in agriculture, arts & culture",
  "Connect with a network of 2,500+ changemakers",
  "Develop leadership and teamwork skills",
  "Be part of Kenya's grassroots transformation",
  "Access training workshops and mentorship",
];

const WAYS_TO_HELP = [
  {
    icon: Users,
    title: "Volunteer Your Time",
    desc: "Join community programs — from farm days to arts workshops. No experience needed, just passion.",
    cta: "volunteer",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    desc: "Organizations, institutions, and businesses — let's create lasting impact together.",
    cta: "partner",
  },
  {
    icon: Heart,
    title: "Donate",
    desc: "Every shilling supports a farmer, inspires an artist, and preserves a tradition.",
    cta: "donate",
  },
];

export default function GetInvolved() {
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const heroRef = useScrollReveal();
  const benefitsStagger = useStaggerReveal(VOLUNTEER_BENEFITS.length, 80);
  const waysStagger = useStaggerReveal(WAYS_TO_HELP.length, 150);

  const handleCtaClick = (cta: string) => {
    if (cta === "volunteer") setShowVolunteerForm(true);
    else if (cta === "partner") setShowPartnerForm(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute top-16 left-8 text-6xl opacity-10 animate-float">🤝</div>
        <div className="absolute bottom-20 right-12 text-5xl opacity-10 animate-float" style={{ animationDelay: "1.5s" }}>🌍</div>
        <div ref={heroRef.ref} className="container text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 opacity-0 animate-hero-text">
            Be the <span className="text-primary">Change</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 opacity-0 animate-blur-in" style={{ animationDelay: "0.3s" }}>
            There are many ways to join the movement. Volunteer your time, partner with us, or support our work — every action counts.
          </p>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="How You Can Help" subtitle="Choose how you'd like to make a difference." />
          <div ref={waysStagger.ref} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {WAYS_TO_HELP.map((way, i) => (
              <div
                key={way.title}
                className={cn(
                  "group relative rounded-2xl border-2 border-border bg-card p-8 text-center opacity-0",
                  "transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-2xl",
                  waysStagger.visibleItems[i] && "animate-stagger-in"
                )}
              >
                <way.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-xl mb-3">{way.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{way.desc}</p>
                {way.cta === "donate" ? (
                  <Link to="/donate">
                    <Button>
                      Donate Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button onClick={() => handleCtaClick(way.cta)}>
                    {way.cta === "volunteer" ? "Apply to Volunteer" : "Start a Partnership"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <SectionHeading title="Why Volunteer With Us?" align="left" />
              <p className="text-muted-foreground mb-4">
                Volunteering with the Homegrown Volunteer Network is more than giving time — it's joining a family of changemakers who believe in the power of local communities.
              </p>
              <p className="text-muted-foreground mb-6">
                Become a <strong className="text-foreground">Homegrown Enabler</strong> — choose your track in community storytelling, agriculture initiatives, cultural documentation, or media & creative production.
              </p>
              <Button size="lg" onClick={() => setShowVolunteerForm(true)}>
                Join as a Volunteer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div ref={benefitsStagger.ref} className="space-y-3">
              {VOLUNTEER_BENEFITS.map((benefit, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg bg-background border opacity-0",
                    benefitsStagger.visibleItems[i] && "animate-stagger-in"
                  )}
                >
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
            Join thousands of volunteers transforming communities across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" onClick={() => setShowVolunteerForm(true)}>
              Become a Volunteer
            </Button>
            <Link to="/donate">
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Heart className="mr-2 h-4 w-4" /> Support Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer Dialog */}
      <Dialog open={showVolunteerForm} onOpenChange={setShowVolunteerForm}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Volunteer Application</DialogTitle>
            <DialogDescription>Fill out the form and we'll get back to you soon.</DialogDescription>
          </DialogHeader>
          <VolunteerForm onSuccess={() => setShowVolunteerForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Partner Dialog */}
      <Dialog open={showPartnerForm} onOpenChange={setShowPartnerForm}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Partnership Inquiry</DialogTitle>
            <DialogDescription>Tell us about your organization and how we can collaborate.</DialogDescription>
          </DialogHeader>
          <PartnerForm onSuccess={() => setShowPartnerForm(false)} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

function VolunteerForm({ onSuccess }: { onSuccess: () => void }) {
  const [data, setData] = useState({
    full_name: "", email: "", phone: "", hours_per_week: "", skills: "",
    location: "", experience: "", why_join: "",
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const INTEREST_OPTIONS = ["Agriculture", "Arts", "Culture", "Media", "Events", "Education", "Environment"];

  const toggleInterest = (interest: string) => {
    setInterests((prev) => prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.length === 0) { toast.error("Select at least one area of interest."); return; }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("volunteers").insert([{
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        hours_per_week: data.hours_per_week || null,
        skills: data.skills || null,
        location: data.location || null,
        experience: data.experience || null,
        why_join: data.why_join || null,
        areas_of_interest: interests,
      }]);
      if (error) throw error;
      toast.success("Application submitted! We'll be in touch.");
      onSuccess();
    } catch { toast.error("Failed to submit."); }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input placeholder="Full Name *" value={data.full_name} onChange={(e) => setData({ ...data, full_name: e.target.value })} required />
      <Input type="email" placeholder="Email *" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
      <Input placeholder="Phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
      <Input placeholder="Location (city/county)" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} />
      <div>
        <p className="text-sm font-medium mb-2">Areas of Interest *</p>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <Checkbox checked={interests.includes(opt)} onCheckedChange={() => toggleInterest(opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <Input placeholder="Hours per week you can commit" value={data.hours_per_week} onChange={(e) => setData({ ...data, hours_per_week: e.target.value })} />
      <Textarea placeholder="Your skills (e.g., photography, farming, teaching)" value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} />
      <Textarea placeholder="Tell us about your relevant experience" value={data.experience} onChange={(e) => setData({ ...data, experience: e.target.value })} />
      <Textarea placeholder="Why would you like to join HVN? *" value={data.why_join} onChange={(e) => setData({ ...data, why_join: e.target.value })} required />
      <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Submitting..." : "Apply"}</Button>
    </form>
  );
}

function PartnerForm({ onSuccess }: { onSuccess: () => void }) {
  const [data, setData] = useState({ organization_name: "", contact_name: "", email: "", phone: "", partnership_type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("partnerships").insert([data]);
      if (error) throw error;
      toast.success("Inquiry submitted!");
      onSuccess();
    } catch { toast.error("Failed to submit."); }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input placeholder="Organization Name" value={data.organization_name} onChange={(e) => setData({ ...data, organization_name: e.target.value })} required />
      <Input placeholder="Contact Name" value={data.contact_name} onChange={(e) => setData({ ...data, contact_name: e.target.value })} required />
      <Input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
      <Input placeholder="Phone (optional)" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
      <Select value={data.partnership_type} onValueChange={(v) => setData({ ...data, partnership_type: v })}>
        <SelectTrigger><SelectValue placeholder="Partnership Type" /></SelectTrigger>
        <SelectContent>
          {["Funding", "Technical", "Media", "Research", "Other"].map((t) => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea placeholder="Your message or proposal" value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} required />
      <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Submitting..." : "Send Inquiry"}</Button>
    </form>
  );
}
