import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LoginCard } from "@/components/admin/LoginCard";
import { OrdersPanel } from "@/components/admin/OrdersPanel";
import { ReservationsPanel } from "@/components/admin/ReservationsPanel";
import { MenuPanel } from "@/components/admin/MenuPanel";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Espace gérant — Rawda Niamey" },
      { name: "description", content: "Gestion de la carte, des commandes et des réservations de Rawda." },
      { property: "og:title", content: "Espace gérant — Rawda Niamey" },
      { property: "og:description", content: "Gestion de la carte, des commandes et des réservations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Tab = "orders" | "reservations" | "menu";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("orders");

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return setIsAdmin(null);
    supabase
      .rpc("has_role", { _user_id: session.user.id, _role: "admin" })
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        setIsAdmin(!!data);
      });
  }, [session]);

  if (!ready) return <Shell><p className="text-muted-foreground">Chargement…</p></Shell>;
  if (!session) return <Shell><LoginCard /></Shell>;
  if (isAdmin === null) return <Shell><p className="text-muted-foreground">Vérification…</p></Shell>;
  if (!isAdmin)
    return (
      <Shell>
        <div className="mx-auto max-w-md rounded border border-border bg-card p-8 text-center">
          <h2 className="font-serif text-2xl">Accès réservé</h2>
          <p className="mt-2 text-sm text-muted-foreground">Ce compte n’a pas les droits de gérant.</p>
          <button className="mt-6 text-sm text-accent underline" onClick={() => supabase.auth.signOut()}>Se déconnecter</button>
        </div>
      </Shell>
    );

  const tabs: [Tab, string][] = [["orders", "Commandes"], ["reservations", "Réservations"], ["menu", "La carte"]];
  return (
    <Shell
      right={
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-muted-foreground sm:inline">{session.user.email}</span>
          <button className="text-accent underline" onClick={() => supabase.auth.signOut()}>Déconnexion</button>
        </div>
      }
    >
      <nav className="mb-8 flex gap-6 overflow-x-auto border-b border-border">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${tab === id ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </nav>
      {tab === "orders" && <OrdersPanel />}
      {tab === "reservations" && <ReservationsPanel />}
      {tab === "menu" && <MenuPanel />}
    </Shell>
  );
}

function Shell({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border bg-card px-5 py-4 md:px-10">
        <a href="/site/index.html" className="flex items-baseline gap-3">
          <span className="font-serif text-2xl font-bold text-foreground">rawda</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Espace gérant</span>
        </a>
        {right}
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 md:px-10">{children}</main>
    </div>
  );
}


