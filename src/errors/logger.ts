import winston from 'winston';


const options = {
  console: {
    handleExceptions: true,
    json: false,
    colorize: true
  },
  file: {
    filename: 'error.log',
    level: 'error'
  }
};
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console(options.console),
  ],
});

export default logger;