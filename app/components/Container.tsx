import { Translated } from "~/components/Translated";
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Translated>{<div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>}</Translated>;
}
