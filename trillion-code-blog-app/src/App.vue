<template>
  <div class="h-screen flex flex-col">
    <AppHeader class="header flex-none"></AppHeader>
    <RouterView class="grow"> </RouterView>
    <AppFooter class="footer flex-none"></AppFooter>
  </div>
</template>

<script setup lang="ts">
import AppFooter from "./components/layout/AppFooter.vue";
import AppHeader from "./components/layout/AppHeader.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  background-color: #fcfcfc;
}
RouterView {
  padding-bottom: 10rem; /* Footer height */
  align-content: center;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10rem;
}
</style>
