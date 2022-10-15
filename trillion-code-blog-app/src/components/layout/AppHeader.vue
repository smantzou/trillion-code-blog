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
          src="../../../public/assets/svgs/trillion-logo.svg"
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
        <div class="news">
          <span v-if="router.currentRoute.value.fullPath.includes('/blogs')"
            >Τα <strong>Νέα</strong> μας</span
          >
        </div>
        <div
          v-if="
            selectedBlog &&
            !router.currentRoute.value.fullPath.includes('/blogs')
          "
          class="reactive-div flex flex-col"
        >
          <div id="reactive-date">
            <span>{{ new Date(selectedBlog.date).toLocaleDateString() }}</span>
          </div>
          <div id="reactive">
            <span>{{ selectedBlog!.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router";
import { useBlogStore } from "@/store/blog";
import { storeToRefs } from "pinia";

const store = useBlogStore();
const { selectedBlog } = storeToRefs(store);

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
  height: 6rem;
  background-image: radial-gradient(
    ellipse farthest-corner at right 100%,
    #000000 70%,
    #181818 30%
  );
  color: white;
  border-radius: 10px;
  line-height: 50px;
  justify-items: left;
}

.news {
  margin-top: 3rem;
  margin-left: 14.5rem;
  color: #3abfff;
}

.reactive-div {
  margin-top: -2rem;
  margin-left: 12rem;
  justify-content: start;
}

#reactive {
  font-size: xx-large;
}

#reactive-date {
  font-size: 15px;
  width: 20%;
}
</style>
