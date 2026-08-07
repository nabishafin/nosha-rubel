import type { CategorySlug, LanguageCode } from "./types";
import { DEFAULT_LANGUAGE } from "./languages";

export interface Translation {
  brandTagline: string;
  nav: { home: string; search: string; subscribe: string; menu: string };
  categories: Record<CategorySlug, string>;
  sections: {
    breaking: string;
    trending: string;
    latest: string;
    categories: string;
    featured: string;
    byLanguage: string;
    mostRead: string;
    tags: string;
    related: string;
    newsletter: string;
    search: string;
  };
  actions: { readMore: string; viewAll: string; subscribe: string; search: string; readFull: string; backHome: string };
  hero: { breaking: string; subtitle: string };
  newsletter: { title: string; subtitle: string; placeholder: string; success: string };
  search: { title: string; placeholder: string; resultsFor: string; noResults: string; typePrompt: string };
  article: {
    publishedOn: string;
    source: string;
    related: string;
    views: string;
    by: string;
    minRead: string;
    inCategory: string;
    notFound: string;
    notFoundBody: string;
  };
  footer: {
    description: string;
    about: string;
    aboutText: string;
    contact: string;
    privacy: string;
    terms: string;
    quickLinks: string;
    categories: string;
    followUs: string;
    languages: string;
    rights: string;
  };
  meta: { homeTitle: string; homeDescription: string };
}

const en: Translation = {
  brandTagline: "Global news, in your language",
  nav: { home: "Home", search: "Search", subscribe: "Subscribe", menu: "Menu" },
  categories: {
    politics: "Politics",
    technology: "Technology",
    sports: "Sports",
    business: "Business",
    health: "Health",
    entertainment: "Entertainment",
    world: "World",
  },
  sections: {
    breaking: "Breaking News",
    trending: "Trending Now",
    latest: "Latest News",
    categories: "Browse by Category",
    featured: "Editor's Picks",
    byLanguage: "News by Language",
    mostRead: "Most Read",
    tags: "Popular Tags",
    related: "Related Articles",
    newsletter: "Newsletter",
    search: "Search Results",
  },
  actions: { readMore: "Read more", viewAll: "View all", subscribe: "Subscribe", search: "Search", readFull: "Read full story", backHome: "Back to home" },
  hero: { breaking: "Breaking", subtitle: "Stay informed with the stories shaping the world right now." },
  newsletter: {
    title: "Never miss a headline",
    subtitle: "Get the day's most important stories delivered to your inbox every morning.",
    placeholder: "Enter your email address",
    success: "Thanks for subscribing! Please check your inbox.",
  },
  search: {
    title: "Search",
    placeholder: "Search news by title or keyword…",
    resultsFor: "Results for",
    noResults: "No articles found. Try a different keyword.",
    typePrompt: "Start typing to search the newsroom.",
  },
  article: {
    publishedOn: "Published on",
    source: "Original source",
    related: "Related articles",
    views: "views",
    by: "By",
    minRead: "min read",
    inCategory: "in",
    notFound: "Article not found",
    notFoundBody: "The story you are looking for may have been moved or removed.",
  },
  footer: {
    description: "An independent, multilingual news aggregator bringing you trusted stories from around the globe.",
    about: "About",
    aboutText: "NewsHub curates and translates the world's most important stories so you can read what matters, in the language you prefer.",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    quickLinks: "Quick Links",
    categories: "Categories",
    followUs: "Follow us",
    languages: "Languages",
    rights: "All rights reserved.",
  },
  meta: {
    homeTitle: "Noosha Aubel",
    homeDescription: "Read breaking news, trending stories and the latest headlines across politics, technology, sports, business, health and more — in seven languages.",
  },
};

