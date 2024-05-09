import { createInstance } from "../util/http-client";

const clientInstance = createInstance();

export const login = async params => {
  return await clientInstance.post("/member/login", params).then(res => {
    return res;
  });
};
