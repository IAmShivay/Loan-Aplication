import axiosInstance from "../components/apiAxios/axiosInstance";
export const GetUserDataResponse = async () => {
  
  try {
    const response = await axiosInstance.get("/details");
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
