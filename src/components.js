/* ROS prototype — shared, reusable components (map 1:1 to WordPress blocks/partials). */
(function (R) {
  'use strict';
  var C = R.CONFIG, A = R.art;

  // href(): production paths everywhere; the browser router swaps to hash links on file://.
  R.href = R.href || function (p) { return p; };
  function link(id) { return R.href(R.routeById[id].path); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function arr() { return A.icon('arrow', 'ico arr'); }
  function tbc(label) { return '<span class="tbc">' + A.icon('info', 'ico') + (label || 'To confirm') + '</span>'; }
  function lines(arrLines) {
    return arrLines.map(function (l, i) { return '<span class="line"><span style="--li:' + i + '">' + l + '</span></span>'; }).join('');
  }

  /* ---------- CTA buttons (all carry data-cta for tracking) ---------- */
  function btnDemo(cta, label, cls) {
    var variant = cls && /btn--(ghost|dark)/.test(cls) ? '' : ' btn--primary';
    return '<a class="btn' + variant + (cls ? ' ' + cls : '') + '" href="' + link('demo') + '" data-cta="' + cta + '">' + (label || 'Book a free demo') + arr() + '</a>';
  }
  function btnWA(cta, label, cls, ctx) {
    return '<a class="btn ' + (cls || 'btn--ghost') + '" href="' + C.waLink(ctx) + '" target="_blank" rel="noopener" data-cta="' + cta + '">' + A.icon('chat') + (label || 'WhatsApp us') + '<span class="sr-only"> (opens WhatsApp in a new tab)</span></a>';
  }
  function btnCall(cta, cls) {
    return '<a class="btn ' + (cls || 'btn--ghost') + '" href="' + C.tel + '" data-cta="' + cta + '">' + A.icon('phone') + 'Call ' + C.phoneMain.display + '</a>';
  }
  function btnCalendly(cta, label, cls) {
    return '<a class="btn ' + (cls || 'btn--primary') + '" href="' + C.bookingUrl + '" target="_blank" rel="noopener" data-cta="' + cta + '">' + A.icon('cal') + (label || 'Book a slot') + '<span class="sr-only"> (opens Calendly in a new tab)</span>' + arr() + '</a>';
  }

  /* ---------- Header / nav ---------- */
  function header() {
    var services = R.ROUTES.filter(function (r) { return r.group === 'services'; });
    var sub = services.map(function (r) {
      return '<li><a href="' + R.href(r.path) + '" data-nav="' + r.id + '">' + r.nav + '<small>' + r.blurb + '</small></a></li>';
    }).join('');
    var top = ['projects', 'guides', 'contact'].map(function (id) {
      return '<li><a href="' + link(id) + '" data-nav="' + id + '">' + R.routeById[id].nav + '</a></li>';
    }).join('');
    var drawerSvc = services.map(function (r, i) {
      return '<li style="--i:' + (i + 1) + '"><a href="' + R.href(r.path) + '" data-nav="' + r.id + '">' + r.nav + arr() + '</a></li>';
    }).join('');
    var drawerMore = ['home', 'projects', 'demo', 'guides', 'contact'].map(function (id, i) {
      return '<li style="--i:' + (i + 7) + '"><a href="' + link(id) + '" data-nav="' + id + '">' + R.routeById[id].nav + arr() + '</a></li>';
    }).join('');
    return '' +
      '<header class="site-header" id="top">' +
        '<div class="wrap">' +
          '<a class="brand" href="' + link('home') + '" data-nav="home" aria-label="Republic of Sound Audio, home">' + A.brandMark() +
            '<span class="brand-word" aria-hidden="true"><b>REPUBLIC OF SOUND</b><span>AUDIO · RANCHI</span></span></a>' +
          '<nav class="nav" aria-label="Primary">' +
            '<ul>' +
              '<li class="has-menu"><button class="nav-trigger" type="button" aria-expanded="false" aria-controls="svc-menu" data-group="services">Services' + A.icon('chev', 'ico chev') + '</button>' +
                '<ul class="submenu" id="svc-menu">' + sub + '</ul></li>' +
              top +
            '</ul>' +
          '</nav>' +
          '<div class="header-actions">' +
            '<button class="sound-toggle" type="button" data-sound-toggle aria-pressed="false" data-cursor="Sound"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="st-label">Sound</span><span class="sr-only"> effects for buttons and links</span></button>' +
            '<a class="header-phone" href="' + C.tel + '" data-cta="phone-header" aria-label="Call ' + C.phoneMain.display + '">' + A.icon('phone') + '<span class="num">' + C.phoneMain.display + '</span></a>' +
            '<a class="btn btn--primary btn--sm header-cta" href="' + link('demo') + '" data-cta="book-demo-header">Book a free demo' + arr() + '</a>' +
            '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Open menu"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span></button>' +
          '</div>' +
        '</div>' +
        '<div class="scroll-wave" aria-hidden="true"></div>' +
      '</header>' +
      '<div class="drawer" id="drawer" aria-label="Site menu" role="dialog" aria-modal="true" hidden>' +
        '<p class="drawer-label">Services</p><ul>' + drawerSvc + '</ul>' +
        '<p class="drawer-label">Explore</p><ul>' + drawerMore + '</ul>' +
        '<div class="drawer-contact">' + btnDemo('book-demo-drawer') + btnWA('whatsapp-drawer') + btnCall('phone-drawer') + '</div>' +
      '</div>';
  }

  function actionBar() {
    return '<nav class="action-bar" aria-label="Quick contact">' +
      '<a href="' + C.tel + '" data-cta="phone-mobile-bar">' + A.icon('phone') + 'Call</a>' +
      '<a href="' + C.waLink() + '" target="_blank" rel="noopener" data-cta="whatsapp-mobile-bar">' + A.icon('chat') + 'WhatsApp<span class="sr-only"> (opens in a new tab)</span></a>' +
      '<a class="primary" href="' + link('demo') + '" data-cta="book-demo-mobile-bar">' + A.icon('cal') + 'Book demo</a>' +
    '</nav>';
  }

  function footer() {
    var svc = R.ROUTES.filter(function (r) { return r.group === 'services'; }).map(function (r) { return '<li><a href="' + R.href(r.path) + '">' + r.nav + '</a></li>'; }).join('');
    var co = ['projects', 'demo', 'guides', 'contact'].map(function (id) { return '<li><a href="' + link(id) + '">' + R.routeById[id].nav + '</a></li>'; }).join('');
    return '<footer class="site-footer">' +
      '<div class="wrap">' +
        '<div class="foot-grid">' +
          '<div>' +
            '<a class="brand" href="' + link('home') + '" aria-label="Republic of Sound Audio, home">' + A.brandMark() + '<span class="brand-word" aria-hidden="true"><b>REPUBLIC OF SOUND</b><span>AUDIO · RANCHI</span></span></a>' +
            '<p class="small muted" style="margin-top:1.25rem;max-width:34ch;color:var(--on-dark-muted)">Home theatre, Hi-Fi, acoustics and automation, designed in Ranchi since 2011.</p>' +
            '<div class="btn-row" style="margin-top:1.25rem">' + btnDemo('book-demo-footer', 'Book a free demo', 'btn--sm') + '</div>' +
          '</div>' +
          '<div><h2>Services</h2><ul>' + svc + '</ul></div>' +
          '<div><h2>Company</h2><ul>' + co + '</ul></div>' +
          '<div><h2>Contact</h2><ul>' +
            '<li><a href="' + C.tel + '" data-cta="phone-footer">' + C.phoneMain.display + '</a></li>' +
            '<li><a href="' + C.waLink() + '" target="_blank" rel="noopener" data-cta="whatsapp-footer">WhatsApp<span class="sr-only"> (opens in a new tab)</span></a></li>' +
            '<li><a href="mailto:' + C.email + '" data-cta="email-footer">' + C.email + '</a></li>' +
            '<li style="color:var(--on-dark-muted)">' + C.address.lines.join(', ') + ' ' + tbc('Address to confirm') + '</li>' +
          '</ul></div>' +
        '</div>' +
        '<p class="foot-mark" aria-hidden="true"><span>Republic</span> <em>of</em> <span>Sound</span></p>' +
        '<div class="foot-base">' +
          '<div><span>Brands shown on the current website: ' + C.brandsReferenced.join(', ') + '.</span> ' + tbc('Partner status to confirm') + '</div>' +
          '<div>© <span data-year>2026</span> Republic of Sound Audio. Social links: ' + tbc('None published yet') + '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  /* ---------- Page scaffolding ---------- */
  function crumbs(route) {
    var items = ['<li><a href="' + link('home') + '">Home</a></li>'];
    if (route.parent) items.push('<li><a href="' + link(route.parent) + '">' + R.routeById[route.parent].nav + '</a></li>');
    items.push('<li><span aria-current="page">' + route.nav + '</span></li>');
    return '<nav class="crumbs" aria-label="Breadcrumb"><ol>' + items.join('') + '</ol></nav>';
  }
  function pageHero(route, o) {
    return '<section class="page-hero">' + '<canvas class="viz viz--soft" aria-hidden="true"></canvas>' +
      '<div class="wrap">' + crumbs(route) +
        '<div class="page-hero-grid">' +
          '<div>' +
            '<p class="eyebrow">' + o.eyebrow + '</p>' +
            '<h1 class="display" data-reveal="lines" tabindex="-1">' + lines(o.h1) + '</h1>' +
            '<p class="lede" data-reveal style="--i:2">' + o.lede + '</p>' +
            '<div class="btn-row" data-reveal style="--i:3">' + o.ctas + '</div>' +
          '</div>' +
          (o.photo ? R.feat.photo(o.photo, { eager: true, cls: 'ph--hero' }) : o.scene ? A.figure(o.scene, o.alt, { reveal: true, cls: o.figCls }) : '') +
        '</div>' +
      '</div>' +
    '</section>';
  }
  function secHead(eyebrow, h2Lines, p, id) {
    return '<div class="sec-head"><div><p class="eyebrow">' + eyebrow + '</p><h2 class="h-sec" data-reveal="lines"' + (id ? ' id="' + id + '"' : '') + '>' + lines(h2Lines) + '</h2></div>' + (p ? '<p class="muted" data-reveal>' + p + '</p>' : '') + '</div>';
  }

  /* ---------- FAQ accordion ---------- */
  function faq(list, prefix) {
    return '<div class="faq" data-faq>' + list.map(function (f, i) {
      var id = prefix + '-' + i;
      return '<div class="faq-item"><h3><button class="faq-btn" type="button" aria-expanded="false" aria-controls="' + id + '-p" id="' + id + '-b">' + f[0] + '<span class="pm" aria-hidden="true"></span></button></h3>' +
        '<div class="faq-panel" id="' + id + '-p" role="region" aria-labelledby="' + id + '-b"><div><div class="inner">' + f[1] + '</div></div></div></div>';
    }).join('') + '</div>';
  }

  /* ---------- CTA band ---------- */
  function ctaBand(o) {
    return '<section class="sec cta-band" aria-labelledby="' + o.id + '">' +
      '<div class="bg" aria-hidden="true">' + (o.photo !== false ? '<img src="' + R.imgUrl(o.photo || 'cinema') + '" alt="" loading="lazy" decoding="async" data-parallax>' : A.scene(o.scene || 'cinema')) + '</div><div class="grain" aria-hidden="true"></div>' +
      '<div class="wrap"><div class="split split--even">' +
        '<div><p class="eyebrow">' + (o.eyebrow || 'Hear it first') + '</p><h2 class="h-sec" id="' + o.id + '" data-reveal="lines">' + lines(o.h2) + '</h2>' +
        '<p class="lede" data-reveal style="color:var(--on-dark-muted)">' + o.text + '</p></div>' +
        '<div data-reveal style="--i:2"><div class="btn-row">' + o.ctas + '</div>' + (o.note ? '<p class="small" style="color:var(--on-dark-muted);margin-top:1rem">' + o.note + '</p>' : '') + '</div>' +
      '</div></div>' +
    '</section>';
  }

  /* ---------- Enquiry form ---------- */
  var ROOM = ['Living room', 'Dedicated room', 'Large room or hall', 'Not sure'];
  var BUDGET = ['Under ₹5 lakh', '₹5–10 lakh', '₹10–25 lakh', '₹25 lakh+', 'Corporate project'];
  function opt(list, sel) { return '<option value="">Select…</option>' + list.map(function (v) { return '<option' + (v === sel ? ' selected' : '') + '>' + v + '</option>'; }).join(''); }
  function field(fid, name, label, input, o) {
    o = o || {};
    return '<div class="field' + (o.full ? ' field--full' : '') + '">' +
      '<label for="' + fid + '-' + name + '">' + label + (o.req ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="hint">(optional)</span>') + '</label>' +
      (o.hint ? '<span class="hint" id="' + fid + '-' + name + '-h">' + o.hint + '</span>' : '') +
      input +
      '<span class="err" id="' + fid + '-' + name + '-e" aria-live="off"></span>' +
    '</div>';
  }
  function describedBy(fid, name, hint) { return ' aria-describedby="' + (hint ? fid + '-' + name + '-h ' : '') + fid + '-' + name + '-e"'; }

  function enquiryForm(fid, o) {
    o = o || {};
    var heading = o.heading || 'Tell us about your room';
    var body = '' +
      field(fid, 'name', 'Your name', '<input id="' + fid + '-name" name="name" autocomplete="name" required' + describedBy(fid, 'name') + '>', { req: 1 }) +
      field(fid, 'phone', 'Indian mobile number', '<div class="prefix"><span aria-hidden="true">+91</span><input id="' + fid + '-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel-national" required placeholder="98765 43210"' + describedBy(fid, 'phone', 1) + '></div>', { req: 1, hint: '10 digits, starting 6–9' }) +
      field(fid, 'room', 'Room type', '<select id="' + fid + '-room" name="room" required' + describedBy(fid, 'room') + '>' + opt(ROOM, o.room) + '</select>', { req: 1 }) +
      field(fid, 'budget', 'Budget band', '<select id="' + fid + '-budget" name="budget" required' + describedBy(fid, 'budget') + '>' + opt(BUDGET, o.budget) + '</select>', { req: 1 }) +
      field(fid, 'location', 'Location', '<input id="' + fid + '-location" name="location" autocomplete="address-level2" required placeholder="e.g. Harmu, Ranchi"' + describedBy(fid, 'location') + '>', { req: 1, full: 1 }) +
      field(fid, 'message', 'Message', '<textarea id="' + fid + '-message" name="message" maxlength="1000" placeholder="Room size, what you watch or listen to, timelines…"' + describedBy(fid, 'message') + '></textarea>', { full: 1 }) +
      '<fieldset class="field field--full" aria-describedby="' + fid + '-contact-e"><legend>Preferred contact method <span class="req" aria-hidden="true">*</span></legend><div class="radio-row">' +
        [['WhatsApp', 'WhatsApp'], ['Phone call', 'Call'], ['Email', 'Email']].map(function (v, i) { return '<label><input type="radio" name="contact" value="' + v[0] + '"' + (i === 0 ? ' required' : '') + '>' + v[1] + '</label>'; }).join('') +
      '</div><span class="err" id="' + fid + '-contact-e"></span></fieldset>';
    return formShell(fid, heading, body, o);
  }

  function corporateForm(fid) {
    var types = ['Boardroom or meeting room', 'Video conferencing upgrade', 'Auditorium or PA', 'Hotel or hospitality venue', 'Training or institution', 'Other'];
    var when = ['Within 1 month', '1–3 months', '3–6 months', 'Planning stage'];
    var body = '' +
      field(fid, 'name', 'Your name', '<input id="' + fid + '-name" name="name" autocomplete="name" required' + describedBy(fid, 'name') + '>', { req: 1 }) +
      field(fid, 'org', 'Organisation', '<input id="' + fid + '-org" name="org" autocomplete="organization" required' + describedBy(fid, 'org') + '>', { req: 1 }) +
      field(fid, 'phone', 'Indian mobile number', '<div class="prefix"><span aria-hidden="true">+91</span><input id="' + fid + '-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel-national" required placeholder="98765 43210"' + describedBy(fid, 'phone', 1) + '></div>', { req: 1, hint: '10 digits, starting 6–9' }) +
      field(fid, 'email', 'Work email', '<input id="' + fid + '-email" name="email" type="email" autocomplete="email"' + describedBy(fid, 'email') + '>', {}) +
      field(fid, 'type', 'Project type', '<select id="' + fid + '-type" name="type" required' + describedBy(fid, 'type') + '>' + opt(types) + '</select>', { req: 1 }) +
      field(fid, 'timeline', 'Timeline', '<select id="' + fid + '-timeline" name="timeline"' + describedBy(fid, 'timeline') + '>' + opt(when) + '</select>', {}) +
      field(fid, 'location', 'Site location', '<input id="' + fid + '-location" name="location" required placeholder="City and area"' + describedBy(fid, 'location') + '>', { req: 1 }) +
      field(fid, 'rooms', 'Number of rooms or spaces', '<input id="' + fid + '-rooms" name="rooms" inputmode="numeric"' + describedBy(fid, 'rooms') + '>', {}) +
      field(fid, 'message', 'Brief', '<textarea id="' + fid + '-message" name="message" maxlength="1500" placeholder="Room sizes, seating capacity, existing equipment, platforms (Teams, Zoom, Meet)…"' + describedBy(fid, 'message') + '></textarea>', { full: 1 }) +
      '<input type="hidden" name="budget" value="Corporate project"><input type="hidden" name="contact" value="Phone call">';
    return formShell(fid, 'Request a proposal', body, { kind: 'corporate', submit: 'Request a proposal' });
  }

  function formShell(fid, heading, body, o) {
    return '<div class="form-card on-light">' +
      '<p class="form-banner">' + A.icon('info') + 'Prototype form · not connected to a server</p>' +
      '<h3 style="font-family:var(--font-display);font-weight:400;font-size:1.9rem;margin-bottom:1.25rem" id="' + fid + '-title">' + heading + '</h3>' +
      '<form class="enquiry" id="' + fid + '" data-form="' + (o.kind || 'enquiry') + '" data-source="' + fid + '" novalidate aria-labelledby="' + fid + '-title">' +
        '<div class="err-summary" id="' + fid + '-summary" tabindex="-1" role="alert" hidden></div>' +
        '<div class="form-grid">' + body + '</div>' +
        '<div class="hp" aria-hidden="true" style="position:absolute;left:-9999px"><label>Leave empty<input name="website" tabindex="-1" autocomplete="off"></label></div>' +
        '<div class="field field--full" style="margin-top:1.1rem"><label class="consent"><input type="checkbox" name="consent" required id="' + fid + '-consent" aria-describedby="' + fid + '-consent-e"><span>I agree that Republic of Sound may contact me about this enquiry. <span class="placeholder-text">[Privacy policy link — to be written]</span></span></label><span class="err" id="' + fid + '-consent-e"></span></div>' +
        '<div class="form-foot"><button class="btn btn--dark" type="submit" data-cta="form-submit-' + fid + '">' + (o.submit || 'Send enquiry') + arr() + '</button>' +
          '<span class="xs muted">Or ' + '<a href="' + C.waLink() + '" target="_blank" rel="noopener" data-cta="whatsapp-form-' + fid + '">message us on WhatsApp</a></span></div>' +
      '</form>' +
      '<div class="form-result" id="' + fid + '-result" tabindex="-1" role="status" hidden></div>' +
    '</div>';
  }

  R.ui = {
    esc: esc, link: link, arr: arr, tbc: tbc, lines: lines,
    btnDemo: btnDemo, btnWA: btnWA, btnCall: btnCall, btnCalendly: btnCalendly,
    header: header, footer: footer, actionBar: actionBar,
    crumbs: crumbs, pageHero: pageHero, secHead: secHead, faq: faq, ctaBand: ctaBand,
    enquiryForm: enquiryForm, corporateForm: corporateForm
  };
})(typeof window !== 'undefined' ? (window.ROS = window.ROS || {}) : (globalThis.ROS = globalThis.ROS || {}));
