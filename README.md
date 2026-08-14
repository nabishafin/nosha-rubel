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

## Production domain and indexing

Set `SITE_URL` in the production hosting environment to the one canonical,
indexable origin:

```bash
SITE_URL=https://noosha-aubel.com
```

Configure DNS/hosting so `https://noosha-aubel.com` returns the application and
redirect every other variant in one hop with HTTP 301:

- `http://noosha-aubel.com/*`
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
`https://noosha-aubel.com/sitemap.xml` under the canonical `.com` property and
request indexing for the German homepage and representative article pages.
