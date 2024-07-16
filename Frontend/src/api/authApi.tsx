import axios from "axios";

interface Credentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true, // Send cookies
});

export const Register = async (credentials:Credentials) => {
  try {
    const response = await instance.post('/register', credentials);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const Login = async (credentials:Credentials) => {
  try {
    const response = await instance.post('/login', credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
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
