<script setup>
// import { axiosClient } from "@/util/http-client";
import { getBoard, registBoard } from "@/api/board";
import BaseButton from "@/components/BaseButton.vue";
import { OK } from "@/constant/status";
import { getCookie } from "@/util/cookies";
import { onMounted, ref } from "vue";

const board = ref({
  boardId: Number,
  content: "",
  title: "",
  writerId: "",
  writingTime: "",
});

const query = ref(window.location.pathname.split("/board/")[1]);

onMounted(async () => {
  if (query.value !== "regist") board.value = await getBoard(query.value);
});

const navigateToList = () => {
  window.location.href = "/board";
};

const handleSubmit = async () => {
  const params = {
    title: board.value.title,
    writerId: getCookie("userId"),
    content: board.value.content,
  };

  const { status } = await registBoard(params);
  if (status === OK) {
    window.location.href = "/board";
    alert("새로운 글이 등록 되었습니다!");
  }
};
</script>

<template>
  <main class="page">
    <div class="banner bg-assistant">
      <p v-if="query !== 'regist'" class="inner">
        재밌게 보셨다면, 더 많은 사람들이 여행 경험을 공유할 수 있도록 새로운 글을 작성해 주세요.
      </p>
      <p v-else class="inner">나의 여행 경험을 사용자들과 공유해 보세요.</p>
    </div>
    <form class="inner" @submit.prevent="handleSubmit" id="form">
      <div style="align-items: center">
        <label for="title">제목</label>
        <input
          v-if="query !== 'regist'"
          type="text"
          name="title"
          id="title"
          :value="board.title"
          disabled
        />
        <input v-else type="text" id="title" v-model="board.title" />
      </div>
      <input type="hidden" value="haram" />
      <span style="text-align: end; width: 100%" class="bold"
        >✍작성자: {{ query === "regist" ? "람라미" : board.writerId }}</span
      >
      <div style="align-items: start">
        <label for="content">내용</label>
        <textarea
          v-if="query !== 'regist'"
          id="content"
          rows="20"
          :value="board.content"
          disabled
        ></textarea>
        <textarea v-else id="content" rows="20" v-model="board.content"></textarea>
      </div>
      <BaseButton
        v-if="query !== 'regist'"
        :is-active="true"
        :width="20"
        text="목록 보기"
        :on-click="navigateToList"
      />
      <BaseButton v-else :is-active="true" :width="20" text="저장" :type="'submit'" />
    </form>
  </main>
</template>

<style scoped>
.banner {
  width: 100%;
}

.banner p {
  padding: 3rem 0;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 2rem auto;
}

form div {
  display: flex;
  justify-content: space-between;
}

input:disabled,
textarea:disabled {
  color: #212121;
  background-color: #fff;
  border: none;
}

form label {
  font-size: 1.5rem;
}

input[type="text"],
textarea {
  width: 80%;
}

button {
  margin-top: 1rem;
  align-self: end;
}
</style>
