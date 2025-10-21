import type { ClientRepository } from "@/repositories/client-repository.js";
import type { Client } from "generated/prisma/index.js";

interface ListClientServiceResponse{
    clients: Client[]
}


export class ListClientService{
    constructor(private clientRepository: ClientRepository){}

    async execute(): Promise<ListClientServiceResponse>{
       const clients = await this.clientRepository.list_clientes()

        return{
            clients,
        }
    }
}