const de: Translation = {
  brandTagline: "Weltweite Nachrichten, in Ihrer Sprache",
  nav: { home: "Startseite", search: "Suche", subscribe: "Abonnieren", menu: "Menü" },
  categories: {
    politics: "Politik",
    technology: "Technologie",
    sports: "Sport",
    business: "Wirtschaft",
    health: "Gesundheit",
    entertainment: "Unterhaltung",
    world: "Welt",
  },
  sections: {
    breaking: "Eilmeldungen",
    trending: "Im Trend",
    latest: "Neueste Nachrichten",
    categories: "Nach Kategorie",
    featured: "Empfehlungen der Redaktion",
    byLanguage: "Nachrichten nach Sprache",
    mostRead: "Meistgelesen",
    tags: "Beliebte Schlagwörter",
    related: "Ähnliche Artikel",
    newsletter: "Newsletter",
    search: "Suchergebnisse",
  },
  actions: { readMore: "Weiterlesen", viewAll: "Alle ansehen", subscribe: "Abonnieren", search: "Suchen", readFull: "Ganzen Artikel lesen", backHome: "Zurück zur Startseite" },
  hero: { breaking: "Eilmeldung", subtitle: "Bleiben Sie informiert über die Geschichten, die die Welt gerade bewegen." },
  newsletter: {
    title: "Verpassen Sie keine Schlagzeile",
    subtitle: "Erhalten Sie jeden Morgen die wichtigsten Nachrichten des Tages in Ihr Postfach.",
    placeholder: "E-Mail-Adresse eingeben",
    success: "Danke für Ihr Abonnement! Bitte prüfen Sie Ihr Postfach.",
  },
  search: {
    title: "Suche",
    placeholder: "Nachrichten nach Titel oder Stichwort suchen…",
    resultsFor: "Ergebnisse für",
    noResults: "Keine Artikel gefunden. Versuchen Sie ein anderes Stichwort.",
    typePrompt: "Tippen Sie, um die Redaktion zu durchsuchen.",
  },
  article: {
    publishedOn: "Veröffentlicht am",
    source: "Originalquelle",
    related: "Ähnliche Artikel",
    views: "Aufrufe",
    by: "Von",
    minRead: "Min. Lesezeit",
    inCategory: "in",
    notFound: "Artikel nicht gefunden",
    notFoundBody: "Der gesuchte Artikel wurde möglicherweise verschoben oder entfernt.",
  },
  footer: {
    description: "Ein unabhängiger, mehrsprachiger Nachrichtenaggregator mit vertrauenswürdigen Geschichten aus aller Welt.",
    about: "Über uns",
    aboutText: "NewsHub kuratiert und übersetzt die wichtigsten Nachrichten der Welt, damit Sie das Wesentliche in Ihrer bevorzugten Sprache lesen können.",
    contact: "Kontakt",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    quickLinks: "Schnellzugriff",
    categories: "Kategorien",
    followUs: "Folgen Sie uns",
    languages: "Sprachen",
    rights: "Alle Rechte vorbehalten.",
  },
  meta: {
    homeTitle: "Noosha Aubel",
    homeDescription: "Lesen Sie Eilmeldungen, Trendthemen und die neuesten Schlagzeilen aus Politik, Technologie, Sport, Wirtschaft, Gesundheit und mehr — in sieben Sprachen.",
  },
};

const zh: Translation = {
  brandTagline: "全球新闻，以您的语言呈现",
  nav: { home: "首页", search: "搜索", subscribe: "订阅", menu: "菜单" },
  categories: {
    politics: "政治",
    technology: "科技",
    sports: "体育",
    business: "商业",
    health: "健康",
    entertainment: "娱乐",
    world: "国际",
  },
  sections: {
    breaking: "突发新闻",
    trending: "热门话题",
    latest: "最新新闻",
    categories: "按分类浏览",
    featured: "编辑精选",
    byLanguage: "按语言浏览新闻",
    mostRead: "阅读最多",
    tags: "热门标签",
    related: "相关文章",
    newsletter: "订阅通讯",
    search: "搜索结果",
  },
  actions: { readMore: "阅读更多", viewAll: "查看全部", subscribe: "订阅", search: "搜索", readFull: "阅读全文", backHome: "返回首页" },
  hero: { breaking: "突发", subtitle: "及时了解正在改变世界的重要报道。" },
  newsletter: {
    title: "不错过任何头条",
    subtitle: "每天清晨将当日最重要的新闻发送到您的邮箱。",
    placeholder: "请输入您的邮箱地址",
    success: "感谢订阅！请查收您的邮箱。",
  },
  search: {
    title: "搜索",
    placeholder: "按标题或关键词搜索新闻…",
    resultsFor: "搜索结果",
    noResults: "未找到文章，请尝试其他关键词。",
    typePrompt: "开始输入以搜索新闻。",
  },
  article: {
    publishedOn: "发布于",
    source: "原始来源",
    related: "相关文章",
    views: "次阅读",
    by: "作者",
    minRead: "分钟阅读",
    inCategory: "分类：",
    notFound: "未找到文章",
    notFoundBody: "您查找的文章可能已被移动或删除。",
  },
  footer: {
    description: "一个独立的多语言新闻聚合平台，为您带来来自世界各地的可信报道。",
    about: "关于我们",
    aboutText: "NewsHub 精选并翻译世界上最重要的新闻，让您以偏好的语言阅读要闻。",
    contact: "联系我们",
    privacy: "隐私政策",
    terms: "服务条款",
    quickLinks: "快速链接",
    categories: "分类",
    followUs: "关注我们",
    languages: "语言",
    rights: "版权所有。",
  },
  meta: {
    homeTitle: "Noosha Aubel",
    homeDescription: "阅读突发新闻、热门话题以及政治、科技、体育、商业、健康等领域的最新头条——支持七种语言。",
  },
};

