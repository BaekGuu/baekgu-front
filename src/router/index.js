import { createRouter, createWebHistory } from "vue-router";
import BoardView from "@/views/BoardView.vue";
import MainView from "@/views/MainView.vue";
import SearchView from "@/views/SearchView.vue";

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/board",
      name: "board",
      component: BoardView,
    },
  ],
});

export default router;
