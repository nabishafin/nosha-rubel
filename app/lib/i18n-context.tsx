import { createContext, useContext } from "react";
import { getInterfaceLocale, getTranslation, type Translation } from "./i18n";
import { DEFAULT_LANGUAGE } from "./languages";
import type { LanguageCode } from "./types";

interface I18nValue {
  lang: LanguageCode;
  t: Translation;
  interfaceLocale: string;
}

const I18nContext = createContext<I18nValue>({
  lang: DEFAULT_LANGUAGE,
  t: getTranslation(DEFAULT_LANGUAGE),
  interfaceLocale: getInterfaceLocale(DEFAULT_LANGUAGE),
});

export function I18nProvider({ lang, children }: { lang: LanguageCode; children: React.ReactNode }) {
  return <I18nContext.Provider value={{ lang, t: getTranslation(lang), interfaceLocale: getInterfaceLocale(lang) }}>{children}</I18nContext.Provider>;
}

/** Access the active language code and its translation dictionary. */
export function useI18n(): I18nValue {
  return useContext(I18nContext);
}

/** Build a locale-prefixed href, e.g. localePath("en", "news/foo") -> "/en/news/foo". */
export function localePath(lang: LanguageCode, path = ""): string {
  const clean = path.replace(/^\//, "");
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}
