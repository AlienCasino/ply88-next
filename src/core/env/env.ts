import "server-only";

function readServerEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export const serverEnv = {
  apiUrl: readServerEnv("API_URL") ?? readServerEnv("NEXT_PUBLIC_API_URL"),
  frontendUrl: readServerEnv("NEXT_PUBLIC_FRONTEND_URL"),
} as const;
