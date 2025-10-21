import type {Product, Prisma} from 'generated/prisma/index.js'

export interface ProductRepository{
    create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
    list_products(): Promise<Product[]>    
    findById(product_id: String): Promise<Product | null>
}