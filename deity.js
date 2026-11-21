
/* NOCTURNE — DEITY CORE */

(() => {
  const orbit = document.querySelector(".hero-visual .orbit");
  if (!orbit || orbit.querySelector(".deity-aura")) return;

  const aura = document.createElement("div");
  aura.className = "deity-aura";

  const style = document.createElement("style");
  style.textContent = `
    .hero-visual .orbit {
      isolation: isolate;
    }

    .deity-aura {
      position: absolute;
      inset: -35px;
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      border: 1px solid rgba(167,139,250,.25);
      box-shadow:
        0 0 35px rgba(167,139,250,.12),
        inset 0 0 35px rgba(94,234,212,.08);
      animation: deityPulse 4s ease-in-out infinite;
    }

    .deity-aura::before,
    .deity-aura::after {
      content: "";
      position: absolute;
      inset: 18px;
      border-radius: 50%;
      border: 1px solid rgba(94,234,212,.2);
    }

    .deity-aura::before {
      transform: rotateX(65deg);
    }

    .deity-aura::after {
      transform: rotateY(65deg);
    }

    .deity-particle {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--cyan, #5eead4);
      box-shadow: 0 0 12px currentColor;
      pointer-events: none;
      animation: deityFloat 5s ease-in-out infinite;
    }

    @keyframes deityPulse {
      0%, 100% {
        opacity: .45;
        transform: scale(.96);
      }
      50% {
        opacity: 1;
        transform: scale(1.04);
      }
    }

    @keyframes deityFloat {
      0%, 100% {
        transform: translateY(0);
        opacity: .3;
      }
      50% {
        transform: translateY(-18px);
        opacity: 1;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .deity-aura,
      .deity-particle {
        animation: none !important;
      }
    }
  `;

  document.head.appendChild(style);
  orbit.appendChild(aura);

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("span");
    particle.className = "deity-particle";

    const angle = (i / 8) * Math.PI * 2;
    const radius = 135 + Math.random() * 25;

    particle.style.left =
      `calc(50% + ${Math.cos(angle) * radius}px)`;

    particle.style.top =
      `calc(50% + ${Math.sin(angle) * radius}px)`;

    particle.style.animationDelay = `${i * -0.6}s`;

    if (i % 2 === 0) {
      particle.style.background = "var(--purple, #a78bfa)";
    }

    orbit.appendChild(particle);
  }
})();
