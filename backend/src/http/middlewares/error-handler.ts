import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { env } from '@/env/index.js';


export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // 1. Tratar erros do Zod
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation error.',
      issues: err.format(),
    });
  }

  // 2. Logar o erro em desenvolvimento
  if (env.NODE_ENV !== 'production') {
    console.error(err);
  } else {
    // TODO: Aqui você logaria em uma ferramenta externa (Datadog, Sentry, etc.)
  }

  // 3. Resposta genérica para outros erros
  return res.status(500).send({ message: 'Internal Server Error' });
}