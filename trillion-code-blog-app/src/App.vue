<template>
  <AppHeader></AppHeader>
  <AppSuper></AppSuper>
  <RouterView></RouterView>
  <AppFooter></AppFooter>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppFooter from "./components/layout/AppFooter.vue";
import AppHeader from "./components/layout/AppHeader.vue";
import AppSuper from "./components/layout/AppSuper.vue";

@Options({
  components: {
    AppFooter,
    AppHeader,
    AppSuper,
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
  margin-top: 60px;
}
</style>
