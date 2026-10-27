# H. Content plan and briefs — Republic of Sound Audio (ROS)

Prepared for: Arobuz content writer, Arobuz SEO lead, ROS (technical and factual review)
Source of truth: `00-fact-sheet.md` (URLs, NAP, claims needing sign-off) and the keyword map in `brief-sections.md`.
Status: draft for ROS review. Everything in [square brackets] is a placeholder and must stay visible until ROS supplies the real value.

**How to use this section**
- Writers: each brief is complete as written. Do not add prices, project counts, client names, measurements from real jobs, results or search volumes. If a sentence needs one, write a [placeholder] and list it at the end of your draft.
- SEO lead: titles below are the full `<title>` tag. In Rank Math, set the custom SEO title for each guide so that no extra separator or site name is appended (in Rank Math: Titles & Meta → Posts → Single Post Title = `%title%`, or override per post) [Yoast: Search Appearance → Content Types → SEO title]. Lengths were checked with a script (see "Title and meta length check").
- ROS: every brief has a "ROS review" line. Technical pieces are not published until ROS signs them off.
- Language: Indian English (theatre, colour, optimise, metre), ₹ and lakh. Google's category name "Home theater store" is the only US spelling allowed, and it does not appear in these guides.

---

## 1. Keyword ownership for the 10 pieces (and conflicts found in the map)

The house rule is one keyword, one page. The map assigns a keyword to only six of the ten pieces. For the other four, every relevant keyword in the map already belongs to a service page, so the guide must **not** target it. Those guides link to the owning service page with that keyword as anchor text instead, which strengthens the service page.

| # | Piece | URL | Target keyword (from map) | Secondaries (from map) | Note |
|---|---|---|---|---|---|
| 1 | What does a home theatre cost in India? | /guides/home-theatre-cost-india/ | home theatre cost in india | home theatre budget | Clean |
| 2 | Room size for Dolby Atmos | /guides/room-size-dolby-atmos/ | room size for dolby atmos | home theatre room size | See conflict C1 (URL mismatch in build) and C2 |
| 3 | Projector vs TV for a home theatre | /guides/projector-vs-tv-home-theatre/ | projector vs tv for home theatre | none unassigned | See C3 |
| 4 | Soundbar vs home theatre | /guides/soundbar-vs-home-theatre/ | soundbar vs home theatre | none unassigned | Clean |
| 5 | How to soundproof a room in India | /guides/soundproof-room-india/ | how to soundproof a room in india | none unassigned | See C4 |
| 6 | 5 home theatres we built in Ranchi | /projects/home-theatres-ranchi/ | **none available** | none | See C5 |
| 7 | Living-room home theatre setups | /guides/living-room-home-theatre-setups/ | best home theatre setup for living room | none unassigned | Clean |
| 8 | Choosing recliners for a home cinema | /guides/home-cinema-recliners/ | **none available** | none | See C6 |
| 9 | Boardroom AV checklist | /guides/boardroom-av-checklist/ | **none available** | none | See C7 |
| 10 | Acoustic panels: what they fix and what they don't | /guides/acoustic-panels-what-they-fix/ | **none available** | none | See C8 |

Where a piece shows "none available", the SEO lead should research one keyword, check it is not already on the map, add it to the map against that URL, and only then hand it to the writer: [SEO-assigned keyword for piece 6/8/9/10]. Until then the writer optimises for the topic as described in the brief's "search intent" line, without forcing a phrase.

**Conflicts and overlaps noticed in the keyword map**
- **C1 — Fixed (28 Oct 2026).** The prototype build now uses `/guides/room-size-dolby-atmos/` with the keyword "room size for dolby atmos".
- **C2 — 7.1.4 overlap.** "7.1.4 home theatre" belongs to `/home-theatre-ranchi/` (Atmos section), yet Guide 2 explains 7.1.4 in depth. Guide 2 must not use "7.1.4 home theatre" in its title, H1 or H2s. It links to `/home-theatre-ranchi/` with "7.1.4 home theatre" or "Dolby Atmos home theatre in Ranchi" as anchor text.
- **C3 — projector overlap.** "projector for home theatre" and "4k projector ranchi" belong to `/projectors-audio-gear/`. The projector vs TV guide must not target them; it links to the gear page with them as anchors.
- **C4 — soundproofing overlap.** "soundproof room ranchi" and "soundproofing services ranchi" belong to `/acoustic-treatment-ranchi/`. The soundproofing guide targets only the "how to … in india" phrase and links to the acoustics page for the local terms.
- **C5 — projects keyword.** The map gives "home theatre projects ranchi" to `/projects/`. The new child page `/projects/home-theatres-ranchi/` would compete with its parent for it. Decision needed from SEO: either keep it on `/projects/` (assumed in this plan) or move it to the child page and re-target `/projects/` at the brand/portfolio level. Do not let both pages target it.
- **C6 — seating.** Every seating keyword ("home theatre recliner ranchi", "recliner sofa for home theatre", "motorised recliner ranchi", "cinema chairs for home theatre") belongs to `/cinema-seating/`. The recliner guide is informational support for that page.
- **C7 — corporate.** "boardroom av solutions jharkhand", "conference room av ranchi", "video conferencing setup ranchi" belong to `/corporate-av-jharkhand/`. The checklist supports that page.
- **C8 — acoustic panels.** "acoustic panels ranchi" and "home theatre acoustic treatment" belong to `/acoustic-treatment-ranchi/`. The panels guide must not target them.
- **C9 — "acoustic treatment jamshedpur".** It is listed in the city cluster, but there is no acoustics city URL. This plan places it as an H2 section on `/home-theatre-jamshedpur/`, used only if ROS has done real acoustic work in Jamshedpur. Otherwise it stays unassigned.

---

## 2. Three-month calendar

Week 1 = the week the new site goes live: [launch date]. Each piece moves through: brief (this document) → writer draft → SEO edit (on-page, links, schema) → ROS technical/factual sign-off → publish → GBP post linking to it (see section E posts). "Publish week" is the target, not a promise: a piece with an open dependency does not go live.

