import type { Prisma, Order } from "generated/prisma/index.js";
import type { CreateOrderRepositoryInput, OrderItem, OrderRepository, OrderWithDetails } from "../order-repository.js";
import { randomUUID } from "node:crypto";
import type { ProductRepository } from "../product-repository.js";
import type { ClientRepository } from "../client-repository.js";

export class InMemoryOrderRepository implements OrderRepository {
  
  public items: Order[] = [];
  public orderItems: OrderItem[] = [];
  
  constructor(
    private productRepository: ProductRepository,
    private clientRepository: ClientRepository
  ) {}

  async create(data: CreateOrderRepositoryInput): Promise<Order> {
    const orderId = randomUUID();

    const order: Order = {
      id: orderId,
      status: data.status,
      date: data.date ? new Date(data.date) : new Date(),
      client_id: data.clientId,
    };

    this.items.push(order);

    // 2. Cria as entidades "ItensPedido" (OrderItem)
    for (const product of data.products) {
      const orderItem: OrderItem = {
        order_id: orderId,
        product_id: product.product_id,
        quantity: product.quantity,
      };
      this.orderItems.push(orderItem);
    }

    return order;
  }

  async list_orders(): Promise<OrderWithDetails[]> {
    const ordersWithDetails: OrderWithDetails[] = [];

    // Para cada pedido em 'this.items'
    for (const order of this.items) {
      // 1. Encontre os itens (relação N:M)
      const itemsForThisOrder = this.orderItems.filter(
        (item) => item.order_id === order.id
      );

      // 2. Encontre os detalhes dos produtos para esses itens
      const productsDetails = [];
      for (const item of itemsForThisOrder) {
        const product = await this.productRepository.findById(item.product_id);
        
        if (product) {
          productsDetails.push({
            ...product, // id, name, price
            quantity: item.quantity,
          });
        }
      }
      
      // 3. Encontre os detalhes do cliente
      const client = await this.clientRepository.findById(order.client_id);
      
      if (!client) {
        throw new Error(`Client not found for order ${order.id}`);
      }

      // 4. Junção tudos os dados
      ordersWithDetails.push({
        ...order,
        products: productsDetails,
        client
      });
    }

    return ordersWithDetails;
  }
}