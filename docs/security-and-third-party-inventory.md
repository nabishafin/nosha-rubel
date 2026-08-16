# Security and third-party inventory

This repository baseline implements audit finding F58. It is an engineering control set, not legal advice or a complete penetration test.

## Response controls

HTML responses receive an enforced nonce-based Content Security Policy, referrer suppression, MIME sniffing protection, framing denial, opener/resource isolation, an unused-capability Permissions Policy, and legacy cross-domain policy denial. HSTS is emitted only when the application sees HTTPS directly or through `X-Forwarded-Proto`; preload and `includeSubDomains` are intentionally deferred until every controlled subdomain has been verified.

The CSP permits the current application dependencies:

- scripts: same-origin, nonce-authorized React Router hydration only;
- styles: same-origin and inline framework styles;
- fonts: same-origin/data, with Inter bundled and served by the application;
- images: same-origin, data URLs, and HTTPS publisher images;
- frames: `youtube-nocookie.com` only;
- connections, media, manifests, workers, forms, and base URLs: restricted to the minimum current behavior.

## Third-party requests

| Service/category | Trigger | Purpose | Current privacy control | Remaining owner action |
| --- | --- | --- | --- | --- |
| YouTube privacy-enhanced embed | Homepage, lazy-loaded near viewport | German source video | `youtube-nocookie.com`, lazy loading, strict-origin referrer policy, constrained iframe permissions | Confirm consent requirements and retention with privacy counsel |
| External publisher image hosts | Coverage cards/pages | Source-publication imagery | HTTPS only; CSP image-only access | Complete rights/provenance review and migrate authorized strategic assets |
| External source links | User activation only | Citation to original publication | `noreferrer noopener`; no preconnect | Monitor link health and apply the editorial archive policy |

No analytics, advertising, tracking pixel, service worker, authentication cookie, session cookie, or live newsletter submission is implemented in this repository. The newsletter component changes local UI state only and does not transmit an email address.

## Dependencies and operations

- React Router packages are aligned at 8.3.0 to remediate GHSA-qwww-vcr4-c8h2.
- The npm production and full dependency audits reported zero known vulnerabilities after remediation on 2026-08-16.
- Keep `package-lock.json` committed and run both `npm audit --omit=dev` and `npm audit` in CI.
- TLS/certificate coverage, HSTS subdomain readiness, backups, access controls, secrets, logs, incident response, retention, and jurisdiction-specific consent remain deployment/organizational responsibilities.
