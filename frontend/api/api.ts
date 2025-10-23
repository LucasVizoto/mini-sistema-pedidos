// /services/api.ts

import axios from "axios";


export interface Client {
  id: number
  name: string
  email: string
}

export interface Product {
  id: number
  name: string
  price: number
}

export interface Order {
  clientId: string
  products: Array<Product>
}

// Tipos para os dados de criação (sem o 'id')
type CreateClientData = Omit<Client, 'id'>
type CreateProductData = Omit<Product, 'id'>
type CreateOrderData = Omit<Order, 'id'>



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
export const postOrder = (data: CreateOrderData) => api.post<Order>('/pedidos', data)
export const listOrder = async () => {
  const response = await api.get('/pedidos');
  return response.data.data;
};

export const changeStatus = () => api.post('/pedidos/status')

export default api