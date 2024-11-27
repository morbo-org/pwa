<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

import Modal from "@/components/Modal.vue";

import Button from "@/components/buttons/Button.vue";

import IconSettings from "@/components/icons/IconSettings.vue";

import { state } from "@/state";
import { authStore } from "@/store";

const isSubmitting = ref(false);
const errorMessage = ref("");

const modal = useTemplateRef<InstanceType<typeof Modal>>("modal");

async function logout() {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  errorMessage.value = "";

  const sessionToken = await authStore.getSessionToken();

  try {
    await fetch(state.apiUrl.value + "/session/", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${sessionToken}` },
    });
  } catch {
    errorMessage.value = "Log out failed: failed to reach the endpoint.";
    isSubmitting.value = false;
    return;
  }

  await authStore.deleteSessionToken();
  await authStore.checkLoginStatus();

  isSubmitting.value = false;
}
</script>

<template>
  <Button @click="modal?.open">
    <IconSettings />
  </Button>
  <Teleport to="body">
    <Modal ref="modal">
      <header>Settings</header>
      <form @submit.prevent="logout">
        <span>You're logged in as <em>{{ state.username.value }}</em>.</span>
        <div class="form-input">
          <label for="url">API URL:</label>
          <input v-model="state.apiUrl.value" type="url" placeholder="https://api.morbo.paveloom.dev">
        </div>
        <div class="form-actions">
          <Button class="text" type="submit">Log out</Button>
          <Button class="text" type="button" @click="modal?.close">Close</Button>
        </div>
      </form>
    </Modal>
  </Teleport>
</template>
