import axiosInstance from "../components/apiAxios/axiosInstance";

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

export const RegisterAdminResponse = async (credentials: Credentials) => {
  try {
    const response = await axiosInstance.post("/registerAdmin", credentials);
    console.log("Registration response:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
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
