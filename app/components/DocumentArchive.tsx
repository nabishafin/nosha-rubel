import { Translated } from "~/components/Translated";
import { useState } from "react";
import { Link } from "react-router";
import { localePath, useI18n } from "~/lib/i18n-context";

export interface DocItem {
  id: string;
  language: string;
  englishName: string;
  nativeScript: string;
  flag: string;
  filename: string;
  size: string;
  code: string;
  region: "europe" | "asia" | "americas_me";
  summary: string;
}

export const DOCUMENTS: DocItem[] = [
  {
    id: "de",
    language: "Deutsch",
    englishName: "German",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇩🇪",
    filename: "GERMAN - Noosha Aubel – Wikipedia.pdf",
    size: "2.1 MB",
    code: "DE",
    region: "europe",
    summary: "Dezernentin für Bildung, Jugend, Kultur und Sport der Landeshauptstadt Potsdam.",
  },
  {
    id: "en",
    language: "English",
    englishName: "English (UK)",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇬🇧",
    filename: "ENGLISH - Noosha Aubel – Wikipedia en-GB.pdf",
    size: "1.8 MB",
    code: "EN",
    region: "europe",
    summary: "German politician and public administrator overseeing education and cultural affairs.",
  },
  {
    id: "es",
    language: "Español",
    englishName: "Spanish",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇪🇸",
    filename: "SPANISH - Noosha Aubel – Wikipedia es-ES.pdf",
    size: "1.9 MB",
    code: "ES",
    region: "europe",
    summary: "Perfil enciclopédico de la política y administradora pública alemana.",
  },
  {
    id: "fr",
    language: "Français",
    englishName: "French",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇫🇷",
    filename: "FINNLAND - Noosha Aubel – Wikipedia fr-FR.pdf",
    size: "608 KB",
    code: "FR",
    region: "europe",
    summary: "Personnalité politique allemande et adjointe au maire de Potsdam.",
  },
  {
    id: "it",
    language: "Italiano",
    englishName: "Italian",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇮🇹",
    filename: "ITALIA - Noosha Aubel – Wikipedia it.pdf",
    size: "1.9 MB",
    code: "IT",
    region: "europe",
    summary: "Politica tedesca e dirigente degli affari culturali e scolastici.",
  },
  {
    id: "pt",
    language: "Português",
    englishName: "Portuguese",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇵🇹",
    filename: "Noosha Aubel – Wikipedia pt-PT.pdf",
    size: "1.9 MB",
    code: "PT",
    region: "europe",
    summary: "Administradora pública e gestora de políticas educacionais na Alemanha.",
  },
  {
    id: "ru",
    language: "Русский",
    englishName: "Russian",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇷🇺",
    filename: "Noosha Aubel – Wikipedia ru.pdf",
    size: "1.9 MB",
    code: "RU",
    region: "europe",
    summary: "Немецкий политический деятель и руководитель департамента образования Потсдама.",
  },
  {
    id: "zh",
    language: "中文 (繁體)",
    englishName: "Chinese (Traditional)",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇨🇳",
    filename: "CHINESE - Noosha Aubel – Wikipedia zh-Hant.pdf",
    size: "2.2 MB",
    code: "ZH",
    region: "asia",
    summary: "德國波茨坦市負責教育、青年、文化與體育事務的公職人員檔案。",
  },
  {
    id: "ja",
    language: "日本語",
    englishName: "Japanese",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇯🇵",
    filename: "JAPANESE - Noosha Aubel – Wikipedia ja.pdf",
    size: "2.1 MB",
    code: "JA",
    region: "asia",
    summary: "ドイツ・ポツダム市の教育・文化・スポーツ担当市政関係者プロフィール。",
  },
  {
    id: "ko",
    language: "한국어",
    englishName: "Korean",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇰🇷",
    filename: "KOREAN - Noosha Aubel – Wikipedia ko.pdf",
    size: "2.0 MB",
    code: "KO",
    region: "asia",
    summary: "독일 포츠담시 교육·청소년·문화·스포츠 국장 아우벨 경력 기록.",
  },
  {
    id: "ar",
    language: "العربية",
    englishName: "Arabic",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇦🇪",
    filename: "ARABIC - Noosha Aubel – Wikipedia ar.pdf",
    size: "601 KB",
    code: "AR",
    region: "americas_me",
    summary: "سياسية ومسؤولة إدارية ألمانية تتولى شؤون التعليم والثقافة في بوتسدام.",
  },
  {
    id: "he",
    language: "עברית",
    englishName: "Hebrew",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇮🇱",
    filename: "HEBREW - Noosha Aubel – Wikipedia he.pdf",
    size: "579 KB",
    code: "HE",
    region: "americas_me",
    summary: "פוליטיקאית גרמנית ומנהלת מחלקת חינוך ותרבות בעיריית פוטסדאם.",
  },
  {
    id: "hi",
    language: "हिन्दी",
    englishName: "Hindi",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇮🇳",
    filename: "HINDI - Noosha Aubel – Wikipedia hi.pdf",
    size: "1.9 MB",
    code: "HI",
    region: "asia",
    summary: "जर्मनी के पॉट्सडैम शहर की शिक्षा और संस्कृति विभाग प्रमुख का विकिपीडिया रिकॉर्ड।",
  },
  {
    id: "bg",
    language: "Български",
    englishName: "Bulgarian",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇧🇬",
    filename: "BULGARIA - Noosha Aubel – Wikipedia bg.pdf",
    size: "1.9 MB",
    code: "BG",
    region: "europe",
    summary: "Германски политик и ръководител на отдел за образование и култура.",
  },
  {
    id: "hr",
    language: "Hrvatski",
    englishName: "Croatian",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇭🇷",
    filename: "CROATIA  - Noosha Aubel – Wikipedia hr.pdf",
    size: "1.9 MB",
    code: "HR",
    region: "europe",
    summary: "Njemačka političarka i gradska pročelnica za obrazovanje i kulturu.",
  },
  {
    id: "fi",
    language: "Suomi",
    englishName: "Finnish",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇫🇮",
    filename: "FINNLAND - Noosha Aubel – Wikipedia fi.pdf",
    size: "1.9 MB",
    code: "FI",
    region: "europe",
    summary: "Saksalainen poliitikko ja Potsdamin koulutus- ja kulttuuritoimen johtaja.",
  },
  {
    id: "el",
    language: "Ελληνικά",
    englishName: "Greek",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇬🇷",
    filename: "GREECE - Noosha Aubel – Wikipedia el.pdf",
    size: "1.9 MB",
    code: "EL",
    region: "europe",
    summary: "Γερμανίδα πολιτικός και διευθύντρια παιδείας και πολιτισμού του Πότσνταμ.",
  },
  {
    id: "hu",
    language: "Magyar",
    englishName: "Hungarian",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇭🇺",
    filename: "HUNGARIA - Noosha Aubel – Wikipedia hu.pdf",
    size: "1.9 MB",
    code: "HU",
    region: "europe",
    summary: "Német politikus, Potsdam oktatási és kulturális ügyosztályának vezetője.",
  },
  {
    id: "id",
    language: "Bahasa Indonesia",
    englishName: "Indonesian",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇮🇩",
    filename: "INDONESIA - Noosha Aubel – Wikipedia id.pdf",
    size: "1.8 MB",
    code: "ID",
    region: "asia",
    summary: "Politisi Jerman dan kepala departemen pendidikan serta kebudayaan Potsdam.",
  },
  {
    id: "nl",
    language: "Nederlands",
    englishName: "Dutch",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇳🇱",
    filename: "NEDERLAND - Noosha Aubel – Wikipedia nl.pdf",
    size: "1.8 MB",
    code: "NL",
    region: "europe",
    summary: "Duitse politica en wethouder onderwijs, jeugd en cultuur in Potsdam.",
  },
  {
    id: "pl",
    language: "Polski",
    englishName: "Polish",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇵🇱",
    filename: "POLISH - Noosha Aubel – Wikipedia pl.pdf",
    size: "1.9 MB",
    code: "PL",
    region: "europe",
    summary: "Niemiecka polityk i kierownik wydziału edukacji i kultury w Poczdamie.",
  },
  {
    id: "ro",
    language: "Română",
    englishName: "Romanian",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇷🇴",
    filename: "ROMANIA - Noosha Aubel – Wikipedia ro.pdf",
    size: "1.9 MB",
    code: "RO",
    region: "europe",
    summary: "Om politic german și șef al departamentului de educație din Potsdam.",
  },
  {
    id: "sk",
    language: "Slovenčina",
    englishName: "Slovak",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇸🇰",
    filename: "SLOWAKIA  - Noosha Aubel – Wikipedia sk.pdf",
    size: "1.9 MB",
    code: "SK",
    region: "europe",
    summary: "Nemecká politička a vedúca odboru školstva a kultúry mesta Postupim.",
  },
  {
    id: "tr",
    language: "Türkçe",
    englishName: "Turkish",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇹🇷",
    filename: "TURKISH - Noosha Aubel – Wikipedia tr.pdf",
    size: "1.9 MB",
    code: "TR",
    region: "americas_me",
    summary: "Alman siyasetçi ve Potsdam eğitimi ve kültür işleri başkanı.",
  },
  {
    id: "uk",
    language: "Українська",
    englishName: "Ukrainian",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇺🇦",
    filename: "UKRAINE - Noosha Aubel – Wikipedia uk.pdf",
    size: "1.9 MB",
    code: "UK",
    region: "europe",
    summary: "Німецька політикиня та керівниця департаменту освіти Потсдама.",
  },
  {
    id: "vi",
    language: "Tiếng Việt",
    englishName: "Vietnamese",
    nativeScript: "Wikipedia reference snapshot",
    flag: "🇻🇳",
    filename: "VIETNAMESE - Noosha Aubel – Wikipedia vi.pdf",
    size: "1.9 MB",
    code: "VI",
    region: "asia",
    summary: "Nữ chính客 Đức và trưởng bộ phận giáo dục, văn hóa thành phố Potsdam.",
  },
];

