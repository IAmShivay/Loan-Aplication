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
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const GetDataAllApplications = async () => {
  try {
    const response = await axiosInstance.get("/getAllapplications");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const GetDataResponse = async () => {
  try {
    const response = await axiosInstance.get("/details");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

function handleAxiosError(error: any) {
  if (error.response) {
    const errorMessage = error.response.data.message;
    throw errorMessage;
  } else {
    console.error("Axios error:", error.message);
    throw error.message;
  }
}
