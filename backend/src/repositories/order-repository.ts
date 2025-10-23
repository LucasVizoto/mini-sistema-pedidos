import type { Order, Product, Prisma, Client } from "generated/prisma/index.js";

export type OrderItem = {
  order_id: string
  product_id: string
  quantity: number
};

export interface CreateOrderRepositoryInput {
  clientId: string
  status: string // "PENDENTE" | "PAGO"
  date?: Date
  products: {
    product_id: string
    quantity: number
  }[];
}

export type OrderWithDetails = Order & {
  products: (Product & { quantity: number })[]
  client: Client
};



export interface OrderRepository{
    create(data: CreateOrderRepositoryInput): Promise<Order>
    list_orders():Promise<OrderWithDetails[]>
    update_status(orderId: string, newStatus: Order['status']):Promise<Order>

}