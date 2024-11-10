import { setCacheNameDetails } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

if (DEV_MODE) {
  self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
  });
  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
  });
}

setCacheNameDetails({
  prefix: "",
  suffix: "",
  precache: "precache",
});

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  /\/assets\/pwa\//,
  new CacheFirst({
    cacheName: "pwa",
    plugins: [
      // @ts-expect-error Upstream issue: https://github.com/GoogleChrome/workbox/issues/3141
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        purgeOnQuotaError: true,
      }),
    ],
  }),
  "GET",
);
