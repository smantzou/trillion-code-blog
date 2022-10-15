<template>
  <div v-if="!!selectedBlog" class="blogPage grid grid-cols-none">
    <div class="main-content">
      <div v-html="selectedBlog!.content"></div>
    </div>

    <div class="flex flex-row">
      <div v-for="blog in selectedBlog?.relatedBlogs" v-bind:key="blog.slug">
        <BlogItem
          :slug="blog.slug"
          :name="blog.name"
          :date="blog.date"
          :imagePath="blog.imagePath"
        ></BlogItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router";
import { useBlogStore } from "@/store/blog";
import { storeToRefs } from "pinia";
import BlogItem from "@/components/common/BlogItem.vue";

const store = useBlogStore();

const slug = router.currentRoute.value.fullPath?.toString().split("/blog/")[1];
const { selectedBlog } = storeToRefs(store);
store.fetchBlogBySlugWithRelatedBlogs(slug);
</script>

<style>
.blogPage {
  margin-left: 11.5rem;
}
</style>
