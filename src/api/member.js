import { clientInstance } from "../util/http-client";

export const login = async params => {
  return await clientInstance.post("/member/login", params).then(res => {
    return res;
  });
};

export const signup = async params => {
  return await clientInstance.post("/member/regist", params).then(res => {
    return res;
  });
};

export const checkDuplicateId = async id => {
  return await clientInstance.get("/member/id/" + id).then(res => {
    return res;
  });
};

export const checkDuplicateNickName = async nickName => {
  return await clientInstance.get("/member/nickName/" + nickName).then(res => {
    return res;
  });
};
