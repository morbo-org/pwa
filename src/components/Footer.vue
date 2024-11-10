<script setup lang="ts">
import AddButton from "@/components/AddButton.vue";
</script>

<template>
  <div id="footer">
    <svg class="settings-icon" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none">
      <g clip-path="url(#a)">
        <g class="frame-children">
          <!-- eslint-disable-next-line max-len -->
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2.001 2.001 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2.001 2.001 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2.001 2.001 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2.001 2.001 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2.001 2.001 0 0 1-1-1.74v-.5a2.001 2.001 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2.001 2.001 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" style="fill: none;" class="fills" />
          <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
            <!-- eslint-disable-next-line max-len -->
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2.001 2.001 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2.001 2.001 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2.001 2.001 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2.001 2.001 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2.001 2.001 0 0 1-1-1.74v-.5a2.001 2.001 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2.001 2.001 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" style="fill: none; stroke-width: 2; stroke-opacity: 1;" class="stroke-shape" />
          </g>
          <circle cy="12" cx="12" r="3" class="fills" />
          <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
            <circle
              cx="12"
              cy="12"
              r="3"
              class="stroke-shape"
            />
          </g>
        </g>
      </g>
    </svg>
    <span class="update-status">
      Updated 6 hours ago
    </span>
    <AddButton />
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

#footer > svg.settings-icon {
  stroke: var(--color-light-icons-and-text);
}

#footer > span.update-status {
  font-size: 13px;
  font-family: "Atkinson Hyperlegible Pro", sans-serif;
  font-style: normal;
  font-weight: 400;
  color: var(--color-light-update-status);
}
</style>
