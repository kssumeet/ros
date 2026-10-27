# 04 — QA report

**Run:** 28 October 2026, after the sound-edition redesign, using `tools/qa.js` (Playwright with Chromium 156 and axe-core 4) against `node tools/serve.mjs`.
**Result:** 320 checks passed, 0 failed.

To re-run:
```
npm i playwright axe-core
npx playwright install chromium
node tools/serve.mjs &
node tools/qa.js
```

## Tested and passing

**Sound edition:**
- The sound toggle switches on and off.
- "Play the room" starts, sets the playing state and stops; the Web Audio graph is created only after a click.
- The speaker explorer shows 12, 6 and 8 speakers for 7.1.4, 5.1 and 5.1.2, and announces each speaker's position when tapped.
- The acoustic slider updates RT60 (0.30 s when fully treated).
- The process section pins and its track moves sideways as you scroll.
- The room planner returns a soundbar/5.1 suggestion with a ceiling warning for 3.6×3×2.3 m, and 7.1.4 for 6.2×4.3 m.
- The screen calculator gives 85″ and 115″ at 3.5 m, matching the guide's table.
- Every reveal inside the first screen of 4 inner pages actually fires. This test was added after a real bug: the photo mask reveal never triggered, because clipping the observed element made IntersectionObserver report zero.

**Not checked by test:** whether the synthesised sounds sound good. That was judged by design intent only, and headless Chromium produces no audible output.


**Every route, loaded directly** (13 pages: all 11 required pages plus 2 guides):
- Each returns HTTP 200 and the JavaScript boots.
- Each has exactly one H1, no duplicate IDs and no empty icons.
- The JSON-LD parses on every page.
- Titles are 60 characters or fewer and descriptions 160 or fewer; both are unique across pages.
- Each canonical equals `https://rosaudio.com` plus the path.
- All ARIA ID references and in-page anchors resolve.
- Every page has tracked CTAs.
- There are no console errors and no failed network requests.

**Links and contact actions:**
- Every internal link resolves with a 200.
- All `tel:` links use +918580239007.
- All WhatsApp links use one number, with no prefilled text while that number is unconfirmed.
- All Calendly links use the supplied URL and open in a new tab.

**Accessibility:**
- axe-core finds no violations of WCAG 2 A, AA, 2.1 AA or best-practice rules on any page. The first run found real contrast failures, which were fixed.
- The skip link is the first Tab stop, and the navigation shows a visible 2px focus ring.

**Layout:**
- No horizontal scrolling on any page at 375, 820 or 1440 pixels wide. The first run found three overflow bugs, which were fixed.
- The mobile action bar is present and its tap targets are at least 44px.

**Motion and navigation:**
- The hero choreography completes and leaves all content visible.
- The header turns solid once you scroll.
- Scroll reveals fire.

**Desktop navigation:**
- The Services menu opens on click and closes with Escape.
- Client-side navigation pushes the real URL and updates the title, meta description and JSON-LD.
- The Services item shows its active state.
- Focus moves to the H1 after each navigation.
- Back and Forward work and restore the scroll position. The first run found a restoration bug, which was fixed.
- Unknown routes show the 404 page.

**Mobile menu:**
- It opens with `aria-expanded` set and locks page scrolling.
- Escape closes it.
- Following a link navigates and closes the menu.

**FAQ:** opens with a click, closes with Enter, updates `aria-expanded`, and shows the full answer text.

**Filters:**
- On Projects, the counts are correct for All (6), Corporate (1) and Acoustics (2), and the status text announces each change.
- The empty state stays hidden while there are results. This was a bug found on visual review, now fixed.
- The case-study anchor lands below the sticky header.
- On Projectors & gear, the Projectors filter shows 5 categories.

**Forms:**
- An empty submit shows a focused error summary and marks 6 or more fields invalid.
- The phone number "12345" is rejected, as is a number starting with 5.
- The phone formats `98765 43210`, `+91 98765-43210` and `09876543210` are accepted.
- A draft survives navigating away and back.
- A valid submit shows the honest "Details checked — not sent" state, moves focus to it, and pushes a `dataLayer` event.
- The corporate form validates.
- The in-page CTA scrolls to the corporate proposal form.

**Slot picker:** it is labelled as a simulation, states "Nothing has been booked", and hands off to Calendly.

**Reduced motion:** content is visible immediately and the waveform loop is disabled.

**No JavaScript:** content and FAQ answers are all visible.

**Single-file build over `file://`:**
- Hash routing works.
- In-page anchors keep the current route.
- Loading or refreshing a nested hash route directly works.
- There are no runtime errors.

## Lab performance (not field data)
Mobile emulation, local server, 150 ms RTT, 1.6 Mbps, 4× CPU slowdown:

| Page | FCP | LCP | CLS |
|---|---|---|---|
| Home (spectrogram hero) | 1.45 s | **2.28 s** | 0.003 |
| Cost guide | 0.83 s | 0.83 s | 0.019 |

The home page got heavier in the sound edition: a photo hero, 220 KB of script and 71 KB of CSS. Its LCP is now just inside the 2.5 s target, and first paint is slower than on the guide pages. I tested removing the hero preload and it made no difference. The next things to try are splitting `fx.js` and `sound.js` off the critical path and self-hosting the fonts.

Two problems were found and fixed in the first build:
- **Home LCP was 3.55 s.** The hero copy waited for the 169 KB script before animating. The choreography is now CSS-only.
- **CLS was 0.08.** The display webfont swap rewrapped the H1. Metric-matched fallback faces fixed it.

These figures come from a local machine with no CDN and no real-world network variation. INP was not measured, because it needs real user interaction data. Verify Core Web Vitals in the field after launch, using CrUX, Search Console or RUM.

## Not tested, or only partly tested
- **Calendly availability.** The URL returns 200 with the title "30 Minute Meeting - RosAudio", but slot availability loads through JavaScript and was not checked. No booking was made.
- **WhatsApp and phone actions on a real device.** The link formats were verified, but nothing was actually opened or dialled.
- **Safari, Firefox and real iOS or Android devices.** Only Chromium was used. View Transitions fall back to a fade in browsers that don't support them, and that fallback path was not tested.
- **Screen readers** (VoiceOver, NVDA, TalkBack). Not tested by hand. Only ARIA structure and axe rules were checked automatically.
- **Google Rich Results Test.** Not run, because the prototype isn't public. The JSON-LD was checked only for valid syntax and the expected types.
- **The live rosaudio.com in an interactive browser.** The audit is based on HTML fetched over HTTP. See `01-research-audit.md`.
- **Form delivery, spam protection and consent storage.** There is no backend by design. These are production tasks.
- **Print styles.** Only a basic print stylesheet exists.
