import type { OrderRepository, OrderWithDetails } from "@/repositories/order-repository.js";

// Interface para a resposta do SERVICE
export interface ListOrdersServiceResponse {
  orders: OrderWithDetails[];
}

export class ListOrdersService {
  
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<ListOrdersServiceResponse> {
    
    const orders = await this.orderRepository.list_orders();

    return {
      orders,
    };
  }
}