const cacheName = "DefaultCompany-Wow_Web_Telegram-1.0";
const contentToCache = [
    "Build/New WOW Telegram Build.loader.js",
    "Build/776bc2797b4961c275a450882e9892ae.js",
    "Build/38404ac9a9206b33284f86e4039622fe.data",
    "Build/93edac5071e778d213d52a2297a89a18.wasm",
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
