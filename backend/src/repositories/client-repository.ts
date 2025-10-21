import type { Client, Prisma } from 'generated/prisma/client.js'

export interface ClientRepository{
    create(data: Prisma.ClientUncheckedCreateInput): Promise<Client>
    list_clientes(): Promise<Client[]>
    findById(client_id: string): Promise<Client|null>
}