// Démo Synerglace : garde la page et ses fiches pour un usage sans réseau.
const CACHE = "synerglace-v3";
const FICHIERS = [
  "/synerglace",
  "/synerglace/fiches.js",
  "/synerglace/schemas.js",
  "/synerglace/journal.js",
  "/synerglace/logo.png",
  "/synerglace/manrope.woff2",
  "/synerglace/icon-192.png",
  "/synerglace/manifest.webmanifest",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(n => n.startsWith("synerglace-") && n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

// Réseau d'abord (contenu à jour), cache si pas de réseau.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin || !url.pathname.startsWith("/synerglace")) return;
  const cle = url.pathname;
  e.respondWith(
    fetch(e.request)
      .then(r => { if (r.ok) { const copie = r.clone(); caches.open(CACHE).then(c => c.put(cle, copie)); } return r; })
      .catch(() => caches.match(cle))
  );
});
