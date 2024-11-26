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
defineEmits(["self"]);
</script>

<template>
  <div class="overlay" @click.self="$emit('self')">
    <div class="overlay-content">
      <slot />
    </div>
  </div>
</template>

<style>
.overlay {
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

.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.overlay-content > header {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.25rem 0;
}

.overlay-content > :is(p, ul) {
  margin: 0 0 0.25em 0;
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
