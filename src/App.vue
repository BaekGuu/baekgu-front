<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">메인화면</RouterLink>
      <RouterLink to="/board">게시판</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
