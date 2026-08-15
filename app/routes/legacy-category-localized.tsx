import { Link } from "react-router";
import { LEGACY_GONE_HEADERS, throwLegacyCategoryGone } from "~/lib/legacy-routes";
import { isLanguageCode, DEFAULT_LANGUAGE } from "~/lib/languages";
import { localePath } from "~/lib/i18n-context";
import type { Route } from "./+types/legacy-category-localized";

export function loader(): never {
  return throwLegacyCategoryGone();
}

export function headers() {
  return LEGACY_GONE_HEADERS;
}

export function meta() {
  return [
    { title: "Category removed" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export function ErrorBoundary({ params }: Route.ErrorBoundaryProps) {
  const lang = isLanguageCode(params.lang) ? params.lang : DEFAULT_LANGUAGE;
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-wider text-gray-500">410 Gone</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">Category removed</h1>
      <p className="mt-3 text-gray-600">This legacy category page has been permanently removed and has no direct replacement.</p>
      <Link to={localePath(lang)} className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
        Go to homepage
      </Link>
    </div>
  );
}

export default function LegacyCategoryLocalizedRoute() {
  return null;
}
