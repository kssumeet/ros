# 02 — WordPress handover

All copy, metadata and schema are in `src/` and can be lifted directly. `src/data.js` is the single source of truth for business details, routes and metadata. Run `node tools/build.mjs` to get pre-rendered HTML for every page in `dist/`, which you can use as a pixel reference.

## 1. Sitemap and URL mapping

| # | Page | Production URL | Primary keyword | Primary CTA | WP template |
|---|---|---|---|---|---|
| 1 | Home | `/` | home theatre Ranchi | Book a free demo | `front-page` |
| 2 | Home theatre | `/home-theatre-ranchi/` | home theatre installation in Ranchi | Request a free site visit | `page-service` |
| 3 | Acoustics | `/acoustic-treatment-ranchi/` | acoustic treatment Ranchi | Request an acoustic assessment | `page-service` |
| 4 | Automation | `/home-automation-ranchi/` | home automation Ranchi | Book an automation demo | `page-service` |
| 5 | Projectors & audio gear | `/projectors-audio-gear/` | projector dealer in Ranchi | Enquire on WhatsApp | `page-service` + category grid |
| 6 | Cinema seating | `/cinema-seating/` | home theatre recliner Ranchi | Arrange a seating visit | `page-service` |
| 7 | Corporate AV | `/corporate-av-jharkhand/` | boardroom AV solutions Jharkhand | Request a proposal | `page-service` + corporate form |
| 8 | Projects | `/projects/` | home theatre projects Ranchi | Book a demo | CPT `project` archive |
| 9 | Book a demo | `/book-a-demo/` | home theatre demo Ranchi | Book a slot (Calendly) | `page-demo` |
| 10 | Guides | `/guides/` | home theatre cost in India | Read the cost guide | Posts page (category "Guides") |
| 11 | Contact | `/contact/` | Republic of Sound Ranchi | Book a free demo | `page-contact` |
| 10a | Guide | `/guides/home-theatre-cost-india/` | home theatre cost in India | Book a demo | `single` (post) |
| 10b | Guide | `/guides/room-size-dolby-atmos/` | Dolby Atmos room size | Book a demo | `single` (post) |
| — | Case study | `/projects/<slug>/` | per project | Book a demo | CPT `project` single (the prototype uses anchors `#case-1`–`#case-3`) |

**Permalinks:** set to `/%postname%/` and give the Guides category the base `guides` so guide posts resolve to `/guides/<slug>/` (or use a CPT `guide` with `rewrite => ['slug' => 'guides']`). Keep trailing slashes.

**Hash routes:** the single-file prototype's hash routes (`#/contact/`) are for previewing only. Production must use the real URLs above. The `dist/` build already uses them.

## 2. Redirects (301 unless stated)

| From (current) | To | Note |
|---|---|---|
| `/blog/` | `/guides/` | The current page is a single wellness article |
| `/panchakarma-treatment-blog/`, `/abhyanga-treatment-blog/`, `/shirodhara-treatment-blog/` | **ROS to decide.** Return 410 if they were published by mistake; 301 them to `/guides/` only if ROS wants to keep the traffic | The content is unrelated to AV |
| Yoga/meditation article (current `/blog/` content) | Optionally republish as `/guides/acoustics-for-wellness-spaces/` | Needs editing first |
| `/author/graphbeagmail-com/` | `/` (or `noindex`) | Exposes an email address |
| `rosaaudio.com/pages/contact` link inside the blog post | Fix the link to `/contact/` | Typo domain |

Check Search Console for any other indexed URLs before launch.

## 3. SEO metadata sheet

Titles and descriptions are in `src/data.js` → `ROUTES`. Titles are 45–58 characters and descriptions are 125–155 characters; the automated QA confirms both. Each page has one H1, a self-referencing canonical on `https://rosaudio.com` plus the path, and `og:*` and `twitter:*` tags. In Yoast or Rank Math, set the title, description and canonical per page to match.

The final titles, meta descriptions, H1s, keywords and Open Graph text for every page are in **`docs/seo/A-on-page.md`**, generated and length-checked from `tools/seo/onpage.py`. The 8 titles and metas Arobuz approved are used word for word, and the prototype's `src/data.js` matches them.

**Before launch:**
- Remove `<meta name="robots" content="noindex, nofollow">`; it is deliberate on the prototype.
- Replace the prototype `robots.txt` (which disallows everything) with the production version below.
- Supply a 1200×630 `og:image`.

