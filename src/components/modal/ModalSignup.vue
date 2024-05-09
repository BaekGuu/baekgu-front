<script setup>
import { ref } from "vue";
import BaseButton from "../BaseButton.vue";
import { useNotification } from "@kyvg/vue3-notification";
import { checkDuplicateId, checkDuplicateNickName, signup } from "@/api/member";
import { OK } from "@/constant/status";

const { notify } = useNotification();

const user = ref({
  nickName: null,
  id: null,
  password: null,
  checkPassword: null,
  email: null,
});

const canUseID = ref(false);
const canUseNickName = ref(false);
const canUsePassword = ref(false);
const canSignup = ref(false);

const handleClickIdCheckButton = async () => {
  if (!user.value.id) {
    notify("아이디를 입력해 주세요!");
    return;
  }

  const { data } = await checkDuplicateId(user.value.id);
  if (data === 0) canUseID.value = true;
  else notify("이미 사용 중인 아이디 입니다!");
};

const handleClickNickNameCheckButton = async () => {
  if (!user.value.nickName) {
    notify("닉네임을 입력해 주세요!");
    return;
  }

  const { data } = await checkDuplicateNickName(user.value.nickName);
  if (data === 0) canUseNickName.value = true;
  else notify("이미 사용 중인 닉네임 입니다!");
};

const handleSubmit = async () => {
  canSignup.value =
    !canUseID.value && !canUseNickName.value && !canUsePassword.value && user.value.email;

  if (!canSignup.value) {
    notify("모든 항목을 작성해 주세요!");
    return;
  }

  const params = {
    nickName: user.value.nickName,
    id: user.value.id,
    password: user.value.password,
    email: user.value.email,
  };

  const { status } = await signup(params);
  if (status == OK) notify("회원가입 성공!");
  else notify("회원 가입 실패 ㅠㅠ");
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input
        type="text"
        placeholder="닉네임"
        v-model="user.nickName"
        @change="
          () => {
            canUseNickName = false;
          }
        "
      />
      <BaseButton
        text="중복확인"
        :isActive="true"
        :type="canUseNickName ? 'check' : 'button'"
        @click="handleClickNickNameCheckButton"
      />
    </div>
    <div>
      <input
        type="text"
        placeholder="아이디"
        v-model="user.id"
        @change="
          () => {
            canUseID = false;
          }
        "
      />
      <BaseButton
        text="중복확인"
        :isActive="true"
        :type="canUseID ? 'check' : 'button'"
        @click="handleClickIdCheckButton"
      ></BaseButton>
    </div>
    <input type="password" placeholder="비밀번호" v-model="user.password" />
    <input
      type="password"
      placeholder="비밀번호 확인"
      v-model="user.checkPassword"
      @change="
        () => {
          canUsePassword = user.password === user.checkPassword;
        }
      "
    />
    <span v-if="user.checkPassword && user.password && canUsePassword" class="point"
      >비밀번호가 일치합니다.</span
    >
    <span v-if="user.checkPassword && user.password && !canUsePassword" class="primary"
      >비밀번호가 일치하지 않습니다.</span
    >
    <input type="text" placeholder="이메일" v-model="user.email" />
    <BaseButton text="회원가입" :isActive="canSignup" :width="100" :type="'submit'" />
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
