import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function LoginCard() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password"));
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("Email ou mot de passe incorrect");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) toast.error(error.message);
      else toast.success("Compte créé. Vous êtes connecté.");
    }
    setBusy(false);
  }

  async function forgot() {
    const email = (document.querySelector<HTMLInputElement>("#admin-email")?.value || "").trim();
    if (!email) return void toast.error("Saisissez d’abord votre email");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Un lien de réinitialisation a été envoyé.");
  }

  const input = "mt-1 w-full rounded border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring";
  return (
    <div className="mx-auto mt-10 max-w-sm rounded border border-border bg-card p-8">
      <h1 className="font-serif text-3xl">{mode === "in" ? "Connexion" : "Créer le compte gérant"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {mode === "in" ? "Accès réservé à l’équipe Rawda." : "Le premier compte créé devient le compte gérant."}
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-xs font-medium text-muted-foreground">Email
          <input id="admin-email" name="email" type="email" required autoComplete="email" className={input} />
        </label>
        <label className="block text-xs font-medium text-muted-foreground">Mot de passe
          <input name="password" type="password" required minLength={8} autoComplete={mode === "in" ? "current-password" : "new-password"} className={input} />
        </label>
        <button disabled={busy} className="w-full rounded bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
          {busy ? "Patientez…" : mode === "in" ? "Se connecter" : "Créer le compte"}
        </button>
      </form>
      <div className="mt-5 flex justify-between text-xs">
        <button className="text-accent underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
          {mode === "in" ? "Première fois ? Créer le compte" : "J’ai déjà un compte"}
        </button>
        {mode === "in" && <button className="text-muted-foreground underline" onClick={forgot}>Mot de passe oublié</button>}
      </div>
    </div>
  );
}
