import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0, todos: [] }),
  getters: {},
  actions: {
    increment() {
      this.count++;
    },
  },
});