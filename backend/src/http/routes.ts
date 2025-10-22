import { Router } from "express";

//----------- CONTROLER IMPORTS ----------- 
import { registerClient } from "@/controllers/register-client.js";
import { listerClient } from "@/controllers/lister-client.js";
import { registerProduct } from "@/controllers/register-product.js";
import { listerProduct } from "@/controllers/lister-products.js";
import { registerOrder } from "@/controllers/register-order.js";



const router = Router()

// ------------------- CLIENT ROUTES -------------------
router.post('/clientes', registerClient)
router.get('/clientes', listerClient)

// ------------------- PRODUCT ROUTES -------------------
router.post('/produtos', registerProduct)
router.get('/produtos', listerProduct)

// ------------------- ORDER ROUTES -------------------
router.post('/pedidos', registerOrder)

export default router