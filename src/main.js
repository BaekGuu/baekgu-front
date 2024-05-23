import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useKakao } from "vue3-kakao-maps/@utils";
import VueAwesomePaginate from "vue-awesome-paginate";
import Notifications from "@kyvg/vue3-notification";
import "vue-awesome-paginate/dist/style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
useKakao(import.meta.env.VITE_KAKAO_MAP_KEY);

app.use(Notifications);
app.use(createPinia());
app.use(router);
app.use(VueAwesomePaginate);

app.mount("#app");
