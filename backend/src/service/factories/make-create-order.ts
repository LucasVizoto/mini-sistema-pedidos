import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository.js";
import { CreateOrderService } from "../create-order.js";

export function makeCreateOrder(){
    const orderRepository = new PrismaOrderRepository()
    const service = new CreateOrderService(orderRepository)

    return service
}