import { clientInstance } from "../util/http-client";

export const login = async params => {
  return await clientInstance.post("/member/login", params).then(res => {
    return res;
  });
};
