import { createRouter, createWebHistory } from "vue-router";
import BoardListView from "@/views/BoardListView.vue";
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
      component: BoardListView,
    },
  ],
});

export default router;
