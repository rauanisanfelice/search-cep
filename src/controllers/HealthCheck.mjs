class HealthCheck {
  async get(req, res) {
    /*
    #swagger.tags = ['Health']
    #swagger.summary = 'Analise a saúde da aplicação'
    #swagger.description = 'Rota para consultar a saúde da aplicação.'
    #swagger.responses[200] = {
      schema: { $ref: "#/definitions/HealthCheck" },
      description: 'Usuário(s) localizados com sucesso.',
    }
    #swagger.responses[503] = {
      description: 'Servidor indisponível.',
    }
    */
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: ''
    };
    try {
      const dataHoraAtual = new Date();
      healthcheck.timestamp = dataHoraAtual.toISOString();
      res.status(200).send(healthcheck);
    } catch (error) {
      healthcheck.message = error;
      res.status(503).send(healthcheck);
    }
  }
}

export default new HealthCheck()
