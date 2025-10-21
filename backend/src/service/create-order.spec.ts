import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOrderService } from './create-order.js'
import { InMemoryOrderRepository } from '@/repositories/in-memory/in-memory-order.js'



import type { Product, Prisma } from 'generated/prisma/index.js'
import type { ProductRepository } from '../repositories/product-repository.js'
import { InMemoryClientRepository } from '@/repositories/in-memory/in-memory-client.js'
import { randomUUID } from 'node:crypto'

class InMemoryProductRepositoryStub implements ProductRepository {
  public items: Product[] = []
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product: Product = {
      id: data.id || randomUUID(),
      name: data.name,
      price: data.price,
    }
    this.items.push(product)
    return product
  }
  async findById(id: string): Promise<Product | null> {
    return this.items.find((item) => item.id === id) || null
  }
  async list_products(): Promise<Product[]> {
    return this.items
  }

}
// --- Fim dos Mocks ---

// --- Variáveis de Teste ---
let orderRepository: InMemoryOrderRepository // Usamos a classe concreta para acessar .items
let productRepository: InMemoryProductRepositoryStub
let clientRepository: InMemoryClientRepository
let sut: CreateOrderService // sut = Subject Under Test

describe('Create Order Service', () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepositoryStub()
    clientRepository = new InMemoryClientRepository()
    orderRepository = new InMemoryOrderRepository(productRepository, clientRepository)

    // 2. Injetar a dependência e criar o SUT
    sut = new CreateOrderService(orderRepository)

    // (Opcional) Popular produtos para o teste
    await productRepository.create({ id: 'product-01', name: 'Product 1', price: 10 })
    await productRepository.create({ id: 'product-02', name: 'Product 2', price: 20 })
  })

  // --- Test Case ---
  it('should be able to create a new order with products', async () => {
    // 1. Arrange (Preparar)
    const clientId = 'client-01'
    const productsInput = [
      { productId: 'product-01', quantity: 2 },
      { productId: 'product-02', quantity: 1 },
    ]

    // 2. Act (Executar)
    const { order } = await sut.execute({
      clientId: clientId,
      products: productsInput,
    })

    // 3. Assert (Verificar)

    // Verifica o objeto retornado pelo service
    expect(order.id).toEqual(expect.any(String))
    expect(order.client_id).toEqual('client-01')
    expect(order.status).toEqual('PENDENTE') // Regra de negócio do service!

    // Verifica o "banco de dados" em memória (o estado do repositório)
    // Verifica a tabela 'Order'
    expect(orderRepository.items).toHaveLength(1)

    // Verifica a tabela 'OrderItem' (a relação N:M)
    expect(orderRepository.orderItems).toHaveLength(2)
    expect(orderRepository.orderItems).toEqual(
      expect.arrayContaining([
        // Verifica se o primeiro item do pedido está correto
        expect.objectContaining({
          order_id: order.id,
          product_id: 'product-01',
          quantity: 2,
        }),
        // Verifica se o segundo item do pedido está correto
        expect.objectContaining({
          order_id: order.id,
          product_id: 'product-02',
          quantity: 1,
        }),
      ]),
    )
  })
})