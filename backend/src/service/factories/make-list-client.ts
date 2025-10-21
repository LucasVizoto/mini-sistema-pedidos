import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository.js";
import { ListClientService } from "../list-clients.js";

export function makeListClient(){
    const clientRepository = new PrismaClientRepository()
    const service = new ListClientService(clientRepository)

    return service
}