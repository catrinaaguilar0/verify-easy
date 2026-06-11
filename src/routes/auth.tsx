import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Inloggen — Beheer" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/brands", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin/brands" },
        });
        if (error) throw error;
        toast.success("Account aangemaakt. Vraag een admin om je rol toe te kennen.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin/brands", replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Onbekende fout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-surface px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-background p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink">
          {mode === "signin" ? "Inloggen" : "Account aanmaken"}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Beheer merklogo's en volgorde. Alleen voor beheerders.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Wachtwoord</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Bezig…" : mode === "signin" ? "Inloggen" : "Registreren"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-sm text-accent hover:underline"
        >
          {mode === "signin" ? "Nog geen account? Registreren" : "Al een account? Inloggen"}
        </button>
        <Link
          to="/"
          className="mt-6 block text-center text-xs uppercase tracking-wider text-ink-soft hover:text-ink"
        >
          ← Terug naar website
        </Link>
      </div>
    </div>
  );
}
