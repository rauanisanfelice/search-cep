import { Router } from 'express'

import Usuario from './controllers/UsuarioController.mjs'

const routes = new Router()

routes.get('/usuarios', Usuario.get_all)
routes.get('/usuarios/:id', Usuario.get_one)

routes.post('/usuarios', Usuario.insert)
routes.delete('/usuarios/:id', Usuario.delete)
routes.patch('/usuarios/:id', Usuario.update)

export default routes
