<script setup lang= "ts">
import IconDirectory from "@/components/icons/IconDirectory.vue";
import IconFeed from "@/components/icons/IconFeed.vue";
import { state } from "@/state";
</script>

<template>
  <ul id="feeds-list">
    <template v-for="feed of state.feeds.value" :key="feed.id">
      <li class="feed-item">
        <IconFeed v-if="feed.type === 'feed'" />
        <IconDirectory v-else-if="feed.type === 'directory'" />
        <span class="label">{{ feed.label }}</span>
        <div v-if="feed.counter > 0" class="counter">
          <span class="number">
            {{ feed.counter }}
          </span>
        </div>
      </li>
    </template>
  </ul>
</template>

<style scoped>
ul#feeds-list {
  list-style-type: none;
  margin: 0;
  padding: var(--content-padding);
}

li.feed-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: var(--bar-height);
}

span.label {
  font-size: 17px;
  font-family: "Atkinson Hyperlegible Pro", sans-serif;
  font-style: normal;
  font-weight: 400;
  flex-grow: 1;
  margin: 0 10px;
  color: var(--color-light-icons-and-text);
}

div.counter {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--color-light-accent);
  padding: 0 10px;
  border-radius: 10px;
}

div.counter > .number {
  font-size: 12px;
  font-family: "Atkinson Hyperlegible Pro", sans-serif;
  font-style: normal;
  font-weight: 400;
  color: var(--color-light-icons-and-text);
}
</style>
