import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Associate, getAssociates } from '@src/services/associate';
import { Product, getProducts } from '@src/services/product';
import { Order, getOrders, newOrder } from '@src/services/order';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

interface DataProviderProps {
  children: ReactNode;
}

interface IDataContextData {
  loading: boolean;
  token: string;
  orders: Order[];
  associates: Associate[];
  products: Product[];
  associate: Associate;
  product: Product;
  changeProduct(cProduct: Product): void;
  changeUser(cUser: Associate): void;
  saveOrder(order: Order): Promise<boolean>;
  fetchData(): void
  getToken(): void
}

const username = process.env.EXPO_PUBLIC_API_USERNAME
const password = process.env.EXPO_PUBLIC_API_PASSWORD
const apiUrl = process.env.EXPO_PUBLIC_API_URL

const DataContext = createContext({} as IDataContextData);

function DataProvider({ children }: DataProviderProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [associates, setAssociates] = useState<Associate[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [product, setProduct] = useState<Product>({} as Product)
  const [associate, setAssociate] = useState<Associate>({} as Associate)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  async function getData(): Promise<{
    associates: Associate[],
    products: Product[],
    orders: Order[]
  }> {
    const [rAssociates, rProducts, rOrders] = await Promise.all([
      getAssociates(token),
      getProducts(token),
      getOrders(token),
    ]);

    return { associates: rAssociates, products: rProducts, orders: rOrders };
  }

  const fetchData = async () => {
    try {
      const data = await getData();
      setAssociates(data?.associates)
      setProducts(data?.products)
      setOrders(data?.orders)
    } catch {
      showMessage({
        type: 'danger',
        message: 'Ocorreu um erro ao carregar dados',
        icon: 'danger',
      });
    }
  };

  async function getToken() {
    setLoading(true)
    try {
      const result = await axios.post(`${apiUrl}/login`, {
        email: username,
        password: password,
      })

      setToken(result.data.access_token)

    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Ocorreu um erro ao autenticar',
        icon: 'danger',
      });
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getToken()
  }, [])


  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  function changeProduct(cProduct: Product) {
    setProduct(cProduct)
  }

  function changeUser(cAssociate: Associate) {
    setAssociate(cAssociate)
  }

  async function saveOrder(nOrder: Order): Promise<boolean> {
    try {
      await newOrder(token, nOrder)
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <DataContext.Provider
      value={{
        loading,
        token,
        orders,
        associates,
        products,
        associate,
        product,
        changeProduct,
        changeUser,
        saveOrder,
        fetchData,
        getToken
      }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);

  return context;
}

export { DataProvider, useData };
