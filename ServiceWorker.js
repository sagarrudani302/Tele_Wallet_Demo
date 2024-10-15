const cacheName = "DefaultCompany-Wow_Web_Telegram-1.0";
const contentToCache = [
    "Build/Telegram Ton Demo.loader.js",
    "Build/f402c17354f9d321e2868d6d90d36510.js",
    "Build/7d62183471a00e32cd455754c10dd34f.data",
    "Build/324094bd6efd9a06d8753ef569f40155.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
