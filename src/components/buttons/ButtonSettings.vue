<!--
 Copyright (C) 2024 Pavel Sobolev

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

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
      <p>Copyright (C) 2024 Pavel Sobolev</p>
      <p>This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU Affero General Public License as published
      by the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.</p>
      <p>This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      <a href="https://www.gnu.org/licenses/agpl-3.0.html">GNU Affero General Public License</a>
      for more details.</p>
      Source code is available at
      <ul>
        <li><a href="https://codeberg.org/morbo-org/Morbo">https://codeberg.org/morbo-org/Morbo</a></li>
        <li><a href="https://github.com/morbo-org/Morbo">https://github.com/morbo-org/Morbo</a></li>
        <li><a href="https://gitlab.com/morbo-org/Morbo">https://gitlab.com/morbo-org/Morbo</a></li>
      </ul>
    </Modal>
  </Teleport>
</template>
