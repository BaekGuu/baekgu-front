<script setup>
import { RouterLink, useRoute } from "vue-router";
import AppModal from "../BaseModal.vue";
import { computed, ref, watch } from "vue";
import { getCookie } from "@/util/cookies";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";
import router from "@/router";
import { useMemberStore } from "@/stores/member-store";

const route = useRoute();
const { handleClickLogout } = useMemberStore();

const isOpenModal = ref(false);
const isOpenUserSection = ref(false);
const modalType = ref("로그인");
const username = ref(getCookie("username"));

const openModal = type => {
  isOpenModal.value = true;
  modalType.value = type;
};

const closeModal = () => {
  isOpenModal.value = false;
  modalType.value = "로그인";
};

const handleClickOpenUserSection = () => {
  isOpenUserSection.value = !isOpenUserSection.value;
};

watch(isOpenUserSection, () => {
  const userInfoSection = document.getElementById("userInfoSection");
  const userInfo = document.getElementById("userInfo");

  if (isOpenUserSection.value) {
    userInfo.style.cssText = `
      display: flex;
      flex-direction: column;
      text-align: center;
    `;
    userInfoSection.style.cssText += "box-shadow: 2px 2px 5px 0.5px rgba(0, 0, 0, .2);";
  } else {
    userInfo.style.display = "none";
    userInfoSection.style.cssText -= "box-shadow: 2px 2px 5px 0.5px rgba(0, 0, 0, .2);";
  }
});

const isBoardRoute = computed(() => {
  return route.path.startsWith("/board");
});
</script>

<template>
  <AppModal
    v-if="isOpenModal"
    :modal-type="modalType"
    @close-modal="closeModal"
  />
  <header
    class="bg-white"
    :style="!route.path.includes('/detail') ? 'height: 135px' : 'height: 67px'"
  >
    <main class="border-bottom">
      <div class="inner">
        <div class="logo" @click="router.push('/')">
          <img src="../../assets/img/백구로고.svg" />
          <span class="title extrabold">백구</span>
          <span class="reg">배리어프리 여행 사이트</span>
        </div>
        <div
          v-if="username"
          class="logined pointer"
          id="userInfoSection"
          @click="handleClickOpenUserSection"
        >
          <div style="display: flex; align-items: center">
            <p>{{ username }}님, 안녕하세요!</p>
            <ChevronDownIcon v-if="!isOpenUserSection" style="width: 1rem" />
            <ChevronUpIcon class="point" v-if="isOpenUserSection" style="width: 1rem" />
          </div>
          <div id="userInfo" style="display: none">
            <p class="hover" @click="openModal('내 정보 보기')">내 정보 보기</p>
            <hr />
            <p class="hover" @click="openModal('회원 정보 수정')">회원 정보 수정</p>
            <hr />
            <p class="hover" @click="handleClickLogout">로그아웃</p>
          </div>
        </div>
        <div v-else class="user">
          <p @click="openModal('로그인')">로그인</p>
          <p @click="openModal('회원가입')">회원가입</p>
        </div>
      </div>
    </main>
    <nav v-if="!route.path.includes('/detail')" class="border-bottom">
      <div class="inner">
        <RouterLink to="/" active-class="active" exact>백구는요,</RouterLink>
        <RouterLink to="/search" active-class="active" exact>여행지 검색</RouterLink>
        <RouterLink to="/board" :class="{ active: isBoardRoute }">게시판</RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

main {
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

main div {
  display: flex;
}

.logo {
  width: 80%;
  display: flex;
  align-items: end;
  gap: 0.5rem;
  cursor: pointer;
}

img {
  width: 50px;
}

.title {
  font-size: 1.5rem;
}

.logined {
  position: fixed;
  top: 1.5rem;
  right: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  padding: 0 1rem;
}

.logined p {
  font-size: 1rem;
}

.user {
  width: 20%;
  display: flex;
  align-items: end;
  justify-content: end;
  gap: 1rem;
}

.user p {
  cursor: pointer;
  margin: 0;
}

nav {
  display: flex;
  gap: 2.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

nav div {
  display: flex;
  align-items: center;
  gap: 2rem;
}

nav a {
  font-size: 1.2rem;
}

nav a.active {
  font-weight: 700;
  color: #ff747c;
}
</style>
