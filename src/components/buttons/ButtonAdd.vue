<script setup lang="ts">
import Button from "@/components/buttons/Button.vue";

import IconAdd from "@/components/icons/IconAdd.vue";
import { state } from "@/state";

function addFeed() {
  state.feeds.add();
}
</script>

<template>
  <Button @click="addFeed">
    <IconAdd />
  </Button>
</template>