| Week | Month | Piece | URL | Target keyword | Owner | Dependencies |
|---|---|---|---|---|---|---|
| 1 | 1 | What does a home theatre cost in India? (already built) | /guides/home-theatre-cost-india/ | home theatre cost in india | SEO (on-page fixes, publish) · ROS (validate figures) | **Blocked until ROS validates or replaces the budget bands** currently shown as illustrative in the build. Meta description in the build to be replaced with the one in Brief 1. |
| 2 | 1 | Room size for Dolby Atmos (already built) | /guides/room-size-dolby-atmos/ | room size for dolby atmos | SEO (publish) · ROS (technical review) | ROS signs off angles, room sizes and ceiling guidance. |
| 3 | 1 | Guides index refresh + internal links from service pages to Guides 1–2 | /guides/ | — | SEO | Guides 1–2 live. |
| 4 | 1 | Commission month 2 photos (projects, demo room, living-room installs) | — | — | ROS | Needed for pieces 3, 4, 6, 7. Client photo permission in writing. |
| 5 | 2 | Projector vs TV for a home theatre | /guides/projector-vs-tv-home-theatre/ | projector vs tv for home theatre | Writer · SEO · ROS (review) | ROS to confirm whether laser projectors are supplied (fact-sheet sign-off item) before the guide mentions buying one from ROS. |
| 6 | 2 | Soundbar vs home theatre | /guides/soundbar-vs-home-theatre/ | soundbar vs home theatre | Writer · SEO · ROS (review) | ROS to confirm whether it sells/installs soundbars, and which brands [soundbar brands supplied]. |
| 7 | 2 | How to soundproof a room in India | /guides/soundproof-room-india/ | how to soundproof a room in india | Writer · SEO · **ROS (mandatory technical review)** | ROS to confirm which isolation methods it builds in-house vs subcontracts. Diagram (Brief 5) needs ROS check. |
| 8 | 2 | 5 home theatres we built in Ranchi | /projects/home-theatres-ranchi/ | [SEO-assigned keyword] (see C5) | ROS (projects, photos, permissions) · Writer · SEO | **BLOCKED.** Needs 5 real, completed Ranchi projects; professional photos; written client permission for each (name or anonymous, photos, location level, any budget band). If fewer than 5 are approved, publish as "[N] home theatres we built in Ranchi" or move to month 3. Never pad with stock images or invented projects. |
| 9 | 3 | Living-room home theatre setups | /guides/living-room-home-theatre-setups/ | best home theatre setup for living room | Writer · SEO · ROS (review) | Real living-room install photos [with permission], or neutral diagrams if none. |
| 10 | 3 | Choosing recliners for a home cinema | /guides/home-cinema-recliners/ | [SEO-assigned keyword] (see C6) | Writer · SEO · ROS (product facts) | ROS to confirm recliners are on display at the Ranchi studio (fact-sheet sign-off item) before the CTA says "see and sit in them". ROS to supply real product dimensions [recliner dimensions]. |
| 11 | 3 | Boardroom AV checklist | /guides/boardroom-av-checklist/ | [SEO-assigned keyword] (see C7) | Writer · SEO · ROS (review) | ROS to confirm service/AMC for corporate clients (fact-sheet sign-off item). Client names or logos only [with permission]. CTA is "Request a proposal" — SEO to confirm the form/route it goes to [proposal form URL]. |
| 12 | 3 | Acoustic panels: what they fix and what they don't | /guides/acoustic-panels-what-they-fix/ | [SEO-assigned keyword] (see C8) | Writer · SEO · **ROS (mandatory technical review)** | ROS to confirm whether it measures rooms (fact-sheet sign-off item: "Measured, designed and installed by our team") before the guide says ROS measures RT60. |
| 13 | — | Review: which guides earn impressions/clicks in Search Console; refresh plan | — | — | SEO | 4+ weeks of Search Console data per guide. No targets are set here because no baseline data exists yet. |
| Phase 3 | after month 3 | City pages: Jamshedpur, Dhanbad, Bokaro | /home-theatre-jamshedpur/, /home-theatre-dhanbad/, /home-theatre-bokaro/ | home theatre jamshedpur / dhanbad / bokaro | ROS (proof of work) · Writer · SEO | **Blocked per city** until the go-live gate in section 4 is passed. |

---

## 3. Briefs for the 10 pieces

Common rules for every brief:
- **Author box:** a named ROS person with real credentials: [author name], [role], [years in the trade / certifications]. The build currently shows "[named author and credentials to confirm]".
- **Schema:** Article (plus FAQPage only where a visible FAQ exists on the page; FAQ rich results are limited, so this is for clarity, not for a snippet). Project page: Article or CollectionPage, no Review schema.
- **CTA block** at the end of every piece and one inline CTA after the main table: "Book a free demo" → /book-a-demo/ (piece 9 uses "Request a proposal").
- **Never** state a price as fact. Budget references use ₹[X]–[Y] lakh with "ROS to confirm".
- **Images:** real ROS photos where available [with permission]; otherwise diagrams. Alt text describes the image, not the keyword.

---

### Brief 1 — What does a home theatre cost in India? (month 1, already built)

- **URL:** /guides/home-theatre-cost-india/
- **Target keyword:** home theatre cost in india
- **Secondaries:** home theatre budget
- **Search intent:** informational, early research. The reader wants a realistic range before talking to a dealer and wants to know what drives the number. They are not yet choosing a shop.
- **Title (51):** What Does a Home Theatre Cost in India? | ROS Guide
- **Meta description (138):** Where a home theatre budget goes in India: room work, equipment, acoustics and seating, with budget bands and mistakes to avoid. Read now.
  - Same as A-on-page.md, which is the single source; `src/data.js` now matches it.
- **H2 outline (matches the build):**
  1. The three parts of every budget (room / system / treatment and finishing; labour)
  2. Illustrative budget bands
  3. Where spending matters most
  4. Trade-offs worth making
  5. Costs people forget
  6. Common mistakes
  7. Living room or dedicated room: how the money shifts
  8. How to set your budget
  9. Common questions (FAQ)
- **Questions to answer:**
  - How much does a home theatre cost in India? (answer: depends on the room; give bands)
  - Is a small-budget system worth it? (build uses "₹1–2 lakh"; ROS to confirm or change to ₹[X]–[Y] lakh)
  - Should I spend more on the projector or the speakers?
  - Do I need acoustic treatment if I have curtains and a carpet?
  - Can I build the system in stages?
  - What is usually left out of a quote?
- **Internal links (anchor → URL):**
  - home theatre installation in Ranchi → /home-theatre-ranchi/
  - acoustic treatment → /acoustic-treatment-ranchi/
  - cinema seating and recliners → /cinema-seating/
  - Room size for Dolby Atmos: a practical guide → /guides/room-size-dolby-atmos/
  - lighting scenes and control → /home-automation-ranchi/
  - Book a free demo → /book-a-demo/
  - (add when live) projector vs TV → /guides/projector-vs-tv-home-theatre/; soundbar vs home theatre → /guides/soundbar-vs-home-theatre/
- **Table/visual:** budget-band table (Band / Typical room / What it usually includes). **Before publishing, ROS must validate the four bands** in the build (Under ₹5 lakh; ₹5–10 lakh; ₹10–25 lakh; ₹25 lakh and above) or replace them with ₹[X]–[Y] lakh values it is prepared to stand behind. The FAQ figure "₹1–2 lakh" needs the same check. Until then the table stays captioned "illustrative — to be validated by ROS".
- **Word count:** about 1,550 as built. Target 1,600–1,800 after the FAQ is complete. Do not pad.
- **CTA:** Book a free demo ("A 30-minute demo shows what changes between price levels in a real room.")
- **ROS review:** all money figures; the statement that two subwoofers usually give more even bass than one (accurate as general guidance).

---

### Brief 2 — Room size for Dolby Atmos: a practical guide (month 1, already built)

- **URL:** /guides/room-size-dolby-atmos/
- **Target keyword:** room size for dolby atmos
- **Secondaries:** home theatre room size
- **Do not target:** "7.1.4 home theatre", "dolby atmos home theatre ranchi" (owned by /home-theatre-ranchi/)
- **Search intent:** informational, planning. The reader has a room (or a plan) and wants to know if Atmos fits, which layout, what ceiling height and what screen size.
- **Title (50):** Room Size for Dolby Atmos: A Practical Guide | ROS
- **Meta description (132):** Room size, ceiling height, seating position, 5.1.2 vs 7.1.4 and screen size for Dolby Atmos. Try the room planner, then book a demo.
  - Same as A-on-page.md, which is the single source; `src/data.js` now matches it.
- **H2 outline (matches the build):**
  1. What the numbers mean (5.1.2, 7.1.4)
  2. Room dimensions
  3. Ceiling height
  4. Seating position
  5. Speaker layout: 5.1.2 vs 7.1.4
  6. Screen size and viewing distance
  7. Room shape, doors and windows
  8. Bass and subwoofers
  9. A worked example (hypothetical room, clearly labelled as an example)
  10. When to get a site survey
