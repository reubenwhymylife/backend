"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const payment_controller_1 = require("./payment.controller");
const authorization_middleware_1 = require("../../middleware/authorization.middleware");
const authentication_middleware_1 = require("../../middleware/authentication.middleware");
// router.post("/payment", payment);
router.get("/get-payment", authentication_middleware_1.authenticateSessionMiddleware, payment_controller_1.getUserPaymentList);
router.post("/payment", authentication_middleware_1.authenticateSessionMiddleware, payment_controller_1.paystack);
router.post("/payment/webhook", payment_controller_1.paymentWebhook);
router.get("/get-payment-list", authorization_middleware_1.Authorization, authentication_middleware_1.authenticateSessionMiddleware, payment_controller_1.getPayments);
router.get("/get-user-payment", authorization_middleware_1.Authorization, authentication_middleware_1.authenticateSessionMiddleware, payment_controller_1.getSinglePayment);
router.delete("/delete-payment", authorization_middleware_1.Authorization, payment_controller_1.deletePayment);
exports.default = {
    router: router,
    path: "/user",
};
