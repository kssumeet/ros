"""Render docs/seo/A-on-page.md, B-schema.md and the keyword baseline CSV from onpage.py,
and check every rule: title ≤60, meta ≤155, FAQ answers 40–80 words, one page per keyword,
valid JSON-LD. Exits non-zero if any check fails.   python3 tools/seo/build_pack.py"""
import json, os, re, sys, csv
sys.path.insert(0, os.path.dirname(__file__))
from onpage import PAGES, CLAIMS

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'docs', 'seo')
O = 'https://rosaudio.com'
BIZ = O + '/#business'
problems = []

def words(t): return len(re.sub(r'\[[^\]]*\]', 'x', t).split())

# ---------------- checks ----------------
seen = {}
for p in PAGES:
    if len(p['title']) > 60: problems.append(f"{p['url']} title {len(p['title'])} chars")
    if len(p['meta']) > 155: problems.append(f"{p['url']} meta {len(p['meta'])} chars")
    for q, a in p['faqs']:
        n = words(a)
        if not 40 <= n <= 80: problems.append(f"{p['url']} FAQ '{q[:40]}' answer {n} words")
    kws = [p['primary']] + p['secondary'] if not p['primary'].startswith('(') else p['secondary']
    for k in kws:
        if k in seen: problems.append(f"keyword '{k}' on {seen[k]} and {p['url']}")
        seen[k] = p['url']
service_pages = [p for p in PAGES if p['id'] in ('home-theatre', 'acoustics', 'automation', 'gear', 'seating', 'corporate')]
for p in service_pages:
    if not 4 <= len(p['faqs']) <= 6: problems.append(f"{p['url']} has {len(p['faqs'])} FAQs")

# ---------------- A: on-page spec ----------------
md = ["# A — On-page specification (every page)",
      "",
      "Generated from `tools/seo/onpage.py` by `tools/seo/build_pack.py`, so do not edit by hand. The 8 titles and metas marked **approved** are copied exactly from the Arobuz proposal. Character counts were checked by the script.",
      "",
      "**Where to enter them:** in Rank Math, open the page in the editor → Rank Math panel → *Edit Snippet* for the title and description; *Social* tab for Open Graph; set the focus keyword to the primary keyword. (Yoast: the Yoast SEO box → *SEO title*, *Meta description*, *Social*.) Write the H1 in Elementor as a Heading widget with HTML tag **H1**. There must be exactly one per page; make every other section heading an H2 or H3.",
      "",
      "| Page | URL | Title (chars) | Meta (chars) |", "|---|---|---|---|"]
for p in PAGES:
    md.append(f"| {p['id']} | `{p['url']}` | {len(p['title'])}{' ✓ approved' if p['approved'] else ''} | {len(p['meta'])} |")
for p in PAGES:
    md += ["", f"## {p['h1']}", "", "| Field | Spec |", "|---|---|",
           f"| URL slug | `{p['url']}` |",
           f"| Title tag ({len(p['title'])}) | {p['title']}{'  *(approved)*' if p['approved'] else ''} |",
           f"| Meta description ({len(p['meta'])}) | {p['meta']} |",
           f"| H1 | {p['h1']} |",
           f"| Primary keyword | {p['primary']} |",
           f"| Secondary keywords | {', '.join(p['secondary']) or '—'} |",
           f"| Target word count | {p['words']} |",
           f"| Main CTA | {p['cta']} |",
           f"| OG title ({len(p['og_title'])}) | {p['og_title']} |",
           f"| OG description ({len(p['og_desc'])}) | {p['og_desc']} |",
           "", "**H2 outline**", ""] + [f"{i+1}. {h}" for i, h in enumerate(p['h2'])] + \
          ["", "**Alt text examples**", ""] + [f"- {a}" for a in p['alts']]
    if p['id'] in CLAIMS:
        md += ["", f"> **Needs ROS sign-off before publishing:** {CLAIMS[p['id']]}"]
    if p['faqs']:
        md += ["", f"**FAQs** (answers are 40–80 words; paste them on the page exactly as written, because the FAQPage schema in section B must match the visible text)", ""]
        for q, a in p['faqs']:
            md += [f"**{q}**  ", f"{a} *({words(a)} words)*", ""]
