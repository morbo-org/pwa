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
