<script setup>
import BaseButton from "../BaseButton.vue";
import { setCookie } from "@/util/cookies";
import { login } from "@/api/member";
import { ref } from "vue";
import { OK } from "@/constant/status";

const id = ref("");
const password = ref("");

const handleSubmit = async () => {
  const requestBody = {
    id: id.value,
    password: password.value,
  };

  const { status, data } = await login(requestBody);
  if (status === OK) {
    alert("로그인 성공!");
    setCookie("username", data.nickName);
    location.href = "/";
  } else {
    alert("로그인 실패 ㅠㅠ");
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="아이디" v-model="id" />
    <input type="password" placeholder="비밀번호" v-model="password" />
    <BaseButton text="로그인" :is-active="true" :width="100" :type="'submit'" />
    <div class="social">
      <img src="../../assets/img/kakao_login.svg" alt="카카오로그인" />
      <img src="../../assets/img/naver_login.svg" alt="네이버로그인" />
      <img src="../../assets/img/google_login.svg" alt="구글로그인" />
    </div>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 4rem;
  gap: 1rem;
}

.social {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.social img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
