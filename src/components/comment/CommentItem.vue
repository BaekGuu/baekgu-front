<script setup>
import { deleteComment, updateComment } from "@/api/comment";
import { OK } from "@/constant/status";
import { useMemberStore } from "@/stores/member-store";
import { reload } from "@/util/custom-router";
import { notify } from "@kyvg/vue3-notification";
import { ref } from "vue";

const props = defineProps({ comment: Object });

const { loginedMember } = useMemberStore();
const isEdit = ref(false);
const boardId = ref(window.location.pathname.split("/board/")[1]);
const newComment = ref("");

const handlerClickDelete = async () => {
  const { status } = await deleteComment({
    commentId: props.comment.commentId,
    memberId: loginedMember.id,
  });
  if (status === OK) {
    notify({ type: "success", text: "댓글이 삭제 되었습니다!" });
    reload();
  }
};

const handlerClickUpdate = async () => {
  const { status } = await updateComment({
    memberId: loginedMember.id,
    boardId: boardId.value,
    commentId: props.comment.commentId,
    comment: newComment.value,
  });
  if (status === OK) {
    notify({ type: "success", text: "댓글이 수정 되었습니다!" });
    reload();
  }
  isEdit.value = false;
};
</script>

<template>
  <div class="comment">
    <div class="profile">
      <img v-if="comment.memberId === loginedMember.id" src="../../assets/img/my_profile.svg" />
      <img v-else src="../../assets/img/other_profile.svg" />
      <div class="info">
        <p>{{ comment.nickName }}</p>
        <p class="light" style="font-size: 1rem">{{ comment.memberId }}</p>
      </div>
    </div>
    <input v-if="isEdit" v-model="newComment" type="text" />
    <p v-else>{{ comment.comment }}</p>
  </div>
  <div v-if="comment.memberId === loginedMember.id" class="text-buttons">
    <p
      v-if="!isEdit"
      class="pointer hover"
      @click="
        () => {
          isEdit = true;
        }
      "
    >
      수정
    </p>
    <p v-if="!isEdit" class="pointer hover" @click="handlerClickDelete">삭제</p>
    <p
      v-if="isEdit"
      class="pointer hover"
      @click="
        () => {
          isEdit = false;
        }
      "
    >
      취소
    </p>
    <p v-if="isEdit" class="pointer hover" @click="handlerClickUpdate">저장</p>
  </div>
</template>

<style scoped>
.comment {
  display: flex;
  gap: 1rem;
  width: 90%;
}

.content {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.profile {
  width: 20%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info p {
  margin: 0;
}

.info p,
input {
  width: 70%;
}

.text-buttons {
  width: 10%;
  display: flex;
  gap: 0.5rem;
  justify-content: space-evenly;
}
</style>
