import "server-only";

import { serverEnv } from "@/core/env/env";

const API_FRONTEND_HOSTS = new Set(["dev.sanch9.bet", "a66betl.vip"]);

export function localizeFrontendHref(href: string | null | undefined) {
  const value = href?.trim();

  if (!value) {
    return null;
  }

  if (value.startsWith("/")) {
    return value;
  }

  try {
    const url = new URL(value);
    if (!API_FRONTEND_HOSTS.has(url.hostname)) {
      return value;
    }

    if (!serverEnv.frontendUrl) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    const frontendUrl = new URL(serverEnv.frontendUrl);
    frontendUrl.pathname = url.pathname;
    frontendUrl.search = url.search;
    frontendUrl.hash = url.hash;
    return frontendUrl.toString();
  } catch {
    return value;
  }
}
