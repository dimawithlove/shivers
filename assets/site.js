(function () {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* приватный режим */ } } };
  const L = 'ru';                     // сайт только на русском; латиницей — лишь название SHIVERS
  let cur = 0;                         // текущий продукт
  const timers = [];
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);


  function show(screen) {
    $('#home').hidden = screen !== 'home';
    $('#products').hidden = screen !== 'products';
    history.replaceState(null, '', (screen === 'products' ? '#products' : '#') + (L === 'en' ? '' : ''));
    window.scrollTo(0, 0);
    if (screen === 'products') { goTo(cur, false); centerPhone(); } else fitHero();
  }

  function texts() {
    const U = S.ui[L];
    document.documentElement.lang = L;
    $$('[data-t]').forEach((el) => (el.textContent = U[el.dataset.t]));
    $$('[data-lang]').forEach((b) => b.classList.toggle('on', b.dataset.lang === L));
    $('#headline').innerHTML = window.seg14('Я выведу свои пет-проекты на новые горизонты.\nДмитрий Шинаев');
    $('.start').innerHTML = window.seg14('Старт');
    const s = S.seller;
    $('#foot').innerHTML = `© ${new Date().getFullYear()} SHIVERS · ${s.name[L]} · ${U.inn} ${s.inn} · <a href="offer.html${L === 'en' ? '?lang=en' : ''}">${U.footer}</a> · <a href="privacy.html${L === 'en' ? '?lang=en' : ''}">${U.privacy}</a> · <a href="mailto:${s.email}">${s.email}</a>`;
    buildPanels();
  }

  function buildPanels() {
    const U = S.ui[L], many = S.products.length > 1;
    timers.forEach(clearInterval); timers.length = 0;
    $('#track').innerHTML = S.products.map((p, i) => {
      const hasUrl = !!p.url, android = p.kind === 'android';
      let action;
      if (!hasUrl) action = `<span class="cta soon">${L === 'en' ? 'Coming soon to RuStore' : 'Скоро в RuStore'}</span>`;
      else if (android && isIOS) action = `<span class="cta soon">${U.onlyAndroid}</span>`;
      else action = `<a class="cta ${android ? 'dl' : ''}" href="${p.url}" target="_blank" rel="noopener">${android ? (L === 'en' ? 'Download on RuStore' : 'Скачать в RuStore') : (L === 'en' ? 'Open' : 'Открыть')}</a>`;
      return `<article class="panel ${android && hasUrl ? 'is-android-app' : ''}" data-i="${i}">
        <div class="phone-col">
          <div class="carousel">
            <button class="arrow left" aria-label="${U.prev}" title="${many ? U.prev : U.soonMore}" ${many ? '' : 'disabled'}>‹</button>
            <div class="phone"><div class="scr">${p.screens.map((src, k) => `<img src="${src}" alt="${p.name[L]}" class="${k === 0 ? 'on' : ''}" loading="${k < 2 ? 'eager' : 'lazy'}">`).join('')}</div></div>
            <button class="arrow right" aria-label="${U.next}" title="${many ? U.next : U.soonMore}" ${many ? '' : 'disabled'}>›</button>
          </div>
          <div class="sdots">${p.screens.map((_, k) => `<button class="${k === 0 ? 'on' : ''}" aria-label="${k + 1}"></button>`).join('')}</div>
          ${action}
          ${android && hasUrl ? `<div class="qr"><div class="box" data-qr="${p.url}"></div><span>${U.scan}</span></div>` : ''}
        </div>
        <div class="info">
          <p class="kicker">${U.project} ${i + 1} ${U.of} ${S.products.length}</p>
          <h2>${p.name[L]}</h2>
          <p class="audience"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.6c2.6.2 4.4 1.8 5 4.6"/></svg>${p.audience[L]}</p>
          <p class="tagline">${p.tagline[L]}</p>
          <p class="lead">${p.lead[L]}</p>
          <ul class="features">${p.features[L].map(([t, d]) => `<li><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ul>
          <p class="prices">${U.prices}: ${p.prices[L].map(([n, , c]) => `${n} — <b>${c}</b>`).join(' · ')}</p>
        </div>
      </article>`;
    }).join('');
    // QR-коды
    $$('[data-qr]').forEach((box) => { try { const q = qrcode(0, 'M'); q.addData(box.dataset.qr); q.make(); box.innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); } catch (e) { box.parentNode.remove(); } });
    // Слайд-шоу экранов: смена каждые 10 секунд, точки — ручной выбор
    $$('.panel').forEach((panel) => {
      const imgs = $$('.scr img', panel), dots = $$('.sdots button', panel);
      let k = 0;
      const set = (n) => { imgs[k].classList.remove('on'); dots[k].classList.remove('on'); k = (n + imgs.length) % imgs.length; imgs[k].classList.add('on'); dots[k].classList.add('on'); };
      dots.forEach((d, n) => (d.onclick = () => set(n)));
      timers.push(setInterval(() => { if (!document.hidden) set(k + 1); }, 10000));
      $('.arrow.left', panel).onclick = () => goTo(cur - 1);
      $('.arrow.right', panel).onclick = () => goTo(cur + 1);
    });
    $('#pager').innerHTML = (many ? `<div class="pd">${S.products.map((_, i) => `<span class="${i === cur ? 'on' : ''}"></span>`).join('')}</div><div class="hint">${U.swipe}</div>` : '');
  }

  function goTo(i, smooth = true) {
    const n = S.products.length;
    cur = ((i % n) + n) % n;
    const track = $('#track');
    track.scrollTo({ left: cur * track.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
    $$('#pager .pd span').forEach((d, k) => d.classList.toggle('on', k === cur));
  }
  // Свайп пальцем — родная прокрутка с «защёлкиванием»; отслеживаем текущий продукт
  let st;
  $('#track').addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(() => { const t = $('#track'); const i = Math.round(t.scrollLeft / t.clientWidth); if (i !== cur) { cur = i; $$('#pager .pd span').forEach((d, k) => d.classList.toggle('on', k === cur)); } }, 80); }, { passive: true });
  // Главный экран (компьютер/планшет): кнопка «СТАРТ» стоит ровно под «ошейником» скафандра на фото.
  // Фото 2400×1556; низ ошейника по центру — y=1400, центр скафандра по горизонтали — x=1230.
  const IMG = { w: 2400, h: 1556, collarY: 1400, helmetY: 410, cx: 1230 };
  function fitHero() {
    const hero = $('#home'), btn = $('.start');
    if (window.innerWidth <= 600) { hero.style.background = ''; btn.style.top = btn.style.left = ''; return; }
    const W = hero.clientWidth, H = hero.clientHeight, bh = btn.offsetHeight, bw = btn.offsetWidth;
    const hb = $('#headline').getBoundingClientRect().bottom - hero.getBoundingClientRect().top;
    // фото прижато к низу экрана; масштаб — как «cover», но не крупнее, чем нужно, чтобы шлем начинался под фразой,
    // и не мельче, чем нужно, чтобы «СТАРТ» поместился под ошейником
    const gap = -14;  // кнопка чуть заходит на нижний край ошейника
    let k = Math.max(W / IMG.w, H / IMG.h);
    k = Math.min(k, (H - hb - 24) / (IMG.h - IMG.helmetY));
    k = Math.max(k, (bh + gap + 14) / (IMG.h - IMG.collarY));
    const iw = IMG.w * k, ih = IMG.h * k, oy = H - ih;
    let ox = W / 2 - IMG.cx * k; if (iw >= W) ox = Math.min(0, Math.max(W - iw, ox));
    const C = '#061430', f = 160;
    const fade = iw < W ? `linear-gradient(90deg, ${C} 0, ${C} ${ox}px, transparent ${ox + f}px, transparent ${ox + iw - f}px, ${C} ${ox + iw}px), ` : '';
    hero.style.background = `${fade}${C} url('assets/img/hero.jpg') ${ox}px ${oy}px / ${iw}px ${ih}px no-repeat`;
    if (fade) hero.style.backgroundSize = `100% 100%, ${iw}px ${ih}px`, hero.style.backgroundPosition = `0 0, ${ox}px ${oy}px`, hero.style.backgroundRepeat = 'no-repeat';
    btn.style.top = `${Math.round(IMG.collarY * k + oy + gap)}px`;
    btn.style.left = `${Math.round(IMG.cx * k + ox - bw / 2)}px`;
  }
  // Страница продуктов (компьютер): телефон с кнопкой и QR — по центру высоты экрана
  function centerPhone() {
    $$('.phone-col').forEach((c) => {
      c.style.marginTop = '';
      if (window.innerWidth <= 860) return;
      const top = c.getBoundingClientRect().top + window.scrollY;
      c.style.marginTop = Math.max(0, Math.round(window.innerHeight / 2 - c.offsetHeight / 2 - top)) + 'px';
    });
  }
  const relayout = () => { fitHero(); if (!$('#products').hidden) centerPhone(); };
  window.addEventListener('resize', () => { goTo(cur, false); relayout(); });
  window.addEventListener('load', relayout);
  document.fonts && document.fonts.ready.then(relayout);

  function modal(kind) {
    const U = S.ui[L], s = S.seller, p = S.products[cur];
    let html = '';
    if (kind === 'about') {
      html = `<div class="about-head"><img src="assets/img/logo.svg" alt=""><h1 style="margin:0">${U.aboutTitle}</h1></div>
        <p>${U.aboutText}</p>
        <div class="card"><p><b>${s.name[L]}</b></p><p>${s.status[L]}</p><p>${U.inn} ${s.inn}</p>
        <p>Эл. почта: <a href="mailto:${s.email}">${s.email}</a></p></div>
        <p class="muted" style="margin-top:14px">${U.aboutNote}</p>`;
    } else if (kind === 'payment') {
      html = `<h1>${U.payTitle}</h1><p class="muted">${U.payLead}</p>
        <ol class="steps">${S.payment[L].map(([t, d]) => `<li><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ol>
        <div class="card"><p>${U.payMethods}</p><p>${U.payTax}</p></div>
        <p style="margin-top:14px">${U.payFull}</p>`;
    } else if (kind === 'offer') {
      html = window.offerHTML(p.id, L) + `<p style="margin-top:18px"><a href="offer.html?p=${p.id}${L === 'en' ? '&lang=en' : ''}" target="_blank">${U.openPage}</a></p>`;
    }
    $('#modal-body').innerHTML = html;
    $('#modal').hidden = false;
    $('.sheet').scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() { $('#modal').hidden = true; document.body.style.overflow = ''; }

  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); show(go.dataset.go); return; }
    const m = e.target.closest('[data-modal]');
    if (m) { modal(m.dataset.modal); return; }
    if (e.target.closest('.close') || e.target === $('#modal')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if ($('#products').hidden || !$('#modal').hidden || S.products.length < 2) return;
    if (e.key === 'ArrowRight') goTo(cur + 1);
    if (e.key === 'ArrowLeft') goTo(cur - 1);
  });

  texts();
  show(location.hash === '#products' ? 'products' : 'home');
})();
