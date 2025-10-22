import type { OrderWithDetails } from '@/repositories/order-repository.js';
import { makeListerOrder } from '@/service/factories/make-list-order.js'
import type {Request, Response} from 'express'

type OrderWithAmount = OrderWithDetails & {
  amount: number;
}

export interface ListOrdersServiceResponse {
  orders: OrderWithAmount[];
}

export async function listerOrder(request: Request, reply: Response) {
    let order: unknown

    try{
        const listerOrderService = makeListerOrder()

        order = await listerOrderService.execute()

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
            data: order,
        })
}