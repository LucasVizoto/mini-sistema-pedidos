
# 🦎 Mini Gerenciador de Pedidos Oticket

Este teste prático foi desenvolvido visando mostrar a estrutura de desenvolvimento tanto frontend, como também backend para o projeto sugerido.

### Cenário do Projeto:
O desafio consiste no desenvolvimento de um mini sistema de pedidos.

O Backend foi desenvolvido em Node.js + Express , criando uma API REST para gerenciar as seguintes entidades:
```
* Cliente (id, nome, email) 
* Produto (id, nome, preco)
* Pedido (id, cliente_id, status, data)
```

A arquitetura do Backend foi estruturada seguindo o padrão de controllers e services. Adicionalmente, foi aplicado o padrão Factory para a instanciação e conexão dos componentes. Também foi implementado o padrão Repository (com uma estratégia in-memory) para desacoplar a lógica de negócio das classes responsáveis pelo acesso ao banco de dados.

Foi utilizado o banco de dados PostgreSQL , com as migrations gerenciadas pelo Prisma. A instância do banco de dados é executada a partir de uma imagem Docker.

O Frontend foi construído com Next.js e TailwindCSS para consumir a API. Ele inclui páginas para:
```
* Login (fake) 
* Listagem e cadastro de Clientes
* Listagem e cadastro de Produtos
* Listagem e criação de Pedidos (selecionando cliente e produtos)
```
## ⚙️ Rodando localmente

#### Clone o projeto


```
git clone https://github.com/LucasVizoto/mini-sistema-pedidos.git
```


### Configurações do Backend
Para configurar e rodar a API localmente, é necessário primeiro acessar a pasta do backend:
```
cd ./backend
```
#### 1. Gere o banco de dados em sua máquina

Para isso, é requisito mínimo que o Docker esteja devidamente instalado localmente.


```
docker compose up -d

```

#### 2. Instale as dependências

```
npm i
```


#### 4. Rode as Migrations para criação das tabelas no banco

```
npx prisma migrate dev
```

#### 5. Configure um arquivo .env seguindo os campos presentes em .env.example
Caso a variável `PORT` não seja definida, o servidor será inicializado na porta padrão 3333.
```
NODE_ENV=
DATABASE_URL=
PORT= 
```

#### 6. Faça o build do projeto
```
npm run build
```

#### 7. Execute o projeto
```
npm run dev
```

### Configurações do Frontend

Após iniciar a API, o recomendado é abrir um novo terminal (mantendo o backend rodando) e acessar a pasta "/frontend":

```
cd ../frontend
```
#### 1. Instale as dependências

```
npm i
```

#### 2. Execute o Projeto

```
npm run dev
```
**Observação:** Caso seja realizada a mudança da porta no `.env` do backend, é necessário realizar a mudança correspondente no arquivo `/api/api.ts` do frontend, pois este está apontando para `http://localhost:3333`.

```
const api = axios.create({
    baseURL: 'http://localhost:3333'
})
```

## ☁️Deploy

Além da metodologia de acesso local descrita anteriormente, é possível acessar a aplicação também através do seguinte link:

🔗 https://pedidos.lucasvizoto.com

Caso deseje utilizar a API através do link acima, basta inserir ao final `/api` e, em sequência, as rotas que deseja acessar.

## 📖 Documentação da API

#### 
CLIENTES
####
- Criar um novo cliente

```
  POST /clientes
```

#### Body da Requisição:
```
{
    "name": "Lucas",
    "email": "email@teste.com"
}
```


#### Resposta esperada: 
```
{
    "message": "Client has been created successfully!",
    "data": {
        "client": {
            "id": "de109dc9-a11e-46ee-a63e-cb3fbbdeaafd",
            "name": "Lucas",
            "email": "email@teste.com"
        }
    }
}

```

---
####
- Listar todos os clientes

```
  GET /clientes
```


#### Resposta esperada: 
```
{
    "data": {
        "clients": [
            {
                "id": "de109dc9-a11e-46ee-a63e-cb3fbbdeaafd",
                "name": "Lucas",
                "email": "email@teste.com"
            }
        ]
    }
}
```
---

