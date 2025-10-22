import express from 'express'
import router from '@/http/routes.js'
import { env } from './env/index.js';
import { errorHandler } from './http/middlewares/error-handler.js';

const port = env.PORT 


export const app = express()
app.use(express.json());

// Aqui estou registrando minhas Blueprints das rotas criadas

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
