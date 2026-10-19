import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { money, ORDER_STATUSES, nextStatus } from "@/lib/rawda";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type Status = Database["public"]["Enums"]["order_status"];
type Item = { name: string; price: number; quantity: number };

export function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"actives" | Status | "toutes">("actives");

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(300);
    if (error) toast.error(error.message);
    else setOrders(data);
  }, []);

  useEffect(() => {
    load();
    const ch = supabase
      .channel("admin-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (p) => {
        if (p.eventType === "INSERT") toast.success(`Nouvelle commande ${(p.new as Order).code}`);
        load();
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [load]);

  async function setStatus(o: Order, status: Status) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", o.id);
    if (error) toast.error(error.message);
    else load();
  }

  const shown = orders.filter((o) =>
    filter === "toutes" ? true : filter === "actives" ? !["livree", "annulee"].includes(o.status) : o.status === filter,
  );
  const today = orders.filter((o) => new Date(o.created_at).toDateString() === new Date().toDateString() && o.status !== "annulee");

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Commandes du jour" value={String(today.length)} />
        <Stat label="Chiffre du jour" value={money(today.reduce((s, o) => s + o.total, 0))} />
        <Stat label="À préparer" value={String(orders.filter((o) => o.status === "recue").length)} />
        <Stat label="En cours" value={String(orders.filter((o) => ["preparation", "prete"].includes(o.status)).length)} />
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {(["actives", ...ORDER_STATUSES.map((s) => s.id), "toutes"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f as typeof filter)}
            className={`rounded-full border px-3 py-1 text-xs ${filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
            {f === "actives" ? "En cours" : f === "toutes" ? "Historique complet" : ORDER_STATUSES.find((s) => s.id === f)?.label}
          </button>
        ))}
      </div>
      {shown.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Aucune commande ici.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {shown.map((o) => {
          const next = nextStatus(o.status);
          const st = ORDER_STATUSES.find((s) => s.id === o.status)!;
          return (
            <article key={o.id} className="rounded border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-xl font-semibold">{o.code}</p>
                  <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${st.badge}`}>{st.label}</span>
              </div>
              <p className="mt-3 text-sm"><b>{o.customer_name}</b> · <a className="text-accent underline" href={`tel:${o.phone}`}>{o.phone}</a></p>
              <p className="text-xs text-muted-foreground">{o.fulfillment}{o.address ? ` — ${o.address}` : ""}</p>
              <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
                {(o.items as Item[]).map((it, i) => (
                  <li key={i} className="flex justify-between"><span>{it.quantity} × {it.name}</span><span className="text-muted-foreground">{money(it.price * it.quantity)}</span></li>
                ))}
              </ul>
              <p className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-bold"><span>Total</span><span>{money(o.total)}</span></p>
              <div className="mt-4 flex flex-wrap gap-2">
                {next && (
                  <button onClick={() => setStatus(o, next.id)} className="rounded bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90">
                    → {next.label}
                  </button>
                )}
                <a target="_blank" rel="noopener" href={`https://wa.me/${o.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${o.customer_name}, votre commande Rawda ${o.code} est : ${st.label}.`)}`}
                  className="rounded border border-border px-3 py-2 text-xs">WhatsApp client</a>
                {o.status !== "annulee" && o.status !== "livree" && (
                  <button onClick={() => confirm("Annuler cette commande ?") && setStatus(o, "annulee")} className="rounded px-3 py-2 text-xs text-destructive">Annuler</button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-card p-4">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-serif text-2xl font-semibold">{value}</p>
    </div>
  );
}
