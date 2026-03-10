import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success("Check your email for a reset link");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Mail className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-heading font-bold">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1">We'll send you a link to reset your password</p>
        </div>

        {sent ? (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
            <p className="text-sm text-green-800 dark:text-green-200">
              Password reset email sent! Check your inbox and follow the link to reset your password.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </div>
        )}

        <div className="text-center text-sm">
          <Link to="/login" className="text-primary hover:underline">← Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}
