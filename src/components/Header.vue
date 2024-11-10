<template>
  <div id="header">
    <span class="location">Feeds</span>
    <svg class="list-filter-icon" width="24" xmlns="http://www.w3.org/2000/svg" height="24" fill="none">
      <g class="frame-children">
        <path d="M10.393 17.491h3.214" class="fills" />
        <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
          <path d="M10.393 17.491h3.214" class="stroke-shape" />
        </g>
        <path d="M7.714 11.996h8.572" class="fills" />
        <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
          <path d="M7.714 11.996h8.572" class="stroke-shape" />
        </g>
        <path d="M4.5 6.5h15" class="fills" />
        <g stroke-linecap="round" stroke-linejoin="round" class="strokes">
          <path d="M4.5 6.5h15" class="stroke-shape" />
        </g>
      </g>
    </svg>
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

#header > svg.list-filter-icon {
  stroke: var(--color-light-icons-and-text);
}
</style>
