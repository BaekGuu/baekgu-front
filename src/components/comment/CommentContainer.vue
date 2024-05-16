<script setup>
import { getComments, registComment } from "@/api/comment";
import { OK } from "@/constant/status";
import { useMemberStore } from "@/stores/member-store";
import { commentType } from "@/util/request-type";
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted, ref } from "vue";
import BaseButton from "../BaseButton.vue";
import CommentItem from "./CommentItem.vue";
import router from "@/router";

const { notify } = useNotification();
const { loginedMember } = useMemberStore();

const boardId = ref(window.location.pathname.split("/board/")[1]);
const comment = ref(commentType);
const comments = ref([]);

onMounted(async () => {
  comments.value = await getComments(boardId.value);
});

const handleSaveComment = async () => {
  const { status } = await registComment({
    comment: comment.value.comment,
    memberId: loginedMember.id,
    boardId: boardId.value,
  });

  if (status === OK) {
    notify({ type: "success", text: "댓글이 등록 되었습니다!" });
    router.go(0);
  }
};
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: space-between">
    <input
      type="text"
      v-model="comment.comment"
      placeholder="댓글 또는 의견을 작성해 주세요."
      style="width: 80%"
    />
    <BaseButton :is-active="true" text="등록" :width="15" :on-click="handleSaveComment" />
  </div>

  <div v-for="comment in comments" :key="comment.commentId" class="comments">
    <CommentItem :comment="comment" />
  </div>
</template>

<style scoped>
.comments {
  display: flex;
  justify-content: space-between;
}
</style>
