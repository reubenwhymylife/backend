"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentWebhook = exports.paystack = exports.getPayments = exports.deletePayment = exports.getSinglePayment = exports.getUserPaymentList = exports.payment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CustomReasons_1 = require("../../utils/CustomReasons");
const payment_model_1 = require("./payment.model");
const checkEmptyObject_1 = require("../../utils/checkEmptyObject");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const https = __importStar(require("https"));
const payment_service_1 = require("./payment.service");
const payment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const payload = {
        type: req.body.type,
        paymentRef: req.body.paymentRef,
        amount: parseInt(req.body.amount),
        email: req.body.email,
        userId: req.body.userId,
    };
    if (payload.userId === "" || payload.paymentRef === "") {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    // const response = await paymentService(payload);
    return res.status(200).success({
        message: "PRAYMENT_CREATED_SUCCESSFULLY",
        data: [],
    });
});
exports.payment = payment;
const getUserPaymentList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    const response = yield (0, payment_service_1.listOfPayments)(sessionId !== null && sessionId !== void 0 ? sessionId : 0);
    return res.status(200).success({
        message: "PAYMENT_DETAILS",
        data: response,
    });
});
exports.getUserPaymentList = getUserPaymentList;
const getSinglePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentId = req.query.id;
    const response = yield (0, payment_service_1.singlePaymentServie)(paymentId);
    return res.status(200).success({
        message: "PAYMENT_DETAILS_RETRIEVED",
        data: response,
    });
});
exports.getSinglePayment = getSinglePayment;
const deletePayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    const paymentId = req.query.paymentId;
    const response = yield (0, payment_service_1.deletePaymentService)(sessionId, paymentId);
    return res.status(200).success({
        message: "PAYMENT_DELETED_SUCCESSFULLY",
        data: response
    });
});
exports.deletePayment = deletePayment;
const getPayments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    const paymentId = req.query.paymentId;
    const response = yield (0, payment_service_1.getPaymentService)(sessionId, paymentId);
    return res.status(200).success({
        message: "PAYMENT_SUCCESSFULLY",
        data: response,
    });
});
exports.getPayments = getPayments;
const paystack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
                reason: "Fields Required",
            });
        }
        const userId = req.session.userId;
        const payload = {
            type: req.body.txnType.toLowerCase(),
            paymentRef: req.body.paymentRef,
            amount: parseInt(req.body.amount),
            email: req.body.email,
        };
        // Save the user information and set the txnStatus to PENDING
        const newPayload = {
            userId: userId,
            email: payload.email,
            amount: payload.amount,
            transactionStatus: payment_model_1.TxnStatus.PENDING,
            type: payload.type,
        };
        yield (0, payment_service_1.paymentService)(newPayload);
        const params = JSON.stringify({
            email: payload.email,
            amount: payload.amount * 100,
        });
        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/initialize',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        };
        const reqPaystack = https.request(options, (resPaystack) => {
            let data = '';
            resPaystack.on('data', (chunk) => {
                data += chunk;
            });
            resPaystack.on('end', () => {
                try {
                    const responseData = JSON.parse(data);
                    return res.status(200).success({
                        message: "Payment Initialized",
                        data: responseData,
                    });
                }
                catch (error) {
                    console.error('Error parsing response from Paystack', error);
                    res.status(500).json({ error: 'Error parsing response from Paystack' });
                }
            });
        }).on('error', (error) => {
            console.error('Error connecting to Paystack', error);
            res.status(500).json({ error: 'Error connecting to Paystack' });
            throw new error_moddleware_1.CustomError({
                message: error.message,
                code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                reason: "Error connecting to Paystack",
            });
        });
        reqPaystack.write(params);
        reqPaystack.end();
    }
    catch (error) {
        console.error('Error in paystack handler', error);
        throw new error_moddleware_1.CustomError({
            message: error.message,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something Went Wrong",
        });
    }
});
exports.paystack = paystack;
const paymentWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = require('crypto').createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    try {
        if (hash === req.headers['x-paystack-signature']) {
            const event = req.body;
            switch (event.event) {
                case 'charge.success':
                    const response = yield (0, payment_service_1.webhookService)(event.data.customer.email);
                    console.log("Transaction Successful", event.event);
                    break;
                default:
                    console.log("Unhandled event");
            }
            res.status(200).send("Webhook Received");
        }
        else {
            // Invalid signature
            throw new error_moddleware_1.CustomError({
                message: CustomReasons_1.Reasons.customedReasons.INVALIDE_SIGNATURE,
                code: http_status_codes_1.StatusCodes.BAD_REQUEST,
                reason: "Inavalid signature",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.paymentWebhook = paymentWebhook;
