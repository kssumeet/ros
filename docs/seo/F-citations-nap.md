# F. Citations and NAP clean-up: Republic of Sound Audio

**For:** the Arobuz developer and content writer, plus the ROS team member who holds the logins for each listing.
**Source of facts:** `00-fact-sheet.md`. [Square brackets] are unconfirmed and stay as placeholders.
**Prepared:** 28 Oct 2026.

> **Do not start the clean-up until the address is confirmed.** Every listing must end up with one identical NAP. Updating 15 directories to an address that later changes repeats the problem we're fixing.

---

## 1. Known conflicts to fix everywhere

| Conflict | Seen where | Correct value | Action |
|---|---|---|---|
| Old address: **Satya Enclave, Lake Avenue, Kanke Road, Ranchi 834008** | Several directories (per the brief) | `[Beside Javed Habib Salon, PP Compound, Main Road, Ranchi, Jharkhand 834001 — CONFIRM]` | Update to the confirmed address. If ROS really moved, mark the old one as *moved*, not *closed*, where the platform allows. |
| Website **rosdc.in** | Directories | `https://rosaudio.com/` | rosdc.in has no DNS A record and does not resolve (checked 28 Oct 2026). If ROS owns it, point it at rosaudio.com with a 301; either way, replace it with rosaudio.com on every listing. |
| Typo domain **rosaaudio.com** | Button in the /blog/ yoga post | `https://rosaudio.com/` | The developer fixes or deletes the post (it is off-topic anyway). |
| Name variants ("ROS Audio", "Republic of Sound", "Republic Of Sound Audio Ranchi") | Various | `Republic of Sound Audio` | Use the exact name. "ROS" may appear in descriptions only. |
| Two phone numbers | Various | Primary `+91 85802 39007` | Show `+91 82109 55476` only if ROS decides to, and always label it [e.g. "Service"]. |

---

## 2. Paste-ready text

### 2.1 NAP block (copy exactly; do not reformat per site)
```text
Republic of Sound Audio
[Beside Javed Habib Salon, PP Compound, Main Road, Ranchi, Jharkhand 834001 — CONFIRM]
+91 85802 39007
connect@rosaudio.com
https://rosaudio.com/
```
Fields that some directories ask for:
- Hours: `[e.g. Mon–Sat 10 am – 8 pm, Sun closed — CONFIRM]`
- Year established: `2011`
- WhatsApp: `[+91 85802 39007 — confirm]`
- Category (pick the closest available): Home Theatre Dealers / Home Theatre System Dealers; Audio Visual Equipment Dealers; Acoustic Consultants / Soundproofing Contractors; Home Automation Services
- Logo: `ros-logo-square.png`; cover: `ros-cover-ranchi-studio.jpg` (see E, section 7)

### 2.2 Short description (148 characters, for fields with a tight limit)
```text
Home theatres, Hi-Fi, acoustic treatment and home automation in Ranchi since 2011. Book a demo at our Ranchi studio to hear a system before you buy.
```

### 2.3 Long description (627 characters)
```text
Republic of Sound Audio designs and installs home theatres, Hi-Fi systems, acoustic treatment and home automation in Ranchi, Jharkhand. Since 2011 we have helped homeowners, architects and businesses plan private cinemas, media rooms and listening rooms that suit the space and the budget. Our work covers room planning, projector and speaker selection, acoustic panels and soundproofing, cinema seating, lighting control, and boardroom and auditorium AV for offices, hotels and schools. Visit our Ranchi studio to hear a system before you decide, or book a demo slot so a specialist can talk you through options for your room.
```
Do not add Atmos-demo claims, in-house measurement, AMC, other cities or brand names until ROS confirms them (see the fact sheet, "Claims needing ROS sign-off").

---

## 3. Citation tracker

**Status key:** To check, Claimed, Updated, Duplicate reported, Done.
**Priority:** P1 = do this week (high-visibility or feeds other sites); P2 = this month; P3 = when time allows.
Where an exact listing URL couldn't be confirmed, the "URL to check" column gives the search method.

