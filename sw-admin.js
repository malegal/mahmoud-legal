const cacheName = 'admin-cases-v2';
const assets = [
  'admin.html',
  'logo.png',
  'https://cdn.quilljs.com/1.3.6/quill.snow.css',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
