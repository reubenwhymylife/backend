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
exports.salesControler = void 0;
const Sales_service_1 = require("./Sales.service");
const salesControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    const salesPayload = {
        businessId: req.body.businessId,
        cart: req.body.cart,
        totalPrice: req.body.totalPrice,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        transactionDate: req.body.transactionDate,
        paymentMethod: req.body.paymentMethod,
    };
    const response = yield (0, Sales_service_1.salesService)(res, salesPayload, sessionId !== null && sessionId !== void 0 ? sessionId : 0);
    return res.status(200).success({
        message: "sales created successfully",
        data: [],
    });
});
exports.salesControler = salesControler;
