import { deleteComment, registComment, updateComment } from "@/api/comment";
import { OK } from "@/constant/status";
import { getCookie } from "@/util/cookies";
import { reload } from "@/util/custom-router";
import { useNotification } from "@kyvg/vue3-notification";
import { defineStore } from "pinia";

const { notify } = useNotification();

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comment: {
      commentId: 0,
      comment: "",
      memberId: getCookie("userId"),
      boardId: 0,
      writingTime: "",
      nickName: getCookie("nicmName"),
    },
  }),
  actions: {
    async handleClickSave() {
      const { status } = await registComment(this.comment);

      if (status === OK) {
        notify({ type: "success", text: "댓글이 등록 되었습니다!" });
        reload();
      }
    },
    async handlerClickDelete(comment) {
      const { status } = await deleteComment({
        commentId: comment.commentId,
        memberId: comment.memberId,
      });
      if (status === OK) {
        notify({ type: "success", text: "댓글이 삭제 되었습니다!" });
        reload();
      }
    },
    async handlerClickUpdate(comment, boardId, newComment) {
      const { status } = await updateComment({
        memberId: comment.memberId,
        boardId: boardId,
        commentId: comment.commentId,
        comment: newComment,
      });
      if (status === OK) {
        notify({ type: "success", text: "댓글이 수정 되었습니다!" });
        reload();
      }
    },
  },
});
