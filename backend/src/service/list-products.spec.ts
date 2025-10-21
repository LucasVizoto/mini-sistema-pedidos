import { describe, expect, it, beforeEach } from "vitest";
import {ListProductService } from "./list-products.js"
import { InMemoryProductRepository } from "@/repositories/in-memory/in-memory-product.js";

let productRepository: InMemoryProductRepository
let sut: ListProductService

describe('List Product Service', () =>{
    beforeEach(()=>{
        productRepository = new InMemoryProductRepository()
        sut = new ListProductService(productRepository)
    })

    it('should be able to list products', async () =>{
        await productRepository.create({
            name:"teste1",
            price: 18.5
        })
        await productRepository.create({
            name:"teste2",
            price: 20.2
        })
        await productRepository.create({
            name:"teste3",
            price: 21.3
        })
        
        const {products} = await sut.execute()

        expect(products.length).toEqual(3)
    })
})