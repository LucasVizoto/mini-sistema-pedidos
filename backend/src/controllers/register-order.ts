import { makeCreateOrder } from '@/service/factories/make-create-order.js'
import { makeCreateProduct } from '@/service/factories/make-create-product.js'
import type {Request, Response} from 'express'
import {number, string, z} from "zod"

export async function registerOrder(request: Request, reply: Response) {
    const registerBodySchema = z.object({
        clientId: z.string(),
        products: z.array( // 1. 'products' é um array...
            z.object({       // 2. ...de objetos
                productId: z.string(), // 3. cada objeto tem um 'product_id'
                quantity: z.number().int().positive(), // 4. e uma 'quantity'
            }),
        ).min(1), // 5. e deve ter pelo menos um elemento
    })

    const { clientId, products } = registerBodySchema.parse(request.body)
    
    let order: unknown

    try{
        const createOrderService = makeCreateOrder()

        order = await createOrderService.execute({
            clientId, 
            products,
        })

    } catch (err){
        if(err instanceof Error){
            return reply
            .status(500)
            .send({
                message: err.message
            })
        }
        throw err
    }
    
    return reply
        .status(201)
        .send({
            message: 'Order has been created successfully!',
            data: order
        })
}