<template>
  <AppHeader :title="'Τα Νέα μας'" class="header flex-none"></AppHeader>
  <div class="content">
    <RouterView> </RouterView>
  </div>
  <AppFooter class="footer flex-none"></AppFooter>
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
  min-height: 100vh;
  margin: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: #fcfcfc;
}
.content {
  padding-bottom: 10rem;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10rem;
}
</style>
