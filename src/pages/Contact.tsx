import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_LOCATION, SOCIAL_LINKS } from "@/lib/constants";

export default function Contact() {
  const [data, setData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([data]);
      if (error) throw error;
      toast.success("Message sent! We'll get back to you soon.");
      setData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with questions, ideas, or just to say hello.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <SectionHeading title="Send a Message" align="left" />
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Your Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
                <Input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
                <Input placeholder="Subject (optional)" value={data.subject} onChange={(e) => setData({ ...data, subject: e.target.value })} />
                <Textarea placeholder="Your message" value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} required className="min-h-[150px]" />
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <SectionHeading title="Get in Touch" align="left" />
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary">{CONTACT_EMAIL}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{CONTACT_LOCATION}</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl border bg-muted aspect-video flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Map — Meru, Kenya</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8">
                <h3 className="font-heading font-semibold mb-3">Quick Forms</h3>
                <div className="flex flex-wrap gap-2">
                  <a href="/get-involved"><Button variant="outline" size="sm">Volunteer</Button></a>
                  <a href="/get-involved"><Button variant="outline" size="sm">Partner</Button></a>
                  <a href="/membership"><Button variant="outline" size="sm">Membership</Button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
