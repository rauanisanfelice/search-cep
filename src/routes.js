import { Router } from 'express'

import Usuario from './controllers/UsuarioController.mjs'

const routes = new Router()

routes.get('/usuarios', Usuario.index)

export default routes
