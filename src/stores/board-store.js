import { deleteBoard, editBoard, registBoard } from "@/api/board";
import { OK } from "@/constant/status";
import router from "@/router";
import { getCookie } from "@/util/cookies";
import { useNotification } from "@kyvg/vue3-notification";
import { defineStore } from "pinia";

const { notify } = useNotification();

export const useBoardStore = defineStore("board", {
  state: () => ({
    board: {
      boardId: 0,
      writerId: getCookie("userId"),
      title: "",
      content: "",
    },
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
    async handleClickDeleteBoard(boardId) {
      const { status } = await deleteBoard({
        writerId: this.board.writerId,
        boardId: boardId,
      });

      if (status === OK) {
        notify({ type: "success", text: "글이 삭제 되었습니다!" });
        router.push("/board");
      }
    },
    async handleSubmitEdit() {
      const { status } = await editBoard(this.board);

      if (status === OK) {
        notify({
          type: "success",
          text: "글이 수정 되었습니다!",
        });
        router.push("/board/" + this.board.boardId);
      }
    },
    async handleSubmitRegist() {
      const { status } = await registBoard(this.board);

      if (status === OK) {
        notify({
          type: "success",
          text: "새로운 글이 등록 되었습니다!",
        });
        router.push("/board");
      }
    },
  },
});
