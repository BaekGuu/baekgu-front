<script setup>
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { onMounted } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/router";
import CommentContainer from "@/components/comment/CommentContainer.vue";
import { useBoardStore } from "@/stores/board-store";
import { getBoard } from "@/api/board";
import { OK } from "@/constant/status";
import { useRoute } from "vue-router";

const route = useRoute();
const { board, handleClickDeleteBoard } = useBoardStore();

onMounted(async () => {
  board.boardId = route.path.split("/board/")[1];
  const { status, data } = await getBoard(board.boardId);
  if (status === OK) {
    board.title = data.title;
    board.writerId = data.writerId;
    board.content = data.content;
  }
});
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
        <p style="width: 15%; text-align: end">✍ {{ board.writerId }}</p>
      </div>
      <hr />
      <div style="align-items: start">
        <p style="width: 10%">내용:</p>
        <p style="width: 90%">{{ board.content }}</p>
      </div>
      <hr />
      <div class="buttons">
        <div class="flex-center pointer" @click="() => router.push('/board/edit?' + board.boardId)">
          <PencilSquareIcon /><span>수정하기</span>
        </div>
        <div class="flex-center pointer" @click="() => handleClickDeleteBoard(board.boardId)">
          <TrashIcon /><span>삭제하기</span>
        </div>
        <BaseButton
          :is-active="true"
          :width="15"
          text="목록 보기"
          :on-click="() => router.push('/board')"
        />
      </div>

      <CommentContainer />
    </div>
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
  gap: 1rem;
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

hr {
  width: 100%;
}

.buttons {
  justify-content: end;
  gap: 0.5rem;
}

.buttons svg {
  height: 2rem;
}
</style>
