# C — Technical SEO checklist (WordPress + Astra + Elementor)

**State of the site on 28 Oct 2026:** WordPress 6.6.10, the Astra theme, Elementor 4.1.1, Jeg Elementor Kit, Royal Elementor Addons and Click-to-Chat. **No SEO plugin is installed.** Steps are written for **Rank Math (free)**; Yoast equivalents are in brackets. Tick each item when done. **Owner:** DEV = developer, SEO = SEO lead, ROS = client.

## 1. Foundations
- [ ] **1.1 Back up first (DEV).** Take a full backup: UpdraftPlus or the host's snapshot. Do every step below on staging first if the host offers one.
- [ ] **1.2 Install Rank Math (DEV).** Plugins → Add New → "Rank Math SEO" → run the Setup Wizard in *Advanced* mode. Choose *Company*, name "Republic of Sound Audio", upload the logo. Skip importing from other plugins (none exist).
- [ ] **1.3 Site title and tagline (DEV).** Settings → General.
  - Site Title: `Republic of Sound Audio`.
  - Tagline: `Home theatre, Hi-Fi and acoustics in Ranchi`.
  - Replace the current all-caps "REPUBLIC OF SOUND AUDIO – we sound sensible".
- [ ] **1.4 Homepage SEO (DEV).** Rank Math → Titles & Meta → Homepage (or edit the front page itself). Use the title and meta from A-on-page.md exactly.
- [ ] **1.5 Permalinks (DEV).** Settings → Permalinks → *Post name* (`/%postname%/`).
  - **Guides:** create a "Guides" category and set Rank Math → General → Links → *Strip category base* OFF.
  - Then either use a custom permalink per guide post (Rank Math lets you edit the slug, but the `/guides/` prefix needs the structure) **or**, simpler, publish guides as **child pages of the Guides page**, which gives `/guides/home-theatre-cost-india/` natively.
  - **Recommended:** child pages, because it is one template and gives clean URLs.
- [ ] **1.6 HTTPS and www (DEV).**
  - Settings → General: both URLs must be `https://rosaudio.com` (no www).
  - Test `http://rosaudio.com`, `http://www.rosaudio.com` and `https://www.rosaudio.com` from a mobile network. Each must 301 to `https://rosaudio.com/` in a single hop.
  - `www` already redirects. Plain HTTP could not be verified from our network (the ISP intercepted it), so check it.
  - If a redirect is missing, add one in `.htaccess` or the host panel.
- [ ] **1.7 Search Console and Bing (SEO).**
  - Add a **Domain property** for `rosaudio.com` in Google Search Console, verified by DNS TXT. Connect Rank Math → General → Webmaster Tools if you use the HTML-tag method.
  - Import it into Bing Webmaster Tools via *Import from GSC*.
- [ ] **1.8 Sitemaps (DEV/SEO).**
  - Rank Math → Sitemap Settings → enable. The sitemap index is `https://rosaudio.com/sitemap_index.xml`.
  - **Include:** Pages, Posts (if used), the Guides category.
  - **Exclude:** tags, author archives, attachments, the Elementor library (`elementor_library`), Astra Sites templates.
  - Submit the index in GSC → Sitemaps and in Bing.
  - WordPress's own `/wp-sitemap.xml` is switched off automatically when Rank Math's sitemap is on. Check that it 404s or redirects.
- [ ] **1.9 robots.txt (DEV).** Rank Math → General → Edit robots.txt:
  ```
  User-agent: *
  Disallow: /wp-admin/
  Allow: /wp-admin/admin-ajax.php
  Disallow: /?s=
  Disallow: /search/
  Sitemap: https://rosaudio.com/sitemap_index.xml
  ```
- [ ] **1.10 Canonicals (DEV).** Rank Math adds a self-referencing canonical to every page. Spot-check 5 pages with *View source*: exactly one `<link rel="canonical">`, pointing to the https, non-www, trailing-slash URL.