md += ["", "## Keyword ownership check", "", f"{len(seen)} keywords are assigned, and each one appears on exactly one page (checked by script). City keywords are held for the Phase 3 pages."]
open(os.path.join(OUT, 'A-on-page.md'), 'w').write('\n'.join(md) + '\n')

# ---------------- B: schema ----------------
def block(title, where, how, obj, note=None):
    js = json.dumps(obj, indent=2, ensure_ascii=False)
    json.loads(js)  # validity
    out = [f"### {title}", "", f"**Goes on:** {where}  ", f"**How:** {how}", ""]
    if note: out += [f"> {note}", ""]
    out += ["```html", '<script type="application/ld+json">', js, "</script>", "```", ""]
    return out

local_business = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "ElectronicsStore"],
  "@id": BIZ,
  "name": "Republic of Sound Audio",
  "alternateName": ["ROS Audio", "Republic of Sound"],
  "url": O + "/",
  "logo": O + "/wp-content/uploads/[logo-file].png",
  "image": [O + "/wp-content/uploads/[demo-room-photo].webp", O + "/wp-content/uploads/[showroom-exterior].webp"],
  "description": "Home theatre, Hi-Fi, acoustic treatment, soundproofing and home automation company in Ranchi, Jharkhand, with a live demo room. Established 2011.",
  "telephone": "+918580239007",
  "email": "connect@rosaudio.com",
  "foundingDate": "2011",
  "priceRange": "₹₹₹",
  "address": {"@type": "PostalAddress", "streetAddress": "[Beside Javed Habib Salon, PP Compound, Main Road — CONFIRM]", "addressLocality": "Ranchi", "addressRegion": "Jharkhand", "postalCode": "[834001 — CONFIRM]", "addressCountry": "IN"},
  "geo": {"@type": "GeoCoordinates", "latitude": "[lat]", "longitude": "[long]"},
  "openingHoursSpecification": [
    {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "[10:00]", "closes": "[20:00]"}
  ],
  "areaServed": [{"@type": "City", "name": "Ranchi"}],
  "sameAs": ["[Google Business Profile URL]", "[Instagram URL]", "[Facebook URL]", "[YouTube URL]", "[LinkedIn URL]"],
  "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Audio-visual services", "itemListElement": [
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": n, "url": O + u}} for n, u in [
      ("Home theatre design and installation", "/home-theatre-ranchi/"),
      ("Acoustic treatment and soundproofing", "/acoustic-treatment-ranchi/"),
      ("Home automation and lighting control", "/home-automation-ranchi/"),
      ("Projectors, speakers and AV receivers", "/projectors-audio-gear/"),
      ("Home theatre recliners and cinema seating", "/cinema-seating/"),
      ("Boardroom and auditorium AV", "/corporate-av-jharkhand/"),
      ("Installation, calibration and after-sales service", "/contact/")]]}
}
org = {"@context": "https://schema.org", "@graph": [
  {"@type": "Organization", "@id": O + "/#organization", "name": "Republic of Sound Audio", "url": O + "/",
   "logo": {"@type": "ImageObject", "url": O + "/wp-content/uploads/[logo-file].png"}, "foundingDate": "2011",
   "email": "connect@rosaudio.com", "telephone": "+918580239007", "sameAs": ["[social URLs, as in LocalBusiness]"]},
  {"@type": "WebSite", "@id": O + "/#website", "url": O + "/", "name": "Republic of Sound Audio", "inLanguage": "en-IN",
   "publisher": {"@id": O + "/#organization"}}]}

