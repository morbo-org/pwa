<script setup lang="ts">
import { onMounted, ref } from "vue";

import Overlay from "@/components/Overlay.vue";

import Button from "@/components/buttons/Button.vue";

import { state } from "@/state";
import { authStore, stateStore } from "@/store";

const password = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");

async function submit() {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  errorMessage.value = "";

  const hashedPassword = btoa(password.value);

  let response: Response;
  try {
    response = await fetch(state.apiURL.value + "/session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: state.username.value,
        password: hashedPassword,
      }),
    });
  } catch {
    errorMessage.value = "Submit failed: failed to reach the endpoint.";
    isSubmitting.value = false;
    return;
  }

  if (response.ok) {
    {
      let body: unknown;
      try {
        body = await response.json();
      } catch {
        errorMessage.value = "Submit failed: failed to parse the response.";
      }
      if (body && typeof body == "object" && "sessionToken" in body && typeof body.sessionToken == "string") {
        await authStore.putSessionToken(body.sessionToken);
      }
    }

    await authStore.checkLoginStatus();
    if (!state.isLoggedIn.value) {
      errorMessage.value = "Login failed: no session token received.";
    }

    password.value = "";
  } else {
    const message = await response.text();
    if (message) {
      errorMessage.value = `Submit failed: ${message}.`;
    } else {
      errorMessage.value = "Submit failed: unexpected response.";
    }
  }

  isSubmitting.value = false;
}

onMounted(() => {
  void authStore.checkLoginStatus();
});
</script>

<template>
  <template v-if="stateStore.ready.value">
    <slot v-if="state.isLoggedIn.value" />
    <Overlay v-else>
      <header>Log In</header>
      <form @submit.prevent="submit">
        <div class="form-input">
          <label for="api-url">API URL:</label>
          <input id="api-url" v-model="state.apiURL.value" type="url" required>
        </div>
        <div class="form-input">
          <label for="username">Username:</label>
          <input id="username" v-model="state.username.value" type="text" required>
        </div>
        <div class="form-input">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" required>
        </div>
        <div v-if="errorMessage" class="form-error">
          {{ errorMessage }}
        </div>
        <div class="form-actions">
          <Button class="text" type="submit" :disabled="isSubmitting">Submit</Button>
        </div>
      </form>
    </Overlay>
  </template>
</template>
