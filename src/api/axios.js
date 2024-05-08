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

  get(query) {
    return this.#instance.get(this.#baseUrl + query).then(res => {return res.data});
  }

  post(query) {
    let result;
    this.#instance
      .post(this.#baseUrl + query)
      .then(res => (result = res.status))
      .catch(error => (result = error));
    return result;
  }
}

export const axiosClient = new AxiosClient();
