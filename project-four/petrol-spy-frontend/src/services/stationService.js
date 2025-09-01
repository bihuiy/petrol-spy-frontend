import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "stations/";

export const stationIndex = () => {
  return axios.get(BASE_URL);
};
