<script setup>
import BaseButton from "../BaseButton.vue";
</script>

<template>
  <form action="">
    <input type="text" placeholder="아이디" />
    <input type="password" placeholder="비밀번호" />
    <BaseButton text="로그인" :is-active="true" />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 4rem;
  gap: 1rem;
}
</style>
