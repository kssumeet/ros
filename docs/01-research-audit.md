# 01 — Research audit: rosaudio.com

**Inspected:** 27 October 2026. I fetched the HTML of `/`, `/contact/` and `/blog/` and checked `robots.txt`, `wp-sitemap.xml` and the Calendly URL with HTTP requests. I did not open the live site in an interactive browser session, so any behaviour that depends on JavaScript (sliders, popups, how the WhatsApp widget looks) is inferred from the markup and has not been observed.

Labels used below:
- **Verified**: seen in the live HTML.
- **Reported**: comes from the brief or a third party and has not been verified.
- **Proposal**: a design recommendation.

## 1. Verified facts

| Item | Value | Source |
|---|---|---|
| Business name | REPUBLIC OF SOUND AUDIO | Site title and footer |
| Tagline | "we sound sensible" | `<title>` |
| Established | 2011, Ranchi, Jharkhand | Home page copy |
| Main phone | +91 8580 239 007 | Contact page and site-wide header button |
| Secondary phone | +91 8210 955 476 | One `tel:` link, home page only |
| WhatsApp | Click-to-Chat plugin configured with `918580239007` | Plugin config in the home page HTML |
| Email | connect@rosaudio.com | Contact page |
| Address | Beside Javed Habib Salon, PP Compound, Main Road, Ranchi, Jharkhand 834001 | Contact page |
| Opening hours | Not published | — |
| Booking | https://calendly.com/connect-rosaudio/30min (HTTP 200; page title "30 Minute Meeting - RosAudio") | Header button and CTAs |
| Social links | None published | — |
| Platform | WordPress 6.6.10 + Elementor 4.1.1 | `generator` meta |
| Site design credit | Graphbea | Footer |

**Reported, not verified:** a directory listing at Satya Enclave, Lake Avenue, Kanke Road, Ranchi 834008, with a rating of 4.6 from 8 reviews. This comes from the brief. My web search did not find that listing, so I could neither confirm nor rule it out.

**Calendly:** I confirmed the URL resolves. I could not confirm that it shows bookable slots, because availability loads with JavaScript and needs a real browser session.

## 2. Services and categories on the current site (verified)
- **Core:** High-Fidelity Audio; Home Theater; Automation & Lighting Control.
- **Services:** Audio-Visual Consultancy & Custom Design; Acoustic Engineering & Soundproofing (including studio setup); Theater Construction, Seating & Flooring.
- **Audio gear:** Atmos speakers, satellite speakers, floor-standing speakers, wall speakers, subwoofers, soundbars, AV receivers, CD/Blu-ray players.
- **Projectors:** LED, portable, Full HD short-throw, 4K.
- **Cables:** USB, RJ/Ethernet, optical, audio.
- **Seating:** home theatre recliners (manual and motorised), auditorium/multiplex/cinema chairs, loungers.
- **Brand logos shown:** 18 logos, identified from the image files on 28 Oct 2026 (an earlier pass read only alt text and found three): Denon, Marantz, Yamaha, Mission, Q Acoustics, HECO, Magnat, Velodyne Acoustics, Taga Harmony, JBL, Bose Professional, Alto Professional, Optoma, ViewSonic, Loewe, Edifier, Marshall and Artsound. The site does not say whether any of these are authorised dealerships.
- **"Clients" section:** a logo grid. The logos show Jindal Steel & Power, the Government of Jharkhand, Christ the King Catholic Church, Credo World School (Dhanbad), Hotel Z3, SRS Cinemas, VOX, Swarnbhumi, Nexus Green Homes, Moon Lab Studios, NightOwl, One8 Commune, Tamashaa, Studio Taleem, Oha's Media AV Lab, Chaos, Aargee and HR Music. None of these can be reused as endorsements without permission. Credo World School suggests at least one past project in Dhanbad, which ROS should confirm.
- **Testimonials:** none.

## 3. Worth preserving
- The 2011 founding date and the Ranchi base, which are credible local trust signals.
- The Calendly "live home theatre experience" booking. The demo-room idea becomes the primary conversion in the redesign.
- The breadth of service and category lists. These are restructured into dedicated pages.
- The Hi-Fi definition copy, which is paraphrased on the gear page.

## 4. Problems found

### Content and redundancy
- The "Widest Range of The Finest Brands" heading and both of its paragraphs appear **twice, word for word**, on the home page.
- The hero image gallery is rendered twice, once as a slider and once as a grid. The header logo and CONTACT link are also duplicated.
- The site has only two pages, Home and Contact. There are no service pages, so it cannot rank for "home theatre Ranchi", "acoustic treatment Ranchi" and similar searches.
- **Off-topic content:** the sitemap includes `/panchakarma-treatment-blog/`, `/abhyanga-treatment-blog/` and `/shirodhara-treatment-blog/`, which are Ayurveda treatment posts. They may have been published to the wrong site. `/blog/` is a single yoga/meditation article rather than a post listing.
- **Broken link:** the blog's "Contact ROSAUDIO" button points to `rosaaudio.com/pages/contact`, which is a misspelled domain.
- Blog posts are credited to the author `graphbea@gmail.com`, which exposes an email address as the author name and has a public author archive.

### Missing buyer information
- No pricing guidance, process, project case studies, FAQs, opening hours, map or service areas.
- The homepage does not say what happens during a demo.

### Navigation and conversion
- The only navigation item is CONTACT.
- "WhatsApp us" appears as text, and the floating widget depends on a plugin.
- The contact form collects only name, email and message, with no phone number or project qualification.
- The two phone numbers are used inconsistently across pages.

### Technical SEO and accessibility (verified in the HTML)
- **No `<h1>`** on the home or contact pages. The blog page has **two `<h1>`** and a second, nested `<title>`/`<meta description>` inside the body, which suggests a full HTML document was pasted into the post.
- **No meta description** on the home or contact pages.
- **No structured data** (no LocalBusiness or Organization markup).
- **63 of 85 images** on the home page have empty or missing alt text. Many filenames are meaningless (`23.jpg`, `fdfdgfdgdfgb.jpg`, `Untitled-1xcvx.jpg`).
- The `robots.txt` and WordPress core sitemap are present, which is fine. The canonical tags are present and correct.

## 5. Photography on the current site
There are 66 images. About 40 of them are brand or client logos. The usable room photos are 600–1,164 px wide, and several look like stock, manufacturer or AI-generated images:
- `AdobeStock_…` and `istockphoto-…` filenames suggest stock photos.
- `Klipsch-Reference-…` is manufacturer imagery.
- The studio image (`image-13.png`) has the look of an AI-generated render.
- One seating photo carries a "REGAL" watermark, so it was not used.

The prototype now uses 10 of these photos, with one shared colour grade and film grain to hide the low resolution and mixed sources. **ROS must confirm usage rights before launch, and a proper photoshoot is still recommended.**

## 6. Assets that could be reused, with permission
- The ROS logo, which is not visible as text. A vector version is needed.
- Project photographs from the gallery. Each needs confirmation of which installation it shows, client permission, and whether it is ROS's own photo or a supplier image. For example, `Klipsch-Reference-Dolby-Atmos-Speakers-in-apartment.jpg` appears to be manufacturer imagery.
- Brand logos, but only after the partnerships are confirmed.

## 7. What the prototype uses
- **Verified facts:** name, 2011, Ranchi, email, the main phone (labelled *To confirm*), the Calendly URL and the service and category lists.
- **Not used:** the secondary phone, any rating or review count, either street address as fact (the published one is shown labelled *Awaiting confirmation*), client logos and any testimonials.