- **Questions to answer:**
  - What room size do I need for Dolby Atmos?
  - What is the minimum ceiling height for ceiling speakers?
  - Should I choose 5.1.2 or 7.1.4?
  - Where should the main seat go?
  - How big should the screen be for my seating distance?
  - Do upfiring (Atmos-enabled) speakers work instead of ceiling speakers?
- **Internal links (anchor → URL):**
  - Dolby Atmos home theatre in Ranchi → /home-theatre-ranchi/
  - acoustic treatment → /acoustic-treatment-ranchi/
  - cinema seating → /cinema-seating/
  - What does a home theatre cost in India? → /guides/home-theatre-cost-india/
  - Dolby Atmos receiver → /projectors-audio-gear/
  - Book a free demo → /book-a-demo/
- **Table/visual:** (already built) layout/room-size table, speaker-angle tables, screen-size-by-distance table (computed from 30° and 40° horizontal viewing angles), room planner and screen calculator tools. Add one top-down diagram of a 7.1.4 layout showing angles from the main seat [diagram to be drawn].
- **Technical check (for ROS):** the build's figures match Dolby's published home-theatre guidance as general starting points: front L/R 22–30°, side surrounds 90–110°, rear surrounds 135–150°, top front/top rear at about 30–55° elevation. Dolby places a single overhead pair ("top middle") at roughly 65–100° elevation, i.e. close to overhead or slightly ahead; the build's wording "roughly above or slightly in front of the main seat" agrees. The 2.4 m ceiling figure is presented as a designer preference, not a Dolby minimum — keep that wording. Room sizes in the dimensions table are rule-of-thumb, not Dolby specifications: ROS to confirm it is comfortable with them.
- **Word count:** about 1,450 as built. Target 1,500–1,800 if the FAQ is added (recommended: 4 questions from the list above, as FAQPage).
- **CTA:** Book a free demo ("Bring your room measurements.")
- **ROS review:** confirm the demo room has an Atmos layout before any copy says "hear Atmos in our demo room" (fact-sheet sign-off item).

---

### Brief 3 — Projector vs TV for a home theatre (month 2, week 5)

