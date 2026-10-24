// Démo Synerglace : journal des interventions, gardé sur l'appareil (pas de serveur).
// La météo de Belfort est captée à chaque enregistrement : l'agent ne la voit pas,
// elle sert au tableau de bord Synerglace.
(function () {
  const CLE = "sg-journal", CLE_METEO = "sg-meteo", MAX = 80, MAX_PHOTOS = 12;
  const URL_METEO = "https://api.open-meteo.com/v1/forecast?latitude=47.64&longitude=6.86&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Europe%2FParis";

  // Codes météo WMO → libellé court
  const WMO = [[0, "Ciel clair"], [3, "Nuageux"], [48, "Brouillard"], [57, "Bruine"], [67, "Pluie"], [77, "Neige"], [82, "Averses"], [86, "Averses de neige"], [99, "Orage"]];
  const libelle = c => (WMO.find(([max]) => c <= max) || WMO[WMO.length - 1])[1];

  const lireLS = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const ecrireLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  let enCours = null;
  function meteo() {
    const m = lireLS(CLE_METEO, null);
    if (m && Date.now() - m.t < 15 * 60e3) return Promise.resolve(m);
    if (enCours) return enCours;
    enCours = fetch(URL_METEO).then(r => r.json()).then(j => {
      const c = j.current;
      const v = { t: Date.now(), temp: Math.round(c.temperature_2m * 10) / 10, hum: Math.round(c.relative_humidity_2m), vent: Math.round(c.wind_speed_10m), code: c.weather_code, ciel: libelle(c.weather_code) };
      ecrireLS(CLE_METEO, v);
      return v;
    }).catch(() => m).finally(() => { enCours = null; });
    return enCours;
  }

  function lire() { return lireLS(CLE, []); }

  function enregistrer(liste) {
    // Garde les plus récents ; retire les photos les plus anciennes si la place manque
    liste = liste.slice(0, MAX);
    let n = 0;
    liste.forEach(e => { if (e.photo && ++n > MAX_PHOTOS) delete e.photo; });
    while (!ecrireLS(CLE, liste) && liste.some(e => e.photo)) {
      const der = [...liste].reverse().find(e => e.photo); delete der.photo;
    }
  }

  async function ajouter(ev) {
    const e = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), t: Date.now(), ...ev };
    enregistrer([e, ...lire()]);
    const m = await meteo();
    if (m) {
      const l = lire(), x = l.find(y => y.id === e.id);
      if (x) { x.meteo = { temp: m.temp, hum: m.hum, vent: m.vent, ciel: m.ciel }; enregistrer(l); }
    }
    return e;
  }

  // Photo réduite à 640 px pour tenir dans le stockage du téléphone
  function reduirePhoto(fichier) {
    return new Promise((ok, ko) => {
      const img = new Image(), url = URL.createObjectURL(fichier);
      img.onload = () => {
        const k = Math.min(1, 640 / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        ok(cv.toDataURL("image/jpeg", .68));
      };
      img.onerror = ko; img.src = url;
    });
  }

  function vider() { try { localStorage.removeItem(CLE); } catch (e) {} }

  window.Journal = { ajouter, lire, meteo, reduirePhoto, vider, libelle };
})();
