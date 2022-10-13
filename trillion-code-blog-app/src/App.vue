<template>
  <AppHeader class=""></AppHeader>
  <RouterView></RouterView>
  <AppFooter></AppFooter>
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
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 15vh 70vh 15vh;
}
</style>
