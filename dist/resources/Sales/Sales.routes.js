"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Sales_controler_1 = require("./Sales.controler");
const authentication_middleware_1 = require("../../middleware/authentication.middleware");
const saleRouter = express_1.default.Router();
saleRouter.post("/sales/create", authentication_middleware_1.authenticateSessionMiddleware, Sales_controler_1.salesControler);
exports.default = saleRouter;
