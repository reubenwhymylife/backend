"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_moddleware_1 = require("./error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof error_moddleware_1.CustomError) {
        const { statusCode, message, logging, errors } = err;
        if (logging) {
            console.error(JSON.stringify({
                code: statusCode,
                errors: errors,
                stack: err.stack,
            }));
        }
        return res.status(statusCode).send(errors);
    }
    // logToSlack(`${err} URL:${err}`, false);
    console.log(err);
    return res
        .status(500)
        .send({ errors: [{ message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR }] });
});
exports.errorHandler = errorHandler;
