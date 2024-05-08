import axios from "axios";

class AxiosClient {
  #baseUrl;
  #instance;

  constructor() {
    this.#baseUrl = "http://192.168.120.76:8080";

    this.#instance = axios.create({
      baseURL: this.#baseUrl,
      timeout: 5000,
    });
  }

  async get(query) {
    return this.#instance.get(this.#baseUrl + query).then(res => {
      return res.data;
    });
  }

  async post(query, data) {
    return this.#instance.post(this.#baseUrl + query, data).then(res => {
      return res.status;
    });
  }
}

export const axiosClient = new AxiosClient();
