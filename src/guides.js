/* ROS prototype — two complete sample guides. Prices are illustrative and must be
   validated by ROS before publication; technical guidance is general, not a design. */
(function (R) {
  'use strict';
  var A = R.art, U = R.ui;
  var P = R.pages = R.pages || {};
  var L = U.link, arr = U.arr, tbc = U.tbc, lines = U.lines;

  function article(route, o) {
    var toc = o.sections.map(function (s) { return '<li><a href="#' + s[0] + '">' + s[1] + '</a></li>'; }).join('');
    var body = o.sections.map(function (s) { return '<h2 id="' + s[0] + '">' + s[1] + '</h2>' + s[2]; }).join('');
    return '<section class="page-hero"><div class="wrap">' + U.crumbs(route) +
        '<div style="max-width:880px"><p class="eyebrow">Guide · ' + o.kicker + '</p>' +
        '<h1 class="display" data-reveal="lines" tabindex="-1" style="font-size:clamp(2.2rem,1.4rem + 3vw,4rem)">' + lines(o.h1) + '</h1>' +
        '<p class="lede">' + o.lede + '</p>' +
        '<div class="article-meta"><span>By Republic of Sound Audio <span class="placeholder-text">[named author and credentials to confirm]</span></span><span>Published 27 October 2026</span><span>' + o.read + ' min read</span></div></div>' +
      '</div></section>' +
      '<section class="sec sec--light"><div class="wrap"><div class="article-layout">' +
        '<aside><nav class="toc" aria-labelledby="toc-h"><h2 id="toc-h">In this guide</h2><ol>' + toc + '</ol></nav></aside>' +
        '<article class="prose">' + o.intro + body +
          '<div class="notice" style="margin-top:3rem">' + o.disclaimer + '</div>' +
          '<h2 id="related">Related</h2><ul>' + o.related + '</ul>' +
        '</article>' +
      '</div></div></section>' +
      (o.faqs ? '<section class="sec sec--paper" aria-labelledby="' + o.faqId + '"><div class="wrap"><div class="split"><div><p class="eyebrow">FAQ</p><h2 class="h-sec" id="' + o.faqId + '">Common <em>questions</em></h2></div>' + U.faq(o.faqs, o.faqId + '-q') + '</div></div></section>' : '') +
      U.ctaBand({ id: o.faqId + '-cta', h2: o.ctaH, text: o.ctaText, ctas: U.btnDemo('book-demo-' + route.id) + U.btnWA('whatsapp-' + route.id) });
  }

  /* ===================================================== GUIDE A: COST */
  P['guide-cost'] = function (route) {
    var faqs = [
      ['Is a ₹1–2 lakh home theatre worth it?', 'It can be, if the expectations match. At that level the best value is usually a good soundbar or a compact 5.1 system set up properly in an existing room. It will not feel like a cinema, but it can make dialogue far clearer and films more involving than TV speakers.'],
      ['Should I spend more on the projector or the speakers?', 'In most rooms, sound carries more of the experience than people expect, and a well-integrated subwoofer is often the single biggest upgrade. Picture still matters, but a sensible projector on a correctly sized screen is usually a better plan than an expensive projector with compromised sound.'],
      ['Do I need acoustic treatment if I have curtains and a carpet?', 'Soft furnishings help with echo at higher frequencies, but they do little for bass and nothing for sound leaking to other rooms. Whether more treatment is needed depends on the room, which is why an assessment comes before a shopping list.'],
      ['Can I build the system in stages?', 'Yes, and it is often sensible. Run all the cables, conduits and power for the final system first, then add speakers, subwoofers or a better projector later without opening walls again.']
    ];
    var html = article(route, {
      kicker: 'Budgeting', read: 7, faqId: 'gc-faq', faqs: faqs,
      h1: ['What does a home', 'theatre <em>cost</em> in India?'],
      lede: 'A practical breakdown of where the money goes, what different budgets usually buy, and the decisions that matter more than the headline number.',
      intro: '<p>The honest answer to “how much does a home theatre cost?” is another question: what room is it going into? Two families can spend the same amount and get very different results, because one budget went into a room that worked against it and the other into a room that had been planned first. If you are in Ranchi and want a figure for your own room, our <a href="' + L('home-theatre') + '">home theatre design and installation in Ranchi</a> starts with a free site visit.</p>' +
        '<p>This guide explains how a home theatre budget breaks down in India, gives illustrative budget bands, and points out where extra spending makes a difference and where it rarely does. ' + tbc('All figures illustrative — ROS to validate') + '</p>',
      sections: [
        ['parts', 'The three parts of every budget',
          '<p>Every home theatre, from a living-room upgrade to a private cinema, spends money in three places. Thinking about them separately makes quotes much easier to compare.</p>' +
          '<h3>1. The room</h3><p>This covers anything that changes the space itself: false ceilings for speaker and projector mounting, electrical work and conduits, light control such as blackout curtains or blinds, a riser for a second row, flooring, and, in dedicated rooms, wall and ceiling construction. In an existing living room this part may be small. In a new dedicated cinema it can be the largest single item.</p>' +
          '<h3>2. The system</h3><p>This is the equipment: display (TV or projector and screen), speakers, subwoofers, the AV receiver or processor and amplifiers, sources such as a streaming box or Blu-ray player, cables and mounts. It is the part buyers usually focus on, and the part where specification sheets make it easiest to overspend.</p>' +
          '<h3>3. Treatment and finishing</h3><p>Acoustic panels, bass traps and diffusers; seating; lighting scenes and control; and the calibration that ties everything to the room. These items are often trimmed first when budgets tighten, yet they decide how good the room feels to sit in.</p>' +
          '<p>On top of these sits design and installation labour. Some companies show it as a separate line; others build it into equipment prices. Ask for it to be shown clearly so you can compare like with like.</p>'],
        ['bands', 'Illustrative budget bands',
          '<p>The bands below are starting points for a conversation, not prices. Equipment costs move with exchange rates and model changes, and construction costs depend heavily on the building.</p>' +
          '<div class="tbl-wrap"><table class="tbl"><caption>Illustrative home theatre budget bands (India) — to be validated by ROS</caption><thead><tr><th scope="col">Band</th><th scope="col">Typical room</th><th scope="col">What it usually includes</th></tr></thead><tbody>' +
            '<tr><th scope="row">Under ₹5 lakh</th><td>Existing living room</td><td>Quality soundbar or compact 5.1 system, TV or entry projector, tidy wiring, basic setup</td></tr>' +
            '<tr><th scope="row">₹5–10 lakh</th><td>Living room or small dedicated room</td><td>5.1.2 or 7.1 layout, projector and fixed screen, targeted acoustic panels, a few recliners</td></tr>' +
            '<tr><th scope="row">₹10–25 lakh</th><td>Dedicated home theatre</td><td>7.1.4 Dolby Atmos, multiple subwoofers, 4K projector, room treatment, riser, motorised seating, lighting scenes</td></tr>' +
            '<tr><th scope="row">₹25 lakh and above</th><td>Constructed private cinema</td><td>Sound isolation construction, higher-grade equipment and processing, full treatment, bespoke interiors, automation</td></tr>' +
          '</tbody></table></div>' +
          '<p>Notice that the jump between bands is driven as much by the room as by the equipment. Moving from a living room to a dedicated, light-controlled space is what makes a projector, height speakers and serious bass practical.</p>'],
        ['matters', 'Where spending matters most',
          '<p>If you are deciding where an extra lakh should go, these areas tend to give the most audible and visible return.</p>' +
          '<ul><li><strong>Bass.</strong> A good subwoofer, properly placed and integrated, transforms films. Two subwoofers often give more even bass across several seats than one larger unit.</li>' +
          '<li><strong>The front three speakers.</strong> Left, centre and right carry most of the soundtrack, including nearly all dialogue. Matching them matters.</li>' +
          '<li><strong>Light control.</strong> For projectors, a dark room improves contrast more than most projector upgrades can.</li>' +
          '<li><strong>Calibration.</strong> Setting distances, levels and bass for the actual seats costs little relative to the hardware, and is where many systems lose their potential.</li>' +
          '<li><strong>Acoustic treatment at the right points.</strong> A modest amount of correctly placed absorption can do more for clarity than a speaker upgrade.</li></ul>'],
        ['tradeoffs', 'Trade-offs worth making',
          '<p>Most budgets involve compromise. Some compromises are easy to live with:</p>' +
          '<ul><li><strong>Fewer channels, done well.</strong> A carefully placed 5.1.2 system usually beats a cramped 7.1.4 layout with speakers in the wrong places.</li>' +
          '<li><strong>A sensible screen size.</strong> Bigger is not always better. A screen that suits your seating distance is more comfortable and makes a projector look brighter.</li>' +
          '<li><strong>Manual recliners.</strong> They cost less, need no power points and are quieter, though motorised seats are more convenient.</li>' +
          '<li><strong>Build in stages.</strong> Install every cable and conduit for the final system now, and add equipment as budget allows.</li></ul>'],
        ['forgotten', 'Costs people forget',
          '<p>Quotes that look similar can differ by the items that are left out. Check whether these are included:</p>' +
          '<ul><li>Electrical work, dedicated circuits and surge protection</li><li>False-ceiling openings, conduit and making good after installation</li><li>Ventilation for an equipment rack or a closed room</li><li>Screen frame, masking or motorised mechanism</li><li>Mounts, brackets and speaker stands</li><li>Calibration, programming of remotes and control systems</li><li>Delivery to upper floors and the handling of bulky seating</li><li>Service visits and warranty handling after installation</li></ul>'],
        ['mistakes', 'Common mistakes',
          '<ol><li><strong>Buying equipment before planning the room.</strong> Speaker positions, screen size and seating are linked. Choosing one in isolation limits the others.</li>' +
          '<li><strong>Treating panels as soundproofing.</strong> Panels reduce echo inside the room. They do not stop sound reaching neighbours. See <a href="' + L('acoustics') + '">acoustic treatment</a>.</li>' +
          '<li><strong>Putting the main seat against the back wall.</strong> Bass tends to pile up there and surround effects lose their sense of space.</li>' +
          '<li><strong>Ignoring the interior schedule.</strong> If wiring is not in place before the false ceiling and panelling go up, adding it later costs more and looks worse.</li>' +
          '<li><strong>Skipping a demo.</strong> Specifications rarely predict whether you will hear a difference. Listening does.</li></ol>'],
        ['compare', 'Living room or dedicated room: how the money shifts',
          '<p>Consider two families with similar budgets. The first wants a better experience in a living room that is also used for guests and daytime television. The second is converting a spare bedroom into a room used only for films and music.</p>' +
          '<p>In the living room, the room itself constrains the spend. Daylight makes a projector harder to justify, so a large TV or an ambient-light screen is usually the better display. Speakers need to suit the décor, which pushes the budget towards in-wall or slim on-wall models and careful concealment of cables. Acoustic work is limited to what furnishings can hide: rugs, curtains and perhaps a few decorative panels.</p>' +
          '<p>In the dedicated room, money that would have gone into concealment can go into performance instead. Light control makes a projector and a much larger screen practical. Surfaces can be finished in dark, non-reflective materials. Treatment can be placed exactly where the room needs it rather than where it looks acceptable. The trade-off is that the room work itself, including electrical changes, a false ceiling, a riser and possibly construction to contain sound, becomes a substantial share of the total.</p>' +
          '<p>Neither approach is better in principle. The useful question is which room you will actually use most, and what that room allows.</p>'],
        ['plan', 'How to set your budget',
          '<ol><li>Decide whether the room is shared (living room) or dedicated. This sets the realistic ceiling for screen size and channel count.</li>' +
          '<li>Measure length, width and ceiling height, and note windows and doors.</li>' +
          '<li>List what you watch and listen to, and how many people usually sit together.</li>' +
          '<li>Hear two or three set-ups at different price points before fixing a figure.</li>' +
          '<li>Ask for a quote that separates room work, equipment, treatment and labour.</li></ol>' +
          '<p>Then compare quotes on what you will hear and see, not on the number of channels or the size of the brand logos.</p>']
      ],
      disclaimer: '<strong>About these figures.</strong> Price bands in this guide are illustrative estimates for planning conversations. They are not quotations and have not yet been validated against current ROS pricing. ' + tbc('ROS to validate before publishing'),
      related: '<li><a href="' + L('guide-atmos') + '">Room size for Dolby Atmos: a practical guide</a></li><li><a href="' + L('home-theatre') + '">Home theatre installation in Ranchi</a></li><li><a href="' + L('seating') + '">Cinema seating and recliners</a></li>',
      ctaH: ['Hear the budget', 'bands <em>for yourself.</em>'], ctaText: 'A 30-minute demo shows what changes between price levels in a real room.'
    });
    return { html: html, faqs: faqs };
  };

  /* ===================================================== GUIDE B: ATMOS */
  P['guide-atmos'] = function (route) {
    // Screen-size table is computed from viewing angle so the numbers stay consistent.
    function diag(d, deg) { var w = 2 * d * Math.tan(deg / 2 * Math.PI / 180); return w / 0.8716; }
    function inch(m) { return Math.round(m / 0.0254); }
    var rows = [2.5, 3, 3.5, 4, 4.5].map(function (d) {
      return '<tr><th scope="row">' + d.toFixed(1) + ' m</th><td>' + inch(diag(d, 30)) + '″</td><td>' + inch(diag(d, 40)) + '″</td></tr>';
    }).join('');
    var html = article(route, {
      kicker: 'Room planning', read: 7, faqId: 'ga-faq', faqs: null,
      h1: ['Room size for', 'Dolby Atmos: a', '<em>practical</em> guide.'],
      lede: 'How big a room needs to be for 5.1.2 or 7.1.4, what ceiling height works, where to sit and how large the screen should be.',
      intro: '<p>Dolby Atmos adds height to surround sound. Instead of placing sounds only around you at ear level, it can place them overhead: rain on a roof, a helicopter crossing the room. To work well, the speakers need space to sit at the right angles relative to the listener. That is why room size matters, and why every <a href="' + L('home-theatre') + '">Dolby Atmos home theatre installation</a> we plan starts with the room.</p>' +
        '<div class="notice"><strong>General guidance, not a room design.</strong> The figures here are widely used starting points. Your room’s exact layout depends on door and window positions, construction, seating, screen type and the speakers chosen. A site survey turns these rules into a plan.</div>',
      sections: [
        ['names', 'What the numbers mean',
          '<p>Atmos layouts are written as three numbers. In <strong>7.1.4</strong>, the 7 is the number of speakers at ear level (left, centre, right, two side surrounds and two rear surrounds), the 1 is the subwoofer, and the 4 is the number of overhead speakers. A <strong>5.1.2</strong> system has five ear-level speakers, one subwoofer and two overhead speakers.</p>' +
          '<p>More channels do not automatically mean better sound. Each speaker needs a sensible position. In a small room, a well-placed 5.1.2 system can sound more coherent than a squeezed 7.1.4.</p>'],
        ['dims', 'Room dimensions',
          '<p>The table below gives rough room sizes that comfortably accommodate each layout. Smaller rooms can work with careful design; larger rooms give more freedom with seating and bass.</p>' +
          '<div class="tbl-wrap"><table class="tbl"><caption>Typical room sizes by layout (general guidance)</caption><thead><tr><th scope="col">Layout</th><th scope="col">Comfortable floor size</th><th scope="col">Seating</th><th scope="col">Notes</th></tr></thead><tbody>' +
            '<tr><th scope="row">5.1.2</th><td>About 3.5 × 4.5 m and up</td><td>One row</td><td>Common for living rooms and small dedicated rooms</td></tr>' +
            '<tr><th scope="row">5.1.4</th><td>About 4 × 5 m and up</td><td>One row</td><td>Four overhead speakers give smoother front-to-back movement</td></tr>' +
            '<tr><th scope="row">7.1.4</th><td>About 4 × 6 m and up</td><td>One or two rows</td><td>Room length allows rear surrounds behind the main seat</td></tr>' +
            '<tr><th scope="row">7.2.4 and larger</th><td>About 5 × 7 m and up</td><td>Two or more rows</td><td>Extra subwoofers help even out bass across rows</td></tr>' +
          '</tbody></table></div>' +
          '<div class="tool-inline"><p class="eyebrow">Try your room</p>' + R.feat.roomPlanner('rp-atmos') + '</div>' +
          '<p>Width matters as much as length. Side surrounds work best a little behind or level with the main seat, with some space between the seat and the wall. Very narrow rooms push side speakers close to listeners’ ears.</p>'],
        ['ceiling', 'Ceiling height',
          '<p>Overhead speakers need enough distance from listeners to spread sound evenly. As a general rule, designers prefer a finished ceiling of about 2.4 m (8 ft) or more. Rooms with lower ceilings can still use Atmos, but speaker choice and placement become more critical, and a second row on a riser brings heads closer to the ceiling.</p>' +
          '<p>Remember that the finished height is what counts: false ceilings, coves for lighting and acoustic treatment all reduce it. If ceiling speakers are not possible, Atmos-enabled “upfiring” speakers that bounce sound off the ceiling are an alternative, though they rely on a flat, reflective ceiling and generally do not match true overhead speakers.</p>'],
        ['seating', 'Seating position',
          '<p>Everything in a home theatre is arranged around the main listening position, so decide it early.</p>' +
          '<ul><li><strong>Keep the main seat off the back wall.</strong> Bass builds up near walls, and rear surround speakers need space behind you.</li>' +
          '<li><strong>Avoid the exact middle of the room’s length.</strong> Low-frequency room modes can create a bass “hole” there. Positions somewhat forward or back of centre are usually smoother, but the best spot is confirmed by measurement.</li>' +
          '<li><strong>Centre the main seat between the side walls</strong> so that left and right channels are balanced.</li>' +
          '<li><strong>Raise a second row</strong> on a riser so eye lines clear the heads in front. See <a href="' + L('seating') + '">cinema seating</a>.</li></ul>'],
        ['layout', 'Speaker layout: 5.1.2 vs 7.1.4',
          '<p>Dolby publishes recommended angles for each speaker, measured from the main seat. The angles below are commonly used as a starting point.</p>' +
          '<div class="tbl-wrap"><table class="tbl"><caption>Typical speaker angles from the main listening position</caption><thead><tr><th scope="col">Speaker</th><th scope="col">Horizontal angle</th><th scope="col">Used in</th></tr></thead><tbody>' +
            '<tr><th scope="row">Front left / right</th><td>About 22–30° either side of centre</td><td>All layouts</td></tr>' +
            '<tr><th scope="row">Side surrounds</th><td>About 90–110°</td><td>5.1.x, 7.1.x</td></tr>' +
            '<tr><th scope="row">Rear surrounds</th><td>About 135–150°</td><td>7.1.x</td></tr>' +
          '</tbody></table></div>' +
          '<div class="tbl-wrap"><table class="tbl"><caption>Overhead speaker placement (elevation from the main seat)</caption><thead><tr><th scope="col">Layout</th><th scope="col">Overhead speakers</th><th scope="col">Typical placement</th></tr></thead><tbody>' +
            '<tr><th scope="row">.2</th><td>Top middle pair</td><td>Roughly above or slightly in front of the main seat, in line with the front left and right speakers</td></tr>' +
            '<tr><th scope="row">.4</th><td>Top front and top rear pairs</td><td>Top front ahead of the seat, at around 30–55° elevation; top rear behind it, at a similar angle</td></tr>' +
          '</tbody></table></div>' +
          '<p><strong>Choose 5.1.2</strong> when the room is shorter, there is one row of seats, or ceiling access is limited. <strong>Choose 7.1.4</strong> when the room is long enough for rear surrounds behind the main seat, there are two rows, and the ceiling can take four speakers. For multiple rows, the speaker positions are a compromise across seats, which is where design experience matters most.</p>'],
        ['screen', 'Screen size and viewing distance',
          '<p>Screen size should follow seating distance, not the other way round. Industry recommendations are expressed as the horizontal viewing angle the screen fills. Around 30° is a comfortable minimum for cinema-style viewing; around 40° is more immersive and suits 4K content.</p>' +
          '<div class="tbl-wrap"><table class="tbl"><caption>16:9 screen diagonal by seating distance (calculated from viewing angle)</caption><thead><tr><th scope="col">Eye-to-screen distance</th><th scope="col">About 30° (comfortable)</th><th scope="col">About 40° (immersive)</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<div class="tool-inline tool-inline--dark">' + R.feat.screenCalc('sc-atmos') + '</div>' +
          '<p>Projector brightness, screen material and room light all affect how large an image can look good. A huge screen in a room with light-coloured walls will look washed out. That is one reason dedicated rooms use dark, non-reflective finishes.</p>'],
        ['shape', 'Room shape, doors and windows',
          '<ul><li><strong>Rectangular rooms</strong> are easier to design for than square ones, which tend to have uneven bass.</li>' +
          '<li><strong>Doors and windows</strong> can sit where speakers need to go. They may need moving, or the layout may need adjusting.</li>' +
          '<li><strong>Open-plan spaces</strong> make bass and surround effects harder to control and leak sound into the rest of the home.</li>' +
          '<li><strong>Hard surfaces</strong> such as tiled floors and glass add echo; plan for <a href="' + L('acoustics') + '">acoustic treatment</a>.</li></ul>'],
        ['bass', 'Bass and subwoofers',
          '<p>Room size affects bass more than any other part of the system. Below roughly 200 Hz, sound waves are long enough to interact with the room’s dimensions, creating peaks and dips that vary from seat to seat. In one seat the bass may sound boomy; a metre away it may almost disappear.</p>' +
          '<p>Three things help. First, avoid seating in the exact centre of the room or against the back wall, as described above. Second, consider more than one subwoofer: two or more subwoofers in carefully chosen positions usually give more even bass across several seats than a single larger one. Third, use the room-correction and bass-management tools in modern AV receivers and processors, guided by measurement rather than guesswork.</p>' +
          '<p>Construction matters too. Lightweight partition walls let bass escape, which reduces impact inside the room and disturbs the rest of the home. Solid masonry contains more of it. This is one reason the same equipment can sound different in two rooms of identical size.</p>'],
        ['example', 'A worked example',
          '<p>Imagine a spare room of 4.2 × 5.8 m with a finished ceiling of 2.7 m. That is close to the typical size for 7.1.4 in the table above, so the layout is feasible with careful placement. A single row of three seats could sit about two-thirds of the way back, keeping a gap from the rear wall for the rear surrounds. With the eyes roughly 3.5 m from the screen, the screen-size table suggests a 16:9 image of about 85 to 115 inches, depending on how immersive you want it. A second row would need a riser, which reduces the effective ceiling height above those seats. A site survey would then check door and window positions, ceiling access and wiring routes before anything is finalised.</p>'],
        ['survey', 'When to get a site survey',
          '<p>Use the tables above to check whether your room is in the right range. Get a survey before you commit to false ceilings, electrical layouts or equipment, especially if you are planning two rows, a projector, or construction work. A survey records exact dimensions and obstacles, then produces a speaker plan, screen size and seating layout specific to your room.</p>']
      ],
      disclaimer: '<strong>About this guide.</strong> Angles and sizes are general industry starting points, rounded for readability. They are not a substitute for a room-specific design. ' + tbc('ROS to review technical content'),
      related: '<li><a href="' + L('guide-cost') + '">What does a home theatre cost in India?</a></li><li><a href="' + L('home-theatre') + '">Home theatre installation in Ranchi</a></li><li><a href="' + L('acoustics') + '">Acoustic treatment in Ranchi</a></li>',
      ctaH: ['Bring your room', '<em>measurements.</em>'], ctaText: 'Book a demo and bring your floor plan. We will sketch what fits.'
    });
    return { html: html, faqs: [] };
  };
})(typeof window !== 'undefined' ? (window.ROS = window.ROS || {}) : (globalThis.ROS = globalThis.ROS || {}));
