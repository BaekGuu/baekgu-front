<script setup>
import { getUserInfo } from "@/api/member";
import { useMemberStore } from "@/stores/member-store";
import { getCookie } from "@/util/cookies";
import { onMounted } from "vue";
import baekgu_profile from "../../assets/img/baekgu_profile.png";

const { member } = useMemberStore();

onMounted(async () => {
  const { data } = await getUserInfo(getCookie("userId"));
  member.id = data.id;
  member.nickName = data.nickName;
  member.email = data.email;
});
</script>

<template>
  <div class="profile">
    <div>
      <img :src="baekgu_profile" alt="백구이미지" />
    </div>
    <p>닉네임: {{ member.nickName }}</p>
    <p>아이디: {{ member.id }}</p>
    <p>비밀번호: ********</p>
    <p>이메일: {{ member.email }}</p>
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
