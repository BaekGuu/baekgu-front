import { clientInstance } from "@/util/http-client";

export const getBoardList = async () => {
  return await clientInstance.get("/board/list").then(res => {
    return res.data;
  });
};

export const getBoard = async id => {
  return await clientInstance.get("/board/" + id).then(res => {
    return res.data;
  });
};

export const registBoard = async params => {
  return await clientInstance.post("/board/regist", params).then(res => {
    return res;
  });
};

export const deleteBoard = async params => {
  return await clientInstance.post("/board/delete", params).then(res => {
    return res;
  });
};

export const editBoard = async params => {
  return await clientInstance.put("/board/update", params).then(res => {
    return res;
  });
};
