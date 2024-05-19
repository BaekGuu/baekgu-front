<script setup>
import { getCityList, getDistrictList } from "@/api/area";
import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseCheckBox from "@/components/BaseCheckBox.vue";
import BaseCard from "@/components/BaseCard.vue";
import BasePaginate from "@/components/BasePaginate.vue";
import { OK } from "@/constant/status";
import { mainCategory, searchedResult, subCategory } from "@/util/types";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const cities = ref([]);
const districts = ref([]);
const areaCode = ref(0);
const isFilterOpen = ref(false);
const checkedItems = ref({});

const fetchCityList = async () => {
  const { data, status } = await getCityList();
  if (status === OK) cities.value = data.response.body.items.item;
};

const fetchDistrictList = async code => {
  const { data, status } = await getDistrictList(code);
  if (status === OK) {
    districts.value = data.response.body.items.item;
    areaCode.value = code;
  }
};

const toggleCheck = (category, sub) => {
  if (!checkedItems.value[category]) {
    checkedItems.value[category] = {};
  }
  checkedItems.value[category][sub] = !checkedItems.value[category][sub];
};

const isChecked = (category, sub) =>
  checkedItems.value[category] && checkedItems.value[category][sub];

const toggleFilter = () => (isFilterOpen.value = !isFilterOpen.value);
</script>

<template>
  <main class="page">
    <div class="inner">
      <section class="search-select">
        <p>여행하고 싶은 지역을 골라주세요.</p>
        <BaseSelect
          defaultSelected="시도 선택"
          :options="cities"
          @handleClickSelect="fetchCityList"
          @handleSelectOption="fetchDistrictList"
        />
        <BaseSelect defaultSelected="시군구 선택" :options="districts" />
        <BaseButton text="검색" :width="10" :isActive="true" />
      </section>

      <section class="search-filter">
        <div class="filter-title bg-point white" @click="toggleFilter">
          <div>
            <span class="bold" style="font-size: 1.3rem">무장애 필터</span>
            <span style="margin: 0.5rem">검색 결과에 적용하고 싶은 무장애 정보를 골라 보세요.</span>
          </div>
          <ChevronUpIcon v-if="isFilterOpen" class="white" />
          <ChevronDownIcon v-else class="white" />
        </div>
        <div v-if="isFilterOpen">
          <div v-for="category in mainCategory" :key="category" class="category-section">
            <span class="category-title">{{ category }}</span>
            <div class="sub-category">
              <div
                v-for="sub in subCategory[category]"
                :key="sub"
                class="checkbox-container"
                @click="toggleCheck(category, sub)"
              >
                <BaseCheckBox :isChecked="isChecked(category, sub)" :text="sub" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="search-result">
        <p>총 <span class="primary bold">200</span>건</p>
        <div class="cards">
          <BaseCard
            v-for="result in searchedResult"
            :key="result"
            :imageUrl="result.imageUrl"
            :title="result.title"
            :addr="result.addr"
          />
        </div>
      </section>
      <BasePaginate />
    </div>
  </main>
</template>

<style scoped>
section {
  display: flex;
  margin: 1rem 0;
  width: 100%;
}

.search-select {
  justify-content: end;
  align-items: center;
  gap: 1rem;
}

.search-filter {
  flex-direction: column;
  border: 1px solid #7aa2ce;
}

.search-filter svg {
  width: 1.5rem;
  height: 1.5rem;
}

.filter-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
}

.category-section {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
}

.category-title {
  display: flex;
  align-items: start;
  font-size: 1.1rem;
  font-weight: 700;
  width: 20%;
}

.sub-category {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 80%;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.search-result {
  flex-direction: column;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
