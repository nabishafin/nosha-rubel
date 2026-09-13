import { Translated } from "~/components/Translated";
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_PRODUCT_LABEL } from "~/lib/site-identity";

export function EditorialStatementContent() {
  return <Translated>{(
    <article lang="en" className="space-y-7 text-sm leading-relaxed text-gray-700">
      <header className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">Editorial policy</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-950">
          Independent coverage, source attribution and corrections
        </h2>
        <p className="mt-3">
          <strong>{SITE_NAME}</strong> is presented as an {SITE_PRODUCT_LABEL.toLowerCase()}. It is not an official website of Noosha Aubel, the City of Potsdam or any publisher cited in the archive.
        </p>
      </header>

      <section aria-labelledby="purpose-heading" className="space-y-3">
        <h3 id="purpose-heading" className="text-lg font-bold text-gray-950">1. Purpose and content model</h3>
        <p>
          The site creates internal coverage records about publications concerning Noosha Aubel and municipal affairs in Potsdam. Each record identifies the external publisher, publication date and source URL, then adds an original summary, context and a verification note.
        </p>
        <p>
          External articles are not republished in full unless documentary permission exists. A link to the original publication is retained so readers can inspect the source and distinguish this dossier&apos;s editorial work from the publisher&apos;s reporting.
        </p>
      </section>

      <section aria-labelledby="standards-heading" className="space-y-3">
        <h3 id="standards-heading" className="text-lg font-bold text-gray-950">2. Attribution and evidentiary standards</h3>
        <ul className="list-disc space-y-2 pl-5">
          <li>Claims from an external publication are attributed to that publication.</li>
          <li>Allegations, opinions, pending proceedings and established facts are not presented as interchangeable.</li>
          <li>Repeated publication or translation does not by itself count as independent corroboration.</li>
          <li>Serious or contested claims should be checked against primary records and responses from the people or institutions named.</li>
          <li>Coverage involving children or medical information is summarized with additional restraint and data minimisation.</li>
        </ul>
      </section>

      <section aria-labelledby="documents-heading" className="space-y-3">
        <h3 id="documents-heading" className="text-lg font-bold text-gray-950">3. Wikipedia snapshots and other documents</h3>
        <p>
          The retained PDFs are third-party Wikipedia print snapshots used as secondary reference material. They are not official biographies, original publications of this site or proof that 26 independent editorial editions exist.
        </p>
        <p>
          PDF binaries are excluded from the XML sitemap and served with a search-engine instruction of <code>noindex, noarchive</code>. Their HTML context pages explain provenance and limitations without treating the files as the site&apos;s primary SEO content.
        </p>
      </section>

      <section aria-labelledby="corrections-heading" className="space-y-3">
        <h3 id="corrections-heading" className="text-lg font-bold text-gray-950">4. Corrections and right of reply</h3>
        <p>
          Material factual errors should be corrected promptly and transparently. A correction or reply request should identify the page URL, the disputed statement, the proposed correction and supporting evidence.
        </p>
        <p>
          Requests may be sent to{" "}
          <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="font-semibold text-blue-700 underline">
            {SITE_CONTACT_EMAIL}
          </a>.
        </p>
      </section>

      <section aria-labelledby="identity-heading" className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
        <h3 id="identity-heading" className="font-bold">5. Publisher identity and jurisdiction status</h3>
        <p className="mt-2">
          The repository does not contain sufficient evidence to confirm the supplied publisher identity, physical addresses, telephone number, responsible editor or applicable legal jurisdiction. Those fields require documentary and legal review before production sign-off.
        </p>
        <p className="mt-2">
          This policy therefore does not claim that an unrelated country&apos;s media or data-protection law governs the site. Applicable obligations depend on verified ownership, establishment, audience, processing and hosting facts.
        </p>
      </section>

      <section aria-labelledby="privacy-heading" className="space-y-3">
        <h3 id="privacy-heading" className="text-lg font-bold text-gray-950">6. Privacy and technical operation</h3>
        <p>
          The current application does not implement analytics, advertising, user accounts, tracking pixels or a working newsletter submission service. It embeds three videos through YouTube&apos;s privacy-enhanced domain and displays externally hosted publisher images; those third-party requests remain subject to privacy and rights review.
        </p>
      </section>
    </article>
  )}</Translated>;
}
