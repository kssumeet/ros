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
      { n: 1, cat: 'dedicated-theatre', label: 'Dedicated theatre', scene: 'multiplex', service: 'home-theatre', guide: 'guide-atmos', title: 'Dedicated theatre case study' },
      { n: 2, cat: 'living-room', label: 'Living room', scene: 'atmos', service: 'home-theatre', guide: 'guide-cost', title: 'Living-room Atmos case study' },
      { n: 3, cat: 'corporate', label: 'Corporate', scene: 'boardroom', service: 'corporate', guide: null, title: 'Boardroom AV case study' }
    ];
    var extra = [
      { cat: 'acoustics', label: 'Acoustics', scene: 'studio', title: 'Studio acoustics project' },
      { cat: 'living-room', label: 'Living room', scene: 'hifi', title: 'Hi-Fi listening room project' },
      { cat: 'corporate', label: 'Commercial', scene: 'cinema', title: 'Cinema auditorium project' }
    ];
    function card(c, i) {
      var inner = R.feat.photo(c.scene, { reveal: false, parallax: false }) +
        '<p class="proj-meta"><span>' + c.label + '</span><span aria-hidden="true">·</span>' + ph('Location to confirm') + '</p>';
      if (c.n) return '<a class="card proj" href="#case-' + c.n + '" data-cat="' + c.cat + '" data-cta="project-card-' + c.n + '">' + inner + '<h3><span>' + c.title + '</span>' + A.icon('arrow', 'ico arr') + '</h3><p class="small muted" style="margin:.4rem 0 0">Case-study template · ' + ph('Client/project to confirm') + '</p></a>';
      return '<article class="card proj" data-cat="' + c.cat + '">' + inner + '<h3><span>' + c.title + '</span></h3><p class="small muted" style="margin:.4rem 0 0">Awaiting project details and photos from ROS.</p></article>';
    }
    function caseStudy(c) {
      return '<article class="case" id="case-' + c.n + '" aria-labelledby="case-' + c.n + '-h">' +
        '<p class="eyebrow">Case study ' + c.n + ' · ' + c.label + ' · template</p>' +
        '<h2 class="h-sec" id="case-' + c.n + '-h" style="max-width:none">' + ph('Project title') + ' <span class="muted" style="font-size:.6em">— ' + c.title + '</span></h2>' +
        '<div class="case-grid">' +
          '<div>' +
            '<dl class="facts">' +
              '<dt>Client</dt><dd>' + ph('Client/project to confirm') + '</dd>' +
              '<dt>Location</dt><dd>' + ph('Area, city') + '</dd>' +
              '<dt>Room</dt><dd>' + ph('L × W × H in metres') + '</dd>' +
              '<dt>Year</dt><dd>' + ph('Year completed') + '</dd>' +
            '</dl>' +
            '<h3>Client brief</h3><p>' + ph('What the client wanted, in their words') + '</p>' +
            '<h3>Challenge</h3><p>' + ph('Room, building or budget constraint that shaped the design') + '</p>' +
            '<h3>ROS scope</h3><p>' + ph('Design, acoustics, supply, installation, calibration — only what ROS delivered') + '</p>' +
            '<h3>Equipment list</h3><ul class="small"><li>' + ph('Display / projector and screen') + '</li><li>' + ph('Speakers and layout, e.g. 7.1.4') + '</li><li>' + ph('Amplification / processor') + '</li><li>' + ph('Seating, lighting, control') + '</li></ul>' +
            '<h3>Documented result</h3><p>' + ph('Measured or observable outcome — no unverified claims') + '</p>' +
            '<h3>Client quote</h3><p>' + ph('Approved quote with name, or remove this block') + '</p>' +
          '</div>' +
          '<div>' + R.feat.photo(c.scene) +
            '<div class="grid g-2" style="margin-top:1rem">' + R.feat.photo('install', { parallax: false }) + R.feat.photo('hifi', { parallax: false }) + '</div>' +
            '<p class="xs muted" style="margin-top:.75rem">Photos from rosaudio.com used as stand-ins. Replace with photos of this specific project.</p>' +
            '<p class="small" style="margin-top:1.5rem"><strong>Related:</strong> <a href="' + L(c.service) + '" style="color:var(--brass-ink)">' + R.routeById[c.service].nav + '</a>' +
              (c.guide ? ' · <a href="' + L(c.guide) + '" style="color:var(--brass-ink)">' + R.routeById[c.guide].nav + '</a>' : '') + '</p>' +
          '</div>' +
        '</div>' +
      '</article>';
    }
    var html = U.pageHero(route, {
      eyebrow: 'Projects',
      h1: ['Home theatre', 'projects <em>in Ranchi.</em>'],
      lede: 'Every case study will show the brief, the constraints, what ROS delivered and what changed. Content is being gathered with client approval.',
      ctas: U.btnDemo('book-demo-projects-hero') + U.btnWA('whatsapp-projects-hero')
    }) +
    '<section class="sec sec--light" aria-labelledby="proj-grid-h">' +
      '<div class="wrap">' +
        '<div class="notice" style="margin-bottom:2.5rem"><strong>Placeholder content.</strong> No client names, logos, photos or results are shown until ROS confirms each project and has client permission. Client logos on the current homepage are not reused as endorsements.</div>' +
        '<h2 class="sr-only" id="proj-grid-h">Project list</h2>' +
        '<div class="tabs" role="group" aria-label="Filter projects by type" data-filter-group="projects">' +
          cats.map(function (c, i) { return '<button class="chip" type="button" data-filter="' + c[0] + '" aria-pressed="' + (i === 0) + '">' + c[1] + '</button>'; }).join('') +
        '</div>' +
        '<p class="small muted" role="status" data-filter-status="projects">Showing all 6 projects</p>' +
        '<div class="grid g-3" data-filter-target="projects" style="margin-top:1.5rem">' + cases.map(card).join('') + extra.map(card).join('') + '</div>' +
        '<div class="empty" data-filter-empty="projects" hidden style="margin-top:1.5rem;border-color:rgba(16,17,18,.25)"><span class="q" aria-hidden="true">–</span><div><h3>No projects in this category yet</h3><p class="muted" style="margin:0">Try another filter or <a href="' + L('contact') + '" style="color:var(--brass-ink)">ask us about similar work</a>.</p></div></div>' +
      '</div>' +
    '</section>' +
    '<section class="sec sec--paper" aria-label="Case-study templates">' +
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
    var html = U.pageHero(route, {
      eyebrow: 'Contact',
      h1: ['Republic of Sound,', '<em>Ranchi.</em>'],
      lede: 'Call, WhatsApp, email or visit. For the quickest answer, send a WhatsApp message with your room size and what you have in mind.',
      ctas: U.btnCalendly('calendly-contact-hero', 'Book a free demo') + U.btnWA('whatsapp-contact-hero') + U.btnCall('phone-contact-hero')
    }) +
    '<section class="sec sec--dark" aria-labelledby="c-details">' +
      '<div class="wrap"><div class="split split--even">' +
        '<div><p class="eyebrow">Details</p><h2 class="h-sec" id="c-details">How to <em>reach us.</em></h2>' + P.contactBlock('contact-page') +
          '<div class="notice" style="margin-top:1.5rem;color:var(--on-dark)"><strong>Before launch:</strong> the address above is the one published on rosaudio.com/contact/. A third-party directory reportedly lists a different location (Satya Enclave, Lake Avenue, Kanke Road, Ranchi 834008). ROS must confirm which is current, plus opening hours and which number handles WhatsApp.</div></div>' +
        P.mapPlaceholder() +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--charcoal" id="enquiry" aria-labelledby="enq-contact-title">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Enquiry</p><h2 class="h-sec" data-reveal="lines">' + lines(['Send us', 'the <em>details.</em>']) + '</h2>' +
          '<p style="color:var(--on-dark-muted)">Use this form for site visits, acoustic assessments, seating visits and product questions. For corporate projects, use the <a href="' + L('corporate') + '#proposal" style="color:var(--brass)">proposal form</a>.</p></div>' +
        U.enquiryForm('enq-contact', { heading: 'Request a site visit or call back' }) +
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
