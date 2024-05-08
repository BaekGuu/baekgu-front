<script setup>
import BaseButton from "../BaseButton.vue";
</script>

<template>
  <form action="">
    <input type="text" placeholder="아이디" />
    <input type="password" placeholder="비밀번호" />
    <BaseButton text="로그인" :is-active="true" :width="100" />
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
