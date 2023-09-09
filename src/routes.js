import { Router } from 'express'

import Usuario from './controllers/UsuarioController.mjs'
import HealthCheck from './controllers/HealthCheck.mjs'
import EnderecoController from './controllers/EnderecoController.mjs'

const routes = new Router()

routes.get('/usuarios', Usuario.get_all);
routes.get('/usuarios/:id', Usuario.get_one);

routes.post('/usuarios', Usuario.insert);
routes.delete('/usuarios/:id', Usuario.delete);
routes.patch('/usuarios/:id', Usuario.update);

routes.get('/health', HealthCheck.get);

routes.get('/endereco/:cep', EnderecoController.get);

export default routes
