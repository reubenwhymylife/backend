"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const responseHandler = (req, res, next) => {
    res.success = (response) => {
        const { message, data } = response;
        res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: message,
            data: data,
        });
    };
    res.error = (response) => {
        const { message, reason, data } = response;
        res.json({
            msg: message,
            reason: reason,
            data: data,
        });
    };
    next();
};
exports.responseHandler = responseHandler;
