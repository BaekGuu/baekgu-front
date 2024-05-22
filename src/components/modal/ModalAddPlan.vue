<script setup>
import BaseButton from "../BaseButton.vue";
import { ref } from "vue";
import { getCookie } from "../../util/cookies";
import { addPlan } from "../../api/plan";
import { OK } from "../../constant/status";
import { useNotification } from "@kyvg/vue3-notification";
import { reload } from "../../util/custom-router";

const { notify } = useNotification();

const plan = ref({
  planTitle: "",
  description: "",
});

const handleSubmitAddPlan = async () => {
  const { status } = await addPlan({
    memberId: getCookie("userId"),
    planTitle: plan.value.planTitle,
    description: plan.value.description,
  });
  if (status === OK) {
    notify({ type: "success", text: "새로운 여행 계획을 세워보세요!" });
    reload();
  }
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
