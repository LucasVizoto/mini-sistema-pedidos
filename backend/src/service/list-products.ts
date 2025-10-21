import type { ProductRepository } from "@/repositories/product-repository.js";
import type { Product } from "generated/prisma/index.js";

interface ListProductServiceResponse{
    products: Product[]
}


export class ListProductService{
    constructor(private productRepository: ProductRepository){}

    async execute(): Promise<ListProductServiceResponse>{
       const products = await this.productRepository.list_products()

        return{
            products,
        }
    }
}