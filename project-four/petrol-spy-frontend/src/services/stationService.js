import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "/stations/";

export const stationIndex = (bbox) => {
  return axios.get(`${BASE_URL}?bbox=${bbox}`);
};

export const stationShow = (stationId) => {
  return axios.get(`${BASE_URL}/${stationId}`);
};
