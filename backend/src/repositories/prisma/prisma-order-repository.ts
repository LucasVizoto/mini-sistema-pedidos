import { prisma } from "@/lib/prisma.js";
import type { Order, Prisma } from "generated/prisma/index.js";

import type { OrderRepository, CreateOrderRepositoryInput} from "../order-repository.js";

export class PrismaOrderRepository implements OrderRepository {
  
  async create(data: CreateOrderRepositoryInput): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        status: data.status,
        
        
        client: {
          connect: { id: data.clientId }
        },
        
        products: {
          create: data.products.map(product => ({
            quantity: product.quantity,
            product: {
              connect: { id: product.product_id }
            }
          }))
        }
      }
    });

    return order;
  }

  async update_status(orderId: string, newStatus: Order["status"]): Promise<Order> {
    const order = await prisma.order.update({
      where:{
        id: orderId,
      },
      data: {
        status: newStatus,
      }
    })

    return order
  }

  async list_orders() {
    

    const prismaOrders = await prisma.order.findMany({
      include: {
        client: true, // Inclui o objeto do cliente
        products: { // Inclui os registros da tabela "pivot"
          include: {
            product: true // Para cada registro, inclui o objeto do produto
          }
        }
      }
    });

    // 2. Transforma os dados para bater com a interface OrderWithDetails
    const ordersWithDetails = prismaOrders.map(order => {
      
      // O Prisma retorna 'orderItems', mas nossa interface quer 'products'
      const products_mapped = order.products.map(item => ({
        ...item.product, // id, name, price
        quantity: item.quantity, 
      }));

      const { products, ...orderData } = order;

      return {
        ...orderData,
        products: products_mapped,
      };
    });

    return ordersWithDetails;
  }
}