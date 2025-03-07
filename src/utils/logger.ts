import fs from "fs";
import path from "path";
import winston from "winston";

// Define log directory
const logDir = "logs";

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, "app.log") }),
    new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
  ],
});

export default logger;
