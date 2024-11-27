<script setup lang="ts">
import Overlay from "@/components/Overlay.vue";

const isOpen = defineModel<boolean>();

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

defineExpose({
  open,
  close,
});
</script>

<template>
  <Overlay v-if="isOpen" @click.self="close">
    <slot />
  </Overlay>
</template>
