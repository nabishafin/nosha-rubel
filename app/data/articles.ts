import type { Article } from "~/lib/types";
import generatedRaw from "./articles.generated.json";

type ArticleSeed = Omit<Article, "image">;

const SEEDS: ArticleSeed[] = [
  // ─── English ───────────────────────────────────────────────────────────────
  {
    id: "en-1",
    language: "en",
    category: "technology",
    slug: "ai-chips-next-generation-launch",
    title: "Next-Generation AI Chips Promise a Tenfold Leap in Efficiency",
    description:
      "Chipmakers unveiled a new architecture that dramatically cuts the energy cost of running large AI models.",
    content: [
      "A new generation of AI accelerators was unveiled this week, with manufacturers claiming up to a tenfold improvement in performance-per-watt over last year's flagship hardware.",
      "Analysts say the efficiency gains could ease the mounting electricity costs that have become a central concern for hyperscale data centers. Several cloud providers have already signaled plans to deploy the chips in the coming months.",
      "Independent benchmarks are still pending, but early access partners describe meaningful reductions in training times for the largest models.",
    ],
    sourceUrl: "https://example.com/tech/ai-chips",
    sourceName: "Tech Frontier",
    author: "Dana Whitfield",
    publishedAt: "2026-07-02T08:30:00Z",
    views: 48200,
    tags: ["ai", "hardware", "semiconductors"],
    featured: true,
    breaking: true,
  },
  {
    id: "en-2",
    language: "en",
    category: "world",
    slug: "global-climate-summit-agreement",
    title: "Global Climate Summit Reaches Landmark Emissions Agreement",
    description:
      "Delegates from more than 190 nations agreed to accelerate emissions cuts, setting binding interim targets for the first time.",
    content: [
      "After two weeks of intense negotiation, delegates reached a landmark accord committing to steeper near-term emissions reductions.",
      "Supporters called the agreement a turning point, while critics cautioned that implementation and financing remain the harder challenge.",
      "Markets responded cautiously, with renewable-energy shares climbing modestly in early trading.",
    ],
    sourceUrl: "https://example.com/world/climate-summit",
    sourceName: "World Report",
    author: "Marcus Hale",
    publishedAt: "2026-07-01T18:00:00Z",
    views: 61300,
    tags: ["climate", "summit", "environment"],
    breaking: true,
  },
  {
    id: "en-3",
    language: "en",
    category: "sports",
    slug: "underdogs-clinch-championship-final",
    title: "Underdogs Clinch the Championship in a Dramatic Final",
    description:
      "A last-minute goal sealed an improbable title run, capping one of the most surprising seasons in recent memory.",
    content: [
      "In a match that will be replayed for years, the tournament's underdogs snatched victory with a goal in the final minute of stoppage time.",
      "The team's rise from mid-table obscurity to champions has captivated fans, driven by a young squad and a first-year coach.",
      "Players credited relentless preparation and belief for the turnaround. The club now looks ahead to continental competition next season.",
    ],
    sourceUrl: "https://example.com/sports/championship-final",
    sourceName: "Sports Wire",
    author: "Leo Barnes",
    publishedAt: "2026-06-29T21:45:00Z",
    views: 52900,
    tags: ["football", "championship", "final"],
    featured: true,
  },

  // ─── German (Deutsch) ──────────────────────────────────────────────────────
  {
    id: "de-1",
    language: "de",
    category: "politics",
    slug: "bundesrat-klimaschutzgesetz-reform",
    title: "Bundesrat stimmt umstrittener Klimaschutzreform zu",
    description:
      "Nach monatelangen Verhandlungen hat der Bundesrat die Reform des Klimaschutzgesetzes verabschiedet.",
    content: [
      "Der Bundesrat hat nach monatelangen Debatten die Reform des Klimaschutzgesetzes mit knapper Mehrheit verabschiedet. Kritiker bemängeln fehlende Verbindlichkeit.",
      "Die neuen Regelungen sollen vor allem den Gebäude- und Verkehrssektor stärker in die Pflicht nehmen. Erste Maßnahmen treten ab 2027 in Kraft.",
      "Umweltverbände begrüßen den Schritt, fordern aber weitergehende Maßnahmen. Die Opposition kündigt eine genaue Prüfung der Umsetzung an.",
    ],
    sourceUrl: "https://example.com/de/politik/klimaschutzgesetz",
    sourceName: "Berliner Tageszeitung",
    author: "Jonas Brandt",
    publishedAt: "2026-07-02T10:00:00Z",
    views: 31400,
    tags: ["klimaschutz", "bundesrat", "politik"],
    featured: true,
    breaking: true,
  },
  {
    id: "de-2",
    language: "de",
    category: "technology",
    slug: "startup-praesentiert-guenstige-solarzellen",
    title: "Start-up präsentiert deutlich günstigere Solarzellen",
    description:
      "Ein europäisches Start-up will mit einer neuen Fertigungsmethode die Kosten für Solarmodule spürbar senken.",
    content: [
      "Ein europäisches Start-up hat eine Fertigungsmethode vorgestellt, die die Produktionskosten von Solarzellen deutlich senken soll.",
      "Erste Pilotanlagen liefern nach Unternehmensangaben vielversprechende Wirkungsgrade. Investoren zeigen großes Interesse an der Skalierung der Technologie.",
      "Fachleute mahnen zur Vorsicht, bis unabhängige Tests vorliegen. Dennoch könnte die Innovation den Ausbau erneuerbarer Energien beschleunigen.",
    ],
    sourceUrl: "https://example.com/de/technik/solarzellen",
    sourceName: "Technik Welt",
    author: "Miriam Kluge",
    publishedAt: "2026-06-30T11:30:00Z",
    views: 22600,
    tags: ["solar", "energie", "start-up"],
  },
  {
    id: "de-3",
    language: "de",
    category: "sports",
    slug: "nationalmannschaft-erreicht-halbfinale",
    title: "Nationalmannschaft erreicht überraschend das Halbfinale",
    description:
      "Mit einer starken zweiten Halbzeit setzte sich das Team gegen den Favoriten durch.",
    content: [
      "Die Nationalmannschaft hat sich mit einer beeindruckenden Leistung ins Halbfinale gespielt. Nach einem Rückstand drehte das Team die Partie in der zweiten Halbzeit.",
      "Der Trainer lobte die Moral und den Zusammenhalt der Mannschaft. Die Fans feierten den Erfolg ausgelassen in den Städten.",
      "Im Halbfinale wartet nun ein weiterer schwerer Gegner. Die Vorbereitung beginnt bereits am Wochenende.",
    ],
    sourceUrl: "https://example.com/de/sport/halbfinale",
    sourceName: "Sport Aktuell",
    author: "Thomas Weber",
    publishedAt: "2026-06-27T20:30:00Z",
    views: 34800,
    tags: ["fußball", "nationalmannschaft", "turnier"],
  },

  // ─── Chinese (中文) ─────────────────────────────────────────────────────────
  {
    id: "zh-1",
    language: "zh",
    category: "business",
    slug: "keji-julong-fabu-jidu-caibao",
    title: "科技巨头季度财报超预期，云计算业务强劲增长",
    description: "多家科技公司公布最新财报，云计算与人工智能业务成为增长主力。",
    content: [
      "多家科技巨头本周公布了最新季度财报，整体营收普遍超出市场预期。云计算和人工智能相关业务成为推动增长的主要动力。",
      "分析师指出，企业在数字化转型上的持续投入，为相关服务带来了稳定需求。部分公司还上调了全年业绩指引。",
      "随着更多影片定档，业界对全年电影市场保持乐观。创作者也在探索更加多元的题材。",
    ],
    sourceUrl: "https://example.com/zh/business/caibao",
    sourceName: "财经观察",
    author: "李明",
    publishedAt: "2026-07-01T10:00:00Z",
    views: 45600,
    tags: ["财报", "科技", "云计算"],
    featured: true,
    breaking: true,
  },
  {
    id: "zh-2",
    language: "zh",
    category: "entertainment",
    slug: "guochan-dianying-piaofang-chuang-xingao",
    title: "国产电影暑期档票房创下历史新高",
    description: "多部影片同期上映，带动暑期档票房刷新历史纪录。",
    content: [
      "今年暑期档多部国产影片同期上映，带动整体票房刷新历史纪录。观众对本土题材的热情持续高涨。",
      "业内人士表示，制作质量的提升和口碑传播是票房走高的重要原因。多家影院延长了放映场次。",
      "随着更多影片定档，业界对全年电影市场保持乐观。",
    ],
    sourceUrl: "https://example.com/zh/entertainment/piaofang",
    sourceName: "娱乐前线",
    author: "张伟",
    publishedAt: "2026-06-26T16:00:00Z",
    views: 51200,
    tags: ["电影", "票房", "暑期档"],
    featured: true,
  },
  {
    id: "zh-3",
    language: "zh",
    category: "health",
    slug: "xinyan-yanjiu-shuimian-jiankang",
    title: "新研究揭示规律睡眠对心脏健康的深远影响",
    description: "大规模研究发现，睡眠规律性与心血管疾病风险密切相关。",
    content: [
      "一项涵盖数十万人的大规模研究表明，睡眠时间的规律性对心脏健康的影响不亚于睡眠时长本身。",
      "研究人员指出，作息不规律人群患心血管疾病的风险明显偏高，即使其总睡眠时间充足。",
      "专家建议公众养成固定的作息习惯，并将其视为与饮食、运动同等重要的健康行为。",
    ],
    sourceUrl: "https://example.com/zh/health/sleep",
    sourceName: "健康时报",
    author: "王芳",
    publishedAt: "2026-06-29T08:00:00Z",
    views: 27300,
    tags: ["健康", "睡眠", "心脏"],
  },

  // ─── Spanish (Español) ─────────────────────────────────────────────────────
  {
    id: "es-1",
    language: "es",
    category: "sports",
    slug: "seleccion-gana-final-continental",
    title: "La selección conquista la final continental tras una remontada histórica",
    description:
      "El equipo levantó el título después de remontar dos goles en la segunda mitad.",
    content: [
      "La selección se proclamó campeona continental tras una remontada histórica en la segunda mitad. El conjunto revirtió una desventaja de dos goles para sellar el título.",
      "El seleccionador destacó el carácter y la unidad del grupo. Miles de aficionados salieron a las calles para celebrar la victoria.",
      "El triunfo corona una temporada extraordinaria y proyecta al equipo hacia los próximos torneos internacionales.",
    ],
    sourceUrl: "https://example.com/es/deportes/final-continental",
    sourceName: "Diario Deportivo",
    author: "Carla Méndez",
    publishedAt: "2026-07-02T22:00:00Z",
    views: 58900,
    tags: ["fútbol", "final", "selección"],
    featured: true,
    breaking: true,
  },
  {
    id: "es-2",
    language: "es",
    category: "health",
    slug: "avance-tratamiento-enfermedades-cronicas",
    title: "Nuevo tratamiento abre esperanza para millones con enfermedades crónicas",
    description:
      "Investigadores presentaron resultados prometedores en ensayos que podrían transformar el manejo de dolencias de larga duración.",
    content: [
      "Un equipo de investigadores presentó resultados prometedores de un ensayo clínico que podría cambiar el tratamiento de varias enfermedades crónicas.",
      "Los especialistas subrayan que se necesitan estudios más amplios antes de una aplicación generalizada.",
      "Las autoridades sanitarias seguirán de cerca las próximas fases del ensayo. La comunidad médica recibió la noticia con optimismo prudente.",
    ],
    sourceUrl: "https://example.com/es/salud/enfermedades-cronicas",
    sourceName: "Salud Hoy",
    author: "Dr. Javier Soto",
    publishedAt: "2026-06-30T08:45:00Z",
    views: 24100,
    tags: ["salud", "medicina", "investigación"],
  },
  {
    id: "es-3",
    language: "es",
    category: "business",
    slug: "bolsa-madrid-maximo-historico",
    title: "La bolsa de Madrid alcanza su máximo histórico impulsada por el sector tecnológico",
    description:
      "El Ibex 35 cerró en niveles récord después de una jornada de fuertes compras en valores tecnológicos y bancarios.",
    content: [
      "El Ibex 35 alcanzó su máximo histórico al cierre de la sesión, impulsado por una oleada de compras en el sector tecnológico y bancario.",
      "Los inversores respondieron positivamente a los datos de empleo y a las señales del banco central sobre posibles bajadas de tipos.",
      "Analistas advierten que los niveles actuales exigen cautela, aunque el sentimiento del mercado sigue siendo claramente alcista.",
    ],
    sourceUrl: "https://example.com/es/economia/bolsa-madrid",
    sourceName: "Economía Hoy",
    author: "Pablo Ruiz",
    publishedAt: "2026-06-28T17:00:00Z",
    views: 19800,
    tags: ["bolsa", "ibex", "economía"],
  },

  // ─── French (Français) ─────────────────────────────────────────────────────
  {
    id: "fr-1",
    language: "fr",
    category: "world",
    slug: "accord-international-protection-oceans",
    title: "Un accord international historique renforce la protection des océans",
    description:
      "Plusieurs pays se sont engagés à créer de vastes aires marines protégées pour préserver la biodiversité.",
    content: [
      "Plusieurs pays ont signé un accord ambitieux visant à renforcer la protection des océans. Le texte prévoit la création de vastes aires marines protégées.",
      "Les défenseurs de l'environnement saluent une avancée majeure pour la biodiversité. Ils rappellent toutefois que la mise en œuvre sera déterminante.",
      "Des mécanismes de suivi seront établis pour évaluer les progrès. Les prochaines négociations porteront sur le financement des mesures.",
    ],
    sourceUrl: "https://example.com/fr/monde/protection-oceans",
    sourceName: "Le Journal du Monde",
    author: "Camille Laurent",
    publishedAt: "2026-07-01T15:30:00Z",
    views: 33200,
    tags: ["océans", "environnement", "biodiversité"],
    featured: true,
    breaking: true,
  },
  {
    id: "fr-2",
    language: "fr",
    category: "entertainment",
    slug: "festival-cinema-palmares-surprise",
    title: "Le festival de cinéma dévoile un palmarès qui surprend la critique",
    description:
      "La cérémonie a récompensé des œuvres audacieuses, suscitant de vifs débats parmi les critiques.",
    content: [
      "Le festival de cinéma a dévoilé son palmarès lors d'une cérémonie très suivie. Le jury a récompensé des œuvres audacieuses et engagées.",
      "Les choix ont suscité de vifs débats parmi les critiques et le public. Plusieurs jeunes réalisateurs ont été mis en lumière.",
      "Les films primés bénéficieront d'une large distribution dans les mois à venir.",
    ],
    sourceUrl: "https://example.com/fr/culture/festival-cinema",
    sourceName: "Culture & Écrans",
    author: "Thomas Girard",
    publishedAt: "2026-06-29T19:00:00Z",
    views: 28700,
    tags: ["cinéma", "festival", "culture"],
  },

  // ─── Italian (Italiano) ────────────────────────────────────────────────────
  {
    id: "it-1",
    language: "it",
    category: "entertainment",
    slug: "mostra-arte-record-visitatori",
    title: "La grande mostra d'arte batte ogni record con tre milioni di visitatori",
    description:
      "L'esposizione dedicata ai maestri del Novecento ha attirato folle da tutto il mondo.",
    content: [
      "La grande mostra d'arte dedicata ai maestri del Novecento ha battuto ogni record di visitatori. Le sale hanno accolto folle provenienti da tutto il mondo.",
      "Gli organizzatori hanno prolungato gli orari di apertura per soddisfare la domanda. La critica ha elogiato l'allestimento e la selezione delle opere.",
      "Il successo conferma il crescente interesse del pubblico per l'arte moderna.",
    ],
    sourceUrl: "https://example.com/it/cultura/mostra-arte",
    sourceName: "Cultura Oggi",
    author: "Giulia Ferrari",
    publishedAt: "2026-07-01T11:00:00Z",
    views: 30600,
    tags: ["arte", "mostra", "cultura"],
    featured: true,
    breaking: true,
  },
  {
    id: "it-2",
    language: "it",
    category: "business",
    slug: "startup-italiana-finanziamento-record",
    title: "Startup italiana raccoglie 200 milioni in un round di finanziamento record",
    description:
      "La giovane azienda tecnologica di Milano ha attirato l'interesse dei principali fondi di investimento europei.",
    content: [
      "Una startup tecnologica milanese ha chiuso un round di finanziamento da 200 milioni di euro, il più grande mai registrato nel settore in Italia.",
      "I fondatori intendono utilizzare i fondi per espandere le operazioni in dieci nuovi mercati entro la fine dell'anno.",
      "Gli esperti vedono nel progetto un segnale positivo per l'ecosistema tecnologico nazionale.",
    ],
    sourceUrl: "https://example.com/it/economia/startup-finanziamento",
    sourceName: "Economia Italia",
    author: "Marco Conti",
    publishedAt: "2026-06-28T14:40:00Z",
    views: 18900,
    tags: ["startup", "investimento", "tecnologia"],
  },

  // ─── Portuguese (Português) ────────────────────────────────────────────────
  {
    id: "pt-1",
    language: "pt",
    category: "sports",
    slug: "equipa-conquista-titulo-inedito",
    title: "Equipa conquista título inédito em noite histórica para o clube",
    description:
      "O clube ergueu o troféu pela primeira vez na sua história perante um estádio esgotado.",
    content: [
      "A equipa conquistou um título inédito numa noite histórica, erguendo o troféu pela primeira vez. O estádio esgotado viveu momentos de grande emoção.",
      "O treinador destacou o esforço coletivo ao longo de toda a época. Os adeptos celebraram nas ruas até de madrugada.",
      "A conquista abre um novo capítulo para o clube, que se prepara agora para as competições europeias.",
    ],
    sourceUrl: "https://example.com/pt/desporto/titulo-inedito",
    sourceName: "Desporto Diário",
    author: "Rui Almeida",
    publishedAt: "2026-07-02T21:15:00Z",
    views: 44700,
    tags: ["futebol", "título", "desporto"],
    featured: true,
    breaking: true,
  },
  {
    id: "pt-2",
    language: "pt",
    category: "world",
    slug: "cimeira-lusofona-parcerias-comerciais",
    title: "Cimeira lusófona lança novas parcerias comerciais entre países de língua portuguesa",
    description:
      "Países de língua portuguesa acordaram novos acordos em comércio, educação e tecnologia.",
    content: [
      "Uma cimeira reuniu países de língua portuguesa para reforçar os laços de cooperação. Foram anunciadas novas parcerias em comércio, educação e tecnologia.",
      "Os líderes destacaram o potencial de um mercado comum mais integrado. Vários acordos deverão ser assinados nos próximos meses.",
      "Analistas consideram a aproximação estratégica para todas as partes envolvidas.",
    ],
    sourceUrl: "https://example.com/pt/mundo/cimeira-lusofona",
    sourceName: "Mundo Lusófono",
    author: "Pedro Costa",
    publishedAt: "2026-06-27T17:45:00Z",
    views: 16100,
    tags: ["lusofonia", "cooperação", "comércio"],
  },
];

const COMMON_IMAGE = "/common.jpeg";

const SEED_ARTICLES: Article[] = SEEDS.map((seed) => ({
  ...seed,
  image: COMMON_IMAGE,
}));

const generated = (generatedRaw as unknown as Article[]).map((a) => ({
  ...a,
  image: COMMON_IMAGE,
}));

export const ARTICLES: Article[] = generated.length
  ? [...generated, ...SEED_ARTICLES.filter((a) => a.language === "zh")]
  : SEED_ARTICLES;
