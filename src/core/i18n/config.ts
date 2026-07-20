import { appConfig } from "@/core/config/app";

export const locales = appConfig.supportedLocales;
export const defaultLocale = appConfig.defaultLocale;
export type AppLocale = (typeof locales)[number];
