import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

export interface Product {
  id: string;
  name: string;
  description: string;
  value: string;
  code: string;
}

export const getProducts = async (token: string) => {
  try {
    const response = await axios.get(`${apiUrl}/products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}

