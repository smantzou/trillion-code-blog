<template>
  <div class="pagination flex flex-row space-x-4">
    <div>
      <img
        @click="paginate(currentPage - 1)"
        src="../../assets/svgs/arrow-icon-left.svg"
        alt=""
      />
    </div>
    <div v-for="number of numberOfPages" v-bind:key="number">
      <button
        v-bind:class="getButtonClass(number)"
        @click="paginate(number)"
        class="default-button"
      >
        <span>{{ number }}</span>
      </button>
    </div>
    <div>
      <img
        @click="paginate(currentPage + 1)"
        style="transform: rotate(180deg)"
        src="../../assets/svgs/arrow-icon-left.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from "@/store/blog";
import { storeToRefs } from "pinia";

const store = useBlogStore();
const { numberOfPages, currentPage } = storeToRefs(store);

function getButtonClass(number: number) {
  if (number === currentPage.value) {
    return "selected-button";
  }
  return "";
}

async function paginate(page: number) {
  if (page > numberOfPages.value || page < 1) {
    return;
  }
  await store.fetchBlogs(12, page);
}
</script>

<style>
.pagination {
  align-items: center;
}
img {
  cursor: pointer;
}
.default-button {
  color: black;
  background-color: #ebebeb;
  width: 2rem;
  height: 2rem;
}
.default-button:hover {
  color: blue;
  background-color: white;
}
.selected-button {
  color: blue;
  background-color: white;
}
.selected-button:hover {
  color: blue;
}
</style>
