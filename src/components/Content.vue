<script setup lang="ts">
import Feeds from "@/components/Feeds.vue";
</script>

<template>
  <div id="content">
    <Feeds />
  </div>
</template>

<style>
#content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
}
</style>
