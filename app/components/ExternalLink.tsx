import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> & {
  children: ReactNode;
  href: string;
};

/** An external new-tab link with the dossier's privacy and opener policy. */
export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
