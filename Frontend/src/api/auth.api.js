import { API } from "../constants.js";

export const getCurrentUserApi = async () => {
  try {
    const response = await API.get("/auth/current-user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const checkEmailApi = async (email) => {
  try {
    const response = await API.post("/auth/check-email", { email });
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginApi = async (data) => {
  // console.log(email, password, "email and password");
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerUserApi = async (data) => {
  console.log(data, "data received at api file");
  const formData = new FormData();

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("name", data.name);
  console.log(formData);
  try {
    const response = await API.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
