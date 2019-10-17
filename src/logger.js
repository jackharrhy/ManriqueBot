const winston = require('winston');

const logFolder = './log/';

module.exports = winston.createLogger({
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
    }),
    new winston.transports.Console(),
  ]
});
