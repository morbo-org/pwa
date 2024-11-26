/**
 * Copyright (C) 2024 Pavel Sobolev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
