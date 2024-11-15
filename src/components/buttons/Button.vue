<script setup lang="ts">
defineEmits(["click"]);
</script>

<template>
  <button @click="$emit('click')">
    <slot />
  </button>
</template>

<style>
button {
    all: unset;
    cursor: pointer;
    background-color: var(--color-light-accent);
    border-radius: 10px;
    padding: 2px;
}

button:focus-visible {
    outline: var(--color-light-icons-and-text) solid 2px;
    outline-offset: -1.5px;
}
</style>
