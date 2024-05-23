<script setup>
import { CheckIcon } from "@heroicons/vue/24/solid";

defineProps({
  type: String,
  text: String,
  width: Number,
  style: String,
  // primary, white
  disabled: Boolean,
  onClick: Function,
});
</script>

<template>
  <button
    :type="type === 'submit' ? 'submit' : 'button'"
    :class="[disabled && 'disabled', type === 'check' && 'check', style]"
    :style="{ width: width + '%' }"
    @click="onClick"
    :disabled="disabled"
  >
    {{ type === "check" ? "" : text }}
    <CheckIcon v-if="type === 'check'" class="check-icon" />
  </button>
</template>

<style scoped>
button {
  padding: 0.8rem 1rem;
  outline: none;
  border: 0.5px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.check {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: #7aa2ce;
}

.white {
  background-color: #fff;
  color: #7aa2ce;
}

.primary {
  background-color: #7aa2ce;
  color: #fff;
}

.white:hover:not(.disabled) {
  background-color: #7aa2ce;
  color: #fff;
  border: 1px solid #aaa;
}

.primary:hover:not(.disabled) {
  background-color: #fff;
  color: #7aa2ce;
}

button:active:not(.disabled) {
  box-shadow:
    0 0 0 0.2px #aaa inset,
    0 0 0 0.2px #aaa inset,
    0 0 0 0.2px #aaa;
}

.disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
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
