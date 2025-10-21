import { describe, it, expect, beforeEach } from 'vitest'
import { randomUUID } from 'node:crypto'
import type { Product, Prisma, Client } from 'generated/prisma/index.js'

// --- Repositórios e Serviços ---
import { InMemoryOrderRepository } from '@/repositories/in-memory/in-memory-order.js'
import { InMemoryClientRepository } from '@/repositories/in-memory/in-memory-client.js'
import type { ProductRepository } from '@/repositories/product-repository.js'
import { CreateOrderService } from './create-order.js'
import { ListOrdersService } from './list-orders.js'

// --- Stubs ---
class InMemoryProductRepositoryStub implements ProductRepository {
  public items: Product[] = []
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product: Product = { id: data.id || randomUUID(), ...data }
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

// --- Variáveis de Teste ---
let orderRepository: InMemoryOrderRepository
let productRepository: InMemoryProductRepositoryStub
let clientRepository: InMemoryClientRepository
let createOrderService: CreateOrderService
let sut: ListOrdersService // Subject Under Test

// --- Setup ---
describe('List Orders Service', () => {
  
  beforeEach(async () => {
    productRepository = new InMemoryProductRepositoryStub()
    clientRepository = new InMemoryClientRepository()
    orderRepository = new InMemoryOrderRepository(productRepository, clientRepository)

    createOrderService = new CreateOrderService(orderRepository) // Para criar dados
    sut = new ListOrdersService(orderRepository) // O serviço que estamos testando
    
    // Criar um cliente
    await clientRepository.create({
      id: 'client-01',
      name: 'John Doe',
      email: 'john.doe@example.com',
    })

    // Criar produtos
    await productRepository.create({ id: 'product-01', name: 'Pizza', price: 50.0 })
    await productRepository.create({ id: 'product-02', name: 'Soda', price: 8.0 })

    // Criar um pedido
    await createOrderService.execute({
      clientId: 'client-01',
      products: [
        { productId: 'product-01', quantity: 1 },
        { productId: 'product-02', quantity: 2 },
      ],
    })
  })

  // --- Test Case ---
  it('should be able to list all orders with client and product details', async () => {

    const { orders } = await sut.execute()

    expect(orders).toHaveLength(1)
    expect(orders[0]?.id).toEqual(expect.any(String))

    // Verifica se os dados do CLIENTE foram incluídos (join)
    expect(orders[0]?.client).toBeDefined()
    expect(orders[0]?.client.name).toEqual('John Doe')

    // Verifica se os dados dos PRODUTOS foram incluídos (join N:M)
    expect(orders[0]?.products).toHaveLength(2)
    
    // Verifica o primeiro produto do pedido
    expect(orders[0]?.products[0]?.name).toEqual('Pizza')
    expect(orders[0]?.products[0]?.quantity).toEqual(1)
    
    // Verifica o segundo produto do pedido
    expect(orders[0]?.products[1]?.name).toEqual('Soda')
    expect(orders[0]?.products[1]?.quantity).toEqual(2)

    console.log(JSON.stringify(orders, null, 2));
  })
})