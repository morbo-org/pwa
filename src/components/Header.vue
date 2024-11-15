<script setup lang="ts">
import IconListFilter from "@/components/icons/IconListFilter.vue";
</script>

<template>
  <div id="header">
    <span class="location">Feeds</span>
    <IconListFilter />
  </div>
</template>

<style>
#header {
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  height: var(--bar-height);
  padding: var(--content-padding);
  color: var(--color-light-background);
}

#header > span.location {
  font-size: 19px;
  font-family: "Atkinson Hyperlegible Pro", sans-serif;
  font-style: normal;
  font-weight: 700;
  color: var(--color-light-icons-and-text);
}
</style>
