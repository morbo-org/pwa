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
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import ButtonSettings from "@/components/buttons/ButtonSettings.vue";
</script>

<template>
  <div id="footer">
    <ButtonSettings />
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
