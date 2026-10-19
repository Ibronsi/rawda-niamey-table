export type OrderStatus = "recue" | "preparation" | "prete" | "livree" | "annulee";

export const money = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;

export const ORDER_STATUSES: { id: OrderStatus; label: string; badge: string }[] = [
  { id: "recue", label: "Reçue", badge: "bg-warning/20 text-foreground" },
  { id: "preparation", label: "En préparation", badge: "bg-accent/15 text-accent" },
  { id: "prete", label: "Prête", badge: "bg-success/20 text-success" },
  { id: "livree", label: "Livrée", badge: "bg-primary text-primary-foreground" },
  { id: "annulee", label: "Annulée", badge: "bg-destructive/15 text-destructive" },
];

/** The order flow is: Reçue → En préparation → Prête → Livrée. */
export function nextStatus(s: OrderStatus) {
  const flow: OrderStatus[] = ["recue", "preparation", "prete", "livree"];
  const i = flow.indexOf(s);
  if (i < 0 || i === flow.length - 1) return null;
  return ORDER_STATUSES.find((x) => x.id === flow[i + 1])!;
}

export const CATEGORIES = ["Burgers", "Pizzas", "Sandwichs", "Poulet", "Boulangerie", "Pâtisserie", "Glaces", "Boissons"];
