import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SITE_NAME, CONTACT_EMAIL, CONTACT_LOCATION, SOCIAL_LINKS } from "@/lib/constants";
import { Youtube, Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-accent text-accent-foreground pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading font-bold text-xl flex items-center gap-2 mb-4">
              <span className="text-2xl">🌱</span> {SITE_NAME}
            </Link>
            <p className="text-sm opacity-80 mb-4">
              Recreating proud, resilient, thriving local communities through agriculture, arts, and culture.
            </p>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Programs", href: "/programs" },
                { label: "Get Involved", href: "/get-involved" },
                { label: "Shop", href: "/shop" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="opacity-80 hover:opacity-100 hover:text-secondary transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 opacity-80">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <MapPin className="h-4 w-4" />
                <span>{CONTACT_LOCATION}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm opacity-80 mb-3">Get updates on events, stories, and opportunities.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50"
                required
              />
              <Button type="submit" variant="secondary" size="sm">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 pt-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved. From Our Roots, We Rise.
        </div>
      </div>
    </footer>
  );
}
