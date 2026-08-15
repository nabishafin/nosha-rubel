import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  /** Tinted background to visually separate alternating sections. */
  muted?: boolean;
  className?: string;
  id?: string;
}

export function Section({ children, muted = false, className = "", id }: SectionProps) {
  return (
    <section
      id={id}
      className={`content-auto-section py-7 sm:py-9 ${muted ? "bg-gray-50" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
