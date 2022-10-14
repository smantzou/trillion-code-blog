<template>
  <div class="list grid grid-cols-3" v-if="!!blogs">
    <BlogItem
      v-for="blog in blogs"
      v-bind:key="blog.slug"
      :slug="blog.slug"
      :content="blog.content"
      :date="blog.date"
      :imagePath="blog.imagePath"
    ></BlogItem>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from "@/store/blog";
import { storeToRefs } from "pinia";
import BlogItem from "../../components/common/BlogItem.vue";

const store = useBlogStore();
store.fetchBlogs(12, 1);
const { blogs } = storeToRefs(store);
</script>

<style>
.list {
  margin: 0rem 20%;
}
</style>
