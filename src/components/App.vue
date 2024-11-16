<script setup lang="ts">
import Content from "@/components/Content.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <Content />
  <Footer />
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
