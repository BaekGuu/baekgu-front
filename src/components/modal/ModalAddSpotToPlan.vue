<script setup>
import { onMounted, ref } from "vue";
import BaseButton from "../BaseButton.vue";
import { addSpotToPlan, getPlanList } from "@/api/plan";
import { OK } from "@/constant/status";
import BaseCheckBox from "../BaseCheckBox.vue";
import { useSpotStore } from "@/stores/spot-store";
import { useNotification } from "@kyvg/vue3-notification";

const { spot, saveSpot } = useSpotStore();
const { notify } = useNotification();

const plans = ref([]);
const selectedPlan = ref(false);

const handleSubmitAddSpotToPlan = async () => {
  const flag = await saveSpot();
  if (flag) {
    const { status } = await addSpotToPlan({
      contentId: spot.contentId,
      planId: selectedPlan.value,
    });
    if (status === OK) notify({ type: "success", text: "여행 계획에 추가 되었습니다!" });
  }
};

onMounted(async () => {
  const { data, status } = await getPlanList();
  if (status === OK) plans.value = data;
});
</script>

<template>
  <form @submit.prevent="handleSubmitAddSpotToPlan">
    <div class="plans">
      <p>이 여행지를 추가하고 싶은 여행 계획을 선택해 주세요.</p>
      <BaseCheckBox
        v-for="plan in plans"
        :key="plan.id"
        :text="plan.planTitle"
        :is-checked="selectedPlan === plan.id"
        @click="selectedPlan = plan.id"
      />
    </div>

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

.checkbox {
  margin: 0.5rem 0;
}

.plans p {
  font-size: 1rem;
  text-align: center;
}
</style>
