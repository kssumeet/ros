/* ROS prototype — motion and interactive features (browser only).
   Every effect checks prefers-reduced-motion, pauses off-screen and degrades to
   static content. Sound only ever starts from a user gesture. */
(function (R) {
  'use strict';
  var doc = document, S = R.sound;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var wide = window.matchMedia('(min-width: 900px)');
  var FX = R.fx = {};
  function still() { return reduced.matches; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ------------------------------------------------ custom cursor (desktop) */
  var cursor, cx = -100, cy = -100, tx = -100, ty = -100, cRaf = 0;
  function initCursor() {
    if (!fine.matches || still() || cursor) return;
    cursor = doc.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor-ring"></span><span class="cursor-label"></span>';
    doc.body.appendChild(cursor);
    doc.documentElement.classList.add('has-cursor');
    var label = cursor.querySelector('.cursor-label');
    function loop() {
      cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
      cursor.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      cRaf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    }
    doc.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add('is-on');
      if (!cRaf) cRaf = requestAnimationFrame(loop);
    }, { passive: true });
    doc.addEventListener('pointerleave', function () { cursor.classList.remove('is-on'); });
    doc.addEventListener('mouseover', function (e) {
      var t = e.target.closest('a,button,[data-cursor],input[type=range],label');
      var lbl = t && t.closest('[data-cursor]') ? t.closest('[data-cursor]').getAttribute('data-cursor') : '';
      cursor.classList.toggle('is-link', !!t);
      cursor.classList.toggle('has-label', !!lbl);
      label.textContent = lbl;
    });
    doc.addEventListener('pointerdown', function () { cursor.classList.add('is-down'); });
    doc.addEventListener('pointerup', function () { cursor.classList.remove('is-down'); });
  }

  /* ------------------------------------------------ magnetic buttons */
  function magnetic(scope) {
    if (!fine.matches || still()) return;
    scope.querySelectorAll('.btn--primary, .play-orb, [data-magnetic]').forEach(function (el) {
      if (el.__mag) return; el.__mag = 1;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
        el.style.transform = 'translate(' + (x * 10).toFixed(1) + 'px,' + (y * 8).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ------------------------------------------------ UI sound toggle + ticks */
  function initSoundToggle() {
    var t = doc.querySelector('[data-sound-toggle]');
    if (!t) return;
    if (!S || !S.supported) { t.hidden = true; return; }
    function sync() { var on = S.uiOn(); t.setAttribute('aria-pressed', String(on)); t.classList.toggle('is-on', on); }
    sync();
    t.addEventListener('click', function () { S.setUi(!S.uiOn()); sync(); if (S.uiOn()) S.thump(); });
    var idx = 0;
    doc.addEventListener('pointerover', function (e) {
      if (!S.uiOn() || e.pointerType !== 'mouse') return;
      var el = e.target.closest('a,button');
      if (el && !el.contains(e.relatedTarget)) S.tick(idx++);
    });
    doc.addEventListener('click', function (e) { if (S.uiOn() && e.target.closest('a,button') && !e.target.closest('[data-sound-toggle]')) S.thump(); }, true);
  }

  /* ------------------------------------------------ scroll progress waveform */
  var progFill;
  function initProgress() {
    var wrap = doc.querySelector('.scroll-wave');
    if (!wrap) return;
    var d = 'M0 6';
    for (var i = 1; i <= 240; i++) { var a = Math.sin(i * 0.45) * Math.sin(i * 0.071) * 4.5; d += ' L' + (i * 5) + ' ' + (6 + a).toFixed(2); }
    wrap.innerHTML = '<svg viewBox="0 0 1200 12" preserveAspectRatio="none" aria-hidden="true"><path class="w-bg" d="' + d + '"/><path class="w-fg" d="' + d + '"/></svg>';
    progFill = wrap.querySelector('.w-fg');
  }

  /* ------------------------------------------------ shared scroll loop */
  var parallaxEls = new Set(), hscrolls = [], ticking = false;
  var parallaxIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) parallaxEls.add(e.target); else parallaxEls.delete(e.target); });
  }, { rootMargin: '10% 0px' }) : null;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var vh = window.innerHeight, sy = window.scrollY, max = doc.documentElement.scrollHeight - vh;
      if (progFill) progFill.style.clipPath = 'inset(0 ' + (100 - clamp(sy / (max || 1), 0, 1) * 100).toFixed(2) + '% 0 0)';
      if (!still() && wide.matches) {
        parallaxEls.forEach(function (img) {
          var r = img.parentNode.getBoundingClientRect();
          var p = (r.top + r.height / 2 - vh / 2) / vh;
          img.style.transform = 'translate3d(0,' + (p * -7).toFixed(2) + '%,0) scale(1.14)';
        });
      }
      hscrolls.forEach(function (h) {
        if (!h.active) return;
        var r = h.el.getBoundingClientRect();
        var p = clamp(-r.top / (h.el.offsetHeight - vh), 0, 1);
        h.track.style.transform = 'translate3d(' + (-p * h.dist).toFixed(1) + 'px,0,0)';
        if (h.bar) h.bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
      });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measureH(); onScroll(); }, { passive: true });

  function measureH() {
    hscrolls = hscrolls.filter(function (h) { return doc.contains(h.el); });
    hscrolls.forEach(function (h) {
      h.active = wide.matches && !still();
      h.el.classList.toggle('is-pinned', h.active);
      if (!h.active) { h.track.style.transform = ''; h.el.style.height = ''; return; }
      h.dist = Math.max(0, h.track.scrollWidth - h.el.querySelector('.hs-sticky').clientWidth);
      h.el.style.height = (window.innerHeight + h.dist) + 'px';
    });
  }

  /* ------------------------------------------------ hero visualiser */
  var heroLoop = null;
  function initHero(scope) {
    var terrainHero = scope.querySelector('.hero--terrain');
    if (terrainHero) { initTerrain(terrainHero); return; }
    var hero = scope.querySelector('.hero--sound, .page-hero');
    if (!hero) return;
    var canvas = hero.querySelector('canvas.viz');
    if (!canvas) return;
    var g = canvas.getContext('2d');
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), mx = 0.6, my = 0.5, tmx = 0.6, energy = 0, visible = true, t0 = performance.now();
    var freq = null;
    function size() { W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W * dpr; canvas.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size, { passive: true });
    hero.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; }, { passive: true });
    function draw(now) {
      var t = (now - t0) / 1000, an = S && S.analyser && S.analyser();
      mx += (tmx - mx) * 0.06;
      var e = 0;
      if (an && S.busy()) {
        if (!freq) freq = new Uint8Array(an.frequencyBinCount);
        an.getByteFrequencyData(freq);
        for (var k = 2; k < 40; k++) e += freq[k];
        e = e / (38 * 255);
      }
      energy += (e - energy) * 0.15;
      hero.style.setProperty('--energy', energy.toFixed(3));
      g.clearRect(0, 0, W, H);
      var lines = 7, base = H * 0.66;
      for (var l = 0; l < lines; l++) {
        g.beginPath();
        var amp = (10 + l * 5) * (1 + energy * 5), ph = t * (0.6 + l * 0.11) + l;
        for (var x = 0; x <= W; x += 6) {
          var nx = x / W, near = Math.exp(-Math.pow((nx - mx) * 3.2, 2));
          var fb = freq && energy > 0.02 ? freq[(Math.floor(nx * 120) + l * 9) % 200] / 255 : 0;
          var y = base + Math.sin(nx * (6 + l) + ph) * amp * (0.35 + near * 0.9) + Math.sin(nx * 23 - t * 2 + l) * 3 - fb * 60 * (1 - l / lines);
          if (x === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.strokeStyle = 'rgba(207,168,108,' + (0.05 + (lines - l) * 0.035 + energy * 0.3).toFixed(3) + ')';
        g.lineWidth = l === 0 ? 1.6 : 1;
        g.stroke();
      }
      if (visible && !doc.hidden && !still()) heroLoop = requestAnimationFrame(draw); else heroLoop = null;
    }
    function start() { if (!heroLoop) heroLoop = requestAnimationFrame(draw); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) start(); }).observe(hero);
    doc.addEventListener('visibilitychange', function () { if (!doc.hidden && visible) start(); });
    if (still()) draw(performance.now()); else start();
    FX.kickHero = start;
  }

  /* ------------------------------------------------ home hero: spectrogram terrain
     A perspective "waterfall" of frequency slices flowing toward the viewer.
     Idle: a procedural spectrum that follows the pointer. Playing: the real
     analyser data (log-frequency, 20 Hz–20 kHz) of the sound demo. */
  function initTerrain(hero) {
    var canvas = hero.querySelector('canvas.terrain');
    if (!canvas) return;
    var g = canvas.getContext('2d');
    var small = window.innerWidth < 720;
    var ROWS = small ? 26 : 44, BINS = small ? 64 : 110;
    var rows = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var tmp = null, mu = 0.5, tmu = 0.5, mh = 0.4, tmh = 0.4, visible = true, frame = 0, energy = 0, freq = null, raf = null, t0 = performance.now();
    for (var r = 0; r < ROWS; r++) rows.push(new Float32Array(BINS));
    function size() { W = canvas.clientWidth; H = canvas.clientHeight; canvas.width = W * dpr; canvas.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size, { passive: true });
    hero.addEventListener('pointermove', function (e) {
      var b = hero.getBoundingClientRect();
      tmu = (e.clientX - b.left) / b.width; tmh = 0.25 + 0.75 * clamp((e.clientY - b.top) / b.height, 0, 1);
    }, { passive: true });
    hero.addEventListener('pointerleave', function () { tmu = 0.5; tmh = 0.35; });

    function idleRow(t, out) {
      for (var i = 0; i < BINS; i++) {
        var u = i / (BINS - 1);
        var v = 0.55 * Math.exp(-Math.pow((u - 0.1) / 0.07, 2)) * (0.75 + 0.25 * Math.sin(t * 1.7));
        v += 0.32 * Math.exp(-Math.pow((u - (0.38 + 0.08 * Math.sin(t * 0.37))) / 0.05, 2)) * (0.6 + 0.4 * Math.sin(t * 2.3 + 1));
        v += 0.22 * Math.exp(-Math.pow((u - (0.64 + 0.06 * Math.cos(t * 0.29))) / 0.04, 2)) * (0.5 + 0.5 * Math.sin(t * 3.1 + 2));
        v += 0.12 * Math.exp(-Math.pow((u - 0.82) / 0.09, 2)) * (0.5 + 0.5 * Math.sin(t * 1.3 + u * 9));
        v += 0.6 * mh * Math.exp(-Math.pow((u - mu) / 0.045, 2));
        v += 0.05 * (Math.sin(u * 61 + t * 7) * Math.sin(u * 23 - t * 4) + 1);
        out[i] = v * (1 - 0.35 * u);
      }
    }
    function liveRow(an, out) {
      if (!freq) freq = new Uint8Array(an.frequencyBinCount);
      an.getByteFrequencyData(freq);
      var nyq = (S.ensure() ? S.ensure().sampleRate : 48000) / 2, e = 0;
      var raw = tmp || (tmp = new Float32Array(BINS));
      for (var i = 0; i < BINS; i++) {
        // fractional FFT bin with linear interpolation, so the coarse low end doesn't step
        var f = 20 * Math.pow(1000, i / (BINS - 1)), kf = Math.min(freq.length - 2, f / nyq * freq.length), k0 = Math.floor(kf), fr = kf - k0;
        raw[i] = (freq[k0] * (1 - fr) + freq[k0 + 1] * fr) / 255;
      }
      for (var j = 0; j < BINS; j++) {
        var v = (raw[Math.max(0, j - 2)] + 2 * raw[Math.max(0, j - 1)] + 3 * raw[j] + 2 * raw[Math.min(BINS - 1, j + 1)] + raw[Math.min(BINS - 1, j + 2)]) / 9;
        out[j] = Math.pow(v, 1.6) * 1.05 + 0.25 * mh * Math.exp(-Math.pow((j / (BINS - 1) - mu) / 0.045, 2));
        e += v;
      }
      return e / BINS;
    }
    function draw(now) {
      var t = (now - t0) / 1000;
      mu += (tmu - mu) * 0.08; mh += (tmh - mh) * 0.08;
      var an = S && S.analyser && S.analyser(), live = an && S.busy();
      if (frame++ % 2 === 0 || live) {
        var row = rows.pop();
        var e = live ? liveRow(an, row) : (idleRow(t, row), 0);
        rows.unshift(row);
        energy += (e - energy) * 0.2;
        hero.style.setProperty('--energy', energy.toFixed(3));
      }
      g.clearRect(0, 0, W, H);
      var horizon = H * (small ? 0.6 : 0.5), front = H * 1.0, cx = W / 2;
      for (var r = ROWS - 1; r >= 0; r--) {
        var z = r / (ROWS - 1), p = Math.pow(1 - z, 1.9);
        var yb = horizon + (front - horizon) * p, sc = 0.32 + 0.78 * p, amp = H * (0.07 + 0.3 * p), data = rows[r];
        g.beginPath();
        for (var i = 0; i < BINS; i++) {
          var x = cx + (i / (BINS - 1) - 0.5) * W * 1.08 * sc, y = yb - data[i] * amp;
          if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.lineTo(cx + 0.54 * W * sc, yb + 2); g.lineTo(cx - 0.54 * W * sc, yb + 2); g.closePath();
        g.fillStyle = '#101112'; g.fill();
        var a = 0.08 + 0.75 * p;
        g.strokeStyle = r === 0 ? 'rgba(239,234,225,' + (0.9).toFixed(2) + ')' : 'rgba(' + Math.round(185 + 30 * p) + ',' + Math.round(144 + 30 * p) + ',' + Math.round(85 + 40 * p) + ',' + a.toFixed(3) + ')';
        g.lineWidth = r === 0 ? 1.8 : 0.6 + 1.1 * p;
        g.stroke();
      }
      if (visible && !doc.hidden && !still()) raf = requestAnimationFrame(draw); else raf = null;
    }
    function start() { if (!raf) raf = requestAnimationFrame(draw); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) start(); }).observe(hero);
    doc.addEventListener('visibilitychange', function () { if (!doc.hidden && visible) start(); });
    if (still()) { for (var k = 0; k < ROWS; k++) idleRow(k * 0.08, rows[k]); draw(performance.now()); } else start();
    FX.kickHero = start;
  }

  /* ------------------------------------------------ play-the-room buttons */
  function initPlay(scope) {
    scope.querySelectorAll('[data-play-room]').forEach(function (b) {
      if (!S || !S.supported) { b.hidden = true; return; }
      var lbl = b.querySelector('[data-play-label]');
      b.addEventListener('click', function () {
        if (b.getAttribute('aria-pressed') === 'true') { S.stopSwell(); return; }
        b.setAttribute('aria-pressed', 'true'); b.classList.add('is-playing'); lbl.textContent = 'Stop the sound demo';
        doc.documentElement.classList.add('is-playing');
        if (FX.kickHero) FX.kickHero();
        S.swell(function () {
          b.setAttribute('aria-pressed', 'false'); b.classList.remove('is-playing'); lbl.textContent = 'Play an 8-second cinematic sound demo';
          doc.documentElement.classList.remove('is-playing');
        });
      });
    });
  }

  /* ------------------------------------------------ speaker explorer */
  function initSpeakers(scope) {
    scope.querySelectorAll('[data-speaker-explorer]').forEach(function (box) {
      var status = box.querySelector('[data-spx-status]'), room = box.querySelector('.spx-room');
      var sweepT = [];
      function setLayout(l) {
        box.setAttribute('data-layout', l);
        box.querySelectorAll('[data-layout-btn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-layout-btn') === l)); });
        box.querySelectorAll('.spk').forEach(function (s) {
          var on = s.getAttribute('data-in').split(' ').indexOf(l) > -1;
          s.classList.toggle('is-off', !on); s.disabled = !on; s.tabIndex = on ? 0 : -1;
        });
        status.textContent = l + ': ' + box.querySelectorAll('.spk:not(.is-off)').length + ' speakers. Tap one to hear it.';
      }
      function play(s) {
        var kind = s.getAttribute('data-kind');
        if (S && S.supported) { if (kind === 'sub') S.sub(); else S.burst(parseFloat(s.getAttribute('data-pan')), kind === 'top'); }
        s.classList.remove('is-firing'); void s.offsetWidth; s.classList.add('is-firing');
        if (!still()) {
          var ring = doc.createElement('i'); ring.className = 'spx-ring' + (kind === 'top' ? ' is-top' : '');
          ring.style.left = s.style.left; ring.style.top = s.style.top;
          room.appendChild(ring); setTimeout(function () { ring.remove(); }, 1300);
        }
        status.textContent = 'Playing: ' + s.getAttribute('data-name') + ' (' + s.getAttribute('data-desc') + ')';
      }
      box.addEventListener('click', function (e) {
        var lb = e.target.closest('[data-layout-btn]');
        if (lb) { stopSweep(); setLayout(lb.getAttribute('data-layout-btn')); return; }
        var s = e.target.closest('.spk');
        if (s && !s.disabled) { stopSweep(); play(s); return; }
        if (e.target.closest('[data-sweep]')) {
          stopSweep();
          var list = [].slice.call(box.querySelectorAll('.spk:not(.is-off)'));
          list.forEach(function (sp, i) { sweepT.push(setTimeout(function () { play(sp); }, i * 700)); });
          sweepT.push(setTimeout(function () { status.textContent = 'Sweep complete. In a real calibration each level is set with a meter at the main seat.'; }, list.length * 700 + 200));
        }
      });
      function stopSweep() { sweepT.forEach(clearTimeout); sweepT = []; }
      setLayout(box.getAttribute('data-layout'));
    });
  }

  /* ------------------------------------------------ acoustic simulator */
  function initAcoustic(scope) {
    scope.querySelectorAll('[data-acoustic-sim]').forEach(function (box) {
      var range = box.querySelector('[data-treat]'), rtOut = box.querySelector('[data-rt]'), roomOut = box.querySelector('[data-room]');
      var cv = box.querySelector('canvas'), g = cv.getContext('2d'), live = 0;
      function rt() { return 1.4 - (range.value / 100) * 1.1; }
      function roomName(v) { return v < 25 ? 'Bare: tiles, glass, plaster' : v < 55 ? 'Furnished: rug, curtains, sofa' : v < 85 ? 'Treated: panels at reflection points' : 'Fully treated: panels, traps, diffusion'; }
      function drawEnv(data) {
        var W = cv.width, H = cv.height, r = rt();
        g.clearRect(0, 0, W, H);
        g.strokeStyle = 'rgba(239,234,225,.08)'; g.lineWidth = 1;
        for (var i = 1; i < 6; i++) { g.beginPath(); g.moveTo(i * W / 6, 0); g.lineTo(i * W / 6, H); g.stroke(); }
        g.fillStyle = 'rgba(169,164,155,.8)'; g.font = '20px Manrope, sans-serif';
        for (var s = 0; s <= 1.5; s += 0.5) g.fillText(s.toFixed(1) + ' s', (s / 1.5) * W + 6, H - 10);
        // decay envelope (deterministic noise so the picture is stable)
        g.beginPath();
        for (var x = 0; x < W; x += 2) {
          var tt = (x / W) * 1.5, envv = Math.exp(-6.91 * tt / r), n = Math.sin(x * 12.9898) * 43758.5453; n = (n - Math.floor(n)) * 2 - 1;
          var y = H / 2 - n * envv * (H * 0.42);
          if (x === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.strokeStyle = 'rgba(185,144,85,.85)'; g.lineWidth = 1.5; g.stroke();
        g.beginPath(); for (var x2 = 0; x2 < W; x2 += 4) { var e2 = Math.exp(-6.91 * ((x2 / W) * 1.5) / r) * H * 0.42; if (x2 === 0) g.moveTo(x2, H / 2 - e2); else g.lineTo(x2, H / 2 - e2); }
        g.strokeStyle = 'rgba(239,234,225,.55)'; g.setLineDash([6, 6]); g.stroke(); g.setLineDash([]);
        if (data) {
          g.beginPath();
          for (var k = 0; k < data.length; k += 4) { var xx = (k / data.length) * W, yy = H / 2 + ((data[k] - 128) / 128) * H * 0.45; if (k === 0) g.moveTo(xx, yy); else g.lineTo(xx, yy); }
          g.strokeStyle = 'rgba(239,234,225,.9)'; g.lineWidth = 1.2; g.stroke();
        }
      }
      function update() {
        var r = rt();
        rtOut.textContent = r.toFixed(2) + ' s';
        roomOut.textContent = roomName(+range.value);
        range.setAttribute('aria-valuetext', roomName(+range.value) + ', RT60 ' + r.toFixed(1) + ' seconds');
        box.style.setProperty('--treat', range.value / 100);
        range.style.setProperty('--fill', range.value + '%');
        drawEnv();
      }
      range.addEventListener('input', update);
      box.querySelector('[data-clap]').addEventListener('click', function () {
        if (!S || !S.supported) return;
        S.clap(rt());
        if (still()) return;
        var an = S.analyser(), buf = new Uint8Array(an.fftSize), end = performance.now() + rt() * 1300 + 200;
        cancelAnimationFrame(live);
        (function frame(now) { an.getByteTimeDomainData(buf); drawEnv(buf); if (now < end) live = requestAnimationFrame(frame); else drawEnv(); })(performance.now());
      });
      update();
    });
  }

  /* ------------------------------------------------ screen calculator */
  function initScreen(scope) {
    scope.querySelectorAll('[data-screen-calc]').forEach(function (box) {
      var r = box.querySelector('[data-dist]');
      var l30 = box.querySelector('.sc-screen30'), l40 = box.querySelector('.sc-screen40'), cone = box.querySelector('.sc-cone'), eye = box.querySelector('.sc-eye'), dt = box.querySelector('.sc-dist');
      function diag(d, deg) { return 2 * d * Math.tan(deg * Math.PI / 360) / 0.8716; }
      function update() {
        var d = +r.value, s30 = diag(d, 30), s40 = diag(d, 40);
        box.querySelector('[data-dist-out]').textContent = d.toFixed(1) + ' m';
        r.setAttribute('aria-valuetext', d.toFixed(1) + ' metres');
        r.style.setProperty('--fill', ((d - 2) / 4 * 100).toFixed(1) + '%');
        box.querySelector('[data-s30]').textContent = Math.round(s30 / 0.0254) + '″ · ' + (s30 * 100).toFixed(0) + ' cm';
        box.querySelector('[data-s40]').textContent = Math.round(s40 / 0.0254) + '″ · ' + (s40 * 100).toFixed(0) + ' cm';
        var scale = 36, ey = 30 + d * scale, w30 = s30 * 0.8716 * scale, w40 = s40 * 0.8716 * scale;
        eye.setAttribute('cy', ey); dt.setAttribute('y', (30 + ey) / 2); dt.textContent = d.toFixed(1) + ' m';
        l30.setAttribute('x1', 200 - w30 / 2); l30.setAttribute('x2', 200 + w30 / 2);
        l40.setAttribute('x1', 200 - w40 / 2); l40.setAttribute('x2', 200 + w40 / 2);
        cone.setAttribute('points', '200,' + ey + ' ' + (200 - w40 / 2) + ',30 ' + (200 + w40 / 2) + ',30');
      }
      r.addEventListener('input', update); update();
    });
  }

  /* ------------------------------------------------ room planner */
  function initPlanner(scope) {
    scope.querySelectorAll('[data-room-planner]').forEach(function (box) {
      var out = box.querySelector('[data-plan-out]');
      function v(n) { return parseFloat(box.querySelector('[data-dim="' + n + '"]').value) || 0; }
      function update() {
        var a = v('l'), b = v('w'), h = v('h'), L = Math.max(a, b), W = Math.min(a, b), rec, note = '';
        if (L >= 7 && W >= 5) rec = ['7.2.4 or larger', 'Room for two or more rows and extra subwoofers for even bass.'];
        else if (L >= 6 && W >= 4) rec = ['7.1.4', 'Long enough for rear surrounds behind the main seat; one or two rows.'];
        else if (L >= 5 && W >= 4) rec = ['5.1.4', 'Four overhead speakers with one row of seats.'];
        else if (L >= 4.5 && W >= 3.5) rec = ['5.1.2', 'A well-placed 5.1.2 suits this size best.'];
        else rec = ['5.1 or a quality soundbar', 'Atmos is possible with careful design, but placement gets tight.'];
        if (h && h < 2.4) note = 'Ceiling under 2.4 m: overhead speakers need careful selection, and a second-row riser brings heads close to the ceiling.';
        var seat = L * 0.6, s40 = Math.round(2 * seat * Math.tan(Math.PI / 9) / 0.8716 / 0.0254), s30 = Math.round(2 * seat * Math.tan(Math.PI / 12) / 0.8716 / 0.0254);
        out.innerHTML = '<span class="asim-k">Suggested starting point</span><b class="plan-rec">' + rec[0] + '</b><p>' + rec[1] + '</p>' +
          '<p class="small">With the main seat about ' + seat.toFixed(1) + ' m from the screen: a ' + s30 + '–' + s40 + '″ 16:9 screen.</p>' + (note ? '<p class="small plan-note">' + note + '</p>' : '');
      }
      box.addEventListener('input', update); update();
    });
  }

  /* ------------------------------------------------ hover-image list (services) */
  function initHoverList(scope) {
    scope.querySelectorAll('[data-hover-list]').forEach(function (list) {
      if (!fine.matches || still()) return;
      var float = list.querySelector('.hl-float'), img = float.querySelector('img'), raf = 0, x = 0, y = 0, fx = 0, fy = 0;
      function loop() { fx += (x - fx) * 0.14; fy += (y - fy) * 0.14; float.style.transform = 'translate3d(' + fx + 'px,' + fy + 'px,0)'; raf = Math.abs(x - fx) + Math.abs(y - fy) > 0.5 ? requestAnimationFrame(loop) : 0; }
      list.addEventListener('pointermove', function (e) { var r = list.getBoundingClientRect(); x = e.clientX - r.left; y = e.clientY - r.top; if (!raf) raf = requestAnimationFrame(loop); });
      list.addEventListener('pointerover', function (e) {
        var row = e.target.closest('[data-img]');
        if (!row) return;
        if (img.getAttribute('src') !== row.getAttribute('data-img')) img.src = row.getAttribute('data-img');
        float.classList.add('is-on');
      });
      list.addEventListener('pointerleave', function () { float.classList.remove('is-on'); });
    });
  }

  /* ------------------------------------------------ drag-to-scroll strip */
  function initStrip(scope) {
    scope.querySelectorAll('[data-strip]').forEach(function (strip) {
      var track = strip.querySelector('.strip-track');
      strip.querySelectorAll('[data-strip-dir]').forEach(function (b) {
        b.addEventListener('click', function () { track.scrollBy({ left: (+b.getAttribute('data-strip-dir')) * track.clientWidth * 0.8, behavior: still() ? 'auto' : 'smooth' }); });
      });
      if (!fine.matches) return;
      var down = false, sx = 0, sl = 0, moved = false;
      track.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; track.classList.add('is-drag'); });
      window.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = sl - dx; });
      window.addEventListener('pointerup', function () { down = false; track.classList.remove('is-drag'); });
      track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    });
  }

  /* ------------------------------------------------ counters */
  function initCounters(scope) {
    var els = scope.querySelectorAll('[data-count-to]');
    if (!els.length) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, to = +el.getAttribute('data-count-to'), from = +(el.getAttribute('data-count-from') || 0);
        if (still()) { el.textContent = to; return; }
        var t0 = performance.now(), dur = 1400;
        (function f(now) { var p = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - p, 4); el.textContent = Math.round(from + (to - from) * k); if (p < 1) requestAnimationFrame(f); })(t0);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------ public entry points */
  FX.boot = function () { initCursor(); initSoundToggle(); initProgress(); };
  FX.enhance = function (scope) {
    if (S && S.stopSwell) S.stopSwell();
    scope.querySelectorAll('img[data-parallax]').forEach(function (img) { if (parallaxIO) parallaxIO.observe(img); });
    scope.querySelectorAll('[data-hscroll]').forEach(function (el) {
      hscrolls.push({ el: el, track: el.querySelector('.hs-track'), bar: el.querySelector('.hs-bar i'), dist: 0, active: false });
    });
    measureH();
    magnetic(scope); initHero(scope); initPlay(scope); initSpeakers(scope); initAcoustic(scope);
    initScreen(scope); initPlanner(scope); initHoverList(scope); initStrip(scope); initCounters(scope);
    onScroll();
  };
  reduced.addEventListener && reduced.addEventListener('change', function () { measureH(); onScroll(); });
  wide.addEventListener && wide.addEventListener('change', function () { measureH(); onScroll(); });
})(window.ROS);
