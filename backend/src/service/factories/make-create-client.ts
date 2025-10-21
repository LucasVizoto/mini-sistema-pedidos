import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository.js";
import { CreateClientService } from "../create-client.js";

export function makeCreateClient(){
    const clientRepository = new PrismaClientRepository()
    const service = new CreateClientService(clientRepository)

    return service
}