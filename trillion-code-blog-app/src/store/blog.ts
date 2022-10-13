import { defineStore } from "pinia";
import axios from "axios";

export const useBlogStore = defineStore("counter", {
  state: () => ({ count: 0, todos: [] }),
  getters: {},
  actions: {
    increment() {
      this.count++;
    },
  },
});
