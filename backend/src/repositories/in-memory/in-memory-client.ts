import type { Prisma, Client } from "generated/prisma/index.js";
import type { ClientRepository } from "../client-repository.js";
import { randomUUID } from "node:crypto";

export class InMemoryClientRepository implements ClientRepository{
    
    public items: Client[] = []
    
    async create(data: Prisma.ClientUncheckedCreateInput): Promise<Client> {
        const client = {
            id: data.id || randomUUID(),
            name: data.name,
            email: data.email
        }
        
        this.items.push(client)
        return client
        
    }
    
    async list_clientes(): Promise<Client[]> {
        return this.items
    }

    async findById(client_id: string) {
        const client = this.items.find((item) => item.id == client_id)

        if(!client){
            return null
        }

        return client
    }

}