<script setup>
import { getComments } from "@/api/comment";
import { onMounted, ref } from "vue";
import BaseButton from "../BaseButton.vue";
import CommentItem from "./CommentItem.vue";
import { useCommentStore } from "@/stores/comment-store";
import { useRoute } from "vue-router";

const route = useRoute();
const { comment, handleClickSave } = useCommentStore();

const comments = ref([]);

onMounted(async () => {
  comment.boardId = ref(route.path.split("/board/")[1]);
  comments.value = await getComments(comment.boardId);
});
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: space-between">
    <input
      type="text"
      v-model="comment.comment"
      placeholder="댓글 또는 의견을 작성해 주세요."
      style="width: 80%"
    />
    <BaseButton
      :style="'primary'"
      text="등록"
      :width="15"
      :on-click="async () => await handleClickSave()"
    />
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
