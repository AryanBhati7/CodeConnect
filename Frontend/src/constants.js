export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import axios from "axios";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { API };
