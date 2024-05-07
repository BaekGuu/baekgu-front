import { createRouter, createWebHistory } from "vue-router";
import BoardView from "@/views/BoardView.vue";
import MainView from "@/views/MainView.vue";

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
      path: "/board",
      name: "board",
      component: BoardView,
    },
  ],
});

export default router;
