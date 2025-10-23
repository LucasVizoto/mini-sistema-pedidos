import { makeUpdateOrderStatus } from '@/service/factories/make-update-status-order.js';
import type {Request, Response} from 'express'
import {z, ZodError} from "zod"

export async function updaterStatusOrder(request: Request, reply: Response) {
    
    const paramsSchema = z.object({
        orderId: z.string(), 
    });
    
    const bodySchema = z.object({
        newStatus: z.string(),
    })

    let order: unknown;
    try{
        const { orderId: order_id } = paramsSchema.parse(request.params);
        const { newStatus } = bodySchema.parse(request.body);

        const updateOrderStatusService = makeUpdateOrderStatus();


        order = await updateOrderStatusService.execute({
            orderId: order_id,
            newStatus: newStatus,
        });

    } catch (err) {
        if (err instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Erro de validação.', errors: err.flatten().fieldErrors });
        }

        if (err instanceof Error) {
            if (err.message.includes('not found') || err.message.includes('Pedido não encontrado')) {
                return reply.status(404).send({ message: 'Pedido não encontrado.' });
            }
        }
        throw err;
    }

    // 7. Resposta de SUCESSO correta (200 OK)
    return reply.status(200).send({
        message: 'Status do pedido atualizado com sucesso!',
        data: order,
    });
}