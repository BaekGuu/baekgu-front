<script setup>
import { deleteBoard, getBoard } from "@/api/board";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { OK } from "@/constant/status";
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/router";

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

const handleClickDeleteIcon = async () => {
  const { status } = await deleteBoard({
    writerId: board.value.writerId,
    boardId: board.value.boardId,
  });

  if (status === OK) {
    notify({ type: "success", text: "글이 삭제 되었습니다!" });
    router.push("/board");
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
    <div class="inner container">
      <div style="align-items: center">
        <p style="width: 10%">제목:</p>
        <p style="width: 75%">{{ board.title }}</p>
        <p style="width: 15%; text-align: end;">✍ {{ board.writerId }}</p>
      </div>
      <hr />
      <div style="align-items: start">
        <p style="width: 10%">내용:</p>
        <p style="width: 90%">{{ board.content }}</p>
      </div>
      <hr />
      <div class="edit-and-delete">
        <div class="flex-center pointer" @click="router.push('/board/edit?' + board.boardId)">
          <PencilSquareIcon /><span>수정하기</span>
        </div>
        <div class="flex-center pointer" @click="handleClickDeleteIcon">
          <TrashIcon /><span>삭제하기</span>
        </div>
      </div>
      <BaseButton
        :is-active="true"
        :width="20"
        text="목록 보기"
        :on-click="
          () => {
            router.push('/board');
          }
        "
      />
    </div>
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

.container {
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  margin-bottom: 0.5rem;
}

.container div {
  display: flex;
}

input:disabled,
textarea:disabled {
  color: #212121;
  background-color: #fff;
  border: none;
}

button {
  margin-top: 1rem;
  align-self: end;
}

hr {
  width: 100%;
}

.edit-and-delete {
  justify-content: end;
  gap: 0.5rem;
}

.edit-and-delete svg {
  height: 2rem;
}
</style>
