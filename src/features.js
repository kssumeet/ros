/* ROS prototype — markup for photos and interactive "sound" features.
   Behaviour lives in fx.js; this file only renders HTML (works in the build and the browser). */
(function (R) {
  'use strict';
  var A = R.art, C = R.CONFIG;
  var F = R.feat = {};

  /* Graded photo frame. Hero/above-the-fold photos load eagerly; the rest lazy-load. */
  F.photo = function (key, opts) {
    opts = opts || {};
    var im = R.IMAGES[key];
    var credit = opts.credit === false ? '' : '<span class="ph-credit" aria-hidden="true">Photo · rosaudio.com</span>';
    return '<div class="ph' + (opts.cls ? ' ' + opts.cls : '') + '"' + (opts.reveal === false ? '' : ' data-reveal="mask"') + (opts.ratio ? ' style="--ratio:' + opts.ratio + '"' : '') + '>' +
      '<img src="' + R.imgUrl(key) + '" width="' + im.w + '" height="' + im.h + '" alt="' + (opts.alt || im.alt) + '"' +
      (opts.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"' + (opts.parallax === false ? '' : ' data-parallax') + '>' +
      credit + '</div>';
  };

  /* Brand reel: native player, nothing autoplays, poster until pressed. Returns '' when no video URL. */
  F.reel = function () {
    var src = R.videoUrl('ros-reel.mp4');
    if (!src) return '';
    return '<figure class="reel" data-reveal="mask">' +
      '<video controls playsinline preload="none" width="848" height="478" poster="' + R.videoUrl('ros-reel-poster.jpg') + '" aria-label="Republic of Sound brand reel, 20 seconds, with sound">' +
      '<source src="' + src + '" type="video/mp4"></video>' +
      '<figcaption class="xs muted">Republic of Sound reel · 0:20 · sound on</figcaption></figure>';
  };

  /* Round "Play the room" control with rotating text ring. */
  F.playButton = function (id, label) {
    return '<button class="play-orb" type="button" data-play-room id="' + id + '" aria-pressed="false" data-cursor="Listen">' +
      '<svg class="orb-ring" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="' + id + '-c" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>' +
      '<text><textPath href="#' + id + '-c">PLAY THE ROOM · SOUND ON · PLAY THE ROOM · SOUND ON ·</textPath></text></svg>' +
      '<span class="orb-core" aria-hidden="true"><i class="orb-play"></i><i class="orb-stop"></i></span>' +
      '<span class="sr-only" data-play-label>' + (label || 'Play an 8-second cinematic sound demo') + '</span></button>';
  };

  /* Brand name marquee (names only, no logos). */
  F.marquee = function () {
    var items = C.brandsReferenced.map(function (b) { return '<span>' + b + '</span><i aria-hidden="true">✦</i>'; }).join('');
    return '<div class="marquee" aria-label="Brands shown on the current ROS website">' +
      '<div class="marquee-track"><div class="marquee-set">' + items + '</div><div class="marquee-set" aria-hidden="true">' + items + '</div></div></div>';
  };

  /* ---------------- Speaker layout explorer (top-down room) ---------------- */
  var SPK = [
    // id, label, angle (deg, 0 = screen, +right), layouts, kind
    ['L', 'Front left', -30, '5.1 5.1.2 7.1.4', 'ear'],
    ['C', 'Centre', 0, '5.1 5.1.2 7.1.4', 'ear'],
    ['R', 'Front right', 30, '5.1 5.1.2 7.1.4', 'ear'],
    ['SL', 'Side surround left', -100, '5.1 5.1.2 7.1.4', 'ear'],
    ['SR', 'Side surround right', 100, '5.1 5.1.2 7.1.4', 'ear'],
    ['RL', 'Rear surround left', -145, '7.1.4', 'ear'],
    ['RR', 'Rear surround right', 145, '7.1.4', 'ear'],
    ['TML', 'Top middle left', -1, '5.1.2', 'top'],
    ['TMR', 'Top middle right', 1, '5.1.2', 'top'],
    ['TFL', 'Top front left', -2, '7.1.4', 'top'],
    ['TFR', 'Top front right', 2, '7.1.4', 'top'],
    ['TRL', 'Top rear left', -3, '7.1.4', 'top'],
    ['TRR', 'Top rear right', 3, '7.1.4', 'top'],
    ['SW', 'Subwoofer', 999, '5.1 5.1.2 7.1.4', 'sub']
  ];
  // Room 0..100 (x) by 0..100 (y); listener at 50,62. Ear-level speakers sit on the wall along their angle.
  function pos(s) {
    var LX = 50, LY = 62;
    if (s[4] === 'sub') return [80, 7];
    if (s[4] === 'top') {
      var side = s[2] < 0 ? -1 : 1, row = Math.abs(s[2]);
      return [LX + side * 17, row === 1 ? 56 : row === 2 ? 36 : 84];
    }
    var a = s[2] * Math.PI / 180, dx = Math.sin(a), dy = -Math.cos(a), t = Infinity;
    if (dx > 0) t = Math.min(t, (94 - LX) / dx); if (dx < 0) t = Math.min(t, (6 - LX) / dx);
    if (dy > 0) t = Math.min(t, (94 - LY) / dy); if (dy < 0) t = Math.min(t, (8 - LY) / dy);
    return [LX + dx * t, LY + dy * t];
  }
  F.speakerExplorer = function (id) {
    var btns = SPK.map(function (s) {
      var p = pos(s), pan = s[4] === 'sub' ? 0 : s[4] === 'top' ? (s[2] < 0 ? -0.5 : 0.5) : Math.sin(s[2] * Math.PI / 180);
      var desc = s[4] === 'ear' ? (s[2] === 0 ? 'straight ahead' : Math.abs(s[2]) + '° ' + (s[2] < 0 ? 'left' : 'right')) : s[4] === 'top' ? 'overhead' : 'low frequencies';
      return '<button type="button" class="spk spk--' + s[4] + '" data-spk="' + s[0] + '" data-in="' + s[3] + '" data-pan="' + pan.toFixed(2) + '" data-kind="' + s[4] + '" data-name="' + s[1] + '" data-desc="' + desc + '" style="left:' + p[0].toFixed(1) + '%;top:' + p[1].toFixed(1) + '%" aria-label="Play ' + s[1] + ', ' + desc + '"><span>' + s[0] + '</span></button>';
    }).join('');
    return '<div class="spx" id="' + id + '" data-speaker-explorer data-layout="7.1.4">' +
      '<div class="spx-bar"><div class="seg" role="group" aria-label="Speaker layout">' +
        ['5.1', '5.1.2', '7.1.4'].map(function (l) { return '<button type="button" data-layout-btn="' + l + '" aria-pressed="' + (l === '7.1.4') + '">' + l + '</button>'; }).join('') +
      '</div><button type="button" class="btn btn--primary btn--sm" data-sweep data-cursor="Play">' + A.icon('acoustics') + 'Run calibration sweep</button></div>' +
      '<div class="spx-room" data-cursor="Tap a speaker">' +
        '<div class="spx-screen" aria-hidden="true"><span>Screen</span></div>' +
        '<div class="spx-grid" aria-hidden="true"></div>' +
        '<div class="spx-seat" aria-hidden="true" style="left:50%;top:62%"><i></i><span>You</span></div>' +
        btns +
      '</div>' +
      '<p class="spx-status" role="status" aria-live="polite" data-spx-status>Choose a layout, then tap any speaker to hear where it sits.</p>' +
      '<p class="xs spx-note">Headphones recommended. Positions follow common Dolby angle ranges; sound is a stereo approximation, not true surround.</p>' +
    '</div>';
  };

  /* ---------------- Acoustic treatment simulator ---------------- */
  F.acousticSim = function (id) {
    return '<div class="asim" id="' + id + '" data-acoustic-sim>' +
      '<div class="asim-top"><div><span class="asim-k">Reverberation (RT60)</span><b data-rt>1.40 s</b></div><div><span class="asim-k">Room</span><b data-room>Bare: tiles, glass, plaster</b></div></div>' +
      '<canvas class="asim-canvas" width="900" height="260" aria-hidden="true"></canvas>' +
      '<label class="asim-range"><span class="sr-only">Amount of acoustic treatment</span><span aria-hidden="true">Bare</span><input type="range" min="0" max="100" value="0" data-treat aria-valuetext="Bare room, RT60 1.4 seconds"><span aria-hidden="true">Treated</span></label>' +
      '<div class="btn-row"><button type="button" class="btn btn--primary" data-clap data-cursor="Clap">' + A.icon('acoustics') + 'Clap in this room</button><span class="xs muted">Simulation with synthetic decay. Not a measurement of any real room.</span></div>' +
    '</div>';
  };

  /* ---------------- Screen size calculator ---------------- */
  F.screenCalc = function (id) {
    return '<div class="scalc" id="' + id + '" data-screen-calc>' +
      '<svg class="scalc-svg" viewBox="0 0 400 260" aria-hidden="true">' +
        '<line class="sc-screen40" x1="0" y1="30" x2="0" y2="30"/><line class="sc-screen30" x1="0" y1="30" x2="0" y2="30"/>' +
        '<polygon class="sc-cone" points="200,220 200,30 200,30"/>' +
        '<circle class="sc-eye" cx="200" cy="220" r="7"/><text class="sc-dist" x="212" y="130">3.0 m</text>' +
      '</svg>' +
      '<label class="field"><span>Eye-to-screen distance: <b data-dist-out>3.0 m</b></span><input type="range" min="2" max="6" step="0.1" value="3" data-dist aria-valuetext="3.0 metres"></label>' +
      '<div class="scalc-out" role="status" aria-live="polite"><div><span class="asim-k">Comfortable (~30°)</span><b data-s30>73″</b></div><div><span class="asim-k">Immersive (~40°)</span><b data-s40>99″</b></div></div>' +
      '<p class="xs muted">16:9 diagonal from horizontal viewing angle. General guidance; brightness and room light also matter.</p>' +
    '</div>';
  };

  /* ---------------- Atmos room planner ---------------- */
  F.roomPlanner = function (id) {
    function num(n, label, v) { return '<label class="field"><span>' + label + '</span><input type="number" inputmode="decimal" min="2" max="20" step="0.1" value="' + v + '" data-dim="' + n + '" id="' + id + '-' + n + '"></label>'; }
    return '<div class="planner" id="' + id + '" data-room-planner>' +
      '<div class="planner-in">' + num('l', 'Length (m)', 6) + num('w', 'Width (m)', 4.2) + num('h', 'Ceiling (m)', 2.7) + '</div>' +
      '<div class="planner-out" role="status" aria-live="polite" data-plan-out></div>' +
      '<p class="xs muted">General guidance from the table above, not a room design. Doors, windows and construction change the answer.</p>' +
    '</div>';
  };
})(typeof window !== 'undefined' ? (window.ROS = window.ROS || {}) : (globalThis.ROS = globalThis.ROS || {}));
