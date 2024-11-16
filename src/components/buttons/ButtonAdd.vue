<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from "vue";

import Button from "@/components/buttons/Button.vue";

import IconAdd from "@/components/icons/IconAdd.vue";

const modalOpen = ref(false);
const feedUrl = ref("");

const isSubmitting = ref(false);

const feedUrlRef = useTemplateRef<HTMLInputElement>("feed-url");

function openModal() {
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

function submit() {
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
  }, 1000);
}

watch(modalOpen, () => {
  if (modalOpen.value) {
    void nextTick(() => {
      feedUrlRef.value?.focus();
    });
  }
});
</script>

<template>
  <Button @click="openModal">
    <IconAdd />
  </Button>
  <Teleport to="body">
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>Add a feed</h3>
        <form @submit.prevent="submit">
          <div class="form-input">
            <label for="url">URL:</label>
            <input
              id="url"
              ref="feed-url"
              v-model="feedUrl"
              type="url"
              required
              placeholder="https://example.com/feed.xml"
            >
          </div>
          <div class="form-actions">
            <Button class="text" type="submit" :disabled="isSubmitting">Add</Button>
            <Button class="text" @click="closeModal">Close</Button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: calc(90% - 40px);
  max-height: calc(90vh - 40px);
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input > input {
  box-sizing: border-box;
  padding: 0.5rem;
  height: 2rem;
}

.form-actions {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.form-error {
  color: red;
}
</style>
