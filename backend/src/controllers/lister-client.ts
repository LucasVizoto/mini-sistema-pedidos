import { makeListClient } from '@/service/factories/make-list-client.js'
import type {Request, Response} from 'express'

export async function listerClient(request: Request, reply: Response) {
    // declare client in outer scope so it's available after the try/catch
    let clients: unknown

    try{
        const listerClient = makeListClient()

        clients = await listerClient.execute()

    } catch (err){
        if(err instanceof Error){
            return reply
            .status(500)
            .send({
                message: err.message
            })
        }
        throw err
    }
    
    return reply
        .status(200)
        .send({
            data: clients,
        })
}