# search-cep

## Introdução

Bem-vindo à documentação da API de Busca de CEP. Esta API permite que você gerencie informações de usuários e busque CEPs.

> Base URL: https:/.example.com

### Endpoints

#### Usuários

#### 1. Criar um novo usuário

- **Rota**: `POST /usuarios`
- **Descrição**: Crie um novo usuário com as informações fornecidas.
- **Parâmetros de entrada**:
  - `nome` (string, obrigatório) - O nome do usuário.
  - `email` (string, obrigatório) - O endereço de e-mail do usuário.
  - `senha` (string, obrigatório) - A senha do usuário.
- **Exemplo de solicitação**:

```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

- **Resposta bem-sucedida**:
  - **Código**: 201 Created
  - **Exemplo de resposta**:

```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com"
}
```

#### 2. Obter informações de um usuário

- **Rota**: `GET /usuarios/{id}`
- **Descrição**: Obtenha informações detalhadas sobre um usuário pelo ID.
- **Parâmetros de entrada**:
  - `id` (integer, obrigatório) - O ID único do usuário.
- **Exemplo de solicitação**: `GET /usuarios/1`
- **Resposta bem-sucedida**:
  - **Código**: 200 OK
  - **Exemplo de resposta**:

```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com"
}
```

#### 3. Obter informações de todos os usuário

- **Rota**: `GET /usuarios/`
- **Descrição**: Obtenha informações detalhadas de todos os usuários.
- **Exemplo de solicitação**: `GET /usuarios/`
- **Resposta bem-sucedida**:
  - **Código**: 200 OK
  - **Exemplo de resposta**:

```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com"
  },
    {
    "id": 2,
    "nome": "Maria Nunes",
    "email": "maria@example.com"
  }
]
```

#### 4. Atualizar informações de um usuário

- **Rota**: `PUT /usuarios/{id}`
- **Descrição**: Atualize as informações de um usuário existente.
- **Parâmetros de entrada**:
  - `id` (integer, obrigatório) - O ID único do usuário.
  - `nome` (string, opcional) - O novo nome do usuário.
  - `email` (string, opcional) - O novo endereço de e-mail do usuário.
- **Exemplo de solicitação**:

```json
{
  "nome": "João da Silva"
}
```

- **Resposta bem-sucedida**:
  - **Código**: 204 No Content

#### 5. Excluir um usuário

- **Rota**: `DELETE /usuarios/{id}`
- **Descrição**: Exclua um usuário pelo ID.
- **Parâmetros de entrada**:
  - `id` (integer, obrigatório) - O ID único do usuário.
- **Exemplo de solicitação**: `DELETE /usuarios/1`
- **Resposta bem-sucedida**:
  - **Código**: 204 No Content

### Busca de CEP

#### 1. Buscar informações de CEP

- **Rota**: `GET /cep/{cep}`
- **Descrição**: Busque informações detalhadas de um CEP.
- **Parâmetros de entrada**:
  - `cep` (string, obrigatório) - O CEP desejado.
- **Exemplo de solicitação**: `GET /cep/12345-678`
- **Resposta bem-sucedida**:
  - **Código**: 200 OK
  - **Exemplo de resposta**:

```json
{
  "cep": "12345678",
  "state": "SP",
  "city": "São José do Rio Preto",
  "neighborhood": "Bairro Teste",
  "street": "Rua Teste",
  "service": "correios"
}
```

### Health Check

- **Rota**: `GET /health`
- **Descrição**: Esta rota é usada para verificar o status de saúde do servidor. Ela retorna uma resposta simples indicando que o servidor está em funcionamento.
- **Resposta bem-sucedida**:
  - **Código**: 200 OK
  - **Exemplo de resposta**:

```json
{
  "uptime": "1420.0",
  "message": "OK",
  "timestamp": "2023-01-01T00:00:00.000",
}
```

#### Erros

A API pode retornar os seguintes códigos de erro:

- 400 Bad Request: Solicitação inválida.
- 404 Not Found: Recurso não encontrado.
- 409 Conflict: Recurso já cadastrado.
- 500 Internal Server Error: Erro interno do servidor.

## Intruções para uso

1. Configuração do ambiente;
2. Testes;

### Configuração do ambiente

Instalando dependências

```shell
sudo apt install -y docker docker-compose
```

Copie o arquivos "*.dist" e realize o preenchimento deles.

```shell
make copy-dist
```

Para gerar o aquivo do Swagger:

```shell
make swagger
```

### Testes

```shell
make test
```

```shell
make coverage
```

## Motivo da escolha da Stack

- Familiariadade com a linguagem NodeJs;
- Simplicidade para codificação;
- Comunidade muito ativa;

Realizei uma pesquisa breve e pude encontrar um ponto interessante:

> Outra vantagem é o desempenho. Node.js utiliza a arquitetura de loop de eventos não bloqueantes, o que o torna altamente eficiente para manipular muitas conexões simultâneas, tornando-o uma excelente escolha para aplicativos de alto tráfego e tempo real, como chats, jogos online e streaming de dados. Java, por outro lado, exige mais recursos para lidar com tarefas concorrentes, tornando-o menos eficiente em algumas situações.
