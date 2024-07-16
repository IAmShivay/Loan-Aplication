import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product`,
    );
    console.log(response)

    return response.data.products;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  }
};