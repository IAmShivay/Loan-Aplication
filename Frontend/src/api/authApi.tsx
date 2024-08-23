// import axios from "axios";
import { clearToken } from "../utility/token";
import axiosInstance from "../components/apiAxios/axiosInstance";
import axios from "axios";
interface Credentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export const Register = async (credentials: Credentials) => {
  try {
    const response = await axiosInstance.post("/register", credentials);
    return response.data;
  } catch (error) {
    console.log(error);
    handleAxiosError(error);
  }
};

export const Login = async (credentials: Credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
export const Logout = async () => {
  try {
    const response = await axios.get("/api/v1/logout");
    if (response.status === 200) {
      clearToken();
      setTimeout(() => {
        window.location.href = "/user/login";
      }, 2000);
    }
  } catch (error) {
    return "An error occurred during logout";
  }
};
// src/verify.ts

export const Verify = async () => {
  try {
    const response = await axiosInstance.get("/verify"); // Use the instance directly
    return response.data.user;
  } catch (error) {
    handleAxiosError(error); // Ensure you have a proper error handling function
  }
};

function handleAxiosError(error: any) {
  if (error.response) {
    const errorMessage = error.response.data.message;
    console.log(errorMessage);
    throw errorMessage;
  } else {
    console.error("Axios error:", error.message);
    throw error.message;
  }
}
