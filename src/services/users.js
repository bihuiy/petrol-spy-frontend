import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/users/";

export const signUp = (formData) => {
  return axios.post(BASE_URL + "sign-up/", formData);
};

export const signIn = (formData) => {
  return axios.post(BASE_URL + "sign-in/", formData);
};
