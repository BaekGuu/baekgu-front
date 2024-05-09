import axios from "axios";

export const createInstance = () => {
  const instance = axios.create({
    baseURL: "http://192.168.120.76:8080",
    timeout: 5000,
  });

  return instance;
};
