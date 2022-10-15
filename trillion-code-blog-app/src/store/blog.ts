import { defineStore } from "pinia";
import { blogItem } from "@/interfaces/blogItem";
import { backend } from "@/environment";
import { Blog } from "@/interfaces/blog";
import axios, { AxiosError, AxiosResponse } from "axios";

interface State {
  blogs: blogItem[];
  numberOfPages: number;
  selectedBlogId: number;
  currentPage: number;
  selectedBlog: Blog | null;
  error: string | null;
}

interface blogResponse {
  data: {
    blogs: blogItem[];
    numberOfPages: number;
  };
}

interface blogWithRelatedResponse {
  data: Blog;
}

export const useBlogStore = defineStore("blogs", {
  state: (): State => ({
    blogs: [],
    numberOfPages: 0,
    selectedBlogId: 0,
    currentPage: 1,
    selectedBlog: null,
    error: null,
  }),
  getters: {
    getBlogs(state): blogItem[] {
      return state.blogs;
    },
  },
  actions: {
    async fetchBlogs(limit: number, page: number) {
      try {
        this.currentPage = page;
        const response: AxiosResponse<blogResponse> = await axios.get(
          `${backend}/blog?limit=${limit}&page=${page}`
        );
        this.blogs = response.data.data.blogs;
        if (response.data.data.numberOfPages !== this.numberOfPages) {
          this.numberOfPages = response.data.data.numberOfPages;
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          this.error = axiosError.message;
        } else {
          console.error("Error", axiosError.message);
          this.error = axiosError.message;
        }
      }
    },
    async fetchBlogBySlugWithRelatedBlogs(slug: string) {
      try {
        const response: AxiosResponse<blogWithRelatedResponse> =
          await axios.get(`${backend}/blog/slug/${slug}`, {
            params: {
              includeRelatedBlogs: true,
              includeContent: true,
            },
          });
        this.selectedBlog = response.data.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          this.error = axiosError.message;
        } else {
          console.error("Error", axiosError.message);
          this.error = axiosError.message;
        }
      }
    },
  },
});
