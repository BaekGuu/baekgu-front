<script setup>
defineProps({ text: String, isActive: Boolean });
</script>

<template>
  <button :class="isActive ? 'bg-point' : 'disabled'">{{ text }}</button>
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
