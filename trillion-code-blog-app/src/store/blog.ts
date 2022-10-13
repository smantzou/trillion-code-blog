import { defineStore } from "pinia";

import { blogItem } from "@/interfaces/blogItem";
import { backend } from "@/environment";
import { Blog } from "@/interfaces/blog";
import axios, { AxiosError, AxiosResponse } from "axios";

interface State {
  blogs: blogItem[];
  selectedBlogId: number;
  selectedBlog: Blog | null;
  error: AxiosError;
}

export const useBlogStore = defineStore("counter", {
  state: (): State => ({
    blogs: [],
    selectedBlogId: 0,
    selectedBlog: null,
    error: new AxiosError(),
  }),
  getters: {
    getBlogs(state) {
      return [...state.blogs.values()];
    },
  },
  actions: {
    async fetchBlogs(limit: number, page: number) {
      try {
        const response: AxiosResponse<blogItem[]> = await axios.get(
          `${backend}/blogs?limit=${limit}&page=${page}`
        );
        this.blogs = response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          this.error = new AxiosError(
            axiosError.response.statusText,
            axiosError.response.status.toString()
          );
        } else {
          console.log("Error", axiosError.message);
          const status = axiosError.status ? axiosError.status : 500;
          this.error = new AxiosError(
            status.toString(),
            axiosError.message.toString()
          );
        }
      }
    },
    async fetchBlogBySlugWithRelatedBlogs(slug: string) {
      try {
        const response: AxiosResponse<Blog> = await axios.get(
          `${backend}/blog/${slug}?includeRelatedBlogs=true&includeContent=true`
        );
        this.selectedBlog = response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          this.error = new AxiosError(
            axiosError.response.statusText,
            axiosError.response.status.toString()
          );
        } else {
          console.log("Error", axiosError.message);
          const status = axiosError.status ? axiosError.status : 500;
          this.error = new AxiosError(
            status.toString(),
            axiosError.message.toString()
          );
        }
      }
    },
  },
});
