import { defineStore } from "pinia";

export const useSpotStore = defineStore("spot", {
  state: () => ({
    spot: {
      contentId: 0,
      address: "",
      title: "",
      image: "",
      tel: "",
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
      id: 0, //
      planId: 0,
      dateId: 0,
      priority: 0,
    },
  }),
  actions: {
    setSpotId(id) {
      this.spot.contentId = id;
      console.log(this.spot);
    },
  },
});
