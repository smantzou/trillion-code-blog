<template>
  <div
    v-on:click="$options.navigateToSlug($props.slug)"
    class="blog grid grid-cols-none"
  >
    <div class="blog-title">
      <span>{{ new Date($props.date as string).toLocaleDateString() }}</span>
    </div>
    <div class="blog-image">
      <img
        v-if="!!imagePath"
        class="blog-image-main"
        width="250"
        :src="$options.getImgUrl(imagePath)"
        alt=""
      />
      <img
        class="blog-image-arrow"
        width="65"
        src="../../../public/assets/svgs/arrow-icon-right.svg"
        alt=""
      />
    </div>
    <div class="blog-description">
      <p>{{ $props.name }}</p>
    </div>
    <div class="blog-more flex flex-row">
      <span>ΔΙΑΒΑΣΤΕ ΠΕΡΙΣΣΟΤΕΡΑ</span>
      <img width="8" src="../../../public/assets/svgs/arrow.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { router } from "@/router";
export default {
  props: {
    imagePath: String,
    name: String,
    date: String,
    slug: String,
  },
  getImgUrl(imgPath: string) {
    return require("../../../public/assets/" + imgPath);
  },

  navigateToSlug(slug: string) {
    router.push({ path: `/blog/${slug}` });
  },
};
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
  mask: url("../../../public/assets/svgs/arrow-icon-right.svg") no-repeat center /
    contain;
  -webkit-mask: url("../../../public/assets/svgs/arrow-icon-right.svg")
    no-repeat center / contain;
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
