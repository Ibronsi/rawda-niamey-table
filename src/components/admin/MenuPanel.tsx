import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { CATEGORIES, money } from "@/lib/rawda";

type Dish = Database["public"]["Tables"]["dishes"]["Row"];
const field = "w-full rounded border border-input bg-background px-2.5 py-2 text-sm outline-none focus:border-ring";

export function MenuPanel() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editing, setEditing] = useState<Dish | "new" | null>(null);
  const [cat, setCat] = useState("Tous");

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("dishes").select("*").order("sort_order").order("created_at");
    if (error) toast.error(error.message);
    else setDishes(data);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function toggle(d: Dish) {
    const { error } = await supabase.from("dishes").update({ available: !d.available }).eq("id", d.id);
    if (error) return toast.error(error.message);
    toast.success(d.available ? `${d.name} marqué épuisé` : `${d.name} de nouveau disponible`);
    load();
  }
  async function remove(d: Dish) {
    if (!confirm(`Supprimer « ${d.name} » de la carte ?`)) return;
    const { error } = await supabase.from("dishes").delete().eq("id", d.id);
    if (error) toast.error(error.message);
    else load();
  }

  const shown = cat === "Tous" ? dishes : dishes.filter((d) => d.category === cat);
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {["Tous", ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1 text-xs ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>{c}</button>
          ))}
        </div>
        <button onClick={() => setEditing("new")} className="rounded bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90">+ Ajouter un produit</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((d) => (
          <article key={d.id} className={`flex gap-3 rounded border border-border bg-card p-3 ${d.available ? "" : "opacity-60"}`}>
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-muted">
              {d.image_url && <img src={d.image_url} alt={d.name} className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-base font-semibold">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.category} · <b className="text-accent">{money(d.price)}</b></p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                <button onClick={() => toggle(d)} className={d.available ? "text-destructive underline" : "text-success underline"}>
                  {d.available ? "Marquer épuisé" : "Remettre en vente"}
                </button>
                <button onClick={() => setEditing(d)} className="underline">Modifier</button>
                <button onClick={() => remove(d)} className="text-muted-foreground underline">Supprimer</button>
              </div>
              {!d.available && <span className="mt-1 inline-block rounded bg-destructive/15 px-2 py-0.5 text-[10px] font-bold uppercase text-destructive">Épuisé</span>}
            </div>
          </article>
        ))}
      </div>
      {editing && <DishForm dish={editing === "new" ? null : editing} count={dishes.length} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
    </div>
  );
}

function DishForm({ dish, count, onClose, onSaved }: { dish: Dish | null; count: number; onClose: () => void; onSaved: () => void }) {
  const [image, setImage] = useState(dish?.image_url ?? "");
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    if (file.size > 5 * 1024 * 1024) return toast.error("Photo trop lourde (5 Mo max)");
    setBusy(true);
    const path = `${crypto.randomUUID()}.${file.name.split(".").pop() || "jpg"}`;
    const { error } = await supabase.storage.from("dish-images").upload(path, file, { contentType: file.type });
    if (error) { setBusy(false); return toast.error(error.message); }
    const { data, error: e2 } = await supabase.storage.from("dish-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    setBusy(false);
    if (e2 || !data) return toast.error(e2?.message ?? "Erreur photo");
    setImage(data.signedUrl);
    toast.success("Photo ajoutée");
  }

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const row = {
      name: String(f.get("name")).trim(),
      category: String(f.get("category")),
      description: String(f.get("description")).trim(),
      price: Math.max(0, Math.round(Number(f.get("price")) || 0)),
      image_url: image || null,
      available: f.get("available") === "on",
    };
    if (!row.name) return toast.error("Le nom est obligatoire");
    setBusy(true);
    const { error } = dish
      ? await supabase.from("dishes").update(row).eq("id", dish.id)
      : await supabase.from("dishes").insert({ ...row, sort_order: count + 1 });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Carte mise à jour");
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t bg-card p-6 sm:rounded">
        <h2 className="font-serif text-2xl">{dish ? "Modifier le produit" : "Nouveau produit"}</h2>
        <div className="mt-5 space-y-4">
          <label className="block text-xs text-muted-foreground">Nom<input name="name" defaultValue={dish?.name} required className={field} /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-muted-foreground">Catégorie
              <select name="category" defaultValue={dish?.category ?? CATEGORIES[0]} className={field}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <label className="block text-xs text-muted-foreground">Prix (FCFA)<input name="price" type="number" min={0} step={50} defaultValue={dish?.price ?? 0} required className={field} /></label>
          </div>
          <label className="block text-xs text-muted-foreground">Description<textarea name="description" rows={2} defaultValue={dish?.description} className={field} /></label>
          <div className="text-xs text-muted-foreground">Photo
            <div className="mt-1 flex items-center gap-3">
              <div className="h-20 w-20 overflow-hidden rounded bg-muted">{image && <img src={image} alt="" className="h-full w-full object-cover" />}</div>
              <label className="cursor-pointer rounded border border-border px-3 py-2 text-foreground">
                {busy ? "Envoi…" : "Choisir une photo"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
              </label>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm"><input name="available" type="checkbox" defaultChecked={dish?.available ?? true} /> Disponible à la vente</label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-muted-foreground">Annuler</button>
          <button disabled={busy} className="rounded bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}