const es: Translation = {
  brandTagline: "Noticias globales, en tu idioma",
  nav: { home: "Inicio", search: "Buscar", subscribe: "Suscribirse", menu: "Menú" },
  categories: {
    politics: "Política",
    technology: "Tecnología",
    sports: "Deportes",
    business: "Negocios",
    health: "Salud",
    entertainment: "Entretenimiento",
    world: "Mundo",
  },
  sections: {
    breaking: "Última hora",
    trending: "Tendencias",
    latest: "Últimas noticias",
    categories: "Explorar por categoría",
    featured: "Selección del editor",
    byLanguage: "Noticias por idioma",
    mostRead: "Lo más leído",
    tags: "Etiquetas populares",
    related: "Artículos relacionados",
    newsletter: "Boletín",
    search: "Resultados de búsqueda",
  },
  actions: { readMore: "Leer más", viewAll: "Ver todo", subscribe: "Suscribirse", search: "Buscar", readFull: "Leer la noticia completa", backHome: "Volver al inicio" },
  hero: { breaking: "Última hora", subtitle: "Mantente informado con las historias que están moldeando el mundo ahora." },
  newsletter: {
    title: "No te pierdas ningún titular",
    subtitle: "Recibe cada mañana las noticias más importantes del día en tu correo.",
    placeholder: "Introduce tu correo electrónico",
    success: "¡Gracias por suscribirte! Revisa tu bandeja de entrada.",
  },
  search: {
    title: "Buscar",
    placeholder: "Busca noticias por título o palabra clave…",
    resultsFor: "Resultados para",
    noResults: "No se encontraron artículos. Prueba otra palabra clave.",
    typePrompt: "Empieza a escribir para buscar en la redacción.",
  },
  article: {
    publishedOn: "Publicado el",
    source: "Fuente original",
    related: "Artículos relacionados",
    views: "vistas",
    by: "Por",
    minRead: "min de lectura",
    inCategory: "en",
    notFound: "Artículo no encontrado",
    notFoundBody: "La noticia que buscas puede haber sido movida o eliminada.",
  },
  footer: {
    description: "Un agregador de noticias independiente y multilingüe que te trae historias confiables de todo el mundo.",
    about: "Acerca de",
    aboutText: "NewsHub selecciona y traduce las noticias más importantes del mundo para que leas lo que importa en tu idioma preferido.",
    contact: "Contacto",
    privacy: "Política de privacidad",
    terms: "Términos del servicio",
    quickLinks: "Enlaces rápidos",
    categories: "Categorías",
    followUs: "Síguenos",
    languages: "Idiomas",
    rights: "Todos los derechos reservados.",
  },
  meta: {
    homeTitle: "Noosha Aubel",
    homeDescription: "Lee noticias de última hora, temas en tendencia y los últimos titulares de política, tecnología, deportes, negocios, salud y más, en siete idiomas.",
  },
};

