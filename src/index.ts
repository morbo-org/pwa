import { createApp } from "vue";

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
