import { Link } from "react-router";
import { Container } from "~/components/Container";
import { localePath } from "~/lib/i18n-context";
import { isLanguageCode } from "~/lib/languages";
import { LOCALE_UNAVAILABLE_MESSAGES } from "~/lib/locale-messages";
import type { Route } from "./+types/translation-unavailable";

function safeLocalPath(value: string | null): string | undefined {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return undefined;
  const sourceLanguage = value.split(/[/?#]/)[1];
  return isLanguageCode(sourceLanguage) ? value : undefined;
}

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLanguageCode(params.lang)) throw new Response("Not Found", { status: 404 });
  const url = new URL(request.url);
  return { lang: params.lang, from: safeLocalPath(url.searchParams.get("from")) };
}

export function meta() {
  return [{ title: "Translation unavailable" }, { name: "robots", content: "noindex, follow" }];
}

export function headers() {
  return {
    "X-Robots-Tag": "noindex, follow",
    "Cache-Control": "private, no-store",
  };
}

export default function TranslationUnavailable({ loaderData }: Route.ComponentProps) {
  const { lang, from } = loaderData;
  const message = LOCALE_UNAVAILABLE_MESSAGES[lang];

  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{message.title}</h1>
      <p className="mx-auto mt-3 max-w-lg text-gray-600">{message.body}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {from && (
          <Link to={from} className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50">
            {message.back}
          </Link>
        )}
        <Link to={localePath(lang)} className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          {message.browse}
        </Link>
      </div>
    </Container>
  );
}
