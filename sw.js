/* The game moved to https://blixenzach.github.io/voltbreak/ . This replaces the old offline copy: it clears it,
   removes itself, and sends any open window to the new address. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('zak-breakout-')) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) {
      const u = new URL(c.url);                 // keep challenge links (?c=...)
      c.navigate('https://blixenzach.github.io/voltbreak/' + u.search + u.hash);
    }
  })());
});
