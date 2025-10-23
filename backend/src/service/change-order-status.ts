import type { OrderRepository } from "@/repositories/order-repository.js";
import type { Order } from "generated/prisma/index.js";


interface ChengeOrderStatusServiceRequest{
    orderId: string
    newStatus: string
}

interface ChengeOrderStatusServiceResponse{
    order: Order
}


export class ChangeOrderStatusService{
    constructor(private orderRepository: OrderRepository){}

    async execute({orderId, newStatus}:ChengeOrderStatusServiceRequest): Promise<ChengeOrderStatusServiceResponse>{
        const order = await this.orderRepository.update_status(orderId, newStatus)

        return{
            order,
        }
    }
}