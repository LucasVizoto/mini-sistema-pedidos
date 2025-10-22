import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository.js";
import { ListOrdersService } from "../list-orders.js";

export function makeListerOrder(){
    const orderRepository = new PrismaOrderRepository()
    const service = new ListOrdersService(orderRepository)

    return service
}