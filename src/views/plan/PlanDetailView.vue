<script setup>
import { onMounted, ref } from "vue";
import { addDateToPlan, deleteDateToPlan, deleteSpotFromPlan, getPlanDetail } from "../../api/plan";
import { useRoute } from "vue-router";
import { OK } from "../../constant/status";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PlusCircleIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { useNotification } from "@kyvg/vue3-notification";
import { KakaoMap, KakaoMapPolyline } from "vue3-kakao-maps";
import NoImage from "@/assets/img/noimage.png";

const latLngList = ref([
  { lat: 33.45, lng: 126.571 },
  { lat: 33.449, lng: 126.5705 },
  { lat: 33.45, lng: 126.5725 },
]);

const route = useRoute();
const { notify } = useNotification();

const plan = ref({ id: "", title: "", description: "" });
const plansByDate = ref([]);
const selectedDay = ref(-1);
const isOpenMap = ref(false);

const handleClickDay = day => {
  selectedDay.value = day;
};

const handleClickShowMap = () => {
  if (selectedDay.value === -1) {
    notify({ type: "warn", text: "날짜를 선택해 주세요!" });
    return;
  }
  isOpenMap.value = !isOpenMap.value;
};

const handleClickAddDate = async id => {
  const { status } = await addDateToPlan(id);
  if (status === OK) alert("날짜 추가!");
};

const handleClickDeleteDate = async id => {
  const flag = confirm("정말 삭제?");
  if (!flag) return;
  const { status } = await deleteDateToPlan(id);
  if (status === OK) alert("날짜 삭제!");
};

const handleClickDeleteSpot = async id => {
  const flag = window.confirm("정말 삭제 하시겠습니까?");
  if (!flag) return;
  const { status } = await deleteSpotFromPlan(id);
  if (status === OK) {
    notify({ type: "success", text: "여행지가 삭제 되었습니다!" });
  }
};

onMounted(async () => {
  const { data, status } = await getPlanDetail(route.path.split("/")[2]);
  if (status === OK) {
    plan.value.title = data.planTitle;
    plan.value.description = data.description;
    plan.value.id = data.id;
    plansByDate.value = data.planDate;
  }

  console.log(data);
});
</script>

<template>
  <main class="page">
    <div class="inner">
      <section class="title">
        <h1>{{ plan.title }}</h1>
        <span>{{ plan.description }}</span>
      </section>

      <div v-if="plansByDate.length === 0">
        <p>이 계획은 비어있어요😥 여행지를 검색하고, 나만의 계획을 세워 보세요!</p>
        <a href="/search" style="text-decoration: underline">여행지 검색으로 이동</a>
      </div>
      <section v-else class="plans">
        <div v-for="(planDate, index) in plansByDate" :key="index" class="plan">
          <CheckCircleIcon
            v-if="index === selectedDay"
            class="check-icon point"
            @click="handleClickDay(index)"
          />
          <div v-else @click="handleClickDay(index)">
            <div class="circle"></div>
          </div>
          <h3>
            <span>{{ index + 1 }}</span> days
          </h3>
          <div class="spots">
            <div v-for="spot in planDate" :key="spot.contentId" class="spot pointer">
              <img :src="spot.image ? spot.image : NoImage" :alt="spot.title" />
              <XMarkIcon @click="handleClickDeleteSpot(spot.id)" />
            </div>
          </div>
          <TrashIcon class="trash-icon" @click="() => handleClickDeleteDate(plan.id)" />
        </div>

        <div class="button-container">
          <div class="button pointer" @click="() => handleClickAddDate(plan.id)">
            <p>여행 날짜 추가하기</p>
            <PlusCircleIcon />
          </div>
          <div class="button pointer" @click="handleClickShowMap">
            <p>선택한 날짜로 경로 보기</p>
            <ChevronDoubleUpIcon v-if="isOpenMap" />
            <ChevronDoubleDownIcon v-else />
          </div>
        </div>
      </section>

      <section v-if="isOpenMap">
        <div class="map">
          <KakaoMap :lat="33.450701" :lng="126.570667" style="width: 100%">
            <KakaoMapPolyline :latLngList="latLngList" />
          </KakaoMap>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
section {
  margin: 3rem 0;
}

svg {
  cursor: pointer;
}

.plan {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  background-color: #eee;
  border-radius: 15px;
  padding: 0.8rem 1rem;
  padding-left: 0;
  overflow-x: auto;
}

.selected-day {
  background-color: #7aa2ce;
  color: #fff;
}

.circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #aaa;
  margin: 0 0.5rem;
}

.circle:hover {
  background-color: #7aa2ce;
}

.check-icon {
  width: 1.8rem;
  margin: 0 0.5rem;
}

.trash-icon {
  width: 20px;
  position: absolute;
  top: 8px;
  right: 8px;
}

.plan h3 {
  width: 10%;
  text-align: center;
  white-space: nowrap;
  padding-right: 1rem;
}

.spots {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
}

.spot {
  position: relative;
  width: 100%;
  height: 100%;
}

.spot img {
  border-radius: 10px;
  background-color: #fff;
}

.spot img:hover {
  box-shadow: 5px 5px 5px #aaa;
}

.spot svg {
  width: 20px;
  position: absolute;
  top: 5px;
  right: 5px;
}

.spot img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.button {
  text-align: center;
  display: flex;
}

.button svg {
  width: 20px;
}

.button p {
  text-align: end;
  margin: 0;
}

.button:hover {
  color: #7aa2ce;
  transform: translateY(-2px);
}

.map {
  width: 100%;
}
</style>