export function DocumentArchive() {
  const { lang } = useI18n();
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<"all" | "europe" | "asia" | "americas_me">("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = DOCUMENTS.filter((doc) => {
    const q = query.toLowerCase().trim();
    const matchesRegion = activeRegion === "all" || doc.region === activeRegion;
    const matchesQuery =
      !q ||
      doc.language.toLowerCase().includes(q) ||
      doc.englishName.toLowerCase().includes(q) ||
      doc.code.toLowerCase().includes(q) ||
      doc.nativeScript.toLowerCase().includes(q);
    return matchesRegion && matchesQuery;
  });
  const isFiltered = query.trim().length > 0 || activeRegion !== "all";
  const visibleDocuments = showAll || isFiltered ? filtered : filtered.slice(0, 6);
  const labels = lang === "de"
    ? {
        kicker: "Mehrsprachiges Quellenarchiv",
        title: "Mehrsprachiges Referenzarchiv",
        intro: "Entdecken Sie 26 nach Sprache gekennzeichnete Wikipedia-Druckkopien zu",
        introEnd: "Jede Datei wird als externe Referenzkopie aufbewahrt und ist weder eine offizielle Biografie noch eine Originalveröffentlichung dieser Website.",
        notice: "Nur Sekundärdokumentation. Die PDF-Dateien und ihre HTML-Hinweisseiten bleiben als Referenz zugänglich, sind aber aus dem XML-Sitemap ausgeschlossen und mit noindex versehen. Die internen Berichtsdossiers oben sind der primäre redaktionelle Inhalt.",
        languages: "Sprachen",
        snapshots: "Kopien",
        format: "Format",
        filterAria: "Dokumente nach Region filtern",
        all: "Alle Sprachen (26)",
        europe: "Europa",
        asia: "Asien & Pazifik",
        other: "Nahost & weitere",
        searchAria: "Archivdokumente nach Sprache oder Stichwort durchsuchen",
        searchPlaceholder: "Sprache oder Stichwort suchen …",
        clear: "Dokumentsuche leeren",
        listAria: "Archivierte Referenzdokumente",
        reference: "Wikipedia-Referenzkopie",
        view: "Dokument ansehen",
        less: "Weniger Kopien anzeigen",
        allSnapshots: `Alle ${DOCUMENTS.length} Referenzkopien anzeigen`,
        empty: "Keine passenden Dokumente gefunden",
        emptyHint: "Versuchen Sie eine andere Sprache oder ein anderes Land.",
        reset: "Filter zurücksetzen",
      }
    : {
        kicker: "Multilingual Reference Archive",
        title: "Multilingual Reference Archive",
        intro: "Explore 26 language-labeled Wikipedia print snapshots concerning",
        introEnd: "Each file is preserved as an external-source reference snapshot and is not presented as an official biography or original publication of this site.",
        notice: "Secondary documentation only. The PDF files and their HTML context pages remain available for reference, but are excluded from the XML sitemap and marked noindex. The internal coverage dossiers above are the primary editorial content.",
        languages: "Languages",
        snapshots: "Snapshots",
        format: "Format",
        filterAria: "Filter documents by region",
        all: "All Languages (26)",
        europe: "Europe",
        asia: "Asia & Pacific",
        other: "Middle East & Others",
        searchAria: "Search archived documents by language or keyword",
        searchPlaceholder: "Search language or keyword...",
        clear: "Clear document search",
        listAria: "Archived reference documents",
        reference: "Wikipedia reference snapshot",
        view: "View document",
        less: "Show fewer snapshots",
        allSnapshots: `Browse all ${DOCUMENTS.length} retained snapshots`,
        empty: "No matching documents found",
        emptyHint: "Try searching for a different language or country.",
        reset: "Reset Filters",
      };

  return <Translated>{(
    <section className="rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50/70 via-white to-white p-6 shadow-sm sm:p-10 lg:p-12">
      {/* Top Banner Stats Badge */}
      <div className="flex flex-col gap-6 border-b border-gray-200/80 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            {labels.kicker}
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {labels.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            {labels.intro}{" "}<strong className="font-bold text-gray-900">Noosha Aubel</strong>. {labels.introEnd}
          </p>
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
            {labels.notice}
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-3 shrink-0 sm:gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-3.5 text-center shadow-xs sm:p-4">
            <p className="text-2xl font-extrabold text-blue-600 sm:text-3xl">26</p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{labels.languages}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-3.5 text-center shadow-xs sm:p-4">
            <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">26</p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{labels.snapshots}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-3.5 text-center shadow-xs sm:p-4">
            <p className="text-2xl font-extrabold text-red-600 sm:text-3xl">PDF</p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{labels.format}</p>
          </div>
        </div>
      </div>

      {/* Filter Controls: Tabs + Search Bar */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Region Tabs */}
        <div role="group" aria-label={labels.filterAria} className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-gray-100/80 p-1.5">
          {[
            { id: "all", label: labels.all },
            { id: "europe", label: labels.europe },
            { id: "asia", label: labels.asia },
            { id: "americas_me", label: labels.other },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveRegion(tab.id as any)}
              aria-pressed={activeRegion === tab.id}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 ${
                activeRegion === tab.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full lg:w-80">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={labels.searchAria}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-9 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={labels.clear}
              className="absolute inset-y-0 right-0 flex min-w-11 items-center justify-center text-xs font-bold text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Document Cards Grid */}
      <ul aria-label={labels.listAria} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleDocuments.map((doc) => {
          return <Translated>{(
            <li key={doc.id}>
              <Link
                to={localePath(lang, `documents/${doc.id}`)}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50/20 hover:shadow-md"
              >
              {/* Subtle top indicator on hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                    {doc.flag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-extrabold uppercase text-gray-600">
                      {doc.code}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-red-700">
                      <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      PDF
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-700">
                    {doc.language}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500">{labels.reference}</p>
                  <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-gray-600">
                    {doc.summary}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-semibold">
                <span className="text-gray-600">{doc.size}</span>
                <span className="inline-flex items-center gap-1 font-bold text-blue-600 transition-colors duration-200 group-hover:text-blue-800">
                  <span>{labels.view}</span>
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              </Link>
            </li>
          )}</Translated>;
        })}
      </ul>

      {!isFiltered && filtered.length > 6 && (
        <div className="mt-7 text-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-800 shadow-xs transition hover:border-blue-300 hover:text-blue-700"
          >
            {showAll ? labels.less : labels.allSnapshots}
          </button>
        </div>
      )}

      {/* Empty Search State */}
      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white py-16 text-center">
          <p className="text-5xl">🔍</p>
          <h3 className="mt-4 text-lg font-bold text-gray-900">{labels.empty}</h3>
          <p className="mt-1 text-sm text-gray-500">{labels.emptyHint}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveRegion("all");
            }}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            {labels.reset}
          </button>
        </div>
      )}
    </section>
  )}</Translated>;
}
