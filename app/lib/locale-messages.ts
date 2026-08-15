import type { LanguageCode } from "./types";

interface LocaleUnavailableMessage {
  title: string;
  body: string;
  back: string;
  browse: string;
}

export const LOCALE_UNAVAILABLE_MESSAGES: Record<LanguageCode, LocaleUnavailableMessage> = {
  de: { title: "Übersetzung nicht verfügbar", body: "Diese Veröffentlichung ist in der gewählten Sprache noch nicht verfügbar.", back: "Zur ursprünglichen Veröffentlichung", browse: "Diese Sprachausgabe öffnen" },
  en: { title: "Translation unavailable", body: "This publication is not yet available in the selected language.", back: "Return to the original publication", browse: "Browse this language edition" },
  zh: { title: "暂无翻译", body: "此出版内容尚未提供所选语言版本。", back: "返回原始出版内容", browse: "浏览此语言版本" },
  es: { title: "Traducción no disponible", body: "Esta publicación aún no está disponible en el idioma seleccionado.", back: "Volver a la publicación original", browse: "Explorar esta edición" },
  fr: { title: "Traduction indisponible", body: "Cette publication n’est pas encore disponible dans la langue sélectionnée.", back: "Revenir à la publication originale", browse: "Parcourir cette édition" },
  it: { title: "Traduzione non disponibile", body: "Questa pubblicazione non è ancora disponibile nella lingua selezionata.", back: "Torna alla pubblicazione originale", browse: "Sfoglia questa edizione" },
  pt: { title: "Tradução indisponível", body: "Esta publicação ainda não está disponível no idioma selecionado.", back: "Voltar à publicação original", browse: "Explorar esta edição" },
  hi: { title: "अनुवाद उपलब्ध नहीं है", body: "यह प्रकाशन अभी चुनी गई भाषा में उपलब्ध नहीं है।", back: "मूल प्रकाशन पर लौटें", browse: "इस भाषा का संस्करण देखें" },
  pl: { title: "Tłumaczenie niedostępne", body: "Ta publikacja nie jest jeszcze dostępna w wybranym języku.", back: "Wróć do oryginalnej publikacji", browse: "Przeglądaj tę wersję językową" },
  cs: { title: "Překlad není k dispozici", body: "Tato publikace zatím není ve zvoleném jazyce dostupná.", back: "Zpět na původní publikaci", browse: "Procházet tuto jazykovou verzi" },
  ko: { title: "번역을 사용할 수 없습니다", body: "이 게시물은 아직 선택한 언어로 제공되지 않습니다.", back: "원본 게시물로 돌아가기", browse: "이 언어판 둘러보기" },
  sv: { title: "Översättning saknas", body: "Publikationen finns ännu inte på det valda språket.", back: "Gå tillbaka till originalet", browse: "Bläddra i denna språkversion" },
  ar: { title: "الترجمة غير متاحة", body: "هذا المنشور غير متاح بعد باللغة المحددة.", back: "العودة إلى المنشور الأصلي", browse: "تصفح هذه النسخة اللغوية" },
  ja: { title: "翻訳は利用できません", body: "この公開資料は、選択した言語ではまだ利用できません。", back: "元の公開資料に戻る", browse: "この言語版を見る" },
  el: { title: "Η μετάφραση δεν είναι διαθέσιμη", body: "Αυτή η δημοσίευση δεν είναι ακόμη διαθέσιμη στην επιλεγμένη γλώσσα.", back: "Επιστροφή στην αρχική δημοσίευση", browse: "Περιήγηση σε αυτήν τη γλώσσα" },
  ru: { title: "Перевод недоступен", body: "Эта публикация пока недоступна на выбранном языке.", back: "Вернуться к оригиналу", browse: "Открыть эту языковую версию" },
  uk: { title: "Переклад недоступний", body: "Ця публікація ще недоступна вибраною мовою.", back: "Повернутися до оригіналу", browse: "Переглянути цю мовну версію" },
};
