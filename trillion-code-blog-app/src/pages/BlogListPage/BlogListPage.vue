<template>
  <BlogItem
    description="This is a mock test descafolijsnbfkjusebflikGBFIEUFgbvseaiyhfvgbklIUFGELIUKYFealjfezikfhz"
    imagePath="car-rear-view.jpg"
    :date="date"
    slug="winters-of-breath"
  ></BlogItem>
</template>

<script lang="ts">
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
  created() {
    const store = useBlogStore();
    const blogs = ref(store.blogs);

    store.fetchBlogs(12, 1);
    console.log(blogs);
  }
}
</script>

<style></style>
