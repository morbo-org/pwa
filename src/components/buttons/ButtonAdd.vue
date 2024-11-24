<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef, watch } from "vue";

import Modal from "@/components/Modal.vue";

import Button from "@/components/buttons/Button.vue";

import IconAdd from "@/components/icons/IconAdd.vue";

import { state } from "@/state";
import { stateStore } from "@/store";

const modalOpen = ref(false);
const feedUrl = ref("");

const isSubmitting = ref(false);
const errorMessage = ref("");

const modal = useTemplateRef<InstanceType<typeof Modal>>("modal");
const feedUrlRef = useTemplateRef<HTMLInputElement>("feed-url");

async function submit() {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  errorMessage.value = "";

  let response: Response;
  try {
    response = await fetch(state.apiUrl.value + "/feed/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: feedUrl.value,
      }),
    });
  } catch {
    errorMessage.value = "Submit failed: failed to reach the endpoint.";
    isSubmitting.value = false;
    return;
  }

  if (response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      errorMessage.value = "Submit failed: failed to parse the response.";
    }
    if (body && typeof body == "object" && "title" in body && typeof body.title == "string") {
      state.feeds.add(body.title, "feed", 0);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    modal.value?.close();
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

watch(modalOpen, () => {
  if (modalOpen.value) {
    void nextTick(() => {
      feedUrlRef.value?.focus();
    });
  } else {
    feedUrl.value = "";
    errorMessage.value = "";
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
          <label for="url">Feed URL:</label>
          <input
            id="url"
            ref="feed-url"
            v-model="feedUrl"
            type="url"
            required
            placeholder="https://example.com/feed.xml"
          >
        </div>
        <div v-if="errorMessage" class="form-error">{{ errorMessage }}</div>
        <div class="form-actions">
          <Button class="text" type="submit" :disabled="isSubmitting">Submit</Button>
          <Button class="text" type="button" @click="modal?.close">Close</Button>
        </div>
      </form>
    </Modal>
  </Teleport>
</template>
