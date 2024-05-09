<script setup>
import { Notifications } from "@kyvg/vue3-notification";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <Notifications position="top left" width="500" />
</template>

<style scoped>
.notification-content {
  font-size: 1.5rem;
}
</style>
