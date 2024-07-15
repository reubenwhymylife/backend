"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_HOST_STAGING = exports.NODE_ENV = exports.DB_PASS = exports.DB_USER = exports.DB_NAME = exports.PORT = exports.isDev = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const error_moddleware_1 = require("../middleware/error.moddleware");
const CustomReasons_1 = require("./CustomReasons");
dotenv_1.default.config();
exports.isDev = process.env.NODE_ENV !== "production";
const requiredEnvs = [
    // "DB_NAME",
    // "DB_USER",
    // "DB_PASS",
    "NODE_ENV",
    // "DB_HOST_STAGING",
];
const envs = requiredEnvs.reduce((acc, key) => {
    acc[key] = process.env[key];
    return acc;
}, {});
const missingEnvs = requiredEnvs.filter((key) => !envs[key]);
if (missingEnvs.length > 0 || !process.env.PORT) {
    console.error("ENV Error, the following ENV variables are not set:");
    missingEnvs.push("PORT");
    console.table(missingEnvs);
    throw new error_moddleware_1.CustomError({
        message: CustomReasons_1.Reasons.customedReasons.ENV_NOT_FOUND,
        code: 500,
    });
}
exports.PORT = Number(process.env.PORT);
exports.DB_NAME = envs.DB_NAME, exports.DB_USER = envs.DB_USER, exports.DB_PASS = envs.DB_PASS, exports.NODE_ENV = envs.NODE_ENV, exports.DB_HOST_STAGING = envs.DB_HOST_STAGING;
