span
<script setup>
import { CheckIcon } from "@heroicons/vue/24/solid";

defineProps({
  isChecked: Boolean,
  text: String,
});
</script>

<template>
  <div :class="['checkbox', { checked: isChecked }]">
    <span :class="['checkbox-label', { white: isChecked, black: !isChecked }]">
      {{ text }}
    </span>
    <CheckIcon v-if="isChecked" class="white" />
  </div>
</template>

<style scoped>
svg {
  width: 1.5rem;
  height: 1.5rem;
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: 0.5px solid #7aa2ce;
  border-radius: 15px;
  background-color: white;
  transition: background-color 0.3s;
  padding: 0 1.2rem;
}

.checkbox.checked {
  padding: 0 0.5rem;
  gap: 0.5rem;
  background-color: #7aa2ce;
}

.checkbox-label {
  font-size: 16px;
  margin-left: 8px;
}

.checkbox-label.white {
  color: white;
}

.checkbox-label.black {
  color: black;
}
</style>
