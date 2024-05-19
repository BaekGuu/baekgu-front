<script setup>
import { ref } from "vue";

const currentPage = ref(1);
const onClickHandler = page => {
  console.log(page);
};
</script>

<template>
  <div style="width: 50%; margin: auto; display: flex; justify-content: center">
    <vue-awesome-paginate
      :total-items="50"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<style>
.pagination-container {
  width: 100%;
  display: flex;
  column-gap: 10px;
}

.back-button:hover,
.next-button:hover {
  color: #212121;
}

.paginate-buttons {
  cursor: pointer;
  background-color: #fff;
  border: none;
  color: #212121;
  font-size: 1.2rem;
}

.active-page {
  color: #ff747c;
}

.active-page:hover {
  color: #ff747c;
}
</style>
