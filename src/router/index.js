import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import SearchView from "@/views/SearchView.vue";
import BoardListView from "@/views/board/BoardListView.vue";
import BoardDetailView from "@/views/board/BoardDetailView.vue";
import BoardRegistView from "@/views/board/BoardRegistView.vue";
import BoardEditView from "@/views/board/BoardEditView.vue";

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
    {
      path: "/board/:id",
      name: "detail",
      component: BoardDetailView,
    },
    {
      path: "/board/regist",
      name: "regist",
      component: BoardRegistView,
    },
    {
      path: "/board/edit",
      name: "edit",
      component: BoardEditView,
    },
  ],
});

export default router;
