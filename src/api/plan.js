import { getCookie } from "@/util/cookies";
import { clientInstance } from "@/util/http-client";

export const getPlanList = async () => {
  const url = `/plan/${getCookie("userId")}`;
  try {
    const response = await clientInstance.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const addSpotToPlan = async contentId => {
  const url = `/plan/place/regist`;
  try {
    const response = await clientInstance.post(url, contentId);
    return response;
  } catch (error) {
    return error;
  }
};
