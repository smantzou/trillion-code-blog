<template>
  <div class="h-screen grid grid-cols-none">
    <AppHeader class="header"></AppHeader>
    <div class="content-wrap">
      <RouterView> </RouterView>
    </div>
    <AppFooter class="footer"></AppFooter>
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
  position: relative;
  min-height: 100vh;
  background-color: #fcfcfc;
}
.content-wrap {
  padding-bottom: 10rem; /* Footer height */
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10rem;
}
.header {
  height: 1.5rem;
}
</style>
