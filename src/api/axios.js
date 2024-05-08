import axios from "axios";

export class AxiosClient {
  #baseUrl;
  #instance;

  constructor(url) {
    this.#baseUrl = url;

    this.#instance = axios.create({
      baseURL: this.#baseUrl,
      timeout: 5000,
    });
  }

  get(query) {
    let data;
    this.#instance
      .get(this.#baseUrl + query)
      .then(res => (data = res.data))
      .catch(error => (data = error));
    return data;
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
