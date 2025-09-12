import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/stations/";

export const stationIndex = (bbox) => {
  return axios.get(`${BASE_URL}?bbox=${bbox}`);
};

export const bookmarkStation = (stationId) => {
  return axios.post(`${BASE_URL}${stationId}/bookmark/`, null, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const unbookmarkStation = (stationId) => {
  return axios.delete(`${BASE_URL}${stationId}/bookmark/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
