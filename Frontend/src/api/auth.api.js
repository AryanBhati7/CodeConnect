import { API } from "../constants.js";

export const getCurrentUserApi = async () => {
  try {
    const response = await API.get("/auth/current-user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkEmailApi = async (email) => {
  try {
    const response = await API.post("/auth/check-email", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginApi = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
