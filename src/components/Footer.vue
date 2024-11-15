<script setup lang="ts">
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";

import IconSettings from "@/components/icons/IconSettings.vue";
</script>

<template>
  <div id="footer">
    <IconSettings />
    <span class="update-status">
      Updated 6 hours ago
    </span>
    <ButtonAdd />
  </div>
</template>

<style>
#footer {
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  height: var(--bar-height);
  padding: var(--content-padding);
}

#footer > span.update-status {
  font-size: 13px;
  color: var(--color-light-update-status);
}
</style>
