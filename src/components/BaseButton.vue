<script setup>
import { CheckIcon } from "@heroicons/vue/24/solid";

defineProps({
  type: String,
  text: String,
  width: Number,
  isActive: Boolean,
  onClick: Function,
});
</script>

<template>
  <button
    :type="type === 'submit' ? 'submit' : 'button'"
    :class="['button', isActive ? 'active' : 'disabled', type === 'check' && 'check']"
    :style="{ width: width + '%' }"
    @click="onClick"
  >
    {{ type === "check" ? "" : text }}
    <CheckIcon v-if="type === 'check'" class="check-icon" />
  </button>
</template>

<style scoped>
.button {
  padding: 0.8rem 1rem;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.check {
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.button:hover:not(.disabled) {
  transform: translateY(-2px);
}

.button:focus:not(.disabled) {
  box-shadow: 0 0 0 3px #7aa2ce;
}

.disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.active {
  background-color: #7aa2ce;
}

.check-icon {
  height: 1.5rem;
  width: 1.5rem;
  animation: rotate 1s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    width: 2rem;
    height: 2rem;
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
