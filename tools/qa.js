const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const BASE = 'http://localhost:4173';
const SHOTS = path.join(__dirname, '..', '.qa', 'shots');
fs.mkdirSync(SHOTS, { recursive: true });
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const ROUTES = ['/', '/home-theatre-ranchi/', '/acoustic-treatment-ranchi/', '/home-automation-ranchi/', '/projectors-audio-gear/', '/cinema-seating/', '/corporate-av-jharkhand/', '/projects/', '/book-a-demo/', '/guides/', '/contact/', '/guides/home-theatre-cost-india/', '/guides/room-size-dolby-atmos/'];
const results = { pass: [], fail: [], info: [] };
const ok = (c, m) => (c ? results.pass : results.fail).push(m);
const info = (m) => results.info.push(m);

(async () => {
  const browser = await chromium.launch();
  const only = process.argv[2];

  if (!only || only === 'static') {
  // ---------- 1. Direct load of every route: structure, metadata, a11y ----------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  page.on('requestfailed', (r) => errors.push('REQFAIL ' + r.url()));
  const allLinks = new Set();
  const titles = new Set(), descs = new Set();
  for (const r of ROUTES) {
    const resp = await page.goto(BASE + r, { waitUntil: 'networkidle' });
    ok(resp.status() === 200, `${r} HTTP 200 (${resp.status()})`);
    const d = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
      const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
      let ld = null, ldErr = null;
      try { ld = JSON.parse(document.getElementById('ld').textContent); } catch (e) { ldErr = e.message; }
      const hrefs = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
      const ariaTargets = [...document.querySelectorAll('[aria-controls],[aria-labelledby],[aria-describedby]')].flatMap((e) =>
        ['aria-controls', 'aria-labelledby', 'aria-describedby'].flatMap((a) => (e.getAttribute(a) || '').split(/\s+/).filter(Boolean))).filter((id) => !document.getElementById(id));
      const inPage = hrefs.filter((h) => /^#[^/]/.test(h)).map((h) => h.slice(1)).filter((id) => !document.getElementById(id));
      return {
        h1: document.querySelectorAll('h1').length, title: document.title,
        desc: document.querySelector('meta[name=description]').content,
        canonical: document.querySelector('link[rel=canonical]').href,
        dup, ld, ldErr, hrefs, ariaTargets, inPage,
        ctaCount: document.querySelectorAll('main [data-cta]').length,
        emptyLinks: [...document.querySelectorAll('a')].filter((a) => !a.getAttribute('href') || a.getAttribute('href') === '#').length,
        jsBooted: !!window.__rosBooted,
        emptySvg: [...document.querySelectorAll('svg')].filter((v) => !v.children.length).length
      };
    });
    ok(d.jsBooted, `${r} JS booted`);
    ok(d.emptySvg === 0, `${r} no empty icons (${d.emptySvg})`);
    ok(d.h1 === 1, `${r} exactly one H1 (${d.h1})`);
    ok(d.dup.length === 0, `${r} no duplicate IDs ${d.dup.slice(0, 5).join(',')}`);
    ok(!d.ldErr && d.ld && d.ld['@graph'], `${r} JSON-LD parses (${d.ld && d.ld['@graph'] ? d.ld['@graph'].map((g) => g['@type']).join('+') : d.ldErr})`);
    ok(d.title.length <= 60, `${r} title ≤60 chars (${d.title.length}: ${d.title})`);
    ok(d.desc.length <= 160, `${r} description ≤160 (${d.desc.length})`);
    ok(d.canonical === 'https://rosaudio.com' + r, `${r} canonical ${d.canonical}`);
    ok(d.ariaTargets.length === 0, `${r} ARIA references resolve ${d.ariaTargets.join(',')}`);
    ok(d.inPage.length === 0, `${r} in-page anchors resolve ${d.inPage.join(',')}`);
    ok(d.ctaCount > 0, `${r} has tracked CTAs (${d.ctaCount})`);
    ok(d.emptyLinks === 0, `${r} no empty/# links`);
    titles.add(d.title); descs.add(d.desc);
    d.hrefs.forEach((h) => allLinks.add(h));
    // axe
    await page.addScriptTag({ content: AXE });
    const axe = await page.evaluate(async () => {
      // reveal everything so axe sees final colours
      document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in'));
      await new Promise((r) => setTimeout(r, 1200));
      const res = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] });
      return res.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 2).map((n) => n.target.join(' ') + ' :: ' + (n.failureSummary || '').split('\n')[1]) }));
    });
    const serious = axe.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    ok(serious.length === 0, `${r} axe: no serious/critical violations ${JSON.stringify(serious)}`);
    if (axe.length) info(`${r} axe minor: ${JSON.stringify(axe.map((v) => v.id + '(' + v.impact + ',' + v.n + ')'))}`);
  }
  ok(titles.size === ROUTES.length, `titles unique (${titles.size}/${ROUTES.length})`);
  ok(descs.size === ROUTES.length, `descriptions unique (${descs.size}/${ROUTES.length})`);
  // internal links resolve
  const internal = [...allLinks].filter((h) => h.startsWith('/'));
  for (const h of internal) {
    const p = h.split('#')[0];
    const res = await page.request.get(BASE + p);
    ok(res.status() === 200, `link ${h} → ${res.status()}`);
  }
  const external = [...allLinks].filter((h) => /^https?:/.test(h));
  info('External links: ' + external.join(' | '));
  info('tel/mailto: ' + [...allLinks].filter((h) => /^(tel|mailto):/.test(h)).join(' | '));
  ok(errors.length === 0, `no console errors / failed requests on direct loads ${errors.slice(0, 5).join(' || ')}`);
  await ctx.close();
  }

  if (!only || only === 'layout') {
  // ---------- 2. Layout: horizontal overflow + screenshots ----------
  for (const [w, h, label] of [[375, 812, 'mobile'], [820, 1180, 'tablet'], [1440, 900, 'desktop']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: w < 900, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    for (const r of ROUTES) {
      await p.goto(BASE + r, { waitUntil: 'networkidle' });
      const ov = await p.evaluate(() => {
        const W = document.documentElement.clientWidth;
        const bad = [...document.querySelectorAll('body *')].filter((e) => { const b = e.getBoundingClientRect(); return b.width && (b.right > W + 1) && getComputedStyle(e).position !== 'fixed' && !e.closest('.tbl-wrap,.days,.drawer,.sr-only,.hp,.hero-media,.cta-band .bg,.skip'); }).slice(0, 4).map((e) => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right));
        return { sw: document.documentElement.scrollWidth, W, bad };
      });
      ok(ov.sw <= ov.W, `${label} ${r} no horizontal scroll (${ov.sw}/${ov.W}) ${ov.bad.join(' ; ')}`);
      if (['/', '/projects/', '/book-a-demo/', '/guides/room-size-dolby-atmos/', '/contact/', '/projectors-audio-gear/'].includes(r)) {
        await p.screenshot({ path: path.join(SHOTS, `${label}${r.replace(/\//g, '_') || '_home'}.png`), fullPage: true });
      }
    }
    // mobile action bar must not cover the footer's last content
    if (label === 'mobile') {
      const bar = await p.evaluate(() => { const b = document.querySelector('.action-bar'); return b && getComputedStyle(b).display; });
      ok(bar === 'grid', `mobile action bar visible (${bar})`);
    }
    await ctx.close();
  }
  }

  if (!only || only === 'interact') {
  // ---------- 3. Interactions ----------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  // hero choreography completes
  await p.waitForTimeout(1600);
  const heroDone = await p.evaluate(() => [...document.querySelectorAll('.hero [data-hero]')].every((e) => getComputedStyle(e).opacity === '1') && /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/.test(getComputedStyle(document.querySelector('.hero .line > span')).transform));
  ok(heroDone, 'hero choreography finishes with content visible');
  // header becomes solid
  await p.mouse.wheel(0, 600); await p.waitForTimeout(400);
  ok(await p.evaluate(() => document.querySelector('.site-header').classList.contains('is-solid')), 'header turns solid on scroll');
  // reveals trigger
  await p.evaluate(() => document.getElementById('svc-h').scrollIntoView()); await p.waitForTimeout(900);
  ok(await p.evaluate(() => document.querySelectorAll('[data-reveal].is-in').length > 3), 'scroll reveals trigger');
  // every reveal inside the first viewport must actually reveal (guards against IO/clip bugs)
  for (const r of ['/home-theatre-ranchi/', '/acoustic-treatment-ranchi/', '/projects/', '/book-a-demo/']) {
    await p.goto(BASE + r, { waitUntil: 'networkidle' }); await p.waitForTimeout(1300);
    const stuck = await p.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => { const b = e.getBoundingClientRect(); return b.top < innerHeight * 0.85 && b.bottom > 0 && b.height > 0 && !e.classList.contains('is-in'); }).map((e) => e.className).slice(0, 3));
    ok(stuck.length === 0, `${r} all in-view reveals fire ${stuck.join(' | ')}`);
  }
  await p.goto(BASE + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  // ---- Sound edition features ----
  const feat = await p.evaluate(async () => {
    const out = {};
    const st = document.querySelector('[data-sound-toggle]');
    st.click(); out.toggleOn = st.getAttribute('aria-pressed'); st.click(); out.toggleOff = st.getAttribute('aria-pressed');
    const play = document.getElementById('play-hero');
    play.click(); await new Promise(r => setTimeout(r, 400));
    out.playing = play.getAttribute('aria-pressed'); out.htmlPlaying = document.documentElement.classList.contains('is-playing');
    out.energy = getComputedStyle(document.querySelector('.hero--terrain')).getPropertyValue('--energy');
    play.click(); await new Promise(r => setTimeout(r, 500));
    out.stopped = play.getAttribute('aria-pressed');
    const spx = document.getElementById('spx-home');
    const count = () => spx.querySelectorAll('.spk:not(.is-off)').length;
    out.c714 = count();
    spx.querySelector('[data-layout-btn="5.1"]').click(); out.c51 = count();
    spx.querySelector('[data-layout-btn="5.1.2"]').click(); out.c512 = count();
    spx.querySelector('.spk[data-spk="TML"]').click(); out.spxStatus = spx.querySelector('[data-spx-status]').textContent;
    const asim = document.getElementById('asim-home'); const r = asim.querySelector('[data-treat]');
    r.value = 100; r.dispatchEvent(new Event('input', { bubbles: true })); out.rt = asim.querySelector('[data-rt]').textContent;
    asim.querySelector('[data-clap]').click();
    out.hpinned = document.querySelector('[data-hscroll]').classList.contains('is-pinned');
    out.hheight = document.querySelector('[data-hscroll]').offsetHeight;
    out.ctxState = window.ROS.sound.analyser() ? 'ok' : 'none';
    return out;
  });
  ok(feat.toggleOn === 'true' && feat.toggleOff === 'false', 'sound toggle switches on/off ' + JSON.stringify([feat.toggleOn, feat.toggleOff]));
  ok(feat.playing === 'true' && feat.htmlPlaying && feat.stopped === 'false', 'Play-the-room starts and stops ' + JSON.stringify(feat));
  ok(feat.ctxState === 'ok', 'Web Audio graph created after gesture');
  ok(feat.c714 === 12 && feat.c51 === 6 && feat.c512 === 8, `speaker explorer layouts 7.1.4/5.1/5.1.2 → ${feat.c714}/${feat.c51}/${feat.c512}`);
  ok(/Top middle left/.test(feat.spxStatus), 'speaker tap announces position: ' + feat.spxStatus);
  ok(feat.rt === '0.30 s', 'acoustic slider updates RT60 (' + feat.rt + ')');
  ok(feat.hpinned && feat.hheight > 1200, `process section pinned for horizontal scroll (${feat.hheight}px)`);
  // horizontal track moves with scroll
  const hs = await p.evaluate(async () => { const el = document.querySelector('[data-hscroll]'); window.scrollTo(0, el.offsetTop + (el.offsetHeight - innerHeight) / 2); await new Promise(r => setTimeout(r, 300)); return getComputedStyle(el.querySelector('.hs-track')).transform; });
  ok(/matrix\(1, 0, 0, 1, -\d/.test(hs), 'horizontal track translates on vertical scroll (' + hs + ')');
  await p.goto(BASE + '/guides/room-size-dolby-atmos/', { waitUntil: 'networkidle' });
  const tools = await p.evaluate(() => {
    const pl = document.getElementById('rp-atmos'); const set = (n, v) => { const i = pl.querySelector('[data-dim="' + n + '"]'); i.value = v; i.dispatchEvent(new Event('input', { bubbles: true })); };
    set('l', 3.6); set('w', 3); set('h', 2.3); const small = pl.querySelector('.plan-rec').textContent + ' | ' + !!pl.querySelector('.plan-note');
    set('l', 6.2); set('w', 4.3); set('h', 2.7); const mid = pl.querySelector('.plan-rec').textContent;
    const sc = document.getElementById('sc-atmos'); const r = sc.querySelector('[data-dist]'); r.value = 3.5; r.dispatchEvent(new Event('input', { bubbles: true }));
    return { small, mid, s30: sc.querySelector('[data-s30]').textContent, s40: sc.querySelector('[data-s40]').textContent };
  });
  ok(/soundbar/.test(tools.small) && /true/.test(tools.small), 'room planner: small low room → 5.1/soundbar + ceiling note (' + tools.small + ')');
  ok(tools.mid === '7.1.4', 'room planner: 6.2×4.3 → 7.1.4 (' + tools.mid + ')');
  ok(tools.s30.startsWith('85″') && tools.s40.startsWith('115″'), 'screen calc 3.5 m → 85″/115″ matches guide table (' + tools.s30 + ', ' + tools.s40 + ')');
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  // SPA nav via services menu
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.click('.nav-trigger');
  ok(await p.isVisible('#svc-menu a[data-nav="acoustics"]'), 'services menu opens on click');
  await p.keyboard.press('Escape');
  ok(!(await p.evaluate(() => document.getElementById('svc-menu').classList.contains('is-open'))), 'services menu closes on Escape');
  await p.click('.nav-trigger');
  await p.click('#svc-menu a[data-nav="acoustics"]');
  await p.waitForTimeout(500);
  ok(p.url() === BASE + '/acoustic-treatment-ranchi/', `SPA nav pushes real URL (${p.url()})`);
  ok((await p.title()).startsWith('Acoustic Treatment'), 'title updates on route change');
  ok(await p.evaluate(() => document.querySelector('meta[name=description]').content.startsWith('Acoustic')), 'meta description updates');
  ok(await p.evaluate(() => JSON.parse(document.getElementById('ld').textContent)['@graph'].some((g) => g['@type'] === 'Service')), 'JSON-LD updates on route change');
  ok(await p.evaluate(() => document.querySelector('.nav-trigger').classList.contains('is-active')), 'Services nav shows active state');
  ok(await p.evaluate(() => document.activeElement && document.activeElement.tagName === 'H1'), 'focus moves to H1 after navigation');
  // FAQ
  const fb = p.locator('.faq-btn').first();
  await fb.scrollIntoViewIfNeeded(); await fb.click(); await p.waitForTimeout(400);
  ok((await fb.getAttribute('aria-expanded')) === 'true', 'FAQ opens (aria-expanded)');
  const panelH = await p.evaluate(() => document.getElementById(document.querySelector('.faq-btn').getAttribute('aria-controls')).getBoundingClientRect().height);
  ok(panelH > 40, `FAQ panel shows full text (${Math.round(panelH)}px)`);
  await fb.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  ok((await fb.getAttribute('aria-expanded')) === 'false', 'FAQ closes with keyboard Enter');
  // back / forward
  await p.evaluate(() => window.scrollTo(0, 900)); await p.waitForTimeout(100);
  await p.goBack(); await p.waitForTimeout(500);
  ok(p.url() === BASE + '/' && (await p.title()).startsWith('Home Theatre & Hi-Fi Experts'), 'browser Back restores home + title');
  await p.goForward(); await p.waitForTimeout(500);
  ok(p.url().endsWith('/acoustic-treatment-ranchi/'), 'browser Forward works');
  const sy = await p.evaluate(() => window.scrollY);
  ok(sy > 500, `scroll position restored on Forward (${sy})`);
  // Projects filter
  await p.goto(BASE + '/projects/', { waitUntil: 'networkidle' });
  ok(!(await p.isVisible('[data-filter-empty="projects"]')), 'project empty state hidden when results exist');
  await p.click('[data-filter-group="projects"] [data-filter="corporate"]');
  let vis = await p.evaluate(() => [...document.querySelectorAll('[data-filter-target="projects"] > *')].filter((e) => !e.hidden).length);
  ok(vis === 2, `project filter Corporate → 2 (${vis})`);
  ok((await p.textContent('[data-filter-status="projects"]')).includes('2 projects'), 'filter status announces count');
  await p.click('[data-filter="acoustics"]');
  vis = await p.evaluate(() => [...document.querySelectorAll('[data-filter-target="projects"] > *')].filter((e) => !e.hidden).length);
  ok(vis === 1, `project filter Acoustics → 1 (${vis})`);
  await p.click('[data-filter="all"]');
  vis = await p.evaluate(() => [...document.querySelectorAll('[data-filter-target="projects"] > *')].filter((e) => !e.hidden).length);
  ok(vis === 6, `project filter All → 6 (${vis})`);
  // card → case study anchor
  await p.click('a[href="#case-2"]'); await p.waitForTimeout(900);
  const caseTop = await p.evaluate(() => document.getElementById('case-2').getBoundingClientRect().top);
  ok(caseTop >= 0 && caseTop < 200, `project card scrolls to case study, below sticky header (${Math.round(caseTop)}px)`);
  // Gear filter
  await p.goto(BASE + '/projectors-audio-gear/', { waitUntil: 'networkidle' });
  await p.click('[data-filter-group="gear"] [data-filter="projectors"]');
  vis = await p.evaluate(() => [...document.querySelectorAll('[data-filter-target="gear"] > *')].filter((e) => !e.hidden).length);
  ok(vis === 5, `gear filter Projectors → 5 (${vis})`);
  // Form validation
  await p.goto(BASE + '/contact/', { waitUntil: 'networkidle' });
  const F = '#enq-contact';
  await p.click(F + ' button[type=submit]');
  ok(await p.isVisible('#enq-contact-summary'), 'empty submit shows error summary');
  ok(await p.evaluate(() => document.activeElement.id === 'enq-contact-summary'), 'error summary receives focus');
  const nErr = await p.evaluate(() => document.querySelectorAll('#enq-contact [aria-invalid="true"]').length);
  ok(nErr >= 6, `required fields marked aria-invalid (${nErr})`);
  await p.fill(F + '-name', 'Test User');
  await p.fill(F + '-phone', '12345');
  await p.click(F + ' button[type=submit]');
  ok((await p.textContent('#enq-contact-phone-e')).includes('10-digit'), 'invalid phone rejected (12345)');
  for (const good of ['98765 43210', '+91 98765-43210', '09876543210']) {
    const v = await p.evaluate((g) => window.ROS.app.cleanPhone(g), good);
    ok(/^[6-9]\d{9}$/.test(v), `phone normalises: "${good}" → ${v}`);
  }
  ok(!/^[6-9]\d{9}$/.test(await p.evaluate(() => window.ROS.app.cleanPhone('5876543210'))), 'phone starting with 5 rejected');
  await p.fill(F + '-phone', '98765 43210');
  await p.selectOption(F + '-room', 'Dedicated room');
  await p.selectOption(F + '-budget', '₹10–25 lakh');
  await p.fill(F + '-location', 'Ranchi');
  await p.check(F + ' input[name=contact][value="WhatsApp"]');
  // form draft survives navigation
  await p.click('a[data-nav="guides"]'); await p.waitForTimeout(400);
  await p.goBack(); await p.waitForTimeout(500);
  ok((await p.inputValue(F + '-location')) === 'Ranchi', 'form draft preserved across route change');
  await p.check(F + '-consent');
  await p.click(F + ' button[type=submit]');
  await p.waitForTimeout(200);
  const resTxt = await p.textContent('#enq-contact-result');
  ok(/not sent/i.test(resTxt) && /has not been delivered/i.test(resTxt), 'valid submit shows honest "not sent" state');
  ok(await p.evaluate(() => document.activeElement.id === 'enq-contact-result'), 'result state receives focus');
  ok(await p.evaluate(() => window.dataLayer.some((e) => e.event === 'form_validated_prototype')), 'form event pushed to dataLayer');
  // corporate form
  await p.goto(BASE + '/corporate-av-jharkhand/', { waitUntil: 'networkidle' });
  await p.click('#enq-corp button[type=submit]');
  ok(await p.isVisible('#enq-corp-summary'), 'corporate form validates');
  await p.click('a[href="#proposal"]'); await p.waitForTimeout(900);
  ok(await p.evaluate(() => Math.abs(document.getElementById('proposal').getBoundingClientRect().top) < 120), 'in-page CTA scrolls to proposal form');
  // Slot picker simulation
  await p.goto(BASE + '/book-a-demo/', { waitUntil: 'networkidle' });
  await p.click('.day[data-day="Tue"]'); await p.click('.slot[data-slot="15:00"]');
  const st = await p.textContent('[data-slot-result]');
  ok(/Nothing has been booked/.test(st) && /calendly/i.test(await p.getAttribute('[data-slot-result] a', 'href')), 'slot picker labels simulation and hands off to Calendly');
  ok(await p.evaluate(() => [...document.querySelectorAll('a[href*="calendly.com"]')].every((a) => a.href === 'https://calendly.com/connect-rosaudio/30min' && a.target === '_blank')), 'all Calendly links use supplied URL');
  ok(await p.evaluate(() => [...document.querySelectorAll('a[href^="tel:"]')].every((a) => a.getAttribute('href') === 'tel:+918580239007')), 'all tel: links use main number');
  ok(await p.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]')].every((a) => a.href.startsWith('https://wa.me/918580239007'))), 'all WhatsApp links use one number');
  ok(await p.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]')].every((a) => !a.href.includes('?text='))), 'no WhatsApp prefill while number unconfirmed');
  // tracking
  ok(await p.evaluate(() => { document.querySelector('[data-cta="book-demo-header"]').addEventListener('click', (e) => e.preventDefault(), { once: true }); document.querySelector('[data-cta="book-demo-header"]').click(); return window.dataLayer.some((e) => e.event === 'cta_click' && e.cta === 'book-demo-header'); }), 'CTA clicks push cta_click events');
  // 404 for unknown route in SPA
  await p.evaluate(() => window.ROS.app.navigate('/does-not-exist/')); await p.waitForTimeout(400);
  ok((await p.title()).startsWith('Page not found'), 'unknown route renders 404 page');
  // Keyboard: skip link
  await p.goto(BASE + '/guides/', { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  ok(await p.evaluate(() => document.activeElement.classList.contains('skip')), 'first Tab focuses skip link');
  const outline = await p.evaluate(() => getComputedStyle(document.activeElement).outlineStyle + ' ' + getComputedStyle(document.activeElement).top);
  info('skip link focus style: ' + outline);
  await p.keyboard.press('Tab'); await p.keyboard.press('Tab');
  const fo = await p.evaluate(() => { const s = getComputedStyle(document.activeElement); return s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor; });
  ok(/solid 2px/.test(fo), `visible focus ring on nav (${fo})`);
  ok(errs.length === 0, `no runtime errors during interactions ${errs.join(' | ')}`);
  await ctx.close();

  // ---------- 4. Mobile menu ----------
  const m = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const mp = await m.newPage();
  await mp.goto(BASE + '/', { waitUntil: 'networkidle' });
  await mp.click('.menu-btn'); await mp.waitForTimeout(400);
  ok(await mp.isVisible('#drawer a[data-nav="seating"]'), 'mobile drawer opens');
  ok((await mp.getAttribute('.menu-btn', 'aria-expanded')) === 'true', 'menu button aria-expanded=true');
  ok(await mp.evaluate(() => document.body.classList.contains('menu-open')), 'body scroll locked while menu open');
  await mp.keyboard.press('Escape'); await mp.waitForTimeout(400);
  ok(await mp.evaluate(() => document.getElementById('drawer').hidden), 'drawer closes on Escape');
  await mp.click('.menu-btn'); await mp.waitForTimeout(350);
  await mp.click('#drawer a[data-nav="seating"]'); await mp.waitForTimeout(500);
  ok(mp.url().endsWith('/cinema-seating/') && await mp.evaluate(() => document.getElementById('drawer').hidden), 'drawer link navigates and closes menu');
  const bar = await mp.evaluate(() => [...document.querySelectorAll('.action-bar a')].map((a) => a.getAttribute('data-cta') + '=' + a.getAttribute('href')));
  ok(bar.length === 3, 'mobile bar has Call / WhatsApp / Book demo: ' + bar.join(', '));
  const tap = await mp.evaluate(() => [...document.querySelectorAll('.action-bar a, .menu-btn')].every((a) => a.getBoundingClientRect().height >= 44));
  ok(tap, 'mobile tap targets ≥44px');
  await m.close();

  // ---------- 5. Reduced motion ----------
  const rm = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const rp = await rm.newPage();
  await rp.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await rp.waitForTimeout(250);
  const rmState = await rp.evaluate(() => ({
    reveal: [...document.querySelectorAll('[data-reveal]')].every((e) => getComputedStyle(e).opacity === '1'),
    hero: getComputedStyle(document.querySelector('.hero [data-hero]')).opacity,
    wave: document.querySelector('[data-wave]').classList.contains('is-live'),
    anim: getComputedStyle(document.querySelector('.wave i')).animationName
  }));
  ok(rmState.reveal, 'reduced motion: all reveal content visible immediately');
  ok(rmState.hero === '1', 'reduced motion: hero content visible immediately');
  ok(!rmState.wave, 'reduced motion: waveform loop disabled');
  await rm.close();

  // ---------- 6. No-JS ----------
  const nj = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
  const np = await nj.newPage();
  await np.goto(BASE + '/home-theatre-ranchi/');
  const noJs = await np.evaluate(() => ({ h1: document.querySelector('h1').textContent, op: getComputedStyle(document.querySelector('[data-reveal]')).opacity, faq: getComputedStyle(document.querySelector('.faq-panel')).visibility }));
  ok(noJs.h1.includes('Home theatre') && noJs.op === '1' && noJs.faq === 'visible', `no-JS: content and FAQ answers visible (${JSON.stringify(noJs)})`);
  await nj.close();

  // ---------- 7. Single-file build over file:// ----------
  const sf = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const sp = await sf.newPage();
  const sErr = [];
  sp.on('pageerror', (e) => sErr.push(e.message));
  const fileUrl = 'file://' + path.resolve(__dirname + '/../dist-single/ros-prototype.html');
  await sp.goto(fileUrl);
  await sp.click('a[data-nav="projects"]'); await sp.waitForTimeout(500);
  ok(sp.url().endsWith('#/projects/') && (await sp.title()).startsWith('Home Theatre Projects'), 'single-file: hash routing to /projects/');
  await sp.click('a[href="#case-1"]'); await sp.waitForTimeout(600);
  ok(sp.url().endsWith('#/projects/#case-1'), 'single-file: in-page anchor keeps route (' + sp.url().split('#').slice(1).join('#') + ')');
  await sp.goto(fileUrl + '#/guides/room-size-dolby-atmos/');
  await sp.reload(); await sp.waitForTimeout(400);
  ok((await sp.title()).startsWith('Room Size for Dolby Atmos'), 'single-file: direct/refresh of nested hash route');
  await sp.goBack(); await sp.waitForTimeout(400);
  ok(sErr.length === 0, 'single-file: no runtime errors ' + sErr.join('|'));
  await sf.close();
  }

  if (!only || only === 'perf') {
  // ---------- 8. Lab performance (local server; throttled) ----------
  for (const r of ['/', '/guides/home-theatre-cost-india/']) {
    const pc = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const pp = await pc.newPage();
    const cdp = await pc.newCDPSession(pp);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await pp.addInitScript(() => {
      window.__lcp = 0; window.__cls = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await pp.goto(BASE + r, { waitUntil: 'load' });
    await pp.waitForTimeout(3500);
    await pp.mouse.wheel(0, 1500); await pp.waitForTimeout(800);
    const m2 = await pp.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), fcp: Math.round((performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime || 0) }));
    info(`PERF ${r} (local server, 150ms RTT, 1.6Mbps, 4x CPU, mobile): FCP ${m2.fcp}ms, LCP ${m2.lcp}ms, CLS ${m2.cls}`);
    ok(m2.cls <= 0.1, `${r} lab CLS ≤0.1 (${m2.cls})`);
    await pc.close();
  }
  }

  await browser.close();
  console.log('PASS', results.pass.length, 'FAIL', results.fail.length);
  results.fail.forEach((f) => console.log('  ✗', f));
  results.info.forEach((f) => console.log('  ·', f));
  fs.writeFileSync(path.join(__dirname, '..', '.qa', 'results.json'), JSON.stringify(results, null, 2));
})().catch((e) => { console.error('QA CRASH', e); process.exit(1); });
