import axios from "axios";


export interface Client {
  id: string
  name: string
  email: string
}

export interface Product {
  id: string
  name: string
  price: number
}

export interface CreateOrderPayload {
  clientId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

export interface OrderProduct extends Product {
  quantity: number
}

export interface OrderResponse{
  id: string
  status: string
  date: string
  client_id: string
  client: Client
  products: OrderProduct[]
  amount: number
}

// Tipos para os dados de criação (sem o 'id')
type CreateClientData = Omit<Client, 'id'>
type CreateProductData = Omit<Product, 'id'>
type CreateOrderData = Omit<CreateOrderPayload, 'id'>



const api = axios.create({
    baseURL: 'http://localhost:3333'
})

// ------------------- CLIENT ROUTES -------------------
export const postClient = (data: CreateClientData) => api.post<Client>('/clientes', data)
export const listClient = async () => {
  const response = await api.get('/clientes');
  return response.data.data;
};

// ------------------- PRODUCT ROUTES -------------------
export const postProduct = (data: CreateProductData) => api.post<Product>('/produtos', data)
export const listProduct = async () => {
  const response = await api.get('/produtos');
  return response.data.data;
};
// ------------------- ORDER ROUTES -------------------
export const postOrder = (data: CreateOrderData) => api.post<CreateOrderPayload>('/pedidos', data)
export const listOrder = async () => {
  const response = await api.get('/pedidos');
  return response.data.data;
};
export const payOrder = (orderId: string) => {
  return api.patch(`/pedidos/${orderId}`, { newStatus: 'PAGO' })
};

export default api