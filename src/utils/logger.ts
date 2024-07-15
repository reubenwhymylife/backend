import winston from "winston";

// Define the Winston logger configuration
// Define custom log formats
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }), // Handle exceptions with stack trace
  winston.format.splat(), // Interpolate variables
  winston.format.json() // JSON format
);

// Create transports
const consoleTransport = new winston.transports.Console({
  format: logFormat,
});

const errorFileTransport = new winston.transports.File({
  filename: "error.log",
  level: "error",
  format: logFormat,
});

const combinedFileTransport = new winston.transports.File({
  filename: "combined.log",
  format: logFormat,
});
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [consoleTransport, errorFileTransport, combinedFileTransport],
  exitOnError: false, // Continue logging even after unhandled exceptions
});

export default logger;
