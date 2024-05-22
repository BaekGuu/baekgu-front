<script setup>
import { getSpotDetail, getBarrierFreeInfo } from "@/api/data";
import { OK } from "@/constant/status";
import { onMounted, ref, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { barrierFreeInfo } from "@/util/types.js";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ShoppingBagIcon } from "@heroicons/vue/24/solid";
import BaseModal from "@/components/BaseModal.vue";
import { useSpotStore } from "@/stores/spot-store";

const { setSpotId } = useSpotStore();

const route = useRoute();
const isLoading = ref(true);
const scrollY = ref(window?.scrollY);
const spot = ref({});
const barrierfree = ref({});
const activeMenu = ref("menu1");
const isOpenAddPlanModal = ref(false);

const fetchDetail = async () => {
  const { data, status } = await getSpotDetail(route.params.id);
  if (status === OK) {
    spot.value = data.response.body.items.item[0];
    setSpotId(data.response.body.items.item[0].contentid);
    isLoading.value = false;
  }
};

const fetchBarrierFree = async () => {
  const { data, status } = await getBarrierFreeInfo(route.params.id);
  if (status === OK) {
    barrierfree.value = data.response.body.items.item[0];
  }
};

const scrollToTargetMenu = e => {
  e.preventDefault();
  const targetId = e.target.getAttribute("href").substring(1);
  const target = document.getElementById(targetId);
  const offset = 150;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  activeMenu.value = e.target.id;
};

const updateActiveMenu = () => {
  scrollY.value = window.scroll;
  const sections = ["picture", "basic", "barrierfree", "location"];
  const offset = 200;
  let activeSection = sections[0];

  sections.forEach(section => {
    const el = document.getElementById(section);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top - offset <= 0) {
        activeSection = section;
      }
    }
  });

  switch (activeSection) {
    case "picture":
      activeMenu.value = "menu1";
      break;
    case "basic":
      activeMenu.value = "menu2";
      break;
    case "barrierfree":
      activeMenu.value = "menu3";
      break;
    case "location":
      activeMenu.value = "menu4";
      break;
  }
};

onMounted(async () => {
  await fetchDetail();
  await fetchBarrierFree();
  window.addEventListener("scroll", updateActiveMenu);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          switch (entry.target.id) {
            case "picture":
              activeMenu.value = "menu1";
              break;
            case "basic":
              activeMenu.value = "menu2";
              break;
            case "barrierfree":
              activeMenu.value = "menu3";
              break;
            case "location":
              activeMenu.value = "menu4";
              break;
          }
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    },
  );

  ["picture", "basic", "barrierfree", "location"].forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveMenu);
});
</script>

<template>
  <BaseModal
    v-if="isOpenAddPlanModal"
    :modal-type="`여행 계획에 &quot;${spot.title}&quot; 추가하기`"
    @close-modal="isOpenAddPlanModal = fasle"
  />
  <div class="page" id="top">
    <div v-if="isLoading">로딩 중..</div>
    <div v-else class="inner" id="content">
      <div class="title">
        <div>
          <h1>{{ spot.title }}</h1>
          <p>{{ spot.addr1.split(" ").slice(0, 2).join(" ") }}</p>
        </div>
        <div class="add-plan pointer" @click="isOpenAddPlanModal = true">
          <span>내 계획에 추가하기</span>
          <ShoppingBagIcon />
        </div>
      </div>

      <div :class="scrollY > 100 ? 'top-menu' : 'menu'">
        <a
          href="#picture"
          id="menu1"
          :class="{ active: activeMenu === 'menu1' }"
          @click="scrollToTargetMenu"
          >사진</a
        >
        <a
          href="#basic"
          id="menu2"
          :class="{ active: activeMenu === 'menu2' }"
          @click="scrollToTargetMenu"
          >기본 정보</a
        >
        <a
          href="#barrierfree"
          id="menu3"
          :class="{ active: activeMenu === 'menu3' }"
          @click="scrollToTargetMenu"
          >무장애 편의정보</a
        >
        <a
          href="#location"
          id="menu4"
          :class="{ active: activeMenu === 'menu4' }"
          @click="scrollToTargetMenu"
          >위치</a
        >
      </div>

      <section class="picture" id="picture">
        <h1>사진</h1>
        <hr />
        <img
          v-if="spot.firstimage"
          :src="spot.firstimage"
          :alt="spot.title"
          style="object-fit: cover"
        />
        <img
          v-else
          src="../assets/img/noimage.png"
          :alt="spot.title + '(이미지 없음)'"
          style="object-fit: none"
        />
      </section>

      <section class="basic" id="basic">
        <h1>기본 정보</h1>
        <hr />
        <p v-if="spot.addr1">🗺️주소: {{ spot.addr1 }}</p>
        <p v-if="spot.telname">☎{{ spot.telname }}: {{ spot.tel }}</p>
        <span v-if="spot.homepage">🏡홈페이지:&nbsp;</span>
        <span v-if="spot.homepage" v-html="spot.homepage"></span>
        <p v-if="spot.overview">💬설명: {{ spot.overview }}</p>
      </section>

      <section class="barrierfree" id="barrierfree">
        <h1>무장애 편의정보</h1>
        <hr />
        <div>
          <p v-for="(label, key) in barrierFreeInfo" :key="key">
            {{ barrierfree[key] ? label + ": " + barrierfree[key] : "" }}
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
  </div>
</template>

<style scoped>
.page {
  padding-top: 100px;
}

.inner {
  padding: 0 20px;
}

section {
  margin-bottom: 8rem;
}

.title {
  text-align: center;
  margin: 2rem 0;
}

h1 {
  margin: 0;
}

.add-plan {
  display: flex;
  position: absolute;
  right: 20%;
  top: 200px;
}

.add-plan:hover {
  text-decoration: underline;
}

.add-plan svg {
  width: 20px;
}

.top-menu,
.menu {
  display: flex;
  background-color: #eeeeee;
  border-radius: 10px;
  margin: 2rem 0;
  font-size: 1.2rem;
}

.top-menu {
  position: fixed;
  top: 67px;
  left: 0;
  width: 100vw;
  margin: 0;
  z-index: 100;
}

.menu {
  position: sticky;
  top: 67px;
}

.menu a,
.top-menu a {
  width: 25%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu a.active,
.top-menu a.active {
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
  height: 500px;
}

hr {
  border: none;
  height: 2px;
  background-color: #000;
  margin: 1rem 0;
}

.basic p {
  font-size: 1.2rem;
  line-height: 1.5rem;
}

.map {
  width: 100%;
}
</style>
