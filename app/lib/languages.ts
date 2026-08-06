import { LANGUAGE_CODES, type LanguageCode } from "./types";

export interface LanguageInfo {
  code: LanguageCode;
  /** Name written in the language itself. */
  nativeName: string;
  /** Name in English for accessibility / fallback. */
  englishName: string;
  /** Representative country flag emoji. */
  flag: string;
  /** BCP-47 tag used for <html lang> and hreflang. */
  locale: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: Record<LanguageCode, LanguageInfo> = {
  de: { code: "de", nativeName: "Deutsch", englishName: "German", flag: "🇩🇪", locale: "de-DE", dir: "ltr" },
  en: { code: "en", nativeName: "English", englishName: "English", flag: "🇬🇧", locale: "en-US", dir: "ltr" },
  zh: { code: "zh", nativeName: "中文", englishName: "Chinese", flag: "🇨🇳", locale: "zh-CN", dir: "ltr" },
  es: { code: "es", nativeName: "Español", englishName: "Spanish", flag: "🇪🇸", locale: "es-ES", dir: "ltr" },
  fr: { code: "fr", nativeName: "Français", englishName: "French", flag: "🇫🇷", locale: "fr-FR", dir: "ltr" },
  it: { code: "it", nativeName: "Italiano", englishName: "Italian", flag: "🇮🇹", locale: "it-IT", dir: "ltr" },
  pt: { code: "pt", nativeName: "Português", englishName: "Portuguese", flag: "🇵🇹", locale: "pt-PT", dir: "ltr" },
  hi: { code: "hi", nativeName: "हिन्दी", englishName: "Hindi", flag: "🇮🇳", locale: "hi-IN", dir: "ltr" },
  pl: { code: "pl", nativeName: "Polski", englishName: "Polish", flag: "🇵🇱", locale: "pl-PL", dir: "ltr" },
  cs: { code: "cs", nativeName: "Čeština", englishName: "Czech", flag: "🇨🇿", locale: "cs-CZ", dir: "ltr" },
  ko: { code: "ko", nativeName: "한국어", englishName: "Korean", flag: "🇰🇷", locale: "ko-KR", dir: "ltr" },
  sv: { code: "sv", nativeName: "Svenska", englishName: "Swedish", flag: "🇸🇪", locale: "sv-SE", dir: "ltr" },
  ar: { code: "ar", nativeName: "العربية", englishName: "Arabic", flag: "🇦🇪", locale: "ar-AE", dir: "rtl" },
  ja: { code: "ja", nativeName: "日本語", englishName: "Japanese", flag: "🇯🇵", locale: "ja-JP", dir: "ltr" },
  el: { code: "el", nativeName: "Ελληνικά", englishName: "Greek", flag: "🇬🇷", locale: "el-GR", dir: "ltr" },
  ru: { code: "ru", nativeName: "Русский", englishName: "Russian", flag: "🇷🇺", locale: "ru-RU", dir: "ltr" },
  uk: { code: "uk", nativeName: "Українська", englishName: "Ukrainian", flag: "🇺🇦", locale: "uk-UA", dir: "ltr" },
};

export const LANGUAGE_LIST: LanguageInfo[] = LANGUAGE_CODES.map((c) => LANGUAGES[c]);

export const DEFAULT_LANGUAGE: LanguageCode = "de";

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && (LANGUAGE_CODES as readonly string[]).includes(value);
}

/**
 * Pick the best supported language from an `Accept-Language` header string.
 * Falls back to the default language when nothing matches.
 */
export function detectLanguage(acceptLanguage: string | null): LanguageCode {
  if (!acceptLanguage) return DEFAULT_LANGUAGE;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLanguageCode(base)) return base;
  }
  return DEFAULT_LANGUAGE;
}
