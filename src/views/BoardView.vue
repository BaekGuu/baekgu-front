<script setup>
import BaseButton from "@/components/BaseButton.vue";
import { ref } from "vue";

const pages = ref(10);
const currentPage = ref(1);

const datas = ref([
  { id: 0, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 1, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 3, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 4, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 5, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 6, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 7, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 8, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 9, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
  { id: 10, title: "대전 빵집 투어", writer: "하람", regist_date: "2024-05-07" },
]);

const handleClickPageNum = pageNum => {
  currentPage.value = pageNum;
};
</script>

<template>
  <main class="page">
    <div class="inner">
      <div class="search">
        <input type="text" placeholder="검색하고 싶은 제목 또는 내용을 입력하세요." />
        <BaseButton text="검색" width="15" :is-active="true" />
      </div>
      <p style="margin-top: 0.8rem; margin-bottom: 0.8rem">
        총 <span class="primary bold">{{ datas.length }}</span
        >건
      </p>
      <table>
        <thead>
          <th>ID</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성 날짜</th>
        </thead>
        <tbody>
          <tr v-for="data in datas" :key="data.id">
            <td>{{ data.id }}</td>
            <td>{{ data.title }}</td>
            <td>{{ data.writer }}</td>
            <td>{{ data.regist_date }}</td>
          </tr>
        </tbody>
      </table>
      <div class="paging">
        <span
          v-for="page in pages"
          :key="page"
          :class="currentPage === page ? 'primary bold' : ''"
          style="cursor: pointer;"
          @click="handleClickPageNum(page)"
          >{{ page }}</span
        >
      </div>
    </div>
  </main>
</template>

<style scoped>
.search {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.search input {
  width: 80%;
}
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  font-size: 1.2rem;
}
thead {
  border-top: 0.5px solid #aaa;
  border-bottom: 0.5px solid #aaa;
}
th:first-child {
  border-left: none;
}
th:last-child {
  border-right: none;
}
th {
  border-left: 0.3px solid #aaa;
  border-right: 0.3px solid #aaa;
  padding: 1rem;
}
tr {
  border-top: 0.5px solid #aaa;
  border-bottom: 0.5px solid #aaa;
}
td {
  padding: 1rem;
}

.paging {
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.paging span {
  font-size: 1.2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
