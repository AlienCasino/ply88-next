import { locales } from "@/core/i18n/config";

export function LanguageSwitcher() {
  return <span className="text-sm text-foreground">{locales.join(" / ")}</span>;
}
