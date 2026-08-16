# Media asset register

The machine-readable source of truth is `app/data/media-governance.json`; CI verifies every first-party production image against its SHA-256 checksum and ensures every coverage thumbnail retains source, accessibility and language context. Unknown rights are recorded as blockers, never inferred as permission.

## `potsdam-civic-archive`

- Purpose: decorative homepage background and default social preview.
- Source: generated specifically for this project with OpenAI image generation on 2026-08-15.
- Creator credit: AI-generated project asset; no human photographer is claimed.
- Embedded text, logos, people, flags and publisher marks: none requested or observed.
- Alt treatment: empty because the image is decorative; all essential meaning is present in adjacent HTML.
- Transformations: resized and compressed into 640, 960 and 1440 pixel JPEG/WebP variants; separately cropped to 1200 x 630 for social previews.
- Publication status: technical provenance recorded; the site owner must approve final production use and retention policy.

## Site icons

- Purpose: browser and device identity.
- Technical integrity: both favicon files have checksum-pinned records.
- Rights status: original creator and license are absent from the repository; owner verification is required before final release approval.

## Third-party coverage thumbnails

- Purpose: contextual thumbnails for cited external coverage records.
- Source and publisher: stored on each coverage record and linked visibly on its detail page.
- Rights status: not established by this repository. Do not copy these files onto the first-party host without documented permission.
- Delivery status: they remain external source images and are not used as the homepage hero or default social card.
- Transformation status: no copying, cropping, optimization or first-party hosting is authorized by the repository. Each of the 46 records remains `verification-required` until documentary evidence is attached by the editorial/legal owner.

## Approval workflow

1. Verify owner, creator, source, license scope, required credit and permitted transformations.
2. Record the evidence location and decision without overwriting the historical source URL.
3. Obtain editorial/legal and site-owner approval for sensitive or third-party material.
4. Update the machine-readable record and checksum only as a deliberate reviewed change.
5. Re-run `npm run check:media-governance` and attach the result to the release evidence record.

## `9Zzm9aq5sV4` external video

- Source: YouTube Shorts; embedded through YouTube's privacy-enhanced domain.
- Content language: German (`de`), explicitly identified on every locale page.
- Caption status: German captions are requested from the source player but have not been independently verified.
- Transcript status: unavailable; the visible description is labeled as a contextual summary, not a transcript.
- Structured-data status: intentionally omitted because upload date, duration, owned thumbnail and a stable first-party watch page are not available in the repository.
