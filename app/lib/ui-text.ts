export type UiDictionary = Record<string, string>;

export function localizeText(dictionary: UiDictionary, text: string): string {
  const key = text.trim();
  const translated = dictionary[key];
  if (translated === undefined) return text;
  return text.slice(0, text.indexOf(key)) + translated + text.slice(text.indexOf(key) + key.length);
}
