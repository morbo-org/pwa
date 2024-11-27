<script setup lang="ts">
defineEmits(["click"]);
</script>

<template>
  <button @click="$emit('click')">
    <slot />
  </button>
</template>

<style>
:root {
  --color-button: var(--color-light-accent);
  --color-button-outline: var(--color-light-icons-and-text);
  --color-button-disabled: hsl(0deg 0% 75%);
}

button {
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  background-color: var(--color-button);
  border-radius: 10px;
  padding: 2px;
}

button.text {
  padding: 0.5em;
}

button:focus-visible {
  outline: var(--color-button-outline) solid 2px;
  outline-offset: -1.5px;
}

button:hover {
  filter: brightness(0.9);
}

button:disabled {
  background-color: var(--color-button-disabled);
  cursor: not-allowed;
}
</style>
