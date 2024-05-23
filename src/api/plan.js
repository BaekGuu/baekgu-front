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

export const addSpotToPlan = async params => {
  const url = `/plan/place/regist`;
  try {
    const response = await clientInstance.post(url, params);
    return response;
  } catch (error) {
    return error;
  }
};

export const addPlan = async params => {
  const url = `/plan/regist`;
  try {
    const response = await clientInstance.post(url, params);
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

export const deleteDateToPlan = async dateId => {
  const url = "/plan/date/delete";
  try {
    const response = await clientInstance.post(url, { id: dateId });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
