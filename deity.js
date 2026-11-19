/* NOCTURNE — Deity Pack: palette + aurora + light beams + embers + animated entity with hands.
   Usage: <script src="deity.js" defer></script> just before </body> */
(() => {
  const css = `
  :root{--purple:#3ff0d2;--cyan:#8bffc0;--pink:#ff7a7a;--border:rgba(63,240,210,.2);--bg:#04050d;
    --panel:rgba(8,18,24,.82);--panel2:rgba(10,24,30,.8);--glow:#3ff0d2;--glow2:#8bffc0;
    --beam:200,240,255;--aur1:63,240,210;--aur2:107,255,160}
  :root.wrath{--purple:#ff4b5c;--cyan:#ff9966;--pink:#ff7a7a;--border:rgba(255,75,92,.24);--bg:#080306;
    --panel:rgba(26,8,12,.84);--panel2:rgba(30,10,14,.8);--glow:#ff4b5c;--glow2:#ffb070;
    --beam:255,140,110;--aur1:255,60,70;--aur2:150,20,60}
  body{background:var(--bg)}
  .ambient.one{background:var(--glow)!important}.ambient.two{background:var(--glow2)!important}
  .card{background:linear-gradient(145deg,var(--panel2),rgba(4,7,12,.92))!important}
  .hero h1 span{background:linear-gradient(100deg,var(--glow2),var(--glow))!important;-webkit-background-clip:text;background-clip:text}
  .primary-btn{background:linear-gradient(100deg,var(--glow),var(--glow2))!important}
  .nav-links a:hover,.nav-links a.active{color:var(--glow2)!important}

  #dz-aurora{position:fixed;inset:-10%;z-index:-2;pointer-events:none;filter:blur(40px);opacity:.55;
    background:radial-gradient(ellipse 50% 22% at 25% 12%,rgba(var(--aur1),.55),transparent 70%),
    radial-gradient(ellipse 45% 20% at 70% 8%,rgba(var(--aur2),.4),transparent 70%),
    radial-gradient(ellipse 60% 18% at 50% 26%,rgba(var(--aur1),.25),transparent 70%);
    animation:dz-aur 14s ease-in-out infinite alternate}
  @keyframes dz-aur{to{transform:translate3d(4%,3%,0) scale(1.08) skewX(-6deg);opacity:.85}}
  #dz-beams{position:fixed;inset:0;z-index:-1;pointer-events:none}
  #dz-beams i{position:absolute;top:0;bottom:0;left:var(--x);width:var(--w);filter:blur(6px);
    background:linear-gradient(180deg,rgba(var(--beam),0),rgba(var(--beam),.3) 30%,rgba(var(--beam),0) 88%);
    animation:dz-beam var(--d) ease-in-out infinite alternate}
  @keyframes dz-beam{from{opacity:.12;transform:scaleX(.6)}to{opacity:.8;transform:scaleX(1.25)}}
  #dz-embers{position:fixed;inset:0;z-index:4;pointer-events:none}
  #dz-flash{position:fixed;inset:0;z-index:90;pointer-events:none;opacity:0;
    background:radial-gradient(circle,#fff,rgba(var(--beam),.55) 60%,transparent)}
  #dz-flash.go{animation:dz-flash 1s ease-out}
  @keyframes dz-flash{0%{opacity:.9}100%{opacity:0}}

  #dz-phase{position:fixed;bottom:22px;right:22px;z-index:70;border:1px solid var(--border);
    background:var(--panel);color:var(--glow2);padding:10px 17px;border-radius:13px;font-size:12px;
    backdrop-filter:blur(10px);transition:.25s}
  #dz-phase:hover{border-color:var(--glow);transform:translateY(-2px);box-shadow:0 0 25px var(--glow)}

  .dz-wrap{position:relative;display:grid;place-items:center;width:100%}
  .dz-deity{position:relative;width:min(400px,86vw);aspect-ratio:400/480;color:var(--glow);
    animation:dz-float 6s ease-in-out infinite;filter:drop-shadow(0 0 30px var(--glow))}
  .dz-deity svg{width:100%;height:100%;overflow:visible;display:block}
  @keyframes dz-float{50%{transform:translateY(-16px)}}
  .dz-cap{position:absolute;bottom:-6px;font-size:10px;letter-spacing:4px;color:var(--glow2);opacity:.8}
  .dz-rays{transform-origin:200px 190px;animation:dz-spin 40s linear infinite}
  .dz-rings{transform-origin:200px 190px;animation:dz-spin 60s linear infinite reverse}
  @keyframes dz-spin{to{transform:rotate(360deg)}}
  .dz-core{transform-origin:200px 270px;animation:dz-pulse 2.4s ease-in-out infinite}
  @keyframes dz-pulse{50%{transform:scale(1.25);opacity:.8}}
  .dz-halo{transform-origin:200px 58px;animation:dz-halo 5s ease-in-out infinite}
  @keyframes dz-halo{50%{transform:scale(1.08) rotate(-3deg);opacity:.7}}
  .dz-head{transform:translate(calc(var(--mx,0)*6px),calc(var(--my,0)*4px))}
  .dz-pupils{transform:translate(calc(var(--mx,0)*3px),calc(var(--my,0)*2px))}
  .dz-eye{animation:dz-blink 6s infinite;transform-box:fill-box;transform-origin:center}
  @keyframes dz-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}
  .dz-star{animation:dz-tw 3s ease-in-out infinite alternate}
  @keyframes dz-tw{from{opacity:.15}to{opacity:1}}
  .dz-h{fill:#f2f7ff;stroke:currentColor;stroke-width:2;filter:drop-shadow(0 0 8px currentColor);
    transform-box:fill-box;transform-origin:50% 100%;opacity:.92;
    animation:dz-hand 5s ease-in-out infinite;animation-delay:var(--dl,0s)}
  @keyframes dz-hand{0%,100%{transform:scaleX(var(--s,1)) translateY(0) rotate(var(--r,0deg))}
    50%{transform:scaleX(var(--s,1)) translateY(-16px) rotate(calc(var(--r,0deg) + 9deg))}}
  body.no-motion .dz-deity,body.no-motion .dz-rays,body.no-motion .dz-rings,body.no-motion .dz-core,
  body.no-motion .dz-halo,body.no-motion .dz-h,body.no-motion #dz-aurora,body.no-motion #dz-beams i{animation:none!important}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const mk = (tag, id, html) => { const e = document.createElement(tag); if (id) e.id = id; if (html) e.innerHTML = html; document.body.appendChild(e); return e; };
  mk('div', 'dz-aurora');
  const beams = mk('div', 'dz-beams');
  for (let i = 0; i < 6; i++) {
    const b = document.createElement('i');
    b.style.cssText = `--x:${8 + Math.random() * 84}%;--w:${40 + Math.random() * 90}px;--d:${4 + Math.random() * 6}s`;
    b.style.animationDelay = (-Math.random() * 6) + 's';
    beams.appendChild(b);
  }
  const flash = mk('div', 'dz-flash');

  /* ---------- the entity ---------- */
  const HAND = 'M48 148C44 132 42 116 39 101L23 64C20 57 22 50 28 48C34 46 39 51 42 58L52 79L39 25C37 17 41 11 47 10C54 9 58 14 60 22L69 69L64 16C63 8 68 4 74 5C81 5 84 11 84 18L87 70L91 29C92 21 97 18 103 20C109 22 110 28 109 35L104 94C103 113 96 133 88 148Z';
  let rays = '', stars = '';
  for (let i = 0; i < 14; i++) rays += `<path d="M200 190 L${186 + 0} -200 L${214} -200Z" fill="url(#dz-ray)" transform="rotate(${i * (360 / 14)} 200 190)"/>`;
  for (let i = 0; i < 22; i++) {
    const x = 90 + Math.random() * 220, y = 190 + Math.random() * 270;
    stars += `<circle class="dz-star" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(Math.random() * 1.8 + .6).toFixed(1)}" fill="#fff" style="animation-delay:${(-Math.random() * 3).toFixed(1)}s"/>`;
  }
  const hand = (x, y, w, s, r, dl) =>
    `<g transform="translate(${x} ${y})"><svg x="0" y="0" width="${w}" height="${w * 1.25}" viewBox="0 0 120 150" overflow="visible"><path class="dz-h" style="--s:${s};--r:${r}deg;--dl:${dl}s" d="${HAND}"/></svg></g>`;

  const svg = `
  <svg viewBox="0 0 400 480" aria-hidden="true">
    <defs>
      <radialGradient id="dz-g"><stop offset="0" stop-color="currentColor" stop-opacity=".55"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient>
      <linearGradient id="dz-ray" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="currentColor" stop-opacity=".5"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient>
      <linearGradient id="dz-robe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101a38"/><stop offset="1" stop-color="#14060d"/></linearGradient>
      <linearGradient id="dz-face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#c8d0e2"/></linearGradient>
    </defs>
    <circle cx="200" cy="200" r="190" fill="url(#dz-g)"/>
    <g class="dz-rays">${rays}</g>
    <g class="dz-rings" fill="none" stroke="currentColor" stroke-width="1.2">
      <circle cx="200" cy="190" r="165" stroke-dasharray="3 9" opacity=".7"/>
      <circle cx="200" cy="190" r="195" stroke-dasharray="40 14" opacity=".35"/>
    </g>
    ${hand(2, 190, 86, 1, -8, 0)}${hand(34, 300, 74, 1, -18, -1.2)}${hand(40, 80, 60, 1, -25, -2.2)}
    ${hand(398, 190, 86, -1, 8, -.6)}${hand(366, 300, 74, -1, 18, -1.8)}${hand(360, 80, 60, -1, 25, -2.8)}
    <path d="M200 150C130 160 95 230 80 330C70 400 40 440 20 475L380 475C360 440 330 400 320 330C305 230 270 160 200 150Z" fill="url(#dz-robe)" stroke="currentColor" stroke-width="1.5" opacity=".97"/>
    ${stars}
    <g class="dz-core"><circle cx="200" cy="270" r="46" fill="url(#dz-g)"/>
      <path d="M200 232L209 261L238 270L209 279L200 308L191 279L162 270L191 261Z" fill="#fff"/></g>
    <g class="dz-head">
      <path class="dz-halo" d="M130 58a70 14 0 1 0 140 0a70 14 0 1 0-140 0" fill="none" stroke="currentColor" stroke-width="3"/>
      <path d="M160 72L148 28L176 56L200 10L224 56L252 28L240 72Z" fill="currentColor" opacity=".9"/>
      <path d="M200 60C165 60 150 90 152 125C154 160 175 190 200 198C225 190 246 160 248 125C250 90 235 60 200 60Z" fill="url(#dz-face)"/>
      <path class="dz-eye" d="M166 120Q179 107 192 120Q179 131 166 120Z" fill="currentColor"/>
      <path class="dz-eye" d="M208 120Q221 107 234 120Q221 131 208 120Z" fill="currentColor"/>
      <g class="dz-pupils" fill="#fff"><circle cx="179" cy="120" r="3"/><circle cx="221" cy="120" r="3"/></g>
      <circle cx="200" cy="90" r="5" fill="currentColor"/>
      <path d="M186 158Q200 166 214 158" fill="none" stroke="#2a2f45" stroke-width="2.5" stroke-linecap="round" opacity=".6"/>
    </g>
  </svg>`;

  const wrap = document.createElement('div');
  wrap.className = 'dz-wrap';
  wrap.innerHTML = `<div class="dz-deity">${svg}</div><div class="dz-cap">◈ THE WATCHER ◈</div>`;
  const hv = document.querySelector('.hero-visual');
  if (hv) {
    const orbit = hv.querySelector('.orbit'); if (orbit) orbit.style.display = 'none';
    hv.style.minHeight = '480px'; hv.appendChild(wrap);
  } else { document.body.appendChild(wrap); wrap.style.cssText = 'position:fixed;right:2%;bottom:0;width:300px;z-index:-1;opacity:.8'; }

  addEventListener('mousemove', e => {
    wrap.style.setProperty('--mx', (e.clientX / innerWidth * 2 - 1).toFixed(2));
    wrap.style.setProperty('--my', (e.clientY / innerHeight * 2 - 1).toFixed(2));
  });

  /* ---------- phases ---------- */
  const btn = mk('button', 'dz-phase');
  const label = () => btn.textContent = document.documentElement.classList.contains('wrath') ? '✦ بازگشت به نور' : '🔥 فاز خشم';
  let manual = false;
  const swap = (byUser) => {
    if (byUser) manual = true;
    flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
    setTimeout(() => { document.documentElement.classList.toggle('wrath'); label();
      if (typeof toast === 'function') toast(document.documentElement.classList.contains('wrath') ? 'فاز خشم آغاز شد 🔥' : 'نور بازگشت ✦'); }, 120);
  };
  btn.onclick = () => swap(true); label();
  setInterval(() => { if (!manual && !matchMedia('(prefers-reduced-motion:reduce)').matches) swap(false); }, 24000);

  /* ---------- embers / sparks ---------- */
  const cv = mk('canvas', 'dz-embers'), cx = cv.getContext('2d');
  let W, H, P = [];
  const fit = () => { W = cv.width = innerWidth; H = cv.height = innerHeight;
    P = Array.from({ length: Math.min(60, W / 22 | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + .6, v: Math.random() * .8 + .25, p: Math.random() * 6 })); };
  addEventListener('resize', fit); fit();
  (function loop(t) {
    cx.clearRect(0, 0, W, H);
    if (!document.body.classList.contains('no-motion')) {
      const wr = document.documentElement.classList.contains('wrath');
      for (const p of P) {
        p.y -= p.v; p.x += Math.sin(t / 900 + p.p) * .4;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        cx.globalAlpha = .35 + .5 * Math.abs(Math.sin(t / 600 + p.p));
        cx.fillStyle = wr ? '#ff7a45' : '#8bffe0';
        cx.shadowBlur = 10; cx.shadowColor = cx.fillStyle;
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.3); cx.fill();
      }
    }
    requestAnimationFrame(loop);
  })(0);
})();
