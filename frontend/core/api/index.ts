import axios from "axios";

export const apiBaseUrl = "http://localhost:8080/";

export const controller = axios.create({
  baseURL: apiBaseUrl,
  responseType: "json"
});
