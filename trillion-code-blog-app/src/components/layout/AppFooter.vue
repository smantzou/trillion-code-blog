<template>
  <div class="footer flex flex-col-reverse"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class AppFooter extends Vue {}
</script>

<style>
.footer {
  height: 1rem;
}
</style>
