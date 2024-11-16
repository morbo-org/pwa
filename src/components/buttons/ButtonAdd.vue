<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from "vue";

import Modal from "@/components/Modal.vue";

import Button from "@/components/buttons/Button.vue";

import IconAdd from "@/components/icons/IconAdd.vue";

const modalOpen = ref(false);
const feedUrl = ref("");

const isSubmitting = ref(false);

const modal = useTemplateRef<InstanceType<typeof Modal>>("modal");
const feedUrlRef = useTemplateRef<HTMLInputElement>("feed-url");

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
  <Button @click="modal?.open">
    <IconAdd />
  </Button>
  <Teleport to="body">
    <Modal ref="modal" v-model="modalOpen">
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
          <Button class="text" type="button" @click="modal?.close">Close</Button>
        </div>
      </form>
    </Modal>
  </Teleport>
</template>

<style>
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