Production `robots.txt`:
```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Sitemap: https://rosaudio.com/sitemap_index.xml
```

**What needs the server:** real URLs, HTTP status codes (404/410/301), XML sitemaps, per-URL `<head>` tags seen by crawlers without JavaScript, image optimisation, caching and form submission. The prototype pre-renders `<head>` per page and updates it again during client-side navigation, but search engines should be given the server-rendered WordPress output.

## 4. Structured data (JSON-LD)

Each page gets an `@graph` built by `schemaFor()` in `src/data.js`:

| Page type | Types |
|---|---|
| Home | `ElectronicsStore` (a LocalBusiness subtype) + `FAQPage` |
| Contact | `ElectronicsStore` + `BreadcrumbList` |
| Service pages | `Service` (provider → `#business`) + `BreadcrumbList` + business; plus `FAQPage` where a page has FAQs |
| Guides | `Article` (author = Organization until a named author is confirmed) + `BreadcrumbList`; plus `FAQPage` on the cost guide |
| Projects, Guides index | `BreadcrumbList` |

**Deliberately omitted until confirmed:**
- `streetAddress`, `postalCode`, `geo`
- `openingHoursSpecification`, `sameAs`
- `aggregateRating` and `review`. Never add review markup to the business's own pages to win stars.
- Named author credentials
- `Product` and `Offer`, so no stock or prices are implied

The choice of `ElectronicsStore` assumes the showroom sells equipment. If ROS considers itself mainly an installer, use `HomeAndConstructionBusiness` or plain `LocalBusiness` instead.

`FAQPage` is valid markup, but Google currently shows FAQ rich results only for authoritative government and health sites. Treat it as semantic markup and don't expect it to produce a snippet.

**Template to complete after confirmation:**
```json
{
  "@type": "ElectronicsStore", "@id": "https://rosaudio.com/#business",
  "name": "Republic of Sound Audio", "url": "https://rosaudio.com/",
  "telephone": "+91XXXXXXXXXX", "email": "connect@rosaudio.com", "foundingDate": "2011",
  "address": { "@type": "PostalAddress", "streetAddress": "[CONFIRM]", "addressLocality": "Ranchi",
    "addressRegion": "Jharkhand", "postalCode": "[CONFIRM]", "addressCountry": "IN" },
  "geo": { "@type": "GeoCoordinates", "latitude": "[FROM CONFIRMED PIN]", "longitude": "[FROM CONFIRMED PIN]" },
  "openingHoursSpecification": [ "[CONFIRM]" ],
  "areaServed": [ "Ranchi", "[CONFIRMED AREAS]" ],
  "sameAs": [ "[GOOGLE BUSINESS PROFILE / SOCIAL URLS]" ]
}
```
Validate with the Rich Results Test and the Schema.org validator after the build.

## 5. Design tokens

All tokens are CSS custom properties at the top of `src/styles.css`. Register them in `theme.json`.

| Token | Value | Use |
|---|---|---|
| `--ink` | #101112 | Dark sections, primary text on light |
| `--charcoal` | #1D1E20 | Alternate dark sections, trust strip |
| `--ivory` | #F4F0E8 | Light sections |
| `--paper` | #FBF9F5 | Cards and alternate light sections |
| `--brass` | #B99055 | Accents and buttons on dark (5.3:1 on ink) |
| `--brass-hi` | #CFA86C | Hover and labels on dark |
| `--brass-ink` | #7A5C2B | Brass text on light (≥4.5:1) |
| `--on-dark` / `--on-dark-muted` | #EFEAE1 / #A9A49B | Text on dark |
| `--on-light-muted` | #55524C | Secondary text on light |
| `--radius` | 4px | One radius across the whole system |
| Display font | Instrument Serif (400, italic) | H1 and H2, with metric-matched fallbacks |
| Body font | Manrope 400–800 | Everything else |

**Motion tokens:**

| Token | Value |
|---|---|
| `--dur-micro` | 180ms |
| `--dur-nav` | 280ms |
| `--dur-reveal` | 600ms |
| `--dur-hero` | 1000ms |
| `--stagger` | 80ms |
| `--ease-out` | cubic-bezier(.2,.7,.2,1) |
| `--ease-cine` | cubic-bezier(.16,1,.3,1) |

The fonts are self-hostable. In production, serve both as WOFF2 from the theme, preload the Instrument Serif regular file, and keep the `ROS Display Fallback` `@font-face` rules. They measured lab CLS at 0.002, compared with 0.08 without them.

