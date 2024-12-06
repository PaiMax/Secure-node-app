// logger.js
const winston = require('winston');

// Create a winston logger instance
const logger = winston.createLogger({
  level: 'info', // Set the default logging level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logs to the console
    new winston.transports.File({ filename: 'application.log' }) // Logs to a file
  ],
});

// Export the logger so it can be used in other files
module.exports = logger;
