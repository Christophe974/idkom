import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "French Kiss Créperie — Menú",
  description:
    "Carta French Kiss Créperie : crêpes signature, bubble waffles, galettes de trigo sarraceno, batidos, cafés y bebidas frías.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.idkom.fr/french-kiss-creperie" },
  openGraph: {
    title: "French Kiss Créperie — Menú",
    description:
      "Crêpes signature, bubble waffles, galettes salées, batidos y bebidas.",
    type: "website",
    url: "https://www.idkom.fr/french-kiss-creperie",
  },
};

const css = `
.fk-root {
  --fk-red: #E63946;
  --fk-black: #111;
  --fk-ink: #1f1f1f;
  --fk-muted: #555;
  --fk-paper: #ffffff;

  min-height: 100vh;
  background: var(--fk-paper);
  color: var(--fk-ink);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.fk-root * { box-sizing: border-box; }

.fk-menu {
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.fk-brand { display: flex; justify-content: center; margin-bottom: 28px; }
.fk-logo {
  width: 130px;
  height: 130px;
  border: 3px solid var(--fk-black);
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-align: center;
  position: relative;
  background: #fff;
}
.fk-logo .fk-tower { font-size: 46px; line-height: 1; margin-bottom: 4px; }
.fk-logo .fk-kiss { position: absolute; top: 14px; right: 8px; font-size: 24px; transform: rotate(15deg); }
.fk-logo .fk-name-top {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--fk-red);
  margin-top: 6px;
}
.fk-logo .fk-name-bot {
  font-family: 'Dancing Script', cursive;
  font-size: 18px;
  color: var(--fk-ink);
  margin-top: -2px;
}

.fk-section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  letter-spacing: 3px;
  color: var(--fk-ink);
  margin: 0 0 20px;
  text-align: center;
}
.fk-section-title::before,
.fk-section-title::after {
  content: "";
  flex: 1;
  max-width: 90px;
  border-top: 2px dashed var(--fk-red);
}
.fk-section-title.fk-diamonds::before { content: "◆ ───"; border: none; color: var(--fk-ink); }
.fk-section-title.fk-diamonds::after { content: "─── ◆"; border: none; color: var(--fk-ink); }

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
}
.fk-signature-card { text-align: center; padding: 0 6px; }
.fk-signature-visual {
  font-size: 88px;
  line-height: 1;
  margin-bottom: 8px;
  filter: drop-shadow(0 6px 8px rgba(0,0,0,0.12));
}
.fk-signature-name {
  font-family: 'Dancing Script', cursive;
  font-weight: 700;
  color: var(--fk-red);
  font-size: 22px;
  margin: 4px 0 6px;
}
.fk-signature-desc { font-size: 12.5px; color: var(--fk-ink); line-height: 1.4; }
.fk-signature-price {
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--fk-black);
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 6px 14px;
  border-radius: 999px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.25);
}

.fk-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-bottom: 40px;
}
.fk-price-card {
  border: 2px solid var(--fk-red);
  border-radius: 14px;
  padding: 18px 22px 16px;
  background: #fff;
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
  padding: 4px 0;
}
.fk-price-list .fk-icon { font-size: 18px; text-align: center; }
.fk-price-list .fk-label { display: flex; align-items: center; gap: 4px; }
.fk-price-list .fk-label::after {
  content: "";
  flex: 1;
  border-bottom: 1.5px dotted #bbb;
  margin: 0 6px;
}
.fk-price-list .fk-price { font-weight: 600; white-space: nowrap; }

.fk-galettes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}
.fk-galette-card { text-align: center; }
.fk-galette-visual {
  font-size: 90px;
  line-height: 1;
  margin-bottom: 10px;
  filter: drop-shadow(0 6px 8px rgba(0,0,0,0.15));
}
.fk-galette-header { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.fk-galette-pill {
  background: var(--fk-black);
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 15px;
  padding: 4px 10px;
  border-radius: 999px;
}
.fk-galette-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 1.5px;
  color: var(--fk-ink);
}
.fk-galette-desc { font-size: 13px; color: var(--fk-ink); line-height: 1.45; }

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
.fk-batido .fk-visual { font-size: 62px; line-height: 1; }
.fk-batido .fk-name { font-size: 14px; color: var(--fk-ink); font-weight: 500; }
.fk-batidos-price {
  position: absolute;
  top: -8px;
  left: -4px;
  background: var(--fk-black);
  color: #fff;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 15px;
  padding: 5px 12px;
  border-radius: 999px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.fk-drinks-list { list-style: none; margin: 0; padding: 0; font-size: 14px; }
.fk-drinks-list li { display: grid; grid-template-columns: 1fr auto; gap: 8px; padding: 5px 0; }
.fk-drinks-list .fk-label { display: flex; align-items: center; }
.fk-drinks-list .fk-label::after {
  content: "";
  flex: 1;
  border-bottom: 1.5px dotted #bbb;
  margin: 0 6px;
}
.fk-drinks-list .fk-price { font-weight: 600; }
.fk-coffee-visual, .fk-drinks-visual { text-align: center; font-size: 54px; line-height: 1; margin-bottom: 12px; }

.fk-footer { margin-top: 56px; text-align: center; font-size: 12px; color: var(--fk-muted); }

@media (max-width: 880px) {
  .fk-signature-row, .fk-cards-row, .fk-bottom-row { grid-template-columns: 1fr; }
  .fk-galettes { grid-template-columns: 1fr; }
  .fk-signature-price { position: static; transform: none; display: inline-block; margin: 8px auto; }
}
@media (max-width: 480px) {
  .fk-menu { padding: 20px 14px 40px; }
  .fk-signature-block .fk-items { grid-template-columns: 1fr; }
  .fk-section-title { font-size: 22px; }
  .fk-signature-visual { font-size: 72px; }
}
`;

