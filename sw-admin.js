// sw-admin.js
const cacheName = 'admin-law-v1';
const assets = [
  '/',                        // الصفحة الرئيسية (قد تكون admin.html)
  '/admin.html',              // صفحة الإدارة نفسها
  '/manifest-admin.json',     // ملف المانيفست الخاص بالإدارة
  '/icons/icon-192x192.png',  // أيقونة 192 (تأكد من وجودها)
  '/icons/icon-512x512.png',  // أيقونة 512
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700;900&family=Tajawal:wght@300;400;500;700;900&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// استراتيجية التخزين: استخدم الكاش أولاً، ثم ارجع إلى الشبكة
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
