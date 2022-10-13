import { defineStore } from "pinia";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";

import { blogItem } from "@/interfaces/blogItem";
import { backend } from "@/environment";

export const useBlogStore = defineStore("counter", {
  state: () => ({
    blogs: new Map<string, blogItem>(),
    selectedBlogId: 0,
    selectedBlog: {},
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
        response.data.forEach((datum: blogItem) => {
          this.blogs.set(datum.slug, datum);
        });
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
