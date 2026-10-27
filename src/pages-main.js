/* ROS prototype — Home and service pages. Each page returns { html, faqs }. */
(function (R) {
  'use strict';
  var C = R.CONFIG, A = R.art, U = R.ui;
  var P = R.pages = R.pages || {};
  var L = U.link, arr = U.arr, tbc = U.tbc, lines = U.lines;

  /* Shared fragments used by more than one page */
  function projectCard(n, cat, title, scene, href) {
    return '<a class="card proj" href="' + href + '" data-cat="' + cat + '" data-cta="project-card-' + n + '" data-reveal style="--i:' + n + '">' +
      A.figure(scene, title, { caption: 'Placeholder · awaiting approved project photos' }) +
      '<p class="proj-meta"><span>' + cat.replace('-', ' ') + '</span><span aria-hidden="true">·</span><span class="placeholder-text">[Location to confirm]</span></p>' +
      '<h3><span>' + title + '</span>' + A.icon('arrow', 'ico arr') + '</h3></a>';
  }
  P.projectCard = projectCard;

  function contactBlock(id) {
    return '<ul class="contact-list">' +
      '<li><span class="k">Phone</span><span><a href="' + C.tel + '" data-cta="phone-' + id + '">' + C.phoneMain.display + '</a> ' + tbc() + '</span></li>' +
      '<li><span class="k">WhatsApp</span><span><a href="' + C.waLink() + '" target="_blank" rel="noopener" data-cta="whatsapp-' + id + '">Message ' + C.phoneMain.display + '<span class="sr-only"> (opens in a new tab)</span></a> ' + tbc() + '</span></li>' +
      '<li><span class="k">Email</span><span><a href="mailto:' + C.email + '" data-cta="email-' + id + '">' + C.email + '</a></span></li>' +
      '<li><span class="k">Address</span><span>' + C.address.lines.join('<br>') + '<br>' + tbc('Awaiting confirmation — see note') + '</span></li>' +
      '<li><span class="k">Hours</span><span class="placeholder-text">[Opening hours to confirm]</span></li>' +
      '<li><span class="k">Areas</span><span>Ranchi. Jamshedpur, Dhanbad and Bokaro ' + tbc('Proposed — to confirm') + '</span></li>' +
    '</ul>';
  }
  P.contactBlock = contactBlock;

  function mapPlaceholder() {
    return '<div class="map-ph">' + A.scene('map') +
      '<div class="map-msg"><p style="margin:0 0 .75rem;font-weight:700">Map embed pending a confirmed address</p>' +
      '<p class="small" style="color:var(--on-dark-muted);margin:0 0 1rem">Two different Ranchi addresses appear online. The map and directions will go live once ROS confirms the showroom location.</p>' +
      '<a class="link-arrow" style="color:var(--brass)" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Republic of Sound Audio, Main Road, Ranchi 834001') + '" target="_blank" rel="noopener" data-cta="map-search">Search the published address in Google Maps' + arr() + '<span class="sr-only"> (opens in a new tab)</span></a></div></div>';
  }
  P.mapPlaceholder = mapPlaceholder;

  /* ===================================================================== HOME */
  P.home = function () {
    var faqs = [
      ['How much does a home theatre cost?', 'It depends far more on the room than on any single product. A well-chosen living-room upgrade costs a fraction of a fully constructed private cinema with acoustic isolation and recliners. Our <a href="' + L('guide-cost') + '">home theatre cost guide</a> explains where the money goes. ROS will confirm current budget bands after a site visit.'],
      ['What room size do I need?', 'A comfortable 5.1 or 5.1.2 system can work in a typical living room. A dedicated 7.1.4 Dolby Atmos room benefits from more length, width and ceiling height so that every seat sits inside the speaker layout. See our <a href="' + L('guide-atmos') + '">Dolby Atmos room-size guide</a> for general dimensions.'],
      ['Should I choose a projector or a TV?', 'A large TV is simpler in rooms you cannot darken and suits daytime viewing. A projector and screen give a much larger image for the money and feel more cinematic in a light-controlled room. We demonstrate both so you can compare picture size and brightness for yourself.'],
      ['Is a soundbar enough, or do I need surround sound?', 'A good soundbar is a tidy improvement on TV speakers. Separate speakers and a subwoofer place sound around and above you and give fuller, more controlled bass. Hearing both in the same room is the quickest way to decide whether the difference matters to you.'],
      ['How long does installation take?', 'A living-room system in a finished room is usually a short job once wiring routes are agreed. A dedicated cinema with carpentry, acoustic construction, risers and seating is a multi-week project. ROS gives a timeline with each proposal. <span class="placeholder-text">[Typical durations to confirm with ROS]</span>'],
      ['Do I need acoustic treatment?', 'Most rooms benefit from some treatment. Hard floors, glass and bare walls cause echo that blurs dialogue. Treatment controls reflections inside the room. Keeping sound from reaching the neighbours is a separate task called isolation. Read more on our <a href="' + L('acoustics') + '">acoustics page</a>.'],
      ['What happens after installation?', 'Every system is set up and calibrated for the room before handover. Details of warranty handling, service visits and recalibration are confirmed in your proposal. <span class="placeholder-text">[After-sales and AMC terms to confirm with ROS]</span>'],
      ['Which areas do you serve?', 'Our showroom is in Ranchi. Projects in Jamshedpur, Dhanbad and Bokaro are being considered. <span class="placeholder-text">[Service areas to confirm with ROS]</span> Call or WhatsApp us with your location and we will tell you what is possible.']
    ];
    var services = [
      ['01', 'theatre', 'Home theatre', 'Living-room systems and dedicated cinemas, from 5.1 to full Dolby Atmos.', 'home-theatre'],
      ['02', 'acoustics', 'Acoustics & soundproofing', 'Acoustic engineering, soundproofing and studio setup, so dialogue stays clear and bass stays even.', 'acoustics'],
      ['03', 'automation', 'Automation', 'Lighting scenes, one-touch AV control and motorised screens and curtains.', 'automation'],
      ['04', 'projector', 'Projectors & audio gear', 'Projectors, speakers, subwoofers, receivers and Hi-Fi, matched to your room.', 'gear'],
      ['05', 'seat', 'Theatre construction & seating', 'Home and commercial theatre construction, premium seating and flooring.', 'seating'],
      ['06', 'boardroom', 'AV consultancy & corporate', 'Consultancy, custom design and installation for boardrooms, auditoriums and hospitality.', 'corporate']
    ];
    var budgets = [
      ['Under ₹5 lakh', 'Living-room upgrade', ['Soundbar or compact 5.1 system', 'TV or entry projector in an existing room', 'Neat cable routing, basic calibration']],
      ['₹5–10 lakh', 'Serious living room or small cinema', ['5.1.2 or 7.1 Dolby Atmos layout', 'Projector and fixed screen', 'Targeted acoustic panels, 3–4 seats']],
      ['₹10–25 lakh', 'Dedicated home theatre', ['7.1.4 Atmos with multiple subwoofers', '4K projector, light control and riser', 'Room treatment, motorised recliners, lighting scenes']],
      ['₹25 lakh+', 'Constructed private cinema', ['Isolation construction where needed', 'Reference-grade equipment and calibration', 'Bespoke interiors and full automation']]
    ];

    var F = R.feat;
    var svcImg = { 'home-theatre': 'atmos', acoustics: 'studio', automation: 'laser', gear: 'hifi', seating: 'multiplex', corporate: 'boardroom' };
    var stages = [
      ['20 Hz', '01', 'Visit', 'Listen in the demo room, then we measure your space and learn how you will use it.', 'cinema'],
      ['200 Hz', '02', 'Design', 'Speaker layout, screen size, seating and treatment, with a written equipment list and quote.', 'atmos'],
      ['2 kHz', '03', 'Build', 'Wiring, carpentry, acoustics and installation, coordinated with your architect or interior team.', 'install'],
      ['20 kHz', '04', 'Calibrate', 'Levels, distances, bass and picture set for your seats, then a walkthrough of every control.', 'projector']
    ];
    var strip = [
      ['cinema', 'Cinema auditorium', 'Commercial cinema'],
      ['multiplex', 'Recliner auditorium', 'Cinema seating'],
      ['studio', 'Studio control room', 'Acoustics'],
      ['atmos', 'Living-room Atmos', 'Home theatre'],
      ['hifi', 'Stereo listening', 'Hi-Fi'],
      ['boardroom', 'Boardroom display', 'Corporate AV']
    ];

    var html = '' +
    /* 1. Hero — photo, live visualiser, play-the-room */
    '<section class="hero hero--terrain" aria-labelledby="home-h1">' +
      '<canvas class="terrain" aria-hidden="true"></canvas><div class="grain" aria-hidden="true"></div>' +
      '<div class="wrap hero-grid">' +
        '<div class="hero-copy">' +
          '<p class="eyebrow" data-hero style="--h:0"><span class="hide-m">Republic of Sound Audio · </span>Ranchi, Jharkhand · Since 2011</p>' +
          '<h1 class="display" id="home-h1" tabindex="-1">' + lines(['Home theatres, Hi-Fi', 'and acoustics, designed', 'in Ranchi <em>since 2011.</em>']) + '</h1>' +
          '<p class="lede" data-hero style="--h:2">Hear it live in our demo room before you decide.</p>' +
          '<div class="btn-row" data-hero style="--h:3">' + U.btnDemo('book-demo-hero') + U.btnWA('whatsapp-hero') + '</div>' +
        '</div>' +
        '<div class="hero-side" data-hero style="--h:4">' + F.playButton('play-hero') + '<p class="xs">Press play and watch<br>the sound. Headphones on.</p></div>' +
      '</div>' +
      '<div class="hero-scale" aria-hidden="true"><span>20 Hz</span><span>200 Hz</span><span>2 kHz</span><span>20 kHz</span></div>' +
    '</section>' +

    /* 2. Ticker — verified facts only */
    '<section class="ticker" aria-label="About Republic of Sound">' +
      '<div class="marquee marquee--big"><div class="marquee-track"><div class="marquee-set">' +
        ['Established 2011', 'Ranchi, Jharkhand', 'Listen before you decide', 'Design', 'Build', 'Calibrate', 'Homes and businesses'].map(function (t) { return '<span>' + t + '</span><i aria-hidden="true">✦</i>'; }).join('') +
      '</div><div class="marquee-set" aria-hidden="true">' +
        ['Established 2011', 'Ranchi, Jharkhand', 'Listen before you decide', 'Design', 'Build', 'Calibrate', 'Homes and businesses'].map(function (t) { return '<span>' + t + '</span><i>✦</i>'; }).join('') +
      '</div></div></div>' +
    '</section>' +

    /* 3. Statement */
    '<section class="sec sec--dark statement" aria-labelledby="st-h">' +
      '<div class="wrap">' +
        '<div class="why">' +
        '<div class="why-top">' +
          '<p class="eyebrow">Why ROS</p><h2 class="h-sec big-statement" id="st-h" data-reveal="lines">' + lines(['A great system in', 'the wrong room still', 'sounds <em>wrong.</em>']) + '</h2>' +
          '<p class="lede muted" data-reveal>So we start with the room: its size, its surfaces, where you sit. Then we choose equipment to suit it, and tune everything until the room disappears and the film takes over.</p>' +
        '</div>' +
        '<ul class="why-points" data-reveal="rule">' +
          [
            ['<span data-count-to="' + (2026 - 2011) + '">' + (2026 - 2011) + '</span>', 'Years in Ranchi', 'Designing and fitting rooms here since 2011.'],
            ['Range', 'The finest brands', 'A wide range of speakers, projectors and seating, matched to your room rather than a price list.'],
            ['One', 'Team, start to finish', 'The people who plan your room also build it, calibrate it and hand it over.']
          ].map(function (w, i) {
            return '<li data-reveal style="--i:' + i + '"><span class="why-big"><span>' + w[0] + '</span></span><h3>' + w[1] + '</h3><p class="muted">' + w[2] + '</p></li>';
          }).join('') +
        '</ul>' +
        '</div>' +
      '</div>' +
    '</section>' +

    /* 3b. Brand reel */
    (F.reel() ? '<section class="sec sec--dark reel-sec" aria-labelledby="reel-h">' +
      '<div class="wrap"><div class="reel-split">' +
        '<div><p class="eyebrow">The reel</p><h2 class="h-sec" id="reel-h" data-reveal="lines">' + lines(['Twenty seconds', 'of <em>what we do.</em>']) + '</h2>' +
          '<p class="muted" data-reveal>Home theatres, cinemas and the rooms in between. Turn the sound up.</p></div>' +
        F.reel() +
      '</div></div>' +
    '</section>' : '') +

    /* 4. Services — photo tiles */
    '<section class="sec sec--dark services-sec" aria-labelledby="svc-h">' +
      '<div class="wrap">' +
        U.secHead('Our audio-visual & acoustic services', ['Six disciplines,', '<em>one room</em> at a time.'], 'Most rooms need more than one. We plan them together so picture, sound, seating and light work as one system.', 'svc-h') +
        '<ul class="svc-tiles" role="list">' + services.map(function (s, i) {
          return '<li class="svc-tile svc-tile--' + (i + 1) + '" data-reveal style="--i:' + (i % 3) + '">' +
            '<a href="' + L(s[4]) + '" data-cta="service-tile-' + s[4] + '" data-cursor="Explore">' +
              R.feat.photo(svcImg[s[4]], { reveal: false, credit: false, parallax: false, alt: '' }) +
              '<span class="st-top"><span class="st-n">' + s[0] + '</span>' + A.icon(s[1], 'st-ico') + '</span>' +
              '<span class="st-body"><span class="st-name">' + s[2] + '</span><span class="st-desc">' + s[3] + '</span>' +
              '<span class="st-more">Explore' + A.icon('arrow', 'ico') + '</span></span>' +
              '<span class="st-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>' +
            '</a></li>';
        }).join('') + '</ul>' +
      '</div>' +
    '</section>' +

    /* 5. Speaker explorer */
    '<section class="sec sec--dark" aria-labelledby="spx-h">' +
      '<div class="wrap"><div class="split split--rev-tools">' +
        '<div><p class="eyebrow">Try it</p><h2 class="h-sec" id="spx-h" data-reveal="lines">' + lines(['Hear where', 'every speaker', '<em>sits.</em>']) + '</h2>' +
          '<p class="muted">Switch between 5.1, 5.1.2 and 7.1.4, then tap a speaker or run the sweep. It’s how we explain a layout before you sit in the real thing.</p>' +
          '<a class="link-arrow" href="' + L('guide-atmos') + '">Room size for Dolby Atmos' + arr() + '</a></div>' +
        F.speakerExplorer('spx-home') +
      '</div></div>' +
    '</section>' +

    /* 6. Process — pinned horizontal frequency scroll */
    '<section class="hs sec--charcoal" data-hscroll aria-labelledby="proc-h">' +
      '<div class="hs-sticky">' +
        '<div class="wrap hs-head"><div><p class="eyebrow">How a project runs</p><h2 class="h-sec" id="proc-h">Visit. Design. Build. <em>Calibrate.</em></h2></div><div class="hs-bar" aria-hidden="true"><i></i></div><p class="swipe-hint" aria-hidden="true">Swipe</p></div>' +
        '<ol class="hs-track">' + stages.map(function (st, i) {
          return '<li class="hs-panel"><div class="hs-photo">' + F.photo(st[4], { reveal: false, credit: false, parallax: false, alt: '' }) + '</div>' +
            '<div class="hs-body"><span class="hs-freq">' + st[0] + '</span><span class="hs-n">' + st[1] + '</span><h3>' + st[2] + '</h3><p>' + st[3] + '</p></div></li>';
        }).join('') + '</ol>' +
      '</div>' +
    '</section>' +

    /* 7. Demo room — full-bleed */
    '<section class="bleed" aria-labelledby="demo-h">' +
      '<div class="bleed-media" aria-hidden="true">' + F.photo('multiplex', { reveal: false, credit: false, alt: '' }) + '</div><div class="grain" aria-hidden="true"></div>' +
      '<div class="wrap bleed-inner"><div class="bleed-card" data-reveal>' +
        '<p class="eyebrow">The demo room</p>' +
        '<h2 class="h-sec" id="demo-h">' + lines(['Specifications don’t', 'tell you how a', 'room <em>feels.</em>']) + '</h2>' +
        '<ul class="demo-list">' +
          '<li><span class="k">01</span><span><b>Bring a scene or a song</b><span>Something you know by heart. <span class="placeholder-text">Supported sources to confirm</span></span></span></li>' +
          '<li><span class="k">02</span><span><b>Compare side by side</b><span>Soundbar, then surround, then overhead Atmos.</span></span></li>' +
          '<li><span class="k">03</span><span><b>Leave with a plan</b><span>Layout ideas for your room. No obligation.</span></span></li>' +
        '</ul>' + A.wave(64) +
        '<div class="btn-row" style="margin-top:1.75rem">' + U.btnDemo('book-demo-demoroom', 'Book your demo slot') + U.btnCalendly('calendly-demoroom', 'Pick a time', 'btn--ghost') + '</div>' +
      '</div></div>' +
    '</section>' +

    /* 8. Acoustic simulator */
    '<section class="sec sec--dark" aria-labelledby="asim-h">' +
      '<div class="wrap"><div class="split split--rev-tools">' +
        '<div><p class="eyebrow">Hear the difference</p><h2 class="h-sec" id="asim-h" data-reveal="lines">' + lines(['Same clap.', 'Different <em>room.</em>']) + '</h2>' +
          '<p class="muted">Drag from a bare room to a treated one and clap. The echo that smears dialogue is what acoustic treatment controls.</p>' +
          '<a class="link-arrow" href="' + L('acoustics') + '">Acoustic treatment' + arr() + '</a></div>' +
        F.acousticSim('asim-home') +
      '</div></div>' +
    '</section>' +

    /* 9. Projects strip */
    '<section class="sec sec--dark sec--flush" aria-labelledby="proj-h" data-strip>' +
      '<div class="wrap sec-head"><div><p class="eyebrow">Rooms and spaces</p><h2 class="h-sec" id="proj-h" data-reveal="lines">' + lines(['Rooms that', '<em>sound</em> right.']) + '</h2></div>' +
        '<div class="strip-nav"><button type="button" class="round-btn" data-strip-dir="-1" aria-label="Scroll left">' + A.icon('arrow', 'ico flip') + '</button><button type="button" class="round-btn" data-strip-dir="1" aria-label="Scroll right">' + A.icon('arrow') + '</button></div></div>' +
      '<ul class="strip-track" role="list">' + strip.map(function (c, i) {
        return '<li class="strip-card"><a href="' + L('projects') + '" data-cta="strip-card-' + c[0] + '" data-cursor="Drag · View">' + F.photo(c[0], { reveal: false, credit: false, parallax: false }) +
          '<span class="sc-meta">' + c[2] + '</span><span class="sc-title">' + c[1] + '</span></a></li>';
      }).join('') + '</ul>' +
      '<p class="wrap xs muted" style="margin-top:1.25rem">Photos from the current rosaudio.com. Project names, clients and details to be confirmed by ROS.</p>' +
    '</section>' +

    /* 10. Clients and brands (logos from the current rosaudio.com) */
    '<section class="sec sec--dark clients-sec" aria-labelledby="cl-h">' +
      '<div class="wrap">' +
        U.secHead('Clients', ['Who we have', '<em>worked with.</em>'], 'Businesses, venues and institutions shown on the current ROS website. ' + tbc('Project details to confirm'), 'cl-h') +
        '<ul class="clients" role="list">' + R.CLIENTS.map(function (c, i) {
          var im = R.IMAGES[c[0]];
          return '<li data-reveal style="--i:' + (i % 6) + '"><img src="' + R.imgUrl(c[0]) + '" width="' + im.w + '" height="' + im.h + '" alt="' + c[1] + '" loading="lazy" decoding="async"></li>';
        }).join('') + '</ul>' +
      '</div>' +
      '<div class="clients-brands"><div class="wrap"><h3 class="eyebrow">Brands on the current ROS website · partner status to confirm</h3></div>' + F.marquee() + '</div>' +
    '</section>' +

    /* 11. Product range (categories and photos from the current rosaudio.com) */
    (function () {
      var groups = [['audio', 'Premium audio gear', 'gear'], ['projectors', 'Premium projectors', 'gear'], ['cables', 'Audio & video cables', 'gear'], ['seating', 'Luxury home & cinema seating', 'seating']];
      var items = [
        ['audio', 'atmos', 'Atmos speakers'], ['audio', 'g-satellite', 'Satellite speakers'], ['audio', 'hifi', 'Floor-standing speakers'], ['audio', 'g-wall', 'Wall speakers'],
        ['audio', 'g-sub', 'Subwoofers'], ['audio', 'g-soundbar', 'Sound bars'], ['audio', 'g-avr', 'AV receivers'], ['audio', 'g-disc', 'CD / Blu-ray players'],
        ['projectors', 'install', 'LED projectors'], ['projectors', 'g-portable', 'Portable projectors'], ['projectors', 'laser', 'Full HD short-throw projectors'], ['projectors', 'projector', '4K projectors'],
        ['cables', 'k-usb', 'USB cables'], ['cables', 'k-eth', 'RJ45 Ethernet cables'], ['cables', 'k-optical', 'Optical cables'], ['cables', 'k-audio', 'Audio cables'],
        ['seating', 's-manual', 'Home theatre recliners, manual'], ['seating', 'recliners', 'Home theatre recliners, motorised'], ['seating', 'multiplex', 'Auditorium, multiplex & cinema chairs'], ['seating', 's-lounger', 'Loungers']
      ];
      var gById = {}; groups.forEach(function (g) { gById[g[0]] = g; });
      var first = groups[0][0];
      return '<section class="sec sec--paper" aria-labelledby="range-h">' +
        '<div class="wrap">' +
          U.secHead('The range', ['Premium gear,', '<em>hand-picked.</em>'], 'What we supply and install, from speakers and projectors to cables and cinema seating. Models change, so ask on WhatsApp for what is in stock.', 'range-h') +
          '<div class="tabs" role="group" aria-label="Filter the range" data-filter-group="range">' + groups.map(function (g) {
            return '<button class="chip" type="button" data-filter="' + g[0] + '" aria-pressed="' + (g[0] === first) + '">' + g[1] + '</button>';
          }).join('') + '</div>' +
          '<p class="sr-only" role="status" data-filter-status="range"></p>' +
          '<ul class="rng-grid" role="list" data-filter-target="range">' + items.map(function (it, i) {
            var im = R.IMAGES[it[1]], g = gById[it[0]];
            return '<li class="rng" data-cat="' + it[0] + '"' + (it[0] === first ? ' data-reveal style="--i:' + (i % 4) + '"' : ' hidden') + '>' +
              '<a href="' + L(g[2]) + '" data-cta="range-' + it[1] + '">' +
                '<span class="rng-ph"><img src="' + R.imgUrl(it[1]) + '" width="' + im.w + '" height="' + im.h + '" alt="" loading="lazy" decoding="async"></span>' +
                '<span class="rng-g">' + g[1] + '</span><span class="rng-name">' + it[2] + '</span></a></li>';
          }).join('') + '</ul>' +
        '</div>' +
      '</section>';
    })() +

    /* 12. Budget guidance */
    '<section class="sec sec--paper" aria-labelledby="bud-h">' +
      '<div class="wrap">' +
        U.secHead('Budget guidance', ['What different', 'budgets <em>usually</em> buy.'], 'Illustrative bands to start the conversation. The room, equipment and building work decide the final figure.', 'bud-h') +
        '<p class="swipe-hint swipe-hint--light" aria-hidden="true">Swipe</p><div class="grid g-4 m-swipe">' + budgets.map(function (b, i) {
          return '<article class="budget" data-reveal style="--i:' + i + '"><span class="xs muted" style="font-weight:700;letter-spacing:.1em;text-transform:uppercase">' + b[1] + '</span><h3 class="band">' + b[0] + '</h3><ul>' + b[2].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' + tbc('Illustrative') + '</article>';
        }).join('') + '</div>' +
        '<p class="small muted" style="margin-top:2rem">Want the detail? Read <a href="' + L('guide-cost') + '" style="color:var(--brass-ink);font-weight:700">What does a home theatre cost in India?</a></p>' +
      '</div>' +
    '</section>' +

    /* 13. FAQ */
    '<section class="sec sec--paper" aria-labelledby="faq-h">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Buyer questions</p><h2 class="h-sec" id="faq-h" data-reveal="lines">' + lines(['Before you', '<em>decide.</em>']) + '</h2><p class="muted">Straight answers to what we’re asked most. Anything else, ask on WhatsApp.</p>' + U.btnWA('whatsapp-faq-home', 'Ask a question', 'btn--ghost') + '</div>' +
        U.faq(faqs, 'hfaq') +
      '</div></div>' +
    '</section>' +

    /* 14. Location & contact */
    '<section class="sec sec--dark" aria-labelledby="loc-h">' +
      '<div class="wrap"><div class="split split--even">' +
        '<div><p class="eyebrow">Visit the showroom</p><h2 class="h-sec" id="loc-h" data-reveal="lines">' + lines(['Find us in', '<em>Ranchi.</em>']) + '</h2>' + contactBlock('home-location') + '</div>' +
        mapPlaceholder() +
      '</div></div>' +
    '</section>' +

    /* 15. Closing call to action (the full enquiry form lives on the contact page) */
    '<section class="sec sec--charcoal end-cta" aria-labelledby="end-cta-h">' +
      '<div class="wrap">' +
        '<p class="eyebrow" data-reveal>Start a project</p>' +
        '<h2 class="end-cta-h" id="end-cta-h" data-reveal="lines">' + lines(['Let’s design', 'your <em>room.</em>']) + '</h2>' +
        '<p class="lede" data-reveal>Tell us about the space and what you watch or listen to. We’ll suggest the right next step: a demo, a site visit or a quick call.</p>' +
        '<div class="btn-row" data-reveal style="--i:2">' +
          '<a class="btn btn--primary btn--lg" href="' + L('contact') + '" data-cta="start-project-home" data-cursor="Start">Start a project' + arr() + '</a>' +
          U.btnDemo('book-demo-home-end', 'Book a free demo', 'btn--ghost btn--lg') +
          U.btnWA('whatsapp-home-end', 'WhatsApp us', 'btn--ghost btn--lg') +
        '</div>' +
      '</div>' +
    '</section>';
    return { html: html, faqs: faqs };
  };

  /* ============================================================ HOME THEATRE */
  P['home-theatre'] = function (route) {
    var faqs = [
      ['Do you install in apartments as well as independent houses?', 'Yes. Apartments often suit living-room systems with in-wall or on-wall speakers. Dedicated rooms are possible where a spare room can be darkened and treated. We check wiring routes and society rules during the site visit.'],
      ['Can you work with my interior designer?', 'Yes. Speaker positions, conduit, power, screen walls and lighting need to be agreed before false ceilings and panelling go in. Early coordination avoids rework.'],
      ['Can I reuse equipment I already own?', 'Often, yes. We will tell you honestly which components still suit the new design and which are holding the system back.']
    ];
    var html = U.pageHero(route, {
      eyebrow: 'Home theatre · Ranchi',
      h1: ['Home theatre', 'installation <em>in Ranchi.</em>'],
      lede: 'From a sharper living-room setup to a dedicated private cinema, each system is laid out for your room, your seats and what you watch.',
      ctas: '<a class="btn btn--primary" href="' + L('contact') + '#enquiry" data-cta="site-visit-hero">Request a free site visit' + arr() + '</a>' + U.btnWA('whatsapp-ht-hero'),
      photo: 'atmos'
    }) +
    '<section class="sec sec--light" aria-labelledby="ht-types">' +
      '<div class="wrap">' + U.secHead('Two kinds of room', ['Living room or', '<em>dedicated</em> cinema?'], 'The right answer depends on whether the room has other jobs to do.', 'ht-types') +
        '<div class="grid g-2">' +
          '<article data-reveal>' + R.feat.photo('laser') +
            '<h3 style="margin-top:1.5rem;font-size:1.3rem">Living-room systems</h3><p class="muted">Built around family viewing, daylight and décor. Typical choices are a large TV or ambient-light screen, a 5.1 or 5.1.2 layout, slim or in-wall speakers, and wiring hidden in the walls or ceiling.</p></article>' +
          '<article data-reveal style="--i:1">' + R.feat.photo('multiplex') +
            '<h3 style="margin-top:1.5rem;font-size:1.3rem">Dedicated home cinema</h3><p class="muted">A light-controlled room used only for films, sport and music. It allows a projector and large screen, 7.1.4 Dolby Atmos, acoustic treatment, a riser for the second row and recliners.</p></article>' +
        '</div></div>' +
    '</section>' +
    '<section class="sec sec--paper" aria-labelledby="ht-atmos">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Dolby Atmos</p><h2 class="h-sec" id="ht-atmos" data-reveal="lines">' + lines(['Sound placed', '<em>around</em> and above.']) + '</h2>' +
          '<p class="muted">Atmos adds height channels to a surround layout. The naming is simple: the first number is ear-level speakers, the second is subwoofers, the third is overhead speakers. More channels only help if the room is large enough to place them properly.</p>' +
          '<a class="link-arrow" href="' + L('guide-atmos') + '">Room size for Dolby Atmos' + arr() + '</a></div>' +
        '<div class="tbl-wrap" data-reveal><table class="tbl"><caption>Common speaker layouts</caption><thead><tr><th scope="col">Layout</th><th scope="col">Speakers</th><th scope="col">Usually suits</th></tr></thead><tbody>' +
          '<tr><th scope="row">5.1</th><td>Front L/C/R, two surrounds, one subwoofer</td><td>Living rooms and first systems</td></tr>' +
          '<tr><th scope="row">7.1</th><td>5.1 plus two rear surrounds</td><td>Longer rooms with seating away from the back wall</td></tr>' +
          '<tr><th scope="row">5.1.2</th><td>5.1 plus two overhead speakers</td><td>Living rooms that want height effects</td></tr>' +
          '<tr><th scope="row">5.1.4</th><td>5.1 plus four overhead speakers</td><td>Medium rooms with good ceiling access</td></tr>' +
          '<tr><th scope="row">7.1.4</th><td>7.1 plus four overhead speakers</td><td>Dedicated rooms with two rows</td></tr>' +
          '<tr><th scope="row">7.2.4 and up</th><td>Extra subwoofers and/or wides</td><td>Larger cinemas wanting even bass across seats</td></tr>' +
        '</tbody></table></div>' +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--dark" aria-labelledby="ht-tools">' +
      '<div class="wrap">' + U.secHead('Interactive', ['Hear the layout.', 'Size the <em>screen.</em>'], 'Two quick tools we use in consultations. Tap speakers to hear their positions, then set your seating distance.', 'ht-tools') +
        '<div class="grid g-2 tools-grid">' + R.feat.speakerExplorer('spx-ht') + R.feat.screenCalc('sc-ht') + '</div></div>' +
    '</section>' +
    '<section class="sec sec--light" aria-labelledby="ht-scope">' +
      '<div class="wrap">' + U.secHead('What is included', ['Everything that', 'touches the <em>experience.</em>'], null, 'ht-scope') +
        '<ul class="feat">' +
          '<li data-reveal><b>Projectors and screens</b><span>Screen size from your seating distance, fixed or motorised screens, and projectors matched to how dark the room gets.</span></li>' +
          '<li data-reveal style="--i:1"><b>Speakers and amplification</b><span>On-wall, in-wall, in-ceiling or floor-standing, with an AV receiver or separates sized for the room.</span></li>' +
          '<li data-reveal><b>Seating and risers</b><span>Recliner rows set out for sightlines and speaker angles. See <a href="' + L('seating') + '">cinema seating</a>.</span></li>' +
          '<li data-reveal style="--i:1"><b>Wiring and power</b><span>Conduit, speaker cable, HDMI and network runs planned before plaster and false ceilings.</span></li>' +
          '<li data-reveal><b>Room design and treatment</b><span>Absorption, diffusion and bass control. See <a href="' + L('acoustics') + '">acoustics</a>.</span></li>' +
          '<li data-reveal style="--i:1"><b>Calibration and handover</b><span>Speaker distances, levels, bass and picture set in the room, then a walkthrough of every control.</span></li>' +
        '</ul></div>' +
    '</section>' +
    '<section class="sec sec--dark" aria-labelledby="ht-process">' +
      '<div class="wrap">' + U.secHead('The site visit', ['What we check', 'in <em>your</em> room.'], 'The visit is free. You get a written recommendation afterwards. ' + '<span class="placeholder-text">[Confirm visit is free of charge in all areas]</span>', 'ht-process') +
        '<ol class="steps" style="list-style:none;padding:0;margin:0">' +
          '<li class="step" data-reveal><span class="n">01</span><h3>Measure</h3><p>Length, width, ceiling height, doors, windows and where seats can go.</p></li>' +
          '<li class="step" data-reveal style="--i:1"><span class="n">02</span><h3>Listen</h3><p>Clap and speech tests reveal echo and hard surfaces that need attention.</p></li>' +
          '<li class="step" data-reveal style="--i:2"><span class="n">03</span><h3>Route</h3><p>Cable paths, power points, rack position and ventilation for equipment.</p></li>' +
          '<li class="step" data-reveal style="--i:3"><span class="n">04</span><h3>Propose</h3><p>Layout options at two or three budget levels, with trade-offs explained.</p></li>' +
        '</ol></div>' +
    '</section>' +
    '<section class="sec sec--paper" aria-labelledby="ht-budget">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Budget guidance</p><h2 class="h-sec" id="ht-budget" data-reveal="lines">' + lines(['Where the', 'money <em>goes.</em>']) + '</h2><p class="muted">In most dedicated rooms the split between equipment, room work and seating matters as much as the total.</p>' + tbc('Illustrative — ROS to confirm') + '</div>' +
        '<div class="tbl-wrap"><table class="tbl"><caption>Indicative spend split for a dedicated room</caption><thead><tr><th scope="col">Area</th><th scope="col">Typical share</th><th scope="col">Notes</th></tr></thead><tbody>' +
          '<tr><th scope="row">Audio (speakers, subs, amplification)</th><td>35–45%</td><td>Biggest effect on the experience</td></tr>' +
          '<tr><th scope="row">Display (projector and screen)</th><td>20–30%</td><td>Depends on room light and screen size</td></tr>' +
          '<tr><th scope="row">Acoustics and construction</th><td>15–25%</td><td>Higher if isolation is needed</td></tr>' +
          '<tr><th scope="row">Seating, lighting, control</th><td>10–20%</td><td>Motorised recliners raise this</td></tr>' +
        '</tbody></table></div>' +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--light" aria-labelledby="ht-faq">' +
      '<div class="wrap"><div class="split"><div><p class="eyebrow">Questions</p><h2 class="h-sec" id="ht-faq">Home theatre <em>FAQs</em></h2></div>' + U.faq(faqs, 'htfaq') + '</div></div>' +
    '</section>' +
    U.ctaBand({ id: 'ht-cta', h2: ['Start with a', '<em>site visit.</em>'], text: 'We measure, listen and come back with layout options and a written quote.',
      ctas: '<a class="btn btn--primary" href="' + L('contact') + '#enquiry" data-cta="site-visit-band">Request a free site visit' + arr() + '</a>' + U.btnDemo('book-demo-ht-band', 'Book a demo first', 'btn--ghost') });
    return { html: html, faqs: faqs };
  };

  /* =============================================================== ACOUSTICS */
  P.acoustics = function (route) {
    var faqs = [
      ['Will acoustic panels stop sound leaking to my neighbours?', 'No. Panels absorb reflections inside the room. Stopping sound passing through walls, floors and doors needs mass, airtight seals and decoupled construction. That is a building project and is assessed separately.'],
      ['Can you guarantee complete soundproofing?', 'Not without assessing the building. How much isolation is possible depends on the existing walls, slab, doors, windows, ventilation and how loud you plan to play. We explain realistic targets after the assessment.'],
      ['Do acoustic panels have to look industrial?', 'No. Fabric colours, timber slats and frames can be specified to match interiors, and some treatment can sit behind acoustically transparent fabric walls.']
    ];
    var html = U.pageHero(route, {
      eyebrow: 'Acoustics · Ranchi',
      h1: ['Acoustic treatment', '<em>in Ranchi.</em>'],
      lede: 'Clear dialogue, controlled bass and a room that sounds as good as the equipment in it. Start with an assessment, not a catalogue.',
      ctas: '<a class="btn btn--primary" href="' + L('contact') + '#enquiry" data-cta="acoustic-assessment-hero">Request an acoustic assessment' + arr() + '</a>' + U.btnWA('whatsapp-ac-hero'),
      photo: 'studio'
    }) +
    '<section class="sec sec--light" aria-labelledby="ac-diff">' +
      '<div class="wrap">' + U.secHead('Three different jobs', ['Absorption, treatment', 'and <em>isolation.</em>'], 'These terms are often used interchangeably. They solve different problems and cost very different amounts.', 'ac-diff') +
        '<div class="compare" data-reveal>' +
          '<div><span class="q">Inside the room</span><h3>Sound absorption</h3><p class="muted small">Soft, porous materials turn some sound energy into heat. They reduce echo and harshness. Panels, curtains and carpets all absorb, mostly at mid and high frequencies.</p></div>' +
          '<div><span class="q">Inside the room</span><h3>Room treatment</h3><p class="muted small">A planned mix of absorption, diffusion and bass trapping placed at the right reflection points. The aim is balance: not a dead room, but a controlled one.</p></div>' +
          '<div><span class="q">Between rooms</span><h3>Sound isolation</h3><p class="muted small">Keeping sound in or out. It needs mass, airtightness and decoupling: built walls, floating floors, sealed doors. Panels on their own do not isolate.</p></div>' +
        '</div></div>' +
    '</section>' +
    '<section class="sec sec--dark" aria-labelledby="ac-sim">' +
      '<div class="wrap"><div class="split split--rev-tools"><div><p class="eyebrow">Hear the difference</p><h2 class="h-sec" id="ac-sim" data-reveal="lines">' + lines(['Same clap.', 'Different <em>room.</em>']) + '</h2>' +
        '<p class="muted">Reverberation time (RT60) is how long a sound takes to fade by 60 dB. Drag the slider to hear a bare room become a treated one.</p></div>' + R.feat.acousticSim('asim-ac') + '</div></div>' +
    '</section>' +
    '<section class="sec sec--paper" aria-labelledby="ac-where">' +
      '<div class="wrap">' + U.secHead('Where we work', ['Rooms that need', 'to sound <em>right.</em>'], null, 'ac-where') +
        '<ul class="feat">' +
          '<li data-reveal><b>Acoustic panels</b><span>Fabric-wrapped absorbers, timber slat panels and diffusers sized and placed for each wall.</span></li>' +
          '<li data-reveal style="--i:1"><b>Reverberation control</b><span>Bringing echo down in halls, living spaces and places of worship so speech is intelligible.</span></li>' +
          '<li data-reveal><b>Home theatre treatment</b><span>First-reflection control, rear-wall diffusion and bass trapping for even sound across every seat.</span></li>' +
          '<li data-reveal style="--i:1"><b>Recording and listening rooms</b><span>Neutral, accurate rooms for critical listening and Hi-Fi.</span></li>' +
          '<li data-reveal><b>Studio acoustics</b><span>Control rooms, vocal booths and podcast rooms. The current ROS website lists studio setup among its services.</span></li>' +
          '<li data-reveal style="--i:1"><b>Boardrooms</b><span>Treatment that makes video calls clearer for the people on the other end. See <a href="' + L('corporate') + '">corporate AV</a>.</span></li>' +
        '</ul></div>' +
    '</section>' +
    '<section class="sec sec--dark" aria-labelledby="ac-steps">' +
      '<div class="wrap">' + U.secHead('How it works', ['Assess, design,', '<em>install.</em>'], null, 'ac-steps') +
        '<ol class="steps" style="list-style:none;padding:0;margin:0">' +
          '<li class="step" data-reveal><span class="n">01</span><h3>Assess</h3><p>Room dimensions, surfaces, construction and the noise problem you want solved.</p></li>' +
          '<li class="step" data-reveal style="--i:1"><span class="n">02</span><h3>Define</h3><p>Agree realistic targets: less echo, even bass, or reduced transfer to other rooms.</p></li>' +
          '<li class="step" data-reveal style="--i:2"><span class="n">03</span><h3>Design</h3><p>Treatment plan with materials, finishes and positions, plus isolation details if needed.</p></li>' +
          '<li class="step" data-reveal style="--i:3"><span class="n">04</span><h3>Install</h3><p>Fitting and finishing, then a listening check with you in the room.</p></li>' +
        '</ol>' +
        '<p class="small" style="color:var(--on-dark-muted);margin-top:2.5rem">Whether in-room acoustic measurement is part of the assessment: <span class="placeholder-text">[ROS to confirm tools and method]</span></p>' +
      '</div>' +
    '</section>' +
    '<section class="sec sec--light" aria-labelledby="ac-faq">' +
      '<div class="wrap"><div class="split"><div><p class="eyebrow">Questions</p><h2 class="h-sec" id="ac-faq">Acoustics <em>FAQs</em></h2><p class="muted">More detail in <a href="' + L('guides') + '" style="color:var(--brass-ink);font-weight:700">our guides</a>.</p></div>' + U.faq(faqs, 'acfaq') + '</div></div>' +
    '</section>' +
    U.ctaBand({ id: 'ac-cta', photo: 'studio', eyebrow: 'Next step', h2: ['Book an acoustic', '<em>assessment.</em>'], text: 'Tell us what the room is for and what bothers you about it now.',
      ctas: '<a class="btn btn--primary" href="' + L('contact') + '#enquiry" data-cta="acoustic-assessment-band">Request an acoustic assessment' + arr() + '</a>' + U.btnWA('whatsapp-ac-band') });
    return { html: html, faqs: faqs };
  };

  /* ============================================================== AUTOMATION */
  P.automation = function (route) {
    var html = U.pageHero(route, {
      eyebrow: 'Automation & lighting · Ranchi',
      h1: ['Home automation', '<em>in Ranchi.</em>'],
      lede: 'One button dims the lights, lowers the screen, closes the curtains and starts the film. Control that is simple enough for every member of the family.',
      ctas: U.btnDemo('automation-demo-hero', 'Book an automation demo') + U.btnWA('whatsapp-au-hero'),
      photo: 'laser'
    }) +
    '<section class="sec sec--light" aria-labelledby="au-what">' +
      '<div class="wrap">' + U.secHead('What it does', ['Fewer remotes,', '<em>better</em> evenings.'], null, 'au-what') +
        '<ul class="feat">' +
          '<li data-reveal><b>Smart lighting</b><span>Dimmable circuits and scenes for living rooms, bedrooms and outdoor areas.</span></li>' +
          '<li data-reveal style="--i:1"><b>Theatre lighting scenes</b><span>Pre-show, film, interval and clean-up scenes, with step lights that stay on for safety.</span></li>' +
          '<li data-reveal><b>AV control</b><span>One remote, keypad or app to switch sources, adjust volume and power the system on and off.</span></li>' +
          '<li data-reveal style="--i:1"><b>Motorised screens and curtains</b><span>Screens that drop and curtains that close as part of a scene.</span></li>' +
          '<li data-reveal><b>Existing-room upgrades</b><span>Retrofit options for finished homes where rewiring is not practical.</span></li>' +
          '<li data-reveal style="--i:1"><b>Convenience and security</b><span>The current site describes automation for convenience, efficiency, security and comfort. Scope is agreed per project.</span></li>' +
        '</ul></div>' +
    '</section>' +
    '<section class="sec sec--paper" aria-labelledby="au-int">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Integrations</p><h2 class="h-sec" id="au-int" data-reveal="lines">' + lines(['Remotes, apps and', '<em>voice</em> control.']) + '</h2><p class="muted">We only list platforms ROS installs and supports. This list will be completed with the client.</p></div>' +
        '<div class="empty" style="border-color:rgba(16,17,18,.25)"><span class="q" aria-hidden="true">' + A.icon('automation', 'ico') + '</span><div><h3>Supported platforms: to be confirmed</h3>' +
          '<p class="muted small" style="margin:0">Control systems, remote brands, apps and voice assistants will be listed here once ROS confirms which it installs and services. <span class="placeholder-text">[ROS: list supported brands and integrations]</span></p></div></div>' +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--dark" aria-labelledby="au-scene">' +
      '<div class="wrap"><div class="split split--even">' +
        '<div><p class="eyebrow">An example scene</p><h2 class="h-sec" id="au-scene" data-reveal="lines">' + lines(['Press <em>“Cinema”</em>', 'and the room', 'gets ready.']) + '</h2></div>' +
        '<ol class="demo-list" style="list-style:none">' +
          '<li data-reveal><span class="k">00:00</span><span><b>Lights fade</b><span>Main lights dim over a few seconds; step lights stay on.</span></span></li>' +
          '<li data-reveal style="--i:1"><span class="k">00:03</span><span><b>Curtains close, screen lowers</b><span>Motorised where installed.</span></span></li>' +
          '<li data-reveal style="--i:2"><span class="k">00:05</span><span><b>Projector and audio wake</b><span>Correct inputs selected, volume at a set starting level.</span></span></li>' +
          '<li data-reveal style="--i:3"><span class="k">Pause</span><span><b>Interval</b><span>Lights rise to half so nobody trips on the way out.</span></span></li>' +
        '</ol>' +
      '</div></div>' +
    '</section>' +
    U.ctaBand({ id: 'au-cta', photo: 'laser', eyebrow: 'See it working', h2: ['Book an automation', '<em>demo.</em>'], text: 'Try lighting scenes and one-touch control in person before planning your own.',
      ctas: U.btnDemo('automation-demo-band', 'Book an automation demo') + U.btnWA('whatsapp-au-band') });
    return { html: html, faqs: [] };
  };

  /* ==================================================================== GEAR */
  P.gear = function (route) {
    var cats = [
      ['audio', 'atmos', 'Dolby Atmos speakers', 'Ceiling, upfiring and on-wall height speakers.'],
      ['audio', 'satellite', 'Satellite speakers', 'Compact speakers for living rooms and surrounds.'],
      ['audio', 'speaker', 'Floor-standing speakers', 'Full-range speakers for music and front channels.'],
      ['audio', 'inwall', 'In-wall speakers', 'Flush-mounted speakers that disappear into the room.'],
      ['audio', 'sub', 'Subwoofers', 'Bass extension, ideally more than one for even bass.'],
      ['audio', 'soundbar', 'Soundbars', 'Tidy single-box upgrades over TV speakers.'],
      ['audio', 'receiver', 'AV receivers', 'Decoding, switching and amplification for surround.'],
      ['audio', 'disc', 'CD and Blu-ray players', 'Disc playback for collectors and best-quality video.'],
      ['hifi', 'hifi', 'Hi-Fi systems', 'Stereo amplification and sources for music listening.'],
      ['projectors', 'proj4k', '4K projectors', 'Detail for large screens in light-controlled rooms.'],
      ['projectors', 'projector', 'Full HD projectors', 'Value-focused big-screen viewing.'],
      ['projectors', 'projector', 'Short-throw projectors', 'Large images from close to the screen.'],
      ['projectors', 'projector', 'LED projectors', 'Long-life light sources with fast start-up.'],
      ['projectors', 'projector', 'Portable projectors', 'Compact units for flexible spaces.'],
      ['cables', 'cable', 'Audio and optical cables', 'Speaker, analogue interconnect and optical links.'],
      ['cables', 'cable', 'HDMI, USB and Ethernet', 'Signal and network runs specified for distance.']
    ];
    var html = U.pageHero(route, {
      eyebrow: 'Projectors & audio gear · Ranchi',
      h1: ['Projectors and', 'audio gear, <em>chosen</em>', 'for your room.'],
      lede: 'Browse by category, then hear the shortlist in our demo room. We recommend equipment for the room and budget, not from a price list.',
      ctas: U.btnWA('whatsapp-gear-hero', 'Enquire on WhatsApp', 'btn--primary') + U.btnDemo('book-demo-gear-hero', 'Book a listening demo', 'btn--ghost'),
      photo: 'projector'
    }) +
    '<section class="sec sec--light" aria-labelledby="gear-cats">' +
      '<div class="wrap">' + U.secHead('Categories', ['Browse by', '<em>category.</em>'], 'Stock and current models change. Ask on WhatsApp for what is available now.', 'gear-cats') +
        '<div class="tabs" role="group" aria-label="Filter categories" data-filter-group="gear">' +
          [['all', 'All'], ['audio', 'Speakers & audio'], ['projectors', 'Projectors'], ['hifi', 'Hi-Fi'], ['cables', 'Cables']].map(function (t, i) {
            return '<button class="chip" type="button" data-filter="' + t[0] + '" aria-pressed="' + (i === 0) + '">' + t[1] + '</button>';
          }).join('') + '</div>' +
        '<p class="sr-only" role="status" data-filter-status="gear"></p>' +
        '<div class="cat-grid" data-filter-target="gear">' + cats.map(function (c) {
          return '<div class="cat" data-cat="' + c[0] + '">' + A.icon(c[1], 'ico') + '<h3>' + c[2] + '</h3><p>' + c[3] + '</p>' +
            '<a class="link-arrow" href="' + C.waLink('Hi ROS, I am interested in ' + c[2].toLowerCase() + '.') + '" target="_blank" rel="noopener" data-cta="whatsapp-gear-' + c[2].toLowerCase().replace(/[^a-z0-9]+/g, '-') + '">Ask about ' + c[2].toLowerCase() + arr() + '<span class="sr-only"> (opens WhatsApp)</span></a></div>';
        }).join('') + '</div>' +
      '</div>' +
    '</section>' +
    '<section class="sec sec--charcoal" aria-labelledby="gear-hifi">' +
      '<div class="wrap"><div class="split split--even">' +
        R.feat.photo('hifi') +
        '<div><p class="eyebrow">Hi-Fi listening</p><h2 class="h-sec" id="gear-hifi" data-reveal="lines">' + lines(['Music deserves', 'its own <em>audition.</em>']) + '</h2>' +
          '<p style="color:var(--on-dark-muted)">The current ROS site describes high-fidelity audio as reproduction that stays true to the original recording, with low noise and distortion. The only way to judge that is to listen.</p>' +
          '<ul class="demo-list">' +
            '<li><span class="k">01</span><span><b>Bring your music</b><span>Familiar tracks reveal differences fastest. <span class="placeholder-text">[Formats and streaming sources to confirm]</span></span></span></li>' +
            '<li><span class="k">02</span><span><b>Compare speakers and amplification</b><span>Hear what changes, and what does not, as budgets rise.</span></span></li>' +
            '<li><span class="k">03</span><span><b>Plan for your room</b><span>Placement and room treatment often matter as much as the components.</span></span></li>' +
          '</ul>' +
          '<div class="btn-row">' + U.btnDemo('book-demo-hifi', 'Book a Hi-Fi listening session') + '</div></div>' +
      '</div></div>' +
    '</section>' +
    '<section class="sec sec--paper" aria-labelledby="gear-brands">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Brands</p><h2 class="h-sec" id="gear-brands">Brands on the <em>current</em> site</h2>' +
          '<p class="muted">These logos appear on rosaudio.com today. They are shown here as names only and are not presented as authorised dealerships until ROS confirms each relationship.</p></div>' +
        '<div><ul class="brand-list">' + C.brandsReferenced.map(function (b) { return '<li>' + b + tbc('Status to confirm') + '</li>'; }).join('') + '</ul>' +
          '<p class="small muted" style="margin-top:1.5rem">Product names, models, prices and stock will only be published once confirmed by ROS. <span class="placeholder-text">[ROS: confirm partner brands and authorisation]</span></p></div>' +
      '</div></div>' +
    '</section>' +
    U.ctaBand({ id: 'gear-cta', photo: 'projector', eyebrow: 'Quick question?', h2: ['Ask on', '<em>WhatsApp.</em>'], text: 'Send your room size and what you are looking for. We will reply with options to hear in the demo room.',
      ctas: U.btnWA('whatsapp-gear-band', 'Enquire on WhatsApp', 'btn--primary') + U.btnCall('phone-gear-band') });
    return { html: html, faqs: [] };
  };

  /* ================================================================= SEATING */
  P.seating = function (route) {
    var types = [
      ['Manual recliners', 'Lever or push-back recline. No power needed at each seat.'],
      ['Motorised recliners', 'Button-controlled recline. Plan power points under or behind the row.'],
      ['Recliner sofas', 'Joined two- and three-seat units, suited to family rooms.'],
      ['Loungers', 'Deep, relaxed seats for front rows or mixed-use rooms.'],
      ['Cinema chairs', 'Fixed or rocking chairs for compact or multi-row layouts.'],
      ['Auditorium seating', 'Multiplex and institutional seating for larger venues.']
    ];
    var html = U.pageHero(route, {
      eyebrow: 'Cinema seating · Ranchi',
      h1: ['Home theatre', 'recliners, <em>planned</em>', 'for your room.'],
      lede: 'Seats decide where your ears and eyes sit. We plan rows, risers and clearances first, then help you choose the chairs.',
      ctas: '<a class="btn btn--primary" href="' + L('contact') + '#enquiry" data-cta="seating-visit-hero">Arrange a seating visit' + arr() + '</a>' + U.btnWA('whatsapp-seat-hero'),
      photo: 'multiplex'
    }) +
    '<section class="sec sec--light" aria-labelledby="seat-types">' +
      '<div class="wrap">' + U.secHead('Seating types', ['From the living', 'room to the <em>auditorium.</em>'], 'The current site lists home theatre recliners (manual and motorised), auditorium, multiplex and cinema chairs, and loungers.', 'seat-types') +
        '<div class="grid g-3">' + types.map(function (t, i) {
          return '<article class="card svc" data-reveal style="min-height:0;--i:' + (i % 3) + '">' + A.icon('seat', 'svc-ico') + '<h3>' + t[0] + '</h3><p>' + t[1] + '</p></article>';
        }).join('') + '</div>' +
        '<p class="small muted" style="margin-top:2rem">Models, upholstery and colour options are confirmed per project. <span class="placeholder-text">[ROS: confirm ranges, finishes and lead times]</span></p>' +
      '</div>' +
    '</section>' +
    '<section class="sec sec--paper" aria-labelledby="seat-plan">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Room planning</p><h2 class="h-sec" id="seat-plan" data-reveal="lines">' + lines(['Measure', '<em>reclined,</em>', 'not upright.']) + '</h2><p class="muted">The most common seating mistake is planning around upright dimensions. A fully reclined chair needs far more depth.</p></div>' +
        '<div class="tbl-wrap"><table class="tbl"><caption>General planning allowances</caption><thead><tr><th scope="col">Consideration</th><th scope="col">Rule of thumb</th></tr></thead><tbody>' +
          '<tr><th scope="row">Reclined depth</th><td>Check the fully reclined length on the spec sheet; it is often well over 1.5 m</td></tr>' +
          '<tr><th scope="row">Wall clearance</th><td>Wall-hugger designs need less space behind; standard recliners need more</td></tr>' +
          '<tr><th scope="row">Walkway</th><td>Leave a clear path in front of each row when seats are reclined</td></tr>' +
          '<tr><th scope="row">Riser height</th><td>Second row raised so eye line clears heads in front; often around 300–450 mm, set by the design</td></tr>' +
          '<tr><th scope="row">Back-wall gap</th><td>Avoid placing the main row hard against the back wall; bass builds up there</td></tr>' +
          '<tr><th scope="row">Power</th><td>Motorised seats need power points planned before flooring</td></tr>' +
        '</tbody></table></div>' +
      '</div>' +
      '<p class="small muted" style="margin-top:1rem">General guidance only. Final dimensions come from the chosen model and a site survey. See <a href="' + L('guide-atmos') + '" style="color:var(--brass-ink);font-weight:700">Room size for Dolby Atmos</a>.</p></div>' +
    '</section>' +
    '<section class="sec sec--dark" aria-labelledby="seat-install">' +
      '<div class="wrap">' + U.secHead('Installation', ['Before the seats', '<em>arrive.</em>'], null, 'seat-install') +
        '<ul class="feat">' +
          '<li data-reveal><b>Riser construction</b><span>Built and carpeted before delivery, with step lights at the edge.</span></li>' +
          '<li data-reveal style="--i:1"><b>Access</b><span>Check lift, staircase and door widths; many recliners arrive in sections.</span></li>' +
          '<li data-reveal><b>Speaker angles</b><span>Rows are set so surround and overhead speakers sit correctly relative to the main seat.</span></li>' +
          '<li data-reveal style="--i:1"><b>Cabling</b><span>Power and any seat-mounted controls routed under the riser.</span></li>' +
        '</ul></div>' +
    '</section>' +
    U.ctaBand({ id: 'seat-cta', photo: 'recliners', eyebrow: 'Try before you buy', h2: ['Arrange a', '<em>seating visit.</em>'], text: 'We will measure your room and suggest row layouts before you choose a model.',
      ctas: '<a class="btn btn--primary" href="' + L('contact') + '#enquiry" data-cta="seating-visit-band">Arrange a seating visit' + arr() + '</a>' + U.btnWA('whatsapp-seat-band') });
    return { html: html, faqs: [] };
  };

  /* =============================================================== CORPORATE */
  P.corporate = function (route) {
    var html = U.pageHero(route, {
      eyebrow: 'Corporate AV · Jharkhand',
      h1: ['Boardroom AV', 'solutions <em>across</em>', 'Jharkhand.'],
      lede: 'Meeting rooms where everyone is heard, presentations that just work, and venues with sound to match their size.',
      ctas: '<a class="btn btn--primary" href="#proposal" data-cta="proposal-hero">Request a proposal' + arr() + '</a>' + U.btnCall('phone-corp-hero'),
      photo: 'boardroom'
    }) +
    '<section class="sec sec--light" aria-labelledby="corp-what">' +
      '<div class="wrap">' + U.secHead('Capabilities', ['Rooms that work', 'for <em>work.</em>'], null, 'corp-what') +
        '<ul class="feat">' +
          '<li data-reveal><b>Boardroom displays and projection</b><span>Displays or projection sized to the furthest seat, with simple wired and wireless presenting.</span></li>' +
          '<li data-reveal style="--i:1"><b>Conference-room sound</b><span>Speech-focused speakers and treatment so remote participants hear clearly.</span></li>' +
          '<li data-reveal><b>Video conferencing</b><span>Cameras, microphones and room systems for the platforms you already use.</span></li>' +
          '<li data-reveal style="--i:1"><b>Microphones and audio processing</b><span>Table, ceiling or wireless microphones with processing to control echo and feedback.</span></li>' +
          '<li data-reveal><b>Auditoriums and PA</b><span>Even coverage for halls, training centres and institutions.</span></li>' +
          '<li data-reveal style="--i:1"><b>Hospitality AV</b><span>Background music, banquet sound and screens for hotels and venues.</span></li>' +
          '<li data-reveal><b>Integration and handover</b><span>Labelled, documented systems with staff training at handover.</span></li>' +
          '<li data-reveal style="--i:1"><b>Service and maintenance</b><span><span class="placeholder-text">[ROS to confirm AMC and support terms]</span></span></li>' +
        '</ul></div>' +
    '</section>' +
    '<section class="sec sec--dark" aria-labelledby="corp-proc">' +
      '<div class="wrap">' + U.secHead('Process', ['Survey to', '<em>sign-off.</em>'], null, 'corp-proc') +
        '<ol class="steps" style="list-style:none;padding:0;margin:0">' +
          '<li class="step" data-reveal><span class="n">01</span><h3>Survey</h3><p>Room sizes, seating capacity, existing equipment, network and IT requirements.</p></li>' +
          '<li class="step" data-reveal style="--i:1"><span class="n">02</span><h3>Proposal</h3><p>Design, bill of materials, drawings and a fixed scope.</p></li>' +
          '<li class="step" data-reveal style="--i:2"><span class="n">03</span><h3>Install</h3><p>Scheduled around working hours, coordinated with facilities and IT.</p></li>' +
          '<li class="step" data-reveal style="--i:3"><span class="n">04</span><h3>Handover</h3><p>Testing, documentation and user training.</p></li>' +
        '</ol></div>' +
    '</section>' +
    '<section class="sec sec--paper" id="proposal" aria-labelledby="corp-form-h">' +
      '<div class="wrap"><div class="split">' +
        '<div><p class="eyebrow">Commercial enquiries</p><h2 class="h-sec" id="corp-form-h" data-reveal="lines">' + lines(['Request a', '<em>proposal.</em>']) + '</h2>' +
          '<p class="muted">Tell us about the space and your timeline. A short brief now saves a long meeting later.</p>' +
          '<p class="small muted">Prefer email? <a href="mailto:' + C.email + '?subject=Corporate%20AV%20proposal" data-cta="email-corporate" style="color:var(--brass-ink);font-weight:700">' + C.email + '</a></p></div>' +
        U.corporateForm('enq-corp') +
      '</div></div>' +
    '</section>';
    return { html: html, faqs: [] };
  };
})(typeof window !== 'undefined' ? (window.ROS = window.ROS || {}) : (globalThis.ROS = globalThis.ROS || {}));
