const CACHE_NAME = 'natural-cream-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Always bypass caching for admin routes
  if (event.request.url.includes('/admin')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Pass-through fetch for fresh content
  if (event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
