<script setup>
import { getPlanList } from "@/api/plan";
import Image1 from "@/assets/img/travel1.png";
import Image2 from "@/assets/img/travel2.png";
import Image3 from "@/assets/img/travel3.png";
import Image4 from "@/assets/img/travel4.png";
import Image5 from "@/assets/img/travel5.png";
import Image6 from "@/assets/img/travel6.png";
import Image7 from "@/assets/img/travel7.png";
import BaseModal from "@/components/BaseModal.vue";
import { OK } from "@/constant/status";
import { PlusCircleIcon, TrashIcon } from "@heroicons/vue/24/solid";

import { onMounted, ref } from "vue";
import router from "../../router";
import { usePlanStore } from "@/stores/plan-store";

const { handleDeletePlan } = usePlanStore();

const plans = ref([]);
const images = ref([Image1, Image2, Image3, Image4, Image5, Image6, Image7]);
const isOpenAddPlanModal = ref(false);

const getRandomImage = () => {
  return images.value[Math.floor(Math.random() * images.value.length)];
};

onMounted(async () => {
  const { data, status } = await getPlanList();
  if (status === OK) plans.value = data;
});
</script>

<template>
  <BaseModal
    v-if="isOpenAddPlanModal"
    :modal-type="'새로운 여행 계획'"
    @close-modal="isOpenAddPlanModal = false"
  />
  <main class="page">
    <div class="inner">
      <span style="color: #aaa; font-weight: 400"
        >*커버 이미지는 AI로 생성 되어 임의로 지정 됩니다.
      </span>
      <div class="cards">
        <div class="card pointer" v-for="plan in plans" :key="plan.id">
          <div class="trash" @click="handleDeletePlan(plan.id)">
            <TrashIcon class="trash-icon" />
          </div>
          <div class="image-container">
            <img :src="getRandomImage()" alt="커버 이미지" />
          </div>
          <div class="text-container" @click="router.push('/plan/' + plan.id)">
            <h1>{{ plan.planTitle }}</h1>
            <p>{{ plan.description }}</p>
          </div>
        </div>
        <div class="card add-card pointer" @click="() => (isOpenAddPlanModal = true)">
          <PlusCircleIcon />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page {
  margin-top: 5rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300px;
  max-width: 30%;
  border: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
  margin: 1rem 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.trash {
  z-index: 10;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  right: 8px;
  top: 3px;
  position: absolute;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.trash:hover {
  background-color: #7aa2ce;
}

.trash-icon {
  width: 20px;
  height: 20px;
}

.trash-icon:hover {
  color: white;
}

.add-card {
  justify-content: center;
}

.add-card svg {
  width: 50%;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.image-container {
  width: 100%;
}

.image-container img {
  width: 100%;
  height: 200px;
  display: block;
  object-fit: cover;
}

.text-container {
  width: 90%;
  background-color: white;
  text-align: center;
  padding: 1rem;
}

.text-container h1 {
  margin: 0.5rem 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-container p {
  margin: 0.5rem 0;
  color: #777;
  font-size: 1rem;
}
</style>
