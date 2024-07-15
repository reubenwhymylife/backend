"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// Define the Winston logger configuration
// Define custom log formats
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), // Handle exceptions with stack trace
winston_1.default.format.splat(), // Interpolate variables
winston_1.default.format.json() // JSON format
);
// Create transports
const consoleTransport = new winston_1.default.transports.Console({
    format: logFormat,
});
const errorFileTransport = new winston_1.default.transports.File({
    filename: "error.log",
    level: "error",
    format: logFormat,
});
const combinedFileTransport = new winston_1.default.transports.File({
    filename: "combined.log",
    format: logFormat,
});
const logger = winston_1.default.createLogger({
    level: "info",
    format: logFormat,
    transports: [consoleTransport, errorFileTransport, combinedFileTransport],
    exitOnError: false, // Continue logging even after unhandled exceptions
});
exports.default = logger;
