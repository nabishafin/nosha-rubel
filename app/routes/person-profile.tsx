import { isLanguageCode, LANGUAGES, isSearchIndexLanguage, SEARCH_INDEX_LANGUAGES } from "~/lib/languages";
import { getUiDictionary } from "~/lib/ui-translations.server";
import { localizeText } from "~/lib/ui-text";
import { Translated } from "~/components/Translated";
import { Link } from "react-router";
import { ArticleGrid } from "~/components/ArticleGrid";
import { Container } from "~/components/Container";
import { ExternalLink } from "~/components/ExternalLink";
import { getOrigin } from "~/lib/http";
import { localePath } from "~/lib/i18n-context";
import { getLatest } from "~/lib/news";
import { buildMeta, localizedAlternates, SOCIAL_PREVIEW_IMAGE } from "~/lib/seo";
import type { Route } from "./+types/person-profile";

const OFFICIAL_PROFILE = "https://www.potsdam.de/de/oberbuergermeisterin-noosha-aubel";
const ELECTION_RESULT = "https://www.potsdam.de/de/478-noosha-aubel-gewinnt-oberbuergermeisterwahl-potsdam";
const BUDGET_2026 = "https://www.potsdam.de/de/018-haushalt-2026-stadt-potsdam-stellt-haushaltsentwurf-2026-ff-mit-einem-verantwortungsvollen";
const HOUSING_INTERVIEW = "https://www.propotsdam.de/ueber-uns/unternehmensmagazin/interview-mit-noosha-aubel/";
const INAUGURATION = "https://www.potsdam.de/de/die-amtskette-neuen-haenden";
const ELECTION_REPORT = "https://www.potsdam.de/system/files/document/Stat_Info_4_2025_Wahlbericht_Oberb%C3%BCrgermeisterwahl_2025_0.pdf";
const MUNICIPAL_INTERVIEW = "https://www.staedtetag.de/publikationen/staedtetag-aktuell/2026/heft-1/kommunen-duerfen-nicht-dauerhaft-am-limit-arbeiten";

