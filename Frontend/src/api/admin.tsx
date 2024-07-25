import axios from "axios";

interface Credentials {
  Bank: string;
  comment: string;
  interestRate: number;
  isSubmitted: boolean;
  loanAmount: number;
  phoneNumber: string;
  status: string;
  user: string;
}
const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  withCredentials: true, // Send cookies
});

export const RegisterAdminResponse = async (credentials: Credentials) => {
  try {
    const response = await instance.post("/registerAdmin", credentials);
    console.log("Registration response:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    handleAxiosError(error);
  }
};

export const GetDataResponse = async () => {
  try {
    const response = await instance.get("/details");
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
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
