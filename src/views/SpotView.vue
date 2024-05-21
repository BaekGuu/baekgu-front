a
<script setup>
import { getSpotDetail, getBarrierFreeInfo } from "@/api/data";
import { OK } from "@/constant/status";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { barrierFreeInfo } from "@/util/types.js";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ArrowUpCircleIcon } from "@heroicons/vue/24/solid";

const route = useRoute();

const isLoading = ref(true);
const scrollY = ref(window.scrollY);
const spot = ref([]);
const barrierfree = ref([]);

const fetchDetail = async () => {
  const { data, status } = await getSpotDetail(route.path.split("/detail/")[1]);
  if (status === OK) {
    spot.value = data.response.body.items.item[0];
    isLoading.value = false;
  }
};

const fetchBarrierFree = async () => {
  const { data, status } = await getBarrierFreeInfo(route.path.split("/detail/")[1]);
  if (status === OK) {
    barrierfree.value = data.response.body.items.item[0];
  }
};

const handleChangeHash = async () => {
  if (isLoading.value) return;
  document.querySelectorAll("a").forEach(el => el.classList.remove("active"));

  if (route.hash === "#picture") {
    document.getElementById("menu1").classList.add("active");
  } else if (route.hash === "#basic") {
    document.getElementById("menu2").classList.add("active");
  } else if (route.hash === "#barrierfree") {
    document.getElementById("menu3").classList.add("active");
  } else if (route.hash === "#location") {
    document.getElementById("menu4").classList.add("active");
  }

  document.querySelector(route.hash).scrollIntoView({ behavior: "smooth" });
};

const handleChangeScroll = () => {
  scrollY.value = window.scrollY;
  console.log(scrollY.value);
};

onMounted(async () => {
  fetchDetail();
  fetchBarrierFree();
  window.addEventListener("hashchange", handleChangeHash);
  window.addEventListener("scroll", handleChangeScroll);
});

onUnmounted(() => {
  window.removeEventListener("hashchange", handleChangeHash);
  window.removeEventListener("scroll", handleChangeScroll);
});
</script>

<template>
  <div class="page" id="top">
    <div v-if="isLoading">로딩 중..</div>
    <div v-else class="inner" id="content">
      <div class="title">
        <h1>{{ spot.title }}</h1>
        <p>{{ spot.addr1.split(" ").slice(0, 2).join(" ") }}</p>
      </div>

      <div :class="scrollY > 50 ? 'top-menu' : 'menu'">
        <a href="#picture" id="menu1" class="active">사진</a>
        <a href="#basic" id="menu2">기본 정보</a>
        <a href="#barrierfree" id="menu3">무장애 편의정보</a>
        <a href="#location" id="menu4">위치</a>
      </div>

      <section class="picture" id="picture">
        <h1>사진</h1>
        <hr />
        <img :src="spot.firstimage" :alt="spot.title" />
      </section>

      <section class="basic" id="basic">
        <h1>기본 정보</h1>
        <hr />
        <p>{{ spot.addr1 && "🗺️주소: " + spot.addr1 }}</p>
        <p>{{ spot.telname && "☎" + spot.telname + ": " + spot.tel }}</p>
        <p>{{ spot.homepage && "🏡홈페이지: " + spot.homepage }}</p>
        <p>{{ spot.overview && "💬설명: " + spot.overview }}</p>
      </section>

      <section class="barrierfree" id="barrierfree">
        <h1>무장애 편의정보</h1>
        <hr />
        <div>
          <p v-for="info in Object.keys(barrierFreeInfo)" :key="info">
            {{ barrierfree[info] && barrierFreeInfo[info] + ": " + barrierfree[info] }}
          </p>
        </div>
      </section>

      <section class="location" id="location">
        <h1>위치</h1>
        <hr />
        <div class="map">
          <KakaoMap :lat="spot.mapy" :lng="spot.mapx" :draggable="true" style="width: 100%">
            <KakaoMapMarker :lat="spot.mapy" :lng="spot.mapx"></KakaoMapMarker>
          </KakaoMap>
        </div>
      </section>
    </div>
    <a href="#top">
      <ArrowUpCircleIcon class="to-top point pointer" />
    </a>
  </div>
</template>

<style scoped>
section {
  margin: 2rem 0;
}

.title {
  text-align: center;
  margin: 2rem 0;
}

h1 {
  margin: 0;
}

.top-menu {
  position: fixed;
  top: 135px;
  left: 0;
  width: 100vw;
  display: flex;
  background-color: #eeeeee;
  border-radius: 10px;
}

.menu {
  position: sticky;
  top: 20%;
  display: flex;
  background-color: #eeeeee;
  border-radius: 10px;
  margin: 2rem 0;
}

a {
  width: 25%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

a.active {
  color: #ff747c;
  border-radius: 10px;
  border: solid 5px #ff747c;
  background-color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  z-index: 10;
}

img {
  width: 100%;
}

hr {
  border: none;
  height: 2px;
  background-color: #000;
  margin: 1rem 0;
}

.basic p {
  font-size: 1rem;
  line-height: 1.5rem;
}

.map {
  width: 100%;
}

.to-top {
  position: relative;
  bottom: 3vh;
  left: 88vw;
  width: 8%;
}
</style>
