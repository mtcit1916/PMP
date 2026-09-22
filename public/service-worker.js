const CACHE_NAME = "pmp-trainer-v1";
const OFFLINE_URLS = [
  "/",
  "/manifest.json",
  "/data/questions.json",
];

// عند تثبيت الـ Service Worker: نخزن الصفحات الأساسية وبنك الأسئلة
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

// تنظيف الكاش القديم عند التفعيل
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// استراتيجية: الشبكة أولاً، وإن فشلت نرجع للكاش (يضمن تحديث الأسئلة تلقائياً كل ما يكون فيه إنترنت)
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
  );
});
