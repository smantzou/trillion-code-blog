<template>
  <div class="blogPage grid grid-cols-none">
    {{ selectedBlog }}
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router";
import { useBlogStore } from "@/store/blog";
import { storeToRefs } from "pinia";

const store = useBlogStore();
const slug = router.currentRoute.value.fullPath?.toString().split("/blog/")[1];
const { selectedBlog } = storeToRefs(store);
store.fetchBlogBySlugWithRelatedBlogs(slug);
</script>

<style>
.blogPage {
  width: 50%;
  margin-left: 11.5rem;
}
</style>
