/* ROS prototype — browser runtime.
   Router: real paths when served over HTTP (matches production URLs); hash routes
   only for the single-file/file:// build. Pages are pre-rendered, so content works
   without JS; this script adds transitions, interactions and validation. */
(function (R) {
  'use strict';
  var C = R.CONFIG;
  var doc = document, root = doc.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var MODE = window.ROS_MODE || (location.protocol === 'file:' ? 'hash' : 'path');
  var main = doc.getElementById('main');
  var drafts = {};      // form drafts survive route changes (in memory only)
  var io, waveIO;

  R.href = MODE === 'hash' ? function (p) { return '#' + p; } : function (p) { return p; };
  window.dataLayer = window.dataLayer || [];
  function track(evt, data) {
    var o = { event: evt, page: currentRoute && currentRoute.path };
    for (var k in data) o[k] = data[k];
    window.dataLayer.push(o);
    if (/[?&]debug/.test(location.search)) console.info('[ROS track]', o);
  }

  /* ---------------------------------------------------------------- routing */
  function normalise(p) {
    if (!p) return '/';
    p = p.replace(/index\.html$/, '');
    if (p.charAt(0) !== '/') p = '/' + p;
    if (p.slice(-1) !== '/') p += '/';
    return p;
  }
  function parseLocation() {
    if (MODE === 'hash') {
      var h = location.hash.replace(/^#/, '');
      if (!h || h.charAt(0) !== '/') return { path: '/', anchor: h || '' };
      var i = h.indexOf('#');
      return { path: normalise(i > -1 ? h.slice(0, i) : h), anchor: i > -1 ? h.slice(i + 1) : '' };
    }
    return { path: normalise(location.pathname), anchor: location.hash.replace(/^#/, '') };
  }
  function routeFor(path) { return R.routeByPath[path] || R.routeById.notfound; }
  function urlFor(path, anchor) {
    return (MODE === 'hash' ? location.pathname + location.search + '#' + path : path) + (anchor ? '#' + anchor : '');
  }

  var currentRoute = null;

  function setMeta(route, faqs) {
    var abs = C.origin + route.path;
    doc.title = route.title;
    function set(sel, attr, val) { var el = doc.head.querySelector(sel); if (el) el.setAttribute(attr, val); }
    set('meta[name="description"]', 'content', route.description);
    set('link[rel="canonical"]', 'href', abs);
    set('meta[property="og:title"]', 'content', route.title);
    set('meta[property="og:description"]', 'content', route.description);
    set('meta[property="og:url"]', 'content', abs);
    set('meta[name="twitter:title"]', 'content', route.title);
    set('meta[name="twitter:description"]', 'content', route.description);
    var ld = doc.getElementById('ld');
    var data = R.schemaFor(route, faqs);
    if (ld) ld.textContent = data ? JSON.stringify(data) : '{}';
  }

  function setActiveNav(route) {
    var activeId = route.id === 'guide-cost' || route.id === 'guide-atmos' ? 'guides' : route.id;
    doc.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === activeId) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var trig = doc.querySelector('.nav-trigger');
    if (trig) trig.classList.toggle('is-active', route.group === 'services');
  }

  function render(route, opts) {
    opts = opts || {};
    var page = R.pages[route.id](route);
    function swap() {
      main.innerHTML = page.html;
      setMeta(route, page.faqs);
      setActiveNav(route);
      currentRoute = route;
      enhance(main);
      if (opts.scroll != null) window.scrollTo(0, opts.scroll);
      else if (opts.anchor) scrollToAnchor(opts.anchor, false);
      else window.scrollTo(0, 0);
      if (opts.focus !== false) {
        var h1 = main.querySelector('h1');
        if (h1 && !opts.anchor) h1.focus({ preventScroll: true });
      }
      announce(route.nav === 'Home' ? 'Home page' : route.nav);
    }
    closeAllMenus();
    if (doc.startViewTransition && !reduced.matches) {
      doc.startViewTransition(swap);
    } else {
      swap();
      if (!reduced.matches) {
        main.classList.add('is-entering');
        requestAnimationFrame(function () { requestAnimationFrame(function () { main.classList.remove('is-entering'); }); });
      }
    }
    track('page_view', { title: route.title });
  }

  function navigate(path, anchor, push) {
    var route = routeFor(path);
    if (push !== false) {
      history.replaceState(Object.assign({}, history.state, { scroll: window.scrollY }), '');
      history.pushState({ path: route.path, scroll: null }, '', urlFor(path, anchor));
    }
    render(route, { anchor: anchor });
  }

  function scrollToAnchor(id, smooth) {
    var el = doc.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior: smooth && !reduced.matches ? 'smooth' : 'auto', block: 'start' });
    if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    return true;
  }

  doc.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (/^(tel:|mailto:|https?:)/.test(href)) return;
    // In-page anchor (#case-1) — never treated as a route.
    if (/^#[^/]/.test(href)) {
      e.preventDefault();
      var id = href.slice(1);
      if (scrollToAnchor(id, true)) history.replaceState(history.state, '', urlFor(currentRoute.path, id));
      closeAllMenus();
      return;
    }
    var target;
    if (MODE === 'hash' && href.indexOf('#/') === 0) target = href.slice(1);
    else if (MODE === 'path' && href.charAt(0) === '/') target = href;
    if (!target) return;
    var i = target.indexOf('#');
    var path = normalise(i > -1 ? target.slice(0, i) : target), anchor = i > -1 ? target.slice(i + 1) : '';
    e.preventDefault();
    closeAllMenus();
    if (currentRoute && path === currentRoute.path && anchor) {
      history.pushState(history.state, '', urlFor(path, anchor));
      scrollToAnchor(anchor, true);
      return;
    }
    if (currentRoute && path === currentRoute.path && !anchor) { window.scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' }); return; }
    navigate(path, anchor, true);
  });

  window.addEventListener('popstate', function (e) {
    var loc = parseLocation();
    var route = routeFor(loc.path);
    if (currentRoute && route === currentRoute) { if (loc.anchor) scrollToAnchor(loc.anchor, false); return; }
    render(route, { scroll: e.state && typeof e.state.scroll === 'number' ? e.state.scroll : null, anchor: loc.anchor, focus: true });
  });

  var announcer;
  function announce(msg) {
    if (!announcer) announcer = doc.getElementById('route-announcer');
    if (announcer) { announcer.textContent = ''; setTimeout(function () { announcer.textContent = msg; }, 60); }
  }

  /* ---------------------------------------------------------------- header */
  var header = doc.querySelector('.site-header');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { header.classList.toggle('is-solid', window.scrollY > 24); ticking = false; });
    // Keep the current history entry's scroll position fresh so Back/Forward can restore it.
    clearTimeout(saveT);
    saveT = setTimeout(function () { history.replaceState(Object.assign({}, history.state, { scroll: window.scrollY }), ''); }, 200);
  }
  var saveT;
  window.addEventListener('scroll', onScroll, { passive: true });

  // Services disclosure menu
  var trigger = doc.querySelector('.nav-trigger'), submenu = doc.getElementById('svc-menu');
  function setSub(open) {
    if (!trigger) return;
    trigger.setAttribute('aria-expanded', String(open));
    submenu.classList.toggle('is-open', open);
  }
  if (trigger) {
    trigger.addEventListener('click', function () { setSub(trigger.getAttribute('aria-expanded') !== 'true'); });
    var li = trigger.parentElement, hoverT;
    if (window.matchMedia('(hover: hover)').matches) {
      li.addEventListener('mouseenter', function () { clearTimeout(hoverT); setSub(true); });
      li.addEventListener('mouseleave', function () { hoverT = setTimeout(function () { setSub(false); }, 160); });
    }
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) setSub(false); });
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setSub(false); trigger.focus(); }
      if (e.key === 'ArrowDown' && e.target === trigger) { e.preventDefault(); setSub(true); var f = submenu.querySelector('a'); f && f.focus(); }
    });
    doc.addEventListener('click', function (e) { if (!li.contains(e.target)) setSub(false); });
  }

  // Mobile drawer with focus trap
  var menuBtn = doc.querySelector('.menu-btn'), drawer = doc.getElementById('drawer'), drawerT;
  function setDrawer(open) {
    if (!menuBtn) return;
    clearTimeout(drawerT);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    doc.body.classList.toggle('menu-open', open);
    header.classList.toggle('is-solid', open || window.scrollY > 24);
    if (open) {
      drawer.hidden = false;
      void drawer.offsetHeight; // commit display before transition
      drawer.classList.add('is-open');
      var first = drawer.querySelector('a'); first && first.focus();
    } else {
      drawer.classList.remove('is-open');
      drawerT = setTimeout(function () { drawer.hidden = true; }, reduced.matches ? 0 : 300);
    }
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') !== 'true';
      setDrawer(open);
      if (!open) menuBtn.focus();
    });
    doc.addEventListener('keydown', function (e) {
      if (menuBtn.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') { setDrawer(false); menuBtn.focus(); }
      if (e.key === 'Tab') {
        var f = [menuBtn].concat([].slice.call(drawer.querySelectorAll('a,button')));
        var i = f.indexOf(doc.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', function (m) { if (m.matches) setDrawer(false); });
  }
  function closeAllMenus() {
    setSub(false);
    if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') setDrawer(false);
  }

  /* ---------------------------------------------------------- enhancements */
  function enhance(scope) {
    // Hero choreography is CSS-only (styles.css) and replays when the hero is re-rendered.
    // Scroll reveals (once)
    var els = scope.querySelectorAll('[data-reveal]');
    if (!io || reduced.matches) els.forEach(function (el) { el.classList.add('is-in'); });
    else els.forEach(function (el) { io.observe(el); });
    // Decorative waveform runs only while visible
    scope.querySelectorAll('[data-wave]').forEach(function (w) { if (waveIO && !reduced.matches) waveIO.observe(w); });
    // FAQ accordions
    scope.querySelectorAll('.faq-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(open));
        doc.getElementById(b.getAttribute('aria-controls')).classList.toggle('is-open', open);
        if (open) track('faq_open', { question: b.textContent.trim() });
      });
    });
    // Filters
    scope.querySelectorAll('[data-filter-group]').forEach(initFilter);
    // Forms
    scope.querySelectorAll('form.enquiry').forEach(initForm);
    // Simulated slot picker
    scope.querySelectorAll('[data-slot-picker]').forEach(initSlots);
    // Data tables become labelled cards on phones: copy each column header onto its cells.
    scope.querySelectorAll('table.tbl').forEach(function (t) {
      var heads = [].map.call(t.querySelectorAll('thead th'), function (th) { return th.textContent.trim(); });
      t.querySelectorAll('tbody tr').forEach(function (tr) { [].forEach.call(tr.children, function (c, i) { if (heads[i]) c.setAttribute('data-label', heads[i]); }); });
    });
    // Contents highlight for guides
    initToc(scope);
    // Sound, motion and interactive tools (fx.js)
    if (R.fx) R.fx.enhance(scope);
  }

  function initFilter(group) {
    var name = group.getAttribute('data-filter-group');
    var target = doc.querySelector('[data-filter-target="' + name + '"]');
    var status = doc.querySelector('[data-filter-status="' + name + '"]');
    var empty = doc.querySelector('[data-filter-empty="' + name + '"]');
    var noun = name === 'projects' ? 'project' : 'category';
    group.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      var f = b.getAttribute('data-filter');
      group.querySelectorAll('[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var shown = 0;
      [].forEach.call(target.children, function (item) {
        var on = f === 'all' || item.getAttribute('data-cat') === f;
        item.hidden = !on;
        if (on) {
          shown++;
          item.classList.add('is-in');
          if (!reduced.matches && item.animate) item.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)', delay: Math.min(shown, 6) * 40, fill: 'backwards' });
        }
      });
      if (empty) empty.hidden = shown > 0;
      var plural = noun === 'category' ? 'categories' : 'projects';
      if (status) status.textContent = 'Showing ' + shown + ' ' + (shown === 1 ? noun : plural) + (f === 'all' ? '' : ' in ' + b.textContent.trim());
      track('filter_change', { group: name, filter: f, results: shown });
    });
  }

  /* --------------------------------------------------------------- forms */
  var MSG = {
    name: 'Enter your name.',
    phone: 'Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9.',
    room: 'Choose a room type.',
    budget: 'Choose a budget band.',
    location: 'Tell us where the project is.',
    contact: 'Choose how you would like us to contact you.',
    consent: 'Tick the box so we are allowed to contact you.',
    org: 'Enter your organisation.',
    type: 'Choose a project type.',
    email: 'Enter a valid email address, or leave it blank.'
  };
  function cleanPhone(v) {
    var d = String(v || '').replace(/[\s\-().]/g, '');
    if (/^\+91/.test(d)) d = d.slice(3); else if (/^91\d{10}$/.test(d)) d = d.slice(2); else if (/^0\d{10}$/.test(d)) d = d.slice(1);
    return d;
  }
  function validate(form) {
    var errors = [];
    var els = form.elements;
    function req(name, ok) {
      var el = els[name];
      if (!el) return;
      var first = el.length && !el.tagName ? el[0] : el;
      var errEl = doc.getElementById(form.id + '-' + name + '-e');
      if (!ok) {
        errors.push({ name: name, el: first, msg: MSG[name] });
        if (errEl) errEl.textContent = MSG[name];
        if (first.tagName) (el.length && !el.tagName ? [].slice.call(el) : [el]).forEach(function (x) { x.setAttribute('aria-invalid', 'true'); });
      } else {
        if (errEl) errEl.textContent = '';
        (el.length && !el.tagName ? [].slice.call(el) : [el]).forEach(function (x) { x.removeAttribute('aria-invalid'); });
      }
    }
    var v = function (n) { return els[n] ? String(els[n].value || '').trim() : ''; };
    req('name', v('name').length >= 2);
    req('phone', /^[6-9]\d{9}$/.test(cleanPhone(v('phone'))));
    if (els.org) req('org', v('org').length >= 2);
    if (els.email) req('email', !v('email') || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email')));
    if (els.type) req('type', !!v('type'));
    if (els.room) req('room', !!v('room'));
    if (els.budget && els.budget.tagName === 'SELECT') req('budget', !!v('budget'));
    req('location', v('location').length >= 2);
    if (els.contact && els.contact.length) req('contact', !![].slice.call(els.contact).some(function (r) { return r.checked; }));
    req('consent', els.consent && els.consent.checked);
    return errors;
  }
  function initForm(form) {
    var id = form.id, summary = doc.getElementById(id + '-summary'), result = doc.getElementById(id + '-result');
    var tried = false;
    // restore draft
    if (drafts[id]) {
      Object.keys(drafts[id]).forEach(function (k) {
        var el = form.elements[k];
        if (!el) return;
        if (el.length && !el.tagName) [].forEach.call(el, function (r) { r.checked = r.value === drafts[id][k]; });
        else if (el.type === 'checkbox') el.checked = drafts[id][k] === 'on';
        else el.value = drafts[id][k];
      });
    }
    form.addEventListener('input', function () {
      var d = {};
      new FormData(form).forEach(function (val, key) { if (key !== 'website') d[key] = val; });
      drafts[id] = d;
      if (tried) validate(form);
    });
    form.addEventListener('focusin', function once() { track('form_start', { form: id }); form.removeEventListener('focusin', once); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      tried = true;
      var errs = validate(form);
      if (errs.length) {
        summary.hidden = false;
        summary.innerHTML = '<strong>There ' + (errs.length === 1 ? 'is 1 problem' : 'are ' + errs.length + ' problems') + ' with this form</strong><ul>' +
          errs.map(function (er) { return '<li><a href="#' + er.el.id + '" data-err-link>' + er.msg + '</a></li>'; }).join('') + '</ul>';
        summary.querySelectorAll('[data-err-link]').forEach(function (a) {
          a.addEventListener('click', function (ev) { ev.preventDefault(); ev.stopPropagation(); var t = doc.getElementById(a.getAttribute('href').slice(1)); t && t.focus(); });
        });
        summary.focus();
        track('form_error', { form: id, fields: errs.map(function (x) { return x.name; }).join(',') });
        return;
      }
      summary.hidden = true;
      if (form.elements.website && form.elements.website.value) return; // honeypot
      var fd = new FormData(form);
      var lines = ['Name: ' + fd.get('name'), 'Mobile: +91 ' + cleanPhone(fd.get('phone'))];
      ['org', 'type', 'room', 'budget', 'location', 'timeline', 'contact', 'message'].forEach(function (k) { if (fd.get(k)) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + fd.get(k)); });
      var wa = C.waLink('Hi ROS, enquiry from the website.\n' + lines.join('\n'));
      result.hidden = false;
      result.innerHTML = '<h3>Details checked — not sent</h3>' +
        '<p class="small" style="margin:0">Everything is filled in correctly. <strong>This prototype is not connected to a server, so your enquiry has not been delivered to Republic of Sound.</strong> On the live site, a confirmation from ROS would appear here.</p>' +
        '<p class="small" style="margin:.75rem 0 0">To reach ROS now, use one of these:</p>' +
        '<div class="btn-row"><a class="btn btn--dark btn--sm" href="' + wa + '" target="_blank" rel="noopener" data-cta="whatsapp-form-result-' + id + '">Message on WhatsApp<span class="sr-only"> (opens in a new tab)</span></a>' +
        '<a class="btn btn--ghost btn--sm" href="' + C.tel + '" data-cta="phone-form-result-' + id + '">Call ' + C.phoneMain.display + '</a>' +
        '<button class="btn btn--ghost btn--sm" type="button" data-edit>Edit details</button></div>';
      form.hidden = true;
      result.focus();
      result.querySelector('[data-edit]').addEventListener('click', function () { result.hidden = true; form.hidden = false; form.querySelector('input,select,textarea').focus(); });
      track('form_validated_prototype', { form: id, kind: form.getAttribute('data-form') });
    });
  }

  function initSlots(box) {
    var day = null, slot = null, res = box.querySelector('[data-slot-result]');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.day, .slot');
      if (!b) return;
      var cls = b.classList.contains('day') ? '.day' : '.slot';
      box.querySelectorAll(cls).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      if (cls === '.day') day = b.getAttribute('data-day'); else slot = b.getAttribute('data-slot');
      if (day && slot) {
        res.hidden = false;
        res.innerHTML = '<p class="proto-flag">Simulation</p><p style="margin:.75rem 0 0"><strong>Example selected: ' + day + ' at ' + slot + '.</strong> Nothing has been booked and ROS has not been notified. Choose a real time on Calendly:</p>' +
          '<div class="btn-row"><a class="btn btn--primary btn--sm" href="' + C.bookingUrl + '" target="_blank" rel="noopener" data-cta="calendly-slot-preview">Continue on Calendly<span class="sr-only"> (opens in a new tab)</span></a></div>';
        track('slot_preview_select', { day: day, slot: slot });
      }
    });
  }

  function initToc(scope) {
    var links = scope.querySelectorAll('.toc a');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var tocIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { links.forEach(function (a) { a.classList.remove('is-current'); }); var a = map[en.target.id]; a && a.classList.add('is-current'); }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var h = doc.getElementById(id); h && tocIO.observe(h); });
  }

  /* --------------------------------------------------------------- tracking */
  doc.addEventListener('click', function (e) {
    var el = e.target.closest('[data-cta]');
    if (el) track('cta_click', { cta: el.getAttribute('data-cta'), href: el.getAttribute('href') || '' });
  }, true);

  /* ------------------------------------------------------------------ boot */
  function boot() {
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      waveIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { en.target.classList.toggle('is-live', en.isIntersecting && !reduced.matches); });
      });
    }
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (R.fx) R.fx.boot();
    window.addEventListener('load', function () { window.dispatchEvent(new Event('resize')); });
    var loc = parseLocation();
    var route = routeFor(loc.path);
    var ssr = main.getAttribute('data-route');
    if (MODE === 'hash') {
      // Rewrite pre-rendered path links for file:// use (single-file build already does this).
      doc.querySelectorAll('a[href^="/"]').forEach(function (a) { a.setAttribute('href', '#' + a.getAttribute('href')); });
    }
    history.replaceState({ path: route.path, scroll: null }, '');
    if (ssr === route.id) {
      currentRoute = route;
      setActiveNav(route);
      enhance(main);
      if (loc.anchor) setTimeout(function () { scrollToAnchor(loc.anchor, false); }, 0);
    } else {
      render(route, { anchor: loc.anchor, focus: false });
    }
    onScroll();
    root.classList.add('js-ready');
    window.__rosBooted = true;
  }
  boot();
  R.app = { navigate: navigate, mode: MODE, cleanPhone: cleanPhone };
})(window.ROS);
