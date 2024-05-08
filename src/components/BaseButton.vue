<script setup>
defineProps({ text: String, width: Number, isActive: Boolean });
</script>

<template>
  <button type="button" :class="isActive ? 'bg-point' : 'disabled'" :style="{ width: width + '%' }">
    {{ text }}
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
</style>
