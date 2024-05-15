// logger.js
import * as winston from 'winston';

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `# ${timestamp} [${level}] ${message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.File({
      filename: 'files/markodwn-converter-error.log',
      level: 'error',
    }),
  ],
});
export default logger;
