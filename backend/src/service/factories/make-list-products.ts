import { PrismaProductRepository } from "@/repositories/prisma/prisma-product-repository.js";
import { ListProductService } from "../list-products.js";

export function makeListProduct(){
    const productRepository = new PrismaProductRepository()
    const service = new ListProductService(productRepository)

    return service
}