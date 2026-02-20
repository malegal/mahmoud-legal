const CACHE_NAME = 'mahmoud-law-admin-v2'; // زد الرقم عند التحديث
const urlsToCache = [
  '/',
  '/admin.html',
  '/manifest-admin.json',
  // Bootstrap
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  // Tailwind
  'https://cdn.tailwindcss.com',
  // الخطوط
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700;900&family=Tajawal:wght@300;400;500;700;900&display=swap',
  // المكتبات الأخرى (قد تكون كبيرة، لكنها مفيدة دون إنترنت)
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app shell...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  // تجاهل طلبات supabase والطلبات غير GET
  if (event.request.url.includes('supabase.co') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، أرسله
        if (response) {
          return response;
        }
        // وإلا، حاول تحميله من الشبكة
        return fetch(event.request).then(networkResponse => {
          // اختياري: يمكن تخزين الاستجابات الجديدة ديناميكياً (اختر ما يناسبك)
          // لكننا سنكتفي بإرجاعها فقط
          return networkResponse;
        });
      })
      .catch(() => {
        // إذا فشل كل شيء (لا يوجد إنترنت ولا كاش)، أعد صفحة admin.html
        return caches.match('/admin.html');
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});
