/* ROS prototype — Web Audio engine. Everything is synthesised live (no audio files).
   Nothing ever plays without a user gesture; UI sounds are opt-in and remembered.
   The sounds are illustrative demonstrations, never measurements. */
(function (R) {
  'use strict';
  if (typeof window === 'undefined') return;
  var AC = window.AudioContext || window.webkitAudioContext;
  var ctx = null, master = null, analyser = null, comp = null;
  var uiOn = false, lastTick = 0, active = 0;
  var noiseCache = {}, irCache = {};

  try { uiOn = localStorage.getItem('ros-ui-sound') === 'on'; } catch (e) { /* storage blocked */ }

  function ensure() {
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -10; comp.ratio.value = 6; comp.attack.value = 0.003; comp.release.value = 0.25;
      master = ctx.createGain(); master.gain.value = 0.9;
      analyser = ctx.createAnalyser(); analyser.fftSize = 2048; analyser.smoothingTimeConstant = 0.8;
      master.connect(comp); comp.connect(analyser); analyser.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function noise(kind, seconds) {
    var key = kind + seconds;
    if (noiseCache[key]) return noiseCache[key];
    var len = Math.floor(ctx.sampleRate * seconds), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (var i = 0; i < len; i++) {
      var w = Math.random() * 2 - 1;
      if (kind === 'pink') { // Paul Kellet's refined pink filter
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.96900 * b2 + w * 0.1538520;
        b3 = 0.86650 * b3 + w * 0.3104856; b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      } else d[i] = w;
    }
    return (noiseCache[key] = buf);
  }

  function env(g, t, a, peak, hold, rel) {
    g.gain.cancelScheduledValues(t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.setValueAtTime(peak, t + a + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + hold + rel);
  }
  function track(node, end) {
    active++;
    node.onended = function () { active = Math.max(0, active - 1); };
    return end;
  }

  /* Short UI tick — pentatonic pitches so hovering feels musical, not noisy. */
  var PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
  function tick(i) {
    if (!uiOn || !ensure()) return;
    var now = ctx.currentTime;
    if (now - lastTick < 0.04) return;
    lastTick = now;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = PENTA[Math.abs(i | 0) % PENTA.length];
    o.connect(g); g.connect(master);
    env(g, now, 0.004, 0.035, 0, 0.09);
    o.start(now); o.stop(now + 0.12);
  }
  function thump() {
    if (!uiOn || !ensure()) return;
    var now = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(140, now); o.frequency.exponentialRampToValueAtTime(48, now + 0.14);
    o.connect(g); g.connect(master);
    env(g, now, 0.003, 0.18, 0, 0.16);
    o.start(now); o.stop(now + 0.2);
  }

  /* "Play the room": an original ~8 s cinematic swell and impact, in stereo. */
  var swellStop = null;
  function swell(onEnd) {
    if (!ensure()) return null;
    stopSwell();
    var t = ctx.currentTime + 0.05, nodes = [];
    var bus = ctx.createGain(); bus.gain.value = 1; bus.connect(master);
    // sub rumble
    var sub = ctx.createOscillator(), sg = ctx.createGain();
    sub.frequency.setValueAtTime(30, t); sub.frequency.linearRampToValueAtTime(44, t + 5.4);
    sg.gain.setValueAtTime(0.0001, t); sg.gain.exponentialRampToValueAtTime(0.35, t + 5.2); sg.gain.exponentialRampToValueAtTime(0.0001, t + 5.8);
    sub.connect(sg); sg.connect(bus); nodes.push(sub);
    // detuned pad through a rising filter (D minor add 9 voicing)
    var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 6;
    lp.frequency.setValueAtTime(160, t); lp.frequency.exponentialRampToValueAtTime(3800, t + 5.5); lp.frequency.exponentialRampToValueAtTime(600, t + 8.5);
    var pg = ctx.createGain(); pg.gain.setValueAtTime(0.0001, t); pg.gain.exponentialRampToValueAtTime(0.11, t + 5.4); pg.gain.exponentialRampToValueAtTime(0.16, t + 5.7); pg.gain.exponentialRampToValueAtTime(0.0001, t + 8.6);
    lp.connect(pg); pg.connect(bus);
    [73.42, 110, 146.83, 174.61, 220, 329.63].forEach(function (f, i) {
      [-7, 7].forEach(function (cents, j) {
        var o = ctx.createOscillator(), p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = cents + i;
        if (p) { p.pan.value = (j ? 0.7 : -0.7) * (0.4 + i * 0.1); o.connect(p); p.connect(lp); } else o.connect(lp);
        nodes.push(o);
      });
    });
    // airy shimmer
    var ns = ctx.createBufferSource(); ns.buffer = noise('white', 9);
    var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.setValueAtTime(3000, t); bp.frequency.exponentialRampToValueAtTime(9000, t + 5.5); bp.Q.value = 3;
    var ng = ctx.createGain(); ng.gain.setValueAtTime(0.0001, t); ng.gain.exponentialRampToValueAtTime(0.05, t + 5.4); ng.gain.exponentialRampToValueAtTime(0.0001, t + 6);
    ns.connect(bp); bp.connect(ng); ng.connect(bus); nodes.push(ns);
    // impact at 5.6 s
    var hit = t + 5.6;
    var k = ctx.createOscillator(), kg = ctx.createGain();
    k.frequency.setValueAtTime(110, hit); k.frequency.exponentialRampToValueAtTime(28, hit + 1.4);
    kg.gain.setValueAtTime(0.0001, t); kg.gain.setValueAtTime(0.0001, hit); kg.gain.exponentialRampToValueAtTime(0.95, hit + 0.01); kg.gain.exponentialRampToValueAtTime(0.0001, hit + 2.6);
    k.connect(kg); kg.connect(bus); nodes.push(k);
    var boom = ctx.createBufferSource(); boom.buffer = noise('pink', 3);
    var blp = ctx.createBiquadFilter(); blp.type = 'lowpass'; blp.frequency.value = 900;
    var bg = ctx.createGain(); bg.gain.setValueAtTime(0.0001, t); bg.gain.setValueAtTime(0.0001, hit); bg.gain.exponentialRampToValueAtTime(0.5, hit + 0.02); bg.gain.exponentialRampToValueAtTime(0.0001, hit + 2.2);
    boom.connect(blp); blp.connect(bg); bg.connect(bus); nodes.push(boom);
    nodes.forEach(function (n) { n.start(t); n.stop(t + 9); });
    active++;
    var done = false;
    var timer = setTimeout(finish, 9100);
    function finish() { if (done) return; done = true; active = Math.max(0, active - 1); clearTimeout(timer); if (onEnd) onEnd(); }
    swellStop = function () {
      var now = ctx.currentTime;
      bus.gain.cancelScheduledValues(now); bus.gain.setValueAtTime(bus.gain.value, now); bus.gain.linearRampToValueAtTime(0, now + 0.25);
      nodes.forEach(function (n) { try { n.stop(now + 0.3); } catch (e) { /* already stopped */ } });
      finish();
    };
    return swellStop;
  }
  function stopSwell() { if (swellStop) { var s = swellStop; swellStop = null; s(); } }

  /* Calibration-style pink-noise burst placed by angle; overhead speakers get a brighter, airier band.
     Stereo panning is an approximation of position, not true surround. */
  function burst(pan, overhead) {
    if (!ensure()) return;
    var t = ctx.currentTime, s = ctx.createBufferSource(); s.buffer = noise('pink', 1);
    var f = ctx.createBiquadFilter(); f.type = overhead ? 'highpass' : 'bandpass';
    f.frequency.value = overhead ? 2200 : 700; f.Q.value = overhead ? 0.7 : 0.6;
    var g = ctx.createGain(); env(g, t, 0.01, overhead ? 0.55 : 0.7, 0.32, 0.18);
    var p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    s.connect(f); f.connect(g);
    if (p) { p.pan.value = Math.max(-1, Math.min(1, pan)); g.connect(p); p.connect(master); } else g.connect(master);
    s.start(t); s.stop(t + 0.6);
    track(s);
  }
  function sub() {
    if (!ensure()) return;
    var t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 45; o.connect(g); g.connect(master);
    env(g, t, 0.04, 0.6, 0.35, 0.3); o.start(t); o.stop(t + 0.8); track(o);
  }

  /* Synthetic clap through a generated room impulse (exponential decay set by RT60). */
  function impulse(rt) {
    var key = rt.toFixed(2);
    if (irCache[key]) return irCache[key];
    var len = Math.floor(ctx.sampleRate * Math.min(3, rt * 1.3 + 0.05)), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var c = 0; c < 2; c++) {
      var d = buf.getChannelData(c);
      for (var i = 0; i < len; i++) { var tt = i / ctx.sampleRate; d[i] = (Math.random() * 2 - 1) * Math.exp(-6.91 * tt / rt) * (tt < 0.004 ? tt / 0.004 : 1); }
    }
    return (irCache[key] = buf);
  }
  function clap(rt) {
    if (!ensure()) return;
    var t = ctx.currentTime, conv = ctx.createConvolver(); conv.buffer = impulse(rt);
    var dry = ctx.createGain(); dry.gain.value = 0.5;
    var wet = ctx.createGain(); wet.gain.value = 0.32 + Math.min(0.5, rt * 0.3);
    var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1300; bp.Q.value = 0.8;
    bp.connect(dry); bp.connect(conv); conv.connect(wet); dry.connect(master); wet.connect(master);
    [0, 0.011, 0.024].forEach(function (off, i) {
      var s = ctx.createBufferSource(); s.buffer = noise('white', 0.2);
      var g = ctx.createGain(); env(g, t + off, 0.001, i === 2 ? 0.9 : 0.5, 0, 0.05);
      s.connect(g); g.connect(bp); s.start(t + off); s.stop(t + off + 0.1);
    });
    var o = ctx.createOscillator(); o.connect(ctx.createGain()); o.start(t); o.stop(t + rt * 1.3); track(o);
  }

  function setUi(on) {
    uiOn = !!on;
    try { localStorage.setItem('ros-ui-sound', uiOn ? 'on' : 'off'); } catch (e) { /* ignore */ }
    if (uiOn) ensure();
  }

  R.sound = {
    supported: !!AC, ensure: ensure, tick: tick, thump: thump, swell: swell, stopSwell: stopSwell,
    burst: burst, sub: sub, clap: clap, setUi: setUi,
    uiOn: function () { return uiOn; },
    analyser: function () { return analyser; },
    busy: function () { return active > 0; }
  };
})(typeof window !== 'undefined' ? (window.ROS = window.ROS || {}) : {});
