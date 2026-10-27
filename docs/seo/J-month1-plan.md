# J — Month-1 action plan (week by week)

**Owners:** DEV = WordPress developer · WRITER = content writer · SEO = SEO lead · ROS = client.
**Rule:** nothing with a `[placeholder]` goes live. A task that is blocked on ROS stays blocked and is listed in the weekly report.

## Week 1 — Foundations and one version of the truth
| # | Task | Owner | Done when |
|---|---|---|---|
| 1.1 | Collect the NAP decisions: one address, the main number, the WhatsApp number, whether to show the second number, hours, map pin, and whether ROS owns rosdc.in | ROS (SEO chases) | The fact sheet is updated with no brackets left in the NAP block |
| 1.2 | Full backup, then install Rank Math (C-1.1, C-1.2) | DEV | Backup downloaded; Rank Math wizard complete |
| 1.3 | Search Console (domain property) and Bing; import into Bing | SEO | Both verified, owner access shared with Arobuz and ROS |
| 1.4 | GA4 + GTM installed and events built (C-6) | DEV | DebugView shows `click_call`, `click_whatsapp`, `generate_lead` and `demo_booked` firing from a test |
| 1.5 | Sitemap on, robots.txt set, sitemap submitted (C-1.8, C-1.9) | DEV/SEO | GSC shows the sitemap "Success" |
| 1.6 | Full crawl (Screaming Frog) plus PageSpeed mobile baseline for / and /contact/ | SEO | Crawl export and PSI screenshots saved to the baseline sheet |
| 1.7 | Homepage title, meta and H1 (A-on-page "Home"); fix typos, footer logo link, duplicate section (C-3) | DEV | View-source shows the new title and meta, and exactly 1 H1 |
| 1.8 | Claim or verify the Google Business Profile; correct NAP, categories and description (E sections 0–2). **Edit a few fields at a time, not everything at once.** | SEO + ROS | GBP shows the confirmed NAP and primary category "Home theater store" |
| 1.9 | Off-topic Ayurveda posts and the author archive: decision and action (C-2.1, C-2.2) | ROS decides, DEV acts | Pages return 410 or 301, and the author archive is gone |

## Week 2 — Structure, schema and images
| # | Task | Owner | Done when |
|---|---|---|---|
| 2.1 | Sign off the keyword map; resolve the open questions (H-content-plan conflicts list, the projects keyword) | SEO | `I-keyword-baseline.csv` is final, with every keyword assigned to one page |
| 2.2 | Pull volumes and difficulty from Keyword Planner into the CSV, including the 15 suggested long-tails | SEO | No empty volume cells |
| 2.3 | Build the 6 service pages, Projects, Book a demo, Guides and Contact to the A-on-page spec (copy from the prototype) | DEV + WRITER | All pages live with their spec'd title, meta, H1 and H2s; internal links as in G |
| 2.4 | Sign-off on the claims in the approved metas (Atmos demo, measurement, climate/blinds, laser projectors, seating on display, AMC) | ROS | Each claim confirmed or the copy changed; A-on-page notes cleared |
| 2.5 | Add LocalBusiness (site-wide) and Service schema via WPCode (B-1, B-2) | DEV | Rich Results Test shows LocalBusiness on / and Service on each service page, with no errors and no brackets |
| 2.6 | Rename, re-upload and alt-text every image; convert to WebP (D, C-4) | DEV + WRITER | Crawl shows 0 images with missing alt text and 0 "Untitled" filenames |
| 2.7 | Redirects: /blog/ → /guides/ and any old URLs found in GSC (C-2.6) | DEV | Each old URL 301s in one hop |

## Week 3 — Local presence and reviews
| # | Task | Owner | Done when |
|---|---|---|---|
| 3.1 | Fix Justdial, Sulekha, IndiaMART, Bing Places and Apple Business Connect to the canonical NAP (F tracker, priority 1 rows) | SEO | Tracker rows marked "Updated", with screenshots |
| 3.2 | Merge or remove duplicate listings that use Kanke Road or rosdc.in (F duplicate steps) | SEO + ROS | Duplicates closed or marked "pending review" with ticket numbers |
| 3.3 | GBP services, products and the first photos (E services, products, photo plan) | SEO + ROS (photos) | GBP shows all services and 10+ real photos |
| 3.4 | First 3 GBP posts (E posts, weeks 1–3) | SEO | 3 posts live |
| 3.5 | Review requests to **every** past customer ROS can contact (E review programme). No incentives, no filtering. | ROS sends; SEO supplies the messages and the link | Messages sent; count logged in the baseline sheet |
| 3.6 | Reply to every existing review using the templates | ROS or SEO | 100% of reviews have a reply |

## Week 4 — Speed, content and baseline
| # | Task | Owner | Done when |
|---|---|---|---|
| 4.1 | Mobile speed fixes: caching, Elementor features, unused add-on removed, local fonts, hero not lazy-loaded (C-5) | DEV | PSI mobile lab LCP < 2.5 s on / and one service page. Field data then needs about 28 days. |
| 4.2 | Publish Guide 1 and Guide 2 (H1, H2 files), with ROS's technical review and real price bands filled | WRITER + ROS | Both live; FAQ text matches the schema; Article schema validated |
| 4.3 | Request indexing in GSC for the home page, the 6 service pages and the 2 guides | SEO | GSC URL inspection shows "URL is on Google" or "Indexing requested" |
| 4.4 | Rank-tracking baseline (Ranchi location) for all keywords, plus a GBP grid scan | SEO | Day-0 columns filled in the CSV |
| 4.5 | Month-1 report to ROS (I, monthly report) | SEO | Report sent, with blocked items listed |

## Top 10 tasks, in order
1. **Agree one canonical NAP with ROS:** address, main and WhatsApp numbers, hours, map pin, and what happens to rosdc.in. Everything else depends on this.
2. **Back up the site and install Rank Math, Search Console, GA4 and GTM**, with call, WhatsApp, form and demo events marked as key events.
3. **Fix the homepage title, meta and single H1**, and the typos, duplicate section and footer link.
4. **Correct the Google Business Profile:** NAP, primary category "Home theater store", description and services. Change a few fields at a time.
5. **Resolve the off-topic Ayurveda posts** (410 or 301) and remove the author archive that exposes an email address.
6. **Build the 6 service pages to spec**, starting with home theatre, acoustics and corporate AV (P1 keywords), with the internal links from section G.
7. **Get ROS sign-off** on the claims inside the approved metas, plus partner brands and price bands.
8. **Add LocalBusiness and Service schema** and validate them, with no placeholders left in.
9. **Fix the top citations** (Justdial, Sulekha, IndiaMART, Bing, Apple) and start review requests to every past customer.
10. **Speed fixes**, then publish the two guides and record the rank baseline.
