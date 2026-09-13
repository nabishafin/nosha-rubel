import { Translated } from "~/components/Translated";
import { ExternalLink } from "./ExternalLink";
import { useI18n } from "~/lib/i18n-context";

const VIDEO_ID = "9Zzm9aq5sV4";
const VIDEO_URL = `https://www.youtube.com/shorts/${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?cc_lang_pref=de&cc_load_policy=1`;

const ADDITIONAL_VIDEOS = [
  { id: "DUZxtW_3LzQ", language: "en", name: "English", germanName: "Englisch" },
  { id: "sko9O0RIUsI", language: "de", name: "Deutsch", germanName: "Deutsch" },
] as const;

export function VideoFeature() {
  const { lang } = useI18n();
  const germanInterface = lang === "de";
  return <Translated>{(
    <>
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 shadow-sm">
      <div className="grid lg:grid-cols-[minmax(260px,360px)_1fr]">
        <div className="mx-auto w-full max-w-[360px] bg-black lg:mx-0">
          <div className="aspect-[9/16]">
            <iframe
              src={EMBED_URL}
              title={germanInterface ? "Deutschsprachiger Videobericht zum Bahnhof Potsdam-Griebnitzsee" : "German-language video report about Potsdam-Griebnitzsee station"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>
        </div>

        <div lang={lang === "en" ? "en-US" : "de"} className="flex flex-col justify-center p-6 text-white sm:p-8 lg:p-10">
          <p lang={germanInterface ? "de" : "en"} className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-400">
            {germanInterface ? "Deutschsprachiger Videobericht · Potsdam" : "German-language video · Deutsch · Potsdam"}
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
            Ein vollkommen verwahrloster Bahnhof Potsdam-Griebnitzsee
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-300">
            Der Kurzbericht dokumentiert den Zustand des Bahnhofs Potsdam-Griebnitzsee und die tägliche Erfahrung der Bürger vor Ort.
          </p>
          <p lang={germanInterface ? "de" : "en"} className="mt-3 max-w-2xl text-xs leading-relaxed text-gray-400">
            {germanInterface
              ? "Hinweis zur Barrierefreiheit: Dies ist eine kurze Einordnung, kein geprüftes Transkript. Im Quellplayer werden deutsche Untertitel angefordert; Verfügbarkeit und Genauigkeit wurden nicht unabhängig geprüft."
              : "Accessibility status: this is a short contextual summary, not a verified transcript. German captions are requested from the source player, but their availability and accuracy have not been independently verified."}
          </p>
          <div className="mt-6">
            <ExternalLink
              href={VIDEO_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
            >
              Original auf YouTube ansehen
              <span aria-hidden="true">↗</span>
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
    <section lang={germanInterface ? "de" : "en"} aria-labelledby="additional-video-heading" className="mt-8">
      <h2 id="additional-video-heading" className="text-2xl font-extrabold tracking-tight text-gray-950">
        {germanInterface ? "Weitere Videoberichte" : "More video reports"}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {ADDITIONAL_VIDEOS.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-gray-950">
              <div className="mx-auto aspect-[9/16] w-full max-w-[300px]">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?cc_lang_pref=${video.language}&cc_load_policy=1`}
                  title={germanInterface ? `Videobericht auf ${video.germanName}` : `${video.name} video report`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-full w-full border-0"
                />
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-red-700">YouTube Shorts</p>
              <h3 className="mt-2 text-xl font-extrabold text-gray-950">
                {germanInterface ? `Videobericht · ${video.germanName}` : `Video report · ${video.name}`}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-gray-600">
                {germanInterface
                  ? "Untertitel werden in der Videosprache angefordert. Verfügbarkeit und Genauigkeit wurden nicht unabhängig geprüft; ein geprüftes Transkript liegt nicht vor."
                  : "Captions are requested in the video's language. Availability and accuracy have not been independently verified; a verified transcript is not available."}
              </p>
              <ExternalLink href={`https://www.youtube.com/shorts/${video.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">
                {germanInterface ? "Original auf YouTube ansehen" : "Watch original on YouTube"}
                <span aria-hidden="true">↗</span>
              </ExternalLink>
            </div>
          </article>
        ))}
      </div>
    </section>
    </>
  )}</Translated>;
}
