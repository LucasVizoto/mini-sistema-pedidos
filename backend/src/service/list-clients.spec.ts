import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client.js";
import { ListClientService } from "./list-clients.js";

let clientRepository: InMemoryClientRepository
let sut: ListClientService

describe('List Client Service', () =>{
    beforeEach(()=>{
        clientRepository = new InMemoryClientRepository()
        sut = new ListClientService(clientRepository)
    })

    it('should be able to list products', async () =>{
        await clientRepository.create({
            name:"teste1",
            email: 'teste@email.com'
        })
        await clientRepository.create({
            name:"teste2",
            email: 'teste2@email.com'
        })
        await clientRepository.create({
            name:"teste3",
            email: 'teste3@email.com'
        })
        
        const {clients} = await sut.execute()

        expect(clients.length).toEqual(3)
    })
})