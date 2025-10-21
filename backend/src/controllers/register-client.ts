import { makeCreateClient } from '@/service/factories/make-create-client.js'
import type {Request, Response} from 'express'
import {z} from "zod"

export async function registerClient(request: Request, reply: Response) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
    })

    const {name, email} = registerBodySchema.parse(request.body)

    // declare client in outer scope so it's available after the try/catch
    let client: unknown

    try{
        const createClientService = makeCreateClient()

        client = await createClientService.execute({
            name, 
            email,
        })

    } catch (err){
        if(err instanceof Error){
            return reply
            .status(409)
            .send({
                message: err.message
            })
        }
        throw err
    }
    
    return reply
        .status(201)
        .send({
            message: 'Client has been created succesfuly!',
            client,
        })
}