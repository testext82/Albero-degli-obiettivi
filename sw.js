const CACHE = "albero-obiettivi-v15";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/supabase.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./assets/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // lascia passare CDN (font, PDF) alla rete
  if (url.pathname.endsWith("/sync-config.js")) return; // config sempre dalla rete
  if (/supabase\.(co|in)$/.test(url.hostname)) return; // mai in cache la sincronizzazione
  if (url.hostname === "esm.sh") {                       // libreria supabase: cache-first, così l'app parte anche con rete lenta
    e.respondWith(
      caches.match(req).then((cached) => {
        const net = fetch(req).then((res) => {
          if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {}); }
          return res;
        }).catch(() => cached);
        return cached || net;
      })
    );
    return;
  }
  if (url.search.includes("code=")) return; // ritorno dall'accesso: sempre dalla rete
  e.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
