span
<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["handleClickSelect", "handleSelectOption"]);

const props = defineProps({
  defaultSelected: String,
  options: Array,
});

const dropdownOpen = ref(false);
const selectedOption = ref("");
const selected = ref("");

watch(dropdownOpen, () => {
  if (!dropdownOpen.value) selected.value = selectedOption.value;
  else selected.value = props.defaultSelected;
});
</script>

<template>
  <div class="select-container">
    <div
      class="custom-select"
      @click="
        () => {
          emit('handleClickSelect');
          dropdownOpen = !dropdownOpen;
        }
      "
    >
      <span>{{ selected || defaultSelected }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="arrow-icon"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
    <ul v-if="dropdownOpen" class="dropdown-menu">
      <li
        v-for="option in options"
        :key="option"
        @click="
          () => {
            emit('handleSelectOption', option.code);
            dropdownOpen = false;
            selectedOption = option.name;
          }
        "
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.select-container {
  position: relative;
  width: 40%;
}

.custom-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  border: 1px solid #7aa2ce;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  padding: 0.8rem 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.custom-select:focus,
.custom-select:hover {
  border-color: #7aa2ce;
  box-shadow: 0 0 5px #7aa2ce;
  outline: none;
}

svg {
  margin: 0 1rem;
}

.arrow-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s;
}

.dropdown-menu {
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.3rem;
  padding-left: 0;
  max-height: 12.5rem;
  overflow-y: auto;
}

.dropdown-menu li {
  padding: 0.8rem;
  list-style: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-menu li:hover {
  background-color: #7aa2ce;
  color: white;
}
</style>
