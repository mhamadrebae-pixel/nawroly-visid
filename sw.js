/*
    Service Worker for Visit Nawroli PWA
    Provides lightweight offline support and caching for visitors.
*/

const CACHE_NAME = "halabja-cache-v2";
const STATIC_ASSETS = [
    "./",
    "./index.html",
    "./service-details.html",
    "./css/style.css",
    "./css/responsive.css",
    "./js/data.js",
    "./js/app.js",
    "./manifest.webmanifest",
    "./images/hero.jpg",
    "./images/nature.jpg",
    "./images/landscape.jpg",
    "./images/activity.jpg",
    "./images/icon-192.png",
    "./images/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    // Skip cross-origin API requests (like weather API) to avoid stale data
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    if (event.request.mode === "navigate") {
                        return caches.match("./index.html");
                    }
                });
            })
    );
});
