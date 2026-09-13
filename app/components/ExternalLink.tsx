import { Translated } from "~/components/Translated";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useI18n } from "~/lib/i18n-context";

type ExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> & {
  children: ReactNode;
  href: string;
};

/** An external new-tab link with the dossier's privacy and opener policy. */
export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  const { lang } = useI18n();
  return <Translated>{(
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {lang === "de" ? " (öffnet in einem neuen Tab)" : " (opens in a new tab)"}</span>
    </a>
  )}</Translated>;
}
