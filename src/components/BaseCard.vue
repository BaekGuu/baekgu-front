<script setup>
defineProps({
  imageUrl: String,
  title: String,
  addr: String,
});
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img :src="imageUrl" :alt="title" />
    </div>
    <div class="text-container">
      <h1>{{ title }}</h1>
      <p>{{ addr }}</p>
      <div class="icons">
        <div class="icon">♿</div>
        <div class="icon">👪</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2rem 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container {
  width: 100%;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
}

.text-container {
  width: 90%;
  background-color: white;
  text-align: start;
}

.text-container h1 {
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

.text-container p {
  margin: 0.5rem 0;
  color: #555;
}

.icons {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  margin: 0.8rem 0;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #ccc;
  font-size: 1.5rem;
}
</style>
