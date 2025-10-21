import type { ClientRepository } from "@/repositories/client-repository.js";
import type { Client } from "generated/prisma/index.js";


interface CreateClientServiceRequest{
    name: string,
    email: string
}

interface CreateClientServiceResponse{
    client: Client
}


export class CreateClientService{
    constructor(private clientRepository: ClientRepository){}

    async execute({name, email}:CreateClientServiceRequest): Promise<CreateClientServiceResponse>{
        const client = await this.clientRepository.create({
            name,
            email
        })

        return{
            client,
        }
    }
}