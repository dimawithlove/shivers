/* Сегментный индикатор (14 сегментов) для кириллицы — в стиле табло, как DSEG14.
   Каждое слово — отдельный SVG, поэтому строка переносится по словам. */
(function () {
  const W = 10, H = 16, T = 1.7, G = 0.45, GD = 1.45, SK = -4;
  const P = { a: [0, 0, 10, 0], a1: [0, 0, 5, 0], a2: [5, 0, 10, 0], d1: [0, 16, 5, 16], d2: [5, 16, 10, 16], d: [0, 16, 10, 16], f: [0, 0, 0, 8], e: [0, 8, 0, 16], b: [10, 0, 10, 8], c: [10, 8, 10, 16],
    g1: [0, 8, 5, 8], g2: [5, 8, 10, 8], i: [5, 0, 5, 8], l: [5, 8, 5, 16], h: [0, 0, 5, 8], j: [10, 0, 5, 8], k: [5, 8, 0, 16], m: [5, 8, 10, 16] };
  const DIAG = { h: 1, j: 1, k: 1, m: 1 };
  const F = {
    'А': 'a b c e f g1 g2', 'Б': 'a f e d c g1 g2', 'В': 'a b c d i l g2', 'Г': 'a f e', 'Д': 'a2 i k b c d',
    'Е': 'a d e f g1', 'Ё': 'a d e f g1', 'Ж': 'h i j k l m', 'З': 'a b c d g2', 'И': 'b c e f j k', 'Й': 'b c e f j k',
    'К': 'e f g1 j m', 'Л': 'a2 i k b c', 'М': 'b c e f h j', 'Н': 'b c e f g1 g2', 'О': 'a b c d e f', 'П': 'a b c e f',
    'Р': 'a b e f g1 g2', 'С': 'a d e f', 'Т': 'a i l', 'У': 'b c d f g1 g2', 'Ф': 'a b f g1 g2 i l', 'Х': 'h j k m',
    'Ц': 'e f d l', 'Ч': 'b c f g1 g2', 'Ш': 'b c d e f l', 'Щ': 'b c d e f l', 'Ъ': 'a i l d c g2',
    'Ь': 'e f d c g1 g2', 'Э': 'a b c d g2', 'Ю': 'b c e f g1 i l a d', 'Я': 'a b c f g1 g2 k', '-': 'g1 g2'
  };
  function poly(s) {
    const [x1, y1, x2, y2] = P[s], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, h = T / 2, g = DIAG[s] ? GD : G;
    const pt = (t, n) => (x1 + ux * t + nx * n).toFixed(2) + ',' + (y1 + uy * t + ny * n).toFixed(2);
    const pts = DIAG[s] ? [pt(g, -h * .9), pt(g, h * .9), pt(L - g, h * .9), pt(L - g, -h * .9)]
      : [pt(g, 0), pt(g + h, h), pt(L - g - h, h), pt(L - g, 0), pt(L - g - h, -h), pt(g + h, -h)];
    return `<polygon points="${pts.join(' ')}"/>`;
  }
  const cell = (x, segs) => `<g transform="translate(${x} 0) skewX(${SK}) translate(1.2 0)">${segs.split(' ').map(poly).join('')}</g>`;
  const PITCH = 14.6, PAD = 1.2;
  function word(w) {
    let x = 0, out = '';
    for (const ch of w) {
      if (ch === '.') { out += `<rect x="${x - 2}" y="${H - T}" width="${T}" height="${T}"/>`; x += 1.8; continue; }
      if (ch === '!') { out += `<g transform="translate(${x + 0.6} 0) skewX(${SK}) translate(1.2 0)"><polygon points="0,0.5 ${T / 2},0 ${T},0.5 ${T},11 ${T / 2},11.5 0,11"/><rect y="${H - T}" width="${T}" height="${T}"/></g>`; x += 5.5; continue; }
      if (ch === 'Ы') { out += cell(x, 'e f d c g1 g2') + cell(x + 3.8, 'b c'); x += PITCH + 3.8; continue; }
      if (ch === 'Й') out += `<g transform="translate(${x} 0) skewX(${SK}) translate(1.2 0)"><polygon points="3,-2.6 7,-2.6 6.3,-1.3 3.7,-1.3"/></g>`;
      // у «В» левая половина пустая (как у B в DSEG14) — придвигаем её к предыдущей букве, чтобы не было «дырки»
      if (ch === 'В' && x > 0) { out += cell(x - 3, F['В']); x += PITCH - 3; continue; }
      const f = F[ch]; if (!f) { x += PITCH; continue; }
      out += cell(x, f); x += PITCH;
    }
    const vw = x - (PITCH - W) + PAD * 2;
    return `<svg class="seg" viewBox="${-PAD} ${-PAD} ${vw} ${H + PAD * 2}" style="width:${(vw / (H + PAD * 2)).toFixed(3)}em" aria-hidden="true">${out}</svg>`;
  }
  window.seg14 = (text) => text.toUpperCase().split('\n').map((line) => line.split(' ').filter(Boolean).map(word).join(' ')).join('<br>');
})();
