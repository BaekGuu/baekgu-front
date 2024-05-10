<script setup>
import baekgu_profile from "../../assets/img/baekgu_profile.png";
import { onMounted, ref } from "vue";
import { getCookie } from "@/util/cookies";
import { getUserInfo } from "@/api/member";

const user = ref({
  id: "",
  nickName: "",
  password: null,
  email: "",
});

onMounted(async () => {
  const { data } = await getUserInfo(getCookie("userId"));
  user.value = data;
});
</script>

<template>
  <div class="profile">
    <div>
      <img :src="baekgu_profile" alt="백구이미지" />
    </div>
    <p>닉네임: {{ user.nickName }}</p>
    <p>아이디: {{ user.id }}</p>
    <p>비밀번호: ********</p>
    <p>이메일: {{ user.email }}</p>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  padding: 3rem 7rem;
  gap: 1rem;
}
</style>
