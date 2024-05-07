<script setup>
import { RouterLink } from "vue-router";

const navigateMain = () => {
  window.location.href = "/";
};
</script>

<template>
  <header class="border-bottom">
    <main class="border-bottom">
      <div class="top">
        <div class="logo" @click="navigateMain">
          <img src="../assets/img/백구로고.png" />
          <span class="title extrabold">백구</span>
          <span class="reg">배리어프리 여행 사이트</span>
        </div>
        <div class="user">
          <p>로그인</p>
          <p>회원가입</p>
        </div>
      </div>
    </main>
    <nav>
      <RouterLink to="/" active-class="active">백구는요,</RouterLink>
      <RouterLink to="/search" active-class="active">여행지 검색</RouterLink>
      <RouterLink to="/board" active-class="active">게시판</RouterLink>
    </nav>
  </header>
  <hr />
</template>

<style scoped>
main {
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.top {
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
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
  width: 80%;
  margin: auto;
  display: flex;
  gap: 2.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
nav a {
  font-size: 1.2rem;
}
nav a.active {
  font-weight: 700;
  color: #ff747c;
}
</style>
