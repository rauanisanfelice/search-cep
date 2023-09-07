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
      description: 'Realiza busca de usuários',
    },
    {
      name: 'CEP',
      description: 'Realiza busca de CEP',
    },
  ],
}

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(async () => {
  await import('../routes.js')
})
