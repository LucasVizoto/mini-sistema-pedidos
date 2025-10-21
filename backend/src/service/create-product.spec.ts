import { describe, expect, it, beforeEach } from "vitest";
import { CreateProductService } from "./create-product.js";
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product.js";

let productRepository: InMemoryProductRepository
let sut: CreateProductService

describe('Create Product Service', () =>{
    beforeEach(()=>{
        productRepository = new InMemoryProductRepository()
        sut = new CreateProductService(productRepository)
    })

    it('should be able to create product', async () =>{
        const {product} = await sut.execute({
            name:'Produto Teste',
            price: 18.5
        })

        expect(product.id).toEqual(expect.any(String))
        expect(product.name).toBe('Produto Teste');
    })
})