import { clientInstance } from "@/util/http-client";

export const getComments = async boardId => {
  return await clientInstance
    .get("/comment/" + boardId)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
};

export const registComment = async params => {
  return await clientInstance
    .post("/comment/regist", params)
    .then(res => {
      return res;
    })
    .catch(error => {
      return error;
    });
};