b = ["# B — Structured data (JSON-LD, ready to paste)", "",
     "Every block below was generated and parsed by `tools/seo/build_pack.py`, so the JSON syntax is valid. **Before publishing:**",
     "",
     "1. Replace every `[placeholder]`. Google treats a literal \"[lat]\" as invalid data, so never publish a block that still contains brackets.",
     "2. Test each page in Google's [Rich Results Test](https://search.google.com/test/rich-results) and at [validator.schema.org](https://validator.schema.org/).",
     "",
     "## How to add it without duplicates",
     "",
     "**Rank Math (recommended).** It is not installed yet; the free version is enough.",
     "- **Leave on (built in):** Rank Math already outputs `WebSite`, `WebPage`, `BreadcrumbList` (once breadcrumbs are enabled) and `Article` for posts.",
     "  - Set **Titles & Meta → Local SEO**: *Company*, name \"Republic of Sound Audio\", logo.",
     "  - Its Organization `@id` is `https://rosaudio.com/#organization`, the same as the block below, so the two merge into one entity.",
     "  - So on a Rank Math site you **don't paste** the Organization/WebSite, BreadcrumbList or Article blocks. They are included for completeness and as the spec to check Rank Math's output against.",
     "- **Paste with a snippet plugin** (WPCode → *Add snippet* → *HTML*, location *Site-wide header* or *Page-specific*):",
     "  - LocalBusiness (site-wide)",
     "  - Service (one per service page)",
     "  - FAQPage (pages with FAQs)",
     "- **Elementor alternative:** an *HTML* widget at the bottom of the page, holding the `<script>` block. This works, but WPCode keeps schema out of the page design.",
     "- **Duplicates:** don't also turn on Rank Math's *Local Business* schema type for pages. The site must output exactly one `#business` entity.",
     "",
     "**Yoast:** WebSite, Organization, WebPage and BreadcrumbList are built in. Add the rest via WPCode in the same way.",
     "",
     "**Reviews and ratings:** there is no `aggregateRating` or `review` anywhere. Google does not show star ratings for LocalBusiness or Organization reviews that the business publishes about itself, and marking up hand-picked reviews risks a manual action. Reviews belong on the Google Business Profile.",
     "",
     "**Service area:** `areaServed` lists Ranchi only. The brief names Jamshedpur, Dhanbad and Bokaro as Phase 3 cities. Add them as further `{\"@type\": \"City\", \"name\": …}` entries only when ROS confirms it takes work there, at the same time as the city pages go live. Listing them now would claim a service area the business hasn't confirmed.",
     "",
     "**FAQ schema:** this is valid markup, but since 2023 Google shows FAQ rich results only for well-known government and health sites. Use it for clarity, not to win snippets. The questions and answers must match the visible page text word for word.",
     "",
     "## 1. Site-wide"]
b += block("LocalBusiness", "every page (site-wide header)", "WPCode, HTML snippet, *Site-wide header*", local_business,
           "Types: `HomeAndConstructionBusiness` covers design and installation; `ElectronicsStore` covers equipment sales from the showroom. If ROS doesn't sell from the showroom, drop `ElectronicsStore`.")
b += block("Organization + WebSite", "homepage", "Rank Math generates these automatically (same @ids). Paste only if you aren't using Rank Math or Yoast.", org)
b += ["## 2. Service (one per service page)", ""]
for p in service_pages:
    svc = {"@context": "https://schema.org", "@type": "Service", "@id": O + p['url'] + "#service",
           "name": p['h1'], "serviceType": p['h1'].replace(' in Ranchi', '').replace(' in Jharkhand', ''),
           "description": p['og_desc'], "url": O + p['url'],
           "provider": {"@id": BIZ},
           "areaServed": [{"@type": "City", "name": "Ranchi"}] if p['id'] != 'corporate' else [{"@type": "State", "name": "Jharkhand"}]}
    b += block(f"Service: {p['h1']}", f"`{p['url']}`", "WPCode, HTML snippet, *Page-specific* (or an Elementor HTML widget)", svc)
