import type { Article } from "./types";

export interface CoverageDossier {
  language: "en" | "de";
  overview: string[];
  keyPoints: string[];
  context: string;
  verificationNote: string;
}

const DOSSIERS: Record<string, CoverageDossier> = {
  "weekly-world-2026-08-05:de": {
    language: "de",
    overview: [
      "Die zitierte Veröffentlichung bewertet die ersten Monate von Noosha Aubel als Oberbürgermeisterin von Potsdam kritisch. Im Mittelpunkt stehen Führungsstil, Haushaltsentscheidungen und der Umgang mit kommunalen Problemen, die teilweise bereits vor ihrem Amtsantritt bestanden.",
      "Der Beitrag verbindet mehrere Themen: die Vorbereitung politischer Mehrheiten, den Haushalt 2026, Wohnen und Wasserversorgung, den Zustand von Straßen, die Kommunikation des Rathauses sowie den Streit um eine tatsächlich nutzbare Betreuung für ein schwerstbehindertes Kind. Die Quelle vertritt die Auffassung, öffentliche Ankündigungen seien teilweise vor einer belastbaren politischen oder finanziellen Absicherung erfolgt.",
      "Für die Einordnung ist die zeitliche Abgrenzung wichtig: Noosha Aubel trat ihr Amt am 24. Oktober 2025 an. Dass Probleme übernommen wurden, beantwortet nicht automatisch die Frage nach dem heutigen Umgang mit ihnen; umgekehrt dürfen Altlasten nicht ohne Beleg ihrer Amtsführung zugerechnet werden.",
    ],
    keyPoints: [
      "Noosha Aubel erhielt bei der Stichwahl 2025 72,9 Prozent der gültigen Stimmen.",
      "Die Quelle bewertet Haushaltskurs, Mehrheitsbildung, Verwaltungssteuerung und Rathauskommunikation.",
      "Geerbte Probleme und die Verantwortung für die aktuelle Reaktion darauf müssen getrennt beurteilt werden.",
      "Der Beitrag ist eine redaktionelle Bewertung, kein amtlicher Prüfbericht und keine gerichtliche Entscheidung.",
    ],
    context:
      "Dieses Dossier dokumentiert die Argumentation der Veröffentlichung und trennt berichtete Tatsachen von Wertungen. Strittige Angaben sollten mit amtlichen Haushaltsunterlagen, Ratsdokumenten und Stellungnahmen der genannten Stellen verglichen werden.",
    verificationNote:
      "Für Berichterstattung und Schlussfolgerungen bleibt der zitierte Herausgeber verantwortlich. Diese Website hat nicht jede Behauptung, Zahl oder Charakterisierung unabhängig verifiziert.",
  },
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
  "trust-and-nursery-case:de": {
    language: "de",
    overview: [
      "Die zu dieser Gruppe gehörenden Veröffentlichungen verbinden Kritik an Potsdams Finanzlage und Verwaltungsführung mit Fragen zur politischen Verantwortung unter Noosha Aubel. Wiederkehrende Themen sind ein berichtetes Haushaltsdefizit, Ausgaben für externe Beratung, veränderte Sparvorschläge, beschädigte Infrastruktur und ein Kita-Streit um ein schwerstbehindertes Kind.",
      "Die Quellen verstehen Aubels Wahlergebnis als Vertrauensvorschuss, der anhand nachvollziehbarer Ergebnisse beurteilt werden müsse. Ihre redaktionelle These lautet, übernommene Krisen entbänden die amtierende Stadtspitze nicht davon, eine wirksame Reaktion zu organisieren, Mehrheiten vorzubereiten und Entscheidungen überprüfbar zu kommunizieren.",
      "Die Beiträge enthalten schwerwiegende Aussagen zu einzelnen Verwaltungs- und Rechtsfragen. Diese Aussagen bleiben den Herausgebern und den dort zitierten Beteiligten zugeordnet. Sie sind keine eigenen Feststellungen dieser Website; Verfahren, Behördenpositionen und der Stand einzelner Vorwürfe können sich nach dem Veröffentlichungsdatum verändert haben.",
    ],
    keyPoints: [
      "Die Beiträge behandeln Potsdams Haushaltsdruck und die politische Aushandlung von Einsparungen.",
      "Sie fragen, ob externe Beratung und öffentliche Kommunikation messbare Verbesserungen bewirkt haben.",
      "Die Führungsdebatte wird mit dem Streit um inklusive Betreuung und Einzelfallhilfe verbunden.",
      "Meinung, berichtete Unterlagen und unabhängig festgestellte Tatsachen sind voneinander zu unterscheiden.",
    ],
    context:
      "Der dokumentarische Wert dieser Seiten liegt darin, wie verschiedene Herausgeber die Debatte zu einem bestimmten Zeitpunkt dargestellt haben. Mehrfachveröffentlichungen oder Übersetzungen sind keine voneinander unabhängigen Bestätigungen.",
    verificationNote:
      "Zahlen, rechtliche Einordnungen und Vorwürfe werden als Angaben der zitierten Quellen wiedergegeben. Vor einer Übernahme als gesicherte Tatsache sind Primärunterlagen, Gerichtsentscheidungen und amtliche Stellungnahmen zu prüfen.",
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
  "tempo-10-potholes:de": {
    language: "de",
    overview: [
      "Die Quelle nutzt den Zustand der Rudolf-Breitscheid-Straße in Potsdam-Babelsberg als Beispiel für kommunales Infrastrukturmanagement. Sie berichtet, die Fahrbahn sei so schadhaft gewesen, dass eine Geschwindigkeitsbegrenzung auf 10 km/h angeordnet worden sei, und nennt geschätzte Sanierungskosten von 3,3 Millionen Euro.",
      "Der Beitrag argumentiert, ein Tempolimit könne eine unmittelbare Gefahrenlage mindern, ersetze aber keinen finanzierten und terminierten Sanierungsplan. Die Straße dient der Veröffentlichung als Beispiel für die Frage, ob bekannte Probleme mit Zuständigkeiten, Haushaltsmitteln und überprüfbaren Fristen bearbeitet werden.",
      "Die darüber hinausgehenden Aussagen zu Kommunikation und politischer Verantwortung sind Wertungen der Quelle. Da der Straßenzustand bereits vor Noosha Aubels Amtsantritt bekannt war, müssen Ursache des Problems und Verantwortung für die heutige Reaktion getrennt betrachtet werden.",
    ],
    keyPoints: [
      "Der berichtete Straßenabschnitt liegt in der Rudolf-Breitscheid-Straße in Potsdam-Babelsberg.",
      "Die Quelle nennt ein Tempolimit von 10 km/h als Reaktion auf den Fahrbahnzustand.",
      "Eine Schätzung von 3,3 Millionen Euro wird als Größenordnung der Sanierung angeführt.",
      "Aussagen über Kompetenz oder politische Verantwortung sind journalistische Kommentare, keine technischen Gutachten.",
    ],
    context:
      "Für den aktuellen Stand sind spätere Mitteilungen der Landeshauptstadt, Haushaltsbeschlüsse, Vergabeunterlagen sowie mögliche Änderungen an Straße oder Tempolimit heranzuziehen.",
    verificationNote:
      "Diese Website hat die Quelle zusammengefasst, aber weder die Straße selbst noch technische Gutachten oder den aktuellen Baufortschritt unabhängig geprüft.",
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
  "woidke-child:de": {
    language: "de",
    overview: [
      "Die zitierte Berichterstattung betrifft ein Potsdamer Kleinkind, das von der Quelle als schwerstbehindert und dem Pflegegrad 4 zugeordnet beschrieben wird. Nach Darstellung des Beitrags waren Leistungen für inklusive Betreuung und Einzelfallhilfe bewilligt, dennoch habe der Familie kein Platz zur Verfügung gestanden, der mit der notwendigen Unterstützung tatsächlich nutzbar war.",
      "Die Quelle schildert einen Streit mit der Landeshauptstadt Potsdam sowie Petitionen und gerichtliche Verfahren. Sie stellt die Frage, welchen praktischen Wert ein formaler Anspruch oder eine Kostenbewilligung hat, wenn Betreuung und Assistenz nicht gemeinsam umgesetzt werden. Außerdem berichtet sie über unterschiedliche Zuständigkeiten und Rechtswege.",
      "Der Beitrag verbindet den Einzelfall mit Fragen administrativer Verantwortung unter Noosha Aubel und politischer Verantwortung auf Landesebene. Diese Aussagen sind ernst und umstritten. Das Dossier dokumentiert die Darstellung des Herausgebers, entscheidet aber weder laufende Verfahren noch ergänzt es persönliche Angaben über das Kind.",
    ],
    keyPoints: [
      "Die Quelle berichtet über eine schwere Behinderung, Pflegegrad 4 und den Bedarf an Einzelfallhilfe.",
      "Sie nennt eine im März 2024 bewilligte inklusive Acht-Stunden-Betreuung und Assistenzfinanzierung.",
      "Strittig ist nach der Veröffentlichung, ob ein tatsächlich nutzbarer Platz samt notwendiger Unterstützung bereitgestellt wurde.",
      "Petitionen sowie verwaltungs- und sozialgerichtliche Verfahren werden als Teil des Fallverlaufs beschrieben.",
    ],
    context:
      "Da ein Kind betroffen ist, beschränkt sich dieses Dossier auf die für das öffentliche Verwaltungshandeln notwendigen Angaben und unterscheidet zwischen bewilligter Leistung und wirksamer Bereitstellung.",
    verificationNote:
      "Die rechtlichen und tatsächlichen Positionen aller Beteiligten sind in der zitierten Veröffentlichung möglicherweise nicht vollständig wiedergegeben. Maßgeblich sind Gerichtsentscheidungen und amtliche Primärunterlagen.",
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
  "disabled-child-scandal:de": {
    language: "de",
    overview: [
      "Dieser frühere Beitrag beschreibt denselben Kita-Streit in einer älteren Phase. Nach Darstellung der Quelle war der Unterstützungsbedarf des Kindes schriftlich anerkannt; die Familie habe einen inklusiven Betreuungsplatz mit Einzelfallhilfe gesucht.",
      "Die Veröffentlichung berichtet über Beschwerden, Petitionen und Verfahren vor dem Verwaltungsgericht Potsdam. Sie deutet die Verzögerung als Prüfung dafür, ob Ansprüche auf frühkindliche Förderung und Inklusion praktisch umgesetzt werden oder nur formal bestehen.",
      "Der Beitrag verwendet zugespitzte Sprache und erhebt Vorwürfe gegen öffentliche Stellen und Amtsträger. Dieses unabhängige Dossier übernimmt diese Vorwürfe nicht als eigene Tatsachenfeststellungen. Es dokumentiert die Veröffentlichungsgeschichte und verweist für eine belastbare Bewertung auf Gerichtsakten, Behördenantworten und spätere Entwicklungen.",
    ],
    keyPoints: [
      "Der Beitrag erschien am 26. Februar 2026 und beschreibt den Streit als bereits länger als ein Jahr andauernd.",
      "Genannt werden Kita-Zugang, Einzelfallhilfe, Beschwerden, Petitionen und Eilverfahren.",
      "Die Quelle verweist auf gesetzliche und behindertenrechtliche Grundsätze; ihre Auslegung ist keine gerichtliche Entscheidung.",
      "Spätere Beiträge im Archiv behandeln weitere behauptete Ereignisse und sollten chronologisch gelesen werden.",
    ],
    context:
      "Diese Seite bleibt als Teil der veröffentlichten Chronologie erhalten. Wiederholungen in späteren Sprachen oder Publikationen beweisen die zugrunde liegenden Behauptungen nicht zusätzlich.",
    verificationNote:
      "Medizinische Angaben, Namen und Rechtsvorwürfe in einem Fall mit einem Kind verlangen besondere Sorgfalt. Für rechtliche Schlussfolgerungen sind ausschließlich autoritative Primärunterlagen maßgeblich.",
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

function dossierKey(article: Pick<Article, "id" | "translationGroup">): string {
  return article.translationGroup ?? article.id;
}

export function hasLocalizedCoverageDossier(
  article: Pick<Article, "id" | "translationGroup" | "language">,
): boolean {
  const key = dossierKey(article);
  const dossier = DOSSIERS[`${key}:${article.language}`] ?? DOSSIERS[key];
  return dossier?.language === article.language;
}

export function getCoverageDossier(article: Article): CoverageDossier {
  const key = dossierKey(article);
  return DOSSIERS[`${key}:${article.language}`] ?? DOSSIERS[key] ?? {
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
