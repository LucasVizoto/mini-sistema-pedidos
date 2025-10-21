import type { Prisma, Client } from "generated/prisma/index.js";
import type { ClientRepository } from "../client-repository.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaClientRepository implements ClientRepository{
    async create(data: Prisma.ClientUncheckedCreateInput): Promise<Client> {
        const client = await prisma.client.create({
            data,
        })
        
        return client
    }
    
    async list_clientes(): Promise<Client[]> {
        const clients = await prisma.client.findMany()
        
        return clients
    }


    async findById(client_id: string){
       const client = await prisma.client.findUnique({
            where:{
                id: client_id,
            }
        })

        return client
    }

}