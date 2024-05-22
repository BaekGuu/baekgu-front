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

export const addPlan = async requestObj => {
  const url = `/plan/regist`;
  try {
    console.log("요청", requestObj);
    const response = await clientInstance.post(url, requestObj);
    return response;
  } catch (error) {
    return error;
  }
};

export const getPlanDetail = async planId => {
  const url = `/plan/detail/${planId}`;
  try {
    const response = await clientInstance.get(url, planId);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteSpotFromPlan = async id => {
  const url = "/plan/place/delete";
  try {
    const response = await clientInstance.post(url, { id: id });
    return response;
  } catch (error) {
    return error;
  }
};

export const addDateToPlan = async planId => {
  const url = "/plan/date/regist";
  try {
    const response = await clientInstance.post(url, { planId: planId });
  
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteDateToPlan = async planId => {
  const url = "/plan/date/regist";
  try {
    const response = await clientInstance.post(url, { planId: planId });

    return response;
  } catch (error) {
    return error;
  }
};
