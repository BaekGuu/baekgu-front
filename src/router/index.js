import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import SearchView from "@/views/SearchView.vue";
import BoardListView from "@/views/board/BoardListView.vue";
import BoardDetailView from "@/views/board/BoardDetailView.vue";
import BoardRegistView from "@/views/board/BoardRegistView.vue";
import BoardEditView from "@/views/board/BoardEditView.vue";
import SpotView from "@/views/SpotView.vue";
import { getCookie } from "@/util/cookies";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

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
    { path: "/detail/:id", name: "spot", component: SpotView },
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

const needLogin = ["/board", "/search", "/detail"];

router.beforeEach((to, from, next) => {
  if (needLogin.includes(to.path) && !getCookie("userId")) {
    notify({
      type: "error",
      title: "회원 전용 메뉴 입니다!",
      text: "로그인을 먼저 진행해 주세요.",
    });
    next("/");
  } else {
    next();
  }
});

export default router;
