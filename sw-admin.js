const CACHE_NAME = 'mahmoud-law-pwa-v5';
const urlsToCache =;

// تثبيت ملفات الكاش (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // تفعيل فوراً
});

// استراتيجية جلب البيانات (Fetch)
self.addEventListener('fetch', event => {
  // استثناء روابط Supabase والطلبات غير GET من الكاش لضمان تحديث البيانات
  if (event.request.url.includes('supabase.co') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      }).catch(() => {
        // في حال انقطاع الإنترنت يتم توجيهه للصفحة الصحيحة
        return caches.match('./admin.html');
      })
  );
});

// تفعيل وتحديث الكاش (Activate)
self.addEventListener('activate', event => {
  const cacheWhitelist =;
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
