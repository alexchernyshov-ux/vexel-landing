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

  /* ---------- Demo ---------- */
  const demo = document.querySelector('[data-demo]');
  if (demo) {
    const samples = [
      'Rain is back in the forecast for Thursday. Pack a light jacket, and leave a little earlier than usual — the bridge will be slow.',
      'The lighthouse keeper counted the ships each night. Some nights there were none, so she counted the stars instead.',
      'Hi team — a quick update before Friday. The draft is ready for review, and the audio version is attached so you can listen on the go.'
    ];
    const ta = demo.querySelector('textarea');
    const readout = demo.querySelector('[data-readout]');
    const playBtn = demo.querySelector('[data-play]');
    const timeEl = demo.querySelector('[data-time]');
    const countEl = demo.querySelector('[data-count]');
    const statusEl = demo.querySelector('[data-status]');
    const bars = [...demo.querySelectorAll('[data-demo-wave] i')];
    const baseH = bars.map(b => b.style.height);
    const sampleBtns = [...demo.querySelectorAll('[data-sample]')];
    let timer = null, raf = null, words = [], idx = 0, t0 = 0, total = 0;
    const MS_PER_WORD = 330;

    const fmt = ms => { const s = Math.round(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
    const updateCount = () => { countEl.textContent = `${ta.value.length} / ${ta.maxLength}`; };
    const voiceName = () => demo.querySelector('.voices:not([hidden]) [aria-checked="true"] b')?.textContent || 'voice';

    const stop = (finished = false) => {
      clearInterval(timer); cancelAnimationFrame(raf); timer = raf = null;
      demo.classList.remove('is-playing');
      playBtn.setAttribute('aria-pressed', 'false'); playBtn.setAttribute('aria-label', 'Play sample');
      bars.forEach((b, i) => { b.style.height = baseH[i]; b.classList.remove('lit'); });
      ta.readOnly = false;
      if (finished) statusEl.textContent = 'Finished reading.';
      timeEl.textContent = fmt(total);
    };

    const start = () => {
      const text = ta.value.trim();
      if (!text) { ta.focus(); return; }
      const tokens = text.split(/(\s+)/);
      readout.innerHTML = '';
      words = [];
      tokens.forEach(tok => {
        if (/^\s+$/.test(tok)) { readout.appendChild(document.createTextNode(tok)); return; }
        const s = document.createElement('span'); s.className = 'w'; s.textContent = tok; readout.appendChild(s); words.push(s);
      });
      idx = 0; total = words.length * MS_PER_WORD; t0 = performance.now();
      demo.classList.add('is-playing'); ta.readOnly = true;
      playBtn.setAttribute('aria-pressed', 'true'); playBtn.setAttribute('aria-label', 'Pause sample');
      statusEl.textContent = `Reading with ${voiceName()}.`;

      const step = () => {
        if (idx > 0) { words[idx - 1].classList.remove('now'); words[idx - 1].classList.add('done'); }
        if (idx >= words.length) { stop(true); return; }
        words[idx].classList.add('now');
        idx++;
      };
      step();
      timer = setInterval(step, MS_PER_WORD);

      const animate = now => {
        const p = Math.min(1, (now - t0) / total);
        const lit = Math.floor(p * bars.length);
        bars.forEach((b, i) => {
          b.classList.toggle('lit', i <= lit);
          if (!reduceMotion()) {
            const jitter = i === lit || Math.abs(i - lit) < 3 ? (0.55 + Math.random() * 0.45) : 1;
            b.style.height = `calc(${baseH[i]} * ${jitter.toFixed(2)})`;
          }
        });
        timeEl.textContent = fmt(now - t0);
        if (p < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    };

    playBtn.addEventListener('click', () => (timer ? stop() : start()));
    ta.addEventListener('input', () => { updateCount(); sampleBtns.forEach(b => b.setAttribute('aria-pressed', 'false')); });
    sampleBtns.forEach(btn => btn.addEventListener('click', () => {
      stop();
      ta.value = samples[+btn.dataset.sample];
      sampleBtns.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      updateCount();
      total = ta.value.trim().split(/\s+/).length * MS_PER_WORD; timeEl.textContent = fmt(total);
    }));
    updateCount();
    total = ta.value.trim().split(/\s+/).length * MS_PER_WORD; timeEl.textContent = fmt(total);

    // Voice type tabs
    const tabs = [...demo.querySelectorAll('[role="tab"]')];
    roving(tabs, tab => {
      tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      demo.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== tab.dataset.tab; });
    });
    // Voice radios
    demo.querySelectorAll('[role="radiogroup"]').forEach(group => {
      const radios = [...group.querySelectorAll('[role="radio"]')];
      roving(radios, r => radios.forEach(x => { const on = x === r; x.setAttribute('aria-checked', String(on)); x.tabIndex = on ? 0 : -1; }));
    });
  }

  /* ---------- EN / AR direction demo (strings from the app's own localization) ---------- */
  const strings = {
    en: { newProject: 'New project', voiceovers: 'Voiceovers', readItBack: 'Read it back', podcasts: 'Podcasts', makePodcast: 'Make a podcast', title: 'What are we making?', search: 'Search voices…', generateAll: 'Generate all' },
    ar: { newProject: 'مشروع جديد', voiceovers: 'تعليقات صوتية', readItBack: 'قراءة صوتية', podcasts: 'بودكاست', makePodcast: 'إنشاء بودكاست', title: 'ما الذي سننشئه؟', search: 'البحث في الأصوات…', generateAll: 'توليد الكل' }
  };
  const rtlPanel = document.querySelector('[data-rtl-panel]');
  const dirBtns = [...document.querySelectorAll('[data-dir]')];
  dirBtns.forEach(btn => btn.addEventListener('click', () => {
    const dir = btn.dataset.dir; const lang = dir === 'rtl' ? 'ar' : 'en';
    dirBtns.forEach(b => { const on = b === btn; b.setAttribute('aria-pressed', String(on)); });
    rtlPanel.setAttribute('dir', dir); rtlPanel.setAttribute('lang', lang);
    rtlPanel.querySelectorAll('[data-t]').forEach(el => { el.textContent = strings[lang][el.dataset.t]; });
  }));
})();
