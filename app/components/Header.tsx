import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useI18n, localePath } from "~/lib/i18n-context";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Container } from "./Container";

export function Header() {
  const { lang } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-gray-200/80 bg-white/85 shadow-[0_10px_35px_rgba(15,23,42,0.10)] backdrop-blur-xl"
          : "border-white/70 bg-white/95 backdrop-blur"
      }`}
    >
      <Container>
        <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}>
          <Link to={localePath(lang)} className="group flex shrink-0 items-center gap-3">
           
            <span className="text-2xl font-black tracking-tight text-red-800">
              Noosha Aubel<span className="text-blue-600"></span>
            </span>
          </Link>

          <LanguageSwitcher />
        </div>
      </Container>
      <div
        className={`h-0.5 bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}
