<script setup>
import { getBarrierFreeInfo } from "@/api/data";
import NoImage from "@/assets/img/noimage.png";
import { OK } from "@/constant/status";
import { barrierFreeEmoji } from "@/util/types";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  id: String,
  imageUrl: String,
  title: String,
  addr: String,
});

const icons = ref([]);

onMounted(async () => {
  const { data, status } = await getBarrierFreeInfo(props.id);
  if (status === OK) {
    Object.keys(data.response.body.items.item[0]).forEach(ele => {
      data.response.body.items.item[0][ele] &&
        data.response.body.items.item[0][ele] !== "contentid" &&
        icons.value.push(barrierFreeEmoji[ele]);
    });
  }
});

onUnmounted(() => (icons.value = []));
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img
        :src="imageUrl ? imageUrl : NoImage"
        :alt="title"
        :style="imageUrl && 'object-fit: cover'"
      />
    </div>
    <div class="text-container">
      <h1>{{ title }}</h1>
      <p>{{ addr }}</p>

      <div class="icons">
        <span v-for="icon in icons" :key="icon">{{ icon }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
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
  object-fit: contain;
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

.icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.icons span {
  font-size: 1.2rem;
}
</style>
