import { describe, expect, it } from "vitest";
import { nextStatus } from "@/lib/rawda";

describe("suivi des commandes", () => {
  it("Reçue passe à En préparation", () => expect(nextStatus("recue")?.id).toBe("preparation"));
  it("En préparation passe à Prête", () => expect(nextStatus("preparation")?.id).toBe("prete"));
  it("Prête passe à Livrée", () => expect(nextStatus("prete")?.id).toBe("livree"));
  it("Livrée est la dernière étape", () => expect(nextStatus("livree")).toBeNull());
});
