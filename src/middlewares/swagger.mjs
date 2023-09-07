import swaggerAutogen from 'swagger-autogen'

const outputFile = '../swagger_output.json'
const endpointsFiles = ['../routes.js']

const options = {
  openapi: false,
  language: 'en-US',
  disableLogs: false,
}

const doc = {
  info: {
    version: '1.0.0',
    title: 'Search CEP API',
    description: 'Search CEP API',
    contact: {
      name: 'Rauan Ishida Sanfelice',
      email: 'rauan.sanfelice@gmail.com',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/rauanisanfelice/search-cep/blob/main/LICENSE',
    },
  },
  tags: [
    {
      name: 'User',
      description: 'Realiza busca de usuários.',
    },
    {
      name: 'CEP',
      description: 'Realiza busca de CEP.',
    },
    {
      name: 'Health',
      description: 'Verifica saúde da aplicação.',
    },
  ],
  definitions: {
    User: {
      nome: "João da Silva",
      email: "joao@example.com"

    },
    ListUser: [
      {
        nome: "João da Silva",
        email: "joao@example.com"
      },
      {
        nome: "Maria Nunes",
        email: "maria@example.com"
      }
    ],
    AddUser: {
      $nome: "João da Silva",
      $email: "joao@example.com",
      $senha: "fake-senha",
    },
    UpdateUser: {
      $nome: "João da Silva",
    },
    HealthCheck: {
      uptime: '1420.0',
      message: 'OK',
      timestamp: '2023-01-01T00:00:00.000Z'
    },
    CEP: {
      cep: "12345678",
      state: "SP",
      city: "São José do Rio Preto",
      neighborhood: "Bairro Teste",
      street: "Rua Teste",
      service: "correios"
    }
  }
}

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(async () => {
  await import('../routes.js')
})
