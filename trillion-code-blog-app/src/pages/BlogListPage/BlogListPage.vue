<template>
  <div class="list grid grid-cols-3">
    <BlogItem
      v-for="blog in blogs"
      v-bind:key="blog.slug"
      :blog="blog"
    ></BlogItem>
  </div>
  {{ blogs }}
</template>

<script lang="ts">
import { blogItem } from "@/interfaces/blogItem";
import { useBlogStore } from "@/store/blog";
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import BlogItem from "../../components/common/BlogItem.vue";

@Options({
  components: {
    BlogItem,
  },
})
export default class BlogListPage extends Vue {
  date = new Date();
  blogs!: blogItem[];
  numberOfPages!: number;
  async beforeCreate() {
    const store = useBlogStore();
    await store.fetchBlogs(12, 1);
    this.blogs = ref(store.blogs).value;
    this.numberOfPages = ref(store.numberOfPages).value;
  }
}
</script>

<style>
.list {
  margin: 0rem 10rem;
}
</style>
