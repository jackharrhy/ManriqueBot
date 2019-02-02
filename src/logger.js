const winston = require('winston');

const logFolder = './log/';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: `${logFolder}/error.log`,
      level: 'error'
    }),
    new winston.transports.File({
      filename: `${logFolder}/combined.log`,
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = () => {
  return {
    info: (type, ...args) => {
      if (typeof type !== 'string') {
        throw new Error('Logging requires a initial type arg, as a string');
      }
      logger.info(`${type}:`, args);
    }
  }
};