export default function FrenchKissCreperiePage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@700&family=Inter:wght@400;500;600;700&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="fk-root">
        <div className="fk-menu">
          <div className="fk-brand">
            <div className="fk-logo" aria-label="French Kiss Créperie">
              <div>
                <div className="fk-tower">🗼</div>
                <div className="fk-name-top">FRENCH KISS</div>
                <div className="fk-name-bot">créperie</div>
              </div>
              <div className="fk-kiss">💋</div>
            </div>
          </div>

          <div className="fk-signature-row">
            <section className="fk-signature-block">
              <h2 className="fk-section-title">CREPES SIGNATURE</h2>
              <div className="fk-items">
                <div className="fk-signature-card">
                  <div className="fk-signature-visual">🥞</div>
                  <div className="fk-signature-name">French Kiss Crepe</div>
                  <div className="fk-signature-desc">
                    Nutella, Fresas, Nata Montada,<br />
                    KitKat, Helado de vainilla
                  </div>
                </div>
                <div className="fk-signature-card">
                  <div className="fk-signature-visual">🍫</div>
                  <div className="fk-signature-name">Kinder Explosion</div>
                  <div className="fk-signature-desc">
                    Nutella, Platano, Nata Montada,<br />
                    Kinder Bueno, Helado de vainilla
                  </div>
                </div>
                <div className="fk-signature-price">8,50€</div>
              </div>
            </section>

            <section className="fk-signature-block">
              <h2 className="fk-section-title">BUBBLE WAFFLES SIGNATURE</h2>
              <div className="fk-items">
                <div className="fk-signature-card">
                  <div className="fk-signature-visual">🧇</div>
                  <div className="fk-signature-name">Strawberry Temptation</div>
                  <div className="fk-signature-desc">
                    Nutella, Fresas, Nata Montada,<br />
                    KitKat, Helado de vainilla
                  </div>
                </div>
                <div className="fk-signature-card">
                  <div className="fk-signature-visual">🍨</div>
                  <div className="fk-signature-name">Kinder Bomb</div>
                  <div className="fk-signature-desc">
                    Nutella, Platano, Nata Montada,<br />
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

          <h2 className="fk-section-title fk-diamonds">GALETTE DE TRIGO SARRACENO</h2>
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

          <footer className="fk-footer">French Kiss Créperie · Menú</footer>
        </div>
      </div>
    </>
  );
}
