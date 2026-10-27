// Build: pre-renders every route to static HTML (real URLs, works without JS)
// and produces a single self-contained HTML file for offline sharing.
//   node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const SINGLE = path.join(ROOT, 'dist-single');
const CONTENT_FILES = ['data.js', 'art.js', 'components.js', 'features.js', 'pages-main.js', 'pages-more.js', 'guides.js'];
const BROWSER_FILES = ['sound.js', 'fx.js', 'app.js']; // browser-only behaviour

const read = (f) => fs.readFileSync(path.join(SRC, f), 'utf8');
const css = read('styles.css');
const contentJs = CONTENT_FILES.map(read).join('\n');
const appJs = BROWSER_FILES.map(read).join('\n');
// Content hashes for cache-busting: a changed file gets a new ?v=, so browsers never mix old and new CSS/JS.
const hash = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);
const cssV = hash(css);
// Same for every image and video: { 'img/atmos.webp': '<hash>', 'video/ros-reel.mp4': '<hash>' }
const ASSET_V = {};
for (const dir of ['img', 'video']) for (const f of fs.readdirSync(path.join(SRC, dir))) ASSET_V[dir + '/' + f] = hash(fs.readFileSync(path.join(SRC, dir, f)));
// site.js carries the map so pages rendered in the browser get the same versioned URLs
const siteJs = `(window.ROS = window.ROS || {}).ASSET_V = ${JSON.stringify(ASSET_V)};\n` + contentJs + '\n' + appJs;
const jsV = hash(siteJs);
const IMG_DIR = path.join(SRC, 'img');
const imgFiles = fs.readdirSync(IMG_DIR).filter((f) => f.endsWith('.webp'));

function loadContent(hrefFn, inlineImgs) {
  const ctx = { console, ROS: inlineImgs ? { IMG_INLINE: inlineImgs } : { ASSET_V } };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(contentJs, ctx);
  const R = ctx.ROS;
  if (hrefFn) R.href = hrefFn;
  return R;
}

const FONTS = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function shell(R, route, page, { inline, mode }) {
  const C = R.CONFIG;
  const abs = C.origin + route.path;
  const ld = R.schemaFor(route, page.faqs);
  const styles = inline ? `<style>${css}</style>` : `<link rel="stylesheet" href="/assets/site.css?v=${cssV}">`;
  const scripts = inline
    ? `<script>window.ROS_MODE=${JSON.stringify(mode)};window.ROS={IMG_INLINE:${JSON.stringify(R.IMG_INLINE)}};</script><script>${contentJs}\n${appJs}</script>`
    : `<script src="/assets/site.js?v=${jsV}" defer></script>`;
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(route.title)}</title>
<meta name="description" content="${esc(route.description)}">
<!-- PROTOTYPE: keep staging out of search. Remove noindex in production. -->
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${abs}">
<meta property="og:type" content="${route.schema && route.schema.includes('article') ? 'article' : 'website'}">
<meta property="og:site_name" content="Republic of Sound Audio">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(route.title)}">
<meta property="og:description" content="${esc(route.description)}">
<meta property="og:url" content="${abs}">
<meta property="og:image" content="${C.origin}/wp-content/uploads/og/ros-default-1200x630.jpg"><!-- TODO: supply approved 1200×630 image -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(route.title)}">
<meta name="twitter:description" content="${esc(route.description)}">
<meta name="theme-color" content="#101112">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__rosBooted)document.documentElement.classList.remove('js')},2500);</script>
${styles}
${route.id === 'home' && !inline ? '' : ''}
<script type="application/ld+json" id="ld">${ld ? JSON.stringify(ld).replace(/</g, '\\u003c') : '{}'}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${R.ui.header()}
<main id="main" tabindex="-1" data-route="${route.id}">
${page.html}
</main>
${R.ui.footer().replace('</footer>', '<p class="proto-bar">Design prototype prepared by Arobuz for Republic of Sound Audio. Items marked “To confirm” await client approval.</p></footer>')}
${R.ui.actionBar()}
<div id="route-announcer" class="sr-only" aria-live="polite" aria-atomic="true"></div>
${scripts}
</body>
</html>
`;
}

function render(R, route) {
  R.art.resetIds();
  return R.pages[route.id](route);
}

// --- Multi-page static build (real URLs) ---
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'assets/site.css'), css);
fs.writeFileSync(path.join(DIST, 'assets/site.js'), siteJs);
fs.mkdirSync(path.join(DIST, 'assets/img'), { recursive: true });
for (const f of imgFiles) fs.copyFileSync(path.join(IMG_DIR, f), path.join(DIST, 'assets/img', f));
fs.cpSync(path.join(SRC, 'video'), path.join(DIST, 'assets/video'), { recursive: true });
const R = loadContent();
for (const route of R.ROUTES) {
  const page = render(R, route);
  const html = shell(R, route, page, { inline: false });
  const out = route.id === 'notfound' ? path.join(DIST, '404.html') : path.join(DIST, route.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}
const urls = R.ROUTES.filter((r) => !r.noindex).map((r) => `  <url><loc>${R.CONFIG.origin}${r.path}</loc></url>`).join('\n');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), '# Prototype/staging: block all crawlers. Production robots.txt is in docs/02-wordpress-handover.md\nUser-agent: *\nDisallow: /\n');

// --- Single self-contained file (hash routes; works from file:// and any static host) ---
fs.rmSync(SINGLE, { recursive: true, force: true });
fs.mkdirSync(SINGLE, { recursive: true });
const inline = Object.fromEntries(imgFiles.map((f) => [f.replace('.webp', ''), 'data:image/webp;base64,' + fs.readFileSync(path.join(IMG_DIR, f)).toString('base64')]));
const RS = loadContent((p) => '#' + p, inline);
const home = RS.routeById.home;
fs.writeFileSync(path.join(SINGLE, 'ros-prototype.html'), shell(RS, home, render(RS, home), { inline: true, mode: 'hash' }));

const size = (f) => (fs.statSync(f).size / 1024).toFixed(1) + ' KB';
console.log('Built', R.ROUTES.length, 'routes →', path.relative(ROOT, DIST));
console.log('site.js', size(path.join(DIST, 'assets/site.js')), '· site.css', size(path.join(DIST, 'assets/site.css')), '· home', size(path.join(DIST, 'index.html')));
console.log('Single file →', path.relative(ROOT, path.join(SINGLE, 'ros-prototype.html')), size(path.join(SINGLE, 'ros-prototype.html')));
