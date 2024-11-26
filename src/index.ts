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

import { createApp } from "vue";

import { stateStore } from "./store";

import App from "@/components/App.vue";

if ("storage" in navigator && "persist" in navigator.storage) {
  const isPersisted = await navigator.storage.persist();
  console.log(`Persisted storage granted: ${isPersisted}`);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then((registration) => {
    console.log("SW registered: ", registration);
  }).catch((registrationError: unknown) => {
    console.log("SW registration failed: ", registrationError);
  });
}

createApp(App).mount("#app");

void stateStore.readyPromise;
