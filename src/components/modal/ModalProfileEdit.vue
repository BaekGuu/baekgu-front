<script setup>
import BaseButton from "../BaseButton.vue";
import baekgu_profile from "../../assets/img/baekgu_profile.png";
import { checkDuplicateNickName, editUserInfo } from "@/api/member";
import { useNotification } from "@kyvg/vue3-notification";
import { ref, watchEffect } from "vue";
import { OK } from "@/constant/status";
import { getCookie, setCookie } from "@/util/cookies";

const { notify } = useNotification();

const user = ref({
  nickName: "",
  password: "",
  checkPassword: "",
  email: "",
});

const canUseNickName = ref(false);
const canUsePassword = ref(false);
const canEditProfile = ref(false);

watchEffect(() => {
  canEditProfile.value = canUseNickName.value && canUsePassword.value && user.value.email !== "";
});

watchEffect(() => {
  canUsePassword.value = user.value.password === user.value.checkPassword;
});

const handleClickNickNameCheckButton = async () => {
  if (!user.value.nickName) {
    notify({ type: "warn", text: "닉네임을 입력해 주세요!" });
    return;
  }

  const { data } = await checkDuplicateNickName(user.value.nickName);
  if (data === 0) canUseNickName.value = true;
  else notify({ type: "warn", text: "이미 사용 중인 닉네임 입니다!" });
};

const handleSubmit = async () => {
  if (!canEditProfile.value) {
    notify({ type: "warn", text: "모든 항목을 작성해 주세요!" });
    return;
  }

  const params = {
    id: getCookie("userId"),
    nickName: user.value.nickName,
    password: user.value.password,
    email: user.value.email,
  };

  const { status } = await editUserInfo(params);

  if (status === OK) {
    notify({ type: "success", text: "회원 정보가 수정 되었습니다!" });
    setCookie("username", user.value.nickName);
    location.href = "/";
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <img :src="baekgu_profile" alt="백구이미지" />
    </div>
    <div>
      <input
        type="text"
        placeholder="닉네임"
        v-model="user.nickName"
        @change="canUseNickName = false"
      />
      <BaseButton
        text="중복확인"
        :isActive="true"
        :type="canUseNickName ? 'check' : 'button'"
        @click="handleClickNickNameCheckButton"
      />
    </div>
    <input type="password" placeholder="비밀번호" v-model="user.password" />
    <input type="password" placeholder="비밀번호 확인" v-model="user.checkPassword" />
    <span v-if="user.checkPassword && user.password && canUsePassword" class="point"
      >비밀번호가 일치합니다.</span
    >
    <span v-if="user.checkPassword && user.password && !canUsePassword" class="primary"
      >비밀번호가 일치하지 않습니다.</span
    >
    <input type="text" placeholder="이메일" v-model="user.email" />
    <BaseButton text="수정하기" :isActive="canEditProfile" :width="100" :type="'submit'" />
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
