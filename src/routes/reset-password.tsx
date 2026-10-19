import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Nouveau mot de passe — Rawda" },
      { name: "description", content: "Choisir un nouveau mot de passe pour l’espace gérant Rawda." },
      { property: "og:title", content: "Nouveau mot de passe — Rawda" },
      { property: "og:description", content: "Espace gérant Rawda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password"));
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Mot de passe mis à jour");
    navigate({ to: "/admin" });
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded border border-border bg-card p-8">
        <h1 className="font-serif text-3xl">Nouveau mot de passe</h1>
        <input name="password" type="password" minLength={8} required autoComplete="new-password" className="mt-6 w-full rounded border border-input bg-background px-3 py-2.5 text-sm" />
        <button disabled={busy} className="mt-4 w-full rounded bg-primary py-3 text-sm text-primary-foreground disabled:opacity-50">Enregistrer</button>
      </form>
    </div>
  );
}
