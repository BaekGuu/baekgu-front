import { ref } from "vue";

export const mainCategory = ref(["지체 장애", "시각 장애", "청각 장애", "영유아 가족", "고령자"]);
export const subCategory = ref({
  "지체 장애": [
    "🚗 주차 여부",
    "🚌 대중교통",
    "👌 접근로",
    "🎫 매표소 ",
    "📢 홍보물",
    "♿ 휠체어",
    "🏃 출입 통로",
    "🛗 엘리베이터",
    "🏟️ 관람석",
    "🦽 지체장애 기타",
  ],
  "시각 장애": [
    "🫳🏻 점자 블록",
    "🐕‍🦺 보조견 동반",
    "⛑ 안내 요원",
    "🎧 오디오 가이드",
    "🔠 큰 활자 홍보물",
    "📃 점자 홍보물 및 점자 표지판",
    "🦯 시각장애 기타",
  ],
  "청각 장애": ["🧏 수화 안내", "📼 영상 자막 안내", "🛏️ 청각장애인용 객실"],
  "영유아 가족": ["👶🏻 유모차", "🚼 수유실", "🪑 유아용 보조 의자", "👪 영유아 가족 기타"],
  "고령자": [],
});

export const searchedResult = ref([
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
  {
    imageUrl: "https://tour.daegu.go.kr/icms/tour/file/getImage.do?atchFileId=FILE_KOATTR_325",
    title: "대구방짜유기박물관",
    addr: "대구광역시 동구",
  },
]);