## 6. Component inventory (to build as blocks or ACF patterns)

| Component | Source (`src/components.js` unless noted) | Notes |
|---|---|---|
| Header + Services disclosure menu | `header()` | Transparent → solid after 24px of scroll; Esc and ArrowDown support |
| Mobile drawer | `header()` | Focus trap, Esc to close, staggered items |
| Mobile action bar | `actionBar()` | Call / WhatsApp / Book demo, shown at ≤720px |
| Footer | `footer()` | Contact details come from the global options |
| Home hero | `pages-main.js` | CSS-only choreography; works without JS |
| Inner page hero | `pageHero()` | Breadcrumb, eyebrow, line-reveal H1, lede, CTAs, figure |
| Section heading | `secHead()` | Eyebrow + H2 with line reveal + optional intro |
| Trust strip | `pages-main.js` | Verified facts only |
| Service card | `pages-main.js` | Whole card is a link |
| Process steps | `.steps` | 4 columns → 2 → 1 |
| Demo list / timeline | `.demo-list` | |
| Project card | `projectCard()` | Links only when a destination exists |
| Filter chips + filterable grid | `.tabs` + `[data-filter-*]` | `aria-pressed`, live status text, empty state |
| Case-study template | `pages-more.js` | ACF fields listed in §8 |
| Budget card | `.budget` | Always carries an "Illustrative" label until confirmed |
| FAQ accordion | `faq()` | Button + region; open without JS |
| Comparison panel | `.compare` | |
| Data table | `.tbl` | Has a caption and scrolls horizontally on mobile |
| CTA band | `ctaBand()` | |
| Enquiry form / corporate form | `enquiryForm()` / `corporateForm()` | |
| Contact list + map placeholder | `contactBlock()` / `mapPlaceholder()` | |
| Article layout + sticky table of contents | `guides.js` | Scroll-spy highlights the current section |
| "To confirm" label | `tbc()` | Dev-only. Remove every instance before launch |

## 7. Image and asset requirements
- **Hero:** a photograph of the ROS demo room, at least 2400×1350, dark and low-key. Export AVIF and WebP at 640, 1024, 1600 and 2400 widths. Use `fetchpriority="high"` and **don't lazy-load it**.
- **Service pages:** one landscape image each, 16:10, at least 1600 wide. These should be real installations or the showroom.
- **Projects:** per case study, one 16:10 lead image plus two detail images and a floor plan if available. The client's written permission must be on file.
- **Seating:** photographs of the actual ranges ROS sells.
- **OG image:** 1200×630.
- **Logo:** SVG.
- **Brand logos:** SVG, only for confirmed partners, with each brand's usage guidelines.
- **Every image needs:** a descriptive alt text, `width` and `height` attributes, `loading="lazy"` and `decoding="async"` below the fold, and `sizes`/`srcset` set (WordPress does this automatically).
- **Hero:** the home hero no longer needs a photo, because it is generated in the browser. Inner pages still use photos.
- **Current photos:** the prototype uses 10 photos taken from the current rosaudio.com, stored in `src/img/` as WebP. They are low resolution, and some appear to be stock or manufacturer images. Confirm rights or replace every one before launch. The graded `.ph` frame (CSS filter, gradient and grain) gives new photography the same look.

## 8. Form specification

**Enquiry form** (used on home, contact and service pages):

| Field | Type | Required | Validation |
|---|---|---|---|
| name | text | ✓ | 2+ characters |
| phone | tel | ✓ | Strip spaces, `-`, `()`; strip a `+91`, `91` or `0` prefix; must match `^[6-9]\d{9}$` |
| room | select | ✓ | Living room / Dedicated room / Large room or hall / Not sure |
| budget | select | ✓ | Under ₹5 lakh / ₹5–10 lakh / ₹10–25 lakh / ₹25 lakh+ / Corporate project |
| location | text | ✓ | 2+ characters |
| message | textarea | — | max 1000 |
| contact | radio | ✓ | WhatsApp / Phone call / Email |
| consent | checkbox | ✓ | Links to the privacy policy (to be written) |
| website | honeypot | must be empty | Hidden from users and assistive technology |

**Corporate form:** name ✓, org ✓, phone ✓, email (validated if filled), type ✓, timeline, location ✓, rooms, message, consent ✓. The hidden `budget=Corporate project` field routes it to the commercial pipeline.