| # | Platform | URL to check | What to change | Priority | Status |
|---|---|---|---|---|---|
| 1 | **Google Maps / Business Profile** | https://business.google.com/ ; on Maps search `Republic of Sound Audio Ranchi`, `Republic of Sound Ranchi`, `ROS Audio Ranchi` and `home theatre Kanke Road Ranchi` | Confirm there is exactly one profile, at the confirmed address. Find and handle any Kanke Road / rosdc.in duplicate (section 4). Apply pack E. | P1 | To check |
| 2 | **Justdial** | https://www.justdial.com/ : search `Republic of Sound Ranchi` and `Republic of Sound Audio`, city Ranchi | Claim through "Free Listing" with the primary phone (OTP). Fix the address, website (rosdc.in → rosaudio.com), hours and categories. Remove duplicates. | P1 | To check |
| 3 | **Bing Places** | https://www.bingplaces.com/ | Import from Google Business Profile once GBP is correct (fastest route), or create manually. Check that the website isn't rosdc.in. | P1 | To check |
| 4 | **Apple Business Connect** | https://businessconnect.apple.com/ : search for the business when adding a location | Claim or create the place card for Apple Maps. Set the NAP, hours, category (home theatre / electronics) and photos. | P1 | To check |
| 5 | **Facebook page** | `[Facebook URL]`; also search Facebook for `Republic of Sound Audio` | Fix the About section (address, phone, rosaudio.com, hours). Delete or merge unofficial duplicate pages via Meta's "Merge Pages" (needs admin on both). | P1 | To check |
| 6 | **Sulekha** | https://www.sulekha.com/ : search `Republic of Sound` in Ranchi | Claim or update the NAP and website. Choose a home theatre / AV category. | P2 | To check |
| 7 | **IndiaMART** | https://www.indiamart.com/ : search `Republic of Sound Audio Ranchi` | If a seller profile exists, fix the company name, address and website. Don't list prices unless ROS supplies them. | P2 | To check |
| 8 | **TradeIndia** | https://www.tradeindia.com/ : search `Republic of Sound Audio` | As IndiaMART. Low priority for a B2C showroom; mainly for corporate AV. | P3 | To check |
| 9 | **Magicpin** | https://magicpin.in/ : search `Republic of Sound` in Ranchi | Claim the merchant listing if it exists and correct the NAP. Don't create one if it doesn't exist (it is mostly for retail and food). | P3 | To check |
| 10 | **Yappe** | https://www.yappe.in/ : search `Republic of Sound Audio Ranchi` | Update the NAP and website. Remove the Kanke Road address. | P3 | To check |
| 11 | **Asklaila** | https://www.asklaila.com/ : search `Republic of Sound` in Ranchi | Update the NAP, or report as closed/duplicate the listings that carry the old address. | P3 | To check |
| 12 | **Houzz (India)** | https://www.houzz.in/ : search professionals for `Republic of Sound Audio` | Create a professional profile (category: Home Theatre / Media Room design). Add project photos [with permission]. Useful for architect and interior-designer referrals. | P2 | To check |
| 13 | **Ranchi business directories** | Google `"Republic of Sound" Ranchi`, `"rosdc.in"` and `"Kanke Road" "Republic of Sound"`; list every directory that comes up `[directory names to research]` | Correct or remove each listing. Log every URL found in this tracker as a new row. | P2 | To check |
| 14 | **HiFiVision** (Indian audio forum) | https://www.hifivision.com/ : search the forum for `Republic of Sound` and `Ranchi dealer` | Check for any dealer listing or thread that gives the old address or website. If ROS takes a dealer/trade account, use the exact NAP. No promotional posting from staff accounts without declaring it. | P3 | To check |
| 15 | **Q Acoustics dealer locator**: only if ROS is an authorised dealer | Q Acoustics official site, *Where to buy / Find a dealer*, country India `[exact locator URL to research]` | Ask the Indian distributor `[name to research]` to list ROS with the exact NAP and rosaudio.com. | P2 | To check |
| 16 | **ViewSonic India where to buy**: only if ROS is an authorised dealer | https://www.viewsonic.com/in/shop/ (India "Where to buy"; reseller list not confirmed from search) | Ask ViewSonic India sales (contact via https://www.viewsonic.com/in/contact/) to list ROS as a Ranchi reseller with the exact NAP. | P2 | To check |
| 17 | **Artsound dealer list**: only if ROS is an authorised dealer | Artsound official site, *Dealers / Where to buy*, India `[exact URL to research]` | Ask the brand or its Indian importer `[name to research]` to add ROS with the exact NAP. | P3 | To check |
| 18 | **Own website** (footer, /contact/, schema) | https://rosaudio.com/contact/ | Same NAP as above; fix "Ofice"; LocalBusiness schema `@id https://rosaudio.com/#business`; no Google rating in schema. | P1 | To check |
| 19 | **Own social profiles** | `[Instagram URL] [YouTube URL] [LinkedIn URL]` | Same name, phone and website in every bio. Link them from the site footer. | P2 | To check |

