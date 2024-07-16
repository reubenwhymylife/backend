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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentService = exports.deletePaymentService = exports.listOfPayments = exports.webhookService = exports.singlePaymentServie = exports.paymentService = void 0;
const CustomReasons_1 = require("../../utils/CustomReasons");
const payment_model_1 = require("./payment.model");
const payment_model_2 = __importDefault(require("./payment.model"));
const error_moddleware_1 = require("../../middleware/error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const paymentService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new payment_model_2.default({
            userId: payload.userId,
            type: payload.type,
            amount: payload.amount,
            email: payload.email,
            transactionStatus: payment_model_1.TxnStatus.PENDING
        });
        yield newProduct.save();
        return newProduct;
    }
    catch (error) {
        console.log(error);
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something Went Wrong",
        });
    }
});
exports.paymentService = paymentService;
const singlePaymentServie = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentDetails = yield payment_model_2.default.findOne({ _id: paymentId }).populate({
            path: "userId",
            select: "firstName lastName"
        }).exec();
        if (!paymentDetails) {
            throw new error_moddleware_1.CustomError({
                message: CustomReasons_1.Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
                code: http_status_codes_1.StatusCodes.NOT_FOUND,
                reason: CustomReasons_1.Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
            });
        }
        return paymentDetails;
    }
    catch (error) {
        console.log(error);
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something Went Wrong",
        });
    }
});
exports.singlePaymentServie = singlePaymentServie;
const webhookService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield payment_model_2.default.findOne({ email: email }).exec();
        if (!info) {
            throw new error_moddleware_1.CustomError({
                message: CustomReasons_1.Reasons.customedReasons.USER_NOT_FOUND,
                code: http_status_codes_1.StatusCodes.NOT_FOUND,
                reason: "User with these email is not found",
            });
        }
        const updateUserTxnstatus = yield payment_model_2.default.findOneAndUpdate({ email: info.email }, {
            $set: {
                transactionStatus: payment_model_1.TxnStatus.SUCCESS
            }
        }, { new: true });
        // console.log(updateUserTxnstatus)
        return updateUserTxnstatus;
    }
    catch (error) {
        console.log(error);
        throw new error_moddleware_1.CustomError({
            message: error.message,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something Went Wrong",
        });
    }
});
exports.webhookService = webhookService;
const listOfPayments = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayments = yield payment_model_2.default
            .findOne({ userId: sessionId })
            .populate({ path: "userId", select: "firstName lastName payments" })
            .exec();
        return userPayments;
    }
    catch (error) {
        console.log(error);
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
            code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: "Something Went Wrong",
        });
    }
});
exports.listOfPayments = listOfPayments;
const deletePaymentService = (sessionId, paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const response = yield payment_model_2.default
        .findOneAndDelete({ _id: paymentId })
        .exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: CustomReasons_1.Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
        });
    }
    return response;
    // } catch (error) {
    //   console.log(error);
    //   throw new CustomError({
    //     message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
    //     code: StatusCodes.INTERNAL_SERVER_ERROR,
    //     reason: "Something Went Wrong",
    //   });
    // }
});
exports.deletePaymentService = deletePaymentService;
const getPaymentService = (sessionId, paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield payment_model_2.default
        .find()
        .populate({ path: "userId", select: "firstName lastName" })
        .exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: CustomReasons_1.Reasons.customedReasons.PAYMENT_DOES_NOT_EXIST,
        });
    }
    return response;
    // } catch (error) {
    //   console.log(error);
    //   throw new CustomError({
    //     message: Reasons.defaultReasons.INTERNAL_SERVER_ERROR,
    //     code: StatusCodes.INTERNAL_SERVER_ERROR,
    //     reason: "Something Went Wrong",
    //   });
    // }
});
exports.getPaymentService = getPaymentService;
