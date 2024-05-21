<script setup>
import BaseButton from "../BaseButton.vue";
import baekgu_profile from "../../assets/img/baekgu_profile.png";
import { useMemberStore } from "@/stores/member-store";
import { computed, onMounted, ref } from "vue";
import { getUserInfo } from "@/api/member";
import { getCookie } from "@/util/cookies";

const { member, checkPassword, handleClickCheckNickName, handleclickUpdateProfile } =
  useMemberStore();

const validation = ref({
  id: true,
  nickName: false,
  password: false,
});

const isValid = computed(() => {
  return validation.value.id &&
    validation.value.password &&
    validation.value.nickName &&
    member.email
    ? true
    : false;
});

onMounted(async () => {
  const { data } = await getUserInfo(getCookie("userId"));
  member.id = data.id;
  member.nickName = data.nickName;
  member.email = data.email;
});
</script>

<template>
  <form @submit.prevent="async () => await handleclickUpdateProfile(isValid)">
    <div>
      <img :src="baekgu_profile" alt="백구이미지" />
    </div>
    <div>
      <input
        type="text"
        placeholder="닉네임"
        v-model="member.nickName"
        @input="validation.nickName = false"
      />
      <BaseButton
        text="중복확인"
        :isActive="true"
        :type="validation.nickName ? 'check' : 'button'"
        @click="
          async () => {
            validation.nickName = await handleClickCheckNickName();
          }
        "
      />
    </div>
    <input
      type="password"
      placeholder="비밀번호"
      v-model="member.password"
      @input="() => (validation.password = member.password === checkPassword)"
    />
    <input
      type="password"
      placeholder="비밀번호 확인"
      v-model="checkPassword"
      @input="() => (validation.password = member.password === checkPassword)"
    />
    <span v-if="checkPassword && validation.password" class="point">비밀번호가 일치합니다.</span>
    <span v-if="checkPassword && !validation.password" class="primary"
      >비밀번호가 일치하지 않습니다.</span
    >
    <input type="text" placeholder="이메일" v-model="member.email" />
    <BaseButton text="수정하기" :isActive="isValid" :width="100" :type="'submit'" />
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
