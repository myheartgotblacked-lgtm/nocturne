/* NOCTURNE — DEITY CORE 2.0 */
(() => {
  "use strict";

  const orbit = document.querySelector("[data-deity-core]");
  if (!orbit || orbit.dataset.deityReady === "true") return;
  orbit.dataset.deityReady = "true";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const visual = orbit.closest(".hero-visual");
  const style = document.createElement("style");
  style.dataset.deityStyle = "true";
  style.textContent = `
    .hero-visual { perspective: 900px; }
    .hero-visual .orbit { isolation: isolate; transform-style: preserve-3d; }
    .deity-aura {
      position:absolute; inset:-38px; z-index:-1; border-radius:50%; pointer-events:none;
      border:1px solid rgba(167,139,250,.34);
      background:radial-gradient(circle at var(--deity-x,50%) var(--deity-y,50%),rgba(94,234,212,.13),transparent 48%);
      box-shadow:0 0 34px rgba(139,92,246,.12),inset 0 0 40px rgba(94,234,212,.08);
      animation:deityBreathe 6s ease-in-out infinite;
    }
    .deity-ring {
      position:absolute; inset:-20px; border:1px solid rgba(94,234,212,.2); border-radius:50%;
      pointer-events:none; transform:rotateX(65deg) rotateZ(var(--ring-angle));
      box-shadow:0 0 18px rgba(94,234,212,.06);
    }
    .deity-ring.ring-two { inset:-6px; border-color:rgba(167,139,250,.2); transform:rotateY(65deg) rotateZ(-24deg); }
    .deity-ring.ring-three { inset:18px; border-style:dashed; border-color:rgba(94,234,212,.17); transform:rotateX(72deg) rotateZ(20deg); }
    .deity-sigil {
      position:absolute; left:50%; top:50%; z-index:2; transform:translate(-50%,-50%);
      color:#f4eaff; font-size:27px; line-height:1; text-shadow:0 0 12px #b78dff,0 0 30px rgba(94,234,212,.75);
      pointer-events:none; animation:deitySigil 4s ease-in-out infinite;
    }
    .deity-particle {
      position:absolute; width:4px; height:4px; border-radius:50%; pointer-events:none;
      background:var(--particle-color,#5eead4); box-shadow:0 0 9px currentColor;
      animation:deityDrift var(--particle-duration,5s) ease-in-out var(--particle-delay,0s) infinite;
    }
    .deity-paused .deity-aura,.deity-paused .deity-ring,.deity-paused .deity-sigil,.deity-paused .deity-particle,
    .no-motion .deity-aura,.no-motion .deity-ring,.no-motion .deity-sigil,.no-motion .deity-particle { animation-play-state:paused !important; }
    @keyframes deityBreathe { 0%,100% { opacity:.55; transform:scale(.98); } 50% { opacity:1; transform:scale(1.025); } }
    @keyframes deitySigil { 0%,100% { opacity:.75; } 50% { opacity:1; } }
    @keyframes deityDrift { 0%,100% { opacity:.28; transform:translate3d(0,0,0) scale(.8); } 50% { opacity:.95; transform:translate3d(0,-10px,0) scale(1.15); } }
    @media(prefers-reduced-motion:reduce) {
      .deity-aura,.deity-ring,.deity-sigil,.deity-particle { animation:none !important; }
      .deity-particle { opacity:.55; }
    }
  `;
  document.head.appendChild(style);

  const aura = document.createElement("span");
  aura.className = "deity-aura";
  aura.setAttribute("aria-hidden", "true");
  orbit.prepend(aura);

  ["ring-one", "ring-two", "ring-three"].forEach((name, index) => {
    const ring = document.createElement("span");
    ring.className = `deity-ring ${name}`;
    ring.style.setProperty("--ring-angle", `${index * 37}deg`);
    ring.setAttribute("aria-hidden", "true");
    orbit.appendChild(ring);
  });

  const sigil = document.createElement("span");
  sigil.className = "deity-sigil";
  sigil.textContent = "✦";
  sigil.setAttribute("aria-hidden", "true");
  orbit.appendChild(sigil);

  const particleCount = reduceMotion.matches ? 4 : 8;
  for (let index = 0; index < particleCount; index += 1) {
    const angle = (index / particleCount) * Math.PI * 2;
    const radius = 142 + (index % 3) * 13;
    const particle = document.createElement("span");
    particle.className = "deity-particle";
    particle.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
    particle.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
    particle.style.setProperty("--particle-color", index % 2 ? "#a78bfa" : "#5eead4");
    particle.style.setProperty("--particle-duration", `${4.5 + (index % 4) * .6}s`);
    particle.style.setProperty("--particle-delay", `${index * -.55}s`);
    particle.setAttribute("aria-hidden", "true");
    orbit.appendChild(particle);
  }

  let pointerFrame = 0;
  if (visual && !reduceMotion.matches && window.matchMedia("(pointer:fine)").matches) {
    visual.addEventListener("pointermove", event => {
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        const bounds = visual.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
        const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
        aura.style.setProperty("--deity-x", `${x}%`);
        aura.style.setProperty("--deity-y", `${y}%`);
      });
    }, { passive:true });
    visual.addEventListener("pointerleave", () => {
      aura.style.setProperty("--deity-x", "50%");
      aura.style.setProperty("--deity-y", "50%");
    }, { passive:true });
  }

  const syncMotion = () => orbit.classList.toggle("deity-paused", document.hidden || reduceMotion.matches);
  document.addEventListener("visibilitychange", syncMotion);
  reduceMotion.addEventListener?.("change", syncMotion);
  syncMotion();
})();