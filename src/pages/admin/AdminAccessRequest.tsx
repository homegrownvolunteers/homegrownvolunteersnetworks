import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function AdminAccessRequest() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-heading font-bold">Request Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-2">Contact an existing admin to get access</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
          <p className="text-blue-900 dark:text-blue-100">
            Admin access is granted by existing administrators. Please contact your organization's admin to request access.
          </p>
        </div>

        <div className="text-center text-sm space-y-1">
          <button onClick={() => navigate("/admin/login")} className="text-primary hover:underline block w-full">
            Already have access? Sign in
          </button>
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:underline block w-full">
            ← Back to site
          </button>
        </div>
      </div>
    </div>
  );
}
