import winston from 'winston'
import fs from 'fs'

const logDir = 'logs'
const filename = `${logDir}/api.log`

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
}

const logger = winston.createLogger({
  levels: logLevels,
  level: 'info',
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) =>
        `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.File({ filename })],
  exitOnError: false,
})

logger.stream = {
  write: (message) => {
    logger.info(message)
  },
}

export default logger