const fr: Translation = {
  brandTagline: "L'actualité mondiale, dans votre langue",
  nav: { home: "Accueil", search: "Rechercher", subscribe: "S'abonner", menu: "Menu" },
  categories: {
    politics: "Politique",
    technology: "Technologie",
    sports: "Sport",
    business: "Économie",
    health: "Santé",
    entertainment: "Divertissement",
    world: "Monde",
  },
  sections: {
    breaking: "Dernière minute",
    trending: "Tendances",
    latest: "Dernières actualités",
    categories: "Parcourir par catégorie",
    featured: "Choix de la rédaction",
    byLanguage: "Actualités par langue",
    mostRead: "Les plus lus",
    tags: "Mots-clés populaires",
    related: "Articles similaires",
    newsletter: "Newsletter",
    search: "Résultats de recherche",
  },
  actions: { readMore: "Lire la suite", viewAll: "Voir tout", subscribe: "S'abonner", search: "Rechercher", readFull: "Lire l'article complet", backHome: "Retour à l'accueil" },
  hero: { breaking: "Urgent", subtitle: "Restez informé des histoires qui façonnent le monde en ce moment." },
  newsletter: {
    title: "Ne manquez aucun titre",
    subtitle: "Recevez chaque matin les actualités les plus importantes du jour dans votre boîte mail.",
    placeholder: "Saisissez votre adresse e-mail",
    success: "Merci de votre abonnement ! Vérifiez votre boîte de réception.",
  },
  search: {
    title: "Rechercher",
    placeholder: "Rechercher des actualités par titre ou mot-clé…",
    resultsFor: "Résultats pour",
    noResults: "Aucun article trouvé. Essayez un autre mot-clé.",
    typePrompt: "Commencez à taper pour parcourir la rédaction.",
  },
  article: {
    publishedOn: "Publié le",
    source: "Source originale",
    related: "Articles similaires",
    views: "vues",
    by: "Par",
    minRead: "min de lecture",
    inCategory: "en",
    notFound: "Article introuvable",
    notFoundBody: "L'article que vous recherchez a peut-être été déplacé ou supprimé.",
  },
  footer: {
    description: "Un agrégateur d'actualités indépendant et multilingue qui vous apporte des histoires fiables du monde entier.",
    about: "À propos",
    aboutText: "NewsHub sélectionne et traduit les actualités les plus importantes du monde pour que vous lisiez l'essentiel dans la langue de votre choix.",
    contact: "Contact",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    quickLinks: "Liens rapides",
    categories: "Catégories",
    followUs: "Suivez-nous",
    languages: "Langues",
    rights: "Tous droits réservés.",
  },
  meta: {
    homeTitle: "Noosha Aubel",
    homeDescription: "Lisez les dernières actualités, les sujets tendance et les derniers titres en politique, technologie, sport, économie, santé et plus, en sept langues.",
  },
};

const it: Translation = {
  brandTagline: "Notizie globali, nella tua lingua",
  nav: { home: "Home", search: "Cerca", subscribe: "Iscriviti", menu: "Menu" },
  categories: {
    politics: "Politica",
    technology: "Tecnologia",
    sports: "Sport",
    business: "Economia",
    health: "Salute",
    entertainment: "Intrattenimento",
    world: "Mondo",
  },
  sections: {
    breaking: "Ultim'ora",
    trending: "Di tendenza",
    latest: "Ultime notizie",
    categories: "Sfoglia per categoria",
    featured: "Scelti dalla redazione",
    byLanguage: "Notizie per lingua",
    mostRead: "I più letti",
    tags: "Tag popolari",
    related: "Articoli correlati",
    newsletter: "Newsletter",
    search: "Risultati della ricerca",
  },
  actions: { readMore: "Leggi di più", viewAll: "Vedi tutto", subscribe: "Iscriviti", search: "Cerca", readFull: "Leggi l'articolo completo", backHome: "Torna alla home" },
  hero: { breaking: "Ultim'ora", subtitle: "Resta informato sulle storie che stanno plasmando il mondo in questo momento." },
  newsletter: {
    title: "Non perderti nessun titolo",
    subtitle: "Ricevi ogni mattina le notizie più importanti del giorno nella tua casella di posta.",
    placeholder: "Inserisci il tuo indirizzo email",
    success: "Grazie per l'iscrizione! Controlla la tua casella di posta.",
  },
  search: {
    title: "Cerca",
    placeholder: "Cerca notizie per titolo o parola chiave…",
    resultsFor: "Risultati per",
    noResults: "Nessun articolo trovato. Prova con un'altra parola chiave.",
    typePrompt: "Inizia a digitare per cercare nella redazione.",
  },
  article: {
    publishedOn: "Pubblicato il",
    source: "Fonte originale",
    related: "Articoli correlati",
    views: "visualizzazioni",
    by: "Di",
    minRead: "min di lettura",
    inCategory: "in",
    notFound: "Articolo non trovato",
    notFoundBody: "L'articolo che stai cercando potrebbe essere stato spostato o rimosso.",
  },
  footer: {
    description: "Un aggregatore di notizie indipendente e multilingue che ti offre storie affidabili da tutto il mondo.",
    about: "Chi siamo",
    aboutText: "NewsHub seleziona e traduce le notizie più importanti del mondo così puoi leggere ciò che conta nella lingua che preferisci.",
    contact: "Contatti",
    privacy: "Informativa sulla privacy",
    terms: "Termini di servizio",
    quickLinks: "Link rapidi",
    categories: "Categorie",
    followUs: "Seguici",
    languages: "Lingue",
    rights: "Tutti i diritti riservati.",
  },
  meta: {
    homeTitle: "Noosha Aubel",
    homeDescription: "Leggi le ultime notizie, i temi di tendenza e i titoli più recenti di politica, tecnologia, sport, economia, salute e altro, in sette lingue.",
  },
};