**Production requirements:**
- **Plugin:** Gravity Forms or Fluent Forms with server-side validation that mirrors the rules above.
- **Spam:** Cloudflare Turnstile or reCAPTCHA v3, plus the honeypot and rate limiting.
- **Delivery:** email to connect@rosaudio.com plus a CRM or Google Sheet. Also an optional WhatsApp Business API notification.
- **Hidden fields:** `source` (form id), page URL and UTM parameters.
- **Privacy:** Under India's Digital Personal Data Protection Act 2023, record purpose-limited consent, provide a privacy notice, define a retention period and offer a way to request deletion.
- **Success message:** show it only after the server confirms receipt. The prototype never claims delivery; it shows "Details checked — not sent".
- **WhatsApp prefill:** once ROS confirms the number, set `whatsapp.confirmed = true` in config and enable the prefilled message `?text=`.

## 9. Tracking specification

Every CTA has a `data-cta` attribute; the prototype has 111 unique values. Events are pushed to `window.dataLayer` (add `?debug` to the URL to log them):

| Event | Fired when | Parameters |
|---|---|---|
| `page_view` | Client-side route change | `page`, `title` |
| `cta_click` | Click on any `[data-cta]` | `cta`, `href`, `page` |
| `form_start` | First focus inside a form | `form` |
| `form_error` | Submit with errors | `form`, `fields` |
| `form_validated_prototype` | Valid submit in the prototype. **In production, replace with `generate_lead`, fired on server success** | `form`, `kind` |
| `faq_open` | An FAQ is expanded | `question` |
| `filter_change` | A filter chip is selected | `group`, `filter`, `results` |
| `slot_preview_select` | A slot is picked in the simulated picker | `day`, `slot` |

**Naming pattern:** `<action>-<location>`, for example `book-demo-header`, `whatsapp-hero`, `phone-mobile-bar`, `calendly-demo-book`.

**GA4 setup in GTM:**
- Mark `generate_lead`, `cta_click` where `cta` matches `^(phone|whatsapp|calendly)` and `book-demo-*` as key events.
- Calendly bookings: listen for Calendly's `message` events (`calendly.event_scheduled`) if the embed is used.

## 10a. Sound features (sound.js, fx.js, features.js)
Everything is synthesised live with the Web Audio API. There are no audio files to host, and **nothing plays without a tap or click**.

| Feature | Where | What it does |
|---|---|---|
| Spectrogram hero + Play the room | Home hero | A full-screen canvas landscape of frequency slices flowing toward the viewer, on a log scale from 20 Hz to 20 kHz. When idle it is a procedural spectrum that peaks under the pointer. "Play the room" plays an original 8-second cinematic swell (sub-bass rumble, detuned pad, impact), and the landscape then draws the real analyser data of that sound. The animation pauses off-screen; reduced motion gets a single still frame. |
| UI sound toggle | Header | Off by default and remembered in `localStorage`. When on, links and buttons play quiet pentatonic ticks on hover and a soft thump on click. |
| Speaker explorer | Home, home theatre | Top-down room with 5.1, 5.1.2 and 7.1.4 layouts placed at common Dolby angles. Tap a speaker to hear a panned pink-noise burst with a ripple; "Run calibration sweep" plays every speaker in turn. Overhead speakers use a brighter band. The page labels the sound as a stereo approximation. |
| Acoustic simulator | Home, acoustics | A slider from bare to treated room sets RT60 from 1.4 s down to 0.3 s. "Clap" plays a synthetic clap through a generated impulse response, and the decay is drawn live. The page labels it a simulation. |
| Screen-size calculator | Home theatre, Atmos guide | A distance slider gives 16:9 sizes for 30° and 40° viewing angles, using the same formula as the guide's table. |
| Room planner | Atmos guide | Length, width and height in, suggested layout plus screen range and a low-ceiling warning out. Uses the thresholds from the guide's table. |

**In WordPress:**
- Enqueue `sound.js` and `fx.js` site-wide, deferred.
- Register each tool as a block: a dynamic block whose `render.php` outputs the markup from `features.js`.
- Make sure no feature starts an `AudioContext` before the user interacts with the page.

## 10. Motion and interaction system

