import type { Prisma } from "generated/prisma/index.js";
import { prisma } from "@/lib/prisma.js";
import type { ProductRepository } from "../product-repository.js";

export class PrismaProductRepository implements ProductRepository{
    async create(data: Prisma.ProductUncheckedCreateInput){
        const product = await prisma.product.create({
            data,
        })
        
        return product
    }
    
    async list_products() {
        const products = await prisma.product.findMany()
        
        return products
    }


    async findById(product_id: string){
       const product = await prisma.product.findUnique({
            where:{
                id: product_id,
            }
        })

        return product
    }

}