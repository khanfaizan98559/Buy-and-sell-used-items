const CACHE_NAME = "swapnest-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/css/style.css",
  "/js/script.js",
  "/images/logo.png",
  "/images/logo.webp",
  "/images/hero.webp",
  "/images/hero.png",
  "/offline",
  "/about",
  "/contact",
  "/faq",
  "/sell",
];

// Install: Precache static assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: Clean old caches
self.addEventListener("activate", (event) => {
  clients.claim();
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch: Apply different strategies
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (
    event.request.url.includes("/login") ||
    event.request.url.includes("/register") ||
    event.request.url.includes("/logout")
  ) {
    event.respondWith(fetch(event.request));
    return;
  }
  if (event.request.mode === "navigate") {
    // 1. Handle navigation requests (SPA route)
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() =>
          caches
            .match(event.request)
            .then((cached) => cached || caches.match("/offline"))
        )
    );
    return;
  }

  // 2. Network-first strategy for dynamic pages like /product, /cart, /profile
  if (
    url.pathname.startsWith("/") ||
    url.pathname.startsWith("/product") ||
    url.pathname.startsWith("/search")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (
            response &&
            response.status === 200 &&
            response.type === "basic"
          ) {
            const cloned = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, cloned));
          }
          return response;
        })
        .catch(() =>
          caches
            .match(event.request)
            .then((cached) => cached || caches.match("/offline"))
        )
    );
    return;
  }

  // 3. Stale-While-Revalidate for static assets (CSS/JS/images)
  if (
    STATIC_ASSETS.includes(url.pathname) ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".woff2")
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((networkRes) => {
          if (
            networkRes &&
            networkRes.status === 200 &&
            networkRes.type === "basic"
          ) {
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, networkRes.clone()));
          }
          return networkRes;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 4. Cache-first for fallback pages (offline, about, contact, faq)
  if (
    url.pathname === "/offline" ||
    url.pathname === "/about" ||
    url.pathname === "/contact" ||
    url.pathname === "/faq"
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request).then((res) => {
            if (res && res.status === 200 && res.type === "basic") {
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, res.clone()));
            }
            return res;
          })
        );
      })
    );
    return;
  }

  // Default fallback: try network, then cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
