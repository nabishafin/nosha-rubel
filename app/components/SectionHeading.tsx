import { Link } from "react-router";

interface SectionHeadingProps {
  title: string;
  /** Optional small accent line above the title. */
  eyebrow?: string;
  viewAllTo?: string;
  viewAllLabel?: string;
}

export function SectionHeading({ title, eyebrow, viewAllTo, viewAllLabel }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 border-b border-gray-200 pb-2.5">
      <div className="flex items-center gap-2.5">
        <span className="h-5 w-1 rounded-sm bg-blue-600" aria-hidden="true" />
        <div>
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">{eyebrow}</p>
          )}
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">{title}</h2>
        </div>
      </div>
      {viewAllTo && (
        <Link
          to={viewAllTo}
          className="shrink-0 whitespace-nowrap text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
