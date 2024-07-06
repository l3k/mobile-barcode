import axios from "axios";
import { Associate } from "./associate";
import { Product } from "./product";

const apiUrl = process.env.EXPO_PUBLIC_API_URL

export interface Order {
  id?: string;
  qtd: number;
  obs?: string;
  amount?: string;
  createdAt?: string;
  associate?: Associate;
  product?: Product;
  associateId: string;
  productId: string;
}

export const getOrders = async (token: string) => {
  try {
    const response = await axios.get(`${apiUrl}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const newOrder = async (token: string, order: Order) => {
  try {
    const response = await axios.post(`${apiUrl}/orders`, {
      qtd: order.qtd,
      obs: order.obs,
      associate_id: order.associateId,
      product_id: order.productId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}
