const CACHE_NAME = 'mansionkanrishi-v22';
const ASSETS = [
  '/mansion-kanrishi-app/',
  '/mansion-kanrishi-app/index.html',
  '/mansion-kanrishi-app/questions.js',
  '/mansion-kanrishi-app/laws.js',
  '/mansion-kanrishi-app/manifest.json',
  '/mansion-kanrishi-app/icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