---

## 4. Duplicates: merge or remove (Kanke Road address / rosdc.in)

### 4.1 Google Maps (highest risk, so do this first)
1. In a logged-out browser, search Maps for every variant in tracker row 1. Screenshot each result with its address, phone, website and review count.
2. **If a duplicate is in ROS's own GBP account:** don't delete it if it has reviews. Contact Google Business Profile support (*Help → Contact us → "Duplicate listing"*) and ask for the duplicate to be **merged** into the main profile, giving both Maps links. Reviews can carry over in a merge; deleting a profile loses them.
3. **If the duplicate is unverified or owned by someone else:** on Maps open it → *Suggest an edit* → *Close or remove* → **Duplicate of another place**, and select the main ROS listing. If it's the real old site and ROS moved, choose **Moved to a new location** instead.
4. **Never** create a new profile to replace one you can't access. Request ownership instead (*Claim this business → Request access*). Google gives the current owner 3 days to respond before you can appeal.
5. Re-check in 2–3 weeks and record the outcome in the tracker.

### 4.2 Justdial / Sulekha / Asklaila / Yappe
1. Search each site for all name variants, and for `Kanke Road` + `Republic of Sound`.
2. Claim the listing with the best history (reviews, age) using the primary phone OTP. Update it to the confirmed NAP.
3. For each other copy, use the site's "Report incorrect information / Business closed / Duplicate" link, or email support with both listing URLs and ask for a merge into the claimed one.
4. Justdial: if the listing can't be edited online, call Justdial customer care from the registered number and ask for the edit; note the ticket number in the tracker.

### 4.3 rosdc.in
1. Check ownership: look up rosdc.in in the domain registrar or ROS email for renewal notices `[ROS to confirm]`.
2. **If owned:** add DNS records and a site-wide 301 redirect to `https://rosaudio.com/` (path to the same path, or to the homepage), and keep renewing the domain.
3. **If not owned:** do nothing to the domain; replace it on every listing (tracker rows 2–14).

### 4.4 Facebook
Meta *Settings → Merge Pages* works only when ROS is admin on both pages and they have similar names. Otherwise report the unofficial page as "Duplicate" from its *··· → Report Page* menu.

---

## 5. Local link opportunities (15)

The organisations named here were found in searches on 28 Oct 2026; sources are given. Anything marked **[name to research]** is a type, not a confirmed organisation. Find the real one before you pitch. Client names are used only [with permission].

