import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository.js";
import { CreateProductService } from "../create-product.js";

export function makeCreateProduct(){
    const productRepository = new PrismaProductRepository()
    const service = new CreateProductService(productRepository)

    return service
}