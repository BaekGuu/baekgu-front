<script setup>
import { deleteBoard, getBoard } from "@/api/board";
import { getComments, registComment } from "@/api/comment";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { OK } from "@/constant/status";
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/router";
import AppComment from "@/components/comment/AppComment.vue";
import { useMemberStore } from "@/stores/member-store";

const { notify } = useNotification();
const { loginedMember } = useMemberStore();

const board = ref({
  boardId: 0,
  content: "",
  title: "",
  writerId: "",
  writingTime: "",
});

const comments = ref();
const comment = ref({
  boardId: 0,
  comment: "",
  memberId: "",
});

onMounted(async () => {
  board.value.boardId = window.location.pathname.split("/board/")[1];
  board.value = await getBoard(board.value.boardId);
  comments.value = await getComments(board.value.boardId);
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

const handleSaveComment = async () => {
  const { status } = await registComment({
    comment: comment.value.comment,
    memberId: loginedMember.id,
    boardId: board.value.boardId,
  });
  if (status === OK) {
    notify({ type: "success", text: "댓글이 등록 되었습니다!" });
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
        <p style="width: 15%; text-align: end">✍ {{ board.writerId }}</p>
      </div>
      <hr />
      <div style="align-items: start">
        <p style="width: 10%">내용:</p>
        <p style="width: 90%">{{ board.content }}</p>
      </div>
      <hr />
      <div class="buttons">
        <div class="flex-center pointer" @click="router.push('/board/edit?' + board.boardId)">
          <PencilSquareIcon /><span>수정하기</span>
        </div>
        <div class="flex-center pointer" @click="handleClickDeleteIcon">
          <TrashIcon /><span>삭제하기</span>
        </div>
        <BaseButton
          :is-active="true"
          :width="15"
          text="목록 보기"
          :on-click="() => router.push('/board')"
        />
      </div>
      <div style="align-items: center; justify-content: space-between">
        <input
          type="text"
          v-model="comment.comment"
          placeholder="댓글 또는 의견을 작성해 주세요."
          style="width: 80%"
        />
        <BaseButton :is-active="true" text="등록" :width="15" :on-click="handleSaveComment" />
      </div>
      <AppComment :comments="comments" />
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
