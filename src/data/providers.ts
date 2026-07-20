import type { Provider } from "@/data/types";

export const providers: Provider[] = [
  { id: "all", slug: "all", name: "Todos", shortName: "Todos", featured: true },
  { id: "pg", slug: "pg", name: "PG Soft", shortName: "PG", featured: true },
  { id: "pp", slug: "pp", name: "Pragmatic Play", shortName: "PP", featured: true },
  { id: "jdb", slug: "jdb", name: "JDB", shortName: "JDB" },
  { id: "tada", slug: "tada", name: "TADA", shortName: "TADA" },
  { id: "wg", slug: "wg", name: "WG", shortName: "WG" },
  { id: "evo", slug: "evo", name: "Evolution", shortName: "Evo" },
];