b += ["## 3. FAQPage (pages with FAQs)", ""]
for p in [x for x in PAGES if x['faqs']]:
    faq = {"@context": "https://schema.org", "@type": "FAQPage", "@id": O + p['url'] + "#faq",
           "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p['faqs']]}
    note = "Answers containing [placeholders] must be completed on the page and in this block at the same time." if any('[' in a for q, a in p['faqs']) else None
    b += block(f"FAQPage: {p['h1']}", f"`{p['url']}`", "WPCode, *Page-specific*", faq, note)
b += ["## 4. Article (guides)", ""]
for p in [x for x in PAGES if x['id'].startswith('guide-')]:
    art = {"@context": "https://schema.org", "@type": "Article", "@id": O + p['url'] + "#article",
           "headline": p['h1'], "description": p['meta'], "inLanguage": "en-IN",
           "image": [O + "/wp-content/uploads/[guide-hero-1200x675].webp"],
           "datePublished": "[YYYY-MM-DD]", "dateModified": "[YYYY-MM-DD]",
           "author": {"@type": "Person", "name": "[Author name]", "jobTitle": "[Role at ROS]", "url": O + "/[author-page]/"},
           "publisher": {"@id": O + "/#organization"}, "mainEntityOfPage": O + p['url']}
    b += block(f"Article: {p['h1']}", f"`{p['url']}`", "Rank Math: post → Schema tab → Article (set author and dates there). Use this block only to check its output, or paste it if Rank Math's Article is switched off.", art,
               "If no named author is approved, use `\"author\": {\"@id\": \"https://rosaudio.com/#organization\"}`. Don't invent credentials.")
b += ["## 5. BreadcrumbList (every page except the homepage)", "",
      "Rank Math: *General Settings → Breadcrumbs → Enable*. It then outputs these automatically. The expected trails are listed so you can check them:", ""]
names = {p['url']: p['h1'] for p in PAGES}
short = {'/home-theatre-ranchi/': 'Home theatre', '/acoustic-treatment-ranchi/': 'Acoustics', '/home-automation-ranchi/': 'Automation',
         '/projectors-audio-gear/': 'Projectors & audio gear', '/cinema-seating/': 'Cinema seating', '/corporate-av-jharkhand/': 'Corporate AV',
         '/projects/': 'Projects', '/book-a-demo/': 'Book a demo', '/guides/': 'Guides', '/contact/': 'Contact',
         '/guides/home-theatre-cost-india/': 'What does a home theatre cost in India?', '/guides/room-size-dolby-atmos/': 'Room size for Dolby Atmos'}
for p in PAGES:
    if p['url'] == '/': continue
    trail = [('Home', '/')] + ([('Guides', '/guides/')] if p['url'].startswith('/guides/') and p['url'] != '/guides/' else []) + [(short[p['url']], p['url'])]
    b.append(f"- `{p['url']}`: " + " › ".join(t for t, _ in trail))
example = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
  {"@type": "ListItem", "position": 1, "name": "Home", "item": O + "/"},
  {"@type": "ListItem", "position": 2, "name": "Guides", "item": O + "/guides/"},
  {"@type": "ListItem", "position": 3, "name": "Room size for Dolby Atmos", "item": O + "/guides/room-size-dolby-atmos/"}]}
b += [""] + block("BreadcrumbList template", "e.g. `/guides/room-size-dolby-atmos/`", "Generated by Rank Math. Paste manually only if breadcrumbs are off.", example)
open(os.path.join(OUT, 'B-schema.md'), 'w').write('\n'.join(b) + '\n')

# ---------------- keyword baseline CSV (section I) ----------------
KMAP = os.path.join(OUT, 'brief-sections.md')
rows = []
for line in open(KMAP):
    m = re.match(r'^\|\s*([^|]*?)\s*\|\s*([^|]+?)\s*\|\s*(P\d)\s*\|\s*([^|]+?)\s*\|$', line.strip())
    if m:
        for k in m.group(2).split(';'):
            rows.append([k.strip(), m.group(3), m.group(4).strip()])
with open(os.path.join(OUT, 'I-keyword-baseline.csv'), 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['Keyword', 'Priority', 'Target page', 'Volume / difficulty [from Keyword Planner]', 'Current rank (day 0)', 'URL ranking now', 'Rank day 30', 'Rank day 60', 'Target rank day 90', 'Rank day 90', 'Target rank day 180', 'Rank day 180', 'Notes'])
    for k, pr, page in rows:
        t90 = '≤10' if k == 'home theatre ranchi' else ''
        t180 = '≤3' if k == 'home theatre ranchi' else ''
        w.writerow([k, pr, page, '', '', '', '', '', t90, '', t180, '', ''])
print(f"keywords in CSV: {len(rows)}")
print("checks:", "PASS" if not problems else "FAIL")
for x in problems: print("  -", x)
sys.exit(1 if problems else 0)
