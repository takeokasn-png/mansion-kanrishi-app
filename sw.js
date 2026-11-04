const CACHE_NAME = 'mansionkanrishi-v85';
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

// 通信できるときは常に最新のファイルを取りに行き（取れたらキャッシュも更新）、
// 圏外などで取れないときだけキャッシュを使う
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, {cache: 'no-cache'}).then(res => {
      if(res && res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('/mansion-kanrishi-app/index.html')))
  );
});
