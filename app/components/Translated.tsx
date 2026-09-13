import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { useI18n } from "~/lib/i18n-context";
import { localizeText, type UiDictionary } from "~/lib/ui-text";

/** Translate inventoried interface strings, never unregistered source content. */
function translateTree(node: ReactNode, dictionary: UiDictionary, locale: string): ReactNode {
  if (typeof node === "string") return localizeText(dictionary, node);
  if (!isValidElement<Record<string, unknown>>(node)) return node;
  const props: Record<string, unknown> = {};
  for (const attribute of ["title", "aria-label", "placeholder", "alt"]) {
    if (typeof node.props[attribute] === "string") props[attribute] = localizeText(dictionary, node.props[attribute]);
  }
  if (node.props.children !== undefined) {
    props.children = Children.map(node.props.children as ReactNode, child => translateTree(child, dictionary, locale));
  }
  // These tags previously identified fallback interface copy. Source articles
  // carry a separate, explicit content locale and are left untouched.
  if (Object.keys(dictionary).length > 0 && (node.props.lang === "en" || node.props.lang === "en-US" || node.props.lang === "de") && typeof node.type === "string" && node.type !== "article") props.lang = locale;
  return cloneElement(node, props);
}

export function Translated({ children }: { children: ReactNode }) {
  const { ui, interfaceLocale } = useI18n();
  return translateTree(children, ui, interfaceLocale);
}
