import express from 'express'
import router from '@/http/routes.js'
import { env } from './env/index.js';

const port = env.PORT 


export const app = express()

// Aqui estou registrando minhas Blueprints das rotas criadas
app.use(router)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
