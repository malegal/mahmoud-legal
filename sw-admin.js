const CACHE_NAME = 'mahmoud-law-pwa-v1';
const urlsToCache =;

// تثبيت ملفات الكاش (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// استراتيجية جلب البيانات (Fetch)
self.addEventListener('fetch', event => {
  // استثناء روابط Supabase من الكاش لضمان تحديث البيانات دائماً
  if (event.request.url.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا كان الملف موجوداً في الكاش، قم بإرجاعه. وإلا اطلبه من الإنترنت
        return response || fetch(event.request).catch(() => {
            // في حالة انقطاع الإنترنت تماماً
            return caches.match('./index.html');
        });
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
