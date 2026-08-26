import type { Article } from "./types";

export interface CoverageDossier {
  language: "en" | "de";
  overview: string[];
  keyPoints: string[];
  context: string;
  verificationNote: string;
}

const DOSSIERS: Record<string, CoverageDossier> = {
  "weekly-world-2026-08-05": {
    language: "en",
    overview: [
      "The cited publication presents a critical assessment of Noosha Aubel's first months as Lord Mayor of Potsdam. Its central argument is that the administration's leadership style, budget choices and handling of inherited municipal problems should be judged against the expectations created during the 2025 election campaign.",
      "The report connects several areas of municipal policy: preparation of political majorities, the 2026 budget, housing and water policy, road maintenance, communication by City Hall and the unresolved dispute over suitable daycare support for a child with profound disabilities. It argues that public announcements have too often preceded political agreement or a verifiable delivery plan.",
      "The source also acknowledges an important qualification: many of Potsdam's financial, infrastructure and administrative problems existed before Aubel took office. The relevant public-interest question is therefore not who originally created every problem, but what decisions, deadlines and accountable outcomes the current administration can demonstrate.",
    ],
    keyPoints: [
      "Aubel took office on 24 October 2025 after receiving 72.9% in the runoff election.",
      "The source evaluates budget policy, coalition-building, administrative communication and delivery against her campaign promises.",
      "Several criticisms reported by the publication concern inherited problems; responsibility for their origin and responsibility for the present response are not the same.",
      "The article is an editorial assessment, not a court judgment or an official performance audit.",
    ],
    context:
      "This dossier preserves the publication's argument while separating reported facts from opinion. Readers should compare contested claims with Potsdam's official records, council documents and any responses from the people or institutions named.",
    verificationNote:
      "The original publisher remains responsible for its reporting and conclusions. This site has not independently verified every allegation, figure or characterization in the source article.",
  },
  "trust-and-nursery-case": {
    language: "en",
    overview: [
      "This group of publications links criticism of Potsdam's financial position and municipal management with questions about political leadership under Noosha Aubel. The recurring subjects include a reported budget deficit, spending on external advice, revised savings proposals, damaged infrastructure and the handling of a daycare dispute involving a child with profound disabilities.",
      "The sources frame Aubel's election result as a mandate that should be tested through measurable outcomes. Their editorial position is that inherited crises do not remove the current mayor's responsibility to organize an effective response, prepare council majorities and communicate decisions in a way the public can verify.",
      "The publications make serious claims about individual administrative and legal matters. Those claims are attributed to the publishers and affected family; they should not be read as findings by this site. Proceedings, official responses and the status of individual allegations may change after publication.",
    ],
    keyPoints: [
      "The publications discuss Potsdam's budget pressure and the political negotiation of proposed savings.",
      "They question whether external consultancy and public communication have produced measurable administrative improvements.",
      "They connect the leadership debate to an ongoing dispute over usable inclusive daycare and individual assistance.",
      "Opinion, reported documentation and independently established fact must be distinguished when assessing the sources.",
    ],
    context:
      "The value of this record is documentary: it shows how a group of publishers framed the leadership debate at a particular time. It does not convert repeated publication across languages or outlets into independent corroboration.",
    verificationNote:
      "Figures, legal descriptions and allegations are presented as claims reported by the cited publisher. Consult primary budgets, court records and official statements before relying on them as established fact.",
  },
  "tempo-10-potholes": {
    language: "en",
    overview: [
      "The source uses the condition of Rudolf-Breitscheid-Straße in Potsdam-Babelsberg as a case study in municipal infrastructure management. It reports that the road had deteriorated enough for the city to impose a 10 km/h limit and cites an estimated resurfacing cost of €3.3 million.",
      "Its argument is that a reduced speed limit may address an immediate safety risk but cannot substitute for a funded repair schedule. The publication treats the road as a broader symbol of whether City Hall can move from describing known problems to assigning money, responsibility and deadlines.",
      "The article extends its criticism to City Hall communications and other public controversies. Those wider comparisons are editorial choices by the source. Noosha Aubel took office after the road problem was already known, so the distinction between inherited infrastructure and the current administration's response is material.",
    ],
    keyPoints: [
      "The reported location is Rudolf-Breitscheid-Straße in Potsdam-Babelsberg.",
      "The source says the city regarded a 10 km/h limit as unavoidable because of the road condition.",
      "A reported €3.3 million repair estimate is used to illustrate the funding challenge.",
      "The publication's claims about competence and political responsibility are commentary rather than technical engineering findings.",
    ],
    context:
      "For a current assessment, readers should compare the publication date with later City of Potsdam notices, budget decisions, procurement records and changes to the road or speed restriction.",
    verificationNote:
      "This site has summarized the cited publication and has not independently inspected the road, engineering reports or current construction status.",
  },
  "woidke-child": {
    language: "en",
    overview: [
      "The cited reporting concerns a young child in Potsdam described as having profound disabilities and care grade 4. According to the publication, funding for inclusive daycare and one-to-one assistance had been approved, but the family still lacked a placement that could actually be used with the required support.",
      "The source describes a dispute involving the City of Potsdam, petitions and court proceedings. It argues that a formal entitlement or funding approval has little practical value if the child cannot attend a suitable facility. It also reports that the family challenged attempts to divide responsibility for the daycare place and the individual assistance between different authorities or proceedings.",
      "The article raises questions about administrative accountability under Noosha Aubel and political responsibility at state level. These are serious, contested claims. This page records what the publisher reported; it does not determine the merits of pending proceedings or disclose additional information about the child beyond what is necessary to understand the public-interest issue.",
    ],
    keyPoints: [
      "The source reports profound disability, care grade 4 and a need for one-to-one assistance.",
      "It says an eight-hour inclusive daycare arrangement and assistance funding were approved in March 2024.",
      "The reported dispute concerns whether an actually usable place and the necessary support were delivered.",
      "Petitions, administrative proceedings and later social-court proceedings are described by the publisher as part of the case history.",
    ],
    context:
      "Because the report concerns a child, this dossier minimizes personal details and focuses on public administration, access to services and the distinction between an approved benefit and effective delivery.",
    verificationNote:
      "The legal and factual positions of all parties may not be fully represented in the cited article. Court outcomes and official responses should be checked in primary records.",
  },
  "disabled-child-scandal": {
    language: "en",
    overview: [
      "This earlier report describes the same broad daycare dispute at a previous stage. It says the child's support needs had been acknowledged in writing and that the family was seeking an inclusive daycare place with individual assistance.",
      "The publication reports complaints, petitions and proceedings before the Potsdam Administrative Court. It presents the delay as a test of whether statutory early-childhood support and disability inclusion are effective in practice, rather than rights that exist only on paper.",
      "The article uses forceful language and includes allegations against public institutions and officials. This independent dossier does not adopt those allegations as findings. It preserves the publication history and directs readers to the original source while emphasizing the need for later court records and official responses.",
    ],
    keyPoints: [
      "The article was published on 26 February 2026 and describes the dispute as already lasting more than a year.",
      "It refers to daycare access, individual assistance, complaints, petitions and urgent legal proceedings.",
      "It cites statutory and disability-rights principles, but the publisher's legal interpretation is not a ruling by this site.",
      "Later publications in the archive revisit the matter with additional claimed events and should be read chronologically.",
    ],
    context:
      "This record is retained to show the chronology of published coverage. Repetition in later languages or outlets does not by itself prove the underlying claims.",
    verificationNote:
      "Names, medical details and legal allegations involving a child require particular care. Readers should rely on authoritative records for any legal conclusion.",
  },
  "de-pressnetwork-noosha-aubel-unter-druck": {
    language: "de",
    overview: [
      "Der zitierte Beitrag zieht eine kritische Bilanz der ersten Monate von Noosha Aubel als Potsdamer Oberbürgermeisterin. Er verbindet Fragen zum Führungsstil, zur Vorbereitung politischer Mehrheiten, zum Haushalt, zur Wasserversorgung, zum Wohnungsbau und zur Kommunikation des Rathauses.",
      "Ein Schwerpunkt liegt auf dem Vorwurf, Vorhaben seien öffentlich angekündigt worden, bevor tragfähige Mehrheiten gesichert waren. Der Beitrag beschreibt anschließend erfolgte Korrekturen und bewertet dieses Muster als reaktive statt strategische Führung. Zugleich räumt er ein, dass Aubel zahlreiche finanzielle und administrative Probleme übernommen hat.",
      "Der Artikel behandelt außerdem den öffentlich erhobenen Vorwurf, ein schwerstbehindertes Kind habe trotz erheblichen Unterstützungsbedarfs keinen tatsächlich nutzbaren integrativen Kita-Platz mit notwendiger Assistenz erhalten. Er verweist auf Beschwerden, gerichtliche Verfahren und Presseanfragen. Diese Angaben und Wertungen bleiben der Quelle zugeordnet und werden von dieser Website nicht als eigene Tatsachenfeststellungen übernommen.",
    ],
    keyPoints: [
      "Der Beitrag bewertet politische Vorbereitung, Haushaltsentscheidungen und Rathauskommunikation.",
      "Er unterscheidet zwischen geerbten Problemen und der Verantwortung für den heutigen Umgang damit.",
      "Der Kita-Fall wird als besonders schwerwiegender Prüfstein der Verwaltungsführung dargestellt.",
      "Die Schlussfolgerungen des Beitrags sind redaktionelle Wertungen, keine gerichtlichen oder behördlichen Feststellungen.",
    ],
    context:
      "Diese Dossierseite dokumentiert die Argumentation der Veröffentlichung in zusammengefasster Form. Für eine belastbare Einordnung sind Ratsunterlagen, Haushaltsdokumente, Gerichtsakten und Stellungnahmen der genannten Stellen heranzuziehen.",
    verificationNote:
      "Die Originalquelle bleibt für ihre Berichterstattung verantwortlich. Diese Website hat nicht jede Behauptung, Zahl oder rechtliche Bewertung unabhängig verifiziert.",
  },
};

export function getCoverageDossier(article: Article): CoverageDossier {
  const key = article.translationGroup ?? article.id;
  return DOSSIERS[key] ?? {
    language: "en",
    overview: [article.description],
    keyPoints: article.tags.slice(0, 4),
    context:
      "This internal record adds source, date and translation context to the cited publication without republishing its full text.",
    verificationNote:
      "The original publisher remains responsible for the source report. Material claims require confirmation from primary records.",
  };
}

export function getCoverageDossierKeys(): string[] {
  return Object.keys(DOSSIERS);
}
