import { dataInstance } from "@/util/http-client";

export const getCityList = async () => {
  return await dataInstance
    .get(
      "/areaCode1?" +
        "serviceKey=" +
        import.meta.env.VITE_DATA_SERVICE_KEY +
        "&pageNo=1&numOfRows=10&MobileOS=ETC&MobileApp=AppTest&_type=json",
    )
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
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
