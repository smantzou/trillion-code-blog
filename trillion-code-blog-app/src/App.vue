<template>
  <div class="h-screen grid grid-cols-none">
    <AppHeader class="header"></AppHeader>
    <RouterView></RouterView>
    <AppFooter></AppFooter>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppFooter from "./components/layout/AppFooter.vue";
import AppHeader from "./components/layout/AppHeader.vue";

@Options({
  components: {
    AppFooter,
    AppHeader,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  height: 1.5rem;
}
</style>