## 2. Index hygiene
- [ ] **2.1 Noindex thin archives (DEV).** Rank Math → Titles & Meta: set *Author Archives*, *Date Archives*, *Tags* and *Search results* to No Index (author archives can be disabled entirely). The archive `/author/graphbeagmail-com/` exposes an email address: disable it.
- [ ] **2.2 Off-topic posts (ROS decides, DEV does).** `/panchakarma-treatment-blog/`, `/abhyanga-treatment-blog/` and `/shirodhara-treatment-blog/` are Ayurveda posts on an AV site. If they were published by mistake: trash them and serve **410** (Rank Math → Redirections → *410 Content Deleted*). Otherwise, 301 them to `/guides/`.
- [ ] **2.3 Old blog page (DEV).** 301 `/blog/` → `/guides/`. Fix the typo link `rosaaudio.com/pages/contact` inside the yoga article, or remove the article.
- [ ] **2.4 Calendly thank-you (DEV).** If Calendly redirects to a page on rosaudio.com after booking (for example `/thank-you/`), set that page to **noindex** and exclude it from the sitemap.
- [ ] **2.5 rosdc.in (ROS → DEV).** The domain has no DNS record today (checked 28 Oct 2026).
  - If ROS owns it, add DNS at the registrar and a **301 from every path** to `https://rosaudio.com/` (a host-level redirect, or Cloudflare's free redirect rules).
  - If ROS doesn't own it, remove it from every directory (see F-citations-nap.md).
  - Never run two live sites.
- [ ] **2.6 Redirect map for the rebuild (DEV).** Rank Math → Redirections → Add:

  | From | To | Type |
  |---|---|---|
  | /blog/ | /guides/ | 301 |
  | /contact/ | /contact/ (unchanged) | — |
  | /panchakarma-treatment-blog/ (and the other two) | 410 or /guides/ | 410/301 |
  | /author/graphbeagmail-com/ | / | 301 |
  | any old Elementor template URLs found in the GSC *Pages* report | the nearest new page | 301 |

- [ ] **2.7 404 handling (DEV).** Build a useful 404 page with links to services, a demo CTA and the phone number. Enable Rank Math → 404 Monitor (simple mode) and review it weekly for the first month.

## 3. On-page fixes on the current site (week 1, before the new pages exist)
- [ ] **3.1** Exactly one H1 per page. On the homepage, convert the hero text to an H1 Heading widget. The existing 11 all-caps H2s become sentence-case H2/H3.
- [ ] **3.2** Delete the duplicated "The Widest Range of The Finest Brands" block.
- [ ] **3.3** Fix the typos: "Company Ofice Address" → "Office address"; "AUDIO GEARS" → "Audio gear"; "SEATINGS" → "Seating". Standardise on "theatre" (not "theater").
- [ ] **3.4** Footer logo link `#` → `https://rosaudio.com/`.
- [ ] **3.5** Add the Open Graph image: Rank Math → Titles & Meta → Global Meta → *OpenGraph Thumbnail*. Use a 1200×630 demo-room photo.

## 4. Images
- [ ] **4.1 Rename (DEV).** Filenames such as `Untitled-1.jpg`, `23.jpg` and `fdfdgfdgdfgb.jpg` can't be renamed in place safely. Re-upload each image with a descriptive filename (see D-images.md), swap it into Elementor and delete the old file. Use the *Phoenix Media Rename* plugin only if you understand that it rewrites references.
- [ ] **4.2 Alt text (DEV/writer).** Fill alt text for the ~63 images that have none, following the D-images.md rules. Purely decorative images get `alt=""`.
- [ ] **4.3 Convert to WebP (DEV).** Use *Converter for Media* or *EWWW Image Optimizer* (WebP, lossy ~80). Resize originals to a maximum of 2000 px on the long edge.
- [ ] **4.4 Lazy loading (DEV).** WordPress lazy-loads by default. **Exclude the hero/LCP image:** in Elementor give it `loading="eager"` and `fetchpriority="high"`. In WP Rocket use *Exclude images from lazy load*; in LiteSpeed use *Lazy load exclude*.
- [ ] **4.5 Dimensions (DEV).** Every `<img>` must output `width` and `height` attributes (Elementor does for Image widgets; check background images separately).

## 5. Speed and Core Web Vitals
Targets, measured as the 75th percentile of field data (CrUX/Search Console), **not** a single Lighthouse run:

| Metric | Target |
|---|---|
| LCP (mobile) | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |

Mobile speed for the live site has **not** been measured yet. Record a baseline on day 0 in PageSpeed Insights (field and lab) for `/` and `/contact/`, and paste the screenshots into the baseline sheet.
- [ ] **5.1 Caching (DEV).** If the host is LiteSpeed, use *LiteSpeed Cache*; otherwise *WP Rocket* (paid) or *W3 Total Cache*. Turn on page cache, browser cache, GZIP/Brotli and *Remove unused CSS*, testing Elementor pages afterwards.
- [ ] **5.2 Trim Elementor bloat (DEV).**
  - Elementor → Settings → Features: *Improved Asset Loading*, *Optimized DOM Output* and *Inline Font Icons* ON. Turn off *Font Awesome 4 support* if not needed.
  - Deactivate whichever of **Jeg Elementor Kit** and **Royal Elementor Addons** is unused; two widget packs load two sets of assets.
  - Remove *Astra Sites* (the starter-template importer isn't needed after setup).
- [ ] **5.3 Fonts (DEV).** Host Google Fonts locally (Elementor → Settings → Advanced → *Load Google Fonts locally*, or OMGF). Limit to 2 families and 4 weights.
- [ ] **5.4 Third-party scripts (DEV).** Load the Click-to-Chat widget script deferred. Embed Calendly only on `/book-a-demo/`; elsewhere use a link, not the inline widget.
- [ ] **5.5 Re-test (SEO).** Run PageSpeed Insights mobile after each change. In GSC → Core Web Vitals, field data takes about 28 days to reflect changes.

## 6. Analytics: GA4 with key events
- [ ] **6.1 Install (SEO/DEV).**
  - Create a GA4 property ("Republic of Sound Audio", India, INR).
  - Install **Google Tag Manager** via *GTM4WP* or Site Kit, then add the GA4 *Google Tag* in GTM. Don't hard-code gtag and GTM together.
  - Link GA4 ↔ Search Console (Admin → Product links).
- [ ] **6.2 Events (DEV in GTM).** Create these triggers and GA4 event tags:

  | Event name | Trigger | Parameters |
  |---|---|---|
  | `click_call` | Click – Just Links, *Click URL* starts with `tel:` | `link_url`, `page_location`, `cta_position` (from `data-cta` if present) |
  | `click_whatsapp` | Click – Just Links, *Click URL* contains `wa.me` or `api.whatsapp.com` | same |
  | `click_email` | Click URL starts with `mailto:` | same |
  | `generate_lead` | Form submit **success** (Elementor Forms: Custom Event trigger on `submit_success`; Fluent/Gravity: their success event) | `form_id`, `room_type`, `budget_band` (no personal data) |
  | `book_demo_click` | Click URL contains `calendly.com/connect-rosaudio` | same |
  | `demo_booked` | Custom Event on Calendly's postMessage `calendly.event_scheduled` (needs the inline Calendly widget on `/book-a-demo/` plus a small listener tag) | `event_type` |

  The Calendly listener (GTM → Custom HTML, fires on `/book-a-demo/`):
  ```html
  <script>
  window.addEventListener('message', function (e) {
    if (e.origin === 'https://calendly.com' && e.data && e.data.event === 'calendly.event_scheduled') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'demo_booked', event_type: 'calendly_30min' });
    }
  });
  </script>
  ```
- [ ] **6.3 Mark key events (SEO).** GA4 → Admin → Events (or *Key events*) → toggle **Mark as key event** for `generate_lead`, `demo_booked`, `click_call` and `click_whatsapp`. Don't mark `book_demo_click`, because a click is not a booking.
- [ ] **6.4 Test (SEO).** Use GTM *Preview* plus GA4 *DebugView*: click each CTA type on mobile and desktop and submit a test form.
- [ ] **6.5 Consent (SEO/ROS).** Add a privacy policy page covering analytics and form data (DPDP Act 2023). If ROS wants a cookie banner, use Google Consent Mode v2 with a CMP.
- [ ] **6.6 GBP tracking (SEO).** Set the Business Profile website URL to `https://rosaudio.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`, so GBP clicks are separated from organic search in GA4. Calls and directions are tracked in the GBP Performance report.

## 7. Final pre-launch checks (SEO)
- [ ] One H1 per page, and titles and metas match A-on-page.md (crawl with Screaming Frog; the free version covers up to 500 URLs).
- [ ] No `[placeholder]` text anywhere on the live site or in the schema: search the page source for `[`.
- [ ] Schema passes the Rich Results Test on `/`, one service page, one guide and `/contact/`.
- [ ] Sitemap submitted, robots.txt correct, no accidental `noindex` on live pages (Rank Math → *Advanced* tab on each page).
- [ ] NAP in the header, footer, contact page and schema is identical to the fact sheet.
