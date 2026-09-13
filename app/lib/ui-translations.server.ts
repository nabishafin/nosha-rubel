import dictionaries from "~/data/ui-translations.json";
import type { LanguageCode } from "./types";
import type { UiDictionary } from "./ui-text";

/** Checked-in copy: no translation requests are made by the running website. */
export function getUiDictionary(lang: LanguageCode): UiDictionary {
  return dictionaries[lang];
}
