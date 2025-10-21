import type { Prisma, Product } from "generated/prisma/index.js";
import type { ProductRepository } from "../product-repository.js";
import { randomUUID } from "node:crypto";

export class InMemoryProductRepository implements ProductRepository{
    
    public items: Product[] = []
    
    async create(data: Prisma.ProductUncheckedCreateInput){
        const product = {
            id: randomUUID(),
            name: data.name as string,
            price: data.price as number
        }

        this.items.push(product)
        return product
    }

    list_products(): Promise<Product[]> {
        return Promise.resolve(this.items)
    }

    async findById(product_id: string){
        const product = this.items.find((item) => item.id == product_id)

        if(!product){
            return null
        }

        return product
    }

}