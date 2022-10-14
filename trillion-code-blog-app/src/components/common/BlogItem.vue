<template>
  <div v-on:click="navigateToSlug()" class="blog grid grid-cols-none">
    <div class="blog-title">
      <span>{{ new Date(blog.date).toLocaleDateString() }}</span>
    </div>
    <div class="blog-image">
      <img
        class="blog-image-main"
        width="250"
        :src="getImgUrl(blog.imagePath)"
        alt=""
      />
      <img
        class="blog-image-arrow"
        width="65"
        src="../../assets/svgs/arrow-icon-right.svg"
        alt=""
      />
    </div>
    <div class="blog-description">
      <p>{{ blog.content }}</p>
    </div>
    <div class="blog-more flex flex-row">
      <span>ΔΙΑΒΑΣΤΕ ΠΕΡΙΣΣΟΤΕΡΑ</span>
      <img width="8" src="../../assets/svgs/arrow.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { blogItem } from "@/interfaces/blogItem";
import { router } from "@/router";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {},
  props: {
    blog: BlogItem,
  },
})
export default class BlogItem extends Vue {
  blog!: blogItem;

  created() {
    console.log(this.blog);
  }

  getImgUrl(imgPath: string) {
    return require("../../assets/" + imgPath);
  }

  navigateToSlug() {
    router.push({ path: `blog/${this.blog.slug}` });
  }
}
</script>

<style>
.blog {
  width: 15rem;
  padding: 0.5rem;
}
.blog-image {
  position: relative;
  border-radius: 1rem;
}
.blog-image-arrow {
  position: absolute;
  background-color: white;
  top: 64%;
  left: 69.4%;
  border-bottom-right-radius: 25px;
  opacity: 0.6;
  mask: url("../../assets/svgs/arrow-icon-right.svg") no-repeat center / contain;
  -webkit-mask: url("../../assets/svgs/arrow-icon-right.svg") no-repeat center /
    contain;
}

.blog:hover .blog-image-arrow {
  opacity: 1;
}

.blog-image-main {
  border-bottom-right-radius: 15px;
}
.blog:hover {
  transform: scale(1.02);
  cursor: pointer;
  background-color: white;
  border: 1px solid #ececec;
  border-radius: 0.5rem;
}
.blog-title {
  text-align: start;
  font-size: 12px;
}
.blog-more {
  align-items: center;
}
.blog-more img {
  margin-left: 0.3rem;
}
.blog-more span {
  margin-left: 0.3rem;
  color: #85d8fe;
  font-size: 12px;
}
.blog-description p {
  color: #4c4c4c;
  font-size: 16px;
  word-break: break-all;
  text-align: start;
  width: 12.5rem;
}
</style>
