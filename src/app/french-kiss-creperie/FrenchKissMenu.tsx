"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const BG_ITEMS = [
  { e: "💋", top: "8%",  left: "4%",  size: 38, dur: 7  },
  { e: "🥞", top: "16%", left: "92%", size: 44, dur: 9  },
  { e: "🍓", top: "28%", left: "2%",  size: 30, dur: 6  },
  { e: "🧇", top: "38%", left: "95%", size: 42, dur: 8  },
  { e: "🇫🇷", top: "48%", left: "3%",  size: 34, dur: 7.5 },
  { e: "🇪🇸", top: "58%", left: "94%", size: 34, dur: 6.5 },
  { e: "🍫", top: "68%", left: "5%",  size: 36, dur: 8  },
  { e: "💋", top: "76%", left: "92%", size: 32, dur: 7  },
  { e: "🍌", top: "86%", left: "4%",  size: 30, dur: 9  },
  { e: "☕", top: "92%", left: "94%", size: 32, dur: 6  },
];

const css = `
.fk-root {
  --fk-red: #E63946;
  --fk-red-soft: #ffe4e7;
  --fk-black: #111;
  --fk-ink: #1f1f1f;
  --fk-muted: #555;
  --fk-paper: #ffffff;

  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(1200px 600px at 80% -10%, #fff5f6, transparent 60%),
    radial-gradient(900px 500px at -10% 100%, #fff5f6, transparent 60%),
    var(--fk-paper);
  color: var(--fk-ink);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
.fk-root * { box-sizing: border-box; }

.fk-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.fk-bg-item {
  position: absolute;
  opacity: 0;
  filter: saturate(1.1);
  user-select: none;
  will-change: transform, opacity;
}

.fk-menu {
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

/* ===== Brand ===== */
.fk-brand { display: flex; justify-content: center; margin-bottom: 28px; perspective: 800px; }
.fk-logo {
  width: 140px;
  height: 140px;
  border: 3px solid var(--fk-black);
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-align: center;
  position: relative;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  transform-origin: center;
  transition: box-shadow 0.3s ease;
  padding: 0;
  font: inherit;
  color: inherit;
  appearance: none;
  -webkit-appearance: none;
}
.fk-logo:focus-visible { outline: 3px solid var(--fk-red); outline-offset: 4px; }
.fk-logo:hover { box-shadow: 0 18px 40px rgba(230, 57, 70, 0.25); }
.fk-logo .fk-tower { font-size: 48px; line-height: 1; margin-bottom: 4px; }
.fk-logo .fk-kiss {
  position: absolute;
  top: 14px;
  right: 8px;
  font-size: 26px;
  transform: rotate(15deg);
  filter: drop-shadow(0 2px 4px rgba(230,57,70,0.4));
}
.fk-logo .fk-name-top {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--fk-red);
  margin-top: 6px;
}
.fk-logo .fk-name-bot {
  font-family: 'Dancing Script', cursive;
  font-size: 19px;
  color: var(--fk-ink);
  margin-top: -2px;
}
.fk-logo-hint {
  text-align: center;
  font-size: 11px;
  color: var(--fk-muted);
  margin-top: 6px;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.6;
}

/* ===== Section titles ===== */
.fk-section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 30px;
  letter-spacing: 3px;
  color: var(--fk-ink);
  margin: 0 0 22px;
  text-align: center;
  white-space: nowrap;
}
.fk-section-title .fk-dash {
  flex: 1;
  max-width: 90px;
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--fk-red) 0 8px, transparent 8px 14px);
  transform-origin: left center;
}
.fk-section-title .fk-dash.right { transform-origin: right center; }
.fk-section-title .fk-text { display: inline-block; }
.fk-section-title.fk-diamonds .fk-dash {
  background: linear-gradient(90deg, var(--fk-ink), var(--fk-ink));
  height: 2px;
  max-width: 220px;
  position: relative;
}
.fk-section-title.fk-diamonds .fk-diamond {
  font-size: 14px;
  color: var(--fk-ink);
}

/* ===== Signature row ===== */
.fk-signature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 36px;
}
.fk-signature-block .fk-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  position: relative;
  padding: 12px 0;
}
.fk-signature-card {
  text-align: center;
  padding: 0 6px;
  transition: transform 0.3s ease;
  cursor: default;
}
.fk-signature-card:hover { transform: translateY(-4px); }
.fk-signature-visual {
  font-size: 92px;
  line-height: 1;
  margin-bottom: 8px;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,0.18));
  display: inline-block;
  will-change: transform;
}
.fk-signature-name {
  font-family: 'Dancing Script', cursive;
  font-weight: 700;
  color: var(--fk-red);
  font-size: 24px;
  margin: 4px 0 6px;
}
.fk-signature-desc { font-size: 12.5px; color: var(--fk-ink); line-height: 1.45; }
.fk-signature-price {
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--fk-black);
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 19px;
  letter-spacing: 1px;
  padding: 7px 16px;
  border-radius: 999px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.28);
  will-change: transform;
}

/* ===== Price cards ===== */
.fk-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-bottom: 44px;
}
.fk-price-card {
  border: 2px solid var(--fk-red);
  border-radius: 16px;
  padding: 18px 22px 16px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(230, 57, 70, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.fk-price-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px rgba(230, 57, 70, 0.18);
}
.fk-price-card h3 {
  margin: 0 0 12px;
  text-align: center;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
  font-size: 22px;
  color: var(--fk-ink);
}
.fk-price-list { list-style: none; margin: 0; padding: 0; font-size: 14.5px; }
.fk-price-list li {
  display: grid;
  grid-template-columns: 26px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 5px 6px;
  border-radius: 8px;
  transition: background-color 0.2s ease, padding-left 0.2s ease;
}
.fk-price-list li:hover {
  background: var(--fk-red-soft);
  padding-left: 12px;
}
.fk-price-list .fk-icon { font-size: 18px; text-align: center; }
.fk-price-list .fk-label { display: flex; align-items: center; gap: 4px; }
.fk-price-list .fk-label::after {
  content: "";
  flex: 1;
  border-bottom: 1.5px dotted #ccc;
  margin: 0 6px;
}
.fk-price-list .fk-price { font-weight: 600; white-space: nowrap; color: var(--fk-ink); }

/* ===== Galettes ===== */
.fk-galettes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 44px;
  perspective: 1000px;
}
.fk-galette-card {
  text-align: center;
  padding: 18px 8px;
  border-radius: 18px;
  transition: transform 0.4s ease, background-color 0.4s ease;
  transform-style: preserve-3d;
}
.fk-galette-card:hover {
  background: linear-gradient(180deg, #fff8f9, transparent);
  transform: translateY(-6px) rotateX(4deg);
}
.fk-galette-visual {
  font-size: 96px;
  line-height: 1;
  margin-bottom: 10px;
  filter: drop-shadow(0 8px 12px rgba(0,0,0,0.2));
  display: inline-block;
  will-change: transform;
}
.fk-galette-header { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.fk-galette-pill {
  background: var(--fk-black);
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 15px;
  padding: 4px 12px;
  border-radius: 999px;
}
.fk-galette-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 1.5px;
  color: var(--fk-ink);
}
.fk-galette-desc { font-size: 13px; color: var(--fk-ink); line-height: 1.45; }

/* ===== Bottom row ===== */
.fk-bottom-row {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr 1fr;
  gap: 26px;
}
.fk-bottom-block .fk-mini-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: 2px;
  margin-bottom: 14px;
}
.fk-bottom-block .fk-mini-title::before,
.fk-bottom-block .fk-mini-title::after {
  content: "";
  flex: 1;
  border-top: 2px dashed var(--fk-red);
  max-width: 50px;
}
.fk-batidos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  position: relative;
  text-align: center;
}
.fk-batido { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.fk-batido .fk-visual {
  font-size: 64px;
  line-height: 1;
  will-change: transform;
  display: inline-block;
  cursor: default;
  transition: filter 0.2s ease;
}
.fk-batido:hover .fk-visual { filter: drop-shadow(0 6px 10px rgba(230,57,70,0.4)); }
.fk-batido .fk-name { font-size: 14px; color: var(--fk-ink); font-weight: 500; }
.fk-batidos-price {
  position: absolute;
  top: -10px;
  left: -6px;
  background: var(--fk-black);
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 16px;
  padding: 6px 14px;
  border-radius: 999px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.25);
  z-index: 2;
}
.fk-drinks-list { list-style: none; margin: 0; padding: 0; font-size: 14px; }
.fk-drinks-list li {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  padding: 5px 6px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}
.fk-drinks-list li:hover { background: var(--fk-red-soft); }
.fk-drinks-list .fk-label { display: flex; align-items: center; }
.fk-drinks-list .fk-label::after {
  content: "";
  flex: 1;
  border-bottom: 1.5px dotted #ccc;
  margin: 0 6px;
}
.fk-drinks-list .fk-price { font-weight: 600; }
.fk-coffee-visual, .fk-drinks-visual {
  text-align: center;
  font-size: 54px;
  line-height: 1;
  margin-bottom: 12px;
  will-change: transform;
}

.fk-footer { margin-top: 64px; text-align: center; font-size: 12px; color: var(--fk-muted); }
.fk-footer-heart { display: inline-block; color: var(--fk-red); }

@media (max-width: 880px) {
  .fk-signature-row, .fk-cards-row, .fk-bottom-row { grid-template-columns: 1fr; }
  .fk-galettes { grid-template-columns: 1fr; }
  .fk-signature-price { position: static; transform: none; display: inline-block; margin: 8px auto; }
}
@media (max-width: 480px) {
  .fk-menu { padding: 20px 14px 40px; }
  .fk-signature-block .fk-items { grid-template-columns: 1fr; }
  .fk-section-title { font-size: 24px; }
  .fk-signature-visual { font-size: 76px; }
  .fk-galette-visual { font-size: 80px; }
}

@media (prefers-reduced-motion: reduce) {
  .fk-bg { display: none; }
}
`;

