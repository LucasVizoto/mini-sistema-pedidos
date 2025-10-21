import { Router } from "express";

//----------- CONTROLER IMPORTS ----------- 
import { registerClient } from "@/controllers/register-client.js";
import { listerClient } from "@/controllers/lister-client.js";
import { registerProduct } from "@/controllers/register-product.js";



const router = Router()

// ------------------- CLIENT ROUTES -------------------
router.post('/clientes', registerClient)
router.get('/clientes', listerClient)

// ------------------- PRODUCT ROUTES -------------------
router.post('/produtos', registerProduct)

// ------------------- ORDER ROUTES -------------------

export default router