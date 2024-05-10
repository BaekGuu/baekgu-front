<script setup>
import { getCookie } from "@/util/cookies";
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted } from "vue";

const { notify } = useNotification();
onMounted(async () => {
  if (!getCookie("username")) {
    notify({
      type: "error",
      title: "회원 전용 메뉴 입니다!",
      text: "먼저 로그인을 진행 해주세요 :)",
    });
  }
});
</script>

<template>
  <main class="page">여행지 검색 페이지~</main>
</template>

<style scoped></style>
