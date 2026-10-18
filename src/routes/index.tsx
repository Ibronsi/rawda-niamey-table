import { createFileRoute, redirect } from "@tanstack/react-router";

// The Rawda website is a pure HTML/CSS/JS site served from /public/site.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/site/index.html" });
  },
  head: () => ({
    meta: [
      { title: "Rawda Niamey — Boulangerie, Restaurant, Café & Glacier" },
      { name: "description", content: "Rawda Niamey : boulangerie, pâtisserie, fast-food, café et glacier." },
      { property: "og:title", content: "Rawda Niamey" },
      { property: "og:description", content: "Boulangerie, pâtisserie, fast-food, café et glacier à Niamey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
