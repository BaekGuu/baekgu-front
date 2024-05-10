<script setup>
import { getCookie } from "@/util/cookies";
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { editBoard } from "@/api/board";
import { useNotification } from "@kyvg/vue3-notification";
import { OK } from "@/constant/status";
import router from "@/router";

const { notify } = useNotification();
const userId = ref(getCookie("userId"));

const board = ref({
  content: "",
  title: "",
  writerId: userId.value,
  boardId: parseInt(location.search.split("?")[1]),
});

const handleSubmit = async () => {
  const params = {
    boardId: board.value.boardId,
    writerId: board.value.writerId,
    title: board.value.title,
    content: board.value.content,
  };

  const { status } = await editBoard(params);

  if (status === OK) {
    notify({
      type: "success",
      text: "글이 수정 되었습니다!",
    });
    router.push("/board");
  }
};
</script>

<template>
  <main class="page">
    <div class="banner bg-assistant">
      <p class="inner">나의 여행 경험을 사용자들과 공유해 보세요.</p>
    </div>
    <form class="inner" @submit.prevent="handleSubmit" id="form">
      <div style="align-items: end">
        <label for="title" style="width: 10%">제목</label>
        <input type="text" style="width: 80%" id="title" v-model="board.title" />
        <p style="width: 10%; text-align: end">✍{{ userId }}</p>
      </div>
      <div style="align-items: start">
        <label for="content" style="width: 10%">내용</label>
        <textarea id="content" style="width: 90%" rows="20" v-model="board.content"></textarea>
      </div>
      <BaseButton :is-active="true" :width="20" text="저장" :type="'submit'" />
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
  margin-bottom: 0.5rem;
}

form div {
  display: flex;
  justify-content: space-between;
}

form label {
  font-size: 1.5rem;
}

button {
  margin-top: 1rem;
  align-self: end;
}

.edit-and-delete {
  justify-content: end;
  gap: 0.5rem;
}

.edit-and-delete svg {
  height: 2rem;
}
</style>
