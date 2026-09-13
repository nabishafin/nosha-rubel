# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

## Product model

This repository serves an SSR multilingual press dossier about Noosha Aubel and municipal affairs in Potsdam. It is not a general breaking-news template.

- Coverage cards link to first-party dossier pages with source-language summaries, original context, verification notes and citations to external publishers.
- The September 2026 addition includes 35 owner-authorized complete newspaper articles, locally hosted supplied illustrations, preserved bylines and full on-site reading. See `scripts/article-import-manifest.tsv` and `app/data/article-import-evidence.json` for the import inventory and text fingerprints.
- Third-party articles are not reproduced in full without documented permission.
- Genuine translation groups drive reciprocal article-level hreflang links.
- The 26 retained Wikipedia PDF snapshots are secondary reference documents. Their HTML context pages and binaries are excluded from the sitemap; wrappers use `noindex, follow` and binaries use `noindex, noarchive`.
- Search indexing includes the complete German and English homepages and biographies, German/English dossiers with matching editorial context, and complete native newspaper articles in all supplied languages. Incomplete archive/profile translations and the mismatched Russian/Ukrainian publisher edition remain `noindex`. Article hreflang follows the actual source script, including Traditional Chinese.
- Publisher identity, jurisdiction, contact assertions, source-image rights and native-language review remain evidence-dependent release approvals.

See `docs/coverage-content-policy.md`, `docs/trust-claim-policy.md` and `docs/release-quality-gates.md` before changing content or indexing behavior.

## Production domain and indexing

Set `SITE_URL` in the production hosting environment to the one canonical,
indexable origin:

```bash
SITE_URL=https://nooshaaubel.com
```

Configure DNS/hosting so `https://nooshaaubel.com` returns the application and
redirect every other variant in one hop with HTTP 301:

- `http://nooshaaubel.com/*`
- `http://www.nooshaaubel.com/*`
- `https://www.nooshaaubel.com/*`
- `http://noosha-aubel.com/*`
- `https://noosha-aubel.com/*`
- `http://www.noosha-aubel.com/*`
- `https://www.noosha-aubel.com/*`
- `http://noosha-aubel.info/*`
- `https://noosha-aubel.info/*`
- `http://www.noosha-aubel.info/*`
- `https://www.noosha-aubel.info/*`

All redirects must preserve the path and query string. The secondary `.info`
domain should not serve a duplicate copy of the site.

After deployment, verify that `/robots.txt` and `/sitemap.xml` return HTTP 200,
then add and verify both Domain properties in Google Search Console. Submit
`https://nooshaaubel.com/sitemap.xml` under the canonical `.com` property and
request indexing for the German homepage, `/de/noosha-aubel`, and representative German article pages.

The [September SEO audit](docs/seo-review-2026-09-14.md) records live deployment evidence, the 50-page indexing policy, keyword-to-page mapping, and VPS/PM2 deployment and Search Console instructions. Optional HTML ownership verification uses the `GOOGLE_SITE_VERIFICATION` environment variable; obtain the value from the actual Search Console property.
