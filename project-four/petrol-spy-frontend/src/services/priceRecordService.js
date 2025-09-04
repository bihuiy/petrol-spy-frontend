import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/price-records/";

export const priceRecordIndex = () => {
  return axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const priceRecordCreate = (formData) => {
  return axios.post(BASE_URL, formData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const priceRecordDelete = (priceRecordId) => {
  return axios.delete(`${BASE_URL}${priceRecordId}/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
