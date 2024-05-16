import axios from "axios";

const createInstance = () => {
  const instance = axios.create({
    "baseURL": "http://192.168.120.73:8080",
    "timeout": 5000,
    "Access-Control-Allow-Origin": `http://localhost:5173`,
    "Access-Control-Allow-Credentials": "true",
  });

  return instance;
};

export const clientInstance = createInstance();
