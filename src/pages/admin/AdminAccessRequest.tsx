import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function AdminAccessRequest() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, check if user has an account
      const { data: { users } } = await supabase.auth.admin.listUsers();
      const userExists = users?.some((u) => u.email === email);

      if (!userExists) {
        toast.error("Please create an account first before requesting admin access");
        navigate("/admin/register");
        return;
      }

      // Submit admin request
      const { error } = await supabase.from("admin_requests").insert([
        {
          email,
          status: "pending",
        },
      ]);

      if (error) {
        if (error.message.includes("duplicate")) {
          toast.error("You already have a pending request");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Admin access request submitted! Current admins will review your request.");
        setEmail("");
        setName("");
        setReason("");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-heading font-bold">Request Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-2">Join the administrative team at Homegrown</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
          <p className="text-blue-900 dark:text-blue-100">
            To request admin access, you must first have created an account. Existing admins will review your request and grant access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Must be the same email as your registered account
            </p>
          </div>

          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="reason">Why do you want admin access?</Label>
            <Textarea
              id="reason"
              placeholder="Tell us about your interest in joining the admin team..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>

        <div className="text-center text-sm space-y-1">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/admin/register")}
              className="text-primary hover:underline"
            >
              Create one first
            </button>
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:underline block w-full"
          >
            ← Back to site
          </button>
        </div>
      </div>
    </div>
  );
}
