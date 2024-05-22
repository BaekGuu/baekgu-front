<script setup>
import BaseButton from "../BaseButton.vue";
import { ref } from "vue";
import { getCookie } from "../../util/cookies";
import { addPlan } from "../../api/plan";
import { OK } from "../../constant/status";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const plan = ref({
  memberId: getCookie("userId"),
  planTitle: "",
  description: "",
});

const handleSubmitAddPlan = async () => {
    console.log(plan.value)
  const { status } = await addPlan(plan);
  if (status === OK) notify({ type: "success", text: "새로운 여행 계획을 세워보세요!" });
};
</script>

<template>
  <form @submit.prevent="handleSubmitAddPlan">
    <input
      type="text"
      name="plan-title"
      id="plan-title"
      v-model="plan.planTitle"
      placeholder="제목"
    />
    <textarea
      name="description"
      id="description"
      v-model="plan.description"
      placeholder="설명"
    ></textarea>

    <BaseButton text="추가하기" :is-active="true" :width="100" :type="'submit'" />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
}
</style>
