import type { ProductRepository } from "@/repositories/product-repository.js";
import type { Product } from "generated/prisma/index.js";

interface CreateProductServiceRequest{
    name: string,
    price: number
}

interface CreateProductServiceResponse{
    product: Product
}


export class CreateProductService{
    constructor(private productRepository: ProductRepository){}

    async execute({name, price}:CreateProductServiceRequest): Promise<CreateProductServiceResponse>{
        const product = await this.productRepository.create({
            name,
            price
        })

        return{
            product,
        }
    }
}