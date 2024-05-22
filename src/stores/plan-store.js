import { defineStore } from "pinia";
import { getPlanList } from "@/api/plan";
import { OK } from "@/constant/status";

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
    async fetchPlanList() {
      const { data, status } = await getPlanList();
      if (status === OK) this.plans = data;
    },
  },
});