- **URL:** /guides/projector-vs-tv-home-theatre/
- **Target keyword:** projector vs tv for home theatre
- **Secondaries:** none unassigned in the map. Do not target "projector for home theatre", "4k projector ranchi" or "laser projector for home" (owned by /projectors-audio-gear/); use them only as link anchors.
- **Search intent:** informational/commercial comparison. The reader is choosing a display type and wants a clear rule for their room.
- **Title (56):** Projector vs TV for Home Theatre: Which Suits You? | ROS
- **Meta description:** Projector or TV for your home theatre? Compare screen size, picture, room light, sound, upkeep and cost per inch. Book a free demo to compare them.
- **H2 outline:**
  1. The short answer: it depends on screen size and room light
  2. Screen size and seating distance (link to Guide 2's table; 30° and 40° viewing angles)
  3. Picture quality: brightness, contrast, HDR and black levels
  4. Room light: why a projector needs light control (and what ALR screens do)
  5. Installation: throw distance, mounting, ceiling and cabling
  6. Upkeep: lamp vs laser light sources, fan noise, dust and humidity
  7. Cost per inch of screen: how the comparison shifts as size grows (no prices — use ₹[X]–[Y] lakh)
  8. Living room vs dedicated room: which display usually fits
  9. Can you have both? (TV for daytime, drop-down screen for films)
  10. Common questions
- **Questions to answer:**
  - Is a projector better than a TV for a home theatre?
  - At what screen size does a projector start to make sense? (answer by viewing distance and angle, not a fixed inch figure)
  - Can I use a projector in a room with windows?
  - What is an ALR (ambient-light-rejecting) screen and when is it worth it?
  - How long does a projector light source last? (answer: check the manufacturer's rated hours; laser sources are generally rated longer than lamps and don't need lamp replacement — do not quote hours)
  - Does a projector work with Dolby Atmos? (yes: sound is handled by the AV receiver and speakers, not the display)
  - What about short-throw/ultra-short-throw projectors?
- **Internal links:**
  - projector for home theatre → /projectors-audio-gear/
  - 4K and laser projectors → /projectors-audio-gear/ (only after ROS confirms laser projectors are supplied)
  - Room size for Dolby Atmos → /guides/room-size-dolby-atmos/
  - motorised screen and curtains → /home-automation-ranchi/
  - home theatre installation in Ranchi → /home-theatre-ranchi/
  - Soundbar vs home theatre → /guides/soundbar-vs-home-theatre/
  - Book a free demo → /book-a-demo/
- **Table/visual:** a comparison table — rows: screen size range, best room light, picture in daylight, black level in a dark room, installation work, noise, upkeep, cost trend as size grows, best for; columns: TV / projector + screen / ultra-short-throw projector + ALR screen. Qualitative entries only (e.g. "rises steeply above [X]″" is not allowed; say "rises steeply at very large sizes"). Optional: a side-by-side photo of the same scene on TV vs projector in the ROS demo room [photo, ROS].
- **Technical notes for the writer:** projector brightness is quoted in ANSI lumens, TV brightness in nits; do not convert one to the other. Projector HDR depends on tone mapping and is not directly comparable to TV HDR. A white screen in a room with light walls loses contrast because reflected light washes out blacks. Ventilation and dust affect projectors in Indian conditions; recommend following the maker's filter-cleaning schedule.
- **Word count:** 1,600–1,900
- **CTA:** Book a free demo ("See a projector and a large TV in the same room before you decide.") — only say "see both in our demo room" if ROS confirms both are on display [confirm].
- **ROS review:** brands named; laser projector claim; whether ROS supplies ALR screens [confirm].

---

### Brief 4 — Soundbar vs home theatre (month 2, week 6)

- **URL:** /guides/soundbar-vs-home-theatre/
- **Target keyword:** soundbar vs home theatre
- **Secondaries:** none unassigned. Do not target "home theatre budget" (Guide 1) or "best home theatre setup for living room" (Guide 7).
- **Search intent:** commercial investigation. Usually a living-room buyer deciding between a one-box solution and separate speakers.
- **Title (53):** Soundbar vs Home Theatre: Which Should You Buy? | ROS
- **Meta description:** Soundbar or full home theatre? Compare sound, Dolby Atmos, room fit, upgrade path and budget so you buy once and buy right. Book a free demo to hear both.
- **H2 outline:**
  1. What each one is (soundbar; soundbar with sub and rears; AV receiver with separate speakers)
  2. Sound: dialogue, width, surround and bass
  3. Dolby Atmos: upfiring and virtual height vs real overhead speakers
  4. Room fit and décor
  5. Setup, wiring and HDMI eARC
  6. Upgrade path: what you can add later
  7. Budget: where each makes sense (₹[X]–[Y] lakh, ROS to confirm)
  8. Who should buy a soundbar, who should buy a system
  9. Common questions
- **Questions to answer:**
  - Is a soundbar as good as a home theatre system?
  - Does a Dolby Atmos soundbar give real overhead sound? (answer: it uses upfiring drivers reflecting off the ceiling and/or processing to suggest height; results depend on ceiling height and surface, and are generally less precise than overhead speakers)
  - Can I add speakers to a soundbar later? (only within that maker's system, usually)
  - Do I need an AV receiver?
  - What is HDMI eARC and why does it matter for Atmos from a TV app?
  - Which is better for a small room?
- **Internal links:**
  - home theatre setup in Ranchi → /home-theatre-ranchi/
  - AV receiver dealer in Ranchi → /projectors-audio-gear/
  - What does a home theatre cost in India? → /guides/home-theatre-cost-india/
  - Projector vs TV for a home theatre → /guides/projector-vs-tv-home-theatre/
  - living-room home theatre setups → /guides/living-room-home-theatre-setups/ (add when live)
  - Book a free demo → /book-a-demo/
- **Table/visual:** a decision table — columns: soundbar / soundbar + sub + rears / 5.1 or 5.1.2 system / 7.1.4 system; rows: dialogue clarity, surround envelopment, true height, bass, room size it suits, wiring needed, upgrade path, budget band (₹[X]–[Y] lakh each, ROS to confirm). Plus a simple diagram showing an upfiring driver bouncing off the ceiling vs an in-ceiling speaker.
- **Word count:** 1,400–1,700
- **CTA:** Book a free demo ("Hear a soundbar and a speaker system back to back.") — only if ROS confirms a soundbar is set up in the demo room [confirm].
- **ROS review:** whether ROS sells soundbars [confirm]; budget bands.

---

### Brief 5 — How to soundproof a room in India (month 2, week 7)

- **URL:** /guides/soundproof-room-india/
- **Target keyword:** how to soundproof a room in india
- **Secondaries:** none unassigned. Do not target "soundproof room ranchi", "soundproofing services ranchi", "studio soundproofing ranchi" (owned by /acoustic-treatment-ranchi/).
- **Search intent:** informational, problem-solving. Readers include home-theatre owners worried about neighbours, people with a noisy road, musicians and home-studio owners. Many believe foam panels soundproof a room; the guide corrects that.
- **Title (51):** How to Soundproof a Room in India: What Works | ROS
- **Meta description:** Soundproofing means mass, decoupling, damping and airtight seals, not foam. What works in Indian homes and what doesn't. Book a free demo to start.
- **H2 outline:**
  1. Soundproofing vs acoustic treatment: two different jobs
  2. How sound escapes: through walls, through gaps, and through the structure
  3. The four principles: mass, decoupling, damping, airtightness
  4. Walls: adding mass and decoupling in brick-and-RCC buildings
  5. Ceilings and floors: impact noise and the room-within-a-room
  6. Doors and windows: usually the weakest point
  7. Air conditioning, ducts and electrical boxes (flanking paths)
  8. Why bass is the hardest to stop
  9. What doesn't work (foam, egg trays, carpets on walls, thin panels)
  10. Apartment vs independent house: what's realistic
  11. Plan it before interiors begin
  12. Common questions
- **Key technical content (accurate, ROS to review):**
  - **Mass:** heavier, denser partitions transmit less sound. Doubling mass gives only a modest improvement, so mass alone becomes expensive and heavy. Solid brick/block walls already outperform lightweight boards.
  - **Decoupling:** separate the inner surface from the structure so vibration cannot pass straight through — resilient channels or isolation clips with furring channel, independent stud walls, floated floors, isolation hangers for ceilings. The full version is a "room within a room".
  - **Damping:** viscoelastic damping compound between two layers of board converts vibration into heat (constrained-layer damping).
  - **Airtightness:** any air gap leaks sound. Seal perimeter gaps with acoustic sealant, use solid-core doors with perimeter seals and an automatic drop seal, back-box or seal electrical outlets, and treat AC pipe and duct penetrations.
  - **Cavity absorption:** mineral wool/rock wool in wall and ceiling cavities reduces cavity resonance; it helps the system but is not soundproofing on its own.
  - **Caution for ROS to confirm wording:** a double-leaf wall with a small air gap has a mass-air-mass resonance that can make low-frequency isolation worse than expected; design the gap and layers rather than adding "any second wall".
  - **Low frequencies** (subwoofer bass, drums) are the hardest to stop and travel through the structure; expect mass, decoupling and depth to be needed.
  - **Windows:** laminated or double glazing with a meaningful air gap and good seals helps; a standard sliding window seals poorly. Do not quote dB figures.
  - **Ratings:** explain STC (sound transmission class) or Rw as the way partitions are compared; do not quote ratings for ROS builds unless ROS has test data [confirm].
  - **Indian context:** RCC frame with brick infill is common; split-AC refrigerant lines and drain pipes create holes through the wall; humidity in the monsoon matters for fabric and timber choices; apartments limit what can be done to floors, ceilings and shared walls (society permission may be needed).
- **Questions to answer:**
  - Do acoustic foam panels soundproof a room? (no; they reduce echo inside)
  - What is the cheapest effective step? (sealing gaps, especially the door)
  - Can I soundproof a room without construction work?
  - How much does soundproofing reduce the space? (it takes depth from walls/ceiling; say "several centimetres to more", ROS to give typical [X] mm range)
  - Can I soundproof a rented flat?
  - Do I need soundproofing for a home theatre, or just treatment?
  - How much does it cost? (₹[X]–[Y] per sq ft or lakh, ROS to confirm; or say "after a site survey")
- **Internal links:**
  - soundproofing services in Ranchi → /acoustic-treatment-ranchi/
  - acoustic panels: what they fix and what they don't → /guides/acoustic-panels-what-they-fix/ (add when live)
  - home theatre installation in Ranchi → /home-theatre-ranchi/
  - What does a home theatre cost in India? → /guides/home-theatre-cost-india/
  - studio soundproofing → /acoustic-treatment-ranchi/
  - Book a free demo → /book-a-demo/
- **Table/visual:** (1) cross-section diagram of a wall: existing brick wall → isolation clips + channel → mineral wool → two layers of board with damping compound → sealed perimeter [diagram, ROS to check build-up]. (2) A table "Method / What it stops / What it doesn't / Disruption level / Suitable for apartments?" covering: door seals and drop seal, solid-core door, secondary glazing, extra board + damping on existing wall, decoupled wall, decoupled ceiling, floated floor, room-within-a-room. Qualitative entries only.
- **Word count:** 2,000–2,400
- **CTA:** Book a free demo ("Bring photos of your room and we will tell you what's realistic.")
- **ROS review (mandatory):** every technical statement; which methods ROS builds in-house; any cost figure.

---

### Brief 6 — 5 home theatres we built in Ranchi (month 2, week 8 — BLOCKED)

- **URL:** /projects/home-theatres-ranchi/
- **Target keyword:** [SEO-assigned keyword]. The map gives "home theatre projects ranchi" to /projects/ (see C5). Do not target "home theatre ranchi" (homepage) or "home theatre installation in ranchi" (/home-theatre-ranchi/).
- **Search intent:** commercial/trust. The reader is close to choosing an installer and wants proof of real local work.
- **Title (54):** 5 Home Theatres We Built in Ranchi | Republic of Sound
  - If fewer than 5 projects are approved: "[N] Home Theatres We Built in Ranchi | Republic of Sound".
- **Meta description:** Five real home theatres ROS designed and installed in Ranchi: the rooms, the challenges, the layouts and the results. Book a free demo to plan yours.
  - "the results" must describe what was done, not invented outcomes. Edit the meta if fewer than five.
- **Go-live gate (all must be true):**
  1. [N ≥ 5] completed home theatre projects in Ranchi chosen by ROS.
  2. Written client permission for each: name or anonymous ("a family in [locality]"), photos, locality level, whether any budget band may be shown.
  3. Professional or good-quality photos of each finished room; no stock images, no renders presented as finished work.
  4. ROS confirms every technical detail per project.
- **H2 outline (one H2 per project, same internal structure):**
  - Intro: who ROS is, since 2011, why these five (variety of rooms/budgets)
  - H2 per project: "[Project name, e.g. 'A 7.1.4 cinema in a [locality] bungalow']"
    - The room: type (dedicated / living room / basement), approx. size [X × Y m], ceiling [Z m]
    - The brief: what the client wanted [from client/ROS]
    - The challenge: [e.g. low ceiling, glass wall, shared wall]
    - What we did: layout [5.1.2/7.1.4], display, speakers [brands], treatment, seating, control
    - Photos: 3–5 per project with captions
    - Client comment [verbatim, with permission] — optional
    - Budget band: ₹[X]–[Y] lakh [only with permission]
  - H2: What these projects have in common (planning first, calibration)
  - H2: Plan your own home theatre
- **Questions to answer:** What size rooms has ROS worked in? Which layouts? How were common Ranchi room problems solved? How long did installation take [X weeks per project, from ROS]?
- **Internal links:**
  - home theatre installation in Ranchi → /home-theatre-ranchi/
  - all projects → /projects/
  - acoustic treatment → /acoustic-treatment-ranchi/
  - cinema seating → /cinema-seating/
  - lighting control system → /home-automation-ranchi/
  - Room size for Dolby Atmos → /guides/room-size-dolby-atmos/
  - Book a free demo → /book-a-demo/
- **Table/visual:** a summary table at the top: Project / Room type / Layout / Display / Key challenge / Seats — all values from ROS. Photo gallery per project. Optional floor-plan sketch per project.
- **Word count:** 1,500–2,000 (about 250–350 per project plus intro and close)
- **CTA:** Book a free demo
- **ROS review:** everything. **Google Business Profile note:** the same photos can go into GBP posts and the photo plan (section E) once permission covers that use too.

---

### Brief 7 — Living-room home theatre setups (month 3, week 9)

- **URL:** /guides/living-room-home-theatre-setups/
- **Target keyword:** best home theatre setup for living room
- **Secondaries:** none unassigned.
- **Search intent:** informational/commercial. Families who will not build a dedicated room and want the best result in a shared living room, often with daylight, open plan and décor constraints.
- **Title (53):** Best Home Theatre Setup for a Living Room | ROS Audio
- **Meta description:** Living-room home theatre setups that work: layouts from 3.1 to 5.1.2, hidden speakers, TV or projector, and fixes for open plans. Book a free demo to plan.
- **H2 outline:**
  1. What makes a living room different (daylight, shared use, open plan, décor)
  2. Four setups that work: soundbar + sub; 3.1 / 5.1; 5.1.2 Atmos; projector-and-TV hybrid
  3. Where the speakers go when the sofa is against the wall
  4. Hiding it: in-wall, in-ceiling and slim on-wall speakers, and cable routes
  5. TV or projector in a room with daylight (link to Brief 3)
  6. Bass in a living room: subwoofer placement and neighbours
  7. Taming echo without making the room look like a studio
  8. Lighting scenes and one-touch control
  9. Mistakes to avoid
  10. Common questions
- **Technical notes for the writer:**
  - With the sofa against the back wall, side/rear surrounds can't go behind the listener; dipole or bipole surrounds, or placing surrounds slightly above and to the side, are common compromises. Bass is usually heavy at the back wall — calibration matters more here.
  - Subwoofer placement: trial positions (the "subwoofer crawl") plus room correction; two subwoofers can even out bass across a wide sofa.
  - Upfiring Atmos modules need a flat, reflective ceiling of suitable height; a false ceiling with coves can break the reflection.
- **Questions to answer:**
  - What is the best home theatre setup for a living room?
  - Can I get Dolby Atmos without ceiling speakers?
  - Will a subwoofer disturb the neighbours? (it can; link to soundproofing guide)
  - Can speakers be hidden in the false ceiling?
  - How do I control everything with one remote?
  - Is a projector practical in a living room?
- **Internal links:**
  - home theatre setup in Ranchi → /home-theatre-ranchi/
  - Projector vs TV for a home theatre → /guides/projector-vs-tv-home-theatre/
  - Soundbar vs home theatre → /guides/soundbar-vs-home-theatre/
  - smart lighting for home theatre → /home-automation-ranchi/
  - floor standing speakers in Ranchi → /projectors-audio-gear/
  - Acoustic panels: what they fix and what they don't → /guides/acoustic-panels-what-they-fix/ (add when live, or link /acoustic-treatment-ranchi/)
  - Book a free demo → /book-a-demo/
- **Table/visual:** (1) table "Setup / Speakers / Atmos? / Wiring work / Visible equipment / Budget band (₹[X]–[Y] lakh, ROS to confirm) / Best for". (2) Three top-down layout diagrams: 5.1 with sofa on the back wall, 5.1.2 with in-ceiling heights, open-plan living-dining. (3) Real living-room install photos [with permission].
- **Word count:** 1,700–2,000
- **CTA:** Book a free demo ("Bring a photo and rough measurements of your living room.")
- **ROS review:** layouts, budget bands, which brands/products ROS offers for concealed installs.

---

### Brief 8 — Choosing recliners for a home cinema (month 3, week 10)

- **URL:** /guides/home-cinema-recliners/
- **Target keyword:** [SEO-assigned keyword] (see C6). Do not target any seating keyword in the map; link to /cinema-seating/ with them.
- **Search intent:** commercial investigation. The reader has (or is planning) a room and is choosing seats: manual vs motorised, fabric vs leatherette, how many rows.
- **Title (53):** Choosing Home Cinema Recliners: A Buyer's Guide | ROS
- **Meta description:** How to choose home cinema recliners: manual or motorised, leather or fabric, wall clearance, rows, risers and sightlines. Book a free demo to try them.
  - "to try them" depends on recliners being on display (fact-sheet sign-off item). If not confirmed, end with "Book a free demo to plan your room."
- **H2 outline:**
  1. Start with the room, not the chair
  2. Manual vs motorised recliners (power points, noise, convenience, backup if power fails)
  3. Wall clearance and recline space (standard vs wall-hugger designs)
  4. Seat width, rows and aisle space
  5. Second rows: risers and sightlines
  6. Upholstery for Indian weather: leather, leatherette and fabric
  7. Features worth having (and ones you'll ignore): headrests, cup holders, USB, storage, lighting
  8. Seating and sound: how seats affect bass and acoustics
  9. Delivery and installation: lifts, staircases, door widths
  10. Common questions
- **Technical notes for the writer:**
  - Recliner footprint fully reclined is much longer than upright. Use product-specific numbers only from ROS: [upright depth], [reclined depth], [wall clearance], [seat width] — never generic invented figures.
  - Sightlines: the second row needs a riser high enough that eye lines clear the heads in front; the required height depends on row spacing, screen height and seat design. Give the principle and a diagram; ROS to supply [typical riser height range].
  - A riser reduces headroom to the ceiling and to overhead speakers (link to Guide 2).
  - Seats and risers can affect bass response; a riser can resonate if hollow (often filled or damped). Flag for ROS review.
  - Motorised seats need power at each seat — plan floor or wall points before flooring is laid.
  - Leatherette and bonded materials can degrade in heat and humidity; ROS to confirm which materials it recommends [material guidance] and warranty terms [warranty].
- **Questions to answer:**
  - Manual or motorised recliner — which is better?
  - How much space does a recliner need behind it?
  - How high should a second-row riser be? (principle + "ROS will calculate it for your room")
  - Leather or fabric for a home theatre in India?
  - How many seats fit in my room?
  - Can recliners get through my door and lift?
- **Internal links:**
  - home theatre recliners in Ranchi → /cinema-seating/
  - Room size for Dolby Atmos → /guides/room-size-dolby-atmos/
  - What does a home theatre cost in India? → /guides/home-theatre-cost-india/
  - home theatre automation → /home-automation-ranchi/
  - home theatre installation in Ranchi → /home-theatre-ranchi/
  - Book a free demo → /book-a-demo/
- **Table/visual:** (1) comparison table "Manual / Motorised / Wall-hugger motorised / Sofa-style": recline mechanism, power needed, wall clearance [from ROS], noise, best for. (2) Side-section sightline diagram showing two rows, riser, eye lines and screen. Photos of recliners at the ROS studio [if on display].
- **Word count:** 1,400–1,700
- **CTA:** Book a free demo
- **ROS review:** all product dimensions, materials and warranty; recliners on display.

---

### Brief 9 — Boardroom AV checklist (month 3, week 11)

- **URL:** /guides/boardroom-av-checklist/
- **Target keyword:** [SEO-assigned keyword] (see C7). Do not target "boardroom av solutions jharkhand", "conference room av ranchi" or "video conferencing setup ranchi"; link to /corporate-av-jharkhand/ with them.
- **Search intent:** commercial/planning, B2B. Facility managers, admin heads, IT managers and architects specifying a boardroom or meeting room. They want a checklist they can share internally.
- **Title (55):** Boardroom AV Checklist: Plan a Meeting Room | ROS Audio
- **Meta description:** A boardroom AV checklist for planners: display size, cameras, microphones, acoustics, control, cabling and support. Request a proposal for your room.
- **H2 outline:**
  1. Before you start: room use, seats, who presents and who joins remotely
  2. Display: size from the farthest viewer, one or two screens, projector or LED/LCD
  3. Video conferencing: platform (Microsoft Teams Rooms, Zoom Rooms or BYOD), camera placement and field of view
  4. Audio: ceiling or table microphones, coverage, echo cancellation, speakers
  5. Room acoustics: why hard boardrooms sound bad on calls
  6. Presentation and wireless sharing
  7. Control: one-touch start, lighting, blinds
  8. Infrastructure: cabling, network, power, floor boxes, rack and ventilation
  9. Commissioning, training and documentation
  10. Support and AMC (only if ROS confirms it offers it)
  11. The printable checklist
- **Technical notes for the writer:**
  - Display sizing: AVIXA's DISCAS standard (ANSI/AVIXA V202.01) sizes displays from viewing distance and content type; the older "4-6-8 rule" is a rough legacy shortcut. Explain the principle; do not give a fixed formula as definitive. ROS to confirm wording.
  - Camera: mount at or near display height so remote participants see faces, not tops of heads; field of view must cover all seats.
  - Microphones: coverage zones should include every seat; ceiling arrays keep tables clear; acoustic echo cancellation (AEC) is essential when room speakers and microphones are on together.
  - Acoustics: excess reverberation reduces speech intelligibility for remote participants more than for people in the room. Treatment targets are room-specific — no RT60 figure without ROS sign-off.
  - Platform-certified hardware matters if the company uses Teams or Zoom rooms.
- **Questions to answer:**
  - What AV equipment does a boardroom need?
  - What size display for a [X]-seat boardroom? (answer by viewing distance; ROS calculates)
  - Ceiling microphones or table microphones?
  - Why do remote participants say our room echoes?
  - Who supports the system after installation?
  - How long does a boardroom AV installation take? ([X] weeks, ROS to confirm typical)
- **Internal links:**
  - boardroom AV solutions in Jharkhand → /corporate-av-jharkhand/
  - video conferencing setup in Ranchi → /corporate-av-jharkhand/
  - room acoustics consultant → /acoustic-treatment-ranchi/
  - lighting control system → /home-automation-ranchi/
  - our projects → /projects/
  - Request a proposal → [proposal form URL] (if none exists, /contact/ with a "Corporate proposal" subject; SEO to decide)
- **Table/visual:** a downloadable/printable checklist table: Item / Question to answer / Decided? / Notes — about 25 rows grouped by the H2s. Plus a plan-view diagram of a [X]-seat boardroom showing display, camera, ceiling microphone zones and speakers.
- **Word count:** 1,800–2,200
- **CTA:** **Request a proposal** ("Send us your room drawings and seat count.")
- **ROS review:** AMC/service claim (fact-sheet sign-off item), brands supplied, any client names or logos [with permission] — e.g. corporate clients shown on the current site may be named only with permission.

---

### Brief 10 — Acoustic panels: what they fix and what they don't (month 3, week 12)

- **URL:** /guides/acoustic-panels-what-they-fix/
- **Target keyword:** [SEO-assigned keyword] (see C8). Do not target "acoustic panels ranchi", "acoustic treatment ranchi", "home theatre acoustic treatment" or "room acoustics consultant"; link to /acoustic-treatment-ranchi/ with them.
- **Search intent:** informational. The reader is about to buy panels (often online) and wants to know if they'll solve their problem — echo, boomy bass or noise from neighbours.
- **Title (56):** Acoustic Panels: What They Fix and What They Don't | ROS
- **Meta description:** Acoustic panels cut echo and improve clarity, but won't block noise or cure boomy bass alone. See where they work and where they don't. Book a free demo.
- **H2 outline:**
  1. What an acoustic panel actually does (absorbs reflected sound inside the room)
  2. What panels fix: flutter echo, harsh reflections, long reverberation, dialogue clarity
  3. What panels don't fix: sound leaking in or out, most bass problems, poor speaker placement
  4. Thickness and frequency: why thin panels only absorb treble
  5. Where to put them: first reflection points, behind the speakers, the rear wall
  6. Bass traps and multiple subwoofers for low-frequency problems
  7. Absorption vs diffusion: when a room needs both
  8. RT60 and why small rooms are measured differently
  9. Foam, fabric-wrapped mineral wool, PET felt and wood slats compared
  10. Fire safety and Indian conditions (humidity, dust)
  11. Common questions
- **Key technical content (accurate, ROS to review):**
  - Porous absorbers (mineral wool, glass wool, PET, open-cell foam) work best on mid and high frequencies. Effective low-frequency absorption needs depth — a thicker panel and/or an air gap behind it extends absorption lower. Thin (e.g. 10–25 mm) panels mostly absorb high frequencies and can leave a room sounding dull but still boomy.
  - Absorption is rated by absorption coefficients per frequency band and summarised as NRC; NRC averages 250 Hz–2 kHz, so it says nothing about bass. Ask for the per-band coefficients.
  - First reflection points on side walls and ceiling can be found with the mirror method (a person moves a mirror along the wall; where the listener sees a speaker's tweeter, place a panel).
  - RT60 is the time for sound to decay by 60 dB. In small rooms like home theatres the sound field is not diffuse, so RT60 is a rough guide and low-frequency behaviour is dominated by room modes. ROS to confirm whether it measures and what target range it designs to [RT60 target range, ROS] — do not publish a target figure without ROS sign-off.
  - Room modes (boomy notes, bass nulls) are addressed with seat and subwoofer placement, multiple subwoofers, bass traps and EQ/room correction — not with thin panels.
  - Panels do not soundproof (link to Brief 5).
  - Over-treating with thin absorbers deadens a room unevenly; treatment should be planned.
  - Fire: ask for fire-performance test data for any material; ROS to state what its products carry [fire rating/test standard].
- **Questions to answer:**
  - Do acoustic panels block sound from neighbours? (no)
  - Do acoustic panels help with bass? (only thick/deep ones, and only partly)
  - How many panels do I need? (depends on room; no fixed percentage rule — ROS to approve any rule of thumb)
  - Where should acoustic panels go in a home theatre?
  - Are foam panels any good?
  - What is NRC and should I trust it?
- **Internal links:**
  - acoustic panels in Ranchi → /acoustic-treatment-ranchi/
  - home theatre acoustic treatment → /acoustic-treatment-ranchi/
  - How to soundproof a room in India → /guides/soundproof-room-india/
  - Room size for Dolby Atmos → /guides/room-size-dolby-atmos/ (bass and seating section)
  - subwoofers in Ranchi → /projectors-audio-gear/
  - home theatre installation in Ranchi → /home-theatre-ranchi/
  - Book a free demo → /book-a-demo/
- **Table/visual:** (1) table "Problem / Panels help? / What actually fixes it": echo, harsh highs, muddy dialogue, boomy bass, bass nulls, noise from outside, sound leaking to bedrooms. (2) Plan-view diagram showing first reflection points found by the mirror method. (3) Optional: before/after measurement graph from a real ROS room [only if ROS has real data, with permission].
- **Word count:** 1,700–2,000
- **CTA:** Book a free demo ("Hear a treated room and an untreated one.") — only if the demo room is treated [confirm].
- **ROS review (mandatory):** all technical statements; materials and fire data; whether ROS measures rooms.

---

### Title and meta length check

Checked with a python3 script (`len()` on the exact strings above; ₹ counts as one character). Limits: title ≤ 60, meta ≤ 155.

| # | Title | Chars | Meta chars | Meta ends with an action |
|---|---|---|---|---|
| 1 | Home Theatre Cost in India: A Budget Guide \| ROS Audio | 54 | 153 | Yes |
| 2 | Room Size for Dolby Atmos: A Practical Guide \| ROS | 50 | 154 | Yes |
| 3 | Projector vs TV for Home Theatre: Which Suits You? \| ROS | 56 | 147 | Yes |
| 4 | Soundbar vs Home Theatre: Which Should You Buy? \| ROS | 53 | 154 | Yes |
| 5 | How to Soundproof a Room in India: What Works \| ROS | 51 | 147 | Yes |
| 6 | 5 Home Theatres We Built in Ranchi \| Republic of Sound | 54 | 149 | Yes |
| 7 | Best Home Theatre Setup for a Living Room \| ROS Audio | 53 | 155 | Yes |
| 8 | Choosing Home Cinema Recliners: A Buyer's Guide \| ROS | 53 | 151 | Yes |
| 9 | Boardroom AV Checklist: Plan a Meeting Room \| ROS Audio | 55 | 149 | Yes |
| 10 | Acoustic Panels: What They Fix and What They Don't \| ROS | 56 | 153 | Yes |

Script output (python3, run 28 Oct 2026):

```
 1  title 54/60  meta 153/155  OK
 2  title 50/60  meta 154/155  OK
 3  title 56/60  meta 147/155  OK
 4  title 53/60  meta 154/155  OK
 5  title 51/60  meta 147/155  OK
 6  title 54/60  meta 149/155  OK
 7  title 53/60  meta 155/155  OK
 8  title 53/60  meta 151/155  OK
 9  title 55/60  meta 149/155  OK
10  title 56/60  meta 153/155  OK
    City title (Dhanbad example): 53
    City title (longest city, Jamshedpur): 56
    City meta (Dhanbad example): 147
    Fallback title, piece 6: 56
```

Four meta descriptions (pieces 3, 4, 5, 10) were first drafted at 156–160 characters and were trimmed to fit. No title needed shortening. The meta descriptions currently in `src/data.js` for Guides 1 and 2 (148 and 156 characters) do not end with an action, and the Guide 2 one is over 155. Replace both with the metas above.

---

## 4. Phase 3 city page template — Jamshedpur, Dhanbad, Bokaro

### 4.1 Go-live gate (all boxes must be ticked per city, separately)

A city page is **not written for publication, not indexed and not linked** until ROS confirms in writing:

- [ ] ROS has **completed** at least [1–2, ROS to decide; minimum 1] real home theatre (or acoustics) project in that city — installed and handed over, not quoted or in progress.
- [ ] The client has given written permission to feature it (name or anonymised, photos, locality level).
- [ ] Real photos of that project exist.
- [ ] ROS can state its actual travel and site-visit arrangement for that city (who travels, how often, charges if any, after-sales response).
- [ ] At least [4] real local questions have been collected from enquiries in that city (from WhatsApp, calls, GBP Q&A or site visits).
- [ ] The page passes the uniqueness check in 4.3.

If a city has no completed work, there is **no page** for it. Mention the city instead in a single sentence on /home-theatre-ranchi/ ("We also take on projects across Jharkhand, including [cities]") only if that is true.

### 4.2 Section-by-section structure

| # | Block | Unique per city or shared | Content |
|---|---|---|---|
| 1 | Title tag, meta, H1 | Unique | Title: "Home Theatre in [City] — Design & Installation \| ROS" (check ≤60). H1: "Home theatre design and installation in [City]". |
| 2 | Intro (80–120 words) | Unique | Who ROS is (Ranchi-based since 2011), and the honest relationship with the city: "We have built [N] home theatres in [City] since [year], working from our Ranchi studio." No implied local office. |
| 3 | Featured local project | **Unique — mandatory** | The real project: locality [area], room type, size [X × Y m], layout, challenges, what ROS did, 3–6 photos, client comment [with permission]. 250–400 words. |
| 4 | How we work with [City] clients: travel and site visits | **Unique — mandatory** | Distance and typical travel time from Ranchi [X km, Y hours]; how a site survey is arranged; survey charge [free / ₹[X], adjusted against order — confirm]; number of visits in a typical project [X]; whether the install team stays on site; after-sales response time for that city [X days]; AMC availability [confirm]. |
| 5 | Local building and room notes | Unique | Only what ROS has actually seen in that city's projects, e.g. common room types in [locality/township] projects, apartment society rules on works, power backup needs. Written from ROS input, not generic guesses. |
| 6 | Services available in [City] | Shared (short) | 4–6 bullets linking to the main service pages: home theatre (/home-theatre-ranchi/), acoustics (/acoustic-treatment-ranchi/), automation (/home-automation-ranchi/), seating (/cinema-seating/), gear (/projectors-audio-gear/). One line each; no copied paragraphs. |
| 7 | Acoustic treatment in [City] (Jamshedpur only, per C9) | Unique, optional | Only if ROS has completed real acoustic work in Jamshedpur. Targets "acoustic treatment jamshedpur". |
| 8 | Demo options | Shared core + unique line | Shared: "Hear a system at our Ranchi studio" → /book-a-demo/. Unique: whether a [City] client's finished room can be visited by referral [only with that client's permission]. |
| 9 | Local FAQs | **Unique — mandatory, minimum [4]** | Real questions from that city's enquiries. Example question types: "Do you charge for travel to [City]?", "How long does a site visit take?", "Who handles service if something stops working?", "Can you work with my [City] interior designer?". |
| 10 | Reviews from [City] clients | Unique, optional | Only real Google reviews from that city's clients, quoted with the reviewer's permission. No review or rating schema (self-serving). |
| 11 | CTA | Shared | "Book a free demo" → /book-a-demo/ and WhatsApp. |
| 12 | NAP footer | Shared, identical to the site | The Ranchi showroom NAP exactly as the fact sheet. **No** city address, no city phone number, no virtual office. |
| 13 | Schema | Shared pattern, unique values | `Service` with `provider` → `https://rosaudio.com/#business` and `areaServed` → the city (`City` with name). **No** separate LocalBusiness for the city. BreadcrumbList. |

### 4.3 Minimum unique-content requirements

- At least **[60]%** of visible body copy unique to that city (blocks 2–5, 7, 9, 10 together; recommended minimum about [400–600] words of city-specific text). SEO checks with a similarity tool against the other city pages and /home-theatre-ranchi/ before publishing.
- One real, completed, permission-cleared local project with real photos (block 3). Without it, the gate fails.
- Real travel and site-visit details (block 4) confirmed by ROS.
- At least [4] local FAQs drawn from real enquiries (block 9), not rewritten copies of another city's FAQs.
- Service-area facts that are true: localities actually served [localities], and only cities where ROS genuinely takes work.
- No city-name swapping: a page that would still read correctly after find-and-replace of the city name fails review.

### 4.4 Why this avoids Google's doorway-page problems

Google's spam policies describe doorway abuse as sites or pages made to rank for specific, similar searches that funnel users elsewhere or offer near-identical content with only the place name changed. This template avoids that because:

1. **Each page has substantial unique, useful content** — a real local project, real travel and service terms, and real local questions — so it answers "can ROS do my project in [City], and how?" better than the Ranchi page could.
2. **Pages exist only where ROS really works.** The go-live gate prevents a page for every nearby town, which is the classic doorway pattern.
3. **No pretend local presence.** No city address, phone number, virtual office or extra Google Business Profile. Creating a GBP for a city without a staffed location breaks Google's Business Profile guidelines and is a common cause of suspension — do not do it.
4. **Shared blocks are short and link out** to the canonical service pages instead of duplicating them.
5. **Schema is honest:** `areaServed` on a Service, provided by the single Ranchi business entity.
6. **Each page is a destination**, with its own CTA and content, not a thin page that only funnels to the Ranchi page.

### 4.5 Example (Dhanbad) — placeholders only, no invented facts

> **Title:** Home Theatre in Dhanbad — Design & Installation | ROS
> **Meta:** Home theatre design and installation in Dhanbad by Republic of Sound Audio, Ranchi: real local projects, site visits and support. Book a free demo.
> **H1:** Home theatre design and installation in Dhanbad
>
> **Intro:** Republic of Sound Audio has designed home theatres and listening rooms from our Ranchi studio since 2011. Since [year] we have completed [N] home theatres in Dhanbad, including the [room type] in [locality] shown below. Here is how we work with Dhanbad clients, from the first site visit to after-sales service.
>
> **H2: A [layout, e.g. 5.1.2] home theatre in [locality], Dhanbad**
> The room: a [room type] of about [X × Y m] with a [Z m] ceiling. The client wanted [brief, from client]. The challenge was [challenge]. We [what ROS did: layout, display, speakers [brands], treatment, seating, control]. [3–6 photos, captions]. "[Client comment, verbatim, with permission]" — [client name or "a family in [locality]"].
>
> **H2: How we work with Dhanbad clients**
> Dhanbad is about [X km / Y hours] from our Ranchi studio. A site survey in Dhanbad is [free / ₹[X], adjusted against your order]. A typical project needs [X] visits: [survey, pre-wiring check, installation, calibration]. Installation takes [X days] on site. For service, we aim to [respond within X days / schedule a visit within X days] [confirm]. [AMC availability, confirm].
>
> **H2: What we've learned from Dhanbad homes**
> [ROS input only: e.g. room types encountered, power-backup considerations, society approval experience.]
>
> **H2: Services available in Dhanbad**
> - Home theatre design and installation → /home-theatre-ranchi/
> - Acoustic treatment → /acoustic-treatment-ranchi/
> - Home automation and lighting → /home-automation-ranchi/
> - Cinema seating → /cinema-seating/
> - Projectors and audio gear → /projectors-audio-gear/
>
> **H2: Hear it before you decide**
> Book a free demo at our Ranchi studio. [If a Dhanbad client agrees: "We can also arrange a visit to a finished Dhanbad room by appointment."]
>
> **H2: Questions from Dhanbad clients**
> - [Real question 1 from a Dhanbad enquiry] — [answer]
> - [Real question 2] — [answer]
> - [Real question 3] — [answer]
> - [Real question 4] — [answer]
>
> **[Optional] What Dhanbad clients say:** [real Google review excerpt, with permission]
>
> **CTA:** Book a free demo → /book-a-demo/ · WhatsApp [+91 85802 39007 — confirm]
>
> **NAP (unchanged):** Republic of Sound Audio, [Beside Javed Habib Salon, PP Compound, Main Road, Ranchi, Jharkhand 834001 — CONFIRM], +91 85802 39007, connect@rosaudio.com
>
> Note: the current site shows a client logo for Credo World School Dhanbad. That is not a home theatre project and may be mentioned on the Dhanbad page only [with permission] and only described accurately as the work actually done.

---

## 5. Placeholders in this file

- [launch date]
- [named author and credentials to confirm] / [author name], [role], [years in the trade / certifications]
- [SEO-assigned keyword] for pieces 6, 8, 9 and 10
- [SEO-assigned keyword for piece 6/8/9/10]
- ₹[X]–[Y] lakh budget bands (Guides 1, 3, 4, 5, 6, 7) and ROS validation of the four built bands and the "₹1–2 lakh" FAQ figure
- ₹[X]–[Y] per sq ft or lakh (soundproofing cost)
- [N] / [N ≥ 5] number of approved Ranchi projects
- [Project name], [locality], [X × Y m], [Z m], [brief], [challenge], [brands], [X weeks per project], [client comment, with permission], [client name or "a family in [locality]"]
- [photo, ROS] / [diagram to be drawn] / [diagram, ROS to check build-up]
- [soundbar brands supplied]
- [confirm] — demo room has an Atmos layout; both TV and projector on display; soundbar in demo room; ALR screens supplied; laser projectors supplied; recliners on display; demo room treated; AMC/service for corporate clients; whether ROS measures rooms; test data for STC/Rw ratings
- [X] mm (depth lost to soundproofing)
- [upright depth], [reclined depth], [wall clearance], [seat width], [typical riser height range], [material guidance], [warranty]
- [X]-seat boardroom; [X] weeks (boardroom installation time)
- [proposal form URL]
- [RT60 target range, ROS]
- [fire rating/test standard]
- [with permission] (client names, logos, photos, reviews)
- City pages: [City], [cities], [year], [1–2, ROS to decide; minimum 1], [4] local FAQs, [60]% unique, [400–600] words, [localities], [locality], [room type], [layout], [X km / Y hours], [free / ₹[X]], [X] visits, [X days], [respond within X days / schedule a visit within X days], [AMC availability, confirm], [Real question 1–4], [answer], [real Google review excerpt, with permission]
- NAP: [Beside Javed Habib Salon, PP Compound, Main Road, Ranchi, Jharkhand 834001 — CONFIRM]; WhatsApp [+91 85802 39007 — confirm]
