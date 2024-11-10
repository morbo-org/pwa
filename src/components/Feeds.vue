<script setup lang="ts">
import { state } from "@/state";
</script>

<template>
  <ul id="feeds-list">
    <template v-for="feed of state.feeds.value" :key="feed.id">
      <li class="feed-item">
        <svg
          v-if="feed.type === 'feed'"
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
        >
          <g class="frame-children">
            <path d="M4 11a9 9 0 0 1 9 9" class="fills" />
            <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
              <path d="M4 11a9 9 0 0 1 9 9" class="stroke-shape" />
            </g>
            <path d="M4 4c8.837 0 16 7.163 16 16" class="fills" />
            <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
              <path d="M4 4c8.837 0 16 7.163 16 16" class="stroke-shape" />
            </g>
            <circle cy="19" cx="5" r="1" class="fills" />
            <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
              <g class="inner-stroke-shape">
                <defs>
                  <clipPath id="b">
                    <use href="#a" />
                  </clipPath>
                  <circle
                    id="a"
                    cx="5"
                    cy="19"
                    r="1"
                  />
                  <use href="#a" clip-path="url('#b')" />
                </defs>
              </g>
            </g>
          </g>
        </svg>
        <svg
          v-else
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
        >
          <g class="frame-children">
            <!-- eslint-disable-next-line max-len -->
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a1.998 1.998 0 0 1-1.69-.9L9.6 3.9c-.37-.562-.997-.9-1.67-.9H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" class="fills" />
            <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
              <g class="inner-stroke-shape">
                <!-- eslint-disable-next-line max-len -->
                <path id="a" d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a1.998 1.998 0 0 1-1.69-.9L9.6 3.9c-.37-.562-.997-.9-1.67-.9H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </g>
            </g>
          </g>
        </svg>
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

svg.icon {
  stroke: var(--color-light-icons-and-text)
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
