<template>
  <div class="grid grid-cols-none">
    <div class="top row-span-1 flex justify-end">
      <div>
        <span> Καλέστε μας στο <strong>218 218 996</strong> </span>
      </div>
      <div>
        <button class="rounded-full">Είμαστε ανοιχτά τώρα!</button>
      </div>
    </div>
    <div class="logo row-span-1 flex">
      <div v-on:click="navigateToBlogs()">
        <img
          style="cursor: pointer"
          src="../../assets/svgs/trillion-logo.svg"
          alt=""
        />
      </div>
      <div>
        <router-link :to="{ name: 'blogs' }">
          <button>BLOG</button>
        </router-link>
      </div>
    </div>
    <div class="super row-span-3 flex flex-start">
      <div class="title">
        <span>Τα <strong>Νέα </strong> μας</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router";
import { useBlogStore } from "@/store/blog";

const store = useBlogStore();
function navigateToBlogs() {
  router.push({ path: `/blogs` });
}
</script>

<style>
.top {
  background-color: #292929;
}
.top div {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.8rem;
  margin-right: 1rem;
}
.top div span {
  font-size: xx-small;
  color: white;
}
.top div button {
  background-color: #39beff;
  padding: 0.2rem;
  font-size: xx-small;
  color: white;
  font-weight: bold;
}
.logo {
  justify-content: space-between;
  margin: 1.5rem 1.5rem;
  padding-bottom: 1rem;
  height: 0.4rem;
}
.logo button {
  color: black;
}
.super {
  height: 5rem;
  background-image: radial-gradient(
    ellipse farthest-corner at right 100%,
    #000000 70%,
    #181818 30%
  );
  color: white;
  border-radius: 10px;
  line-height: 50px;
}
.title {
  margin-top: 2rem;
  margin-left: 15rem;
  color: #3abfff;
}
</style>
