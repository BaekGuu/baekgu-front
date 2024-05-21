<script setup>
defineProps({
  text: String,
  primary: Boolean,
});
</script>

<template>
  <div :class="primary ? 'bg-point round-box' : 'bg-white round-box'">
    <span :class="primary ? 'white' : 'black'">
      {{ text }}
    </span>
  </div>
</template>

<style scoped>
svg {
  width: 1.5rem;
  height: 1.5rem;
}

.round-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #7aa2ce;
  border-radius: 15px;
  transition: background-color 0.3s;
  padding: 0.5rem 1rem;
}
</style>
