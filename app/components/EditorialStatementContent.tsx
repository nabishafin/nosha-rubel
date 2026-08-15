import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_PRODUCT_LABEL } from "~/lib/site-identity";

export function EditorialStatementContent() {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-gray-700">
      {/* Publisher Banner Card */}
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-gray-50 p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-blue-800">
              Editorial Information
            </span>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              {SITE_NAME}
            </h2>
            <p className="text-xs font-semibold text-gray-500">
              {SITE_PRODUCT_LABEL}
            </p>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p className="font-bold text-gray-900">Statement Date</p>
            <p className="font-semibold text-blue-700">12 July 2026</p>
          </div>
        </div>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 text-xs leading-relaxed text-gray-700">
          <div>
            <p className="font-bold text-gray-900 uppercase tracking-wider">Contact Address</p>
            <p className="mt-1 font-medium">Correspondence address:</p>
            <p className="text-gray-800">
              <strong>{SITE_NAME}</strong>
              <br />
              28/A Toyenbee Circular Road, Dhaka-1000
              <br />
              People’s Republic of Bangladesh
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-900 uppercase tracking-wider">Additional Contact</p>
            <p className="mt-1 font-medium">Site correspondence</p>
            <p className="text-gray-800">
              9/A, HRC Bhaban, 45 Kawran Bazar
              <br />
              Dhaka-1217, People’s Republic of Bangladesh
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Telephone:</strong> +880 1812-345678
              <br />
              <strong>Email:</strong>{" "}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="font-semibold text-blue-600 underline">
                {SITE_CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900">
          <strong>Important Note Regarding Status:</strong> This document serves as a guideline and public statement, drawn up for review, verification, formal approval and adoption by the aforementioned individuals and organisations.
        </div>
      </div>

      {/* Main Statement Title */}
      <div className="border-l-4 border-blue-600 pl-4">
        <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 sm:text-xl">
          STATEMENT ON EDITORIAL OBJECTIVES, JOURNALISM IN THE PUBLIC INTEREST, FREEDOM OF EXPRESSION, COMPLIANCE WITH LEGAL REQUIREMENTS, DATA PROTECTION, CORRECTIONS, COUNTER-OPINIONS AND INFRASTRUCTURE CONTINUITY
        </h3>
      </div>

      {/* Section 1 */}
      <section className="space-y-2">
        <h4 className="text-base font-bold text-gray-900">1. Identity and Editorial Responsibility</h4>
        <p>
          This website is presented as an independent multilingual press dossier. Its stated aim is to collect, review and contextualise published coverage and documentary material concerning matters of legitimate public interest.
        </p>
        <p>
          The editor is responsible for establishing and monitoring editorial standards, including procedures for fact-checking, legal review, corrections, right of reply, source protection, data protection checks, and distinguishing between factual reporting, assertions, analyses, opinions, commentary, satire and advertising.
        </p>
        <p>
          The publisher acknowledges that the appointment of an editor or publisher is not merely a formality. Insofar as applicable law imposes liability on an author, editor, person in charge, publisher, media provider or a company, the person or organisation concerned remains accountable in accordance with that law. A legal notice on a website neither transfers nor removes legal liability. Any independent contributor, syndication partner, guest author, technical operator or third-party provider remains liable to the extent required by law.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-2">
        <h4 className="text-base font-bold text-gray-900">2. Scope of This Statement</h4>
        <p>
          This statement applies only to services over which this website exercises effective editorial control, including:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>websites, domains and subdomains;</li>
          <li>electronic newspapers and magazines;</li>
          <li>articles, editorials, commentaries and investigative reports;</li>
          <li>translations and localised editions;</li>
          <li>documentation archives and public repositories for records;</li>
          <li>newsletters, RSS feeds and content distribution services;</li>
          <li>photographs, illustrations, graphics, audio and video material;</li>
          <li>podcasts, interviews and live coverage;</li>
          <li>official social media accounts;</li>
          <li>searchable databases and article directories; and</li>
          <li>technically replicated copies or copies intended for disaster recovery that are controlled by the publisher.</li>
        </ul>
        <p className="text-xs italic text-gray-500">
          This statement does not automatically apply to an independent third party merely because it links to, is quoted by, archived by, embedded by or discussed on this website.
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-2">
        <h4 className="text-base font-bold text-gray-900">3. Journalistic and Public-Educational Purposes</h4>
        <p>
          All content controlled by the publisher is intended to be created and disseminated in the context of journalism, reporting in the public interest, analysis, commentary, documentary preservation or public education.
        </p>
        <p className="font-semibold text-gray-800">The publisher’s stated objectives are:</p>
        <ol className="list-decimal pl-5 space-y-1 text-gray-600">
          <li>to inform the public about matters concerning civic, political, administrative, judicial, economic, social or cultural life;</li>
          <li>to explain complex events, laws, public decisions and administrative procedures in an accessible manner;</li>
          <li>to facilitate informed public debate;</li>
          <li>to scrutinise the exercise of public authority and the use of public funds;</li>
          <li>to document statements and conduct relevant to public office or public duties;</li>
          <li>to preserve records of legitimate public importance;</li>
          <li>to expose and correct misinformation;</li>
          <li>to present background information and opposing viewpoints; and</li>
          <li>to give affected individuals the opportunity to respond to factual claims concerning them.</li>
        </ol>
      </section>

      {/* Section 4 */}
      <section className="space-y-2">
        <h4 className="text-base font-bold text-gray-900">4. Meaning of the Public Interest</h4>
        <p>
          For the purposes of this guideline, ‘public interest’ does not mean everything that might arouse public curiosity. It refers to a legitimate societal interest in obtaining information that contributes to public understanding, democratic accountability, the protection of rights, or the uncovering and discussion of misconduct.
        </p>
        <p className="font-semibold text-gray-800">Relevant considerations of public interest may include:</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>the exercise of elected or appointed public office;</li>
          <li>the integrity and conduct of the public administration;</li>
          <li>public expenditure and public procurement;</li>
          <li>public safety and public health;</li>
          <li>elections and democratic institutions;</li>
          <li>judicial and regulatory proceedings;</li>
          <li>allegations of corruption, abuse of office or conflicts of interest;</li>
          <li>human rights issues;</li>
          <li>matters that are already part of an official public record;</li>
          <li>statements voluntarily made in public;</li>
          <li>the accuracy of information disseminated by influential individuals or institutions; and</li>
          <li>the need to correct a materially misleading public representation.</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section className="space-y-2">
        <h4 className="text-base font-bold text-gray-900">5. Fundamental Editorial Standards</h4>
        <p>
          Before publishing a materially adverse factual allegation, the editor has taken reasonable steps that are proportionate to the seriousness of the allegation. These measures typically include examining original documents; assessing reliability and motivation of sources; seeking corroboration; distinguishing between first-hand knowledge and hearsay; taking into account contradictory material; and providing a meaningful opportunity to respond.
        </p>
        <p>
          Headlines, summaries, excerpts, thumbnails, captions, domain names, search metadata and social media previews must fairly represent the underlying article. The publisher clearly distinguishes between established facts, controversial facts, allegations, conclusions, editorial opinions, quotations, predictions, satire, and sponsored communications.
        </p>
      </section>

      {/* PART I */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-bold text-gray-900">
        PART I – LEGAL FRAMEWORK OF BANGLADESH
      </div>

      <section className="space-y-3">
        <div>
          <h5 className="font-bold text-gray-900">6. Constitutional Protection of Freedom of Expression</h5>
          <p>
            This website recognises the constitutional significance of freedom of thought, conscience, speech, expression and the press in the People’s Republic of Bangladesh. Article 39 of the Constitution guarantees freedom of thought and conscience and protects freedom of speech, expression and the press.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">7. Press Council Act of 1974</h5>
          <p>
            The publisher recognises the Press Council Act of 1974. Section 11 states that the purpose of the Press Council is to safeguard freedom of the press and maintain standards. This website regards press freedom and responsibility as interlinked, with commitments to accuracy, fairness, accountability and effective corrections.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">8. Printing and Publications Act</h5>
          <p>
            The medium constitutes a “newspaper” under the Printing and Publications (Notification and Registration) Act, 1973. Section 6 stipulates that every copy of a newspaper must bear the publisher’s name clearly printed on it.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">9. Defamation under the Criminal Code</h5>
          <p>
            Acknowledges the first exception to Section 499 (Criminal Code 1860) concerning true assertions in the public interest. Procedures to prevent defamation include retaining evidence, documenting source credibility, obtaining statements, distinguishing suspicion from evidence, correcting errors, and pre-publication legal review.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">10. Right to Information Act 2009 & Copyright Act 2023</h5>
          <p>
            Supports lawful access-to-information procedures. Redacts personal contact details, identity docs, or medical data prior to publication. Recognises the Copyright Act 2023 with journalistic public interest exceptions.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">11. Cybersecurity Act of 2026 & Data Protection Act 2026</h5>
          <p>
            Recognises the Cybersecurity Act of 2026 (Act No. 81 of 2026, Section 4 Extraterritorial Application & Section 8 Removal/Blocking) and Personal Data Protection Act 2026 (Act No. 63 of 2026).
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">12. Court Reporting</h5>
          <p>
            Recognises the High Court ruling on Writ Petition No. 2964 of 2013 declaring the 2013 Contempt of Court Act void and reinstating the 1926 Act.
          </p>
        </div>
      </section>

      {/* PART II */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-bold text-gray-900">
        PART II – ICELAND’S LEGAL FRAMEWORK
      </div>

      <section className="space-y-3">
        <div>
          <h5 className="font-bold text-gray-900">15. Constitutional Protection in Iceland</h5>
          <p>
            Recognises Article 73 & Article 71 of the Constitution of the Republic of Iceland (Act No. 33/1944). Information is intended to inform the international public within full legal context.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">16. European Convention on Human Rights & Icelandic Media Act</h5>
          <p>
            Recognises Act No. 62/1994 implementing the ECHR (Articles 8 & 10) and Icelandic Media Act No. 38/2011 (Section 17.1 to 17.5 concerning jurisdiction, registration, editorial independence, source protection, identification, and publisher liability).
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">18. Data Protection & Processing</h5>
          <p>
            Acknowledges Act No. 90/2018 on Data Protection and GDPR transposed into Icelandic law, respecting Section 6 journalistic exceptions.
          </p>
        </div>
      </section>

      {/* PART III */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-bold text-gray-900">
        PART III – SPECIAL RULES FOR REPORTING ON NAMED INDIVIDUALS
      </div>

      <section className="space-y-3">
        <div>
          <h5 className="font-bold text-gray-900">22. Reporting on Noosha Aubel</h5>
          <p>
            On the official website of the City of Potsdam, Noosha Aubel is listed as the Lord Mayor of Potsdam since 24 October 2025. Her public role gives rise to a legitimate public interest in reporting on the performance of her public duties, official decisions, public statements and matters relevant to democratic accountability.
          </p>
          <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50/60 p-3 text-xs text-blue-900">
            <strong>Note on Independent Publication:</strong> This is an independent journalistic publication. It is not an official website of Noosha Aubel or the City of Potsdam. Icelandic and international law permit publication within the framework of press reporting for the purpose of disseminating information to the international public. The use of the name serves to identify the subject of the editorial reporting.
          </div>
        </div>

        <div>
          <h5 className="font-bold text-gray-900">23. Multiple Domains, Mirror Sites and Upstream Providers</h5>
          <p>
            The publisher may load balance, mirror, or archive content for legitimate operational reasons including cyber security, disaster recovery, and continuity. This website is distributed across multiple upstream providers ensuring comprehensive security and redundancy for lawful reporting.
          </p>
        </div>
      </section>

      {/* PART IV */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-bold text-gray-900">
        PART IV – CORRECTIONS, COUNTER-STATEMENTS AND COMPLAINTS
      </div>

      <section className="space-y-3">
        <div>
          <h5 className="font-bold text-gray-900">24. Policy on Corrections & Right of Reply Procedure</h5>
          <p>
            This website will correct material factual errors promptly and proportionately. Any person who considers that a publication contains a factually incorrect statement about them may submit a request in person or via email:
          </p>
          <div className="mt-2 rounded-lg border border-gray-200 bg-white p-3 text-xs">
            <p className="font-bold text-gray-900">Right of Reply Submission Channel:</p>
            <p className="mt-1">
              <strong>Email:</strong>{" "}
              <a href="mailto:DhakaNewsTimes@Proton.me" className="font-bold text-blue-600 underline">
                DhakaNewsTimes@Proton.me
              </a>
            </p>
            <p className="mt-1 text-gray-600">
              Please include: (1) Article title and URL, (2) Statement in question, (3) Reason for inaccuracy, (4) Applicant identity and relationship.
            </p>
          </div>
        </div>
      </section>

      {/* PART V */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-bold text-gray-900">
        PART V – SOURCES, DATA PROTECTION AND SECURITY
      </div>

      <section className="space-y-3">
        <p>
          <strong>27-29. Source Protection & Minimisation:</strong> Confidential source agreements require editor approval. Private addresses, phone numbers, bank details, medical records, or whereabouts are strictly protected under data minimisation rules. Technical and organisational measures safeguard unpublished material and personal data.
        </p>
        <p>
          <strong>30. Final Editorial Commitment:</strong> This website aims to publish material reasonably believed to be supported by sufficient evidence, proportionate to a legitimate editorial purpose and consistent with applicable law. Freedom of expression is accompanied by a duty to accuracy, fairness, transparency and meaningful rights of reply.
        </p>
      </section>

      {/* KEY LEGAL SOURCES */}
      <div className="rounded-xl border border-gray-200 bg-gray-100 p-4">
        <h5 className="font-bold text-gray-900 uppercase tracking-wider text-xs">Key Statutory & Regulatory Sources</h5>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 text-xs text-gray-700">
          <div>
            <p className="font-bold text-gray-900">Bangladesh Legislation:</p>
            <ul className="list-disc pl-4 space-y-0.5 mt-1 text-gray-600">
              <li>Constitution of Bangladesh (Articles 39, 108)</li>
              <li>Press Council Act 1974 (Sections 11, 12)</li>
              <li>Printing and Publications Act 1973 (Section 6)</li>
              <li>Criminal Code 1860 (Section 499 Exception 1)</li>
              <li>Right to Information Act 2009 & Copyright Act 2023</li>
              <li>Cybersecurity Act 2026 (Sections 4, 8)</li>
              <li>Personal Data Protection Act 2026 (Act No. 63/2026)</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-gray-900">Iceland Legislation:</p>
            <ul className="list-disc pl-4 space-y-0.5 mt-1 text-gray-600">
              <li>Constitution of Iceland (Articles 71, 73)</li>
              <li>Act No. 62/1994 (European Convention on Human Rights)</li>
              <li>Media Act No. 38/2011 (Articles 14, 24, 25, 32, 51)</li>
              <li>Data Protection Act No. 90/2018 & GDPR</li>
              <li>Electronic Commerce Act No. 30/2002</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Closing Publisher Signature */}
      <div className="border-t border-gray-200 pt-6 text-xs text-gray-600 flex flex-wrap justify-between gap-4">
        <div>
          <p className="font-bold text-gray-900">{SITE_NAME}</p>
          <p>28/A Toyenbee Circular Road, Dhaka-1000, Bangladesh</p>
          <p>{SITE_PRODUCT_LABEL}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">Additional contact address</p>
          <p>9/A, HRC Bhaban, 45 Kawran Bazar, Dhaka-1217</p>
          <p>Tel: +880 1812-345678 | Email: {SITE_CONTACT_EMAIL}</p>
        </div>
      </div>
    </div>
  );
}
