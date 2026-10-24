// Schémas simplifiés (SVG). Couleurs via variables CSS de la page.
(function () {
  const T = (x, y, s, o = "") => `<text x="${x}" y="${y}" ${o}>${s}</text>`;
  const vanne = (x, y) => `<g class="vanne" transform="translate(${x} ${y})"><path d="M-9 -7 L9 7 L9 -7 L-9 7 Z"/><line x1="0" y1="0" x2="0" y2="-13"/><line x1="-6" y1="-13" x2="6" y2="-13"/></g>`;

  window.SCHEMAS = {
    glycol: {
      titre: "Circuit glycol",
      legende: "Le groupe refroidit le glycol, la pompe l'envoie dans les tubes sous la glace, il revient se refroidir. Les vannes isolent chaque branche.",
      svg: `<svg viewBox="0 0 340 230" role="img" aria-label="Schéma du circuit glycol">
        <rect class="bloc" x="10" y="80" width="78" height="70" rx="8"/>${T(49, 110, "GROUPE", 'class="tb"')}${T(49, 126, "FROID", 'class="tb"')}
        <rect class="bloc" x="22" y="18" width="54" height="34" rx="6"/>${T(49, 33, "VASE", 'class="ts"')}${T(49, 45, "MIN–MAX", 'class="ts"')}
        <line class="tuyau" x1="49" y1="52" x2="49" y2="80"/>
        <circle class="bloc" cx="130" cy="95" r="15"/>${T(130, 99, "P", 'class="tb"')}${T(130, 70, "pompe", 'class="ts"')}
        <line class="tuyau froid" x1="88" y1="95" x2="115" y2="95"/>
        <line class="tuyau froid" x1="145" y1="95" x2="200" y2="95"/>
        <line class="tuyau chaud" x1="88" y1="135" x2="200" y2="135"/>
        ${vanne(172, 95)}${T(172, 116, "V1", 'class="ts"')}
        ${vanne(172, 135)}${T(172, 156, "V2", 'class="ts"')}
        <rect class="piste" x="200" y="62" width="130" height="106" rx="10"/>
        <path class="serp" d="M200 95 H316 V108 H214 V121 H316 V135 H200"/>
        ${T(265, 84, "PISTE", 'class="ts"')}${T(265, 158, "tubes sous la glace", 'class="ts"')}
        ${T(120, 190, "→ départ froid", 'class="ts froidt"')}${T(120, 206, "← retour", 'class="ts chaudt"')}
        ${T(49, 172, "Purgeur : point haut", 'class="ts"')}
      </svg>`,
    },
    tableau: {
      titre: "Tableau électrique",
      legende: "Levier en haut = en marche. Un disjoncteur qui a sauté est en bas ou à mi-course : le baisser à fond puis le remonter.",
      svg: `<svg viewBox="0 0 340 230" role="img" aria-label="Schéma du tableau électrique">
        <rect class="bloc" x="10" y="10" width="320" height="168" rx="10"/>
        ${[["GÉNÉRAL", 1], ["GROUPE FROID", 1], ["ÉCLAIRAGE", 1], ["SON", 0], ["CHALETS", 1]].map(([n, on], i) => {
          const x = 22 + i * 62;
          return `<g><rect class="${i === 0 ? "dj gen" : "dj"}" x="${x}" y="34" width="50" height="96" rx="6"/>
            <rect class="levier ${on ? "on" : "off"}" x="${x + 16}" y="${on ? 46 : 92}" width="18" height="28" rx="4"/>
            ${T(x + 25, 150, n.split(" ")[0], 'class="ts"')}${n.includes(" ") ? T(x + 25, 163, n.split(" ")[1], 'class="ts"') : ""}
            ${on ? "" : T(x + 25, 26, "SAUTÉ", 'class="ts alerte"')}</g>`;
        }).join("")}
        <circle class="testbtn" cx="47" cy="119" r="6"/>${T(47, 122, "T", 'class="tt"')}
        ${T(170, 202, "Bouton « T » = différentiel 30 mA : il saute surtout avec l'humidité", 'class="ts"')}
        ${T(170, 220, "Ressaute 2 fois → électricien", 'class="ts alerte"')}
      </svg>`,
    },
    son: {
      titre: "Chaîne du son",
      legende: "Le son voyage de gauche à droite. On cherche la panne étape par étape, en commençant par la source.",
      svg: `<svg viewBox="0 0 340 210" role="img" aria-label="Schéma de la chaîne son">
        <rect class="bloc" x="8" y="70" width="62" height="56" rx="8"/>${T(39, 95, "SOURCE", 'class="ts"')}${T(39, 110, "tél. / ordi", 'class="ts"')}
        <rect class="bloc" x="96" y="70" width="70" height="56" rx="8"/>${T(131, 95, "TABLE", 'class="ts"')}${T(131, 110, "mixage", 'class="ts"')}
        <rect class="bloc" x="192" y="70" width="62" height="56" rx="8"/>${T(223, 95, "AMPLI", 'class="ts"')}${T(223, 110, "PROTECT ?", 'class="ts alerte"')}
        <rect class="bloc" x="284" y="20" width="46" height="66" rx="6"/><circle class="hp" cx="307" cy="62" r="13"/><circle class="hp" cx="307" cy="34" r="6"/>
        <rect class="bloc" x="284" y="112" width="46" height="66" rx="6"/><circle class="hp" cx="307" cy="154" r="13"/><circle class="hp" cx="307" cy="126" r="6"/>
        <line class="cable" x1="70" y1="98" x2="96" y2="98"/>
        <line class="cable xlr" x1="166" y1="98" x2="192" y2="98"/>
        <path class="cable spk" d="M254 92 H268 V53 H284"/><path class="cable spk" d="M254 104 H268 V145 H284"/>
        ${T(83, 145, "jack / BT", 'class="ts"')}${T(179, 145, "XLR", 'class="ts xlrt"')}${T(307, 103, "SPEAKON", 'class="ts spkt"')}
        ${T(170, 30, "① source  ② table  ③ ampli  ④ enceintes", 'class="ts"')}
        ${T(170, 196, "Allumer dans l'ordre ① → ③", 'class="ts"')}
      </svg>`,
    },
    connecteurs: {
      titre: "Connecteurs XLR et Speakon",
      legende: "XLR : enfoncer jusqu'au clic. Speakon : enfoncer puis quart de tour à droite.",
      svg: `<svg viewBox="0 0 340 206" role="img" aria-label="Brochage XLR et Speakon">
        <circle class="bloc" cx="85" cy="90" r="58"/>
        <circle class="pin" cx="62" cy="76" r="9"/>${T(62, 80, "1", 'class="tt"')}
        <circle class="pin" cx="108" cy="76" r="9"/>${T(108, 80, "2", 'class="tt"')}
        <circle class="pin" cx="85" cy="114" r="9"/>${T(85, 118, "3", 'class="tt"')}
        <rect class="pin" x="80" y="30" width="10" height="10" rx="2"/>
        ${T(85, 168, "XLR", 'class="tb"')}${T(85, 184, "1 masse · 2 point chaud", 'class="ts"')}${T(85, 197, "3 point froid", 'class="ts"')}
        <circle class="bloc" cx="255" cy="90" r="58"/>
        <circle class="hp" cx="255" cy="90" r="30"/>
        <rect class="pin" x="249" y="26" width="12" height="16" rx="2"/>
        <circle class="pin" cx="232" cy="90" r="7"/>${T(232, 93, "+", 'class="tt"')}
        <circle class="pin" cx="278" cy="90" r="7"/>${T(278, 93, "−", 'class="tt"')}
        <path class="fleche" d="M300 54 A52 52 0 0 1 308 100"/><path class="fleche" d="M303 92 L308 101 L314 92"/>
        ${T(255, 168, "SPEAKON", 'class="tb"')}${T(255, 186, "¼ de tour à droite → clic", 'class="ts"')}
      </svg>`,
    },
  };
})();
