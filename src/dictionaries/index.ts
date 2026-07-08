import { vi } from "./vi";
import { en } from "./en";
import { zh } from "./zh";

export const locales = ["vi", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof vi;

export const localeLabels: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
  zh: "中文",
};

const dicts: Record<Locale, Dictionary> = { vi, en, zh };

export function isLocale(lang: string): lang is Locale {
  return (locales as readonly string[]).includes(lang);
}

export function getDictionary(lang: string): Dictionary {
  return isLocale(lang) ? dicts[lang] : dicts.vi;
}

export function langAlternates(path: string) {
  return {
    languages: {
      vi: `/vi${path}`,
      en: `/en${path}`,
      "zh-Hans": `/zh${path}`,
      "x-default": `/vi${path}`,
    },
  };
}

export function tpl(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
