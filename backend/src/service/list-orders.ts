import type { OrderRepository, OrderWithDetails } from "@/repositories/order-repository.js";

// Interface para a resposta do SERVICE
export interface ListOrdersServiceResponse {
  orders: OrderWithDetails[];
}

export class ListOrdersService {
  
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<ListOrdersServiceResponse> {
    
    const ordersFromRepo = await this.orderRepository.list_orders();

    const orders = ordersFromRepo.map(order => {

      // 3. Calcula o 'amount' para este pedido específico
      const amount = order.products.reduce((total, product) => {
        return total + (product.price * product.quantity);
      }, 0)

      //Retorna um *novo* objeto com todas as propriedades do pedido
      //    original (...order) mais o novo campo 'amount'
    return {
        ...order,
        amount: amount,
      };
    });

    return {
      orders,
    };
  }
}