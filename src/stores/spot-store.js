import { addSpotToPlan } from "@/api/plan";
// import { OK } from "@/constant/status";
import { defineStore } from "pinia";

export const useSpotStore = defineStore("spot", {
  state: () => ({
    spot: {
      contentId: 0,
      address: "",
      title: "",
      image: "",
      tel: "",
      mapx: "",
      mapy: "",
      homepage: "",
      overview: "",
      parking: "",
      route: "",
      publictransport: "",
      ticketoffice: "",
      promotion: "",
      wheelchair: "",
      exit: "",
      elevator: "",
      restroom: "",
      auditorium: "",
      room: "",
      handicapetc: "",
      braileblock: "",
      helpdog: "",
      guidehuman: "",
      audioguide: "",
      bigprint: "",
      brailepromotion: "",
      guidesystem: "",
      blindhandicapetc: "",
      signguide: "",
      videoguide: "",
      hearingroom: "",
      hearinghandicapetc: "",
      stroller: "",
      lactationroom: "",
      babysparechair: "",
      infantsfamilyetc: "",
    },
  }),
  actions: {
    setSpotDetail(data) {
      this.spot = {
        ...this.spot,
        contentId: parseInt(data.contentid),
        address: data.addr1,
        title: data.title,
        image: data.firstimage,
        tel: data.tel,
        mapx: data.mapx,
        mapy: data.mapy,
        homepage: data.homepage,
        overview: data.overview,
      };
    },
    setSpotBarrierFree(data) {
      const filters = [
        "contentid",
        "addr1",
        "title",
        "firstimage",
        "tel",
        "mapx",
        "mapy",
        "homepage",
        "overview",
      ];
      Object.keys(data).forEach(key => {
        if (!filters.includes(key)) this.spot[key] = data[key];
      });
    },
    async addSpotToPlan(planId) {
      const { data, status } = await addSpotToPlan({
        planId: planId,
        ...this.spot,
      });
      return { data, status };
    },
  },
});
