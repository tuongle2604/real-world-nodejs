const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');

const logdir = ROOT_DIR + '/logs/';

if (!fs.existsSync(logdir)) {
  fs.mkdir(logdir);
}

const format = winston.format.combine(
  winston.format.printf(({ message, level }) => `${level.toUpperCase()}: ` + message),
  winston.format.colorize({ all: true })
);

const infoLogger = winston.createLogger({
  level: 'info',
  format: format,
  transports: [
    new winston.transports.Console()
  ]
});

const warningLogger = winston.createLogger({
  level: 'warn',
  format: format,
  transports: [
    new winston.transports.Console()
  ]
});

const errorLogger = winston.createLogger({
  level: 'error',
  format: format,
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: logdir + 'error',
      datePattern: 'YYYY-MM-DD',
      level : 'error',
      maxFiles: '7d'
    })
  ]
});

const info = (message) => infoLogger.info(message);
const warning = (message) => warningLogger.warn(message);
const error = (message) => errorLogger.error(message);

module.exports = {
  info,
  warning,
  error
}
