# Republic of Sound Audio — redesign prototype

This is a working prototype of a premium redesign of rosaudio.com, prepared by Arobuz for client review and for the WordPress rebuild.

## Getting started
Requires Node 18+ (and Python 3 for the SEO pack checks).

```bash
npm install            # dev tools only (Playwright, axe-core); the site itself has no dependencies
npm run build          # pre-render every page to dist/ and the single-file version to dist-single/
npm run serve          # http://localhost:4173/  (real URLs, trailing-slash redirects, real 404)
npm start              # build + serve
```

- **`dist/`** is the deployable static site: every page pre-rendered at its production path (`/home-theatre-ranchi/`, …). It works without JavaScript; the script adds transitions, tools and sound.
- **`dist-single/ros-prototype.html`** is one self-contained file (hash routes such as `#/contact/`) for opening offline or sending to the client.

## Checks
```bash
npm run qa:install     # once: download Chromium for Playwright
npm test               # build, start the server, run the QA suite (320 checks: links, metadata, schema, a11y, layout, interactions)
npm run seo:check      # validate the SEO pack (title/meta lengths, FAQ lengths, keyword ownership, JSON-LD) and re-export the guides
```
The same build and tests run on every push via GitHub Actions (`.github/workflows/build.yml`), which also uploads the built site as a downloadable artifact.

## Structure
```
src/
  data.js         business facts (single source of truth), routes, metadata, JSON-LD
  art.js          original SVG placeholder illustrations + icon set
  components.js   header, footer, mobile bar, forms, FAQ, CTA band, page hero
  pages-main.js   Home + 6 service pages
  pages-more.js   Projects, Book a demo, Guides index, Contact, 404
  guides.js       two complete guides
  features.js     markup for photos and interactive tools (speaker explorer, acoustic sim, calculators)
  sound.js        Web Audio engine: play-the-room swell, UI ticks, speaker bursts, clap + reverb
  fx.js           cursor, magnetic buttons, hero visualiser, parallax, pinned scroll, tool behaviour
  img/            10 photos from rosaudio.com (WebP) — usage rights to confirm
  app.js          router, transitions, menus, accordions, filters, validation, tracking
  styles.css      tokens, components, motion, responsive, reduced motion
tools/build.mjs   pre-renders dist/ (13 pages + 404, sitemap.xml, robots.txt) and dist-single/
tools/serve.mjs   static server with trailing-slash redirects and a 404
tools/qa.js       Playwright + axe-core QA suite; tools/ci-test.mjs runs it against a local server
tools/seo/        SEO pack source (onpage.py) and generators/checkers
docs/             audit, WordPress handover, client-confirmation list, QA report
docs/seo/         month-1 SEO pack (sections A–J), see docs/seo/README.md
```

## Ground rules followed
- **Labelled unknowns:** anything not verified on the live site is marked *To confirm* or shown as a `[placeholder]`. That covers the address, hours, WhatsApp number, service areas, prices, brands, projects and testimonials.
- **Honest form:** it validates, but never claims an enquiry was sent, because there is no backend. The slot picker is labelled as a simulation and hands off to the real Calendly page.
- **Search engines:** the prototype is `noindex`. See `docs/02-wordpress-handover.md` before going live.
