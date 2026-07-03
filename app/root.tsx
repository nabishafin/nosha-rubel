import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import { isLanguageCode, LANGUAGES, DEFAULT_LANGUAGE } from "./lib/languages";
import { SITE_NAME } from "./lib/seo";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", href: "/favicon.ico" },
];

// Site-wide defaults; route-level `meta` exports override title/description.
export const meta: Route.MetaFunction = () => [
  { title: `${SITE_NAME} — Global News in Your Language` },
  { name: "theme-color", content: "#ffffff" },
  { property: "og:site_name", content: SITE_NAME },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Derive <html lang/dir> from the URL's language segment so the document is
  // server-rendered with the correct language for SEO and accessibility.
  const { pathname } = useLocation();
  const seg = pathname.split("/")[1];
  const code = isLanguageCode(seg) ? seg : DEFAULT_LANGUAGE;
  const info = LANGUAGES[code];

  return (
    <html lang={code} dir={info.dir}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "Page not found" : `Error ${error.status}`;
    message =
      error.status === 404
        ? "The page you are looking for may have been moved or removed."
        : error.statusText || message;
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">{title}</h1>
      <p className="mt-3 text-gray-600">{message}</p>
      <a
        href="/"
        className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Go to homepage
      </a>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto rounded-lg bg-gray-900 p-4 text-left text-xs text-gray-100">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
