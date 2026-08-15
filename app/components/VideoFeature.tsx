const VIDEO_ID = "9Zzm9aq5sV4";
const VIDEO_URL = `https://www.youtube.com/shorts/${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?cc_lang_pref=de&cc_load_policy=1`;

export function VideoFeature() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 shadow-sm">
      <div className="grid lg:grid-cols-[minmax(260px,360px)_1fr]">
        <div className="mx-auto w-full max-w-[360px] bg-black lg:mx-0">
          <div className="aspect-[9/16]">
            <iframe
              src={EMBED_URL}
              title="German-language video report about Potsdam-Griebnitzsee station"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>
        </div>

        <div lang="de" className="flex flex-col justify-center p-6 text-white sm:p-8 lg:p-10">
          <p lang="en" className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-400">
            German-language video · Deutsch · Potsdam
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
            Ein vollkommen verwahrloster Bahnhof Potsdam-Griebnitzsee
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-300">
            Der Kurzbericht dokumentiert den Zustand des Bahnhofs Potsdam-Griebnitzsee und die tägliche Erfahrung der Bürger vor Ort.
          </p>
          <p lang="en" className="mt-3 max-w-2xl text-xs leading-relaxed text-gray-400">
            Accessibility status: this is a short contextual summary, not a verified transcript. German captions are requested from the source player, but their availability and accuracy have not been independently verified.
          </p>
          <div className="mt-6">
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
            >
              Original auf YouTube ansehen
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