const pt: Translation = {
  brandTagline: "Notícias globais, no seu idioma",
  nav: { home: "Início", search: "Pesquisar", subscribe: "Subscrever", menu: "Menu" },
  categories: {
    politics: "Política",
    technology: "Tecnologia",
    sports: "Desporto",
    business: "Negócios",
    health: "Saúde",
    entertainment: "Entretenimento",
    world: "Mundo",
  },
  sections: {
    breaking: "Última hora",
    trending: "Em alta",
    latest: "Últimas notícias",
    categories: "Explorar por categoria",
    featured: "Escolhas do editor",
    byLanguage: "Notícias por idioma",
    mostRead: "Mais lidas",
    tags: "Etiquetas populares",
    related: "Artigos relacionados",
    newsletter: "Newsletter",
    search: "Resultados da pesquisa",
  },
  actions: { readMore: "Ler mais", viewAll: "Ver tudo", subscribe: "Subscrever", search: "Pesquisar", readFull: "Ler notícia completa", backHome: "Voltar ao início" },
  hero: { breaking: "Urgente", subtitle: "Mantenha-se informado com as histórias que estão a moldar o mundo agora." },
  newsletter: {
    title: "Nunca perca uma manchete",
    subtitle: "Receba todas as manhãs as notícias mais importantes do dia na sua caixa de entrada.",
    placeholder: "Introduza o seu email",
    success: "Obrigado por subscrever! Verifique a sua caixa de entrada.",
  },
  search: {
    title: "Pesquisar",
    placeholder: "Pesquisar notícias por título ou palavra-chave…",
    resultsFor: "Resultados para",
    noResults: "Nenhum artigo encontrado. Tente outra palavra-chave.",
    typePrompt: "Comece a escrever para pesquisar na redação.",
  },
  article: {
    publishedOn: "Publicado em",
    source: "Fonte original",
    related: "Artigos relacionados",
    views: "visualizações",
    by: "Por",
    minRead: "min de leitura",
    inCategory: "em",
    notFound: "Artigo não encontrado",
    notFoundBody: "O artigo que procura pode ter sido movido ou removido.",
  },
  footer: {
    description: "Um agregador de notícias independente e multilingue que lhe traz histórias fiáveis de todo o mundo.",
    about: "Sobre",
    aboutText: "A NewsHub seleciona e traduz as notícias mais importantes do mundo para que leia o que interessa no idioma que preferir.",
    contact: "Contacto",
    privacy: "Política de privacidade",
    terms: "Termos de serviço",
    quickLinks: "Ligações rápidas",
    categories: "Categorias",
    followUs: "Siga-nos",
    languages: "Idiomas",
    rights: "Todos os direitos reservados.",
  },
  meta: {
    homeTitle: "Noosha Aubel",
    homeDescription: "Leia notícias de última hora, temas em alta e as últimas manchetes de política, tecnologia, desporto, negócios, saúde e mais, em sete idiomas.",
  },
};

// New article editions use the English interface dictionary until dedicated UI
// translations are supplied; article headlines and summaries remain in their
// original publisher language.
export const TRANSLATIONS: Record<LanguageCode, Translation> = {
  en,
  de,
  zh,
  es,
  fr,
  it,
  pt,
  hi: en,
  pl: en,
  cs: en,
  ko: en,
  sv: en,
  ar: en,
  ja: en,
  el: en,
  ru: en,
  uk: en,
};

export function getTranslation(lang: LanguageCode): Translation {
  return TRANSLATIONS[lang] ?? TRANSLATIONS[DEFAULT_LANGUAGE];
}
