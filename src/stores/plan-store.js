import { defineStore } from "pinia";
import { addDateToPlan, deleteDateToPlan, deleteSpotFromPlan, getPlanList } from "@/api/plan";
import { OK } from "@/constant/status";
import { useNotification } from "@kyvg/vue3-notification";
import { reload } from "@/util/custom-router";

const { notify } = useNotification();

export const usePlanStore = defineStore("plan", {
  state: () => ({
    plan: {
      id: 0,
      title: "",
      description: "",
    },
    plans: [],
  }),
  actions: {
    async handleClickAddDate(id) {
      const { status } = await addDateToPlan(id);
      if (status === OK) notify({ type: "success", text: "날짜가 추가 되었습니다!" });
      reload();
    },
    async handleClickDeleteDate(id) {
      const flag = confirm("정말 삭제?");
      if (!flag) return;
      const { status } = await deleteDateToPlan(id);
      if (status === OK) notify({ type: "success", text: "날짜가 삭제 되었습니다!" });
      reload();
    },
    async handleClickDeleteSpot(id) {
      const flag = window.confirm("정말 삭제 하시겠습니까?");
      if (!flag) return;
      const { status } = await deleteSpotFromPlan(id);
      if (status === OK) {
        notify({ type: "success", text: "여행지가 삭제 되었습니다!" });
        reload();
      }
    },
  },
});
