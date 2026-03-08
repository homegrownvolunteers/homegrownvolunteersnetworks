import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DONATION_TIERS } from "@/lib/constants";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";

export default function GetInvolved() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Get Involved</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            There are many ways to join the movement. Volunteer, partner, or support our work.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <VolunteerForm />
            <PartnerForm />
            <DonateSection />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function VolunteerForm() {
  const [data, setData] = useState({ full_name: "", email: "", phone: "", hours_per_week: "", skills: "" });
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
      const { error } = await supabase.from("volunteers").insert([{ ...data, areas_of_interest: interests }]);
      if (error) throw error;
      toast.success("Application submitted!");
      setData({ full_name: "", email: "", phone: "", hours_per_week: "", skills: "" });
      setInterests([]);
    } catch { toast.error("Failed to submit."); }
    setSubmitting(false);
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="font-heading font-bold text-xl mb-1">🤝 Volunteer</h3>
      <p className="text-sm text-muted-foreground mb-4">Give your time and skills to the community.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Full Name" value={data.full_name} onChange={(e) => setData({ ...data, full_name: e.target.value })} required />
        <Input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
        <Input placeholder="Phone (optional)" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
        <div>
          <p className="text-sm font-medium mb-2">Areas of Interest</p>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer">
                <Checkbox checked={interests.includes(opt)} onCheckedChange={() => toggleInterest(opt)} />
                {opt}
              </label>
            ))}
          </div>
        </div>
        <Input placeholder="Hours per week" value={data.hours_per_week} onChange={(e) => setData({ ...data, hours_per_week: e.target.value })} />
        <Textarea placeholder="Skills & experience" value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} />
        <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Submitting..." : "Apply"}</Button>
      </form>
    </div>
  );
}

function PartnerForm() {
  const [data, setData] = useState({ organization_name: "", contact_name: "", email: "", phone: "", partnership_type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("partnerships").insert([data]);
      if (error) throw error;
      toast.success("Inquiry submitted!");
      setData({ organization_name: "", contact_name: "", email: "", phone: "", partnership_type: "", message: "" });
    } catch { toast.error("Failed to submit."); }
    setSubmitting(false);
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="font-heading font-bold text-xl mb-1">🏢 Partner With Us</h3>
      <p className="text-sm text-muted-foreground mb-4">Organizations and institutions — let's collaborate.</p>
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
    </div>
  );
}

function DonateSection() {
  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [data, setData] = useState({ donor_name: "", donor_email: "", donor_phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const finalAmount = amount || Number(custom) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) { toast.error("Please select or enter an amount."); return; }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("donations").insert([{ ...data, amount: finalAmount, frequency }]);
      if (error) throw error;
      toast.success("Thank you for your generous donation! Payment processing coming soon.");
      setAmount(null);
      setCustom("");
      setData({ donor_name: "", donor_email: "", donor_phone: "", message: "" });
    } catch { toast.error("Failed to submit."); }
    setSubmitting(false);
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="font-heading font-bold text-xl mb-1">❤️ Donate</h3>
      <p className="text-sm text-muted-foreground mb-4">Support our mission directly.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {DONATION_TIERS.map((tier) => (
            <Button
              key={tier.amount}
              type="button"
              variant={amount === tier.amount ? "default" : "outline"}
              size="sm"
              onClick={() => { setAmount(tier.amount); setCustom(""); }}
              className="text-xs"
            >
              {tier.label}
            </Button>
          ))}
        </div>
        <Input type="number" placeholder="Custom amount (KES)" value={custom} onChange={(e) => { setCustom(e.target.value); setAmount(null); }} />
        {finalAmount > 0 && (
          <p className="text-xs text-muted-foreground italic">
            {DONATION_TIERS.find((t) => t.amount <= finalAmount)?.impact || "Every shilling makes a difference!"}
          </p>
        )}
        <div className="flex gap-2">
          <Button type="button" variant={frequency === "one_time" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setFrequency("one_time")}>One-time</Button>
          <Button type="button" variant={frequency === "monthly" ? "default" : "outline"} size="sm" className="flex-1" onClick={() => setFrequency("monthly")}>Monthly</Button>
        </div>
        <Input placeholder="Your Name" value={data.donor_name} onChange={(e) => setData({ ...data, donor_name: e.target.value })} required />
        <Input type="email" placeholder="Email" value={data.donor_email} onChange={(e) => setData({ ...data, donor_email: e.target.value })} required />
        <Input placeholder="Phone (optional)" value={data.donor_phone} onChange={(e) => setData({ ...data, donor_phone: e.target.value })} />
        <Textarea placeholder="Message (optional)" value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} />
        <Button type="submit" className="w-full" disabled={submitting}>
          <Heart className="mr-2 h-4 w-4" /> {submitting ? "Processing..." : `Donate KES ${finalAmount.toLocaleString()}`}
        </Button>
        <p className="text-xs text-center text-muted-foreground">M-Pesa & card payment coming soon</p>
      </form>
    </div>
  );
}
