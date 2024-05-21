import { dataInstance } from "@/util/http-client";

export const getCityList = async () => {
  const url = `/areaCode1?serviceKey=${import.meta.env.VITE_DATA_SERVICE_KEY}&pageNo=1&numOfRows=10&MobileOS=ETC&MobileApp=AppTest&_type=json`;
  try {
    const response = await dataInstance.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching city list:", error);
    return error;
  }
};

export const getDistrictList = async areaCode => {
  return await dataInstance
    .get(
      "/areaCode1?" +
        "serviceKey=" +
        import.meta.env.VITE_DATA_SERVICE_KEY +
        "&areaCode=" +
        areaCode +
        "&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json",
    )
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};

export const getSearchResult = async (keyword, areaCode, sigunguCode, pageNo) => {
  const url = `/searchKeyword1?serviceKey=${import.meta.env.VITE_DATA_SERVICE_KEY}&numOfRows=9&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&listYN=Y&arrange=C&_type=json${
    areaCode ? `&areaCode=${areaCode}` : ""
  }${sigunguCode ? `&sigunguCode=${sigunguCode}` : ""}&keyword=${keyword}`;
  try {
    const response = await dataInstance.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const getBarrierFreeInfo = async contentId => {
  const url = `/detailWithTour1?serviceKey=${import.meta.env.VITE_DATA_SERVICE_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&_type=json`;
  try {
    const response = await dataInstance.get(url);
    return response;
  } catch (error) {
    return error;
  }
};
