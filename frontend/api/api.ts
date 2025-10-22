import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

// ------------------- CLIENT ROUTES -------------------
export const postClient = (data: Object) => api.post('/clientes')
export const listClient = () => api.get('/clientes')

// ------------------- PRODUCT ROUTES -------------------
export const postProduct = (data: Object) => api.post('/produtos')
export const listProduct = () => api.get('/produtos')


// ------------------- ORDER ROUTES -------------------
export const postOrder = (data: Object) => api.post('/pedidos')
export const listOrder = () => api.get('/pedidos')