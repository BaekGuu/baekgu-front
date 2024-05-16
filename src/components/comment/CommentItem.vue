<script setup>
import { useCommentStore } from "@/stores/comment-store";
import { useMemberStore } from "@/stores/member-store";
import { ref } from "vue";

defineProps({ comment: Object });

const { loginedMember } = useMemberStore();
const { handlerClickDelete, handlerClickUpdate } = useCommentStore();

const isEdit = ref(false);
const boardId = ref(window.location.pathname.split("/board/")[1]);
const newComment = ref("");
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
    <p v-if="!isEdit" class="pointer hover" @click="() => (isEdit = true)">수정</p>
    <p v-if="!isEdit" class="pointer hover" @click="async () => await handlerClickDelete(comment)">
      삭제
    </p>
    <p v-if="isEdit" class="pointer hover" @click="isEdit = false">취소</p>
    <p
      v-if="isEdit"
      class="pointer hover"
      @click="async () => await handlerClickUpdate(comment, boardId, newComment)"
    >
      저장
    </p>
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