#### 
PRODUTOS
####
- Criar um novo produto

```
  POST /produtos
```

#### Body da Requisição:
```
{
    "name": "Garrafa",
    "price": 18.5
}
```


#### Resposta esperada: 
```
{
    "message": "Product has been created successfully!",
    "data": {
        "product": {
            "id": "2cfdb103-183e-4bde-8e68-2c281fe248fe",
            "name": "Garrafa",
            "price": 18.5
        }
    }
}

```

---
####
- Listar todos os produtos

```
  GET /produtos
```


#### Resposta esperada: 
```
{
    "data": {
        "products": [
            {
                "id": "2cfdb103-183e-4bde-8e68-2c281fe248fe",
                "name": "Lucas",
                "price": 18.5
            }
        ]
    }
}
```
---
####
PEDIDOS
####
- Criar um novo pedido

```
  POST /pedidos
```

#### Body da Requisição:
```
{
    "clientId": "40f67d9b-000f-48d4-b08a-2a23394bcc56",
    "products": [
        {"productId": "5d2d732b-267a-448f-9748-fc262db3e514", "quantity": 2},
        {"productId": "27c5e917-86f3-46fa-bb67-768d1f6202a8", "quantity": 2}
    ]
}
```


#### Resposta esperada: 
```
{
    "message": "Order has been created successfully!",
    "data": {
        "order": {
            "id": "209446da-0067-4a67-b6c4-b68830406929",
            "status": "PENDENTE",
            "date": "2025-10-23T21:05:00.273Z",
            "client_id": "40f67d9b-000f-48d4-b08a-2a23394bcc56"
        }
    }
}

```
---
####
- Listar todos os pedidos

```
  GET /pedidos
```


#### Resposta esperada: 
```
{
    "data": {
        "orders": [
            {
                "id": "1422efac-7b98-4c5a-be6c-8dfcedad99c3",
                "status": "PENDENTE",
                "date": "2025-10-22T00:31:21.600Z",
                "client_id": "40f67d9b-000f-48d4-b08a-2a23394bcc56",
                "client": {
                    "id": "40f67d9b-000f-48d4-b08a-2a23394bcc56",
                    "name": "Lucas",
                    "email": "email@teste.com"
                },
                "products": [
                    {
                        "id": "27c5e917-86f3-46fa-bb67-768d1f6202a8",
                        "name": "Garrafa",
                        "price": 20.22,
                        "quantity": 2
                    },
                    {
                        "id": "5d2d732b-267a-448f-9748-fc262db3e514",
                        "name": "Mochila",
                        "price": 18.5,
                        "quantity": 2
                    }
                ],
                "amount": 77.44
            }
        ]
    }
}

```
---
####

- Alteração do status do pedido

```
  PATCH /pedidos/:orderId
```
#### Path Variables:
| Campo   | Tipo | Descrição|Exemplo|
| :---------- | :--------- | :---------- |:---------------------------------- |
| `orderId` | `string` | **Obrigatório**. ID do pedido a ser pago| 688e72a6d8002015f90814fe |

#### Body da Requisição:
```
{
    "newStatus": "PAGO"
}
```

#### Resposta esperada: 
```
{
    "message": "Status do pedido atualizado com sucesso!",
    "data": {
        "order": {
            "id": "64f743b8-1209-4cf9-a8f0-dd8e8b740d21",
            "status": "PAGO",
            "date": "2025-10-22T00:33:38.603Z",
            "client_id": "40f67d9b-000f-48d4-b08a-2a23394bcc56"
        }
    }
}
```

## ⚗️ Rodando os testes

Foram adicionados testes unitários nas Services do backend, utilizando a biblioteca Vitest. Para rodar todos os testes juntos, basta utilizar o comando abaixo estando na pasta `/backend`.
```
  npm run test
```
## 🔎 Onde me encontrar

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucasvizoto/)

[![e-mail](https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lucavizoto364@gmail.com)
