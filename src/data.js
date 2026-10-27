/* ROS prototype — business config, routes, metadata and schema builders.
   Every fact here is either VERIFIED (published on rosaudio.com, checked 27 Oct 2026)
   or flagged `confirmed: false`. Change values here only; header, footer, contact
   page, forms, schema and metadata all read from this object. */
(function (R) {
  'use strict';

  var CONFIG = {
    name: 'Republic of Sound Audio',
    shortName: 'ROS',
    origin: 'https://rosaudio.com',          // production origin used for canonical/OG/schema
    founded: '2011',                          // published on rosaudio.com home page
    city: 'Ranchi',
    region: 'Jharkhand',
    country: 'IN',
    email: 'connect@rosaudio.com',            // published on /contact/

    phoneMain: { display: '+91 85802 39007', e164: '+918580239007', confirmed: false,
      note: 'Listed on /contact/ and in the site-wide header button; also the number behind the live WhatsApp widget.' },
    phoneAlt: { display: '+91 82109 55476', e164: '+918210955476', confirmed: false,
      note: 'Linked from the current homepage only. Not used on this prototype until ROS confirms its role.' },
    whatsapp: { number: '918580239007', confirmed: false,
      note: 'Taken from the existing Click-to-Chat widget configuration on rosaudio.com.' },
    whatsappPrefill: 'Hi ROS, I would like to book a home theatre demo.',

    address: { lines: ['Beside Javed Habib Salon, PP Compound', 'Main Road, Ranchi, Jharkhand 834001'], confirmed: false,
      note: 'As published on rosaudio.com/contact/. A third-party directory reportedly lists Satya Enclave, Lake Avenue, Kanke Road, Ranchi 834008. Do not publish either until ROS confirms.' },
    hours: null,                               // not published anywhere — awaiting ROS
    bookingUrl: 'https://calendly.com/connect-rosaudio/30min',
    serviceAreas: { primary: ['Ranchi'], proposed: ['Jamshedpur', 'Dhanbad', 'Bokaro'], confirmed: false },
    // Logos shown in the current rosaudio.com brand grid (verified from image files); partnership status unconfirmed.
    brandsReferenced: ['Denon', 'Marantz', 'Yamaha', 'Mission', 'Q Acoustics', 'HECO', 'Magnat', 'Velodyne Acoustics', 'Taga Harmony',
      'JBL', 'Bose Professional', 'Alto Professional', 'Optoma', 'ViewSonic', 'Loewe', 'Edifier', 'Marshall', 'Artsound'],
    social: [],                                // none published on current site
    rating: null                               // never publish a rating/review count without confirmed source
  };

  CONFIG.tel = 'tel:' + CONFIG.phoneMain.e164;
  // Prefilled WhatsApp text is only attached once ROS confirms the number (brief §7).
  CONFIG.waLink = function (ctx) {
    var base = 'https://wa.me/' + CONFIG.whatsapp.number;
    if (!CONFIG.whatsapp.confirmed) return base;
    return base + '?text=' + encodeURIComponent(ctx || CONFIG.whatsappPrefill);
  };

  /* --- Routes. `path` is the production URL. --- */
  var ROUTES = [
    { id: 'home', path: '/', nav: 'Home',
      title: 'Home Theatre & Hi-Fi Experts in Ranchi | Republic of Sound',
      description: 'Home theatres, Hi-Fi, acoustics and automation designed and installed in Ranchi since 2011. Book a live Dolby Atmos demo at our studio.',
      keyword: 'home theatre Ranchi', schema: ['business', 'faq'], og: 'home' },
    { id: 'home-theatre', path: '/home-theatre-ranchi/', nav: 'Home theatre', group: 'services',
      blurb: 'Living rooms, dedicated cinemas, Dolby Atmos',
      title: 'Home Theatre Design & Installation in Ranchi | ROS',
      description: 'Dolby Atmos home theatres designed, built and calibrated for your room, from living-room 5.1 to private cinemas. Free site visit in Ranchi.',
      keyword: 'home theatre installation in Ranchi', schema: ['service', 'faq'], serviceType: 'Home theatre design and installation' },
    { id: 'acoustics', path: '/acoustic-treatment-ranchi/', nav: 'Acoustics', group: 'services',
      blurb: 'Room treatment, panels and sound isolation',
      title: 'Acoustic Treatment & Soundproofing in Ranchi | ROS',
      description: 'Acoustic panels, soundproofing and room tuning for home theatres, studios and boardrooms. Measured, designed and installed by our team.',
      keyword: 'acoustic treatment Ranchi', schema: ['service', 'faq'], serviceType: 'Acoustic treatment and soundproofing' },
    { id: 'automation', path: '/home-automation-ranchi/', nav: 'Automation', group: 'services',
      blurb: 'Lighting scenes, AV control, motorised screens',
      title: 'Home Automation & Lighting Control in Ranchi | ROS',
      description: 'Control lights, blinds, AV and climate from one app or remote. Smart home and theatre automation for new and existing homes in Ranchi.',
      keyword: 'home automation Ranchi', schema: ['service'], serviceType: 'Home automation and lighting control' },
    { id: 'gear', path: '/projectors-audio-gear/', nav: 'Projectors & audio', group: 'services',
      blurb: 'Projectors, speakers, receivers, Hi-Fi, cables',
      title: 'Projectors, Speakers & AV Receivers in Ranchi | ROS',
      description: '4K and laser projectors, Atmos receivers, speakers and subwoofers from leading brands. Hear them in our Ranchi demo room first.',
      keyword: 'projector dealer in Ranchi', schema: ['service'], serviceType: 'Projector and audio equipment supply' },
    { id: 'seating', path: '/cinema-seating/', nav: 'Cinema seating', group: 'services',
      blurb: 'Recliners, loungers, auditorium seating',
      title: 'Home Theatre Recliners & Cinema Seating in Ranchi | ROS',
      description: 'Manual and motorised recliners, loungers and cinema chairs for home theatres and auditoriums. See and sit in them at our Ranchi studio.',
      keyword: 'home theatre recliner Ranchi', schema: ['service'], serviceType: 'Home cinema and auditorium seating' },
    { id: 'corporate', path: '/corporate-av-jharkhand/', nav: 'Corporate AV', group: 'services',
      blurb: 'Boardrooms, conferencing, auditoriums, hospitality',
      title: 'Boardroom & Auditorium AV Solutions in Jharkhand | ROS',
      description: 'Boardroom, auditorium and hotel AV: projection, sound, video conferencing and control, designed, installed and serviced by ROS.',
      keyword: 'boardroom AV solutions Jharkhand', schema: ['service'], serviceType: 'Corporate and commercial audio-visual integration' },
    { id: 'projects', path: '/projects/', nav: 'Projects',
      title: 'Home Theatre Projects in Ranchi | Republic of Sound',
      description: "Home theatres, acoustic rooms and boardrooms we've designed and installed in Ranchi: the brief, the build and the result. Book a demo.",
      keyword: 'home theatre projects Ranchi', schema: [] },
    { id: 'demo', path: '/book-a-demo/', nav: 'Book a demo',
      title: 'Book a Live Home Theatre Demo in Ranchi | ROS',
      description: 'Hear Dolby Atmos in our Ranchi demo room before you buy. Pick a 30-minute slot, or call or WhatsApp us for a free site visit.',
      keyword: 'home theatre demo Ranchi', schema: ['faq'] },
    { id: 'guides', path: '/guides/', nav: 'Guides',
      title: 'Home Theatre Guides: Cost, Room Size & Setup | ROS',
      description: 'Plain-English guides to home theatre cost, Dolby Atmos room sizes, projectors vs TVs and soundproofing in India. Start reading now.',
      keyword: 'home theatre guides', schema: [] },
    { id: 'contact', path: '/contact/', nav: 'Contact',
      title: 'Contact Republic of Sound Audio | Ranchi Showroom',
      description: 'Call, WhatsApp or email Republic of Sound Audio, or visit our Ranchi showroom. Get directions and opening hours, or book a free demo.',
      keyword: 'Republic of Sound Ranchi', schema: ['business'] },
    { id: 'guide-cost', path: '/guides/home-theatre-cost-india/', parent: 'guides', nav: 'What does a home theatre cost in India?',
      title: 'What Does a Home Theatre Cost in India? | ROS Guide',
      description: 'Where a home theatre budget goes in India: room work, equipment, acoustics and seating, with budget bands and mistakes to avoid. Read now.',
      keyword: 'home theatre cost in India', schema: ['article', 'faq'], published: '2026-10-27' },
    { id: 'guide-atmos', path: '/guides/room-size-dolby-atmos/', parent: 'guides', nav: 'Room size for Dolby Atmos',
      title: 'Room Size for Dolby Atmos: A Practical Guide | ROS',
      description: 'Room size, ceiling height, seating position, 5.1.2 vs 7.1.4 and screen size for Dolby Atmos. Try the room planner, then book a demo.',
      keyword: 'room size for dolby atmos', schema: ['article'], published: '2026-10-27' },
    { id: 'notfound', path: '/404/', nav: 'Page not found', noindex: true,
      title: 'Page not found | Republic of Sound Audio',
      description: 'The page you were looking for could not be found.', schema: [] }
  ];

  var byId = {}, byPath = {};
  ROUTES.forEach(function (r) { byId[r.id] = r; byPath[r.path] = r; });

  /* --- Structured data (only verified facts; see docs/handover for TODOs) --- */
  function businessLD() {
    return {
      '@type': 'ElectronicsStore',
      '@id': CONFIG.origin + '/#business',
      name: CONFIG.name,
      alternateName: 'ROS Audio',
      url: CONFIG.origin + '/',
      email: CONFIG.email,
      telephone: CONFIG.phoneMain.e164,
      foundingDate: CONFIG.founded,
      description: 'Audio-visual consultancy, home theatre, Hi-Fi, acoustic treatment and automation in Ranchi, Jharkhand.',
      address: { '@type': 'PostalAddress', addressLocality: CONFIG.city, addressRegion: CONFIG.region, addressCountry: CONFIG.country },
      areaServed: { '@type': 'City', name: 'Ranchi' }
      // streetAddress, postalCode, geo, openingHoursSpecification, sameAs: add after ROS confirms.
    };
  }
  function crumbsLD(route) {
    var items = [{ name: 'Home', path: '/' }];
    if (route.parent) items.push({ name: byId[route.parent].nav, path: byId[route.parent].path });
    if (route.id !== 'home') items.push({ name: route.nav, path: route.path });
    return { '@type': 'BreadcrumbList', itemListElement: items.map(function (it, i) {
      return { '@type': 'ListItem', position: i + 1, name: it.name, item: CONFIG.origin + it.path };
    }) };
  }
  function schemaFor(route, faqs) {
    if (route.noindex) return null;
    var graph = [];
    var types = route.schema || [];
    if (types.indexOf('business') > -1) graph.push(businessLD());
    if (types.indexOf('service') > -1) graph.push({
      '@type': 'Service', name: route.serviceType, serviceType: route.serviceType,
      provider: { '@id': CONFIG.origin + '/#business' },
      areaServed: { '@type': 'City', name: 'Ranchi' },
      url: CONFIG.origin + route.path
    });
    if (types.indexOf('article') > -1) graph.push({
      '@type': 'Article', headline: route.nav, description: route.description,
      datePublished: route.published, dateModified: route.published,
      author: { '@type': 'Organization', name: CONFIG.name, url: CONFIG.origin + '/' },
      publisher: { '@id': CONFIG.origin + '/#business' },
      mainEntityOfPage: CONFIG.origin + route.path
    });
    if (types.indexOf('faq') > -1 && faqs && faqs.length) graph.push({
      '@type': 'FAQPage', mainEntity: faqs.map(function (f) {
        return { '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1].replace(/<[^>]+>/g, '') } };
      })
    });
    if (route.id !== 'home') graph.push(crumbsLD(route));
    if (types.indexOf('service') > -1 || types.indexOf('article') > -1) {
      if (types.indexOf('business') < 0) graph.push(businessLD());
    }
    return { '@context': 'https://schema.org', '@graph': graph };
  }

  /* Photos sourced from the current rosaudio.com (client-supplied for the pitch).
     Several look like stock or manufacturer imagery — usage rights must be confirmed before launch. */
  var IMAGES = {
    cinema:    { w: 600, h: 400, alt: 'Cinema auditorium with tiered seating facing a large white screen' },
    multiplex: { w: 333, h: 333, alt: 'Rows of red leather recliners in a cinema auditorium' },
    studio:    { w: 740, h: 415, alt: 'Dark-panelled studio control room with monitors and a leather sofa' },
    recliners: { w: 998, h: 1000, alt: 'Three tan home theatre recliners in a living room' },
    projector: { w: 600, h: 600, alt: 'Ceiling projector on a large screen flanked by tower speakers' },
    laser:     { w: 600, h: 600, alt: 'Short-throw projector on a low console lighting a large wall image' },
    hifi:      { w: 600, h: 600, alt: 'Floor-standing speakers either side of a turntable and amplifier' },
    atmos:     { w: 1000, h: 998, alt: 'Living room with tower speakers, centre speaker and a large TV' },
    boardroom: { w: 600, h: 400, alt: 'Glass-walled boardroom with a wall-mounted display' },
    install:   { w: 600, h: 600, alt: 'Technician adjusting a ceiling-mounted projector' }
  };
  R.IMAGES = IMAGES;
  R.imgUrl = function (k) { return (R.IMG_INLINE && R.IMG_INLINE[k]) || (R.IMG_BASE || '/assets/img/') + k + '.webp'; };

  R.CONFIG = CONFIG;
  R.ROUTES = ROUTES;
  R.routeById = byId;
  R.routeByPath = byPath;
  R.schemaFor = schemaFor;
})(typeof window !== 'undefined' ? (window.ROS = window.ROS || {}) : (globalThis.ROS = globalThis.ROS || {}));
