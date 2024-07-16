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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionService = exports.editSubService = exports.getUserSubService = exports.getSubscriptionsService = exports.subscriptionService = void 0;
const CustomReasons_1 = require("../../utils/CustomReasons");
const Subscription_model_1 = __importDefault(require("./Subscription.model"));
const error_moddleware_1 = require("../../middleware/error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const subscriptionService = (salesPayload, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubscription = new Subscription_model_1.default(salesPayload);
        yield newSubscription.save();
        return newSubscription;
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
exports.subscriptionService = subscriptionService;
const getSubscriptionsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Subscription_model_1.default.find()
            .populate({
            path: "forMe.userId",
            select: "firstName lastName",
        })
            .exec();
        return response;
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
exports.getSubscriptionsService = getSubscriptionsService;
const getUserSubService = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Subscription_model_1.default.find({
            "forMe.userId": sessionId,
        }).exec();
        return response;
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
exports.getUserSubService = getUserSubService;
const editSubService = (sessionId, subscriptionPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subscriptionId } = subscriptionPayload, data = __rest(subscriptionPayload, ["subscriptionId"]);
        const update = yield Subscription_model_1.default.findByIdAndUpdate(subscriptionPayload.subscriptionId, data, { new: true } // Options object
        );
        console.log(update);
        return update;
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
exports.editSubService = editSubService;
const deleteSubscriptionService = (subscriptionId) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const response = yield Subscription_model_1.default.findOneAndDelete({
        _id: subscriptionId,
    }).exec();
    if (!response) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.defaultReasons.NOT_FOUND,
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            reason: "Record Not Found",
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
exports.deleteSubscriptionService = deleteSubscriptionService;