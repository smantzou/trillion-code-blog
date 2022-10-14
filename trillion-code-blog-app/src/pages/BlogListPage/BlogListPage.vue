<template>
  <div class="grid grid-cols-none">
    <div class="list grid grid-cols-3" v-if="!!blogs">
      <BlogItem
        v-for="blog in blogs"
        v-bind:key="blog.slug"
        :slug="blog.slug"
        :name="blog.name"
        :date="blog.date"
        :imagePath="blog.imagePath"
      ></BlogItem>
    </div>
    <div class="pagination"><BlogListPagination></BlogListPagination></div>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from "@/store/blog";
import { storeToRefs } from "pinia";
import BlogItem from "../../components/common/BlogItem.vue";
import BlogListPagination from "./BlogListPagination.vue";

const store = useBlogStore();
const { blogs, currentPage } = storeToRefs(store);

store.fetchBlogs(12, currentPage.value);
</script>

<style>
.list {
  margin: 0rem 20%;
}
.pagination {
  justify-self: center;
}
</style>
