import { Router } from "express";

//----------- CONTROLER IMPORTS ----------- 
import { registerClient } from "@/controllers/register-client.js";



const router = Router()

// ------------------- CLIENT ROUTES -------------------
router.post('/clientes', registerClient)

// ------------------- PRODUCT ROUTES -------------------

// ------------------- ORDER ROUTES -------------------

export default router