const cacheName = "DefaultCompany-Wow_Web_Telegram-1.0";
const contentToCache = [
    "Build/Telegram Build 0.1.loader.js",
    "Build/Telegram Build 0.1.framework.js",
    "Build/Telegram Build 0.1.data",
    "Build/Telegram Build 0.1.wasm",
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
    // Only cache GET requests
    if (e.request.method === "GET") {
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
    } else {
        // Let non-GET requests pass through without caching
        e.respondWith(fetch(e.request));
    }
});