const COLORS = ["#E63946", "#FFD700", "#111111", "#ffffff", "#7928CA"];

function burst(x: number, y: number, count = 80) {
  confetti({
    particleCount: count,
    spread: 70,
    startVelocity: 35,
    origin: { x, y },
    colors: COLORS,
    scalar: 1.05,
  });
}

export default function FrenchKissMenu() {
  const container = useRef<HTMLDivElement>(null);

  const handleLogoClick = useCallback(() => {
    const el = container.current?.querySelector<HTMLElement>(".fk-logo");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    burst(x, y, 120);

    gsap.fromTo(
      el,
      { rotation: 0 },
      { rotation: 360, duration: 0.9, ease: "back.out(2)" }
    );
    const kiss = el.querySelector(".fk-kiss");
    if (kiss) {
      gsap.fromTo(
        kiss,
        { scale: 1 },
        { scale: 1.8, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }
  }, []);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        // ===== Floating background items =====
        const bgItems = gsap.utils.toArray<HTMLElement>(".fk-bg-item");
        bgItems.forEach((el, i) => {
          gsap.to(el, {
            opacity: 0.09,
            duration: 1.5,
            delay: 0.4 + i * 0.05,
            ease: "power2.out",
          });
          gsap.to(el, {
            y: i % 2 === 0 ? -30 : 30,
            x: i % 3 === 0 ? 15 : -15,
            rotation: i % 2 === 0 ? 20 : -20,
            duration: 6 + (i % 4),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        // ===== Entrance timeline =====
        const tl = gsap.timeline();

        tl.from(".fk-logo", {
          scale: 0,
          rotation: -180,
          duration: 1,
          ease: "back.out(2)",
        })
          .from(
            ".fk-kiss",
            {
              y: -120,
              x: 80,
              rotation: 540,
              opacity: 0,
              duration: 0.7,
              ease: "back.out(2.5)",
            },
            "-=0.4"
          )
          .from(
            [".fk-name-top", ".fk-name-bot"],
            { y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
          )
          .from(
            ".fk-logo-hint",
            { y: 8, opacity: 0, duration: 0.4 },
            "-=0.2"
          );

        // logo gentle idle pulse
        gsap.to(".fk-logo", {
          y: -6,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.4,
        });

        // ===== Section title dashes draw in =====
        gsap.utils
          .toArray<HTMLElement>(".fk-section-title")
          .forEach((title) => {
            const dashes = title.querySelectorAll(".fk-dash");
            const text = title.querySelector(".fk-text");
            const diamonds = title.querySelectorAll(".fk-diamond");

            gsap.from(dashes, {
              scrollTrigger: { trigger: title, start: "top 88%" },
              scaleX: 0,
              duration: 0.7,
              ease: "power3.out",
            });
            if (text) {
              gsap.from(text, {
                scrollTrigger: { trigger: title, start: "top 88%" },
                scale: 0.6,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(2)",
              });
            }
            if (diamonds.length) {
              gsap.from(diamonds, {
                scrollTrigger: { trigger: title, start: "top 88%" },
                rotation: 180,
                scale: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(2)",
              });
            }
          });

        // ===== Signature cards =====
        gsap.utils
          .toArray<HTMLElement>(".fk-signature-block")
          .forEach((block) => {
            const cards = block.querySelectorAll(".fk-signature-card");
            const price = block.querySelector(".fk-signature-price");
            gsap.from(cards, {
              scrollTrigger: { trigger: block, start: "top 80%" },
              y: 50,
              opacity: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
            });
            if (price) {
              gsap.from(price, {
                scrollTrigger: { trigger: block, start: "top 80%" },
                scale: 0,
                rotation: -45,
                duration: 0.6,
                delay: 0.3,
                ease: "back.out(3)",
              });
              gsap.to(price, {
                rotation: 4,
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 1.2,
              });
            }
          });

        // floating signature visuals
        gsap.utils
          .toArray<HTMLElement>(".fk-signature-visual, .fk-galette-visual")
          .forEach((el, i) => {
            gsap.to(el, {
              y: -10,
              rotation: i % 2 === 0 ? 4 : -4,
              duration: 2.5 + (i % 3) * 0.4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: i * 0.1,
            });
          });

        // ===== Price cards =====
        gsap.utils
          .toArray<HTMLElement>(".fk-price-card")
          .forEach((card, i) => {
            gsap.from(card, {
              scrollTrigger: { trigger: card, start: "top 85%" },
              x: i % 2 === 0 ? -50 : 50,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            });
            gsap.from(card.querySelectorAll("li"), {
              scrollTrigger: { trigger: card, start: "top 80%" },
              y: 12,
              opacity: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.out",
            });
          });

        // ===== Galettes =====
        gsap.utils
          .toArray<HTMLElement>(".fk-galette-card")
          .forEach((card, i) => {
            gsap.from(card, {
              scrollTrigger: { trigger: card, start: "top 85%" },
              y: 40,
              rotationY: 90,
              opacity: 0,
              duration: 0.8,
              delay: i * 0.12,
              ease: "back.out(1.6)",
            });
          });

        // ===== Bottom row =====
        gsap.utils
          .toArray<HTMLElement>(".fk-bottom-block")
          .forEach((block, i) => {
            gsap.from(block, {
              scrollTrigger: { trigger: block, start: "top 88%" },
              y: 36,
              opacity: 0,
              duration: 0.7,
              delay: i * 0.1,
              ease: "power3.out",
            });
          });

        gsap.utils
          .toArray<HTMLElement>(".fk-batido .fk-visual")
          .forEach((el, i) => {
            gsap.to(el, {
              y: -8,
              rotation: i === 1 ? 0 : i === 0 ? -5 : 5,
              duration: 1.8 + i * 0.2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: i * 0.15,
            });
          });

        // coffee steam vibe
        gsap.to(".fk-coffee-visual", {
          y: -4,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // ===== Hover boosts on signature cards (pop the emoji) =====
        gsap.utils
          .toArray<HTMLElement>(".fk-signature-card")
          .forEach((card) => {
            const visual = card.querySelector(".fk-signature-visual");
            if (!visual) return;
            card.addEventListener("mouseenter", () => {
              gsap.to(visual, {
                scale: 1.15,
                rotation: 8,
                duration: 0.35,
                ease: "back.out(2)",
              });
            });
            card.addEventListener("mouseleave", () => {
              gsap.to(visual, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            });
          });

        // Galettes hover wiggle
        gsap.utils
          .toArray<HTMLElement>(".fk-galette-card")
          .forEach((card) => {
            const visual = card.querySelector(".fk-galette-visual");
            if (!visual) return;
            card.addEventListener("mouseenter", () => {
              gsap.to(visual, {
                rotation: 10,
                scale: 1.1,
                duration: 0.4,
                ease: "back.out(2)",
              });
            });
            card.addEventListener("mouseleave", () => {
              gsap.to(visual, {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            });
          });

        // ===== Footer heart beat =====
        gsap.to(".fk-footer-heart", {
          scale: 1.3,
          duration: 0.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@700&family=Inter:wght@400;500;600;700&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="fk-root">
        <div className="fk-bg" aria-hidden="true">
          {BG_ITEMS.map((it, i) => (
            <span
              key={i}
              className="fk-bg-item"
              style={{
                top: it.top,
                left: it.left,
                fontSize: `${it.size}px`,
              }}
            >
              {it.e}
            </span>
          ))}
        </div>

        <div className="fk-menu">
          <div className="fk-brand">
            <button
              type="button"
              className="fk-logo"
              onClick={handleLogoClick}
              aria-label="French Kiss Créperie — cliquer pour fêter ça"
            >
              <div>
                <div className="fk-tower">🗼</div>
                <div className="fk-name-top">FRENCH KISS</div>
                <div className="fk-name-bot">créperie</div>
              </div>
              <div className="fk-kiss">💋</div>
            </button>
          </div>
          <div className="fk-logo-hint">↑ clique sur le logo</div>

          <div className="fk-signature-row" style={{ marginTop: 18 }}>
            <section className="fk-signature-block">
              <h2 className="fk-section-title">
                <span className="fk-dash" />
                <span className="fk-text">CREPES SIGNATURE</span>
                <span className="fk-dash right" />
              </h2>
              <div className="fk-items">
                <div className="fk-signature-card">
                  <div className="fk-signature-visual">🥞</div>
                  <div className="fk-signature-name">French Kiss Crepe</div>
                  <div className="fk-signature-desc">
                    Nutella, Fresas, Nata Montada,
                    <br />
                    KitKat, Helado de vainilla
                  </div>
                </div>
                <div className="fk-signature-card">
                  <div className="fk-signature-visual">🍫</div>
                  <div className="fk-signature-name">Kinder Explosion</div>
                  <div className="fk-signature-desc">
                    Nutella, Platano, Nata Montada,
                    <br />
                    Kinder Bueno, Helado de vainilla
                  </div>
                </div>
                <div className="fk-signature-price">8,50€</div>
              </div>
            </section>

            <section className="fk-signature-block">
              <h2 className="fk-section-title">
                <span className="fk-dash" />
                <span className="fk-text">BUBBLE WAFFLES SIGNATURE</span>
                <span className="fk-dash right" />
              </h2>
              <div className="fk-items">
                <div className="fk-signature-card">
                  <div className="fk-signature-visual">🧇</div>
                  <div className="fk-signature-name">Strawberry Temptation</div>
                  <div className="fk-signature-desc">
                    Nutella, Fresas, Nata Montada,
                    <br />
                    KitKat, Helado de vainilla
                  </div>
                </div>
                <div className="fk-signature-card">
                  <div className="fk-signature-visual">🍨</div>
                  <div className="fk-signature-name">Kinder Bomb</div>
                  <div className="fk-signature-desc">
                    Nutella, Platano, Nata Montada,
                    <br />
                    Kinder Bueno, Helado de vainilla
                  </div>
                </div>
                <div className="fk-signature-price">8,50€</div>
              </div>
            </section>
          </div>

          <div className="fk-cards-row">
            <div className="fk-price-card">
              <h3>CREPES O BUBBLE WAFFLES</h3>
              <ul className="fk-price-list">
                <li><span className="fk-icon">🧈</span><span className="fk-label">Mantequilla y azúcar</span><span className="fk-price">4,00€</span></li>
                <li><span className="fk-icon">🍋</span><span className="fk-label">Limón y azúcar</span><span className="fk-price">4,50€</span></li>
                <li><span className="fk-icon">🍫</span><span className="fk-label">Nutella</span><span className="fk-price">5,50€</span></li>
                <li><span className="fk-icon">🥛</span><span className="fk-label">Dulce de leche</span><span className="fk-price">5,50€</span></li>
                <li><span className="fk-icon">🤍</span><span className="fk-label">Salsa chocolate blanco</span><span className="fk-price">5,50€</span></li>
                <li><span className="fk-icon">🍪</span><span className="fk-label">Salsa Biscoff</span><span className="fk-price">5,50€</span></li>
                <li><span className="fk-icon">🍫</span><span className="fk-label">Salsa Kitkat</span><span className="fk-price">5,50€</span></li>
                <li><span className="fk-icon">🌰</span><span className="fk-label">Salsa de pistacho</span><span className="fk-price">5,50€</span></li>
              </ul>
            </div>

            <div className="fk-price-card">
              <h3>EXTRAS</h3>
              <ul className="fk-price-list">
                <li><span className="fk-icon">🍓</span><span className="fk-label">Fresas</span><span className="fk-price">1,00€</span></li>
                <li><span className="fk-icon">🍌</span><span className="fk-label">Platanos</span><span className="fk-price">1,00€</span></li>
                <li><span className="fk-icon">🍦</span><span className="fk-label">Nata montada</span><span className="fk-price">1,00€</span></li>
                <li><span className="fk-icon">🍫</span><span className="fk-label">Kinder Bueno</span><span className="fk-price">1,00€</span></li>
                <li><span className="fk-icon">🍪</span><span className="fk-label">Oreo</span><span className="fk-price">1,00€</span></li>
                <li><span className="fk-icon">🍫</span><span className="fk-label">Kitkat</span><span className="fk-price">1,00€</span></li>
                <li><span className="fk-icon">🍪</span><span className="fk-label">Biscoff</span><span className="fk-price">1,00€</span></li>
                <li><span className="fk-icon">🍨</span><span className="fk-label">Helado de vainilla</span><span className="fk-price">2,00€</span></li>
              </ul>
            </div>
          </div>

          <h2 className="fk-section-title fk-diamonds">
            <span className="fk-diamond">◆</span>
            <span className="fk-dash" />
            <span className="fk-text">GALETTE DE TRIGO SARRACENO</span>
            <span className="fk-dash right" />
            <span className="fk-diamond">◆</span>
          </h2>
          <div className="fk-galettes">
            <div className="fk-galette-card">
              <div className="fk-galette-visual">🫓</div>
              <div className="fk-galette-header">
                <span className="fk-galette-pill">8,50€</span>
                <span className="fk-galette-name">CHORIZO FIRE</span>
              </div>
              <div className="fk-galette-desc">Chorizo, Queso,<br />Tomate, Rucula</div>
            </div>
            <div className="fk-galette-card">
              <div className="fk-galette-visual">🍳</div>
              <div className="fk-galette-header">
                <span className="fk-galette-pill">8,50€</span>
                <span className="fk-galette-name">COMPLETA SERRANO</span>
              </div>
              <div className="fk-galette-desc">Jamón Serrano, Queso,<br />Huevo, Tomate</div>
            </div>
            <div className="fk-galette-card">
              <div className="fk-galette-visual">🥬</div>
              <div className="fk-galette-header">
                <span className="fk-galette-pill">8,50€</span>
                <span className="fk-galette-name">GREEN DELIGHT</span>
              </div>
              <div className="fk-galette-desc">Queso, Champignones,<br />Tomate, Rucula</div>
            </div>
          </div>

          <div className="fk-bottom-row">
            <div className="fk-bottom-block">
              <div className="fk-mini-title">BATIDOS</div>
              <div className="fk-batidos-grid">
                <div className="fk-batidos-price">5,50€</div>
                <div className="fk-batido"><div className="fk-visual">🥤</div><div className="fk-name">Nutella</div></div>
                <div className="fk-batido"><div className="fk-visual">🥛</div><div className="fk-name">Vainilla</div></div>
                <div className="fk-batido"><div className="fk-visual">🍓</div><div className="fk-name">Fresa</div></div>
              </div>
            </div>

            <div className="fk-bottom-block">
              <div className="fk-mini-title">CAFÉS</div>
              <div className="fk-coffee-visual">☕</div>
              <ul className="fk-drinks-list">
                <li><span className="fk-label">Expresso</span><span className="fk-price">1,90€</span></li>
                <li><span className="fk-label">Cortado</span><span className="fk-price">2,20€</span></li>
                <li><span className="fk-label">Americano</span><span className="fk-price">2,40€</span></li>
                <li><span className="fk-label">Café con leche</span><span className="fk-price">2,70€</span></li>
                <li><span className="fk-label">Cappuccino</span><span className="fk-price">2,90€</span></li>
              </ul>
            </div>

            <div className="fk-bottom-block">
              <div className="fk-mini-title">BEBIDAS FRIAS</div>
              <div className="fk-drinks-visual">💧🥤</div>
              <ul className="fk-drinks-list">
                <li><span className="fk-label">Agua</span><span className="fk-price">1,50€</span></li>
                <li><span className="fk-label">Coca Cola</span><span className="fk-price">2,00€</span></li>
                <li><span className="fk-label">Fanta</span><span className="fk-price">2,00€</span></li>
                <li><span className="fk-label">Ice tea Limón</span><span className="fk-price">2,00€</span></li>
              </ul>
            </div>
          </div>

          <footer className="fk-footer">
            French Kiss Créperie · Menú · <span className="fk-footer-heart">❤</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
