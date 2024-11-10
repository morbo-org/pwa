<script setup lang="ts">
import { state } from "@/state";

function addFeed() {
  state.feeds.add();
}
</script>

<template>
  <button @click="addFeed">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <g class="frame-children">
        <path d="M4 12h16" class="fills" />
        <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
          <path d="M4 12h16" class="stroke-shape" />
        </g>
        <path d="M12 4v16" class="fills" />
        <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
          <path d="M12 4v16" class="stroke-shape" />
        </g>
      </g>
    </svg>
  </button>
</template>

<style scoped>
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

svg {
    vertical-align: middle;
    stroke: var(--color-light-icons-and-text);
}
</style>
