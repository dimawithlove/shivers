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
    if (screen === 'products') { goTo(cur, false); centerPhone(); renderDock(); fitMobile(true); } else fitHero();
  }

  function texts() {
    const U = S.ui[L];
    document.documentElement.lang = L;
    $$('[data-t]').forEach((el) => (el.textContent = U[el.dataset.t]));
    $$('[data-lang]').forEach((b) => b.classList.toggle('on', b.dataset.lang === L));
    $('#headline').innerHTML = window.seg14('Я выведу свои пет-проекты на новые горизонты.\nДмитрий Шинаев');
    $('.start').innerHTML = window.seg14('Старт');
    const s = S.seller;
    $('#foot').innerHTML = `© ${new Date().getFullYear()} SHIVERS · ${s.name[L]} · ${U.inn} ${s.inn} · ${s.city} · <a href="tel:${s.tel}">${s.phone}</a> · <a href="offer.html${L === 'en' ? '?lang=en' : ''}">${U.footer}</a> · <a href="privacy.html${L === 'en' ? '?lang=en' : ''}">${U.privacy}</a> · <a href="mailto:${s.email}">${s.email}</a>`;
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
      const head = `<p class="kicker">${U.project} ${i + 1} ${U.of} ${S.products.length}</p><h2>${p.name[L]}</h2><p class="audience"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.6c2.6.2 4.4 1.8 5 4.6"/></svg>${p.audience[L]}</p>`;
      return `<article class="panel ${android && hasUrl ? 'is-android-app' : ''}" data-i="${i}">
        <div class="mhead">${head}</div>
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
          <p class="prices"><span class="pt">${U.prices}:</span> ${p.prices[L].map(([n, , c]) => `<span class="pi">${n} — <b>${c}</b></span>`).join('<i class="psep"> · </i>')}</p>
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
    renderDock();
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
    hero.style.background = `${fade}${C} url('assets/img/hero.webp') ${ox}px ${oy}px / ${iw}px ${ih}px no-repeat`;
    if (fade) hero.style.backgroundSize = `100% 100%, ${iw}px ${ih}px`, hero.style.backgroundPosition = `0 0, ${ox}px ${oy}px`, hero.style.backgroundRepeat = 'no-repeat';
    btn.style.top = `${Math.round(IMG.collarY * k + oy + gap)}px`;
    btn.style.left = `${Math.round(IMG.cx * k + ox - bw / 2)}px`;
  }
  // Страница продуктов (компьютер): телефон с кнопкой и QR — по центру высоты экрана
  function centerPhone() {
    const pr = $('#products'), W = window.innerWidth, H = window.innerHeight;
    const z = W > 860 ? Math.min(1.7, Math.max(0.8, Math.min(W / 1440, H / 900))) : 1;
    pr.style.setProperty('--z', z);
    $$('.phone-col').forEach((c) => {
      c.style.marginTop = '';
      if (W <= 860) return;
      const r = c.getBoundingClientRect(), top = r.top + window.scrollY;
      c.style.marginTop = Math.max(0, Math.round((H / 2 - r.height / 2 - top) / z)) + 'px';
    });
  }
  // QR-док над котом (компьютер): по центру между низом кнопок шапки и верхом шлема
  const CAT = { w: 1140, h: 952, helmetTop: 0.185, gazeX: 0.43 };
  function renderDock() {
    const p = S.products[cur], dock = $('#qrdock');
    if (!dock) return;
    const ready = !!p.url && p.kind === 'android';
    dock.className = 'qrdock' + (ready ? ' ready' : ' soon');
    dock.innerHTML = `<div class="qd-head"><span class="qd-led"></span><span class="qd-title">${window.seg14(ready ? 'Скачать' : 'Скоро')}</span></div>
      <div class="qd-scan"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i>
        <div class="qd-code">${ready ? '' : '<div class="qd-ghost"></div>'}</div>${ready ? '<b class="qd-beam"></b>' : ''}</div>
      <p class="qd-cap">${ready ? 'Наведите камеру телефона —<br>' + p.name[L] + ' в RuStore' : 'Скоро в RuStore.<br>Здесь появится QR-код'}</p>`;
    if (!ready) { try { const q = qrcode(0, 'M'); q.addData('SHIVERS ' + p.id); q.make(); $('.qd-ghost', dock).innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); } catch (e) { /* пусто */ } }
    if (ready) { try { const q = qrcode(0, 'M'); q.addData(p.url); q.make(); $('.qd-code', dock).innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); } catch (e) { /* без QR */ } }
    placeDock();
  }
  function placeDock() {
    const dock = $('#qrdock'), cat = $('.cat'), pr = $('#products');
    if (!dock || pr.hidden) return;
    if (window.innerWidth <= 860) { dock.style.cssText = ''; return; }
    const pr0 = pr.getBoundingClientRect(), cr = cat.getBoundingClientRect();
    const k = Math.min(cr.width / CAT.w, cr.height / CAT.h), iw = CAT.w * k, ih = CAT.h * k;
    const il = cr.right - iw, it = cr.bottom - ih;                 // картинка прижата вправо-вниз
    const helmet = it + CAT.helmetTop * ih - pr0.top, navB = $('#products .top').getBoundingClientRect().bottom - pr0.top;
    // свободная полоса справа от текста продукта (сам текст не двигаем)
    const info = $(`.panel[data-i="${cur}"] .info`), infoR = info ? info.getBoundingClientRect().right - pr0.left : pr0.width * .6;
    const minL = infoR + 24, maxR = pr0.width - 24, room = helmet - navB;
    // масштаб как у текста продукта (--z), чтобы подпись была того же размера, что описание; уменьшаем, только если не влезает
    dock.style.setProperty('--dz', 1);
    const zt = parseFloat(pr.style.getPropertyValue('--z')) || 1, bw = dock.offsetWidth, bh = dock.offsetHeight;
    const z = Math.max(.55, Math.min(zt, (room - 16) / bh, (maxR - minL) / bw));
    dock.style.setProperty('--dz', z);
    const dh = bh * z, dw = bw * z;
    let cx = il - pr0.left + CAT.gazeX * iw; cx = Math.max(minL + dw / 2, Math.min(cx, maxR - dw / 2));
    // у элемента с zoom координаты тоже масштабируются — делим на z
    dock.style.left = Math.round((cx - dw / 2) / z) + 'px';
    dock.style.top = Math.round((navB + (room - dh) / 2) / z) + 'px';
  }
  // Телефон: макет приложения — максимально крупный, но так, чтобы точки и кнопка «Скоро в RuStore» были видны без прокрутки;
  // кот — напротив блока цен
  let fitW = 0;
  function fitMobile(force) {
    const W = window.innerWidth, H = window.innerHeight, pr = $('#products');
    if (W <= 600 && !force && W === fitW && window.scrollY > 0) return;   // адресная строка прячется при прокрутке — не дёргаем макет
    fitW = W;
    $$('#products .phone').forEach((ph) => { ph.style.width = ph.style.height = ''; });
    const cat = $('#products .cat'); cat.style.top = '';
    if (W > 600 || pr.hidden) return;
    const panel = $(`.panel[data-i="${cur}"]`) || $('.panel'), ph = $('.phone', panel), col = $('.phone-col', panel);
    const top = ph.getBoundingClientRect().top - pr.getBoundingClientRect().top;
    const dots = $('.sdots', panel), cta = $('.cta', panel);
    const below = 10 + (dots ? dots.offsetHeight : 0) + 10 + (cta ? cta.offsetHeight : 0) + 14;
    const ratio = 1266 / 585;
    const w = Math.round(Math.max(200, Math.min(W - 112, (H - top - below) / ratio)));
    $$('#products .phone').forEach((p) => { p.style.width = w + 'px'; p.style.height = Math.round(w * ratio) + 'px'; });
    // фонари на шлеме (≈57% высоты картинки) — напротив второй цены
    const pi = $$('.prices .pi', panel)[1] || $('.prices', panel);
    if (pi) {
      const r = pi.getBoundingClientRect(), pt = pr.getBoundingClientRect().top, ch = cat.getBoundingClientRect().height;
      cat.style.top = Math.round(r.top - pt + r.height / 2 - ch * 0.57) + 'px';
    }
  }
  const relayout = () => { fitHero(); if (!$('#products').hidden) { centerPhone(); placeDock(); fitMobile(); } };
  window.addEventListener('resize', () => { goTo(cur, false); relayout(); });
  window.addEventListener('load', relayout);
  document.fonts && document.fonts.ready.then(relayout);

  function modal(kind) {
    const U = S.ui[L], s = S.seller, p = S.products[cur];
    let html = '';
    if (kind === 'about') {
      html = `<div class="about-head"><img src="assets/img/dmitriy.webp" alt="Дмитрий Шинаев" width="112" height="112"><h1 style="margin:0">${U.aboutTitle}</h1></div>
        <p>${U.aboutText}</p>
        <div class="card"><p><b>${s.name[L]}</b></p><p>${s.status[L]}</p><p>${U.inn} ${s.inn}</p>
        <p>${s.city}</p><p>Телефон: <a href="tel:${s.tel}">${s.phone}</a></p>
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
    if (go) { e.preventDefault(); closeModal(); show(go.dataset.go); return; }
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
