<script setup>
import AppFooter from "./components/layout/AppFooter.vue";
import AppHeader from "./components/layout/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />

  <notifications position="top center" width="50%" />
</template>

<style scoped></style>
