import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/bookmarks/";

export const bookmarkIndex = () => {
  return axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const tagUpdate = (bookmarkId, formData) => {
  return axios.put(`${BASE_URL}${bookmarkId}/tag/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const tagDelete = (bookmarkId) => {
  return axios.delete(`${BASE_URL}${bookmarkId}/tag`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
