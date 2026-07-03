import { useState } from "react";
import { useI18n } from "~/lib/i18n-context";

/** Email capture. Simulated success state; wire the submit handler to your ESP. */
export function Newsletter() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="overflow-hidden rounded-xl bg-gray-900 px-6 py-10 text-center sm:px-12 sm:py-12">
      <div className="mx-auto max-w-xl">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{t.newsletter.title}</h2>
        <p className="mt-3 text-gray-300">{t.newsletter.subtitle}</p>

        {submitted ? (
          <p className="mt-7 rounded-md bg-emerald-500/15 px-5 py-3 font-medium text-emerald-300">
            ✓ {t.newsletter.success}
          </p>
        ) : (
          <form
            className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="email"
              required
              name="email"
              placeholder={t.newsletter.placeholder}
              aria-label={t.newsletter.placeholder}
              className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              {t.actions.subscribe}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
