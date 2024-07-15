"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(errorParams) {
        const { code, message, logging, reason, data } = errorParams;
        super(message);
        this._statusCode = code || http_status_codes_1.StatusCodes.BAD_REQUEST;
        this._ctx = reason !== undefined ? reason : "";
        this._logging = logging || false;
        this._data = data || [] || {};
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    get errors() {
        return { message: this.message, reason: this._ctx, data: this._data };
    }
    get statusCode() {
        return this._statusCode;
    }
    get ctx() {
        return this._ctx;
    }
    get data() {
        return this._data;
    }
    get logging() {
        return this._logging;
    }
}
exports.CustomError = CustomError;
