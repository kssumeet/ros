/* ROS prototype — Projects, Book a demo, Guides index, Contact, 404. */
(function (R) {
  'use strict';
  var C = R.CONFIG, A = R.art, U = R.ui;
  var P = R.pages = R.pages || {};
  var L = U.link, arr = U.arr, tbc = U.tbc, lines = U.lines;
  function ph(t) { return '<span class="placeholder-text">[' + t + ']</span>'; }

  /* ================================================================ PROJECTS */
  P.projects = function (route) {
    var cats = [['all', 'All'], ['living-room', 'Living room'], ['dedicated-theatre', 'Dedicated theatre'], ['acoustics', 'Acoustics'], ['corporate', 'Corporate']];
    var cases = [
      { n: 1, cat: 'dedicated-theatre', label: 'Dedicated theatre', scene: 'multiplex', more: ['recliners', 'install'], service: 'home-theatre', guide: 'guide-atmos', title: 'Dedicated theatre' },
      { n: 2, cat: 'living-room', label: 'Living room', scene: 'atmos', more: ['projector', 'hifi'], service: 'home-theatre', guide: 'guide-cost', title: 'Living-room Dolby Atmos' },
      { n: 3, cat: 'corporate', label: 'Corporate', scene: 'boardroom', more: ['laser', 'install'], service: 'corporate', guide: null, title: 'Boardroom AV' }
    ];
    var extra = [
      { cat: 'acoustics', label: 'Acoustics', scene: 'studio', title: 'Studio acoustics' },
      { cat: 'living-room', label: 'Living room', scene: 'hifi', title: 'Hi-Fi listening room' },
      { cat: 'corporate', label: 'Commercial', scene: 'cinema', title: 'Cinema auditorium' }
    ];
    var outline = [
      ['Brief', 'What the client wanted, in their words.'],
      ['Challenge', 'The room, building or budget constraint that shaped the design.'],
      ['Our scope', 'Only what ROS delivered: design, acoustics, supply, installation, calibration.'],
      ['Equipment', 'Display, speaker layout, amplification, seating, lighting and control.'],
      ['Result', 'A measured or observable outcome. No unverified claims.'],
      ['Client’s words', 'An approved quote with the client’s name.']
    ];
    function tile(c, i) {
      var body = R.feat.photo(c.scene, { reveal: false, parallax: false, credit: false, alt: '' }) +
        '<span class="pt-body"><span class="pt-cat">' + c.label + '</span><span class="pt-title">' + c.title + '</span>' +
        '<span class="pt-more">' + (c.n ? 'View case study' + arr() : 'Details coming soon') + '</span></span>';
      return c.n
        ? '<a class="pt pt--' + (i + 1) + '" href="#case-' + c.n + '" data-cat="' + c.cat + '" data-cta="project-card-' + c.n + '" data-cursor="View">' + body + '</a>'
        : '<div class="pt pt--' + (i + 1) + '" data-cat="' + c.cat + '">' + body + '</div>';
    }
    function caseStudy(c, i) {
      return '<article class="cs' + (i % 2 ? ' cs--rev' : '') + '" id="case-' + c.n + '" aria-labelledby="case-' + c.n + '-h">' +
        '<div class="cs-media" data-reveal>' + R.feat.photo(c.scene, { ratio: '4 / 3', parallax: false }) +
          '<div class="cs-thumbs">' + c.more.map(function (k) { return R.feat.photo(k, { ratio: '4 / 3', parallax: false, credit: false }); }).join('') + '</div></div>' +
        '<div class="cs-body">' +
          '<p class="eyebrow">Case study 0' + c.n + ' · ' + c.label + '</p>' +
          '<h2 class="h-sec" id="case-' + c.n + '-h" data-reveal="lines">' + lines([c.title]) + '</h2>' +
          '<dl class="cs-facts">' + ['Client', 'Location', 'Room size', 'Year'].map(function (f) { return '<div><dt>' + f + '</dt><dd>—</dd></div>'; }).join('') + '</dl>' +
          '<p class="cs-tbc">' + tbc('Project details and photos to confirm with ROS') + '</p>' +
          '<ol class="cs-outline">' + outline.map(function (o) { return '<li><h3>' + o[0] + '</h3><p>' + o[1] + '</p></li>'; }).join('') + '</ol>' +
          '<p class="cs-related">Related: <a href="' + L(c.service) + '">' + R.routeById[c.service].nav + '</a>' +
            (c.guide ? ' · <a href="' + L(c.guide) + '">' + R.routeById[c.guide].nav + '</a>' : '') + '</p>' +
        '</div>' +
      '</article>';
    }
    var html = U.pageHero(route, {
      cls: 'page-hero--compact',
      eyebrow: 'Projects',
      h1: ['Rooms we’ve', 'designed <em>and built.</em>'],
      lede: 'Cinemas, living rooms, studios and boardrooms. Filter by type, then open a project for the brief, the constraints and what we delivered.',
      ctas: ''
    }) +
    '<section class="sec sec--dark proj-sec" aria-labelledby="proj-grid-h">' +
      '<div class="wrap">' +
        '<h2 class="sr-only" id="proj-grid-h">Project list</h2>' +
        '<div class="proj-bar">' +
          '<div class="tabs" role="group" aria-label="Filter projects by type" data-filter-group="projects">' +
            cats.map(function (c, i) { return '<button class="chip" type="button" data-filter="' + c[0] + '" aria-pressed="' + (i === 0) + '">' + c[1] + '</button>'; }).join('') +
          '</div>' +
          '<p class="proj-status" role="status" data-filter-status="projects">Showing all 6 projects</p>' +
        '</div>' +
        '<div class="pt-grid" data-filter-target="projects">' + cases.map(tile).join('') + extra.map(function (c, i) { return tile(c, i + 3); }).join('') + '</div>' +
        '<div class="empty" data-filter-empty="projects" hidden><span class="q" aria-hidden="true">–</span><div><h3>No projects in this category yet</h3><p class="muted" style="margin:0">Try another filter or <a href="' + L('contact') + '" style="color:var(--brass)">ask us about similar work</a>.</p></div></div>' +
        '<p class="proj-note">' + tbc('Photos from the current rosaudio.com · project names, clients and locations to confirm') + '</p>' +
      '</div>' +
    '</section>' +
    '<section class="sec sec--paper cs-sec" aria-label="Case studies">' +
      '<div class="wrap">' + cases.map(caseStudy).join('') + '</div>' +
    '</section>' +
    U.ctaBand({ id: 'proj-cta', h2: ['Hear a room', 'like these, <em>live.</em>'], text: 'The fastest way to judge our work is thirty minutes in the demo room.',
      ctas: U.btnDemo('book-demo-projects-band', 'Book a demo') + U.btnWA('whatsapp-projects-band') });
    return { html: html, faqs: [] };
  };

  /* ==================================================================== DEMO */
  P.demo = function (route) {
    var faqs = [
      ['Is the demo really free?', 'Yes, the demo is offered free of charge with no obligation to buy. ' + ph('ROS to confirm wording')],
      ['How long does it take?', 'Allow about 30 minutes, which matches the slot length on our booking page. Stay longer if you want to compare more options and the room is free.'],
      ['Can I bring my family?', 'Yes. Decisions about a shared room are easier when everyone who will use it has heard it. ' + ph('Confirm maximum group size')],
      ['What if no slot suits me?', 'Call or WhatsApp us and we will try to arrange another time.']
    ];
    // Prototype slot picker: purely illustrative times, no reservation is made.
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var html = U.pageHero(route, {
      eyebrow: 'Book a demo · Ranchi',
      h1: ['Book a home theatre', 'demo <em>in Ranchi.</em>'],
      lede: 'Thirty minutes in a set-up room. Bring a film scene or song you know well and hear what different systems do with it.',
      ctas: U.btnCalendly('calendly-demo-hero', 'Book a slot') + U.btnWA('whatsapp-demo-hero'),
      photo: 'cinema'
    }) +
    '<section class="sec sec--light" aria-labelledby="demo-what">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">What happens</p><h2 class="h-sec" id="demo-what" data-reveal="lines">' + lines(['Your 30 minutes,', '<em>step by step.</em>']) + '</h2>' +
          '<p class="muted">An indicative running order. ROS will adapt it to what you want to hear.</p>' + tbc('Running order to confirm') + '</div>' +
        '<ol class="demo-list" style="list-style:none;margin-top:0">' +
          '<li data-reveal style="--i:0"><span class="k" style="color:var(--brass-ink)">0–5</span><span><b>Your room and goals</b><span class="muted">Room size, what you watch and listen to, and budget comfort.</span></span></li>' +
          '<li data-reveal style="--i:1"><span class="k" style="color:var(--brass-ink)">5–20</span><span><b>Listen and compare</b><span class="muted">Film and music clips across set-ups, including your own scene or track.</span></span></li>' +
          '<li data-reveal style="--i:2"><span class="k" style="color:var(--brass-ink)">20–25</span><span><b>Picture and seating</b><span class="muted">Screen size from your seating distance; try the recliners.</span></span></li>' +
          '<li data-reveal style="--i:3"><span class="k" style="color:var(--brass-ink)">25–30</span><span><b>Next steps</b><span class="muted">Whether a site visit makes sense, and what to measure before it.</span></span></li>' +
        '</ol>' +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--charcoal" aria-labelledby="demo-bring">' +
      '<div class="wrap"><div class="split split--even">' +
        '<div><p class="eyebrow">Bring something you love</p><h2 class="h-sec" id="demo-bring" data-reveal="lines">' + lines(['A scene you know', '<em>by heart.</em>']) + '</h2>' +
          '<p style="color:var(--on-dark-muted)">Familiar material is the best test. You will notice what changes because you already know how it should sound.</p>' +
          '<ul class="demo-list">' +
            '<li><span class="k">Film</span><span><b>Dialogue-heavy and action scenes</b><span>One quiet, one loud. Clarity and scale both matter.</span></span></li>' +
            '<li><span class="k">Music</span><span><b>A track you play often</b><span>Acoustic recordings reveal detail; bass-heavy tracks test the room.</span></span></li>' +
            '<li><span class="k">Format</span><span><b>How to bring it</b><span>' + ph('ROS to confirm: USB, phone streaming, disc or streaming apps') + '</span></span></li>' +
          '</ul></div>' +
        '<div>' + A.wave(56) + '<p class="xs" style="color:var(--on-dark-muted);margin-top:.5rem">Decorative motif — not a live measurement. No audio plays on this page.</p>' +
          R.feat.photo('recliners') + '</div>' +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--paper" id="book" aria-labelledby="book-h">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Arrange your visit</p><h2 class="h-sec" id="book-h" data-reveal="lines">' + lines(['Pick a time', 'that <em>suits you.</em>']) + '</h2>' +
          '<p class="muted">Live bookings are handled on ROS’s Calendly page, which opens in a new tab. You will receive confirmation from Calendly, not from this page.</p>' +
          '<div class="btn-row" style="margin:1.5rem 0">' + U.btnCalendly('calendly-demo-book', 'Book a slot on Calendly', 'btn--dark') + '</div>' +
          '<p class="small muted">Prefer to talk? <a href="' + C.tel + '" data-cta="phone-demo-book" style="color:var(--brass-ink);font-weight:700">' + C.phoneMain.display + '</a> or <a href="' + C.waLink() + '" target="_blank" rel="noopener" data-cta="whatsapp-demo-book" style="color:var(--brass-ink);font-weight:700">WhatsApp<span class="sr-only"> (opens in a new tab)</span></a>.</p></div>' +
        '<div class="form-card on-light" data-slot-picker>' +
          '<p class="proto-flag">' + A.icon('info') + 'Simulated preview — does not book</p>' +
          '<h3 style="margin:1rem 0 .25rem">Preview the booking flow</h3>' +
          '<p class="small muted">The days and times below are examples only. They do not reflect real availability, and nothing is reserved.</p>' +
          '<p class="xs muted" style="margin:1rem 0 .4rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em" id="day-lbl">Example day</p>' +
          '<div class="days" role="group" aria-labelledby="day-lbl">' + days.map(function (d, i) { return '<button type="button" class="day" data-day="' + d + '" aria-pressed="false"><b>' + d + '</b>Example</button>'; }).join('') + '</div>' +
          '<p class="xs muted" style="margin:1rem 0 .4rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em" id="slot-lbl">Example time</p>' +
          '<div class="slots" role="group" aria-labelledby="slot-lbl">' + ['11:00', '12:00', '15:00', '16:30', '18:00'].map(function (t) { return '<button type="button" class="slot" data-slot="' + t + '" aria-pressed="false">' + t + '</button>'; }).join('') + '</div>' +
          '<div class="form-result" data-slot-result role="status" hidden></div>' +
        '</div>' +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--light" aria-labelledby="dir-h">' +
      '<div class="wrap"><div class="split split--even">' +
        '<div><p class="eyebrow">Directions</p><h2 class="h-sec" id="dir-h">Getting <em>here.</em></h2>' + P.contactBlock('demo-directions') +
          '<p class="small muted" style="margin-top:1.25rem"><strong>Parking:</strong> ' + ph('ROS to confirm parking arrangements') + '</p></div>' +
        P.mapPlaceholder() +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--paper" aria-labelledby="demo-faq">' +
      '<div class="wrap"><div class="split"><div><p class="eyebrow">Questions</p><h2 class="h-sec" id="demo-faq">Demo <em>FAQs</em></h2></div>' + U.faq(faqs, 'dfaq') + '</div></div>' +
    '</section>' +
    U.ctaBand({ id: 'demo-cta', h2: ['Ready when', '<em>you are.</em>'], text: 'Choose a time on Calendly, or message us and we will find one together.',
      ctas: U.btnCalendly('calendly-demo-band', 'Book a slot') + U.btnWA('whatsapp-demo-band') + U.btnCall('phone-demo-band') });
    return { html: html, faqs: faqs };
  };

  /* ================================================================== GUIDES */
  P.guides = function (route) {
    var list = [
      ['guide-cost', 'What does a home theatre cost in India?', 'Where the budget goes, illustrative bands and the mistakes that waste money.'],
      ['guide-atmos', 'Room size for Dolby Atmos: a practical guide', 'Dimensions, ceiling height, 5.1.2 vs 7.1.4 and screen size by seating distance.'],
      [null, 'Projector versus TV for a home theatre', 'Image size, room light, maintenance and cost compared.'],
      [null, 'Soundbar versus home theatre', 'When a soundbar is enough and when separate speakers are worth it.'],
      [null, 'How to soundproof a room in India', 'Isolation versus treatment, in Indian construction.'],
      [null, 'Living-room home theatre setups', 'Getting cinema sound into a room that has other jobs.'],
      [null, 'Choosing recliners for a home cinema', 'Reclined depth, risers, motors and upholstery.'],
      [null, 'Acoustic panels: what they fix and what they do not', 'Echo, bass, and the limits of panels.']
    ];
    var html = U.pageHero(route, {
      eyebrow: 'Guides',
      h1: ['Home theatre cost', 'in India, and <em>other</em>', 'planning guides.'],
      lede: 'Straight answers to the questions we hear most, written for people planning a room rather than reading spec sheets.',
      ctas: '<a class="btn btn--primary" href="' + L('guide-cost') + '" data-cta="guide-cost-hero">Read the cost guide' + arr() + '</a>' + U.btnDemo('book-demo-guides-hero', 'Book a demo', 'btn--ghost')
    }) +
    '<section class="sec sec--light" aria-labelledby="g-list">' +
      '<div class="wrap wrap--narrow">' +
        '<h2 class="h-sec" id="g-list">All <em>guides</em></h2>' +
        '<ol class="guide-list">' + list.map(function (g, i) {
          var n = '<span class="n">' + String(i + 1).padStart(2, '0') + '</span>';
          if (g[0]) return '<li><a class="guide-row" href="' + L(g[0]) + '" data-cta="guide-list-' + (i + 1) + '">' + n + '<span><h3>' + g[1] + '</h3><p>' + g[2] + '</p></span>' + A.icon('arrow', 'ico arr') + '</a></li>';
          return '<li><div class="guide-row">' + n + '<span><h3 style="color:var(--on-light-muted)">' + g[1] + '</h3><p>' + g[2] + '</p></span><span class="tbc">Planned</span></div></li>';
        }).join('') + '</ol>' +
      '</div>' +
    '</section>' +
    U.ctaBand({ id: 'guides-cta', h2: ['Reading helps.', '<em>Listening</em> decides.'], text: 'Book a free demo to hear what the guides describe.',
      ctas: U.btnDemo('book-demo-guides-band') + U.btnWA('whatsapp-guides-band') });
    return { html: html, faqs: [] };
  };

  /* ================================================================= CONTACT */
  P.contact = function (route) {
    var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Republic of Sound Audio, Main Road, Ranchi 834001');
    var ways = [
      ['phone', 'Call', C.phoneMain.display, 'Talk to the team', C.tel, 'phone-contact-card', false],
      ['chat', 'WhatsApp', 'Message us', 'Fastest reply: send your room size', C.waLink(), 'whatsapp-contact-card', true],
      ['mail', 'Email', C.email, 'Drawings and floor plans welcome', 'mailto:' + C.email, 'email-contact-card', false],
      ['cal', 'Book a demo', '30-minute slot', 'Listen in our demo room', C.bookingUrl, 'calendly-contact-card', true]
    ];
    var html = U.pageHero(route, {
      cls: 'page-hero--compact',
      eyebrow: 'Contact',
      h1: ['Let’s talk about', 'your <em>room.</em>'],
      lede: 'Call, message or visit the showroom. Or send the details below and we’ll come back with the right next step.',
      ctas: ''
    }) +
    '<section class="sec sec--dark contact-ways-sec" aria-label="Ways to reach us">' +
      '<div class="wrap">' +
        '<ul class="contact-ways" role="list">' + ways.map(function (w, i) {
          return '<li data-reveal style="--i:' + i + '"><a class="cw" href="' + w[4] + '" data-cta="' + w[5] + '"' + (w[6] ? ' target="_blank" rel="noopener"' : '') + '>' +
            '<span class="cw-ico">' + A.icon(w[0]) + '</span>' +
            '<span class="cw-label">' + w[1] + '</span>' +
            '<span class="cw-value">' + w[2] + '</span>' +
            '<span class="cw-note">' + w[3] + '</span>' +
            A.icon('arrow', 'cw-arr') + (w[6] ? '<span class="sr-only"> (opens in a new tab)</span>' : '') +
          '</a></li>';
        }).join('') + '</ul>' +
        '<p class="cw-tbc">' + U.tbc('Phone and WhatsApp numbers to confirm') + '</p>' +
      '</div>' +
    '</section>' +
    '<section class="sec sec--dark contact-main" id="enquiry" aria-labelledby="enq-contact-title">' +
      '<div class="wrap"><div class="contact-grid">' +
        U.enquiryForm('enq-contact', { heading: 'Tell us about your room' }) +
        '<aside class="visit" aria-labelledby="c-details">' +
          '<p class="eyebrow">Visit the showroom</p><h2 class="h-sec" id="c-details" data-reveal="lines">' + lines(['Find us in', '<em>Ranchi.</em>']) + '</h2>' +
          '<dl class="visit-list">' +
            '<div><dt>' + A.icon('pin') + 'Address</dt><dd>' + C.address.lines.join('<br>') + '<br>' + U.tbc('Address to confirm') + '</dd></div>' +
            '<div><dt>' + A.icon('clock') + 'Hours</dt><dd><span class="placeholder-text">[Opening hours to confirm]</span></dd></div>' +
            '<div><dt>' + A.icon('info') + 'Areas</dt><dd>Ranchi. Jamshedpur, Dhanbad and Bokaro on request.</dd></div>' +
          '</dl>' +
          '<a class="visit-map" href="' + mapsUrl + '" target="_blank" rel="noopener" data-cta="map-search">' + A.scene('map') +
            '<span class="visit-map-pin" aria-hidden="true">' + A.icon('pin') + '</span>' +
            '<span class="visit-map-cta">Open in Google Maps' + arr() + '</span><span class="sr-only"> (opens in a new tab)</span></a>' +
          '<p class="visit-note">Corporate or commercial project? Use the <a href="' + L('corporate') + '#proposal">proposal form</a>.</p>' +
        '</aside>' +
      '</div></div>' +
    '</section>';
    return { html: html, faqs: [] };
  };

  /* ===================================================================== 404 */
  P.notfound = function (route) {
    var html = '<section class="page-hero" style="min-height:70vh;display:flex;align-items:center"><div class="wrap">' +
      '<p class="eyebrow">404</p><h1 class="display" tabindex="-1">This page is <em>silent.</em></h1>' +
      '<p class="lede">The page you were looking for does not exist or has moved.</p>' +
      '<div class="btn-row"><a class="btn btn--primary" href="' + L('home') + '" data-cta="404-home">Go to the homepage' + arr() + '</a>' + U.btnDemo('book-demo-404', 'Book a demo', 'btn--ghost') + '</div>' +
    '</div></section>';
    return { html: html, faqs: [] };
  };
})(typeof window !== 'undefined' ? (window.ROS = window.ROS || {}) : (globalThis.ROS = globalThis.ROS || {}));
