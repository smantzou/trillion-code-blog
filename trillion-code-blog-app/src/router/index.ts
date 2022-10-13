import { createRouter, createWebHashHistory } from "vue-router";
import BlogListPage from "../pages/BlogListPage/BlogListPage.vue";
import BlogPage from "../pages/BlogPage/BlogPage.vue";

const routes = [
  { path: "/blogs", name: "blogs", component: BlogListPage },
  { path: "/blog/:pathMatch(.*)*", name: "blog", component: BlogPage },
  { path: "/:pathMatch(.*)*", redirect: { name: "blogs" } },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
