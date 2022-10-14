<template>
  <span>Blog Page works!</span>
  <span>{{ selectedBlog }}</span>
</template>

<script setup lang="ts">
import { router } from "@/router";
import { useBlogStore } from "@/store/blog";
import { storeToRefs } from "pinia";

const store = useBlogStore();
const slug = router.currentRoute.value.fullPath?.toString().split("/blog/")[1];
const { selectedBlog } = storeToRefs(store);
await store.fetchBlogBySlugWithRelatedBlogs(slug);
</script>

<style></style>
