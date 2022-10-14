<template>
  <BlogItem
    description="This is a mock test descafolijsnbfkjusebflikGBFIEUFgbvseaiyhfvgbklIUFGELIUKYFealjfezikfhz"
    imagePath="car-rear-view.jpg"
    :date="date"
    slug="winters-of-breath"
  ></BlogItem>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BlogItem from "../../components/common/BlogItem.vue";

@Options({
  components: {
    BlogItem,
  },
})
export default class BlogListPage extends Vue {
  date = new Date();
}
</script>

<style></style>
