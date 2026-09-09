/* G04Event – minimaler Service Worker, nur damit lokale Erinnerungen
   (Notification API) auch auf Android/Chrome zuverlässig funktionieren.
   Kein Caching, kein Offline-Modus, keine Server-Kommunikation. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
