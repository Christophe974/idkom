// Démo Synerglace : saison simulée 2025-2026 (3 patinoires de Belfort), déterministe.
// Toutes les données sont fictives mais cohérentes avec la météo de chaque jour.
(function () {
  let graine = 20251128;
  const alea = () => { graine = (graine * 1664525 + 1013904223) % 4294967296; return graine / 4294967296; };
  const entre = (a, b) => a + (b - a) * alea();
  const poisson = l => { let k = 0, p = 1; const L = Math.exp(-l); do { k++; p *= alea(); } while (p > L); return k - 1; };
  const choix = a => a[Math.floor(alea() * a.length)];

  const DEBUT = new Date(2025, 10, 28), JOURS = 38;
  const VACANCES = new Date(2025, 11, 20);

  // Météo jour par jour (Belfort) : épisodes successifs
  const EPISODES = [
    { j: 0,  n: 8, tmax: [2, 5],   tmin: [-4, -1], ciel: ["Ciel clair", "Nuageux"], hum: [65, 80] },
    { j: 8,  n: 5, tmax: [0, 2],   tmin: [-3, -1], ciel: ["Neige", "Neige", "Nuageux"], hum: [85, 95] },
    { j: 13, n: 7, tmax: [3, 6],   tmin: [-1, 2],  ciel: ["Brouillard", "Brouillard", "Nuageux"], hum: [90, 98] },
    { j: 20, n: 6, tmax: [10, 14], tmin: [4, 8],   ciel: ["Ciel clair", "Pluie", "Ciel clair", "Averses"], hum: [60, 85] },
    { j: 26, n: 8, tmax: [1, 4],   tmin: [-7, -3], ciel: ["Ciel clair"], hum: [55, 70] },
    { j: 34, n: 4, tmax: [6, 9],   tmin: [1, 4],   ciel: ["Pluie", "Nuageux"], hum: [80, 92] },
  ];
  const meteoJours = [];
  for (const e of EPISODES) for (let i = 0; i < e.n; i++) {
    const tmax = Math.round(entre(...e.tmax) * 10) / 10;
    meteoJours.push({ tmax, tmin: Math.round(Math.min(tmax - 3, entre(...e.tmin)) * 10) / 10, ciel: choix(e.ciel), hum: Math.round(entre(...e.hum)) });
  }

  // Exposition des sites
  const SITE = {
    "place-armes":   { freq: 1.3, soleil: 1.0, glycol: 2.2, son: 1.0, dmx: 1.0, tpe: 1.0 },
    "corbis":        { freq: 1.0, soleil: 1.7, glycol: 0.8, son: 0.9, dmx: 2.0, tpe: 1.6 },
    "marche-vosges": { freq: 0.8, soleil: 0.5, glycol: 0.7, son: 2.0, dmx: 0.8, tpe: 0.9 },
  };
  const pluie = c => c === "Pluie" || c === "Averses";
  // Taux journalier par fiche selon météo, affluence (a) et site (s)
  const TAUX = {
    "glace-molle":     (m, a, s) => (0.04 + Math.max(0, m.tmax - 6) * 0.22 + (pluie(m.ciel) ? 0.3 : 0)) * s.soleil,
    "groupe-froid":    (m, a, s) => 0.05 + (m.tmax > 10 ? 0.16 : 0),
    "fuite-glycol":    (m, a, s) => 0,
    "appoint-glycol":  (m, a, s) => 0.04 * s.glycol,
    "fissures":        (m, a, s) => 0.1 * a + (m.tmax > 8 ? 0.12 : 0),
    "givre-neige":     (m, a, s) => m.ciel === "Neige" ? 1.1 : m.ciel === "Brouillard" ? 0.55 : pluie(m.ciel) ? 0.45 : 0.02,
    "disjoncteur":     (m, a, s) => 0.05 + (pluie(m.ciel) ? 0.32 : 0) + (m.ciel === "Neige" ? 0.15 : 0),
    "coupure":         (m, a, s) => 0.002,
    "prises-humidite": (m, a, s) => pluie(m.ciel) || m.ciel === "Neige" ? 0.38 : m.ciel === "Brouillard" ? 0.2 : 0.01,
    "plus-de-son":     (m, a, s) => 0.07 * a * s.son,
    "xlr-speakon":     (m, a, s) => 0.035 * s.son,
    "dmx":             (m, a, s) => 0.045 * s.dmx,
    "micro-hf":        (m, a, s) => (0.04 + (m.tmax < 3 ? 0.11 : 0)) * a,
    "porte-givre":     (m, a, s) => m.tmin < -2 ? 0.34 : 0.015,
    "tpe":             (m, a, s) => 0.09 * a * s.tpe,
    "billetterie":     (m, a, s) => 0.035 * a,
    "affuteuse":       (m, a, s) => 0.035 * a,
  };
  const REGLE = { "glace-molle": .8, "groupe-froid": .55, "fuite-glycol": .15, "appoint-glycol": .9, "fissures": .9, "givre-neige": .95, "disjoncteur": .74, "coupure": .2, "prises-humidite": .8, "plus-de-son": .78, "xlr-speakon": .92, "dmx": .84, "micro-hf": .9, "porte-givre": .95, "tpe": .82, "billetterie": .9, "affuteuse": .7 };
  const NOTES = {
    "glace-molle": ["Eau en surface côté soleil", "Glace qui colle, patineurs qui tombent", "Flaque angle sud"],
    "groupe-froid": ["Code A12 haute pression", "Alarme après redémarrage secteur", "Ventilateurs pris dans les feuilles"],
    "fuite-glycol": ["Goutte-à-goutte flexible collecteur nord", "Raccord du collecteur nord, encore", "Flexible collecteur nord, 3e fois"],
    "appoint-glycol": ["Vase sous MIN au matin", "Appoint 6 L"],
    "fissures": ["Fissure près de la porte d'entrée piste", "Trou après chute, zone balisée", "Bosse au centre"],
    "givre-neige": ["10 cm de neige à l'ouverture", "Givre épais, glace rugueuse"],
    "disjoncteur": ["Différentiel chalet crêpes", "Disjoncteur éclairage après averse"],
    "coupure": ["Coupure quartier 18 min"],
    "prises-humidite": ["Prise du chalet vin chaud sous la gouttière", "Rallonge dans une flaque"],
    "plus-de-son": ["Ampli en PROTECT", "Câble Speakon enceinte gauche HS"],
    "xlr-speakon": ["Fiche XLR cassée", "Câble Speakon écrasé par une barrière"],
    "dmx": ["Projecteurs figés en rouge", "Tablette déconnectée du boîtier"],
    "micro-hf": ["Piles vides en 1 h avec le froid", "Micro qui coupe derrière la scène"],
    "porte-givre": ["Serrure chalet gelée à l'ouverture", "Volet bloqué par le givre"],
    "tpe": ["Pas de réseau 4G dans le chalet", "Batterie vide avec le froid"],
    "billetterie": ["Imprimante tickets bloquée"],
    "affuteuse": ["Meule qui vibre", "Arrêt d'urgence resté enfoncé"],
  };

  // Affluence par heure (10 h → 21 h), plus forte l'après-midi
  const HEURES = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const POIDS_H = [3, 4, 4, 5, 8, 10, 10, 9, 8, 6, 4];
  const heure = (fiche) => {
    if (fiche === "porte-givre") return 9 + entre(.4, 1.2);
    if (fiche === "givre-neige") return choix([9.5, 10, 10.2, 13, 15]);
    if (fiche === "glace-molle") return entre(12.5, 17.5);
    let r = alea() * POIDS_H.reduce((a, b) => a + b), i = 0;
    while ((r -= POIDS_H[i]) > 0) i++;
    return HEURES[i] + alea();
  };
  const tempA = (m, h) => {
    const k = h <= 15 ? Math.max(0, (h - 7) / 8) : Math.max(0, 1 - (h - 15) / 12);
    return Math.round((m.tmin + (m.tmax - m.tmin) * k) * 10) / 10;
  };

  const FUITES = ["Goutte-à-goutte flexible collecteur nord", "Flexible collecteur nord, encore", "Flexible collecteur nord, 3e fois"];
  const interventions = [];
  for (let j = 0; j < JOURS; j++) {
    const d = new Date(DEBUT); d.setDate(d.getDate() + j);
    const m = meteoJours[j], we = d.getDay() === 0 || d.getDay() === 6;
    const aff = (we ? 1.8 : 1) * (d >= VACANCES ? 1.5 : 1);
    for (const [site, s] of Object.entries(SITE)) for (const [fiche, f] of Object.entries(TAUX)) {
      let n = poisson(f(m, aff * s.freq, s));
      if (fiche === "coupure" && j === 22 && site === "place-armes") n = 1;
      // Fuite récurrente sur le même flexible du collecteur nord (Place d'Armes)
      if (fiche === "fuite-glycol" && site === "place-armes" && [5, 17, 31].includes(j)) n = 1;
      for (let k = 0; k < n; k++) {
        const h = heure(fiche), t = new Date(d); t.setHours(Math.floor(h), Math.floor((h % 1) * 60));
        const F = FICHES.find(x => x.id === fiche);
        const regle = alea() < REGLE[fiche];
        const photo = F.niveau === "rouge" ? alea() < .8 : alea() < .14;
        interventions.push({
          t: +t, site, fiche, cat: F.cat, regle,
          appel: regle ? null : (fiche === "coupure" ? "enedis" : F.appel[0]),
          signal: photo, note: photo ? choix(NOTES[fiche]) : "",
          meteo: { temp: tempA(m, h), hum: m.hum, ciel: m.ciel },
          duree: Math.round(entre(2, 9) + (regle ? 0 : 4)),
        });
        if (fiche === "fuite-glycol") Object.assign(interventions[interventions.length - 1], { signal: true, note: FUITES.shift(), regle: false, appel: "astreinte" });
      }
    }
  }
  interventions.sort((a, b) => a.t - b.t);

  window.SAISON = {
    debut: +DEBUT, jours: JOURS, vacances: +VACANCES,
    meteo: meteoJours.map((m, j) => { const d = new Date(DEBUT); d.setDate(d.getDate() + j); return { ...m, d: +d }; }),
    interventions,
    recherchesVides: [["surfaceuse", 11], ["chauffage chalet", 8], ["wifi", 7], ["objet trouvé", 6], ["taille patins", 5], ["toilettes bouchées", 3]],
  };
})();
