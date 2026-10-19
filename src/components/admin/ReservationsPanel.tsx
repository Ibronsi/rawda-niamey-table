import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Resa = Database["public"]["Tables"]["reservations"]["Row"];
const STATUS: Record<string, { label: string; cls: string }> = {
  nouvelle: { label: "Nouvelle", cls: "bg-warning/20 text-foreground" },
  confirmee: { label: "Confirmée", cls: "bg-success/20 text-success" },
  annulee: { label: "Annulée", cls: "bg-destructive/15 text-destructive" },
};

export function ReservationsPanel() {
  const [rows, setRows] = useState<Resa[]>([]);
  const [upcoming, setUpcoming] = useState(true);

  const load = useCallback(async () => {
    let q = supabase.from("reservations").select("*").order("date", { ascending: upcoming }).order("time").limit(300);
    if (upcoming) q = q.gte("date", new Date().toISOString().slice(0, 10));
    const { data, error } = await q;
    if (error) toast.error(error.message);
    else setRows(data);
  }, [upcoming]);

  useEffect(() => {
    load();
    const ch = supabase.channel("admin-resa")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations" }, (p) => {
        if (p.eventType === "INSERT") toast.success("Nouvelle réservation");
        load();
      }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [load]);

  async function setStatus(r: Resa, status: string) {
    const { error } = await supabase.from("reservations").update({ status }).eq("id", r.id);
    if (error) toast.error(error.message);
    else load();
  }

  return (
    <div>
      <div className="mb-5 flex gap-2">
        {[true, false].map((u) => (
          <button key={String(u)} onClick={() => setUpcoming(u)}
            className={`rounded-full border px-3 py-1 text-xs ${upcoming === u ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
            {u ? "À venir" : "Historique complet"}
          </button>
        ))}
      </div>
      {rows.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">Aucune réservation.</p>}
      <div className="overflow-x-auto rounded border border-border bg-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-secondary text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr><th className="p-3">Date</th><th className="p-3">Client</th><th className="p-3">Demande</th><th className="p-3">Pers.</th><th className="p-3">Statut</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <td className="p-3 whitespace-nowrap">{new Date(r.date + "T00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}<br /><span className="text-muted-foreground">{r.time}</span></td>
                <td className="p-3">{r.customer_name}<br /><a className="text-accent underline" href={`tel:${r.phone}`}>{r.phone}</a></td>
                <td className="p-3">{r.kind}{r.notes && <p className="text-xs text-muted-foreground">{r.notes}</p>}</td>
                <td className="p-3">{r.guests}</td>
                <td className="p-3"><span className={`rounded-full px-2.5 py-1 text-[11px] ${STATUS[r.status]?.cls}`}>{STATUS[r.status]?.label ?? r.status}</span></td>
                <td className="p-3 whitespace-nowrap text-xs">
                  {r.status !== "confirmee" && <button className="mr-3 text-success underline" onClick={() => setStatus(r, "confirmee")}>Confirmer</button>}
                  {r.status !== "annulee" && <button className="text-destructive underline" onClick={() => setStatus(r, "annulee")}>Annuler</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
