import $api from "../../backend/api/$api";
import aspida from "@aspida/fetch";

export const api = $api(
  aspida(fetch, {
    baseURL: "http://localhost:8888",
  })
);
