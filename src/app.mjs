import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import logger from './middlewares/logger.mjs'
import routes from './routes.js'
import './database/index.mjs'
import swaggerUi from 'swagger-ui-express'

import { readFileSync } from 'fs'
const swaggerFile = JSON.parse(readFileSync('./src/swagger_output.json'))

class App {
  constructor() {
    this.server = express()

    this.cors()
    this.middlewares()
    this.routes()
  }

  cors() {
    this.server.use(cors())
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(
      morgan(
        '":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"',
        { stream: logger.stream }
      )
    )

    this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