**Animations:**
- **Hero:** eyebrow, H1 lines, lede, CTAs and meta rise in sequence (100ms start, 80–90ms stagger, 700–900ms each) while the background settles from scale 1.06. This is pure CSS, so it starts at first paint and never waits for JavaScript.
- **Headings:** major H2s reveal line by line, sliding up inside an overflow mask. The lines are written into the markup, so there's no JS text-splitting and no layout shift.
- **Scroll reveals:** sections fade and rise 24px. Figures reveal with a `clip-path` wipe. Cards stagger by 80ms. Each element animates once.
- **Header:** goes from a gradient to a solid, blurred bar.
- **Menus:** the Services menu fades and drops; the mobile drawer fades with items staggered 40ms apart; the burger morphs into an X.
- **Cards:** hover lifts by 3px, project images scale to 1.04 over 900ms, and the arrow nudges.
- **Buttons:** arrow moves 4px on hover, the colour shifts over 180ms, and the button presses down 1px when clicked.
- **FAQs:** expand by animating `grid-template-rows` from 0fr to 1fr, so text never clips.
- **Filters:** results fade and rise with a 40ms stagger.
- **Page transitions:** the View Transitions API crossfades (160ms out, 320ms in), with a fade-in fallback. There is no artificial delay before the route changes.
- **Waveform:** a decorative SVG/CSS motif, `aria-hidden`, that animates only while on screen. It is labelled "not a live measurement".

**Added in the sound edition:**
- Custom cursor that grows over links and shows labels such as "Listen", "Explore" and "Drag". Mouse only.
- Magnetic primary buttons.
- Waveform scroll-progress line under the header.
- Spectrogram terrain hero (replaced the photo hero on 28 Oct 2026): up to 44 rows × 110 bins in perspective, each row filled to hide the rows behind it. It drives a CSS `--energy` glow and sleeps when off-screen or in a hidden tab.
- Rotating "Play the room" orb.
- Film grain overlay.
- Services list that shows a floating photo following the cursor.
- 15-year counter.
- Pinned horizontal process scroll labelled with frequencies (20 Hz to 20 kHz), driven by normal page scroll with no scroll hijacking.
- Full-bleed demo-room section.
- Draggable photo strip with arrow buttons.
- Brand marquee that pauses on hover or focus.
- Photo parallax inside frames, on screens wider than 900 px only.
- Outlined footer wordmark.

**Simplified on touch devices and mobile:**
- Hover lift, image zoom, the custom cursor, magnetic buttons and the floating service photo are turned off for `(hover: none)`.
- Below 900 px the process section stacks vertically instead of pinning, and parallax is off.
- The hero becomes a stacked layout with the image above the text.
- There is no parallax anywhere on the site.

**Reduced motion** (`prefers-reduced-motion`):
- All reveals and hero animations show their content immediately.
- The waveform does not loop.
- View transitions are turned off.
- Menus and accordions open almost instantly (1ms).
- Smooth scrolling is turned off.
- Grain, marquee, orb rotation and equaliser animations stop; the marquee wraps as static text.
- The canvas draws a single still frame.
- Speaker ripples are hidden.
- The sound features still work, because they are user-initiated.

**WordPress:**
- Port `styles.css` motion sections as they are.
- Port the reveal `IntersectionObserver` (about 20 lines from `app.js`).
- For page transitions between server-rendered pages, use cross-document View Transitions: `@view-transition { navigation: auto; }`. You don't need a SPA router.

## 11. Performance and accessibility checklist
- [ ] LCP ≤2.5s at p75 on mobile in CrUX/RUM. Prototype lab result: 1.70s on a local server with a 150ms RTT, 1.6Mbps connection and 4× CPU slowdown. That result is not a field measurement.
- [ ] CLS ≤0.1 (lab: 0.002 home, 0.019 guide). INP ≤200ms; measure in the field.
- [ ] Hero image is preloaded, not lazy-loaded, in AVIF/WebP with responsive sizes.
- [ ] Fonts are self-hosted WOFF2 with `font-display: swap`, keeping the metric fallbacks.
- [ ] No jQuery, sliders or animation libraries, and avoid loading Elementor's global assets. A lightweight block theme is recommended.
- [ ] Page caching plus a CDN, with Brotli compression.
- [ ] One H1 per page, logical heading order, and landmarks (header, nav, main, footer).
- [ ] Skip link, visible focus rings, keyboard-operable menus, accordions and filters.
- [ ] Form errors are linked to their fields with `aria-describedby`, there's a focused error summary, and the success state uses `role="status"`.
- [ ] Contrast is ≥4.5:1 for text. The prototype has zero axe-core violations across 13 pages (WCAG 2.1 AA plus best-practice rules).
- [ ] Touch targets are ≥44px.
- [ ] All motion respects `prefers-reduced-motion`.
- [ ] Replace every placeholder and "To confirm" label, then remove the prototype banner and `noindex`.
