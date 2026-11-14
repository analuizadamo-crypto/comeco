// Começo service worker — makes the app open offline. Bump VERSION when you change index.html.
const VERSION = 'comeco-v10';
const CORE = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const put = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return res; };

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // The app page: try the network first (so updates arrive), fall back to cache after 3s / offline.
  if (req.mode === 'navigate') {
    e.respondWith(Promise.race([
      fetch(req.url, {cache: 'no-store'}).then(r => put('./index.html', r)),   // skip the browser's 10-min copy
      new Promise((_, rej) => setTimeout(rej, 3000))
    ]).catch(() => caches.match('./index.html')));
    return;
  }
  // Same-origin files + Google Fonts: cache first.
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => put(req, r))));
  }
  // Everything else (the calendar script) goes straight to the network; the app caches it itself.
});
