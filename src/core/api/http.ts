import { env } from "@/core/env/env";

export function apiUrl(path: string) {
  return `${env.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
