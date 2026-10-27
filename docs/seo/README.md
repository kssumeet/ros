# Republic of Sound Audio — month-1 SEO pack

Prepared by Arobuz on 28 Oct 2026 for rosaudio.com. Each section is its own file so the developer, writer and SEO lead can each jump straight to their part.

| § | File | For | Contents |
|---|---|---|---|
| — | `00-fact-sheet.md` | everyone | Canonical NAP, facts verified on the live site, claims that need sign-off, house rules |
| A | `A-on-page.md` | DEV, WRITER | Title, meta, H1, H2 outline, keywords, word count, alt text, CTA and OG for 13 pages, plus 28 service FAQs |
| B | `B-schema.md` | DEV | 17 validated JSON-LD blocks (LocalBusiness, Organization + WebSite, 6 × Service, 7 × FAQPage, 2 × Article, BreadcrumbList) and how to add them without duplicates |
| C | `C-technical-checklist.md` | DEV | Rank Math setup, index hygiene, redirects, images, speed, GA4/GTM key events (with a Calendly listener) |
| D | `D-images.md` | DEV, WRITER | Alt-text rules, file naming, 20 example alt texts, the live files to fix first |
| E | `E-google-business-profile.md` | SEO, ROS | Suspension risks, categories, description, services, products, attributes, 34-photo plan, 12 posts, Q&A status, review programme |
| F | `F-citations-nap.md` | SEO | Citation tracker, paste-ready NAP and descriptions, duplicate clean-up, 15 local link opportunities |
| G | `G-internal-linking.md` | DEV, WRITER | Source → anchor → target for every page, and the exact-match anchor budget |
| H | `H-content-plan.md` | WRITER | 3-month calendar, 10 content briefs, Phase 3 city-page template with a go-live gate |
| H1, H2 | `H1-guide-home-theatre-cost-india.md`, `H2-guide-room-size-dolby-atmos.md` | WRITER | The two month-1 guides in full, ready to paste |
| I | `I-tracking.md` + `I-keyword-baseline.csv` | SEO | Baseline sheet layout (4 tabs), 63-keyword tracker, targets, 15 suggested long-tails |
| J | `J-month1-plan.md` | everyone | Week-by-week tasks with owner and a "done when" for each |

**Regenerating:** sections A and B, the keyword CSV and the guide exports are generated from code, so edit the source rather than the Markdown:
- `python3 tools/seo/build_pack.py` checks every title (≤60), meta (≤155), FAQ length (40–80 words), one page per keyword, and JSON validity.
- `python3 tools/seo/export_guides.py` exports the guides from the prototype build.
- Page data lives in `tools/seo/onpage.py`. The prototype's `src/data.js` uses the same titles and metas.

## Where this pack differs from the brief, and why
1. **No SEO plugin is installed on the live site** (checked 28 Oct 2026; the site runs Astra, Elementor, two Elementor add-on packs and Click-to-Chat). The pack is written for **Rank Math (free)**, with Yoast notes.
2. **`areaServed` in the schema lists Ranchi only.** The brief lists Jamshedpur, Dhanbad and Bokaro, but also calls them Phase 3, "later". Putting them in the schema now would claim a service area ROS hasn't confirmed. Add them when the city pages go live.
3. **Approved metas that make unconfirmed claims** are used word for word, but each is flagged for ROS sign-off in `A-on-page.md`: the Atmos demo room, "Measured…by our team", climate/blinds control, laser projectors, seating on display, and "serviced by ROS". Three of them (Acoustics, Automation, Corporate AV) also don't end with an action, as the brief otherwise asks.
4. **63 keywords, not 60:** the map as written contains 63.
5. **Brand partners:** the live site shows **18** brand logos, not just Q Acoustics, ViewSonic and Artsound. Only confirmed partners appear in the pack.
6. **Google Q&A can't be seeded.** It was withdrawn in India from September 2024, and Google is replacing it with an AI "Ask" feature. The 10 Q&A pairs are repurposed in `E` §9.
7. **"Soundproofing service" is not confirmed as a Google category.** It is marked `[verify in GBP dashboard]`, with "Acoustical consultant" as the fallback.
8. **FAQ rich results** are now limited to government and health sites. FAQPage schema is kept as valid markup, without any promise of snippets.
9. **Cost-guide price bands** use ₹[X]–[Y] lakh placeholders. The prototype version still shows its labelled "illustrative" bands for design review; publish the placeholder version.
10. **Guide 2's URL is `/guides/room-size-dolby-atmos/`**, and the prototype was changed to match.

## What ROS still has to supply
Grouped by who needs it. Many other brackets in the pack are per-use fill-ins (a customer's first name, a staff name, a post date) that the team completes each time; they are not facts ROS has to provide.

**Business details (blocks week 1)**
- [ ] Showroom address: Main Road (website) or Kanke Road (directories)? Plus the PIN code and a nearby landmark
- [ ] Map pin and latitude/longitude
- [ ] Opening hours, including Sundays and holidays
- [ ] WhatsApp number to use (currently +91 85802 39007)
- [ ] The second number (+91 82109 55476): show it labelled, or drop it?
- [ ] Does ROS own rosdc.in?
- [ ] Social profile URLs (Instagram, Facebook, YouTube, LinkedIn) and the Google Business Profile URL / g.page review link
- [ ] Current Google rating and review count (for the baseline only, never for the site or schema)
- [ ] Logo file (SVG or PNG) and a 1200×630 sharing image

**Claims and scope**
- [ ] Demo room: is it a Dolby Atmos layout, and which? Which sources can visitors bring? Is parking available?
- [ ] Is in-room acoustic measurement done? Which parts of installation are in-house?
- [ ] Automation: supported control systems, apps and voice assistants; is climate and blinds control offered?
- [ ] Are laser projectors supplied? Which brands is ROS authorised for (Q Acoustics, ViewSonic, Artsound, Klipsch, BassPro, others)?
- [ ] Are recliners on display? Which seating ranges, upholstery options and lead times?
- [ ] Corporate: AMC terms, response times, certified VC room systems, cities served and travel charges
- [ ] Typical installation durations, and the warranty and after-sales terms
- [ ] Real budget-band edges, ₹[X]–[Y] lakh (cost guide, FAQs, service pages)

**Proof and content**
- [ ] 3+ completed projects with client permission: photos, room size, scope, equipment and a quotable result
- [ ] Which client logos (Jindal, Hotel Z3, SRS Cinemas, Credo World School Dhanbad and others) may be shown [with permission]
- [ ] Rights to the current website photos (several look like stock or manufacturer images), or a photoshoot (34-photo plan in E §7)
- [ ] Named guide author and their credentials (or publish under the organisation)
- [ ] Technical sign-off on both guides
- [ ] List of past customers for review requests
- [ ] Decision on the Ayurveda posts (410 or redirect)
- [ ] Privacy policy owner (needed for form consent under the DPDP Act 2023)

**Phase 3 only:** real completed work in Jamshedpur, Dhanbad or Bokaro before any city page goes live.

## The 10 most important tasks, in order
See the end of `J-month1-plan.md`. In short:
1. Agree one NAP.
2. Back up; install Rank Math, GSC, GA4/GTM and the key events.
3. Homepage title, meta and H1, plus the typo fixes.
4. Correct the Google Business Profile.
5. Remove or redirect the off-topic posts and the email-exposing author archive.
6. Build the service pages to spec, starting with the P1 pages.
7. ROS sign-off on the claims, brands and prices.
8. LocalBusiness and Service schema, validated.
9. Top citations, and review requests to every past customer.
10. Speed fixes, the two guides and the rank baseline.
