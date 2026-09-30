/* Vexel landing — small, dependency-free behaviours */
(() => {
  const root = document.documentElement;
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const currentTheme = () => root.getAttribute('data-theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const syncThemeLabel = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    themeBtn?.setAttribute('aria-label', `Switch to ${next} theme`);
  };
  themeBtn?.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('vexel-theme', next); } catch (e) { /* storage blocked */ }
    syncThemeLabel();
  });
  syncThemeLabel();

  /* ---------- Sticky nav border ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Full-screen mobile menu ---------- */
  const menu = document.getElementById('menu');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = menu?.querySelector('[data-menu-close]');
  const focusables = () => [...menu.querySelectorAll('a[href], button:not([disabled])')];
  const openMenu = () => {
    menu.hidden = false;
    document.body.classList.add('menu-open');
    openBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => { menu.classList.add('is-open'); requestAnimationFrame(() => closeBtn.focus()); });
  };
  const closeMenu = (restoreFocus = true) => {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    openBtn.setAttribute('aria-expanded', 'false');
    const done = () => { menu.hidden = true; };
    reduceMotion() ? done() : setTimeout(done, 300);
    if (restoreFocus) openBtn.focus();
  };
  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', () => closeMenu());
  menu?.querySelectorAll('[data-menu-link]').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu && !menu.hidden) closeMenu(); });
  menu?.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = focusables(); const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches && !menu.hidden) closeMenu(false); });

  /* ---------- Deterministic waveforms ---------- */
  const rand = seed => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  document.querySelectorAll('[data-wave]').forEach(el => {
    const n = +el.dataset.wave || 48; const r = rand(+el.dataset.seed || 1);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const env = Math.sin(Math.PI * (i + .5) / n) * .7 + .3;
      const h = Math.max(12, Math.round((r() * .75 + .25) * env * 100));
      const b = document.createElement('i'); b.style.height = h + '%'; frag.appendChild(b);
    }
    el.appendChild(frag);
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion()) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Tabs / radio helpers (roving focus) ---------- */
  const roving = (items, onSelect) => {
    items.forEach((item, i) => {
      item.addEventListener('click', () => onSelect(item));
      item.addEventListener('keydown', e => {
        const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!dir) return;
        e.preventDefault();
        const next = items[(i + dir + items.length) % items.length];
        next.focus(); onSelect(next);
      });
    });
  };

  /* ---------- Listen and compare (pre-recorded clips) ---------- */
  const listen = document.querySelector('[data-listen]');
  if (listen) {
    const audio = new Audio(); audio.preload = 'none';
    const status = listen.querySelector('[data-status]');
    let current = null, raf = null;
    const bars = btn => [...btn.querySelectorAll('.wave i')];
    const reset = btn => {
      if (!btn) return;
      btn.setAttribute('aria-pressed', 'false'); btn.closest('.vcard').classList.remove('is-playing');
      bars(btn).forEach(b => b.classList.remove('lit'));
    };
    const tick = () => {
      if (!current || !audio.duration) { raf = requestAnimationFrame(tick); return; }
      const bs = bars(current), lit = Math.floor((audio.currentTime / audio.duration) * bs.length);
      bs.forEach((b, i) => b.classList.toggle('lit', i <= lit));
      if (!audio.paused) raf = requestAnimationFrame(tick);
    };
    const stop = () => { audio.pause(); cancelAnimationFrame(raf); reset(current); current = null; };
    listen.querySelectorAll('.vcard__btn').forEach(btn => btn.addEventListener('click', () => {
      if (current === btn) { stop(); status.textContent = 'Paused.'; return; }
      stop();
      current = btn; audio.src = btn.dataset.src;
      btn.setAttribute('aria-pressed', 'true'); btn.closest('.vcard').classList.add('is-playing');
      audio.play().then(() => { raf = requestAnimationFrame(tick); status.textContent = `Playing ${btn.querySelector('b').textContent}.`; })
        .catch(() => { reset(btn); current = null; status.textContent = 'Could not play this clip.'; });
    }));
    audio.addEventListener('ended', () => { bars(current || document.body).forEach(b => b.classList.add('lit')); setTimeout(stop, 250); });

    const tabs = [...listen.querySelectorAll('[role="tab"]')];
    roving(tabs, tab => {
      stop();
      tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      listen.querySelectorAll('[data-lang-panel]').forEach(p => { p.hidden = p.dataset.langPanel !== tab.dataset.lang; });
    });
  }

  /* ---------- Gentle motion ---------- */
  const calm = reduceMotion();

  // Hero screenshot: starts slightly tilted back, settles flat as you scroll
  const heroImg = document.querySelector('.hero-shot__frame');
  if (heroImg && !calm) {
    let ticking = false;
    const tilt = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.55)));
      heroImg.style.setProperty('--tilt', (9 * (1 - p)).toFixed(2) + 'deg');
      heroImg.style.setProperty('--tilt-scale', (0.97 + 0.03 * p).toFixed(4));
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(tilt); } }, { passive: true });
    tilt();
  }

  // Orb follows the pointer a little
  const orb = document.querySelector('.hero__visual .orb');
  if (orb && !calm && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      orb.style.setProperty('--ox', x.toFixed(1) + 'px');
      orb.style.setProperty('--oy', y.toFixed(1) + 'px');
    }, { passive: true });
  }

  // Stats count up once when they come into view
  const stats = document.querySelector('.stats');
  if (stats && !calm && 'IntersectionObserver' in window) {
    const nums = [...stats.querySelectorAll('[data-count]')];
    const finals = nums.map(n => n.textContent);
    nums.forEach(n => { n.textContent = '0'; });
    const so = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      so.disconnect();
      const t0 = performance.now(), dur = 1400;
      const step = now => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        nums.forEach((n, i) => { n.textContent = p < 1 ? String(Math.round(+n.dataset.count * e)) : finals[i]; });
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: .4 });
    so.observe(stats);
  }

  // Chapter numbers light up; eyebrow lines draw in
  if ('IntersectionObserver' in window) {
    const active = new IntersectionObserver(entries => {
      entries.forEach(en => { en.target.classList.toggle('is-active', en.isIntersecting); if (en.isIntersecting) en.target.classList.add('is-drawn'); });
    }, { rootMargin: '-20% 0px -30% 0px' });
    document.querySelectorAll('.chapter').forEach(el => active.observe(el));
    const heads = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); heads.unobserve(en.target); } });
    }, { threshold: .3 });
    document.querySelectorAll('.section-head').forEach(el => heads.observe(el));
  }
})();
