import mongoose from 'mongoose'
import logger from '../middlewares/logger.mjs'

import 'dotenv/config'

const MongoDBService = async () => {
  try {
    const connectionString = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 75000,
      family: 4,
    }

    await mongoose.connect(connectionString, options)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }

  const dbConnection = mongoose.connection
  dbConnection.once('open', (connectionString) => {
    logger.info(`Database connected: ${connectionString}`)
  })

  dbConnection.on('error', (err) => {
    logger.error(`connection error: ${err}`)
  })
}

export default MongoDBService
