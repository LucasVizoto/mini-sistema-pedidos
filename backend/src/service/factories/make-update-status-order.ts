import { PrismaOrderRepository } from "@/repositories/prisma/prisma-order-repository.js";
import { ChangeOrderStatusService } from "../change-order-status.js";


export function makeUpdateOrderStatus(){
    const orderRepository = new PrismaOrderRepository()
    const service = new ChangeOrderStatusService(orderRepository)

    return service
}