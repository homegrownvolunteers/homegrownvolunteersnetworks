import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sprout } from "lucide-react";

export default function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img src="/assets/images/logo/hvnlogo.jpeg" alt="HVN Logo" className="h-16 w-auto mx-auto mb-3 rounded-xl" />
          </Link>
          <h1 className="text-2xl font-heading font-bold">Member Sign In</h1>
          <p className="text-sm text-muted-foreground mt-1">Access your HVN dashboard</p>
        </div>

        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm space-y-2">
          <p>
            Don't have an account?{" "}
            <Link to="/membership" className="text-primary hover:underline font-medium">Join HVN</Link>
          </p>
          <Link to="/forgot-password" className="text-muted-foreground hover:underline block">Forgot password?</Link>
          <Link to="/" className="text-muted-foreground hover:underline block">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
