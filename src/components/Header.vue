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
  font-weight: 700;
  color: var(--color-light-icons-and-text);
}
</style>
