import axiosInstance from "../components/apiAxios/axiosInstance";
import { showSnackbar } from "../app/errors/errorSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

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
  const dispatch = useDispatch<AppDispatch>();

  try {
    const response = await axiosInstance.post("/registerAdmin", credentials);
    return response.data;
  } catch (error) {
    dispatch(showSnackbar({ message: "Test Snackbar", severity: "success" }));
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
