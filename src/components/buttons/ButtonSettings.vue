<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

import Modal from "@/components/Modal.vue";

import Button from "@/components/buttons/Button.vue";

import IconSettings from "@/components/icons/IconSettings.vue";

import { API_URL } from "@/globals";
import { state } from "@/state";
import { authStore } from "@/store";

const isSubmitting = ref(false);

const modal = useTemplateRef<InstanceType<typeof Modal>>("modal");

async function logout() {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  const sessionToken = await authStore.getSessionToken();

  void fetch(state.apiURL.value + "/session/", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${sessionToken}` },
  }).catch(() => {
    // Delete the session token even if the request fails.
  });

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
          <label for="api-url">API URL:</label>
          <input id="api-url" v-model="state.apiURL.value" type="url" :placeholder="API_URL">
        </div>
        <div class="form-actions">
          <Button class="text" type="submit" :disabled="isSubmitting">Log out</Button>
          <Button class="text" type="button" @click="modal?.close">Close</Button>
        </div>
      </form>
    </Modal>
  </Teleport>
</template>
