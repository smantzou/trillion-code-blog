import { useBlogStore } from "@/store/blog";
import { createRouter, createWebHashHistory } from "vue-router";
import BlogListPage from "../pages/BlogListPage/BlogListPage.vue";
import BlogPage from "../pages/BlogPage/BlogPage.vue";

const routes = [
  { path: "/blogs", name: "blogs", component: BlogListPage },
  { path: "/blog/:slug", name: "blog", component: BlogPage },
  { path: "/:pathMatch(.*)*", redirect: { name: "blogs" } },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((guard) => {
  if (guard.matched[0].name === "blog") {
    const blogStore = useBlogStore();
    blogStore.fetchBlogBySlugWithRelatedBlogs(guard.params["slug"] as string);
  }
});
