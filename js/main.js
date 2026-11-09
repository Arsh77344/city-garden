(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  /* Live, not read-once: if someone flips the OS "reduce motion" setting, the page
     picks it up straight away instead of needing a reload. */
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let reduce = motionQuery.matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const body = document.body;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ===================== Text splitting ===================== */
  // Words (headings + quotes)
  function splitWords(node, counter) {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
          const i = document.createElement('span'); i.textContent = part; i.style.setProperty('--i', counter.n++);
          w.appendChild(i); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.classList.contains('sr-only')) splitWords(n, counter);
    });
  }
  // aria-label is prohibited on some roles (e.g. a plain <p>'s implicit "paragraph"
  // role), so the readable copy for assistive tech is a visually-hidden text node
  // instead, with the animated, chopped-up spans hidden from the accessibility tree.
  function addAccessibleText(el) {
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = el.textContent.trim().replace(/\s+/g, ' ');
    el.insertBefore(sr, el.firstChild);
  }
  $$('[data-split], .quote p').forEach(el => {
    addAccessibleText(el);
    splitWords(el, { n: 0 });
  });

  // Characters (hero title)
  const heroTitle = $('[data-chars]');
  if (heroTitle) {
    addAccessibleText(heroTitle);
    let c = 0;
    const splitChars = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const word = document.createElement('span'); word.className = 'word'; word.setAttribute('aria-hidden', 'true');
            [...part].forEach(ch => {
              const o = document.createElement('span'); o.className = 'ch';
              const i = document.createElement('span'); i.textContent = ch; i.style.setProperty('--c', c++);
              o.appendChild(i); word.appendChild(o);
            });
            frag.appendChild(word);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('sr-only')) splitChars(n);
      });
    };
    splitChars(heroTitle);
  }

  /* ===================== Images ===================== */
  $$('img').forEach(img => {
    const ok = () => img.classList.add('loaded');
    if (img.complete && img.naturalWidth) ok(); else { img.addEventListener('load', ok); img.addEventListener('error', ok); }
  });

  // The decorative ring artwork (hero, services, footer) is held back until the page
  // has loaded, so its bytes never compete with the hero photograph that Largest
  // Contentful Paint is measured on. See .mandala i::before in style.css.
  const lightDeco = () => body.classList.add('deco');
  if (document.readyState === 'complete') lightDeco();
  else { addEventListener('load', lightDeco, { once: true }); setTimeout(lightDeco, 1500); }

  /* ===================== Loader ===================== */
  const loader = $('#loader');
  let seen = null; try { seen = sessionStorage.getItem('cg-seen'); } catch (e) {}
  function ready() {
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    setTimeout(() => loader.classList.add('done'), 1000);
  }
  function openGates() { loader.classList.add('open'); setTimeout(ready, 500); try { sessionStorage.setItem('cg-seen', '1'); } catch (e) {} }
  if (window.__cgIntro) {
    // Phones: the inline script in <head> owns the intro, because it runs with the
    // HTML instead of waiting for this file to download. Nothing to do here.
  } else if (body.classList.contains('is-ready')) {
    // The inline backstop in <head> already revealed the page before this script
    // finished loading (a slow connection) -- nothing left to animate.
    loader.classList.add('done');
  } else if (reduce || seen) { loader.classList.add('done'); ready(); }
  else {
    requestAnimationFrame(() => requestAnimationFrame(() => $('.loader-mandala').classList.add('in')));
    // Open the gates once the mandala's draw-in has mostly played. This used to wait
    // for the window 'load' event -- every image and the hero video fully downloaded --
    // which on a slow connection held the splash screen, and with it Largest Contentful
    // Paint, for six seconds. It's now a fixed delay, kept just under the inline
    // backstop in <head> so this nicer path still wins whenever main.js arrives in time.
    setTimeout(openGates, 850);
  }

  /* ===================== Theme flow (page colour morphs between sections) ===================== */
  const themed = $$('[data-theme]').filter(el => el !== body);
  const themeIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) body.dataset.theme = e.target.dataset.theme;
  }), { rootMargin: '-50% 0px -50% 0px' });
  themed.forEach(s => themeIO.observe(s));

  /* ===================== Reveals ===================== */
  const revealEls = $$('.img-reveal, .fade, [data-split], .reel, .draw, .facts, .art');
  revealEls.forEach(el => { if (el.dataset.delay) { el.style.transitionDelay = el.dataset.delay + 'ms'; const px = $('.px', el); if (px) px.style.transitionDelay = el.dataset.delay + 'ms'; } });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.classList.contains('facts')) runCounters(e.target);
  }), { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ===================== Counters ===================== */
  function runCounters(scope) {
    $$('[data-count]', scope).forEach(el => {
      const to = +el.dataset.count, from = +(el.dataset.from || 0), year = !!el.dataset.from;
      if (reduce) return;
      const t0 = performance.now(), dur = 1800;
      const step = now => {
        const p = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 4);
        const v = Math.round(from + (to - from) * e);
        el.textContent = year ? v : v.toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ===================== Nav ===================== */
  const nav = $('#nav'), progress = $('#progress'), dock = $('#dock'), burger = $('#burger');
  const closeMenu = () => { body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => burger.setAttribute('aria-expanded', String(body.classList.toggle('menu-open'))));
  $$('#navLinks a').forEach(a => a.addEventListener('click', closeMenu));
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  const links = $$('#navLinks a');
  const targets = links.map(a => $(a.getAttribute('href')));

  /* ===================== Pinned horizontal venue journey ===================== */
  const spaces = $('#venue'), pin = $('#pin'), track = $('#track'), pinBar = $('#pinBar');
  const hxs = $$('.hx', track);
  let pinned = false, travel = 0;
  function setupPin() {
    // Phones get the pinned treatment too now: scrolling down walks the venue sideways,
    // then releases and carries on down the page. Previously they had a swipe strip,
    // which works but gives no hint that there is anything to the right of the screen.
    // Below ~380px there isn't room for a panel to read properly, so those keep swiping.
    const want = innerWidth >= 380 && !reduce;
    if (want !== pinned) { spaces.classList.toggle('is-pinned', want); pinned = want; }
    if (pinned) {
      track.style.transform = '';
      travel = Math.max(0, track.scrollWidth - innerWidth);
      pin.style.height = (travel + innerHeight) + 'px';
    } else {
      pin.style.height = ''; track.style.transform = ''; hxs.forEach(h => h.style.transform = '');
    }
  }

  /* ===================== Scroll loop ===================== */
  const parallax = $$('[data-parallax]');
  const ribbon = $('#ribbon');
  const heroMandala = $('.hero-mandala');
  let lastY = scrollY, velocity = 0, ribbonX = 0, ticking = false;

  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    nav.classList.toggle('solid', y > 60);
    nav.classList.toggle('hide', y > lastY + 2 && y > 600 && !body.classList.contains('menu-open'));
    if (y < lastY - 2) nav.classList.remove('hide');
    dock.classList.toggle('show', y > innerHeight * 0.6);
    velocity += (y - lastY);
    lastY = y;

    let cur = -1;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top < innerHeight * 0.45) cur = i; });
    links.forEach((a, i) => a.classList.toggle('active', i === cur));

    if (!reduce && heroMandala && y < innerHeight * 1.5) heroMandala.style.setProperty('--scroll-rot', (y * 0.06).toFixed(2) + 'deg');

    if (!reduce) parallax.forEach(el => {
      const speed = parseFloat(el.dataset.parallax);
      if (el.classList.contains('hero-media')) { if (y < innerHeight * 1.2) el.style.transform = `translate3d(0,${(y * speed).toFixed(1)}px,0)`; return; }
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      el.style.transform = `translate3d(0,${((r.top + r.height / 2 - innerHeight / 2) * speed).toFixed(1)}px,0)`;
    });

    if (pinned) {
      const r = pin.getBoundingClientRect();
      const p = clamp(-r.top / (pin.offsetHeight - innerHeight || 1), 0, 1);
      track.style.transform = `translate3d(${(-p * travel).toFixed(1)}px,0,0)`;
      pinBar.style.transform = `scaleX(${p})`;
      hxs.forEach(hx => {
        const pr = hx.parentElement.getBoundingClientRect();
        const off = (pr.left + pr.width / 2 - innerWidth / 2) / innerWidth;
        hx.style.transform = `translate3d(${(off * -60).toFixed(1)}px,0,0) scale(1.12)`;
      });
    }
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { setupPin(); onScroll(); });
  setupPin(); onScroll();
  addEventListener('load', () => { setupPin(); onScroll(); });

  // Ribbon: constant drift, speeds up with scroll velocity
  if (ribbon) {
    let prev = performance.now();
    const loop = now => {
      const dt = Math.min(64, now - prev); prev = now;
      if (!reduce) {
        velocity *= 0.9;
        ribbonX -= (0.04 + Math.min(Math.abs(velocity), 120) * 0.012) * dt;
        const half = ribbon.scrollWidth / 2;
        if (-ribbonX >= half) ribbonX += half;
        ribbon.style.transform = `translate3d(${ribbonX.toFixed(1)}px,0,0)`;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  if (motionQuery.addEventListener) motionQuery.addEventListener('change', e => {
    reduce = e.matches;
    setupPin();
    onScroll();
  });

  /* ===================== Services: sticky image swap ===================== */
  const svcItems = $$('.svc-item'), stageImgs = $$('.stage-frame img');
  let svcActive = 0;
  const svcIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const i = +e.target.dataset.i; if (i === svcActive) return;
    svcItems.forEach((it, k) => it.classList.toggle('is-active', k === i));
    stageImgs.forEach(im => im.classList.remove('was-active'));
    stageImgs[svcActive].classList.replace('is-active', 'was-active');
    stageImgs[i].classList.add('is-active');
    svcActive = i;
  }), { rootMargin: '-48% 0px -48% 0px' });
  svcItems.forEach(it => svcIO.observe(it));

  /* ===================== Reels ===================== */
  const reels = $$('.reel');
  reels.forEach(r => {
    const v = $('video', r), btn = $('.reel-sound', r);
    v.src = v.dataset.src;
    v.addEventListener('error', () => { btn.hidden = true; }, true);
    const toggle = () => {
      const turnOn = v.muted;
      reels.forEach(o => { $('video', o).muted = true; o.classList.remove('sound-on'); });
      if (turnOn) { v.muted = false; v.play().catch(() => {}); r.classList.add('sound-on'); }
    };
    btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });
    r.addEventListener('click', toggle);
  });
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = $('video', e.target); e.isIntersecting ? v.play().catch(() => {}) : v.pause();
  }), { threshold: 0.5 });
  reels.forEach(r => vio.observe(r));

  /* ===================== Gallery filter + lightbox ===================== */
  const tiles = $$('.tile');
  tiles.forEach((t, i) => t.style.setProperty('--i', i));
  if (finePointer && !reduce) {
    tiles.forEach(t => {
      t.addEventListener('mousemove', e => {
        const r = t.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        t.style.setProperty('--rx', (px * 10).toFixed(2) + 'deg');
        t.style.setProperty('--ry', (-py * 10).toFixed(2) + 'deg');
      });
      t.addEventListener('mouseleave', () => { t.style.removeProperty('--rx'); t.style.removeProperty('--ry'); });
    });
  }
  $$('.filters button').forEach(b => b.addEventListener('click', () => {
    $$('.filters button').forEach(x => x.classList.toggle('is-active', x === b));
    const f = b.dataset.filter;
    tiles.forEach(t => {
      const show = f === 'all' || t.dataset.cat === f;
      if (show) {
        t.classList.remove('gone'); t.classList.add('in');
        requestAnimationFrame(() => requestAnimationFrame(() => t.classList.remove('out')));
      } else {
        t.classList.add('out');
        setTimeout(() => { if (t.classList.contains('out')) t.classList.add('gone'); }, 450);
      }
    });
  }));

  const lb = document.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
  lb.innerHTML = '<div class="lb-bg"></div><button class="lb-x" aria-label="Close">&times;</button><button class="lb-p" aria-label="Previous">&lsaquo;</button><button class="lb-n" aria-label="Next">&rsaquo;</button><img alt=""><p class="lb-count"></p>';
  body.appendChild(lb);
  const lbImg = $('img', lb), lbCount = $('.lb-count', lb), lbBg = $('.lb-bg', lb);
  let list = [], idx = 0;
  function show(i) {
    const from = idx;
    idx = (i + list.length) % list.length;
    const t = list[idx];
    let dir = idx - from;
    if (Math.abs(dir) > 1) dir = dir > 0 ? -1 : 1;
    dir = Math.sign(dir);
    lbImg.classList.remove('show');
    lbImg.style.setProperty('--slide', (dir * 28) + 'px');
    setTimeout(() => {
      lbImg.onload = () => lbImg.classList.add('show');
      lbImg.src = t.dataset.full; lbImg.alt = $('img', t).alt;
      if (lbImg.complete) lbImg.classList.add('show');
      lbCount.textContent = `${idx + 1} of ${list.length}`;
      lbBg.style.backgroundImage = `url(${t.dataset.full})`;
      lbBg.classList.add('show');
    }, 180);
  }
  function openLb(t) { list = tiles.filter(x => !x.classList.contains('gone')); show(list.indexOf(t)); lb.classList.add('open'); body.style.overflow = 'hidden'; $('.lb-x', lb).focus(); }
  function closeLb() { lb.classList.remove('open'); body.style.overflow = ''; }
  tiles.forEach(t => t.addEventListener('click', () => openLb(t)));
  $('.lb-x', lb).onclick = closeLb; $('.lb-p', lb).onclick = () => show(idx - 1); $('.lb-n', lb).onclick = () => show(idx + 1);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1);
  });
  let sx = 0;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); });

  /* ===================== Reviews =====================
     Rotates only when there is more than one real review to rotate through.
     With a single quote (or none) it just shows it and leaves the timer alone. */
  const quotes = $$('.quote'), dots = $$('#dots button');
  const DUR = 7000; let q = 0, timer = null;
  if (quotes.length) quotes[0].classList.add('in', 'is-active');
  function restartDot() { if (!dots.length) return; dots.forEach(d => d.classList.remove('is-active')); void dots[q].offsetWidth; dots[q].classList.add('is-active'); }
  function setQuote(i) {
    const next = (i + quotes.length) % quotes.length; if (next === q) return;
    const old = quotes[q];
    old.classList.add('leaving'); old.classList.remove('is-active');
    setTimeout(() => old.classList.remove('leaving', 'in'), 650);
    q = next;
    setTimeout(() => { quotes[q].classList.add('is-active'); requestAnimationFrame(() => quotes[q].classList.add('in')); }, reduce ? 0 : 350);
    restartDot();
  }
  const start = () => { clearInterval(timer); restartDot(); if (quotes.length > 1) timer = setInterval(() => setQuote(q + 1), DUR); };
  dots.forEach((d, k) => d.addEventListener('click', () => { setQuote(k); start(); }));
  dots.forEach(d => d.style.setProperty('--dur', DUR + 'ms'));
  const reviewsEl = $('#reviews');
  if (reviewsEl && quotes.length > 1) new IntersectionObserver(es => es.forEach(e => { e.isIntersecting ? start() : clearInterval(timer); }), { threshold: 0.3 }).observe(reviewsEl);

  /* ===================== Cursor + magnetic buttons (desktop only) ===================== */
  if (finePointer && !reduce) {
    document.documentElement.classList.add('has-cursor');
    const cur = $('#cursor'), label = $('span', cur);
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    const follow = () => { cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2; cur.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(follow); };
    follow();
    document.addEventListener('mouseover', e => {
      const big = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, input, select, textarea');
      cur.classList.toggle('big', !!big); label.textContent = big ? big.dataset.cursor : '';
      cur.classList.toggle('link', !big && !!link);
    });
    $$('.magnetic').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${dx * 0.22}px,${dy * 0.3}px)`;
        const s = $('span', b); if (s) s.style.transform = `translate(${dx * 0.1}px,${dy * 0.12}px)`;
      });
      b.addEventListener('mouseleave', () => { b.style.transform = ''; const s = $('span', b); if (s) s.style.transform = ''; });
    });
  }

  /* ===================== Gold dust in the hero ===================== */
  const cv = $('#dust');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d');
    let W, H, dpr, parts = [], running = true;
    const size = () => {
      dpr = Math.min(2, devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, W * H / 16000));
      parts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .4, s: Math.random() * .35 + .1, a: Math.random() * Math.PI * 2, w: Math.random() * .02 + .005 }));
    };
    size(); addEventListener('resize', size);
    new IntersectionObserver(es => es.forEach(e => { running = e.isIntersecting; if (running) requestAnimationFrame(draw); })).observe(cv);
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y -= p.s; p.a += p.w; p.x += Math.sin(p.a) * .3;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        const tw = .35 + .65 * Math.abs(Math.sin(p.a * 2));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(240,212,156,${.85 * tw})`); g.addColorStop(1, 'rgba(240,212,156,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
  }

  /* ===================== Enquiry form -> WhatsApp ===================== */
  const WA = '919919696288';
  /* Supabase: every enquiry is also written to the `enquiries` table, so nothing is
     lost if a WhatsApp message never gets sent. This key is the PUBLIC publishable
     key and is meant to ship in the page — the table's row-level security lets the
     browser add rows and nothing else, so enquiries cannot be read back from here. */
  const SUPABASE = {
    url: 'https://lrednnwultowqfivommz.supabase.co',
    key: 'sb_publishable_5GLfirJJ5Er4hhnBh4sXBA_Ejenx8tC',
    table: 'enquiries'
  };

  function saveEnquiry(row) {
    if (!SUPABASE.url || !SUPABASE.key) return;
    fetch(`${SUPABASE.url}/rest/v1/${SUPABASE.table}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE.key,
        Authorization: `Bearer ${SUPABASE.key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(row),
      keepalive: true // the tab is about to hand over to WhatsApp
    }).catch(() => {}); // never let a failed save block the enquiry
  }

  const form = $('#enquiryForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const name = (f.get('name') || '').trim(), phone = (f.get('phone') || '').trim();
    const nameEl = $('#f-name'), phoneEl = $('#f-phone');
    const badName = !name, badPhone = phone.replace(/\D/g, '').length < 7;
    [nameEl, phoneEl].forEach(el => el.classList.remove('err')); void nameEl.offsetWidth;
    nameEl.classList.toggle('err', badName); phoneEl.classList.toggle('err', badPhone);
    if (badName || badPhone) { (badName ? nameEl : phoneEl).focus(); return; }
    const date = f.get('date') ? new Date(f.get('date')).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'not decided yet';
    const lines = ['Hello City Garden, I would like to enquire about a booking.', '',
      `Name: ${name}`, `Phone: ${phone}`, `Event: ${f.get('type')}`, `Preferred date: ${date}`, `Approx. guests: ${f.get('guests') || 'not sure yet'}`];
    if ((f.get('msg') || '').trim()) lines.push(`Notes: ${f.get('msg').trim()}`);

    // WhatsApp opens first and synchronously, or the popup blocker eats it.
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');

    // Bots fill the hidden field; people never see it. Those submissions aren't stored.
    if (!(f.get('website') || '').trim()) {
      const g = parseInt(f.get('guests'), 10);
      saveEnquiry({
        name: name.slice(0, 120),
        phone: phone.slice(0, 30),
        event_type: (f.get('type') || '').slice(0, 60) || null,
        preferred_date: f.get('date') || null,
        guests: Number.isFinite(g) && g > 0 ? Math.min(g, 100000) : null,
        message: ((f.get('msg') || '').trim() || '').slice(0, 2000) || null,
        source: 'website'
      });
    }
    form.reset();
  });
  $('#f-date').min = new Date().toISOString().split('T')[0];
  $('#year').textContent = new Date().getFullYear();
})();
