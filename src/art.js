/* ROS prototype — original SVG illustrations and line icons.
   Illustrations are placeholders for approved ROS photography and are always
   captioned "Illustrative". Every gradient id gets a unique suffix so pages never
   contain duplicate ids. */
(function (R) {
  'use strict';
  var uid = 0;
  function nid(p) { uid += 1; return p + '-' + uid; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function pts(arr) { return arr.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
  function svgOpen(vb, cls) {
    return '<svg viewBox="' + vb + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"' + (cls ? ' class="' + cls + '"' : '') + '>';
  }

  /* ---------- Dedicated cinema (hero) ---------- */
  function cinema() {
    var sky = nid('sky'), spill = nid('spill'), glow = nid('glow'), wallL = nid('wl'), wallR = nid('wr'), floor = nid('fl');
    var s = svgOpen('0 0 1600 1000');
    s += '<defs>' +
      '<linearGradient id="' + sky + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16212d"/><stop offset=".62" stop-color="#5a4a3d"/><stop offset="1" stop-color="#c28a4b"/></linearGradient>' +
      '<radialGradient id="' + spill + '" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#c79a62" stop-opacity=".28"/><stop offset="1" stop-color="#c79a62" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + glow + '" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f3d39c" stop-opacity=".9"/><stop offset="1" stop-color="#f3d39c" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + wallL + '" x1="0" x2="1"><stop offset="0" stop-color="#0d0e0f"/><stop offset="1" stop-color="#1c1d20"/></linearGradient>' +
      '<linearGradient id="' + wallR + '" x1="1" x2="0"><stop offset="0" stop-color="#0d0e0f"/><stop offset="1" stop-color="#1c1d20"/></linearGradient>' +
      '<linearGradient id="' + floor + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1714"/><stop offset="1" stop-color="#0b0b0b"/></linearGradient>' +
      '</defs>';
    s += '<rect width="1600" height="1000" fill="#0e0f10"/>';
    s += '<polygon points="0,0 1600,0 1140,270 460,270" fill="#0b0c0d"/>';
    s += '<polygon points="460,650 1140,650 1600,1000 0,1000" fill="url(#' + floor + ')"/>';
    s += '<polygon points="0,0 460,270 460,650 0,1000" fill="url(#' + wallL + ')"/>';
    s += '<polygon points="1600,0 1140,270 1140,650 1600,1000" fill="url(#' + wallR + ')"/>';
    s += '<rect x="460" y="270" width="680" height="380" fill="#151618"/>';
    // Side-wall fabric panels and sconces, in perspective
    var xs = [30, 120, 200, 262, 314, 356, 392, 422, 446];
    for (var i = 0; i < xs.length - 1; i++) {
      var a = xs[i] + 6, b = xs[i + 1] - 6;
      var top = function (x) { return 270 * x / 460; }, bot = function (x) { return 1000 - 350 * x / 460; };
      var h = function (x, f) { return lerp(top(x), bot(x), f); };
      var shade = i % 2 ? '#191a1d' : '#1d1e21';
      [[a, b]].forEach(function (seg) {
        var L = [[seg[0], h(seg[0], .14)], [seg[1], h(seg[1], .14)], [seg[1], h(seg[1], .78)], [seg[0], h(seg[0], .78)]];
        s += '<polygon points="' + pts(L) + '" fill="' + shade + '"/>';
        var Rr = L.map(function (p) { return [1600 - p[0], p[1]]; });
        s += '<polygon points="' + pts(Rr) + '" fill="' + shade + '"/>';
      });
      if (i % 2 === 1) {
        var cx = xs[i + 1], cy = h(cx, .3), r = 46 * (1 - cx / 520);
        s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + r * 1.2 + '" ry="' + r * 2.2 + '" fill="url(#' + glow + ')" opacity=".45"/>';
        s += '<ellipse cx="' + (1600 - cx) + '" cy="' + cy + '" rx="' + r * 1.2 + '" ry="' + r * 2.2 + '" fill="url(#' + glow + ')" opacity=".45"/>';
      }
    }
    // Ceiling downlights
    [.22, .45, .64, .8].forEach(function (sd) {
      [.28, .72].forEach(function (u) {
        var x = lerp(lerp(0, 1600, u), lerp(460, 1140, u), sd), y = 270 * sd, rx = 16 * (1 - sd * .7);
        s += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + (rx * 3).toFixed(1) + '" ry="' + (rx * 1.4).toFixed(1) + '" fill="url(#' + glow + ')" opacity=".35"/>';
        s += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + rx.toFixed(1) + '" ry="' + (rx * .35).toFixed(1) + '" fill="#f6e3c0"/>';
      });
    });
    // Screen
    s += '<rect x="512" y="302" width="576" height="251" fill="#060606"/>';
    s += '<rect x="520" y="310" width="560" height="235" fill="url(#' + sky + ')"/>';
    s += '<circle cx="860" cy="505" r="26" fill="#f7d9a3" opacity=".9"/>';
    s += '<path d="M520 470 L600 430 L660 455 L740 400 L820 448 L900 420 L980 460 L1080 430 L1080 545 L520 545Z" fill="#2a2420" opacity=".85"/>';
    s += '<path d="M520 505 L620 480 L720 500 L820 470 L940 498 L1080 476 L1080 545 L520 545Z" fill="#141210"/>';
    // Front speakers + sub
    s += '<rect x="474" y="430" width="34" height="220" fill="#0a0a0b"/><rect x="1092" y="430" width="34" height="220" fill="#0a0a0b"/>';
    [455, 495, 560, 600].forEach(function (y) { s += '<circle cx="491" cy="' + y + '" r="9" fill="#151517"/><circle cx="1109" cy="' + y + '" r="9" fill="#151517"/>'; });
    s += '<rect x="520" y="590" width="560" height="60" fill="#0f0f10"/>';
    s += '<rect x="760" y="598" width="80" height="44" fill="#0a0a0b"/>';
    // Screen light spill
    s += '<ellipse cx="800" cy="690" rx="560" ry="160" fill="url(#' + spill + ')"/>';
    // Step lights on riser
    for (var k = 0; k < 9; k++) { s += '<rect x="' + (220 + k * 135) + '" y="808" width="26" height="4" rx="2" fill="#d8b27a" opacity=".85"/>'; }
    s += '<polygon points="80,812 1520,812 1600,860 0,860" fill="#141312"/>';
    // Front row (nearer the screen)
    [627, 742, 857, 972].forEach(function (cx) {
      s += '<rect x="' + (cx - 50) + '" y="610" width="100" height="92" rx="20" fill="#09090a"/>';
      s += '<path d="M' + (cx - 44) + ' 616 Q' + cx + ' 600 ' + (cx + 44) + ' 616" stroke="#c49a5e" stroke-opacity=".35" stroke-width="2" fill="none"/>';
    });
    // Rear row (camera row), cropped by frame
    [478, 693, 908, 1123].forEach(function (cx) {
      s += '<rect x="' + (cx - 96) + '" y="770" width="192" height="260" rx="34" fill="#070708"/>';
      s += '<path d="M' + (cx - 82) + ' 782 Q' + cx + ' 754 ' + (cx + 82) + ' 782" stroke="#c49a5e" stroke-opacity=".4" stroke-width="2.5" fill="none"/>';
    });
    [370, 585, 800, 1015, 1230].forEach(function (x) { s += '<rect x="' + (x - 14) + '" y="880" width="28" height="140" rx="10" fill="#050505"/>'; });
    s += '</svg>';
    return s;
  }

  /* ---------- Living room ---------- */
  function living() {
    var g = nid('lg'), sp = nid('lsp');
    var s = svgOpen('0 0 1600 1000');
    s += '<defs><radialGradient id="' + g + '" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f1cf96" stop-opacity=".75"/><stop offset="1" stop-color="#f1cf96" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="' + sp + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b3b4a"/><stop offset="1" stop-color="#0d1218"/></linearGradient></defs>';
    s += '<rect width="1600" height="1000" fill="#1a1b1d"/>';
    for (var i = 0; i < 26; i++) { s += '<rect x="' + (430 + i * 28) + '" y="80" width="18" height="700" fill="' + (i % 3 ? '#2a2420' : '#30291f') + '"/>'; }
    s += '<rect x="0" y="780" width="1600" height="220" fill="#141312"/>';
    s += '<rect x="0" y="776" width="1600" height="4" fill="#2a2724"/>';
    s += '<rect x="520" y="230" width="560" height="315" fill="#050607"/><rect x="528" y="238" width="544" height="299" fill="url(#' + sp + ')"/>';
    s += '<path d="M528 238 L760 238 L620 537 L528 537Z" fill="#fff" opacity=".04"/>';
    s += '<rect x="580" y="600" width="440" height="34" rx="6" fill="#0c0c0d"/>';
    for (var j = 0; j < 22; j++) { s += '<circle cx="' + (600 + j * 19) + '" cy="617" r="3" fill="#202022"/>'; }
    s += '<rect x="440" y="660" width="720" height="110" fill="#22201d"/><rect x="440" y="660" width="720" height="6" fill="#3a332a"/>';
    [[300, 470], [1240, 470]].forEach(function (p) {
      s += '<rect x="' + p[0] + '" y="' + p[1] + '" width="60" height="110" fill="#0d0d0e"/>';
      s += '<circle cx="' + (p[0] + 30) + '" cy="' + (p[1] + 30) + '" r="10" fill="#1d1d1f"/><circle cx="' + (p[0] + 30) + '" cy="' + (p[1] + 72) + '" r="20" fill="#1d1d1f"/>';
      s += '<rect x="' + (p[0] + 26) + '" y="' + (p[1] + 110) + '" width="8" height="190" fill="#0d0d0e"/>';
    });
    s += '<ellipse cx="1380" cy="140" rx="220" ry="220" fill="url(#' + g + ')" opacity=".5"/><path d="M1380 0 V110" stroke="#0a0a0a" stroke-width="3"/><path d="M1340 110 H1420 L1400 150 H1360Z" fill="#c49a5e"/>';
    s += '<path d="M120 1000 V880 Q120 820 190 820 H1410 Q1480 820 1480 880 V1000Z" fill="#0b0b0c"/>';
    s += '<path d="M160 830 H1440" stroke="#c49a5e" stroke-opacity=".3" stroke-width="2"/>';
    s += '</svg>';
    return s;
  }

  /* ---------- Hi-Fi listening room ---------- */
  function hifi() {
    var g = nid('hg');
    var s = svgOpen('0 0 1600 1000');
    s += '<defs><radialGradient id="' + g + '" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#efc98d" stop-opacity=".8"/><stop offset="1" stop-color="#efc98d" stop-opacity="0"/></radialGradient></defs>';
    s += '<rect width="1600" height="1000" fill="#1b1a19"/>';
    s += '<rect x="0" y="0" width="1600" height="760" fill="#201f1d"/>';
    for (var i = 0; i < 12; i++) { s += '<rect x="' + (i * 140) + '" y="760" width="138" height="240" fill="' + (i % 2 ? '#2a2119' : '#2e241b') + '"/>'; }
    s += '<ellipse cx="800" cy="890" rx="560" ry="80" fill="#3a2f26" opacity=".7"/>';
    [[330, 300], [1160, 300]].forEach(function (p) {
      s += '<rect x="' + p[0] + '" y="' + p[1] + '" width="110" height="470" rx="4" fill="#0e0e0f"/>';
      s += '<circle cx="' + (p[0] + 55) + '" cy="' + (p[1] + 55) + '" r="16" fill="#2a2a2c"/><circle cx="' + (p[0] + 55) + '" cy="' + (p[1] + 55) + '" r="6" fill="#c49a5e"/>';
      [150, 250, 350].forEach(function (y) { s += '<circle cx="' + (p[0] + 55) + '" cy="' + (p[1] + y) + '" r="36" fill="#1b1b1d"/><circle cx="' + (p[0] + 55) + '" cy="' + (p[1] + y) + '" r="12" fill="#262628"/>'; });
      s += '<rect x="' + (p[0] - 6) + '" y="' + (p[1] + 470) + '" width="122" height="10" fill="#0a0a0a"/>';
    });
    s += '<rect x="640" y="500" width="320" height="270" fill="#121212"/>';
    [520, 600, 680].forEach(function (y, k) {
      s += '<rect x="660" y="' + y + '" width="280" height="60" fill="#1f1f20"/><rect x="660" y="' + y + '" width="280" height="2" fill="#3a3a3a"/>';
      s += '<circle cx="' + (900 - k * 10) + '" cy="' + (y + 30) + '" r="14" fill="#2c2c2e"/><rect x="680" y="' + (y + 26) + '" width="' + (90 + k * 30) + '" height="8" fill="#0b0b0c"/>';
      s += '<circle cx="700" cy="' + (y + 14) + '" r="3" fill="#c49a5e"/>';
    });
    s += '<rect x="660" y="470" width="280" height="30" fill="#1a1a1b"/><ellipse cx="770" cy="476" rx="88" ry="8" fill="#0a0a0a"/>';
    s += '<ellipse cx="1420" cy="380" rx="260" ry="260" fill="url(#' + g + ')" opacity=".45"/><path d="M1420 360 V760" stroke="#0c0c0c" stroke-width="5"/><path d="M1370 330 H1470 L1450 380 H1390Z" fill="#c49a5e"/>';
    s += '<path d="M1040 1000 V860 Q1040 800 1100 800 H1300 Q1360 800 1360 860 V1000Z" fill="#0c0b0b"/><path d="M1010 1000 V900 Q1010 870 1040 870 V1000Z M1390 1000 V900 Q1390 870 1360 870 V1000Z" fill="#090909"/>';
    s += '</svg>';
    return s;
  }

  /* ---------- Acoustic treatment wall ---------- */
  function acoustic() {
    var s = svgOpen('0 0 1600 1000');
    s += '<rect width="1600" height="1000" fill="#18191b"/>';
    var cols = ['#23252a', '#2a2b2f', '#1f2024', '#2d2a26'];
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 8; c++) {
        if (c >= 3 && c <= 4 && r === 1) continue;
        s += '<rect x="' + (110 + c * 175) + '" y="' + (120 + r * 230) + '" width="160" height="215" fill="' + cols[(r + c) % 4] + '"/>';
        s += '<rect x="' + (110 + c * 175) + '" y="' + (120 + r * 230) + '" width="160" height="3" fill="#fff" opacity=".04"/>';
      }
    }
    // Skyline diffuser block (centre)
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 14; x++) {
        var v = rnd(); var tone = Math.round(28 + v * 34);
        s += '<rect x="' + (635 + x * 23.5) + '" y="' + (355 + y * 23.5) + '" width="21" height="21" fill="rgb(' + (tone + 6) + ',' + (tone + 2) + ',' + tone + ')"/>';
      }
    }
    s += '<polygon points="0,0 90,0 90,1000 0,1000" fill="#121314"/><polygon points="1510,0 1600,0 1600,1000 1510,1000" fill="#121314"/>';
    s += '<rect x="0" y="830" width="1600" height="170" fill="#131210"/>';
    s += '<path d="M0 830 H1600" stroke="#c49a5e" stroke-opacity=".35" stroke-width="2"/>';
    s += '</svg>';
    return s;
  }

  /* ---------- Boardroom ---------- */
  function boardroom() {
    var s = svgOpen('0 0 1600 1000');
    s += '<rect width="1600" height="1000" fill="#1c1d1f"/>';
    s += '<polygon points="0,0 1600,0 1220,200 380,200" fill="#151617"/>';
    s += '<polygon points="380,640 1220,640 1600,1000 0,1000" fill="#18171a"/>';
    s += '<rect x="380" y="200" width="840" height="440" fill="#232427"/>';
    s += '<rect x="560" y="250" width="480" height="270" fill="#08090a"/>';
    var tiles = ['#2b3440', '#3a332c', '#2e3a33', '#3a2e35'];
    for (var i = 0; i < 4; i++) { s += '<rect x="' + (572 + (i % 2) * 230) + '" y="' + (262 + Math.floor(i / 2) * 126) + '" width="224" height="120" fill="' + tiles[i] + '"/><circle cx="' + (684 + (i % 2) * 230) + '" cy="' + (310 + Math.floor(i / 2) * 126) + '" r="22" fill="#0e0e0e" opacity=".55"/>'; }
    s += '<rect x="740" y="232" width="120" height="12" rx="6" fill="#0b0b0c"/><circle cx="800" cy="238" r="3" fill="#c49a5e"/>';
    [[540, 90], [1060, 90], [700, 150], [900, 150]].forEach(function (p) { s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="26" ry="8" fill="#2a2b2e"/>'; });
    s += '<polygon points="700,600 900,600 1180,1000 420,1000" fill="#2b2620"/><polygon points="700,600 900,600 905,612 695,612" fill="#3a3229"/>';
    for (var k = 0; k < 4; k++) {
      var t = k / 3, yl = lerp(640, 930, t), xl = lerp(650, 380, t), xr = lerp(950, 1220, t), w = lerp(50, 120, t);
      s += '<rect x="' + (xl - w) + '" y="' + (yl - w * .6) + '" width="' + w + '" height="' + w * 1.1 + '" rx="' + w * .2 + '" fill="#0c0c0d"/>';
      s += '<rect x="' + xr + '" y="' + (yl - w * .6) + '" width="' + w + '" height="' + w * 1.1 + '" rx="' + w * .2 + '" fill="#0c0c0d"/>';
    }
    s += '<circle cx="770" cy="760" r="20" fill="#121213"/><circle cx="830" cy="860" r="22" fill="#121213"/>';
    s += '</svg>';
    return s;
  }

  /* ---------- Seating ---------- */
  function seating() {
    var g = nid('sg');
    var s = svgOpen('0 0 1600 1000');
    s += '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2622"/><stop offset="1" stop-color="#121110"/></linearGradient></defs>';
    s += '<rect width="1600" height="1000" fill="#141516"/>';
    s += '<rect x="0" y="420" width="1600" height="160" fill="#1c1b1a"/><rect x="0" y="580" width="1600" height="420" fill="#111"/>';
    for (var k = 0; k < 11; k++) s += '<rect x="' + (90 + k * 140) + '" y="572" width="24" height="4" rx="2" fill="#d8b27a" opacity=".8"/>';
    function chair(cx, y, w, rim) {
      var h = w * 1.05, out = '';
      out += '<rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="' + h * .62 + '" rx="' + w * .16 + '" fill="url(#' + g + ')"/>';
      out += '<rect x="' + (cx - w / 2 + w * .08) + '" y="' + (y + h * .5) + '" width="' + w * .84 + '" height="' + h * .26 + '" rx="' + w * .08 + '" fill="#1f1c19"/>';
      out += '<rect x="' + (cx - w / 2 - w * .12) + '" y="' + (y + h * .38) + '" width="' + w * .16 + '" height="' + h * .42 + '" rx="' + w * .06 + '" fill="#0f0e0d"/>';
      out += '<rect x="' + (cx + w / 2 - w * .04) + '" y="' + (y + h * .38) + '" width="' + w * .16 + '" height="' + h * .42 + '" rx="' + w * .06 + '" fill="#0f0e0d"/>';
      out += '<circle cx="' + (cx + w / 2 + w * .04) + '" cy="' + (y + h * .42) + '" r="' + w * .035 + '" fill="#000"/>';
      out += '<path d="M' + (cx - w * .38) + ' ' + (y + 4) + ' Q' + cx + ' ' + (y - w * .04) + ' ' + (cx + w * .38) + ' ' + (y + 4) + '" stroke="#c49a5e" stroke-opacity="' + rim + '" stroke-width="2" fill="none"/>';
      return out;
    }
    [470, 690, 910, 1130].forEach(function (cx) { s += chair(cx, 300, 170, .35); });
    [360, 620, 880, 1140].forEach(function (cx) { s += chair(cx + 50, 600, 230, .5); });
    s += '</svg>';
    return s;
  }

  /* ---------- Projector beam ---------- */
  function projector() {
    var b = nid('pb');
    var s = svgOpen('0 0 1600 1000');
    s += '<defs><linearGradient id="' + b + '" x1="0" x2="1"><stop offset="0" stop-color="#f4dcae" stop-opacity=".55"/><stop offset="1" stop-color="#f4dcae" stop-opacity=".04"/></linearGradient></defs>';
    s += '<rect width="1600" height="1000" fill="#111213"/><rect x="0" y="0" width="1600" height="120" fill="#0c0c0d"/><rect y="860" width="1600" height="140" fill="#0e0d0c"/>';
    s += '<rect x="1180" y="190" width="18" height="560" fill="#0a0a0a"/><rect x="1198" y="200" width="300" height="540" fill="#e9e3d6"/>';
    s += '<rect x="1206" y="208" width="284" height="524" fill="#d9cdb6"/><path d="M1206 600 L1300 540 L1380 580 L1490 520 V732 H1206Z" fill="#8c7356" opacity=".6"/>';
    s += '<polygon points="300,190 1206,208 1206,732 300,214" fill="url(#' + b + ')"/>';
    s += '<rect x="180" y="120" width="10" height="60" fill="#0a0a0a"/><rect x="120" y="170" width="190" height="66" rx="8" fill="#1d1e20"/>';
    s += '<circle cx="292" cy="202" r="20" fill="#0a0a0a"/><circle cx="292" cy="202" r="9" fill="#f4dcae"/>';
    s += '<rect x="138" y="186" width="60" height="4" fill="#2c2c2e"/><rect x="138" y="196" width="60" height="4" fill="#2c2c2e"/>';
    s += '</svg>';
    return s;
  }

  /* ---------- Automation keypad ---------- */
  function automation() {
    var g = nid('ag');
    var s = svgOpen('0 0 1600 1000');
    s += '<defs><linearGradient id="' + g + '" x1="0" x2="1"><stop offset="0" stop-color="#e9c792" stop-opacity="0"/><stop offset=".5" stop-color="#e9c792" stop-opacity=".55"/><stop offset="1" stop-color="#e9c792" stop-opacity="0"/></linearGradient></defs>';
    s += '<rect width="1600" height="1000" fill="#1a1b1d"/><rect y="0" width="1600" height="140" fill="#121314"/><rect y="138" width="1600" height="6" fill="url(#' + g + ')"/>';
    s += '<rect y="140" width="1600" height="120" fill="url(#' + g + ')" opacity=".18"/>';
    s += '<rect x="640" y="320" width="320" height="440" rx="6" fill="#26272a"/><rect x="640" y="320" width="320" height="440" rx="6" fill="none" stroke="#3a3b3f"/>';
    var labels = ['CINEMA', 'INTERVAL', 'LOUNGE', 'MUSIC', 'CLEAN', 'ALL OFF'];
    labels.forEach(function (l, i) {
      var y = 360 + i * 64;
      s += '<rect x="680" y="' + y + '" width="240" height="48" rx="4" fill="#1b1c1e"/>';
      s += '<circle cx="704" cy="' + (y + 24) + '" r="4" fill="' + (i === 0 ? '#e0b676' : '#4a4a4c') + '"/>';
      s += '<text x="724" y="' + (y + 30) + '" fill="#bdb6aa" font-family="Manrope, sans-serif" font-size="16" letter-spacing="3">' + l + '</text>';
    });
    s += '</svg>';
    return s;
  }

  /* ---------- Abstract map backdrop (not a real map) ---------- */
  function mapArt() {
    var s = svgOpen('0 0 800 500');
    s += '<rect width="800" height="500" fill="#18191b"/>';
    for (var i = 0; i < 12; i++) s += '<path d="M' + (i * 80 - 120) + ' 0 L' + (i * 80 + 60) + ' 500" stroke="#26272a" stroke-width="' + (i % 4 ? 2 : 6) + '"/>';
    for (var j = 0; j < 8; j++) s += '<path d="M0 ' + (j * 70 + 20) + ' L800 ' + (j * 70 - 40) + '" stroke="#24252a" stroke-width="' + (j % 3 ? 2 : 5) + '"/>';
    s += '</svg>';
    return s;
  }

  var SCENES = { cinema: cinema, living: living, hifi: hifi, acoustic: acoustic, boardroom: boardroom, seating: seating, projector: projector, automation: automation, map: mapArt };

  /* figure(): accessible wrapper. alt describes the illustration honestly. */
  function figure(scene, alt, opts) {
    opts = opts || {};
    var cls = 'fig' + (opts.cls ? ' ' + opts.cls : '');
    var attrs = opts.reveal ? ' data-reveal="mask"' : '';
    // div[role=img] rather than <figure>: ARIA forbids role overrides on a captioned figure.
    return '<div class="' + cls + '"' + attrs + ' role="img" aria-label="' + alt + ' (illustration, not an ROS installation photograph)">' +
      SCENES[scene]() + '<span class="figcaption" aria-hidden="true">' + (opts.caption || 'Illustrative render · replace with approved ROS photo') + '</span></div>';
  }

  /* ---------- Icons (24px line set) ---------- */
  var P = {
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
    chat: '<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"/><path d="M9 10.5c.5 2 2 3.5 4 4"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="1"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="1"/><path d="M3.5 6.5l8.5 7 8.5-7"/>',
    pin: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    theatre: '<rect x="3" y="4" width="18" height="10" rx="1"/><path d="M6 20v-2.5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2V20M14 20v-2.5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2V20"/>',
    acoustics: '<path d="M4 5v14M8 8v8M12 4v16M16 8v8M20 6v12"/>',
    automation: '<rect x="6" y="3" width="12" height="18" rx="1"/><circle cx="12" cy="9" r="2"/><path d="M9.5 15h5M9.5 18h5"/>',
    projector: '<rect x="2.5" y="8" width="15" height="8" rx="1"/><circle cx="13" cy="12" r="2.2"/><path d="M17.5 10.5 21.5 8v8l-4-2.5M5 16v2M15 16v2"/>',
    seat: '<path d="M6 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/><path d="M4 11h16v5H4zM6 16v3M18 16v3"/>',
    boardroom: '<rect x="4" y="3.5" width="16" height="9" rx="1"/><path d="M12 12.5V15M5 20l2-5h10l2 5"/>',
    speaker: '<rect x="6" y="2.5" width="12" height="19" rx="1"/><circle cx="12" cy="7" r="1.6"/><circle cx="12" cy="14.5" r="3.6"/>',
    atmos: '<path d="M4 10c4.5-5 11.5-5 16 0M7 13c3-3 7-3 10 0"/><rect x="9" y="15" width="6" height="6" rx="1"/>',
    satellite: '<rect x="7.5" y="5" width="9" height="14" rx="1"/><circle cx="12" cy="13.5" r="2.5"/><circle cx="12" cy="8.2" r="1"/>',
    inwall: '<rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    sub: '<rect x="3.5" y="4" width="17" height="16" rx="1"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="2"/>',
    soundbar: '<rect x="2" y="9" width="20" height="6" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/>',
    receiver: '<rect x="2" y="7" width="20" height="10" rx="1"/><circle cx="17" cy="12" r="2.5"/><path d="M5 10.5h7M5 13.5h4"/>',
    disc: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/>',
    hifi: '<rect x="3" y="12" width="18" height="8" rx="1"/><circle cx="12" cy="7" r="3.5"/><path d="M12 7l2-2M6 16h4"/>',
    cable: '<path d="M4 20c0-6 5-6 8-8s4-6 8-8"/><rect x="2" y="17" width="4" height="5" rx=".5"/><rect x="18" y="2" width="4" height="5" rx=".5"/>',
    proj4k: '<rect x="2.5" y="8" width="15" height="8" rx="1"/><circle cx="13" cy="12" r="2.2"/><path d="M5 11h3"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || 'ico') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || '') + '</svg>';
  }

  function brandMark() {
    return '<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><circle cx="20" cy="20" r="19" fill="none" stroke="#B99055" stroke-width="1.2"/>' +
      '<path d="M11 24V16M15 27V13M20 30V10M25 27V13M29 24V16" stroke="#EFEAE1" stroke-width="1.6" stroke-linecap="round"/></svg>';
  }

  /* Decorative waveform; bars are static values, not measurements. */
  function wave(n) {
    n = n || 48;
    var out = '<div class="wave" aria-hidden="true" data-wave>';
    for (var i = 0; i < n; i++) {
      var h = (.25 + .7 * Math.abs(Math.sin(i * .37) * Math.cos(i * .11))).toFixed(2);
      out += '<i style="--h:' + h + ';--d:' + (1.2 + (i % 5) * .22).toFixed(2) + 's;--dl:-' + ((i % 7) * .18).toFixed(2) + 's"></i>';
    }
    return out + '</div>';
  }

  R.art = { figure: figure, scene: function (n) { return SCENES[n](); }, icon: icon, brandMark: brandMark, wave: wave, resetIds: function () { uid = 0; } };
})(typeof window !== 'undefined' ? (window.ROS = window.ROS || {}) : (globalThis.ROS = globalThis.ROS || {}));
