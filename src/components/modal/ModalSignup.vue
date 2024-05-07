<script setup>
import BaseButton from "../BaseButton.vue";
</script>

<template>
  <form action="">
    <div>
      <input type="text" placeholder="닉네임" />
      <BaseButton text="중복확인" :isActive="true" />
    </div>
    <div>
      <input type="text" placeholder="아이디" />
      <BaseButton text="중복확인" :isActive="true"></BaseButton>
    </div>
    <input type="text" placeholder="비밀번호" /><input type="text" placeholder="비밀번호 확인" />
    <span></span> <input type="text" placeholder="이메일" />
    <BaseButton text="회원가입" :isActive="false" />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 4rem;
  gap: 1rem;
}

form div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
</style>
