<script setup>
import { CheckIcon } from "@heroicons/vue/24/solid";
defineProps({ type: String, text: String, width: Number, isActive: Boolean, onClick: Function });
</script>

<template>
  <button
    :type="type === 'submit' ? 'submit' : 'button'"
    :class="isActive ? 'bg-point' : 'disabled'"
    :style="{ width: width + '%' }"
    @click="onClick"
  >
    {{ type !== "check" ? text : " " }}
    <CheckIcon v-if="type === 'check'" class="check-icon" />
  </button>
</template>

<style scoped>
button {
  padding: 0.8rem 1rem;
  outline: none;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  color: white;
}

.disabled {
  background-color: #d9d9d9;
}

.check-icon {
  height: 1rem;
  width: 4rem;
  animation: rotate 1s;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    width: 4.5rem;
    height: 1.5rem;
  }
  100% {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
