<script setup>
import BaseButton from "@/components/BaseButton.vue";
import { getCookie } from "@/util/cookies";
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted, ref } from "vue";
import router from "@/router";
import { getBoardList } from "@/api/board";
import { OK } from "@/constant/status";

const { notify } = useNotification();

const boards = ref([]);
const pages = ref(10);
const currentPage = ref(1);

onMounted(async () => {
  if (!getCookie("username")) {
    notify({
      type: "error",
      title: "회원 전용 메뉴 입니다!",
      text: "먼저 로그인을 진행 해주세요 :)",
    });
  }
  const { status, data } = await getBoardList();
  if (status === OK) boards.value = data;
});

const handleClickPageNum = pageNum => {
  currentPage.value = pageNum;
};
</script>

<template>
  <main class="page">
    <div class="inner">
      <div class="search">
        <input type="text" placeholder="검색하고 싶은 제목 또는 내용을 입력하세요." />
        <BaseButton text="검색" :width="15" :is-active="true" />
      </div>
      <div
        style="display: flex; justify-content: space-between; margin-bottom: 1rem; align-items: end"
      >
        <p style="margin: 0">
          총 <span class="primary bold">{{ boards.length }}</span
          >건
        </p>
        <RouterLink to="/board/regist" style="width: 10%; height: 100%">
          <BaseButton :is-active="true" :width="100" text="글쓰기" />
        </RouterLink>
      </div>
      <table>
        <thead>
          <th>ID</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성 날짜</th>
        </thead>
        <tbody>
          <tr
            v-for="board in boards"
            :key="board.boardId"
            @click="
              () => {
                router.push('/board/' + board.boardId);
              }
            "
          >
            <td>{{ board.boardId }}</td>
            <td>{{ board.title }}</td>
            <td>{{ board.writerId }}</td>
            <td>{{ board.writingTime }}</td>
          </tr>
        </tbody>
      </table>
      <div class="paging">
        <span
          v-for="page in pages"
          :key="page"
          :class="currentPage === page ? 'primary bold' : ''"
          style="cursor: pointer"
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
  width: 75%;
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
  cursor: pointer;
}

tr:hover {
  background-color: #efefef;
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
