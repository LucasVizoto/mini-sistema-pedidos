// Importe a INTERFACE (contrato) do repositório, não a implementação
import type { OrderRepository } from "@/repositories/order-repository.js"; 
import type { Order } from "generated/prisma/index.js";

// Interface para os dados que o CONTROLLER envia para o SERVICE
export interface CreateOrderServiceRequest {
  clientId: string;
  // A requisição da API deve enviar uma lista de produtos com ID e quantidade
  products: {
    productId: string;
    quantity: number;
  }[];
}

// Interface para a resposta do SERVICE
export interface CreateOrderServiceResponse {
  order: Order;
}

export class CreateOrderService {
  
  // 1. O construtor deve injetar o OrderRepository
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    clientId,
    products,
  }: CreateOrderServiceRequest): Promise<CreateOrderServiceResponse> {
    
    // 2. O service prepara os dados para o formato que o REPOSITÓRIO espera
    const order = await this.orderRepository.create({
      clientId: clientId,
      status: "PENDENTE", 
      
      // 4. O Service formata a lista de produtos
      products: products.map(p => ({
        product_id: p.productId,
        quantity: p.quantity,
      })),
    });

    // 5. Retorna o pedido criado
    return {
      order,
    };
  }
}