import app from './app.mjs'
import logger from './middlewares/logger.mjs'

app.listen(3000, () => {
  logger.info('Server runing')
  console.log('Servidor está rodando na porta: 3000')
})
