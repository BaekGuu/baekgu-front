<script setup>
import { deleteBoard, getBoard } from "@/api/board";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { OK } from "@/constant/status";
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";

const { notify } = useNotification();

const board = ref({
  boardId: 0,
  content: "",
  title: "",
  writerId: "",
  writingTime: "",
});

onMounted(async () => {
  board.value.boardId = window.location.pathname.split("/board/")[1];
  board.value = await getBoard(board.value.boardId);
});

const navigateToList = () => {
  window.location.href = "/board";
};

const handleClickEditIcon = id => {
  location.href = "/board/edit?" + id;
};

const handleClickDeleteIcon = async () => {
  const { status } = await deleteBoard({
    writerId: board.value.writerId,
    boardId: board.value.boardId,
  });

  if (status === OK) {
    notify({ type: "success", text: "글이 삭제 되었습니다!" });
    navigateToList();
  }
};
</script>

<template>
  <main class="page">
    <div class="banner bg-assistant">
      <p class="inner">
        재밌게 보셨다면, 더 많은 사람들이 여행 경험을 공유할 수 있도록 새로운 글을 작성해 주세요.
      </p>
    </div>
    <form class="inner" @submit.prevent="handleSubmit" id="form">
      <div style="align-items: center">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="board.title" disabled />
      </div>
      <span style="text-align: end; width: 100%" class="bold">✍작성자: {{ board.writerId }}</span>
      <div style="align-items: start">
        <label for="content">내용</label>
        <textarea id="content" v-model="board.content" rows="20" disabled></textarea>
      </div>
      <div class="edit-and-delete">
        <div class="flex-center pointer" @click="() => handleClickEditIcon(board.boardId)">
          <PencilSquareIcon /><span>수정하기</span>
        </div>
        <div class="flex-center pointer" @click="handleClickDeleteIcon">
          <TrashIcon /><span>삭제하기</span>
        </div>
      </div>
      <BaseButton :is-active="true" :width="20" text="목록 보기" :on-click="navigateToList" />
    </form>
    <div class="inner">댓글 부분</div>
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

.edit-and-delete {
  justify-content: end;
  gap: 0.5rem;
}

.edit-and-delete svg {
  height: 2rem;
}
</style>
