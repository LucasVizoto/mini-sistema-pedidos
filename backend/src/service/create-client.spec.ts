import { describe, expect, it, beforeEach } from "vitest";
import { CreateProductService } from "./create-product.js";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client.js";
import { CreateClientService } from "./create-client.js";

let clientRepository: InMemoryClientRepository
let sut: CreateClientService

describe('Create Product Service', () =>{
    beforeEach(()=>{
        clientRepository = new InMemoryClientRepository()
        sut = new CreateClientService(clientRepository)
    })

    it('should be able to create product', async () =>{
        const {client} = await sut.execute({
            name:'Cliente Teste',
            email: 'email@teste.com'
        })

        expect(client.id).toEqual(expect.any(String))
        expect(client.name).toBe('Cliente Teste');
    })
})