import { makeListProduct } from '@/service/factories/make-list-products.js'
import type {Request, Response} from 'express'

export async function listerProduct(request: Request, reply: Response) {
    let products: unknown

    try{
        const listerProductService = makeListProduct()

        products = await listerProductService.execute()

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
        .status(200)
        .send({
            data: products,
        })
}