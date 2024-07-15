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
exports.deleteSubscription = exports.editSubscription = exports.getUserSubscriptions = exports.getSubsciptions = exports.subscriptionControler = void 0;
const Subscription_service_1 = require("./Subscription.service");
const checkEmptyObject_1 = require("../../utils/checkEmptyObject");
const error_moddleware_1 = require("../../middleware/error.moddleware");
const http_status_codes_1 = require("http-status-codes");
const CustomReasons_1 = require("../../utils/CustomReasons");
const subscriptionControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    if ((0, checkEmptyObject_1.isEmpty)(req.body)) {
        throw new error_moddleware_1.CustomError({
            message: CustomReasons_1.Reasons.customedReasons.FIELD_REQUIRED,
            code: http_status_codes_1.StatusCodes.BAD_REQUEST,
            reason: "Fields Required",
        });
    }
    const subscriptionPayload = {
        forMe: {
            userId: req.body.forMe.userId,
            noOfMonths: req.body.forMe.noOfMonths,
            renewable: req.body.forMe.renewable,
        },
        forOthers: {
            noOfMonths: req.body.forOthers.noOfMonths,
            renewable: req.body.forOthers.renewable || false,
        },
        totalCost: req.body.totalCost,
    };
    const response = yield (0, Subscription_service_1.subscriptionService)(subscriptionPayload, sessionId);
    return res.status(200).success({
        message: "subscribed successfully",
        data: [],
    });
});
exports.subscriptionControler = subscriptionControler;
const getSubsciptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    const response = yield (0, Subscription_service_1.getSubscriptionsService)();
    return res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: response,
    });
});
exports.getSubsciptions = getSubsciptions;
const getUserSubscriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.session.userId;
    const response = yield (0, Subscription_service_1.getUserSubService)(sessionId);
    return res.status(200).success({
        message: CustomReasons_1.Reasons.customedReasons.DATA_RETRIEVED,
        data: response,
    });
});
exports.getUserSubscriptions = getUserSubscriptions;
const editSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const sessionId = req.session.userId;
    const subscriptionPayload = {
        forMe: {
            noOfMonths: (_a = req.body.forMe) === null || _a === void 0 ? void 0 : _a.noOfMonths,
            renewable: (_b = req.body.forMe) === null || _b === void 0 ? void 0 : _b.renewable, // Default to false if renewable is not provided
        },
        forOthers: {
            noOfMonths: (_c = req.body.forOthers) === null || _c === void 0 ? void 0 : _c.noOfMonths,
            renewable: (_d = req.body.forOthers) === null || _d === void 0 ? void 0 : _d.renewable,
        },
        totalCost: req.body.totalCost,
        subscriptionId: req.body.subscriptionId,
    };
    const response = yield (0, Subscription_service_1.editSubService)(sessionId, subscriptionPayload);
    return res.status(200).success({
        message: "subscription updated successfully",
        data: [],
    });
});
exports.editSubscription = editSubscription;
const deleteSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptionId = req.query.subscriptionId;
    const response = yield (0, Subscription_service_1.deleteSubscriptionService)(subscriptionId);
    return res.status(200).success({
        message: "subscription deleted successfully",
        data: [],
    });
});
exports.deleteSubscription = deleteSubscription;