### A. Business and trade associations
| # | Opportunity | URL / how to find | Pitch angle |
|---|---|---|---|
| 1 | **Federation of Jharkhand Chamber of Commerce & Industries (FJCCI)**, Main Road, Ranchi | Exists (e.g. [UNI on its 2026-27 election](https://www.uniindia.com/east-india/industry-jharkhand-chamber-election/175651)). Website `[fjcci.org — verify]` | Membership with a member-directory listing; offer a short talk on boardroom AV and video conferencing for member businesses. |
| 2 | **Jharkhand Small Industries Association**, Kokar, Ranchi | Listed on [echai.ventures](https://echai.ventures/grid/ranchi/jharkhand-small-industries-association). Website `[to research]` | Member listing; conference-room AV checklist for factory offices. |
| 3 | **CREDAI Jharkhand chapter** (developers' body) | National site https://credai.org/ (Members section). Jharkhand chapter `[name/URL to research]` | Associate or supplier listing; home cinema rooms as a premium amenity in new projects. |
| 4 | **CII Indian Green Building Council, Ranchi chapter** | Launch reported by [NBM&CW](https://www.nbmcw.com/news/cii-indian-green-building-council-igbc-launches-its-32nd-chapter-in-ranchi-jharkhand.html) | Sponsor or speak at a chapter event on acoustic comfort and noise in buildings; event pages link to sponsors. |
| 5 | **Rotary Club of Ranchi** | Listed on [echai.ventures](https://echai.ventures/grid/ranchi/rotary-club-of-ranchi) | Provide sound for a community event (in kind, declared, not tied to reviews); club event write-ups credit partners. |

### B. Real-estate developers and interior designers
| # | Opportunity | URL / how to find | Pitch angle |
|---|---|---|---|
| 6 | Ranchi residential developer with premium villas or flats `[name to research]` | Search the RERA Jharkhand project list and developers' sites for "Ranchi villas" | "Home theatre–ready" spec for show flats; a link from the project amenities page to ROS. |
| 7 | Ranchi interior design studio `[name to research]` | Google Maps "interior designer Ranchi", Houzz.in, Instagram | Joint project write-up on both sites (photos [with permission]); a "trusted partners" page. |
| 8 | Second interior design or turnkey firm `[name to research]` | As above | Co-authored guide: "Planning a media room during renovation", hosted on their blog with a link to /home-theatre-ranchi/. |

### C. Architects and architecture education
| # | Opportunity | URL / how to find | Pitch angle |
|---|---|---|---|
| 9 | **BIT Mesra, Department of Architecture**, Ranchi | Department page `[URL to research]`; listed on [Archinect](https://archinect.com/bitmesra) | Guest lecture or workshop on room acoustics for home theatres; department news or event pages often link to speakers. |
| 10 | Indian Institute of Architects Jharkhand chapter / Ranchi centre `[existence to verify: not found in search]` | IIA national site, chapter list | CPD session on AV and acoustic planning for architects; supplier directory listing if one exists. |
| 11 | Architect directory profiles: Houzz.in (tracker row 12) plus `[Indian architect directory to research]` | https://www.houzz.in/ | Profile with project photos; architects find AV partners there. |

### D. Local news and lifestyle
| # | Opportunity | URL / how to find | Pitch angle |
|---|---|---|---|
| 12 | **Prabhat Khabar** (Ranchi-based Hindi daily), city or lifestyle desk | https://www.prabhatkhabar.com/ ; desk contact `[to research]` | Data-free trend story: "Ranchi homes are adding home cinemas". The owner's view since 2011; no invented numbers. |
| 13 | Ranchi lifestyle blog or Instagram page `[name to research]` | Instagram / Google "Ranchi lifestyle blog" | Invite to a demo evening; feature on a real install [with permission]. Must be clearly disclosed as a collaboration. |

### E. Brand partner pages (only if ROS is an authorised dealer)
| # | Opportunity | URL / how to find | Pitch angle |
|---|---|---|---|
| 14 | ViewSonic India reseller listing | https://www.viewsonic.com/in/shop/ | Listing as the Ranchi reseller; a case study on a boardroom or home-cinema install [with permission]. |
| 15 | Q Acoustics / Artsound dealer pages | Brand sites, *Where to buy* `[exact URLs to research]` | Dealer listing with the exact NAP; offer a Ranchi install photo for the brand's social media or gallery with credit. |

**Avoid:** paid links, link exchanges, PBNs, "Ranchi top 10" directories that charge for inclusion, and do-follow links in exchange for free equipment. Sponsorship links should be `rel="sponsored"` or `nofollow` on the host side; that's fine, because the value is local relevance and referrals.

---

## Placeholders in this file
- [Beside Javed Habib Salon, PP Compound, Main Road, Ranchi, Jharkhand 834001 — CONFIRM]
- [e.g. "Service"] label for +91 82109 55476
- [e.g. Mon–Sat 10 am – 8 pm, Sun closed — CONFIRM]
- [+91 85802 39007 — confirm] WhatsApp
- [Facebook URL] [Instagram URL] [YouTube URL] [LinkedIn URL]
- [directory names to research] (Ranchi directories)
- [exact locator URL to research] (Q Acoustics), [exact URL to research] (Artsound)
- [name to research] (Q Acoustics and Artsound Indian distributor/importer)
- [ROS to confirm] rosdc.in ownership
- [fjcci.org — verify]
- [to research] Jharkhand Small Industries Association website; Prabhat Khabar desk contact
- [name/URL to research] CREDAI Jharkhand chapter
- [name to research] developer, interior design studios, lifestyle blog
- [URL to research] BIT Mesra architecture department page
- [existence to verify: not found in search] IIA Jharkhand / Ranchi
- [Indian architect directory to research]
- [with permission] client names and photos
