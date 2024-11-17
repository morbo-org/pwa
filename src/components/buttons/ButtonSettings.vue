<script setup lang="ts">
import { useTemplateRef } from "vue";

import Modal from "@/components/Modal.vue";

import Button from "@/components/buttons/Button.vue";

import IconSettings from "@/components/icons/IconSettings.vue";

import { state } from "@/state";

const modal = useTemplateRef<InstanceType<typeof Modal>>("modal");
</script>

<template>
  <Button @click="modal?.open">
    <IconSettings />
  </Button>
  <Teleport to="body">
    <Modal ref="modal">
      <h3>Settings</h3>
      <form>
        <div class="form-input">
          <label for="url">API URL:</label>
          <input v-model="state.apiUrl.value" type="url" placeholder="https://api.morbo.paveloom.dev">
        </div>
        <div class="form-actions">
          <Button class="text" type="button" @click="modal?.close">Close</Button>
        </div>
      </form>
    </Modal>
  </Teleport>
</template>
