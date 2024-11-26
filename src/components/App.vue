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
import Content from "@/components/Content.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import LoginOverlay from "@/components/LoginOverlay.vue";
</script>

<template>
  <LoginOverlay>
    <Header />
    <Content />
    <Footer />
  </LoginOverlay>
</template>

<style>
@font-face {
  font-family: "Atkinson Hyperlegible Pro";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("/assets/fonts/atkinson_hyperlegible_pro_regular.woff2") format("woff2");
}

@font-face {
  font-family: "Atkinson Hyperlegible Pro";
  font-style: normal;
  font-weight: 700;
  font-display: block;
  src: url("/assets/fonts/atkinson_hyperlegible_pro_bold.woff2") format("woff2");
}

* {
  font-family: "Atkinson Hyperlegible Pro", sans-serif;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
}

:root {
  --bar-height: 42px;
  --color-light-background: #ffffff;
  --color-light-accent: #ececec;
  --color-light-icons-and-text: #000000;
  --color-light-update-status: #5a5a5a;
  --content-padding: 0 15px;
}
</style>
