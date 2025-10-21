import { makeCreateProduct } from '@/service/factories/make-create-product.js'
import type {Request, Response} from 'express'
import {z} from "zod"

export async function registerProduct(request: Request, reply: Response) {
    const registerBodySchema = z.object({
        name: z.string(),
        price: z.number(),
    })

    const {name, price} = registerBodySchema.parse(request.body)

    // declare client in outer scope so it's available after the try/catch
    let product: unknown

    try{
        const createProductService = makeCreateProduct()

        product = await createProductService.execute({
            name, 
            price,
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
            message: 'Product has been created successfully!',
            data: product
        })
}