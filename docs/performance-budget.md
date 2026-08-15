# Performance budget

These limits guard architecture regressions; they do not replace field Core Web Vitals or device-based laboratory testing.

- Localized homepage raw HTML: at most 160 KiB.
- Initial module-preload JavaScript for the homepage: at most 550 KiB uncompressed.
- Main compiled stylesheet: at most 75 KiB uncompressed.
- Localized landing route chunk: at most 50 KiB uncompressed.
- Hero WebP variants: 640px at most 50 KiB, 960px at most 90 KiB, 1440px at most 160 KiB.
- Social JPEG: at most 140 KiB.
- Exactly one image preload on the homepage; it must be the first-party responsive hero and use high fetch priority.
- No eager or high-priority third-party image request may appear in homepage HTML.
- Below-fold section rendering uses `content-visibility: auto`; lazy images and the video iframe remain lazy.

Production acceptance still requires mobile and desktop field data at the 75th percentile, plus repeatable Lighthouse or WebPageTest runs under documented network and CPU conditions.