const title = "Noosha Aubel: Biografie der Potsdamer Oberbürgermeisterin";
const description =
  "Wer ist Noosha Aubel? Quellenbasierte Biografie mit Lebenslauf, Wahlergebnis, Amtszeit und Aufgaben der Oberbürgermeisterin von Potsdam.";

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLanguageCode(params.lang)) throw new Response("Not Found", { status: 404 });
  const origin = getOrigin(request);
  const canonical = `${origin}/${params.lang}/noosha-aubel`;
  const ui = getUiDictionary(params.lang);
  return { origin, canonical, lang: params.lang, title: localizeText(ui, title), description: localizeText(ui, description), jobTitle: localizeText(ui, "Oberbürgermeisterin der Landeshauptstadt Potsdam"), breadcrumb: localizeText(ui, "Biografie und Themen"), keywords: ["Noosha Aubel Biografie", "Noosha Aubel Oberbürgermeisterin", "Oberbürgermeisterin Potsdam", "Noosha Aubel Wahl 2025", "Noosha Aubel Haushalt 2026"].map(key => localizeText(ui, key)), articles: getLatest(params.lang) };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { origin, canonical, lang, title, description } = loaderData;
  return [
    ...buildMeta({
      title,
      description,
      canonical,
      image: SOCIAL_PREVIEW_IMAGE,
      lang,
      robots: isSearchIndexLanguage(lang) ? undefined : "noindex, follow",
      alternates: isSearchIndexLanguage(lang) ? localizedAlternates(origin, "noosha-aubel", SEARCH_INDEX_LANGUAGES) : undefined,
      keywords: loaderData.keywords,
    }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "AboutPage",
            "@id": `${canonical}#webpage`,
            url: canonical,
            name: title,
            description,
            inLanguage: LANGUAGES[lang].locale,
            dateModified: lang === "en" ? "2026-09-14" : "2026-08-31",
            isPartOf: { "@id": `${origin}/#website` },
            mainEntity: { "@id": `${canonical}#noosha-aubel` },
          },
          {
            "@type": "Person",
            "@id": `${canonical}#noosha-aubel`,
            name: "Noosha Aubel",
            birthDate: "1975-12-04",
            jobTitle: loaderData.jobTitle,
            affiliation: {
              "@type": "GovernmentOrganization",
              name: "Landeshauptstadt Potsdam",
              url: "https://www.potsdam.de/",
            },
            sameAs: [
              OFFICIAL_PROFILE,
              "https://de.wikipedia.org/wiki/Noosha_Aubel",
            ],
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Noosha Aubel Pressedossier",
                item: `${origin}/${lang}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: loaderData.breadcrumb,
                item: canonical,
              },
            ],
          },
        ],
      },
    },
  ];
}

export function headers() {
  return { "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" };
}

export default function PersonProfile({ loaderData }: Route.ComponentProps) {
  return <Translated>{(
    <>
      <Container className="py-12 sm:py-16">
        <nav aria-label="Brotkrümelnavigation" className="text-sm text-gray-500">
          <Link to={localePath(loaderData.lang)} className="hover:text-blue-700">Startseite</Link>
          <span aria-hidden="true"> / </span>
          <span>Noosha Aubel: Biografie und Themen</span>
        </nav>

        <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-700">
              Unabhängige, quellenbasierte Übersicht
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl">
              Noosha Aubel: Biografie und Amt in Potsdam
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-gray-700">
              Biografie, Wahl, Amtszeit und zentrale kommunalpolitische Themen – mit direkten Links zu amtlichen und redaktionellen Quellen.
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-500">
              Quellenstand: 31. August 2026 · Fakten zuletzt redaktionell geprüft: 31. August 2026
            </p>

            <div className="mt-9 space-y-10 text-lg leading-relaxed text-gray-800">
              <section aria-labelledby="biografie">
                <h2 id="biografie" className="text-2xl font-extrabold tracking-tight text-gray-950">Kurzbiografie</h2>
                <p className="mt-4">
                  Noosha Aubel wurde am 4. Dezember 1975 in Hannover geboren. Sie ist Diplom-Pädagogin und erwarb zusätzlich einen Masterabschluss in Organizational Management. Vor ihrer Wahl zur Oberbürgermeisterin arbeitete sie in verschiedenen Kommunalverwaltungen, darunter von 2017 bis 2023 als Beigeordnete für Bildung, Kultur, Jugend und Sport in Potsdam und anschließend als Stadträtin und Dezernentin in Flensburg.
                </p>
                <p className="mt-4 text-base">
                  Quelle: <ExternalLink href={OFFICIAL_PROFILE} className="font-semibold text-blue-700 hover:underline">Offizielle Biografie der Landeshauptstadt Potsdam</ExternalLink>
                </p>
              </section>

              <section aria-labelledby="wahl-amt">
                <h2 id="wahl-amt" className="text-2xl font-extrabold tracking-tight text-gray-950">Wahl und Amtszeit</h2>
                <p className="mt-4">
                  Bei der Stichwahl am 12. Oktober 2025 erhielt die parteilose Kandidatin 72,9 Prozent der gültigen Stimmen. Seit dem 24. Oktober 2025 ist Noosha Aubel Oberbürgermeisterin der Landeshauptstadt Potsdam. Ihre reguläre Amtszeit endet im Oktober 2033.
                </p>
                <p className="mt-4 text-base">
                  Quelle: <ExternalLink href={ELECTION_RESULT} className="font-semibold text-blue-700 hover:underline">Amtliches Ergebnis der Oberbürgermeisterwahl 2025</ExternalLink>
                </p>
              </section>

              <section aria-labelledby="lebenslauf">
                <h2 id="lebenslauf" className="text-2xl font-extrabold tracking-tight text-gray-950">Beruflicher Lebenslauf</h2>
                <ol className="mt-5 space-y-4 border-l-2 border-blue-100 pl-6 text-base">
                  <li><strong>1999–2004:</strong> pädagogische Fachkraft im Kinder- und Jugendhilfe Verbund Rheinland.</li>
                  <li><strong>2004–2008:</strong> Jugendhilfeplanung und Familienförderung bei der Stadt Viersen.</li>
                  <li><strong>2008–2017:</strong> Leiterin des Amtes für Jugend, Schule und Sport der Stadt Hilden.</li>
                  <li><strong>2017–2023:</strong> Beigeordnete für Bildung, Kultur, Jugend und Sport der Landeshauptstadt Potsdam.</li>
                  <li><strong>2023–2024:</strong> Co-Geschäftsführerin der Unternehmerstiftung für Chancengerechtigkeit.</li>
                  <li><strong>Juli 2024–Oktober 2025:</strong> Stadträtin und Dezernentin in Flensburg.</li>
                  <li><strong>Seit 24. Oktober 2025:</strong> Oberbürgermeisterin der Landeshauptstadt Potsdam.</li>
                </ol>
                <p className="mt-4 text-base">
                  Der chronologische Lebenslauf folgt der <ExternalLink href={OFFICIAL_PROFILE} className="font-semibold text-blue-700 hover:underline">offiziellen Darstellung der Landeshauptstadt Potsdam</ExternalLink>.
                </p>
              </section>

              <section aria-labelledby="themen-2026">
                <h2 id="themen-2026" className="text-2xl font-extrabold tracking-tight text-gray-950">Zentrale Themen 2026</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <h3 className="font-bold text-gray-950">Haushalt und Konsolidierung</h3>
                    <p className="mt-2 text-base text-gray-700">Der Potsdamer Haushalt 2026, kommunale Handlungsfähigkeit und die Priorisierung freiwilliger Leistungen gehören zu den prägenden Themen ihrer ersten Amtsmonate.</p>
                    <ExternalLink href={BUDGET_2026} className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:underline">Haushaltsentwurf der Stadt Potsdam</ExternalLink>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <h3 className="font-bold text-gray-950">Wohnen und Stadtentwicklung</h3>
                    <p className="mt-2 text-base text-gray-700">Bezahlbarer Wohnraum, Flächen, Genehmigungen und die Entwicklung der wachsenden Stadt sind weitere zentrale Aufgaben der Stadtspitze.</p>
                    <ExternalLink href={HOUSING_INTERVIEW} className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:underline">Interview zu Wohnen in Potsdam</ExternalLink>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <h3 className="font-bold text-gray-950">Verwaltung und politische Mehrheiten</h3>
                    <p className="mt-2 text-base text-gray-700">Die Umsetzung kommunaler Vorhaben hängt von Verwaltungssteuerung, transparenter Kommunikation und tragfähigen Mehrheiten in der Stadtverordnetenversammlung ab.</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <h3 className="font-bold text-gray-950">Bildung, Teilhabe und Infrastruktur</h3>
                    <p className="mt-2 text-base text-gray-700">Schulen, Kitas, soziale Teilhabe, Verkehr und der Zustand kommunaler Infrastruktur betreffen unmittelbar die Lebensqualität in Potsdam.</p>
                  </div>
                </div>
              </section>

              <section aria-labelledby="einordnung" className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <h2 id="einordnung" className="text-xl font-extrabold text-amber-950">Redaktionelle Einordnung</h2>
                <p className="mt-3 text-base text-amber-950">
                  Diese Website ist weder die offizielle Website von Noosha Aubel noch ein Angebot der Landeshauptstadt Potsdam. Amtliche Fakten werden mit Primärquellen belegt. Kritische Beiträge im Pressedossier bleiben den jeweils zitierten Herausgebern zugeordnet; Wiederholungen über mehrere Publikationen hinweg sind kein eigenständiger Beweis für eine Behauptung.
                </p>
              </section>

              <section aria-labelledby="primaerquellen">
                <h2 id="primaerquellen" className="text-2xl font-extrabold tracking-tight text-gray-950">Amtliche Quellen und weiterführende Einordnung</h2>
                <p className="mt-3 text-base text-gray-700">
                  Diese Auswahl bündelt die wichtigsten Primärquellen für Namens-, Amts- und Wahlfragen. Kritische Dossiers auf dieser Website werden davon getrennt und stets dem jeweiligen Herausgeber zugeschrieben.
                </p>
                <ul className="mt-5 space-y-3 text-base">
                  <li><ExternalLink href={OFFICIAL_PROFILE} className="font-semibold text-blue-700 hover:underline">Offizielle Biografie und beruflicher Werdegang</ExternalLink> – Landeshauptstadt Potsdam</li>
                  <li><ExternalLink href={ELECTION_REPORT} className="font-semibold text-blue-700 hover:underline">Statistischer Wahlbericht zur Oberbürgermeisterwahl 2025</ExternalLink> – Landeshauptstadt Potsdam (PDF)</li>
                  <li><ExternalLink href={INAUGURATION} className="font-semibold text-blue-700 hover:underline">Amtseinführung und Übergabe der Amtskette</ExternalLink> – Landeshauptstadt Potsdam</li>
                  <li><ExternalLink href={BUDGET_2026} className="font-semibold text-blue-700 hover:underline">Haushaltsentwurf 2026 ff.</ExternalLink> – Landeshauptstadt Potsdam</li>
                  <li><ExternalLink href={MUNICIPAL_INTERVIEW} className="font-semibold text-blue-700 hover:underline">Interview zu kommunaler Handlungsfähigkeit</ExternalLink> – Deutscher Städtetag</li>
                </ul>
              </section>

              <section aria-labelledby="fragen">
                <h2 id="fragen" className="text-2xl font-extrabold tracking-tight text-gray-950">Häufige Fragen zu Noosha Aubel</h2>
                <div className="mt-5 space-y-5">
                  <div>
                    <h3 className="font-bold text-gray-950">Welches Amt hat Noosha Aubel?</h3>
                    <p className="mt-1 text-base text-gray-700">Sie ist seit dem 24. Oktober 2025 Oberbürgermeisterin der Landeshauptstadt Potsdam.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-950">Ist Noosha Aubel Mitglied einer Partei?</h3>
                    <p className="mt-1 text-base text-gray-700">Nach den Angaben der Landeshauptstadt Potsdam ist sie parteilos.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-950">Ist diese Website ihre offizielle Website?</h3>
                    <p className="mt-1 text-base text-gray-700">Nein. Dies ist ein unabhängiges Pressedossier. Offizielle Informationen stammen von potsdam.de und sind hier als externe Quellen gekennzeichnet.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-extrabold text-gray-950">Noosha Aubel auf einen Blick</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="font-semibold text-gray-500">Amt</dt><dd className="mt-1 text-gray-900">Oberbürgermeisterin von Potsdam</dd></div>
              <div><dt className="font-semibold text-gray-500">Amtsantritt</dt><dd className="mt-1 text-gray-900">24. Oktober 2025</dd></div>
              <div><dt className="font-semibold text-gray-500">Partei</dt><dd className="mt-1 text-gray-900">parteilos</dd></div>
              <div><dt className="font-semibold text-gray-500">Geboren</dt><dd className="mt-1 text-gray-900">4. Dezember 1975 in Hannover</dd></div>
              <div><dt className="font-semibold text-gray-500">Wahlergebnis</dt><dd className="mt-1 text-gray-900">72,9 % in der Stichwahl 2025</dd></div>
            </dl>
            <ExternalLink href={OFFICIAL_PROFILE} className="mt-6 inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800">
              Offizielle Profilseite
            </ExternalLink>
          </aside>
        </div>
      </Container>

      <section aria-labelledby="pressedossier" className="border-y border-gray-200 bg-gray-50 py-12">
        <Container>
          <h2 id="pressedossier" className="text-3xl font-extrabold tracking-tight text-gray-950">Aktuelle Berichte und Dossiers</h2>
          <p className="mt-3 max-w-3xl text-gray-700">Quellenbasierte Zusammenfassungen veröffentlichter Beiträge über Noosha Aubel und kommunale Themen in Potsdam.</p>
          <div className="mt-7"><ArticleGrid articles={loaderData.articles.slice(0, 6)} columns={3} /></div>
        </Container>
      </section>
    </>
  )}</Translated>;
}
