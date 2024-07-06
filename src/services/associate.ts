import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

export interface Associate {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
}

export const getAssociates = async (token: string) => {
  try {
    const response = await axios.get(`${apiUrl}/associates`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}
