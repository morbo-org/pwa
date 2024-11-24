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
