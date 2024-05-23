<script setup>
import { onMounted, ref, watch } from "vue";
import { getPlanDetail } from "../../api/plan";
import { useRoute } from "vue-router";
import { OK } from "../../constant/status";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/solid";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { useNotification } from "@kyvg/vue3-notification";
import { KakaoMap, KakaoMapMarkerPolyline } from "vue3-kakao-maps";
import NoImage from "@/assets/img/noimage.png";
import { usePlanStore } from "@/stores/plan-store";
import draggable from "vuedraggable";

const route = useRoute();
const { handleClickAddDate, handleClickDeleteDate, handleClickDeleteSpot } = usePlanStore();
const { notify } = useNotification();

const plan = ref({ memberId: "", id: "", title: "", description: "" });
const plansByDate = ref({});
const selectedDay = ref(-1);
const isOpenMap = ref(false);
const markerList = ref([]);
const drag = ref(false);

const handleClickDay = day => {
  console.log(day);
  if (selectedDay.value === day) selectedDay.value = -1;
  else selectedDay.value = day;
};

const handleClickShowMap = () => {
  if (selectedDay.value === -1) {
    notify({ type: "warn", text: "날짜를 선택해 주세요!" });
    return;
  }
  if (markerList.value.length === 0) {
    notify({ type: "error", text: "선택하신 날짜에 경로를 보여줄 여행지가 없습니다!" });
    return;
  }
  isOpenMap.value = !isOpenMap.value;
};

const handleChangeOrder = e => {
  console.log(e);
  // e.dragged => 드래그 된 친구
  // e.related => 원래 있던 친궄
};

onMounted(async () => {
  const { data, status } = await getPlanDetail(route.path.split("/")[2]);
  if (status === OK) {
    plan.value = {
      memberId: data.memberId,
      id: data.id,
      title: data.planTitle,
      description: data.description,
    };
    plansByDate.value = { ...data.planDate };
  }
});

const markerImage = {
  imageSrc: "https://my-web-contents-bucket.s3.ap-northeast-2.amazonaws.com/marker.png",
  imageWidth: 50,
  imageHeight: 50,
};

watch(selectedDay, () => {
  markerList.value = [];
  plansByDate.value[selectedDay.value].forEach(element => {
    markerList.value.push({
      lat: element["mapy"],
      lng: element["mapx"],
      image: markerImage,
      orderBottomMargin: "35px",
    });
  });
});
</script>

<template>
  <main class="page">
    <div class="inner">
      <section class="title bg-assistant">
        <h1>{{ plan.title }}</h1>
        <p>{{ plan.description }}</p>
        <img src="../../assets/img/baekgu_bark.svg" />
      </section>

      <div v-if="plansByDate.length === 0">
        <p>이 계획은 비어있어요😥 여행지를 검색하고, 나만의 계획을 세워 보세요!</p>
        <a href="/search" style="text-decoration: underline">여행지 검색으로 이동</a>
      </div>

      <section v-else class="plans">
        <div v-for="(key, idx) in Object.keys(plansByDate)" :key="key" class="plan">
          <CheckCircleIcon
            v-if="key === selectedDay"
            class="check-icon point"
            @click="handleClickDay(key)"
          />
          <div v-else @click="handleClickDay(key)">
            <div class="circle"></div>
          </div>
          <div class="day">
            <h3 class="point">
              <span>{{ idx + 1 }}</span> day
            </h3>
            <p @click="() => handleClickDeleteDate(key)" class="pointer button">날짜 삭제하기</p>
          </div>

          <draggable
            v-model="plansByDate[key]"
            @start="drag = true"
            @end="drag = false"
            item-key="contentId"
            :move="handleChangeOrder"
            class="spots pointer"
          >
            <template #item="{ element: spot }">
              <div class="spot">
                <img :src="spot.image ? spot.image : NoImage" :alt="spot.title" />
                <span class="spot-title">{{ spot.title }}</span>
                <XCircleIcon @click="handleClickDeleteSpot(spot.id)" />
              </div>
            </template>
          </draggable>
        </div>

        <div class="button-container">
          <div class="button pointer" @click="() => handleClickAddDate(plan.id)">
            <p>여행 날짜 추가하기</p>
            <PlusCircleIcon />
          </div>
          <div class="button pointer" @click="handleClickShowMap">
            <p :class="isOpenMap && 'point'">선택한 날짜로 경로 보기</p>
            <ChevronDoubleUpIcon v-if="isOpenMap" :class="isOpenMap && 'point'" />
            <ChevronDoubleDownIcon v-else />
          </div>
        </div>
      </section>

      <section v-if="isOpenMap">
        <div class="map">
          <KakaoMap :lat="markerList[0]['lat']" :lng="markerList[0]['lng']" style="width: 100%">
            <KakaoMapMarkerPolyline
              :markerList="markerList"
              :showMarkerOrder="true"
              :endArrow="true"
              strokeColor="#ff747c"
              :strokeOpacity="1"
            />
          </KakaoMap>
        </div>
      </section>
      <div v-else style="height: 300px"></div>
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

.title {
  text-align: start;
  padding: 2rem;
  border-radius: 10px;
}

.title h1 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.title img {
  position: absolute;
  right: 21%;
  top: 15%;
  width: 5rem;
}

.plan {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-radius: 15px;
  overflow: auto;
  border: 2px solid #7aa2ce;
  min-height: 230px;
}

.selected-day {
  background-color: #7aa2ce;
  color: #fff;
}

.circle {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid #aaa;
  margin: 0 0.5rem;
}

.circle:hover {
  background-color: #7aa2ce;
}

.check-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.5rem;
}

.plan .day {
  width: 10%;
  padding-right: 1rem;
  text-align: center;
}

.plan h3 {
  text-align: center;
  white-space: nowrap;
}

.plan p {
  font-size: 1rem;
}
/* 
.spots {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  margin-top: 25px;
} */

.spots {
  display: flex;
  gap: 0.5rem;
  overflow: hidden;
}

.spot {
  position: relative;
  height: 100%;
  width: 150px;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
}

.spot-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spot span {
  text-align: center;
}

.spot img {
  border-radius: 10px;
  background-color: #fff;
}

.spot img:hover {
  box-shadow: 5px 5px 5px #aaa;
}

.spot svg {
  width: 25px;
  position: relative;
  top: -165px;
  left: 120px;
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
  display: flex;
  justify-content: center;
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
