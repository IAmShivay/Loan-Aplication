// import axios from "axios";

import axiosInstance from "../components/apiAxios/axiosInstance";

interface Credentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export const Register = async (credentials:Credentials) => {
  try {
    const response = await axiosInstance.post('/register', credentials);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.log(error)
    handleAxiosError(error);
  }
};

export const Login = async (credentials:Credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// src/verify.ts

export const Verify = async () => {
  try {
    const response = await axiosInstance.get('/verify'); // Use the instance directly
    console.log('Verify response:', response.data.user);
    return response.data.user;
  } catch (error) {
    handleAxiosError(error); // Ensure you have a proper error handling function
  }
};


function handleAxiosError(error:any) {
  if (error.response) {
    const errorMessage = error.response.data.message;
    console.log(errorMessage);
    throw errorMessage;
  } else {
    console.error('Axios error:', error.message);
    throw error.message;
  }
}
